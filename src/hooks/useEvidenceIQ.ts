'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  trails,
  calcEvidenceIQ,
  getCompletedTrails,
  hasMasterBadge as calcHasMasterBadge,
} from '@/lib/trails'
import { supabase } from '@/lib/supabase-client'
import { logger } from '@/lib/logger'

/**
 * useEvidenceIQ — client hook for tracking gamification progress.
 *
 * Storage keys (all prefixed `hi_`):
 *  - `hi_completed_articles`  string[]   — slugs the user has read
 *  - `hi_passed_quizzes`      string[]   — slugs whose micro-quiz the user passed
 *  - `hi_completed_slugs`     string[]   — LEGACY (Phase 1). Migrated on first mount.
 *
 * Offline-first: localStorage is updated synchronously for instant UI feedback.
 * Supabase anonymous auth syncs progress to the cloud in the background so
 * progress survives localStorage clears and enables future cross-device sync.
 */

const KEY_ARTICLES = 'hi_completed_articles'
const KEY_QUIZZES = 'hi_passed_quizzes'
const KEY_LEGACY_SLUGS = 'hi_completed_slugs'

function safeParse(raw: string | null): string[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((x): x is string => typeof x === 'string')
  } catch {
    return []
  }
}

function safeWrite(key: string, value: string[]): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage may be unavailable (private mode, quota) — fail silent
  }
}

function migrateLegacy(): void {
  if (typeof window === 'undefined') return
  try {
    const legacy = window.localStorage.getItem(KEY_LEGACY_SLUGS)
    if (legacy === null) return
    const existing = window.localStorage.getItem(KEY_ARTICLES)
    if (existing !== null) return
    window.localStorage.setItem(KEY_ARTICLES, legacy)
  } catch {
    // ignore
  }
}

type ProgressRow = { article_slug: string; quiz_passed: boolean }

export interface EarnedBadge {
  trailId: string
  emoji: string
  label: string
}

export function useEvidenceIQ() {
  const [completedArticles, setCompletedArticles] = useState<string[]>([])
  const [passedQuizzes, setPassedQuizzes] = useState<string[]>([])
  const [isHydrated, setIsHydrated] = useState(false)
  const didMigrateRef = useRef(false)
  const userIdRef = useRef<string | null>(null)
  const didSyncRef = useRef(false)

  // Hydrate from localStorage on first mount (SSR-safe).
  useEffect(() => {
    if (!didMigrateRef.current) {
      migrateLegacy()
      didMigrateRef.current = true
    }
    try {
      setCompletedArticles(safeParse(window.localStorage.getItem(KEY_ARTICLES)))
      setPassedQuizzes(safeParse(window.localStorage.getItem(KEY_QUIZZES)))
    } catch {
      // ignore
    }
    setIsHydrated(true)
  }, [])

  // DB sync: anonymous auth + merge cloud progress after local hydration.
  useEffect(() => {
    if (!isHydrated || didSyncRef.current) return
    didSyncRef.current = true

    async function syncWithDB() {
      if (!supabase) return
      try {
        let { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          const { data } = await supabase.auth.signInAnonymously()
          session = data.session
        }
        if (!session?.user) return
        userIdRef.current = session.user.id

        const { data, error } = await supabase
          .from('user_progress')
          .select('article_slug, quiz_passed')

        if (error) {
          logger.warn('Failed to fetch DB progress', { err: String(error) })
          return
        }

        const rows = (data ?? []) as ProgressRow[]

        if (rows.length === 0) {
          // First DB session for this user — push any existing localStorage data up.
          const localArticles = safeParse(window.localStorage.getItem(KEY_ARTICLES))
          const localQuizzes  = safeParse(window.localStorage.getItem(KEY_QUIZZES))
          if (localArticles.length === 0) return
          const upsertRows = localArticles.map(slug => ({
            user_id: session!.user.id,
            article_slug: slug,
            quiz_passed: localQuizzes.includes(slug),
            ...(localQuizzes.includes(slug) ? { quiz_passed_at: new Date().toISOString() } : {}),
          }))
          const { error: upsertErr } = await supabase.from('user_progress').upsert(upsertRows)
          if (upsertErr) logger.warn('Initial localStorage→DB sync failed', { err: String(upsertErr) })
          return
        }

        // Merge DB + localStorage (union — take the most permissive).
        const dbSlugs   = rows.map(r => r.article_slug)
        const dbQuizzes = rows.filter(r => r.quiz_passed).map(r => r.article_slug)

        setCompletedArticles((prev: string[]) => {
          const merged = Array.from(new Set([...prev, ...dbSlugs]))
          if (merged.length !== prev.length) safeWrite(KEY_ARTICLES, merged)
          return merged
        })
        setPassedQuizzes((prev: string[]) => {
          const merged = Array.from(new Set([...prev, ...dbQuizzes]))
          if (merged.length !== prev.length) safeWrite(KEY_QUIZZES, merged)
          return merged
        })
      } catch (err) {
        logger.warn('DB sync threw unexpectedly', { err: String(err) })
      }
    }

    syncWithDB()
  }, [isHydrated])

  const markArticleRead = useCallback((slug: string) => {
    if (!slug) return
    setCompletedArticles((prev: string[]) => {
      if (prev.includes(slug)) return prev
      const next = [...prev, slug]
      safeWrite(KEY_ARTICLES, next)
      if (supabase && userIdRef.current) {
        supabase
          .from('user_progress')
          .upsert({ user_id: userIdRef.current, article_slug: slug })
          .then(({ error }: { error: unknown }) => {
            if (error) logger.warn('DB upsert article_read failed', { slug, err: String(error) })
          })
      }
      return next
    })
  }, [])

  const markQuizPassed = useCallback((slug: string) => {
    if (!slug) return
    setPassedQuizzes((prev: string[]) => {
      if (prev.includes(slug)) return prev
      const next = [...prev, slug]
      safeWrite(KEY_QUIZZES, next)
      if (supabase && userIdRef.current) {
        supabase
          .from('user_progress')
          .upsert({
            user_id: userIdRef.current,
            article_slug: slug,
            quiz_passed: true,
            quiz_passed_at: new Date().toISOString(),
          })
          .then(({ error }: { error: unknown }) => {
            if (error) logger.warn('DB upsert quiz_passed failed', { slug, err: String(error) })
          })
      }
      return next
    })
  }, [])

  const resetProgress = useCallback(() => {
    try {
      window.localStorage.removeItem(KEY_ARTICLES)
      window.localStorage.removeItem(KEY_QUIZZES)
      window.localStorage.removeItem(KEY_LEGACY_SLUGS)
    } catch {
      // ignore
    }
    setCompletedArticles([])
    setPassedQuizzes([])
  }, [])

  // ── Derived values ──────────────────────────────────────────────────────
  const evidenceIQ = calcEvidenceIQ(completedArticles, passedQuizzes)
  const completedTrailIds = getCompletedTrails(completedArticles)
  const completedTrailIdSet = new Set(completedTrailIds)
  const earnedBadges: EarnedBadge[] = trails
    .filter(t => completedTrailIdSet.has(t.id))
    .map(t => ({ trailId: t.id, emoji: t.badge.emoji, label: t.badge.label }))
  const hasMasterBadge = calcHasMasterBadge(completedTrailIds)

  const isArticleRead = (slug: string) => completedArticles.includes(slug)
  const isQuizPassed = (slug: string) => passedQuizzes.includes(slug)
  const isTrailCompleted = (trailId: string) => completedTrailIdSet.has(trailId)

  return {
    isHydrated,
    completedArticles,
    passedQuizzes,
    evidenceIQ,
    completedTrailIds,
    earnedBadges,
    hasMasterBadge,
    markArticleRead,
    markQuizPassed,
    resetProgress,
    isArticleRead,
    isQuizPassed,
    isTrailCompleted,
  }
}

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  trails,
  calcEvidenceIQ,
  getCompletedTrails,
  hasMasterBadge as calcHasMasterBadge,
} from '@/lib/trails'

/**
 * useEvidenceIQ — client hook for tracking gamification progress in localStorage.
 *
 * Storage keys (all prefixed `hi_`):
 *  - `hi_completed_articles`  string[]   — slugs the user has read
 *  - `hi_passed_quizzes`      string[]   — slugs whose micro-quiz the user passed
 *  - `hi_completed_slugs`     string[]   — LEGACY (Phase 1 single-arg storage). On first
 *                                          mount we copy this into hi_completed_articles
 *                                          if the new key is empty, then leave the legacy
 *                                          key in place for safety.
 *
 * Derived values (recomputed every render — cheap, single-pass over `trails`):
 *  - `evidenceIQ`        — total points via `calcEvidenceIQ(reads, quizzes)`
 *  - `completedTrailIds` — IDs of trails whose active steps are all read
 *  - `earnedBadges`      — badge objects for completed trails (for trophy displays)
 *  - `hasMasterBadge`    — true when every active trail is completed
 *
 * Cross-tab sync: listens to `storage` events so opening the trail page in a second tab
 * after marking a quiz passed in the first tab reflects the new IQ immediately.
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
    // localStorage may be unavailable (private mode, quota, SSR) — fail silent
  }
}

/** One-time legacy → new key migration. Runs on first mount. */
function migrateLegacy(): void {
  if (typeof window === 'undefined') return
  try {
    const legacy = window.localStorage.getItem(KEY_LEGACY_SLUGS)
    if (legacy === null) return
    const existing = window.localStorage.getItem(KEY_ARTICLES)
    if (existing !== null) return // already migrated or new key already populated
    window.localStorage.setItem(KEY_ARTICLES, legacy)
  } catch {
    // ignore
  }
}

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

  // Cross-tab sync via storage events.
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === KEY_ARTICLES) {
        setCompletedArticles(safeParse(e.newValue))
      } else if (e.key === KEY_QUIZZES) {
        setPassedQuizzes(safeParse(e.newValue))
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const markArticleRead = useCallback((slug: string) => {
    if (!slug) return
    setCompletedArticles(prev => {
      if (prev.includes(slug)) return prev
      const next = [...prev, slug]
      safeWrite(KEY_ARTICLES, next)
      return next
    })
  }, [])

  const markQuizPassed = useCallback((slug: string) => {
    if (!slug) return
    setPassedQuizzes(prev => {
      if (prev.includes(slug)) return prev
      const next = [...prev, slug]
      safeWrite(KEY_QUIZZES, next)
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

  // ── Predicates (closed over current state, stable enough for render-time use) ──
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

'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useEvidenceIQ } from '@/hooks/useEvidenceIQ'
import MicroQuiz from './MicroQuiz'
import type { Trail } from '@/lib/trails'
import { IQ_POINTS, QUIZ_POINTS } from '@/lib/trails'

/**
 * ArticleProgressSection — Phase 6 interactive footer for the article page.
 *
 * Owns three pieces of state, all driven by `useEvidenceIQ`:
 *  1. "Mark as read" button / "Article marked as read" confirmation
 *     → calls `markArticleRead(slug)` on click, awards +{IQ_POINTS[level]}
 *  2. `<MicroQuiz>` / "Micro-quiz passed" confirmation
 *     → `onPass` calls `markQuizPassed(slug)`, awards +{QUIZ_POINTS[level]}
 *  3. Trail completion badge modal
 *     → fires once when the user transitions from "trail incomplete" to
 *       "trail complete" during a session (i.e. marks the last step read)
 *
 * Returning users whose localStorage already shows BOTH read+quiz-passed get
 * a compact "+75 IQ earned" summary instead of the active prompts. Users who
 * transition to both-done during the session see the two earned cards side
 * by side (celebration), not the compact summary.
 *
 * SSR-safe: renders a min-height placeholder until `isHydrated` flips true,
 * so the server-rendered HTML and the first client pass don't conflict.
 */

interface Props {
  slug: string
  level: number
  trail: Trail | null
}

export default function ArticleProgressSection({ slug, level, trail }: Props) {
  const {
    isHydrated,
    completedArticles,
    passedQuizzes,
    evidenceIQ,
    markArticleRead,
    markQuizPassed,
  } = useEvidenceIQ()

  // "Page load" snapshot: compact summary only for returning users.
  const [initialBothDone, setInitialBothDone] = useState(false)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!isHydrated || initializedRef.current) return
    initializedRef.current = true
    if (completedArticles.includes(slug) && passedQuizzes.includes(slug)) {
      setInitialBothDone(true)
    }
  }, [isHydrated, slug, completedArticles, passedQuizzes])

  // Trail completion badge: fire exactly once on incomplete → complete transition.
  const [showBadge, setShowBadge] = useState(false)
  const wasCompleteRef = useRef<boolean | null>(null)

  useEffect(() => {
    if (!isHydrated || !trail) return
    const activeSlugs = trail.steps
      .filter(s => !s.comingSoon && !!s.slug)
      .map(s => s.slug)
    const isComplete =
      activeSlugs.length > 0 && activeSlugs.every(s => completedArticles.includes(s))
    if (wasCompleteRef.current === null) {
      wasCompleteRef.current = isComplete
      return
    }
    if (isComplete && !wasCompleteRef.current) {
      setShowBadge(true)
    }
    wasCompleteRef.current = isComplete
  }, [completedArticles, isHydrated, trail])

  // SSR and first client render use the default ("not yet interacted") state so
  // React hydration matches. After `useEffect` flips `isHydrated`, we switch to
  // the real localStorage-backed state — returning users see a brief flash of
  // the prompt before the earned cards take over, which we accept in exchange
  // for a clean server-rendered HTML payload.
  const articleRead = isHydrated && completedArticles.includes(slug)
  const quizPassed = isHydrated && passedQuizzes.includes(slug)
  const readPoints = IQ_POINTS[level] ?? 50
  const quizPoints = QUIZ_POINTS[level] ?? 25

  return (
    <div style={{ marginBottom: '36px' }}>
      {initialBothDone ? (
        <CompactSummary totalPoints={readPoints + quizPoints} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {articleRead ? (
            <EarnedCard
              icon="✓"
              title="Article marked as read"
              subtitle={`+${readPoints} Evidence IQ earned`}
              tone="green"
            />
          ) : (
            <MarkReadButton points={readPoints} onClick={() => markArticleRead(slug)} />
          )}

          {quizPassed ? (
            <EarnedCard
              icon="🧠"
              title="Micro-quiz passed"
              subtitle={`+${quizPoints} Evidence IQ earned`}
              tone="blue"
            />
          ) : (
            <MicroQuiz onPass={() => markQuizPassed(slug)} points={quizPoints} />
          )}
        </div>
      )}

      {showBadge && trail && (
        <BadgeModal trail={trail} evidenceIQ={evidenceIQ} onClose={() => setShowBadge(false)} />
      )}
    </div>
  )
}

// ── Subcomponents ────────────────────────────────────────────────────────────

function MarkReadButton({ points, onClick }: { points: number; onClick: () => void }) {
  return (
    <div
      style={{
        background: 'var(--navy)',
        borderRadius: '16px',
        padding: '22px 26px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ minWidth: 0, flex: 1 }}>
        <div
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: 'var(--blue-pale)',
            marginBottom: '5px',
          }}
        >
          Read IQ · +{points}
        </div>
        <div
          style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: '22px',
            fontWeight: 400,
            color: 'white',
            lineHeight: 1.2,
            marginBottom: '3px',
          }}
        >
          Finished reading?
        </div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
          Mark this article complete to earn +{points} Evidence IQ.
        </div>
      </div>
      <button
        type="button"
        onClick={onClick}
        style={{
          background: 'white',
          color: 'var(--navy)',
          border: 'none',
          borderRadius: '100px',
          padding: '12px 26px',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        Mark as read
      </button>
    </div>
  )
}

function EarnedCard({
  icon,
  title,
  subtitle,
  tone,
}: {
  icon: ReactNode
  title: string
  subtitle: string
  tone: 'green' | 'blue'
}) {
  const palette =
    tone === 'green'
      ? {
          bg: '#EDF7F1',
          border: '#C7E5D2',
          iconBg: '#5BAE7B',
          titleColor: '#1F5C3A',
          subColor: '#4A7A5C',
        }
      : {
          bg: 'var(--sky)',
          border: 'var(--blue-pale)',
          iconBg: 'var(--blue-mid)',
          titleColor: 'var(--navy)',
          subColor: 'var(--blue-mid)',
        }

  return (
    <div
      style={{
        background: palette.bg,
        border: `1px solid ${palette.border}`,
        borderRadius: '14px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
      }}
    >
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: palette.iconBg,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: palette.titleColor,
            marginBottom: '2px',
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: '12px', color: palette.subColor, fontWeight: 400 }}>
          {subtitle}
        </div>
      </div>
    </div>
  )
}

function CompactSummary({ totalPoints }: { totalPoints: number }) {
  return (
    <div
      style={{
        background: 'var(--sky)',
        border: '1px solid var(--blue-pale)',
        borderRadius: '14px',
        padding: '18px 22px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <div style={{ fontSize: '28px', lineHeight: 1, flexShrink: 0 }}>✅</div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: 'var(--blue-mid)',
            marginBottom: '3px',
          }}
        >
          You&apos;ve mastered this article
        </div>
        <div style={{ fontSize: '16px', color: 'var(--navy)', fontWeight: 500 }}>
          +{totalPoints} Evidence IQ earned
        </div>
      </div>
    </div>
  )
}

function BadgeModal({
  trail,
  evidenceIQ,
  onClose,
}: {
  trail: Trail
  evidenceIQ: number
  onClose: () => void
}) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(15, 42, 63, 0.65)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--navy)',
          borderRadius: '24px',
          padding: 'clamp(32px, 8vw, 48px) clamp(24px, 6vw, 40px)',
          maxWidth: '360px',
          width: '100%',
          textAlign: 'center',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontSize: '56px', marginBottom: '16px' }}>{trail.badge.emoji}</div>
        <div
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--blue-pale)',
            marginBottom: '8px',
          }}
        >
          Trail complete
        </div>
        <h3
          style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: '26px',
            fontWeight: 400,
            color: 'white',
            marginBottom: '8px',
            marginTop: 0,
            lineHeight: 1.2,
          }}
        >
          {trail.badge.label}
        </h3>
        <p
          style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.65,
            marginBottom: '28px',
            fontWeight: 300,
          }}
        >
          You completed the {trail.name} trail. Your Evidence IQ is now{' '}
          <strong style={{ color: 'var(--blue-pale)' }}>{evidenceIQ}</strong>.
        </p>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'white',
            color: 'var(--navy)',
            border: 'none',
            borderRadius: '100px',
            padding: '12px 28px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          Continue learning
        </button>
      </div>
    </div>
  )
}

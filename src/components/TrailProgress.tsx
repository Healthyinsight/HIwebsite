'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Trail, TrailStep } from '@/lib/trails'
import { IQ_POINTS } from '@/lib/trails'
import { useEvidenceIQ } from '@/hooks/useEvidenceIQ'
import EmailWall from './EmailWall'

export default function TrailProgress({ trail }: { trail: Trail }) {
  const router = useRouter()
  const {
    isHydrated,
    completedArticles,
    evidenceIQ,
    isArticleRead,
  } = useEvidenceIQ()

  const [emailUnlocked, setEmailUnlocked] = useState(false)
  const [pendingStep, setPendingStep] = useState<TrailStep | null>(null)
  const [showBadge, setShowBadge] = useState(false)

  // Read the (separate-concern) email gate flag once on hydration.
  useEffect(() => {
    try {
      setEmailUnlocked(localStorage.getItem('hi_email_unlocked') === 'true')
    } catch {
      // ignore
    }
  }, [])

  // Active (non-comingSoon) steps drive completion + counts.
  const activeSteps = trail.steps.filter(s => !s.comingSoon && !!s.slug)
  const doneCount = activeSteps.filter(s => isArticleRead(s.slug)).length
  const trailComplete = activeSteps.length > 0 && doneCount === activeSteps.length

  // Fire badge modal exactly when the trail transitions from incomplete → complete.
  // We wait until after hydration so a returning user who has already finished the
  // trail isn't shown the modal on every page load.
  const wasCompleteRef = useRef<boolean | null>(null)
  useEffect(() => {
    if (!isHydrated) return
    if (wasCompleteRef.current === null) {
      wasCompleteRef.current = trailComplete
      return
    }
    if (trailComplete && !wasCompleteRef.current) {
      setShowBadge(true)
    }
    wasCompleteRef.current = trailComplete
    // Only re-evaluate when underlying read state changes; trailComplete is derived from it.
  }, [completedArticles, isHydrated, trailComplete])

  function markComplete(step: TrailStep) {
    if (!step.slug) return
    router.push(`/articles/${step.slug}`)
  }

  function handleStepClick(step: TrailStep) {
    if (step.comingSoon || !step.slug) return
    if (step.level >= 4 && !emailUnlocked) {
      setPendingStep(step)
      return
    }
    markComplete(step)
  }

  function handleEmailWallSuccess() {
    // EmailWall persists `hi_email_unlocked` itself; we just mirror to local state.
    setEmailUnlocked(true)
    if (pendingStep) {
      markComplete(pendingStep)
      setPendingStep(null)
    }
  }

  return (
    <>
      {/* Health IQ bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        background: 'var(--sky)',
        borderRadius: '16px',
        padding: '14px 20px',
        marginBottom: '28px',
      }}>
        <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', color: 'var(--navy)', lineHeight: 1 }}>
          {evidenceIQ}
        </div>
        <div>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '2px' }}>
            Health IQ
          </div>
          <div style={{ fontSize: '13px', color: '#444440', fontWeight: 300 }}>
            {doneCount} of {activeSteps.length} articles read
          </div>
        </div>
        {trailComplete && (
          <div style={{ marginLeft: 'auto', fontSize: '22px' }}>{trail.badge.emoji}</div>
        )}
      </div>

      {/* Step list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {trail.steps.map((step, i) => {
          const isComing = !!step.comingSoon || !step.slug
          const done = !isComing && isArticleRead(step.slug)
          const locked = !isComing && step.level >= 4 && !emailUnlocked
          const iqPoints = step.evidenceIQPoints ?? IQ_POINTS[step.level] ?? 50

          return (
            <button
              key={`${step.slug || 'coming'}-${i}`}
              onClick={() => handleStepClick(step)}
              disabled={isComing}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                background: done ? '#EAF5FB' : 'white',
                border: done ? '1px solid var(--blue-pale)' : '1px solid var(--sand)',
                borderRadius: '14px',
                padding: '15px 16px',
                cursor: isComing ? 'default' : 'pointer',
                textAlign: 'left',
                fontFamily: 'DM Sans, sans-serif',
                width: '100%',
                opacity: isComing ? 0.6 : 1,
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => {
                if (!done && !isComing) (e.currentTarget as HTMLElement).style.borderColor = '#A8CCE0'
              }}
              onMouseLeave={e => {
                if (!done && !isComing) (e.currentTarget as HTMLElement).style.borderColor = 'var(--sand)'
              }}
            >
              {/* Step indicator */}
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: done ? 'var(--blue-mid)' : '#F0EDE8',
                color: done ? 'white' : '#8A8A80',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 700,
                flexShrink: 0,
                marginTop: '1px',
              }}>
                {done ? '✓' : i + 1}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '5px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 400, color: '#1A1A17', lineHeight: 1.3 }}>
                    {step.title}
                  </span>
                  {isComing && (
                    <span style={{ fontSize: '10px', background: '#F0EDE8', borderRadius: '100px', padding: '2px 8px', color: '#8A8A80', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      Coming soon
                    </span>
                  )}
                  {locked && (
                    <span style={{ fontSize: '10px', background: '#F0EDE8', borderRadius: '100px', padding: '2px 8px', color: '#8A8A80', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      🔒 L{step.level}
                    </span>
                  )}
                  {!locked && !isComing && step.level >= 4 && (
                    <span style={{ fontSize: '10px', background: 'var(--sky)', borderRadius: '100px', padding: '2px 7px', color: 'var(--blue-mid)', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>
                      L{step.level}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: '#8A8A80', display: 'flex', gap: '10px' }}>
                  {step.readingTime && <span>{step.readingTime}</span>}
                  {!isComing && <span>+{iqPoints} HiQ</span>}
                </div>
              </div>

              {/* Arrow */}
              {!isComing && (
                <span style={{ color: locked ? '#C8C8C0' : 'var(--blue-mid)', fontSize: '15px', flexShrink: 0, alignSelf: 'center', marginLeft: '4px' }}>
                  →
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Badge modal */}
      {showBadge && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(15, 42, 63, 0.65)' }}
          onClick={() => setShowBadge(false)}
        >
          <div
            style={{ background: 'var(--navy)', borderRadius: '24px', padding: 'clamp(32px, 8vw, 48px) clamp(24px, 6vw, 40px)', maxWidth: '360px', width: '100%', textAlign: 'center' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>{trail.badge.emoji}</div>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-pale)', marginBottom: '8px' }}>
              Trail complete
            </div>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '26px', fontWeight: 400, color: 'white', marginBottom: '8px', lineHeight: 1.2 }}>
              {trail.badge.label}
            </h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: '28px', fontWeight: 300 }}>
              You completed the {trail.name} trail. Your Health IQ is now <strong style={{ color: 'var(--blue-pale)' }}>{evidenceIQ}</strong>.
            </p>
            <button
              onClick={() => setShowBadge(false)}
              style={{ background: 'white', color: 'var(--navy)', border: 'none', borderRadius: '100px', padding: '12px 28px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
            >
              Continue learning
            </button>
          </div>
        </div>
      )}

      {/* Email wall */}
      {pendingStep && (
        <EmailWall
          onSuccess={handleEmailWallSuccess}
          onClose={() => setPendingStep(null)}
        />
      )}
    </>
  )
}

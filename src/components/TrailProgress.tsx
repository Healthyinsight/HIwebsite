'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Trail, TrailStep } from '@/lib/trails'
import { calcEvidenceIQ } from '@/lib/trails'
import EmailWall from './EmailWall'

const IQ_PER_LEVEL: Record<number, number> = { 1: 5, 2: 8, 3: 10, 4: 15, 5: 20 }

export default function TrailProgress({ trail }: { trail: Trail }) {
  const [completedSlugs, setCompletedSlugs] = useState<string[]>([])
  const [emailUnlocked, setEmailUnlocked] = useState(false)
  const [pendingStep, setPendingStep] = useState<TrailStep | null>(null)
  const [showBadge, setShowBadge] = useState(false)
  const [evidenceIQ, setEvidenceIQ] = useState(0)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('hi_completed_slugs')
      const slugs: string[] = raw ? JSON.parse(raw) : []
      setCompletedSlugs(slugs)
      setEmailUnlocked(localStorage.getItem('hi_email_unlocked') === 'true')
      setEvidenceIQ(calcEvidenceIQ(slugs))
    } catch {}
  }, [])

  const markComplete = useCallback((step: TrailStep) => {
    setCompletedSlugs(prev => {
      const alreadyDone = prev.includes(step.slug)
      const updated = alreadyDone ? prev : [...prev, step.slug]

      if (!alreadyDone) {
        try {
          localStorage.setItem('hi_completed_slugs', JSON.stringify(updated))
          const newIQ = calcEvidenceIQ(updated)
          setEvidenceIQ(newIQ)
          // Check trail completion
          const trailSlugs = new Set(trail.steps.map(s => s.slug))
          const doneInTrail = updated.filter(s => trailSlugs.has(s)).length
          if (doneInTrail === trail.steps.length) setShowBadge(true)
        } catch {}
      }

      window.open(step.beehiivUrl, '_blank', 'noopener,noreferrer')
      return updated
    })
  }, [trail.steps])

  function handleStepClick(step: TrailStep) {
    if (step.level >= 4 && !emailUnlocked) {
      setPendingStep(step)
      return
    }
    markComplete(step)
  }

  function handleEmailWallSuccess() {
    setEmailUnlocked(true)
    if (pendingStep) {
      markComplete(pendingStep)
      setPendingStep(null)
    }
  }

  const completedSet = new Set(completedSlugs)
  const doneCount = trail.steps.filter(s => completedSet.has(s.slug)).length

  return (
    <>
      {/* Evidence IQ bar */}
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
            Evidence IQ
          </div>
          <div style={{ fontSize: '13px', color: '#444440', fontWeight: 300 }}>
            {doneCount} of {trail.steps.length} articles read
          </div>
        </div>
        {doneCount === trail.steps.length && (
          <div style={{ marginLeft: 'auto', fontSize: '22px' }}>{trail.badge.emoji}</div>
        )}
      </div>

      {/* Step list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {trail.steps.map((step, i) => {
          const done = completedSet.has(step.slug)
          const locked = step.level >= 4 && !emailUnlocked
          const iqPoints = IQ_PER_LEVEL[step.level] ?? 5

          return (
            <button
              key={step.slug}
              onClick={() => handleStepClick(step)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                background: done ? '#EAF5FB' : 'white',
                border: done ? '1px solid var(--blue-pale)' : '1px solid var(--sand)',
                borderRadius: '14px',
                padding: '15px 16px',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'DM Sans, sans-serif',
                width: '100%',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => {
                if (!done) (e.currentTarget as HTMLElement).style.borderColor = '#A8CCE0'
              }}
              onMouseLeave={e => {
                if (!done) (e.currentTarget as HTMLElement).style.borderColor = 'var(--sand)'
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
                  {locked && (
                    <span style={{ fontSize: '10px', background: '#F0EDE8', borderRadius: '100px', padding: '2px 8px', color: '#8A8A80', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      🔒 L{step.level}
                    </span>
                  )}
                  {!locked && step.level >= 4 && (
                    <span style={{ fontSize: '10px', background: 'var(--sky)', borderRadius: '100px', padding: '2px 7px', color: 'var(--blue-mid)', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>
                      L{step.level}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: '#8A8A80', display: 'flex', gap: '10px' }}>
                  <span>{step.readingTime}</span>
                  <span>+{iqPoints} IQ</span>
                </div>
              </div>

              {/* Arrow */}
              <span style={{ color: locked ? '#C8C8C0' : 'var(--blue-mid)', fontSize: '15px', flexShrink: 0, alignSelf: 'center', marginLeft: '4px' }}>
                →
              </span>
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
              You completed the {trail.name} trail. Your Evidence IQ is now <strong style={{ color: 'var(--blue-pale)' }}>{evidenceIQ}</strong>.
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

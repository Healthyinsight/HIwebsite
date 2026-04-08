'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Trail, TrailStep } from '@/lib/trails'
import { calcHealthIQ, IQ_POINTS } from '@/lib/trails'
import EmailWall from './EmailWall'

type QuizState = {
  selectedIndex: number | null
  revealed: boolean
  correct: boolean | null
}

export default function TrailProgress({ trail }: { trail: Trail }) {
  const [completedSlugs, setCompletedSlugs] = useState<string[]>([])
  const [emailUnlocked, setEmailUnlocked] = useState(false)
  const [healthIQ, setHealthIQ] = useState(0)
  const [quizStates, setQuizStates] = useState<Record<string, QuizState>>({})
  const [pendingAnswer, setPendingAnswer] = useState<{ slug: string; index: number } | null>(null)
  const [showBadge, setShowBadge] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('hi_completed_slugs')
      const slugs: string[] = raw ? JSON.parse(raw) : []
      setCompletedSlugs(slugs)
      setEmailUnlocked(localStorage.getItem('hi_email_unlocked') === 'true')
      setHealthIQ(calcHealthIQ(slugs))
    } catch {}
  }, [])

  const markComplete = useCallback((slug: string) => {
    setCompletedSlugs(prev => {
      if (prev.includes(slug)) return prev
      const updated = [...prev, slug]
      try {
        localStorage.setItem('hi_completed_slugs', JSON.stringify(updated))
        const newIQ = calcHealthIQ(updated)
        setHealthIQ(newIQ)
        const trailSlugs = new Set(trail.steps.map(s => s.slug))
        if (updated.filter(s => trailSlugs.has(s)).length === trail.steps.length) {
          setShowBadge(true)
        }
      } catch {}
      return updated
    })
  }, [trail.steps])

  function revealAnswer(slug: string, selectedIndex: number) {
    const step = trail.steps.find(s => s.slug === slug)
    if (!step?.quiz) return
    const correct = step.quiz.options[selectedIndex]?.correct === true
    setQuizStates(prev => ({
      ...prev,
      [slug]: { selectedIndex, revealed: true, correct },
    }))
    if (correct) markComplete(slug)
  }

  function handleOptionClick(step: TrailStep, index: number) {
    const existing = quizStates[step.slug]
    // If already answered correctly, do nothing
    if (existing?.correct) return
    // Store selection (not yet revealed)
    setQuizStates(prev => ({
      ...prev,
      [step.slug]: { selectedIndex: index, revealed: false, correct: null },
    }))
    if (!emailUnlocked) {
      setPendingAnswer({ slug: step.slug, index })
      return
    }
    revealAnswer(step.slug, index)
  }

  function handleEmailWallSuccess() {
    setEmailUnlocked(true)
    if (pendingAnswer) {
      revealAnswer(pendingAnswer.slug, pendingAnswer.index)
      setPendingAnswer(null)
    }
  }

  const completedSet = new Set(completedSlugs)
  const doneCount = trail.steps.filter(s => completedSet.has(s.slug)).length

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
        marginBottom: '32px',
      }}>
        <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', color: 'var(--navy)', lineHeight: 1 }}>
          {healthIQ}
        </div>
        <div>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '2px' }}>
            Health IQ
          </div>
          <div style={{ fontSize: '13px', color: '#444440', fontWeight: 300 }}>
            {doneCount} of {trail.steps.length} questions answered
          </div>
        </div>
        {doneCount === trail.steps.length && (
          <div style={{ marginLeft: 'auto', fontSize: '22px' }}>{trail.badge.emoji}</div>
        )}
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {trail.steps.map((step, i) => {
          const done = completedSet.has(step.slug)
          const qState = quizStates[step.slug]
          const iqPoints = IQ_POINTS[step.level] ?? 5

          return (
            <div
              key={step.slug}
              style={{
                background: done ? '#EAF5FB' : 'white',
                border: done ? '1px solid var(--blue-pale)' : '1px solid var(--sand)',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
            >
              {/* Article row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '16px 18px' }}>
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
                  marginTop: '2px',
                }}>
                  {done ? '✓' : i + 1}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A1A17', lineHeight: 1.3 }}>
                      {step.title}
                    </span>
                    {step.level >= 4 && (
                      <span style={{ fontSize: '10px', background: done ? 'var(--blue-pale)' : 'var(--sky)', borderRadius: '100px', padding: '2px 7px', color: 'var(--navy)', fontWeight: 700, flexShrink: 0 }}>
                        L{step.level}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#8A8A80', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span>{step.readingTime}</span>
                    <span>+{iqPoints} HIQ</span>
                  </div>
                </div>

                <a
                  href={step.beehiivUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    flexShrink: 0,
                    fontSize: '12px',
                    fontWeight: 500,
                    color: 'var(--blue-mid)',
                    textDecoration: 'none',
                    padding: '6px 12px',
                    border: '1px solid var(--blue-pale)',
                    borderRadius: '100px',
                    background: done ? 'white' : 'transparent',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Read →
                </a>
              </div>

              {/* Quiz section */}
              {step.quiz && (
                <div style={{
                  borderTop: `1px solid ${done ? 'var(--blue-pale)' : 'var(--sand)'}`,
                  padding: '16px 18px',
                  background: done ? 'rgba(212, 234, 245, 0.3)' : 'var(--cream)',
                }}>
                  {done ? (
                    // Completed state
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', color: 'var(--blue-mid)' }}>✓</span>
                      <span style={{ fontSize: '13px', color: 'var(--blue-mid)', fontWeight: 500 }}>Knowledge check passed</span>
                      {step.quiz.explanation && (
                        <span style={{ fontSize: '12px', color: '#8A8A80', fontWeight: 300, marginLeft: '4px' }}>
                          — {step.quiz.explanation}
                        </span>
                      )}
                    </div>
                  ) : (
                    <>
                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A8A80', marginBottom: '10px' }}>
                        Check your knowledge
                      </p>
                      <p style={{ fontSize: '14px', fontWeight: 400, color: '#1A1A17', lineHeight: 1.5, marginBottom: '14px' }}>
                        {step.quiz.question}
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {step.quiz.options.map((opt, j) => {
                          const isSelected = qState?.selectedIndex === j
                          const isRevealed = qState?.revealed === true
                          const isCorrect = opt.correct === true

                          let bg = 'white'
                          let border = '1px solid var(--sand)'
                          let color = '#444440'

                          if (isRevealed) {
                            if (isCorrect) {
                              bg = '#D4F5E5'; border = '1px solid #52C48A'; color = '#1A5C36'
                            } else if (isSelected && !isCorrect) {
                              bg = '#FFE8E8'; border = '1px solid #F87171'; color = '#7A1A1A'
                            }
                          } else if (isSelected) {
                            bg = 'var(--sky)'; border = '1px solid var(--blue-pale)'; color = 'var(--navy)'
                          }

                          return (
                            <button
                              key={j}
                              onClick={() => handleOptionClick(step, j)}
                              disabled={qState?.correct === true}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: bg,
                                border,
                                borderRadius: '10px',
                                padding: '11px 14px',
                                fontSize: '13px',
                                color,
                                cursor: qState?.correct ? 'default' : 'pointer',
                                textAlign: 'left',
                                fontFamily: 'DM Sans, sans-serif',
                                fontWeight: 300,
                                width: '100%',
                                transition: 'background 0.15s, border-color 0.15s',
                              }}
                            >
                              {/* Option indicator */}
                              <span style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                border: isRevealed && isCorrect ? '2px solid #52C48A' : isRevealed && isSelected ? '2px solid #F87171' : isSelected ? '2px solid var(--blue-mid)' : '2px solid #D0CCC8',
                                background: isRevealed && isCorrect ? '#52C48A' : isRevealed && isSelected ? '#F87171' : isSelected ? 'var(--blue-mid)' : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                fontSize: '10px',
                                color: 'white',
                                fontWeight: 700,
                              }}>
                                {isRevealed && isCorrect ? '✓' : isRevealed && isSelected && !isCorrect ? '✕' : ''}
                              </span>
                              {opt.label}
                            </button>
                          )
                        })}
                      </div>

                      {/* Result feedback */}
                      {qState?.revealed && (
                        <div style={{
                          marginTop: '12px',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          background: qState.correct ? '#D4F5E5' : '#FFF3E8',
                          border: qState.correct ? '1px solid #52C48A' : '1px solid #FBB96C',
                        }}>
                          {qState.correct ? (
                            <div>
                              <p style={{ fontSize: '13px', fontWeight: 600, color: '#1A5C36', marginBottom: '4px' }}>
                                ✓ Correct — +{IQ_POINTS[step.level] ?? 5} Health IQ earned
                              </p>
                              <p style={{ fontSize: '12px', color: '#2D6A46', fontWeight: 300, margin: 0, lineHeight: 1.55 }}>
                                {step.quiz.explanation}
                              </p>
                            </div>
                          ) : (
                            <p style={{ fontSize: '13px', color: '#7A4010', margin: 0 }}>
                              ✕ Not quite — take another look at the article and try again.
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
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
              You completed the {trail.name} trail. Your Health IQ is now{' '}
              <strong style={{ color: 'var(--blue-pale)' }}>{healthIQ}</strong>.
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

      {/* Email wall — shown before revealing answer */}
      {pendingAnswer && (
        <EmailWall
          onSuccess={handleEmailWallSuccess}
          onClose={() => {
            setPendingAnswer(null)
            // Clear the unconfirmed selection
            setQuizStates(prev => {
              const copy = { ...prev }
              delete copy[pendingAnswer.slug]
              return copy
            })
          }}
        />
      )}
    </>
  )
}

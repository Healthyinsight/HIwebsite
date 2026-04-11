'use client'

import { useState, type CSSProperties } from 'react'

/**
 * MicroQuiz — sleep-themed dummy quiz with optional Phase 6 wiring.
 *
 * Standalone mode (no props): self-contained, "Continue learning" on the pass
 * screen resets the quiz. Used for isolated visual verification.
 *
 * Wired mode (`onPass` provided): when the user reaches the pass screen and
 * clicks "Continue learning", `onPass()` is invoked instead of resetting.
 * The parent is expected to persist the pass, unmount the quiz, and render a
 * locked confirmation in its place.
 *
 * Behaviour:
 * - One question at a time
 * - First click locks the answer and reveals feedback
 * - "Next question" advances after the user has seen the feedback
 * - On the last question, "See result" reveals pass/fail
 * - Pass = ≥70% (so 2 of 3 here). Pass screen shows "+{points} Evidence IQ"
 * - Fail screen has "Try again" → always resets internally
 */

type Question = {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

const QUESTIONS: Question[] = [
  {
    question: 'How many hours of sleep does the international consensus recommend for adult athletes?',
    options: ['5–6 hours', '6–7 hours', '7–9 hours', '10+ hours'],
    correctIndex: 2,
    explanation:
      'A panel of 24 sleep researchers reviewed over 1,000 studies and recommends 7–9 hours per night for adult athletes — with most needing the upper end.',
  },
  {
    question: 'In the Stanford basketball sleep extension study, how much did sprint times improve when players slept 10 hours per night?',
    options: ['No change', 'About 0.7 seconds', 'About 2 seconds', 'About 5 seconds'],
    correctIndex: 1,
    explanation:
      'When Stanford basketball players extended sleep to 10 hours/night for 5–7 weeks, sprint times improved by 0.7 seconds and shooting accuracy went up by 9%.',
  },
  {
    question: 'Why should you cut caffeine after roughly 2 PM if you want quality sleep?',
    options: [
      'Caffeine increases REM sleep',
      'Caffeine has a 5–6 hour half-life, so it is still active at bedtime',
      'Caffeine raises melatonin too early',
      'Caffeine blocks growth hormone release',
    ],
    correctIndex: 1,
    explanation:
      'Caffeine has a 5–6 hour half-life. A 4 PM coffee leaves roughly half the dose active at 10 PM, reducing deep sleep quality even if you fall asleep fine.',
  },
]

const DEFAULT_PASS_POINTS = 25
const PASS_THRESHOLD = 0.7

interface MicroQuizProps {
  /** Called once when the user clicks "Continue learning" on the pass screen.
   *  When provided, replaces the default reset behaviour — the parent should
   *  persist the pass and unmount the quiz in response. */
  onPass?: () => void
  /** Points displayed on the pass screen. Defaults to 25 for standalone use. */
  points?: number
}

export default function MicroQuiz({ onPass, points = DEFAULT_PASS_POINTS }: MicroQuizProps = {}) {
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [results, setResults] = useState<boolean[]>([])
  const [done, setDone] = useState(false)

  const total = QUESTIONS.length
  const current = QUESTIONS[qIndex]
  const revealed = selected !== null
  const isCorrect = revealed && selected === current.correctIndex
  const score = results.filter(Boolean).length
  const passed = score / total >= PASS_THRESHOLD
  const passThreshold = Math.ceil(total * PASS_THRESHOLD)

  function handleSelect(i: number) {
    if (revealed) return
    setSelected(i)
  }

  function handleNext() {
    if (selected === null) return
    const wasCorrect = selected === current.correctIndex
    const newResults = [...results, wasCorrect]
    if (qIndex + 1 < total) {
      setResults(newResults)
      setQIndex(qIndex + 1)
      setSelected(null)
    } else {
      setResults(newResults)
      setDone(true)
    }
  }

  function reset() {
    setQIndex(0)
    setSelected(null)
    setResults([])
    setDone(false)
  }

  // ── Result screen ────────────────────────────────────────────────────────
  if (done) {
    return (
      <div style={cardStyle}>
        {passed ? (
          <PassView
            score={score}
            total={total}
            points={points}
            onContinue={onPass ?? reset}
          />
        ) : (
          <FailView score={score} total={total} threshold={passThreshold} onRetry={reset} />
        )}
      </div>
    )
  }

  // ── Quiz screen ──────────────────────────────────────────────────────────
  return (
    <div style={cardStyle}>
      {/* Eyebrow + progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <span style={eyebrowStyle}>🧠 Quick check</span>
        <span style={progressStyle}>
          Question {qIndex + 1} of {total}
        </span>
      </div>

      {/* Question */}
      <h3 style={questionStyle}>{current.question}</h3>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
        {current.options.map((opt, i) => {
          const isSelectedOpt = selected === i
          const isCorrectChoice = i === current.correctIndex

          let bg = 'white'
          let border = '1px solid var(--sand)'
          let color = 'var(--navy)'
          let marker: string = String.fromCharCode(65 + i)

          if (revealed) {
            if (isCorrectChoice) {
              bg = '#E7F4EC'
              border = '1px solid #5BAE7B'
              color = '#1F5C3A'
              marker = '✓'
            } else if (isSelectedOpt) {
              bg = '#FCEAEA'
              border = '1px solid #C25B5B'
              color = '#7A2A2A'
              marker = '✕'
            } else {
              bg = '#FAF8F4'
              border = '1px solid var(--sand)'
              color = '#8A8A80'
            }
          } else if (isSelectedOpt) {
            bg = 'var(--sky)'
            border = '1px solid var(--blue-mid)'
            color = 'var(--navy)'
          }

          return (
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(i)}
              disabled={revealed}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '13px 15px',
                background: bg,
                border,
                color,
                borderRadius: '12px',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: 1.5,
                textAlign: 'left',
                cursor: revealed ? 'default' : 'pointer',
                width: '100%',
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  flexShrink: 0,
                  width: '20px',
                  display: 'inline-flex',
                  justifyContent: 'center',
                  marginTop: '1px',
                }}
              >
                {marker}
              </span>
              <span style={{ flex: 1 }}>{opt}</span>
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {revealed && (
        <div
          style={{
            background: isCorrect ? '#EDF7F1' : '#FBF1F1',
            border: `1px solid ${isCorrect ? '#C7E5D2' : '#EFCFCF'}`,
            borderRadius: '12px',
            padding: '13px 15px',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              color: isCorrect ? '#1F5C3A' : '#7A2A2A',
              marginBottom: '6px',
            }}
          >
            {isCorrect ? '✓ Correct' : '✕ Not quite'}
          </div>
          <p style={{ fontSize: '13px', color: '#444440', lineHeight: 1.65, margin: 0, fontWeight: 300 }}>
            {current.explanation}
          </p>
        </div>
      )}

      {/* Action button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={!revealed}
        style={{
          width: '100%',
          background: revealed ? 'var(--navy)' : '#D8D2C5',
          color: 'white',
          border: 'none',
          borderRadius: '100px',
          padding: '13px 24px',
          fontSize: '14px',
          fontWeight: 500,
          cursor: revealed ? 'pointer' : 'not-allowed',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        {qIndex + 1 < total ? 'Next question →' : 'See result'}
      </button>
    </div>
  )
}

// ── Result subcomponents ───────────────────────────────────────────────────

function PassView({
  score,
  total,
  points,
  onContinue,
}: {
  score: number
  total: number
  points: number
  onContinue: () => void
}) {
  return (
    <div style={{ textAlign: 'center', padding: '8px 0' }}>
      <div style={{ fontSize: '52px', marginBottom: '12px', lineHeight: 1 }}>🧠</div>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: 'var(--blue-mid)',
          marginBottom: '8px',
        }}
      >
        Quiz passed
      </div>
      <h3
        style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: '26px',
          fontWeight: 400,
          color: 'var(--navy)',
          marginBottom: '6px',
          marginTop: 0,
          lineHeight: 1.2,
        }}
      >
        +{points} Evidence IQ
      </h3>
      <p style={{ fontSize: '13px', color: '#666660', lineHeight: 1.6, marginBottom: '20px', fontWeight: 300 }}>
        You scored {score} of {total}. Knowledge locked in.
      </p>
      <button
        type="button"
        onClick={onContinue}
        style={{
          background: 'var(--navy)',
          color: 'white',
          border: 'none',
          borderRadius: '100px',
          padding: '12px 26px',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        Continue learning
      </button>
    </div>
  )
}

function FailView({
  score,
  total,
  threshold,
  onRetry,
}: {
  score: number
  total: number
  threshold: number
  onRetry: () => void
}) {
  return (
    <div style={{ textAlign: 'center', padding: '8px 0' }}>
      <div style={{ fontSize: '52px', marginBottom: '12px', lineHeight: 1 }}>📚</div>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#8A8A80',
          marginBottom: '8px',
        }}
      >
        Almost there
      </div>
      <h3
        style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: '26px',
          fontWeight: 400,
          color: 'var(--navy)',
          marginBottom: '6px',
          marginTop: 0,
          lineHeight: 1.2,
        }}
      >
        {score} of {total}
      </h3>
      <p style={{ fontSize: '13px', color: '#666660', lineHeight: 1.6, marginBottom: '20px', fontWeight: 300 }}>
        You need at least {threshold} of {total} to pass. Re-read the article and give it another go.
      </p>
      <button
        type="button"
        onClick={onRetry}
        style={{
          background: 'var(--navy)',
          color: 'white',
          border: 'none',
          borderRadius: '100px',
          padding: '12px 26px',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        Try again
      </button>
    </div>
  )
}

// ── Shared styles ──────────────────────────────────────────────────────────

const cardStyle: CSSProperties = {
  background: 'white',
  border: '1px solid var(--sand)',
  borderRadius: '16px',
  padding: '24px 22px',
}

const eyebrowStyle: CSSProperties = {
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  color: 'var(--blue-mid)',
}

const progressStyle: CSSProperties = {
  fontSize: '11px',
  color: '#8A8A80',
  fontWeight: 400,
}

const questionStyle: CSSProperties = {
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 500,
  color: 'var(--navy)',
  lineHeight: 1.4,
  marginTop: 0,
  marginBottom: '18px',
}

'use client'

import { useState } from 'react'

const questions = [
  {
    id: 1,
    question: 'How many hours of sleep do you typically get per night?',
    options: [
      { label: 'Less than 6 hours', points: 0, tag: 'recovery' },
      { label: '6 to 7 hours', points: 1, tag: 'recovery' },
      { label: '7 to 9 hours', points: 3, tag: 'recovery' },
      { label: 'More than 9 hours', points: 2, tag: 'recovery' },
    ],
  },
  {
    id: 2,
    question: 'How often do you do Zone 2 cardio (conversational pace) per week?',
    options: [
      { label: 'Never heard of it', points: 0, tag: 'motion' },
      { label: 'Rarely or never', points: 1, tag: 'motion' },
      { label: '1 to 2 times', points: 2, tag: 'motion' },
      { label: '3 or more times', points: 3, tag: 'motion' },
    ],
  },
  {
    id: 3,
    question: 'How do you typically fuel during training longer than 60 minutes?',
    options: [
      { label: 'Nothing, I train fasted', points: 0, tag: 'nutrition' },
      { label: 'Water only', points: 1, tag: 'nutrition' },
      { label: 'Some carbs or a gel', points: 2, tag: 'nutrition' },
      { label: 'Planned carb and electrolyte strategy', points: 3, tag: 'nutrition' },
    ],
  },
  {
    id: 4,
    question: 'How do you track your recovery between training sessions?',
    options: [
      { label: 'I go by feel only', points: 0, tag: 'recovery' },
      { label: 'I check if I am sore or tired', points: 1, tag: 'recovery' },
      { label: 'I use a wearable like Garmin or Oura', points: 2, tag: 'recovery' },
      { label: 'HRV, sleep quality, and resting heart rate', points: 3, tag: 'recovery' },
    ],
  },
  {
    id: 5,
    question: 'How often do you do strength training per week?',
    options: [
      { label: 'Never', points: 0, tag: 'motion' },
      { label: 'Once', points: 1, tag: 'motion' },
      { label: 'Twice', points: 2, tag: 'motion' },
      { label: '3 or more times', points: 3, tag: 'motion' },
    ],
  },
]

interface Result {
  score: number
  max: number
  label: string
  description: string
  color: string
  recommendedArticles: string[]
}

function getResult(score: number): Result {
  const max = questions.length * 3
  const pct = score / max

  if (pct < 0.33) {
    return {
      score, max,
      label: 'Building the Foundation',
      description: 'You are at the start of your evidence-based health journey. The fundamentals of sleep, training, and nutrition will have an outsized impact for you right now.',
      color: '#5095AC',
      recommendedArticles: ['sleep-for-performance', 'strength-training-for-beginners', 'how-to-improve-vo2max-12-week-plan'],
    }
  } else if (pct < 0.67) {
    return {
      score, max,
      label: 'Developing Performance',
      description: 'You have solid habits in place but there is meaningful room to optimise. Dialing in the details of recovery and training structure will move the needle significantly.',
      color: '#2D7DA8',
      recommendedArticles: ['fitness-recovery-what-works', 'zone-2-reality-check', 'strength-for-runners'],
    }
  } else {
    return {
      score, max,
      label: 'Advanced Performer',
      description: 'Your health and training habits are well above average. You are ready to go deep on the science and fine-tune what most people never think about.',
      color: '#1A4D6E',
      recommendedArticles: ['sleep-extension-performance-protocols', 'vo2max-physiological-mechanisms', 'intermediate-strength-training'],
    }
  }
}

export default function HealthIQQuiz() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const totalScore = answers.reduce((a, b) => a + b, 0)
  const result = getResult(totalScore)
  const progress = current / questions.length

  function handleAnswer(points: number) {
    const newAnswers = [...answers, points]
    setAnswers(newAnswers)

    if (current < questions.length - 1) {
      setCurrent(current + 1)
    } else {
      setShowResult(true)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) return
    setSubmitting(true)

    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName: name }),
      })
    } catch {}

    setSubmitting(false)
    setSubmitted(true)
  }

  const articleLabels: Record<string, string> = {
    'sleep-for-performance': 'Sleep for Performance',
    'strength-training-for-beginners': 'Strength Training for Beginners',
    'how-to-improve-vo2max-12-week-plan': 'How to Improve Your VO2 Max: The 12-Week Plan',
    'fitness-recovery-what-works': 'Fitness Recovery: What Works vs Hype',
    'zone-2-reality-check': 'Zone 2 Reality Check',
    'strength-for-runners': 'Strength for Runners',
    'sleep-extension-performance-protocols': 'Sleep Extension and Performance Protocols',
    'vo2max-physiological-mechanisms': 'VO2 Max: Physiological Mechanisms',
    'intermediate-strength-training': 'Intermediate Strength Training',
  }

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto' }}>
      {/* Quiz in progress */}
      {!showResult && (
        <>
          {/* Progress bar */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: '#8A8A80', fontWeight: 500 }}>
                Question {current + 1} of {questions.length}
              </span>
              <span style={{ fontSize: '12px', color: '#2D7DA8', fontWeight: 500 }}>
                Health IQ Quiz
              </span>
            </div>
            <div style={{ height: '4px', background: '#E8E2D8', borderRadius: '100px' }}>
              <div style={{ height: '4px', background: '#2D7DA8', borderRadius: '100px', width: `${progress * 100}%`, transition: 'width 0.3s ease' }} />
            </div>
          </div>

          <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '24px', fontWeight: 400, color: '#0F2A3F', lineHeight: 1.3, marginBottom: '28px' }}>
            {questions[current].question}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {questions[current].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt.points)}
                style={{
                  background: 'white',
                  border: '1px solid #E8E2D8',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  fontSize: '15px',
                  color: '#1A1A17',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 300,
                  transition: 'border-color 0.15s, background 0.15s',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.borderColor = '#2D7DA8'
                  ;(e.target as HTMLElement).style.background = '#F5F2EC'
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.borderColor = '#E8E2D8'
                  ;(e.target as HTMLElement).style.background = 'white'
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Results */}
      {showResult && !submitted && (
        <>
          <div style={{ background: '#0F2A3F', borderRadius: '20px', padding: '32px', marginBottom: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
              Your Health IQ
            </div>
            <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '56px', color: '#A8CCE0', fontWeight: 400, lineHeight: 1, marginBottom: '8px' }}>
              {Math.round((totalScore / (questions.length * 3)) * 100)}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>out of 100</div>
            <div style={{ display: 'inline-block', background: result.color, color: 'white', borderRadius: '100px', padding: '6px 16px', fontSize: '13px', fontWeight: 500 }}>
              {result.label}
            </div>
          </div>

          <p style={{ fontSize: '16px', color: '#444440', lineHeight: 1.75, marginBottom: '28px', fontWeight: 300 }}>
            {result.description}
          </p>

          <div style={{ background: '#D4EAF5', borderRadius: '14px', padding: '20px 24px', marginBottom: '28px' }}>
            <p style={{ fontSize: '13px', fontWeight: 500, color: '#0F2A3F', marginBottom: '12px', letterSpacing: '0.5px' }}>
              YOUR RECOMMENDED READING
            </p>
            {result.recommendedArticles.map(slug => (
              <div key={slug} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2D7DA8', flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: '#1A4D6E', fontWeight: 400 }}>{articleLabels[slug]}</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#F5F2EC', borderRadius: '16px', padding: '28px' }}>
            <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', fontWeight: 400, color: '#0F2A3F', marginBottom: '8px' }}>
              Get your full results and reading list
            </h4>
            <p style={{ fontSize: '14px', color: '#444440', marginBottom: '20px', fontWeight: 300, lineHeight: 1.65 }}>
              Enter your email to unlock your personalised article recommendations and get the Healthy Insight newsletter.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                placeholder="First name (optional)"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ background: 'white', border: '1px solid #E8E2D8', borderRadius: '100px', padding: '12px 18px', fontSize: '14px', fontFamily: 'DM Sans, sans-serif', outline: 'none' }}
              />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ background: 'white', border: '1px solid #E8E2D8', borderRadius: '100px', padding: '12px 18px', fontSize: '14px', fontFamily: 'DM Sans, sans-serif', outline: 'none' }}
              />
              <button
                type="submit"
                disabled={submitting}
                style={{ background: '#0F2A3F', color: 'white', border: 'none', borderRadius: '100px', padding: '13px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
              >
                {submitting ? 'Sending...' : 'Unlock my results'}
              </button>
              <p style={{ fontSize: '11px', color: '#8A8A80', textAlign: 'center', margin: 0 }}>
                No spam. Unsubscribe any time.
              </p>
            </form>
          </div>
        </>
      )}

      {/* Post-submit */}
      {submitted && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
          <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '26px', fontWeight: 400, color: '#0F2A3F', marginBottom: '12px' }}>
            Your results are on their way.
          </h3>
          <p style={{ fontSize: '16px', color: '#444440', lineHeight: 1.75, marginBottom: '28px', fontWeight: 300 }}>
            Check your inbox for your personalised reading list. In the meantime, start with your top recommendation.
          </p>
          <a
            href={`/articles/${result.recommendedArticles[0]}`}
            style={{ display: 'inline-block', background: '#0F2A3F', color: 'white', borderRadius: '100px', padding: '13px 28px', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}
          >
            Start reading
          </a>
        </div>
      )}
    </div>
  )
}

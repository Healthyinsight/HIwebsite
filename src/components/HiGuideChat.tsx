'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import Link from 'next/link'

interface CTA {
  label: string
  href: string
  type: 'trail' | 'quiz' | 'app' | 'article'
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  ctas?: CTA[]
  why?: string
  safetyDisclaimer?: boolean
}

type ChatState = 'chat' | 'loading' | 'choose_path'

const GREETING: Message = {
  role: 'assistant',
  content:
    "Hi! I'm the HI Guide. What health goal are you working on right now — running, sleep, strength, nutrition, or something else?",
}

function mergeCtas(existing: CTA[], incoming: CTA[]): CTA[] {
  const seen = new Set(existing.map(c => c.href))
  return [...existing, ...incoming.filter(c => !seen.has(c.href))]
}

function CtaButton({ cta }: { cta: CTA }) {
  const isTrail = cta.type === 'trail'
  const isQuiz = cta.type === 'quiz'
  const isApp = cta.type === 'app'

  if (cta.type === 'article') {
    return (
      <Link
        href={cta.href}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '13px',
          color: 'var(--blue-mid)',
          textDecoration: 'none',
          fontWeight: 400,
          padding: '2px 0',
        }}
      >
        <span style={{ fontSize: '11px' }}>→</span>
        {cta.label}
      </Link>
    )
  }

  return (
    <Link
      href={cta.href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        padding: '10px 18px',
        borderRadius: '100px',
        fontSize: '13px',
        fontWeight: 500,
        textDecoration: 'none',
        background: isTrail ? 'var(--navy)' : 'transparent',
        color: isTrail ? 'white' : 'var(--navy)',
        border: isTrail ? 'none' : '1px solid rgba(15,42,63,0.25)',
        flexShrink: 0,
      }}
    >
      {isTrail && <span style={{ fontSize: '11px' }}>▶</span>}
      {isQuiz && <span style={{ fontSize: '12px' }}>○</span>}
      {isApp && <span style={{ fontSize: '12px' }}>◈</span>}
      {cta.label}
    </Link>
  )
}

function AssistantMessage({ msg }: { msg: Message }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
      <div
        style={{
          background: 'var(--cream)',
          border: '1px solid rgba(15,42,63,0.06)',
          borderRadius: '2px 12px 12px 12px',
          padding: '12px 14px',
          fontSize: '13.5px',
          lineHeight: 1.65,
          color: '#1A1A17',
          maxWidth: '100%',
        }}
      >
        {msg.safetyDisclaimer && (
          <div
            style={{
              background: '#FFF8E1',
              border: '1px solid #F59E0B',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '12px',
              color: '#92400E',
              marginBottom: '10px',
              lineHeight: 1.5,
            }}
          >
            ⚠️ If you are experiencing pain or suspect an injury, please consult a qualified physiotherapist or doctor before following any training advice.
          </div>
        )}
        {msg.content}
      </div>

      {msg.ctas && msg.ctas.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', paddingLeft: '2px', width: '100%' }}>
          {msg.ctas.map(cta => (
            <CtaButton key={cta.href} cta={cta} />
          ))}
        </div>
      )}

      {msg.why && (
        <p
          style={{
            fontSize: '11.5px',
            color: '#8A8A80',
            fontStyle: 'italic',
            margin: 0,
            paddingLeft: '2px',
            lineHeight: 1.5,
          }}
        >
          Why this: {msg.why}
        </p>
      )}
    </div>
  )
}

function UserMessage({ msg }: { msg: Message }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div
        style={{
          background: 'var(--navy)',
          color: 'white',
          borderRadius: '12px 12px 2px 12px',
          padding: '10px 14px',
          fontSize: '13.5px',
          lineHeight: 1.6,
          maxWidth: '85%',
        }}
      >
        {msg.content}
      </div>
    </div>
  )
}

function ChoosePath({
  ctas,
  onReset,
}: {
  ctas: CTA[]
  onReset: () => void
}) {
  const trails = ctas.filter(c => c.type === 'trail')
  const quizzes = ctas.filter(c => c.type === 'quiz')
  const apps = ctas.filter(c => c.type === 'app')
  const articles = ctas.filter(c => c.type === 'article')

  const ordered = [...trails, ...quizzes, ...apps, ...articles]
  const primary = ordered[0]
  const rest = ordered.slice(1)

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 16px',
        gap: '12px',
        overflowY: 'auto',
      }}
    >
      <p
        style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: 'var(--blue-mid)',
          margin: 0,
        }}
      >
        Based on what you shared
      </p>

      {primary && (
        <Link
          href={primary.href}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            padding: '14px 18px',
            borderRadius: '12px',
            background: 'var(--navy)',
            color: 'white',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          <span>{primary.label}</span>
          <span style={{ fontSize: '16px', opacity: 0.7 }}>→</span>
        </Link>
      )}

      {rest.map(cta => (
        cta.type === 'article' ? (
          <Link
            key={cta.href}
            href={cta.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              color: 'var(--blue-mid)',
              textDecoration: 'none',
              padding: '4px 2px',
            }}
          >
            <span style={{ fontSize: '11px' }}>→</span>
            {cta.label}
          </Link>
        ) : (
          <Link
            key={cta.href}
            href={cta.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              padding: '12px 18px',
              borderRadius: '12px',
              background: 'transparent',
              color: 'var(--navy)',
              border: '1px solid rgba(15,42,63,0.2)',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: 400,
            }}
          >
            <span>{cta.label}</span>
            <span style={{ fontSize: '14px', opacity: 0.4 }}>→</span>
          </Link>
        )
      ))}

      <button
        onClick={onReset}
        style={{
          background: 'none',
          border: 'none',
          padding: '6px 0',
          fontSize: '12px',
          color: '#8A8A80',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: 'inherit',
          marginTop: '4px',
        }}
      >
        ← Start over
      </button>
    </div>
  )
}

export default function HiGuideChat() {
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState('')
  const [turn, setTurn] = useState(0)
  const [chatState, setChatState] = useState<ChatState>('chat')
  const [allCtas, setAllCtas] = useState<CTA[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, chatState])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || chatState === 'loading') return

    const userMsg: Message = { role: 'user', content: trimmed }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setChatState('loading')

    try {
      const res = await fetch('/api/hi-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, turn }),
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()

      const assistantMsg: Message = {
        role: 'assistant',
        content: data.answer,
        ctas: data.ctas,
        why: data.why,
        safetyDisclaimer: data.safetyDisclaimer,
      }

      setMessages(prev => [...prev, assistantMsg])
      setAllCtas(prev => mergeCtas(prev, data.ctas ?? []))
      setTurn(t => t + 1)

      if (data.nextState === 'choose_path') {
        setChatState('choose_path')
      } else {
        setChatState('chat')
      }
    } catch {
      const errorMsg: Message = {
        role: 'assistant',
        content: "Sorry, I ran into a problem. Please try again or use the links above to explore directly.",
        ctas: [
          { label: 'Take the Health IQ Quiz', href: '/quiz', type: 'quiz' },
          { label: 'Browse Learning Trails', href: '/trails', type: 'trail' },
        ],
      }
      setMessages(prev => [...prev, errorMsg])
      setChatState('chat')
    }
  }

  function handleReset() {
    setMessages([GREETING])
    setInput('')
    setTurn(0)
    setChatState('chat')
    setAllCtas([])
  }

  const isChoosePath = chatState === 'choose_path'
  const isLoading = chatState === 'loading'

  return (
    <div
      style={{
        border: '1px solid var(--sand)',
        borderRadius: '16px',
        background: 'white',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: 'clamp(440px, 58vh, 520px)',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '11px 16px',
          borderBottom: '1px solid var(--sand)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--blue-mid)',
          }}
        >
          HI Guide
        </span>
        {!isChoosePath && (
          <span
            style={{
              fontSize: '11px',
              color: '#B0B0A8',
              fontWeight: 300,
            }}
          >
            {turn}/2 questions used
          </span>
        )}
        {isChoosePath && (
          <span
            style={{
              fontSize: '11px',
              color: 'var(--blue-mid)',
              fontWeight: 400,
              letterSpacing: '0.5px',
            }}
          >
            Choose your path
          </span>
        )}
      </div>

      {/* Body */}
      {isChoosePath ? (
        <ChoosePath ctas={allCtas} onReset={handleReset} />
      ) : (
        <>
          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {messages.map((msg, i) =>
              msg.role === 'assistant' ? (
                <AssistantMessage key={i} msg={msg} />
              ) : (
                <UserMessage key={i} msg={msg} />
              )
            )}

            {isLoading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingLeft: '2px' }}>
                <span style={{ fontSize: '12px', color: '#B0B0A8' }}>HI Guide is thinking</span>
                <span
                  style={{
                    display: 'inline-flex',
                    gap: '3px',
                  }}
                >
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: '#B0B0A8',
                        animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            style={{
              borderTop: '1px solid var(--sand)',
              padding: '10px 12px',
              display: 'flex',
              gap: '8px',
              flexShrink: 0,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={
                turn === 0
                  ? 'E.g. I want to start running...'
                  : 'One more question...'
              }
              disabled={isLoading}
              style={{
                flex: 1,
                border: '1px solid rgba(15,42,63,0.15)',
                borderRadius: '100px',
                padding: '9px 16px',
                fontSize: '13.5px',
                fontFamily: 'inherit',
                fontWeight: 300,
                color: '#1A1A17',
                background: 'var(--warm)',
                outline: 'none',
                opacity: isLoading ? 0.6 : 1,
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: input.trim() && !isLoading ? 'var(--navy)' : 'rgba(15,42,63,0.12)',
                border: 'none',
                color: input.trim() && !isLoading ? 'white' : '#B0B0A8',
                cursor: input.trim() && !isLoading ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '14px',
                transition: 'background 0.15s, color 0.15s',
              }}
              aria-label="Send"
            >
              →
            </button>
          </form>
        </>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

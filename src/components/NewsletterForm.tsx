'use client'

import { useState } from 'react'

interface NewsletterFormProps {
  dark?: boolean // true = white text on dark bg, false = dark text on light bg
  size?: 'sm' | 'lg'
  onSuccess?: () => void
}

export default function NewsletterForm({ dark = true, size = 'lg', onSuccess }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const inputPad = size === 'lg' ? '13px 20px' : '10px 16px'
  const btnPad = size === 'lg' ? '13px' : '10px'
  const fontSize = size === 'lg' ? '14px' : '13px'

  const textColor = dark ? 'white' : '#0F2A3F'
  const inputBg = dark ? 'rgba(255,255,255,0.09)' : 'white'
  const inputBorder = dark ? '1px solid rgba(255,255,255,0.18)' : '1px solid #E8E2D8'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
        onSuccess?.()
      } else {
        const data = await res.json().catch(() => null)
        setErrorMsg(data?.error || 'Something went wrong. Try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{
        background: dark ? 'rgba(255,255,255,0.1)' : '#D4EAF5',
        borderRadius: '12px',
        padding: '24px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
        <p style={{ color: textColor, fontSize: fontSize, fontWeight: 500, margin: '0 0 4px' }}>
          You are in.
        </p>
        <p style={{ color: dark ? 'rgba(255,255,255,0.55)' : '#444440', fontSize: '13px', margin: 0 }}>
          Check your inbox for a welcome email from Filip.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email address"
        disabled={status === 'loading'}
        style={{
          background: inputBg,
          border: inputBorder,
          borderRadius: '100px',
          padding: inputPad,
          color: textColor,
          fontSize: fontSize,
          fontFamily: 'DM Sans, sans-serif',
          outline: 'none',
          opacity: status === 'loading' ? 0.7 : 1,
        }}
      />

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          background: dark ? 'white' : '#0F2A3F',
          color: dark ? '#0F2A3F' : 'white',
          border: 'none',
          borderRadius: '100px',
          padding: btnPad,
          fontSize: fontSize,
          fontWeight: 500,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          fontFamily: 'DM Sans, sans-serif',
          opacity: status === 'loading' ? 0.7 : 1,
          transition: 'opacity 0.2s',
        }}
      >
        {status === 'loading' ? 'Subscribing...' : 'Get the newsletter'}
      </button>

      {status === 'error' && (
        <p style={{ color: '#ff6b6b', fontSize: '13px', textAlign: 'center', margin: 0 }}>
          {errorMsg}
        </p>
      )}

      <p style={{ fontSize: '11px', color: dark ? 'rgba(255,255,255,0.28)' : '#8A8A80', textAlign: 'center', margin: 0 }}>
        No spam. Unsubscribe any time. We never share your data.
      </p>
    </form>
  )
}

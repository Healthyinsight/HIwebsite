'use client'

import { useState } from 'react'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) return
    setStatus('loading')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.status === 409) {
        setStatus('duplicate')
      } else if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ background: 'var(--sky)', borderRadius: '14px', padding: '20px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '16px', fontWeight: 500, color: 'var(--navy)', margin: 0 }}>
          You&apos;re on the list! We&apos;ll be in touch.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '0 22px',
            height: '52px',
            borderRadius: '100px',
            border: '1.5px solid var(--sand)',
            background: 'white',
            fontSize: '15px',
            color: 'var(--navy)',
            outline: 'none',
            fontFamily: 'DM Sans, sans-serif',
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            width: '100%',
            height: '52px',
            borderRadius: '100px',
            background: 'var(--navy)',
            color: 'white',
            border: 'none',
            fontSize: '16px',
            fontWeight: 500,
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            opacity: status === 'loading' ? 0.6 : 1,
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          {status === 'loading' ? 'Sending…' : 'Notify me'}
        </button>
      </div>

      {status === 'duplicate' && (
        <p style={{ marginTop: '10px', fontSize: '14px', color: 'var(--blue-mid)', textAlign: 'center' }}>
          You&apos;re already on the list.
        </p>
      )}
      {status === 'error' && (
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#cc3333', textAlign: 'center' }}>
          Something went wrong. Please try again.
        </p>
      )}

      <p style={{ marginTop: '12px', fontSize: '13px', color: '#8A8A80', textAlign: 'center', fontWeight: 300 }}>
        No spam. Unsubscribe any time.
      </p>
    </form>
  )
}

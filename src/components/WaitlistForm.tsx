'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import Link from 'next/link'
import { useId } from 'react'
import { EMAIL_PROMISE, VISUALLY_HIDDEN } from '@/lib/emailCapture'

export default function WaitlistForm({ source = 'tracker_waitlist' }: { source?: string } = {}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle')
  const inputId = useId()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) return
    setStatus('loading')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
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
        <label htmlFor={inputId} style={VISUALLY_HIDDEN}>
          Your email address
        </label>
        <input
          id={inputId}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          autoComplete="email"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '0 22px',
            height: '52px',
            borderRadius: '100px',
            border: '1.5px solid var(--sand)',
            background: 'white',
            fontSize: '16px',
            color: 'var(--navy)',
            outline: 'none',
            fontFamily: 'DM Sans, sans-serif',
          }}
        />
        <Button
          type="submit"
          loading={status === 'loading'}
          fullWidth
          size="lg"
          style={{ height: '52px', fontSize: '16px' }}
        >
          Notify me
        </Button>
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

      <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--muted)', textAlign: 'center', fontWeight: 300 }}>
        {EMAIL_PROMISE}{' '}
        <Link href="/privacy" style={{ color: 'var(--blue-mid)', textDecoration: 'underline' }}>
          Privacy policy
        </Link>
      </p>
    </form>
  )
}

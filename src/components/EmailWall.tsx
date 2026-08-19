'use client'

import { useState } from 'react'
import Modal from '@/components/Modal'
import Button from '@/components/Button'
import Link from 'next/link'
import { useId } from 'react'
import { EMAIL_PROMISE, VISUALLY_HIDDEN } from '@/lib/emailCapture'

interface EmailWallProps {
  onSuccess: () => void
  onClose: () => void
}

export default function EmailWall({ onSuccess, onClose }: EmailWallProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const nameId = useId()
  const emailId = useId()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName: name, source: 'trail_unlock' }),
      })
      if (res.ok) {
        try { localStorage.setItem('hi_email_unlocked', 'true') } catch {}
        setStatus('success')
        setTimeout(onSuccess, 900)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <Modal open={true} onClose={onClose} size="sm">
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔒</div>
        <h3 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '22px', fontWeight: 400, color: 'var(--navy)', marginBottom: '8px', lineHeight: 1.25 }}>
          Advanced level content
        </h3>
        <p style={{ fontSize: '14px', color: '#444440', lineHeight: 1.65, fontWeight: 300, margin: 0 }}>
          This article is part of the advanced tier. Enter your email to unlock it and get the full Healthy Insight newsletter.
        </p>
      </div>

      {status === 'success' ? (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>✓</div>
          <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--navy)', margin: 0 }}>
            Unlocked. Opening article…
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label htmlFor={nameId} style={VISUALLY_HIDDEN}>First name (optional)</label>
          <input
            id={nameId}
            autoComplete="given-name"
            type="text"
            placeholder="First name (optional)"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ background: 'white', border: '1px solid #E8E2D8', borderRadius: '100px', padding: '12px 18px', fontSize: '16px', fontFamily: 'var(--font-sans), system-ui, sans-serif', outline: 'none' }}
          />
          <label htmlFor={emailId} style={VISUALLY_HIDDEN}>Your email address</label>
          <input
            id={emailId}
            autoComplete="email"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ background: 'white', border: '1px solid #E8E2D8', borderRadius: '100px', padding: '12px 18px', fontSize: '16px', fontFamily: 'var(--font-sans), system-ui, sans-serif', outline: 'none' }}
          />
          <Button type="submit" loading={status === 'loading'} fullWidth size="lg">
            Unlock this article
          </Button>
          {status === 'error' && (
            <p style={{ color: '#ff6b6b', fontSize: '13px', textAlign: 'center', margin: 0 }}>
              Something went wrong. Try again.
            </p>
          )}
          <p style={{ fontSize: '11px', color: 'var(--muted)', textAlign: 'center', margin: 0 }}>
            {EMAIL_PROMISE}{' '}
            <Link href="/privacy" style={{ color: 'var(--blue-mid)', textDecoration: 'underline' }}>
              Privacy policy
            </Link>
          </p>
        </form>
      )}
    </Modal>
  )
}

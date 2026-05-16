'use client'

import { useState } from 'react'

interface EmailWallProps {
  onSuccess: () => void
  onClose: () => void
}

export default function EmailWall({ onSuccess, onClose }: EmailWallProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName: name }),
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
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(15, 42, 63, 0.6)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{
          background: 'var(--cream)',
          borderRadius: '24px',
          padding: 'clamp(28px, 6vw, 40px)',
          maxWidth: '400px',
          width: '100%',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: '#8A8A80',
            padding: '4px',
            lineHeight: 1,
            fontFamily: 'inherit',
          }}
          aria-label="Close"
        >
          ✕
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔒</div>
          <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', fontWeight: 400, color: 'var(--navy)', marginBottom: '8px', lineHeight: 1.25 }}>
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
              disabled={status === 'loading'}
              style={{
                background: 'var(--navy)',
                color: 'white',
                border: 'none',
                borderRadius: '100px',
                padding: '13px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                opacity: status === 'loading' ? 0.7 : 1,
              }}
            >
              {status === 'loading' ? 'Unlocking…' : 'Unlock this article'}
            </button>
            {status === 'error' && (
              <p style={{ color: '#ff6b6b', fontSize: '13px', textAlign: 'center', margin: 0 }}>
                Something went wrong. Try again.
              </p>
            )}
            <p style={{ fontSize: '11px', color: '#8A8A80', textAlign: 'center', margin: 0 }}>
              No spam. Unsubscribe any time.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

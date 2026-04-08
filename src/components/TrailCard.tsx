'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Trail } from '@/lib/trails'

const PILLAR_STYLES: Record<string, { bg: string; accent: string }> = {
  recovery: { bg: 'linear-gradient(135deg, #0F2A3F 0%, #1A4D6E 100%)', accent: '#A8CCE0' },
  motion:   { bg: 'linear-gradient(135deg, #1A3A2A 0%, #1E5C3A 100%)', accent: '#95D5B2' },
  nutrition:{ bg: 'linear-gradient(135deg, #3A2A10 0%, #6B4A1C 100%)', accent: '#D4B896' },
  mindset:  { bg: 'linear-gradient(135deg, #2A1A3A 0%, #4A2D6E 100%)', accent: '#C4B5D5' },
}

export default function TrailCard({ trail }: { trail: Trail }) {
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('hi_completed_slugs')
      if (!raw) return
      const completed: string[] = JSON.parse(raw)
      const slugSet = new Set(completed)
      setCompletedCount(trail.steps.filter(s => slugSet.has(s.slug)).length)
    } catch {}
  }, [trail.steps])

  const style = PILLAR_STYLES[trail.pillar] ?? PILLAR_STYLES.recovery
  const total = trail.steps.length

  return (
    <div style={{
      background: style.bg,
      borderRadius: '20px',
      padding: 'clamp(22px, 5vw, 32px)',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      minHeight: '210px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '26px', lineHeight: 1 }}>{trail.badge.emoji}</span>
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: style.accent }}>
          {trail.pillar}
        </span>
      </div>

      {/* Title + tagline */}
      <div style={{ flex: 1 }}>
        <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 400, color: 'white', marginBottom: '6px', lineHeight: 1.2 }}>
          {trail.name}
        </h3>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, margin: 0 }}>
          {trail.tagline}
        </p>
      </div>

      {trail.comingSoon ? (
        <div style={{
          display: 'inline-block',
          alignSelf: 'flex-start',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: '100px',
          padding: '6px 14px',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.4)',
          fontWeight: 500,
        }}>
          Coming soon
        </div>
      ) : (
        <>
          {/* Progress dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {trail.steps.map((step, i) => (
              <div key={step.slug} style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: i < completedCount ? style.accent : 'rgba(255,255,255,0.18)',
                transition: 'background 0.3s',
                flexShrink: 0,
              }} />
            ))}
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginLeft: '6px' }}>
              {completedCount}/{total}
            </span>
          </div>

          <Link href={`/trails/${trail.id}`} style={{
            display: 'inline-block',
            alignSelf: 'flex-start',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: '100px',
            padding: '9px 20px',
            fontSize: '13px',
            fontWeight: 500,
            color: 'white',
            textDecoration: 'none',
          }}>
            {completedCount === 0 ? 'Start trail' : completedCount === total ? 'View trail' : 'Continue trail'}
          </Link>
        </>
      )}
    </div>
  )
}

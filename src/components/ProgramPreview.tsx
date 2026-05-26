import Link from 'next/link'
import type { Trail } from '@/lib/trails'
import { WAITLIST_MODE } from '@/config'

const PILLAR_FOCUS: Record<string, string> = {
  recovery:  'recovery and sleep optimization',
  motion:    'aerobic conditioning and strength training',
  nutrition: 'race-day fueling and nutrition timing',
  mindset:   'goal-setting and mental performance strategies',
}

export default function ProgramPreview({ trail }: { trail: Trail }) {
  const focus = PILLAR_FOCUS[trail.pillar] ?? 'evidence-based training'
  const ctaHref = WAITLIST_MODE ? '/waitlist' : '/programs'

  return (
    <div style={{
      background: 'var(--navy)',
      borderRadius: '20px',
      padding: 'clamp(24px, 5vw, 36px)',
      marginTop: '28px',
    }}>
      <div style={{
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: 'var(--blue-pale)',
        marginBottom: '10px',
      }}>
        What&apos;s next
      </div>

      <h3 style={{
        fontFamily: 'DM Serif Display, serif',
        fontSize: 'clamp(20px, 4vw, 24px)',
        fontWeight: 400,
        color: 'white',
        lineHeight: 1.25,
        marginBottom: '12px',
      }}>
        Turn knowledge into results with HI Programs
      </h3>

      <p style={{
        fontSize: '14px',
        color: 'rgba(255,255,255,0.55)',
        lineHeight: 1.65,
        marginBottom: '20px',
        fontWeight: 300,
      }}>
        A structured 12-week plan built around {focus}, personalised to your
        training schedule and race calendar.
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          'Week-by-week structured training',
          'Personalised to your race calendar',
          'Built on the same evidence you just learned',
        ].map(item => (
          <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>
            <span style={{ color: 'var(--blue-pale)', flexShrink: 0, marginTop: '1px' }}>→</span>
            {item}
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        style={{
          display: 'inline-block',
          background: 'white',
          color: 'var(--navy)',
          borderRadius: '100px',
          padding: '12px 26px',
          fontSize: '14px',
          fontWeight: 500,
          textDecoration: 'none',
        }}
      >
        Get HI Programs →
      </Link>
    </div>
  )
}

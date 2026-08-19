import { LEVEL_LABELS, LEVEL_SCALE_SUMMARY } from '@/lib/levels'

/** Explains the LEVEL badges on listing pages, where they first appear. */
export default function LevelLegend() {
  return (
    <details
      style={{
        background: 'var(--cream)',
        border: '1px solid var(--sand)',
        borderRadius: '12px',
        padding: '12px 16px',
        marginBottom: '20px',
      }}
    >
      <summary
        style={{
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--navy)',
          cursor: 'pointer',
          listStyle: 'revert',
        }}
      >
        What do the levels mean?
      </summary>
      <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, margin: '10px 0 12px' }}>
        {LEVEL_SCALE_SUMMARY}
      </p>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '6px' }}>
        {Object.entries(LEVEL_LABELS).map(([level, label]) => (
          <li key={level} style={{ display: 'flex', gap: '10px', alignItems: 'baseline', fontSize: '13px' }}>
            <span
              style={{
                flexShrink: 0,
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                background: 'var(--sky)',
                color: 'var(--navy)',
                borderRadius: '100px',
                padding: '3px 10px',
              }}
            >
              Level {level}
            </span>
            <span style={{ color: 'var(--muted)' }}>{label}</span>
          </li>
        ))}
      </ul>
    </details>
  )
}

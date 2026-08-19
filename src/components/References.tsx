import type { Source } from '@/lib/sources'

const qualityStyles: Record<string, { background: string; color: string; label: string }> = {
  High:    { background: 'var(--sky)',  color: '#1F5C7A', label: 'High quality' },
  Medium:  { background: '#F5F0E8',     color: '#6B5E4A', label: 'Medium quality' },
  Low:     { background: '#F6E9E6',     color: '#8A4B3C', label: 'Low quality' },
  Unrated: { background: 'var(--sand)', color: '#5A5A52', label: 'Unrated' },
}

/**
 * Inline citation marker. Renders a superscript number linking to the matching
 * entry in the reference list. Bound to one article's sources by `makeCite`,
 * so MDX bodies only ever write <Cite id="f4d259eb" />.
 */
export function makeCite(sources: Source[]) {
  return function Cite({ id }: { id: string }) {
    const index = sources.findIndex(s => s.id === id)
    if (index === -1) return null
    const n = index + 1
    return (
      <sup style={{ lineHeight: 0 }}>
        <a
          href={`#ref-${n}`}
          aria-label={`Reference ${n}: ${sources[index].citation}`}
          style={{
            color: 'var(--blue-mid)',
            textDecoration: 'none',
            fontSize: '11px',
            fontWeight: 600,
            padding: '0 1px',
          }}
        >
          [{n}]
        </a>
      </sup>
    )
  }
}

/**
 * Reference list rendered at the end of an article. Returns null when the
 * article has no sources, so no empty block is ever shown. Articles that make a
 * study claim with no sources are caught by scripts/check-citations.mjs instead.
 */
export default function References({ sources }: { sources: Source[] }) {
  if (sources.length === 0) return null

  return (
    <section
      aria-labelledby="references-heading"
      style={{
        background: 'var(--cream)',
        border: '1px solid var(--sand)',
        borderRadius: '14px',
        padding: 'clamp(20px, 4vw, 28px)',
        marginBottom: '36px',
      }}
    >
      <h2
        id="references-heading"
        style={{
          fontSize: '12px',
          fontWeight: 500,
          color: 'var(--navy)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          margin: '0 0 4px',
        }}
      >
        References
      </h2>
      <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 20px', lineHeight: 1.6 }}>
        {sources.length} peer-reviewed {sources.length === 1 ? 'source' : 'sources'}. Every link goes to the study itself, not a summary of it.
      </p>

      <ol style={{ margin: 0, padding: 0, listStyle: 'none', counterReset: 'ref' }}>
        {sources.map((source, i) => {
          const n = i + 1
          const quality = qualityStyles[source.quality] ?? qualityStyles.Unrated
          return (
            <li
              key={source.id}
              id={`ref-${n}`}
              style={{
                display: 'flex',
                gap: '12px',
                paddingBottom: i < sources.length - 1 ? '16px' : 0,
                marginBottom: i < sources.length - 1 ? '16px' : 0,
                borderBottom: i < sources.length - 1 ? '1px solid var(--sand)' : 'none',
                scrollMarginTop: '80px',
              }}
            >
              <span
                aria-hidden
                style={{
                  flexShrink: 0,
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--blue-mid)',
                  minWidth: '22px',
                }}
              >
                {n}.
              </span>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: '14px', color: '#3A3A36', lineHeight: 1.6, margin: '0 0 8px' }}>
                  {source.citation}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {source.studyType && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 500,
                        padding: '3px 10px',
                        borderRadius: '100px',
                        background: 'var(--warm)',
                        border: '1px solid var(--sand)',
                        color: '#5A5A52',
                      }}
                    >
                      {source.studyType}
                    </span>
                  )}
                  {source.year !== null && (
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{source.year}</span>
                  )}
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 500,
                      padding: '3px 10px',
                      borderRadius: '100px',
                      background: quality.background,
                      color: quality.color,
                    }}
                  >
                    {quality.label}
                  </span>
                  {source.studyUrl && (
                    <a
                      href={source.studyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'var(--blue-mid)',
                        textDecoration: 'none',
                      }}
                    >
                      View study <span aria-hidden>↗</span>
                    </a>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

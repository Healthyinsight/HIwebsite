import Link from 'next/link'

/**
 * Author card shown at the end of every article, with the last-reviewed date.
 *
 * The disclaimer is the one already published on /about. A YMYL health site
 * that tells readers to judge the evidence themselves has to say plainly who
 * is doing the synthesising and what they are not.
 */
export default function AuthorCard({
  lastReviewed,
  publishedAt,
}: {
  /** From the CMS `Last Reviewed Date`. Absent for most articles today. */
  lastReviewed?: string
  publishedAt: string
}) {
  const date = lastReviewed ?? publishedAt
  const label = lastReviewed ? 'Last reviewed' : 'Published, not yet re-reviewed'
  const formatted = new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section
      style={{
        background: 'var(--cream)',
        border: '1px solid var(--sand)',
        borderRadius: '14px',
        padding: 'clamp(20px, 4vw, 26px)',
        marginBottom: '36px',
      }}
    >
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div
          aria-hidden
          style={{
            flexShrink: 0,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--navy)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: '17px',
          }}
        >
          FB
        </div>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--navy)', margin: '0 0 6px' }}>
            Filip Berggren
          </p>
          <p style={{ fontSize: '14px', color: '#3A3A36', lineHeight: 1.65, margin: '0 0 12px', fontWeight: 300 }}>
            I&apos;m not a physician, PhD, or licensed dietitian. I synthesise published,
            peer-reviewed research and translate it into practical guidance. I&apos;m a careful
            reader of studies, not a producer of them. Nothing on HI constitutes medical advice.
          </p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/about"
              style={{ fontSize: '13px', fontWeight: 500, color: 'var(--blue-mid)', textDecoration: 'none' }}
            >
              How HI works →
            </Link>
            <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
              {label}: <time dateTime={date}>{formatted}</time>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

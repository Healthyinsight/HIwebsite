import NewsletterForm from '@/components/NewsletterForm'

/**
 * Email capture for the article template. Search traffic lands on articles and
 * used to leave without ever being offered the list.
 *
 * `variant="mid"` is the compact one placed inside the body after the protocol
 * section; `variant="end"` closes the article. Same promise line as the
 * homepage block, so the offer reads identically wherever a reader meets it.
 */
export default function ArticleNewsletterBlock({
  variant = 'end',
  source,
}: {
  variant?: 'mid' | 'end'
  source: string
}) {
  const mid = variant === 'mid'

  return (
    <aside
      style={{
        background: 'var(--navy)',
        borderRadius: mid ? '16px' : '20px',
        padding: mid ? 'clamp(20px, 4vw, 26px)' : 'clamp(24px, 5vw, 34px)',
        marginBottom: '36px',
        marginTop: mid ? '36px' : 0,
      }}
    >
      <div
        style={{
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: 'var(--blue-pale)',
          marginBottom: '10px',
        }}
      >
        The newsletter
      </div>
      <h2
        style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: mid ? 'clamp(1.1rem, 3.5vw, 1.4rem)' : 'clamp(1.3rem, 4vw, 1.75rem)',
          fontWeight: 400,
          color: 'white',
          lineHeight: 1.25,
          letterSpacing: '-0.3px',
          margin: '0 0 10px',
        }}
      >
        One evidence-based insight. Every week. For your race.
      </h2>
      <p
        style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.55)',
          lineHeight: 1.7,
          margin: '0 0 18px',
          fontWeight: 300,
          maxWidth: '46ch',
        }}
      >
        Built for runners and triathletes training for their first big event. No fluff, no
        affiliate links, just the research that matters for your training week, delivered every
        Sunday.
      </p>
      <NewsletterForm size="sm" source={source} />
    </aside>
  )
}

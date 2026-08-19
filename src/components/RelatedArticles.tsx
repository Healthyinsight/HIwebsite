import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'

/**
 * Related reading at the end of an article. Prefers the rest of the article's
 * trail, and falls back to the same pillar for solo articles, so search traffic
 * that lands deep in the site always has somewhere to go next.
 */
export default function RelatedArticles({
  articles,
  heading,
}: {
  articles: ArticleMeta[]
  heading: string
}) {
  if (articles.length === 0) return null

  return (
    <section aria-labelledby="related-heading" style={{ marginBottom: '36px' }}>
      <h2
        id="related-heading"
        style={{
          fontSize: '12px',
          fontWeight: 500,
          color: 'var(--navy)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          margin: '0 0 16px',
        }}
      >
        {heading}
      </h2>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '10px' }}>
        {articles.map(a => (
          <li key={a.slug}>
            <Link
              href={`/articles/${a.slug}`}
              style={{
                display: 'block',
                background: 'var(--cream)',
                border: '1px solid var(--sand)',
                borderRadius: '12px',
                padding: '16px 18px',
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontFamily: 'DM Serif Display, serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: 'var(--navy)',
                  lineHeight: 1.3,
                  marginBottom: '6px',
                }}
              >
                {a.title}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
                {a.level ? `Level ${a.level} · ` : ''}
                {a.readingTime} read
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

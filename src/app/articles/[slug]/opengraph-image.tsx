import { ImageResponse } from 'next/og'
import { getArticles } from '@/lib/articles'
import { pillarGradients } from '@/lib/pillars'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Healthy Insight'

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map(a => ({ slug: a.slug }))
}

/**
 * Per-article share card. No article in the CMS has a hero image synced to the
 * site yet, so every card is generated from the article's own metadata against
 * its pillar gradient. Shared links used to render as a blank large card:
 * twitter:card was summary_large_image with no og:image anywhere.
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const articles = await getArticles()
  const article = articles.find(a => a.slug === slug)

  const gradient = article ? pillarGradients[article.pillar] : pillarGradients.recovery
  const title = article?.title ?? 'Healthy Insight'
  const pillar = article?.pillar ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: gradient,
          padding: '72px',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px' }}>Healthy Insight</div>
          {pillar && (
            <div
              style={{
                display: 'flex',
                fontSize: 18,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                padding: '8px 20px',
                borderRadius: 100,
                background: 'rgba(255,255,255,0.18)',
              }}
            >
              {pillar}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', fontSize: title.length > 70 ? 54 : 66, lineHeight: 1.15, letterSpacing: '-1.5px' }}>
          {title}
        </div>

        <div style={{ display: 'flex', fontSize: 22, color: 'rgba(255,255,255,0.72)' }}>
          {article?.level ? `Level ${article.level}  ·  ` : ''}
          Evidence-based. Every claim sourced.
        </div>
      </div>
    ),
    size,
  )
}

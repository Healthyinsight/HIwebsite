import Link from 'next/link'
import { pillarGradients } from '@/lib/pillars'

interface ArticleCardProps {
  slug: string
  title: string
  excerpt: string
  pillar: string
  format?: string
  level?: number
  readingTime?: string
  publishedAt?: string
  large?: boolean
}

const formatLabels: Record<string, string> = {
  'guide':     'Guide',
  'protocol':  'Protocol',
  'myth-bust': 'Myth-bust',
  'review':    'Review',
  'checklist': 'Checklist',
}

export default function ArticleCard({ slug, title, excerpt, pillar, format, level, readingTime, large = false }: ArticleCardProps) {
  const gradient = pillarGradients[pillar] || pillarGradients.recovery

  return (
    <Link href={`/articles/${slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <article style={{ background: '#FAFAF7', borderRadius: '22px', overflow: 'hidden', border: '1px solid rgba(15,42,63,0.06)', transition: 'transform 0.2s, box-shadow 0.2s', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ aspectRatio: large ? '16 / 9' : '5 / 3', minHeight: large ? '160px' : '110px', background: gradient, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '16px 20px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', top: '-40px', right: '-40px' }} />
          <span style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)', fontSize: '10px', fontWeight: 500, letterSpacing: '1.2px', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '100px', position: 'relative', zIndex: 1 }}>
            {pillar.charAt(0).toUpperCase() + pillar.slice(1)}{level ? ` · Level ${level}` : ''}
          </span>
          {format && formatLabels[format] && (
            <span style={{ background: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.85)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.8px', padding: '5px 12px', borderRadius: '100px', position: 'relative', zIndex: 1 }}>
              {formatLabels[format]}
            </span>
          )}
        </div>
        <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: large ? 'clamp(17px, 2.5vw, 20px)' : 'clamp(14px, 2vw, 17px)', fontWeight: 400, color: '#1A1A17', lineHeight: 1.3, marginBottom: '9px' }}>
            {title}
          </h3>
          <p style={{ fontSize: '14px', color: '#8A8A80', lineHeight: 1.6, marginBottom: '16px', flex: 1 }}>
            {excerpt}
          </p>
          <span style={{ fontSize: '13px', fontWeight: 500, color: '#0F2A3F' }}>
            Read{readingTime ? ` · ${readingTime}` : ''}
          </span>
        </div>
      </article>
    </Link>
  )
}

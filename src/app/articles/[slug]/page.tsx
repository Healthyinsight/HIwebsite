import Footer from '@/components/Footer'
import { articles } from '@/lib/articles'
import { pillarGradients } from '@/lib/pillars'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find(a => a.slug === slug)
  if (!article) return {}
  return { title: article.title, description: article.excerpt }
}

const evidenceBadgeStyles: Record<string, { background: string; color: string; border: string; label: string }> = {
  strong: { background: 'var(--sky)', color: 'var(--blue)', border: '1px solid var(--blue-pale)', label: 'Strong evidence' },
  mixed:  { background: 'var(--sand)', color: 'var(--navy)', border: '1px solid var(--sand)', label: 'Mixed evidence' },
  early:  { background: '#F5F0E8', color: '#6B5E4A', border: '1px solid var(--sand)', label: 'Early-stage evidence' },
}

export default async function ArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const article = articles.find(a => a.slug === slug)
  if (!article) notFound()

  const badge = article.evidenceStrength ? evidenceBadgeStyles[article.evidenceStrength] : null

  return (
    <>
      <main>
        {/* Header */}
        <div style={{ background: pillarGradients[article.pillar], padding: '72px 52px 80px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', top: '-200px', right: '-100px' }} />
          <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
              <Link href="/articles" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Articles</Link>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textTransform: 'capitalize' }}>{article.pillar}</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {article.level && (
                <span style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)', fontSize: '10px', fontWeight: 500, letterSpacing: '1.2px', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '100px' }}>
                  Level {article.level}
                </span>
              )}
              {article.format && (
                <span style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)', fontSize: '10px', fontWeight: 500, letterSpacing: '1.2px', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '100px' }}>
                  {article.format.charAt(0).toUpperCase() + article.format.slice(1)}
                </span>
              )}
            </div>

            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '44px', fontWeight: 400, color: 'white', lineHeight: 1.15, letterSpacing: '-0.5px', marginBottom: '20px' }}>
              {article.title}
            </h1>

            {/* "What you'll learn" preview if tldr exists */}
            {article.tldr && article.tldr.length > 0 && (
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '20px', fontStyle: 'italic' }}>
                You&apos;ll learn: {article.tldr.slice(0, 2).join(' · ')}
              </p>
            )}

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                {new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'inline-block' }} />
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{article.readingTime} read</span>
              <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'inline-block' }} />
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>By Filip Berggren</span>
            </div>
          </div>
        </div>

        <section style={{ padding: '72px 52px', background: 'var(--warm)' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>

            {/* Excerpt pull quote */}
            <p style={{ fontSize: '18px', lineHeight: 1.75, color: '#444440', fontWeight: 300, marginBottom: '36px', borderLeft: '3px solid var(--blue-light)', paddingLeft: '20px' }}>
              {article.excerpt}
            </p>

            {/* TL;DR module */}
            {article.tldr && article.tldr.length > 0 && (
              <div style={{ background: 'var(--sky)', borderLeft: '3px solid var(--blue-mid)', borderRadius: '14px', padding: '22px 26px', marginBottom: '36px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '16px' }}>📋</span>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--navy)', letterSpacing: '1px', textTransform: 'uppercase' }}>TL;DR — Key takeaways</span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {article.tldr.map((bullet, i) => (
                    <li key={i} style={{ display: 'flex', gap: '10px', marginBottom: i < article.tldr!.length - 1 ? '10px' : 0 }}>
                      <span style={{ color: 'var(--blue-mid)', fontWeight: 500, flexShrink: 0, marginTop: '1px' }}>→</span>
                      <span style={{ fontSize: '14px', color: '#444440', lineHeight: 1.6 }}>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Full article link */}
            <div style={{ background: 'var(--cream)', borderRadius: '14px', padding: '20px 24px', marginBottom: '36px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <span style={{ fontSize: '20px', flexShrink: 0 }}>📖</span>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--blue-mid)', marginBottom: '4px', letterSpacing: '0.5px' }}>FULL ARTICLE</div>
                <p style={{ fontSize: '14px', color: 'var(--navy)', lineHeight: 1.6, marginBottom: '12px' }}>
                  This article was originally published on Beehiiv. Click below to read the full version with all sources and evidence ratings.
                </p>
                <a
                  href={article.beehiivUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block', background: 'var(--navy)', color: 'white', borderRadius: '100px', padding: '10px 22px', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>
                  Read full article
                </a>
              </div>
            </div>

            {/* Evidence module */}
            {badge && (
              <div style={{ background: 'var(--warm)', border: '1px solid var(--sand)', borderRadius: '14px', padding: '20px 24px', marginBottom: '36px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--navy)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Evidence strength</span>
                  <span style={{
                    fontSize: '11px', fontWeight: 500, padding: '4px 12px', borderRadius: '100px',
                    background: badge.background, color: badge.color, border: badge.border,
                    letterSpacing: '0.5px', textTransform: 'uppercase',
                  }}>
                    {badge.label}
                  </span>
                </div>
                {article.evidenceNote && (
                  <p style={{ fontSize: '14px', color: '#444440', lineHeight: 1.65, fontWeight: 300, margin: 0 }}>
                    {article.evidenceNote}
                  </p>
                )}
              </div>
            )}

            <hr style={{ border: 'none', borderTop: '1px solid var(--sand)', margin: '48px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href="/articles" style={{ fontSize: '14px', color: 'var(--navy)', fontWeight: 500, textDecoration: 'none' }}>
                ← All articles
              </Link>
              <span style={{ fontSize: '13px', color: '#8A8A80', fontStyle: 'italic' }}>
                By Filip Berggren, founder of Healthy Insight
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

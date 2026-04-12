import ArticleProgressSection from '@/components/ArticleProgressSection'
import Footer from '@/components/Footer'
import { mdxComponents } from '@/components/MdxComponents'
import { articles } from '@/lib/articles'
import { getArticleContent } from '@/lib/articleContent'
import { pillarGradients } from '@/lib/pillars'
import { getTrailForArticle } from '@/lib/trails'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
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

  // ── MDX body (null when no local file exists) ─
  const mdxBody = getArticleContent(slug)

  // ── Trail context ────────────────────────────────────────────────────────
  const trailContext = getTrailForArticle(slug)
  const trail = trailContext?.trail ?? null
  const stepIndex = trailContext?.stepIndex ?? -1
  const currentStep = trail ? trail.steps[stepIndex] : null
  const activeSteps = trail
    ? trail.steps.filter(s => !s.comingSoon && !!s.slug)
    : []
  const activeIndex = activeSteps.findIndex(s => s.slug === slug)
  const prevStep = activeIndex > 0 ? activeSteps[activeIndex - 1] : null
  const nextStep = activeIndex !== -1 && activeIndex < activeSteps.length - 1
    ? activeSteps[activeIndex + 1]
    : null

  return (
    <>
      <main>
        {/* Header */}
        <div className="section-pad" style={{ background: pillarGradients[article.pillar], paddingBottom: 'clamp(48px, 10vw, 84px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', top: '-200px', right: '-100px' }} />
          <div className="container" style={{ maxWidth: '720px', position: 'relative', zIndex: 1 }}>

            {/* Trail back-link + breadcrumb */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
              {trail ? (
                <>
                  <Link href={`/trails/${trail.id}`} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                    ← {trail.name}
                  </Link>
                  <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', textTransform: 'capitalize' }}>{article.pillar}</span>
                </>
              ) : (
                <>
                  <Link href="/articles" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Articles</Link>
                  <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textTransform: 'capitalize' }}>{article.pillar}</span>
                </>
              )}
            </div>

            {/* Badge row */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {trail && currentStep ? (
                <span style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.95)', fontSize: '10px', fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '100px' }}>
                  {trail.name} · Level {currentStep.level} of {trail.steps.length}
                </span>
              ) : article.level ? (
                <span style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)', fontSize: '10px', fontWeight: 500, letterSpacing: '1.2px', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '100px' }}>
                  Level {article.level}
                </span>
              ) : null}
              {article.format && (
                <span style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)', fontSize: '10px', fontWeight: 500, letterSpacing: '1.2px', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '100px' }}>
                  {article.format.charAt(0).toUpperCase() + article.format.slice(1)}
                </span>
              )}
            </div>

            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(1.75rem, 6vw, 2.75rem)', fontWeight: 400, color: 'white', lineHeight: 1.15, letterSpacing: '-0.5px', marginBottom: '20px' }}>
              {article.title}
            </h1>

            {/* Skills preview */}
            {article.tldr && article.tldr.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>
                  What you&apos;ll learn
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {article.tldr.slice(0, 3).map((item, i) => (
                    <li key={i} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0, marginTop: '1px' }}>→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
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

        <section className="section-pad" style={{ background: 'var(--warm)' }}>
          <div className="container" style={{ maxWidth: '720px' }}>

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

            {/* Article body — MDX when available */}
            {mdxBody ? (
              <article style={{ marginBottom: '36px' }}>
                <MDXRemote source={mdxBody} components={mdxComponents} />
              </article>
            ) : article.externalArticleUrl ? (
              <div style={{ background: 'var(--cream)', borderRadius: '14px', padding: '20px 24px', marginBottom: '36px' }}>
                <p style={{ fontSize: '14px', color: 'var(--navy)', lineHeight: 1.6, margin: '0 0 16px' }}>
                  The full write-up (including sources and evidence ratings) for this topic is available at the link below. On-site MDX will replace this once migration is complete.
                </p>
                <a
                  href={article.externalArticleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'white',
                    background: 'var(--blue-mid)',
                    textDecoration: 'none',
                    padding: '12px 22px',
                    borderRadius: '100px',
                  }}
                >
                  Read full article
                  <span style={{ fontSize: '12px', opacity: 0.9 }} aria-hidden>↗</span>
                </a>
              </div>
            ) : (
              <div style={{ background: 'var(--cream)', borderRadius: '14px', padding: '20px 24px', marginBottom: '36px' }}>
                <p style={{ fontSize: '14px', color: 'var(--navy)', lineHeight: 1.6, margin: 0 }}>
                  Full article text for this page is not available yet. Browse{' '}
                  <Link href="/articles" style={{ color: 'var(--blue-mid)', fontWeight: 500 }}>
                    all articles
                  </Link>
                  {' '}or return to the{' '}
                  <Link href="/" style={{ color: 'var(--blue-mid)', fontWeight: 500 }}>
                    homepage
                  </Link>
                  .
                </p>
              </div>
            )}

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

            {/* Phase 6: Interactive progress — mark read + micro-quiz.
                Sleep-for-performance only for now; Phase 7 rolls out broadly. */}
            {slug === 'sleep-for-performance' && (
              <ArticleProgressSection
                slug={slug}
                level={article.level ?? 1}
                trail={trail}
              />
            )}

            <hr style={{ border: 'none', borderTop: '1px solid var(--sand)', margin: '48px 0' }} />

            {/* Navigation footer */}
            {trail ? (
              /* Trail navigation */
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                <div>
                  {prevStep ? (
                    <Link href={`/articles/${prevStep.slug}`} style={{ fontSize: '14px', color: 'var(--navy)', fontWeight: 500, textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <span style={{ fontSize: '11px', color: '#8A8A80', fontWeight: 400, letterSpacing: '0.5px', textTransform: 'uppercase' }}>← Previous</span>
                      <span>{prevStep.title}</span>
                    </Link>
                  ) : (
                    <Link href={`/trails/${trail.id}`} style={{ fontSize: '14px', color: 'var(--navy)', fontWeight: 500, textDecoration: 'none' }}>
                      ← {trail.name}
                    </Link>
                  )}
                </div>
                <div style={{ textAlign: 'right' }}>
                  {nextStep && (
                    <Link href={`/articles/${nextStep.slug}`} style={{ fontSize: '14px', color: 'var(--navy)', fontWeight: 500, textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-end' }}>
                      <span style={{ fontSize: '11px', color: '#8A8A80', fontWeight: 400, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Next →</span>
                      <span>{nextStep.title}</span>
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              /* Solo article navigation */
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/articles" style={{ fontSize: '14px', color: 'var(--navy)', fontWeight: 500, textDecoration: 'none' }}>
                  ← All articles
                </Link>
                <span style={{ fontSize: '13px', color: '#8A8A80', fontStyle: 'italic' }}>
                  By Filip Berggren, founder of Healthy Insight
                </span>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

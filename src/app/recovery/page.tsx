import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { getArticlesByPillar } from '@/lib/articles'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recovery',
  description: 'Evidence-based guides on sleep, stress management, and active recovery. The fundamentals that move the needle most.',
}

export default function RecoveryPage() {
  const articles = getArticlesByPillar('recovery')
  const starterArticle = articles.find(a => a.level === 1) ?? articles[articles.length - 1]
  const rest = articles.filter(a => a.slug !== starterArticle.slug)

  return (
    <>
      <main>
        <section className="section-pad" style={{ background: 'linear-gradient(150deg, #0F2A3F 0%, #2D7DA8 100%)' }}>
          <div className="container">
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-pale)', marginBottom: '20px', opacity: 0.7 }}>
              Pillar
            </div>
            <h1 className="heading-hero" style={{ fontFamily: 'DM Serif Display, serif', fontWeight: 400, color: 'white', letterSpacing: '-0.8px', lineHeight: 1.1, marginBottom: '20px' }}>
              Recovery
            </h1>
            <p style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: '520px', fontWeight: 300 }}>
              Sleep, stress management, and active recovery. The fundamentals that move the needle most — grounded in peer-reviewed evidence.
            </p>
          </div>
        </section>

        <section className="section-pad" style={{ background: 'var(--warm)' }}>
          <div className="container">

            {/* Start here callout */}
            <div className="pillar-start-callout">
              <div>
                <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '8px' }}>Start here</div>
                <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', fontWeight: 400, color: 'var(--navy)', marginBottom: '6px' }}>
                  {starterArticle.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#444440', lineHeight: 1.6, maxWidth: '560px', fontWeight: 300 }}>
                  {starterArticle.excerpt}
                </p>
              </div>
              <Link href={`/articles/${starterArticle.slug}`}
                style={{ background: 'var(--navy)', color: 'white', borderRadius: '100px', padding: '11px 24px', fontSize: '13px', fontWeight: 500, textDecoration: 'none', flexShrink: 0, alignSelf: 'flex-start' }}>
                Read · {starterArticle.readingTime}
              </Link>
            </div>

            <p style={{ fontSize: '14px', color: '#8A8A80', marginBottom: '32px', fontWeight: 300 }}>
              {articles.length} articles
            </p>
            <div className="grid-three">
              {rest.map(article => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

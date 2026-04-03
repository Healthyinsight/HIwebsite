import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { getArticlesByPillar } from '@/lib/articles'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Motion',
  description: 'Evidence-based guides on training, VO2 max, strength, and endurance. Grounded in exercise physiology.',
}

export default function MotionPage() {
  const articles = getArticlesByPillar('motion')
  const starterArticle = articles.find(a => a.level === 1) ?? articles[articles.length - 1]
  const rest = articles.filter(a => a.slug !== starterArticle.slug)

  return (
    <>
      <Nav />
      <main>
        <section style={{ background: 'linear-gradient(150deg, #253527 0%, #1A4D6E 100%)', padding: '80px 52px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-pale)', marginBottom: '20px', opacity: 0.7 }}>
              Pillar
            </div>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '52px', fontWeight: 400, color: 'white', letterSpacing: '-0.8px', lineHeight: 1.1, marginBottom: '20px' }}>
              Motion
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: '520px', fontWeight: 300 }}>
              Training, VO₂ max, strength, and endurance. Evidence-based guidance grounded in exercise physiology.
            </p>
          </div>
        </section>

        <section style={{ padding: '72px 52px', background: 'var(--warm)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

            {/* Start here callout */}
            <div style={{ background: 'var(--cream)', borderRadius: '20px', padding: '28px 32px', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(15,42,63,0.06)' }}>
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
                style={{ background: 'var(--navy)', color: 'white', borderRadius: '100px', padding: '11px 24px', fontSize: '13px', fontWeight: 500, textDecoration: 'none', flexShrink: 0, marginLeft: '32px' }}>
                Read · {starterArticle.readingTime}
              </Link>
            </div>

            <p style={{ fontSize: '14px', color: '#8A8A80', marginBottom: '32px', fontWeight: 300 }}>
              {articles.length} articles
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
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

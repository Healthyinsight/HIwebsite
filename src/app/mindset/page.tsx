import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { getArticlesByPillar } from '@/lib/articles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mindset',
  description: 'Evidence-based guides on goal-setting, habits, and motivation. Behavioral science applied to health.',
}

export default function MindsetPage() {
  const articles = getArticlesByPillar('mindset')

  return (
    <>
      <main>
        <section className="section-pad" style={{ background: 'linear-gradient(150deg, #0A1F2E 0%, #1A4D6E 100%)' }}>
          <div className="container">
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-pale)', marginBottom: '20px', opacity: 0.7 }}>
              Pillar
            </div>
            <h1 className="heading-hero" style={{ fontFamily: 'DM Serif Display, serif', fontWeight: 400, color: 'white', letterSpacing: '-0.8px', lineHeight: 1.1, marginBottom: '20px' }}>
              Mindset
            </h1>
            <p style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: '520px', fontWeight: 300 }}>
              Goal-setting, habit formation, and motivation. Behavioral science applied to health and performance.
            </p>
          </div>
        </section>

        <section className="section-pad" style={{ background: 'var(--warm)' }}>
          <div className="container">
            {articles.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '24px', color: 'var(--navy)', marginBottom: '12px' }}>Coming soon</p>
                <p style={{ fontSize: '15px', color: '#8A8A80', marginBottom: '24px' }}>Mindset articles are in progress. Subscribe to the newsletter to be notified.</p>
              </div>
            ) : (
              <>
                <p style={{ fontSize: '14px', color: '#8A8A80', marginBottom: '32px', fontWeight: 300 }}>
                  {articles.length} articles
                </p>
                <div className="grid-three">
                  {articles.map(article => (
                    <ArticleCard key={article.slug} {...article} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

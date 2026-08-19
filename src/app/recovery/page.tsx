import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import HeroBanner from '@/components/HeroBanner'
import { getArticlesByPillarAsync } from '@/lib/articles'
import { pillarGradients } from '@/lib/pillars'

export const revalidate = 60
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recovery',
  description: 'Evidence-based guides on sleep, stress management, and active recovery. The fundamentals that move the needle most.',
}

export default async function RecoveryPage() {
  const articles = await getArticlesByPillarAsync('recovery')
  const starterArticle = articles.find(a => a.level === 1) ?? articles[articles.length - 1]
  const rest = articles.filter(a => a.slug !== starterArticle.slug)

  return (
    <>
      <main>
        <HeroBanner
          gradient={pillarGradients.recovery}
          eyebrow="Pillar"
          title="Recovery"
          subtitle="Sleep, stress management, and active recovery. The fundamentals that move the needle most — grounded in peer-reviewed evidence."
        />

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

            <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '32px', fontWeight: 300 }}>
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

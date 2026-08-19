import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import HeroBanner from '@/components/HeroBanner'
import { getArticlesByPillarAsync } from '@/lib/articles'
import { pillarGradients } from '@/lib/pillars'

export const revalidate = 60
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nutrition',
  description: 'Evidence-based guides on fueling, supplements, and metabolic health.',
}

export default async function NutritionPage() {
  const articles = await getArticlesByPillarAsync('nutrition')
  const starterArticle = articles.find(a => a.level === 1) ?? articles[0]
  const rest = starterArticle ? articles.filter(a => a.slug !== starterArticle.slug) : articles

  return (
    <>
      <main>
        <HeroBanner
          gradient={pillarGradients.nutrition}
          eyebrow="Pillar"
          title="Nutrition"
          subtitle="Fueling strategies, supplements, and metabolic health. What the research actually supports."
        />

        <section className="section-pad" style={{ background: 'var(--warm)' }}>
          <div className="container">
            {articles.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: '24px', color: 'var(--navy)', marginBottom: '12px' }}>Coming soon</p>
                <p style={{ fontSize: '15px', color: 'var(--muted)' }}>Nutrition articles are in progress. Subscribe to the newsletter to be notified.</p>
              </div>
            ) : (
              <>
                {starterArticle && (
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
                )}
                <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '32px', fontWeight: 300 }}>
                  {articles.length} articles
                </p>
                <div className="grid-three">
                  {rest.map(article => (
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

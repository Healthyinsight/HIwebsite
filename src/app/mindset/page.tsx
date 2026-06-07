import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import HeroBanner from '@/components/HeroBanner'
import EmptyState from '@/components/EmptyState'
import { getArticlesByPillarAsync } from '@/lib/articles'
import { pillarGradients } from '@/lib/pillars'

export const revalidate = 60
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mindset',
  description: 'Evidence-based guides on goal-setting, habits, and motivation. Behavioral science applied to health.',
}

export default async function MindsetPage() {
  const articles = await getArticlesByPillarAsync('mindset')

  return (
    <>
      <main>
        <HeroBanner
          gradient={pillarGradients.mindset}
          eyebrow="Pillar"
          title="Mindset"
          subtitle="Goal-setting, habit formation, and motivation. Behavioral science applied to health and performance."
        />

        <section className="section-pad" style={{ background: 'var(--warm)' }}>
          <div className="container">
            {articles.length === 0 ? (
              <EmptyState
                heading="Coming soon"
                message="Mindset articles are in progress. Subscribe to the newsletter to be notified."
                action={{ label: 'Subscribe', href: '/newsletter' }}
                icon="🧠"
                size="lg"
              />
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

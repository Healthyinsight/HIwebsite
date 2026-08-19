import Footer from '@/components/Footer'
import ArticleFilters from '@/components/ArticleFilters'
import LevelLegend from '@/components/LevelLegend'
import { getArticles } from '@/lib/articles'
import { getSiteStats } from '@/lib/siteStats'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Evidence-based articles on motion, nutrition, recovery, and mindset. Peer-reviewed research translated into practical guidance.',
}

export default async function ArticlesPage() {
  const allArticles = await getArticles()
  const stats = await getSiteStats()
  const sorted = [...allArticles].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  return (
    <>
      <main>
        <section style={{ background: 'var(--cream)', paddingTop: 'clamp(40px, 8vw, 64px)', paddingBottom: 'clamp(40px, 8vw, 64px)' }}>
          <div className="container">
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              All articles
              <div style={{ flex: 1, height: '1px', background: 'var(--sand)', minWidth: 0 }} />
            </div>
            <h1 className="heading-hero" style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: 400, color: 'var(--navy)', marginBottom: '14px', letterSpacing: '-0.5px' }}>
              Turn research into your daily edge
            </h1>
            <p style={{ fontSize: '16px', color: '#444440', lineHeight: 1.75, maxWidth: '520px', fontWeight: 300 }}>
              {stats.articleCount} articles across motion, nutrition, recovery, and mindset. {stats.articlesWithSources} carry a full reference list, drawn from {stats.citedSourceCount} peer-reviewed sources.
            </p>
          </div>
        </section>

        <section style={{ background: 'var(--warm)', paddingTop: 'clamp(40px, 8vw, 56px)', paddingBottom: 'clamp(48px, 10vw, 56px)' }}>
          <div className="container">
            <LevelLegend />
            <ArticleFilters articles={sorted} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

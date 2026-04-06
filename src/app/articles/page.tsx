import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ArticleFilters from '@/components/ArticleFilters'
import { articles } from '@/lib/articles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Evidence-based articles on motion, nutrition, recovery, and mindset. Peer-reviewed research translated into practical guidance.',
}

export default function ArticlesPage() {
  const sorted = [...articles].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <>
      <Nav />
      <main>
        <section style={{ background: 'var(--cream)', padding: '64px 52px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              All articles
              <div style={{ flex: 1, height: '1px', background: 'var(--sand)' }} />
            </div>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '44px', fontWeight: 400, color: 'var(--navy)', marginBottom: '14px', letterSpacing: '-0.5px' }}>
              Research into action
            </h1>
            <p style={{ fontSize: '16px', color: '#444440', lineHeight: 1.75, maxWidth: '520px', fontWeight: 300 }}>
              {sorted.length} articles on motion, nutrition, recovery, and mindset. Every claim sourced. Every article evidence-based.
            </p>
          </div>
        </section>

        <section style={{ padding: '56px 52px', background: 'var(--warm)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <ArticleFilters articles={sorted} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

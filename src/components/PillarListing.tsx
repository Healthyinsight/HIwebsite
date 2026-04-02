import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { getArticlesByPillar, type Pillar } from '@/lib/articles'

export default function PillarListing({ pillar, title }: { pillar: Pillar; title: string }) {
  const list = getArticlesByPillar(pillar)

  return (
    <>
      <Nav />
      <main style={{ padding: '80px 52px 100px', background: 'var(--warm)', minHeight: '50vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '16px' }}>
            Pillar
          </div>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '40px', fontWeight: 400, color: 'var(--navy)', marginBottom: '12px' }}>
            {title}
          </h1>
          <p style={{ fontSize: '16px', color: '#8A8A80', marginBottom: '40px', fontWeight: 300, maxWidth: '560px' }}>
            Evidence-based articles in this category.
          </p>
          {list.length === 0 ? (
            <p style={{ fontSize: '16px', color: '#444440', fontWeight: 300 }}>
              Articles in this pillar are coming soon.
            </p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '28px',
              }}
            >
              {list.map((article) => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { getLatestArticles } from '@/lib/articles'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Evidence-based health insights for motion, nutrition, recovery, and mindset.',
}

export default function HomePage() {
  const latest = getLatestArticles(6)

  return (
    <>
      <Nav />
      <main>
        <section style={{ background: 'var(--cream)', padding: '80px 52px 64px' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '20px' }}>
              Healthy Insight
            </div>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 400, color: 'var(--navy)', letterSpacing: '-0.8px', lineHeight: 1.1, marginBottom: '24px', maxWidth: '720px' }}>
              Peer-reviewed research, translated into<br />
              <em style={{ fontStyle: 'italic', color: 'var(--blue-mid)' }}>practical health strategies.</em>
            </h1>
            <p style={{ fontSize: '17px', color: '#444440', lineHeight: 1.75, fontWeight: 300, maxWidth: '560px', marginBottom: '28px' }}>
              Motion, nutrition, recovery, and mindset — grounded in physiology, not marketing.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {(['motion', 'nutrition', 'recovery', 'mindset'] as const).map((p) => (
                <Link
                  key={p}
                  href={`/${p}`}
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--navy)',
                    textDecoration: 'none',
                    padding: '10px 20px',
                    borderRadius: '100px',
                    border: '1px solid rgba(15,42,63,0.15)',
                    background: 'white',
                  }}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '64px 52px 100px', background: 'var(--warm)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '28px', fontWeight: 400, color: 'var(--navy)', marginBottom: '8px' }}>
              Latest articles
            </h2>
            <p style={{ fontSize: '15px', color: '#8A8A80', marginBottom: '36px', fontWeight: 300 }}>
              Newest pieces from the archive.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '28px',
              }}
            >
              {latest.map((article, i) => (
                <ArticleCard key={article.slug} {...article} large={i === 0} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

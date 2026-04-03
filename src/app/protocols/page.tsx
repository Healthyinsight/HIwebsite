import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import NewsletterForm from '@/components/NewsletterForm'
import { getArticlesByFormat } from '@/lib/articles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Protocols & Guides',
  description: 'Evidence-based protocols and practical guides for motion, nutrition, recovery, and mindset. Step-by-step frameworks built on peer-reviewed research.',
}

export default function ProtocolsPage() {
  const protocols = getArticlesByFormat('protocol')
  const guides = getArticlesByFormat('guide')

  return (
    <>
      <Nav />
      <main>

        {/* HEADER */}
        <section style={{ background: 'var(--cream)', padding: '80px 52px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '20px' }}>
              Protocols & Guides
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'end' }}>
              <div>
                <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '48px', fontWeight: 400, color: 'var(--navy)', letterSpacing: '-0.8px', lineHeight: 1.1, marginBottom: '20px' }}>
                  Put the research<br />
                  <em style={{ fontStyle: 'italic', color: 'var(--blue-mid)' }}>into practice.</em>
                </h1>
                <p style={{ fontSize: '17px', color: '#444440', lineHeight: 1.75, fontWeight: 300, maxWidth: '440px' }}>
                  Protocols are structured, actionable frameworks built directly from the evidence. Guides provide comprehensive context and understanding. Both are designed to close the gap between knowing and doing.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { num: protocols.length.toString(), label: 'step-by-step\nprotocols' },
                  { num: guides.length.toString(), label: 'comprehensive\nguides' },
                  { num: '0', label: 'affiliate links\nor sponsored content' },
                  { num: '100%', label: 'evidence-based\nrecommendations' },
                ].map(({ num, label }) => (
                  <div key={label} style={{ background: 'var(--warm)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(15,42,63,0.06)' }}>
                    <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '28px', color: 'var(--navy)', marginBottom: '4px' }}>{num}</div>
                    <div style={{ fontSize: '12px', color: '#8A8A80', lineHeight: 1.4, whiteSpace: 'pre-line' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROTOCOLS */}
        <section style={{ padding: '80px 52px', background: 'var(--warm)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '8px' }}>Step-by-step</div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', fontWeight: 400, color: 'var(--navy)', lineHeight: 1.2 }}>
                  Protocols
                </h2>
              </div>
            </div>
            <p style={{ fontSize: '15px', color: '#444440', lineHeight: 1.75, maxWidth: '560px', marginBottom: '40px', fontWeight: 300 }}>
              Structured programs with specific variables, progressions, and timelines. Build these into your week directly.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
              {protocols.map(article => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
          </div>
        </section>

        {/* GUIDES */}
        <section style={{ padding: '80px 52px', background: 'var(--cream)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '8px' }}>Comprehensive</div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', fontWeight: 400, color: 'var(--navy)', lineHeight: 1.2 }}>
                Guides
              </h2>
            </div>
            <p style={{ fontSize: '15px', color: '#444440', lineHeight: 1.75, maxWidth: '560px', marginBottom: '40px', fontWeight: 300 }}>
              Deep dives into the evidence, mechanisms, and frameworks. Start here to build a strong conceptual foundation.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
              {guides.map(article => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section style={{ padding: '84px 52px', background: 'var(--warm)', display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'var(--blue)', borderRadius: '26px', padding: '60px 68px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', maxWidth: '900px', width: '100%' }}>
            <div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '34px', fontWeight: 400, color: 'white', lineHeight: 1.2, letterSpacing: '-0.3px', marginBottom: '13px' }}>
                New protocols weekly.
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontWeight: 300 }}>
                Get new guides and protocols in your inbox. 1 email per week — always sourced, always practical.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

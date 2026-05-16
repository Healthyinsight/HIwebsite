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
      <main>

        {/* HEADER */}
        <section className="section-pad" style={{ background: 'var(--cream)' }}>
          <div className="container">
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '20px' }}>
              Protocols & Guides
            </div>
            <div className="grid-two-equal">
              <div>
                <h1 className="heading-hero" style={{ fontFamily: 'DM Serif Display, serif', fontWeight: 400, color: 'var(--navy)', letterSpacing: '-0.8px', lineHeight: 1.1, marginBottom: '20px' }}>
                  Put the research<br />
                  <em style={{ fontStyle: 'italic', color: 'var(--blue-mid)' }}>into practice.</em>
                </h1>
                <p style={{ fontSize: '17px', color: '#444440', lineHeight: 1.75, fontWeight: 300, maxWidth: '440px' }}>
                  Protocols are structured, actionable frameworks built directly from the evidence. Guides provide comprehensive context and understanding. Both are designed to close the gap between knowing and doing.
                </p>
              </div>
              <div className="grid-stats">
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
        <section className="section-pad" style={{ background: 'var(--warm)' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '8px' }}>Step-by-step</div>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 400, color: 'var(--navy)', lineHeight: 1.2 }}>
                  Protocols
                </h2>
              </div>
            </div>
            <p style={{ fontSize: '15px', color: '#444440', lineHeight: 1.75, maxWidth: '560px', marginBottom: '40px', fontWeight: 300 }}>
              Structured programs with specific variables, progressions, and timelines. Build these into your week directly.
            </p>
            <div className="grid-three">
              {protocols.map(article => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
          </div>
        </section>

        {/* GUIDES */}
        <section className="section-pad" style={{ background: 'var(--cream)' }}>
          <div className="container">
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '8px' }}>Comprehensive</div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 400, color: 'var(--navy)', lineHeight: 1.2 }}>
                Guides
              </h2>
            </div>
            <p style={{ fontSize: '15px', color: '#444440', lineHeight: 1.75, maxWidth: '560px', marginBottom: '40px', fontWeight: 300 }}>
              Deep dives into the evidence, mechanisms, and frameworks. Start here to build a strong conceptual foundation.
            </p>
            <div className="grid-three">
              {guides.map(article => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="section-pad" style={{ background: 'var(--warm)', display: 'flex', justifyContent: 'center' }}>
          <div className="container newsletter-panel">
            <div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(1.5rem, 4vw, 2.125rem)', fontWeight: 400, color: 'white', lineHeight: 1.2, letterSpacing: '-0.3px', marginBottom: '13px' }}>
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

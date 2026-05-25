import Footer from '@/components/Footer'
import NewsletterForm from '@/components/NewsletterForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Evidence-based health insights straight to your inbox. 1 email per week — always sourced, always practical.',
}

export default function NewsletterPage() {
  return (
    <>
      <main>
        <section style={{ background: 'var(--navy)', paddingTop: 'clamp(48px, 12vw, 100px)', paddingBottom: 'clamp(48px, 12vw, 100px)', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="container" style={{ maxWidth: '600px', width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-pale)', marginBottom: '24px', opacity: 0.7 }}>
                Newsletter
              </div>
              <h1 className="heading-hero" style={{ fontFamily: 'DM Serif Display, serif', fontWeight: 400, color: 'white', lineHeight: 1.1, letterSpacing: '-0.8px', marginBottom: '20px' }}>
                Stay evidence-based.
              </h1>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, fontWeight: 300, maxWidth: '440px', margin: '0 auto' }}>
                1 email per week. Every claim sourced. Every recommendation practical.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: 'clamp(20px, 5vw, 28px) clamp(18px, 4vw, 32px)', marginBottom: '32px' }}>
              <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
                What to expect
              </div>
              <div className="newsletter-expect-grid">
                {[
                  { icon: '📊', text: 'Research breakdowns — the key findings, explained clearly' },
                  { icon: '🎯', text: 'Practical protocols — what to actually do with the evidence' },
                  { icon: '🔍', text: 'Sources always linked — judge for yourself' },
                  { icon: '🚫', text: 'Zero affiliate links, zero supplement promotion' },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', minWidth: 0 }}>
                    <span style={{ fontSize: '16px', flexShrink: 0 }}>{icon}</span>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <NewsletterForm />

            <div className="newsletter-stats" style={{ marginTop: '56px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {[
                { num: '14', label: 'articles published' },
                { num: '4', label: 'evidence pillars' },
                { num: '0', label: 'affiliate links' },
              ].map(({ num, label }) => (
                <div key={label} style={{ textAlign: 'center', minWidth: 0 }}>
                  <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '28px', color: 'var(--blue-pale)', fontWeight: 400 }}>{num}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

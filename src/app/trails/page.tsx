import Footer from '@/components/Footer'
import TrailCard from '@/components/TrailCard'
import { trails } from '@/lib/trails'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learning Trails — Healthy Insight',
  description: 'Structured paths through health and performance science. Progress from fundamentals to advanced research at your own pace, earn Evidence IQ as you go.',
}

export default function TrailsPage() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="section-pad" style={{ background: 'var(--navy)' }}>
          <div className="container" style={{ maxWidth: '760px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-pale)', marginBottom: '16px' }}>
              Learning Trails
            </div>
            <h1 className="heading-hero" style={{ fontFamily: 'DM Serif Display, serif', fontWeight: 400, color: 'white', letterSpacing: '-0.5px', marginBottom: '16px' }}>
              Your path through the evidence
            </h1>
            <p style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, fontWeight: 300, maxWidth: '560px', margin: 0 }}>
              Each trail is a curated sequence of articles that builds from foundations to the research frontier. Read in order, earn Evidence IQ, unlock advanced content.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section style={{ background: 'var(--cream)', paddingBlock: 'clamp(28px, 6vw, 40px)', paddingInline: 'clamp(16px, 4vw, 52px)', borderBottom: '1px solid var(--sand)' }}>
          <div className="container">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px 48px' }}>
              {[
                { icon: '📖', text: 'Click any article step to open it on Healthy Insight — it\'s automatically marked complete.' },
                { icon: '⚡', text: 'Each article earns Evidence IQ points. Advanced articles earn more.' },
                { icon: '🔒', text: 'Level 4+ articles require a free email unlock — one time, for all trails.' },
              ].map(({ icon, text }) => (
                <div key={icon} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', maxWidth: '300px' }}>
                  <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
                  <p style={{ fontSize: '13px', color: '#444440', lineHeight: 1.65, margin: 0, fontWeight: 300 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trail cards */}
        <section className="section-pad" style={{ background: 'var(--warm)' }}>
          <div className="container">
            <div className="grid-trails">
              {trails.map(trail => (
                <TrailCard key={trail.id} trail={trail} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

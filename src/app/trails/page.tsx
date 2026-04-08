import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import TrailCard from '@/components/TrailCard'
import { trails } from '@/lib/trails'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learning Trails — Healthy Insight',
  description: 'Structured paths through health and performance science. Progress from fundamentals to advanced research, answer quiz questions, and earn Health IQ points.',
}

const activeTrails = trails.filter(t => !t.comingSoon)
const comingSoonTrails = trails.filter(t => t.comingSoon)

export default function TrailsPage() {
  return (
    <>
      <Nav />
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
              Each trail is a curated sequence of articles that builds from foundations to the research frontier. Read, answer quiz questions, and earn Health IQ points.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section style={{ background: 'var(--cream)', paddingBlock: 'clamp(28px, 6vw, 40px)', paddingInline: 'clamp(16px, 4vw, 52px)', borderBottom: '1px solid var(--sand)' }}>
          <div className="container">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px 48px' }}>
              {[
                { icon: '📖', text: 'Read each article on Beehiiv — take your time, then come back to answer the quiz question.' },
                { icon: '✅', text: 'Answer the question correctly to earn Health IQ points. Wrong answers can be retried.' },
                { icon: '🔒', text: 'Create a free account (just your email) before seeing if you got it right.' },
              ].map(({ icon, text }) => (
                <div key={icon} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', maxWidth: '300px' }}>
                  <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
                  <p style={{ fontSize: '13px', color: '#444440', lineHeight: 1.65, margin: 0, fontWeight: 300 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Active trail cards */}
        <section className="section-pad" style={{ background: 'var(--warm)' }}>
          <div className="container">
            <div className="grid-trails">
              {activeTrails.map(trail => (
                <TrailCard key={trail.id} trail={trail} />
              ))}
            </div>

            {/* Coming soon note */}
            {comingSoonTrails.length > 0 && (
              <p style={{ marginTop: '32px', fontSize: '13px', color: '#8A8A80', textAlign: 'center', fontWeight: 300 }}>
                {comingSoonTrails.map(t => t.name).join(' and ')} {comingSoonTrails.length === 1 ? 'trail is' : 'trails are'} coming soon.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

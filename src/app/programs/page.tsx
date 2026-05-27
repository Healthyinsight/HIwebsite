import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HI Programs — Healthy Insight',
  description: 'Structured 12-week training programs built on evidence-based protocols. Personalised to your race calendar.',
}

const PILLARS = [
  { icon: '🏃', label: 'Motion', desc: 'Zone 2 base, VO₂ max blocks, race-specific strength work.' },
  { icon: '😴', label: 'Recovery', desc: 'Sleep protocols, HRV tracking, active recovery scheduling.' },
  { icon: '🥗', label: 'Nutrition', desc: 'Carbohydrate periodization, race-week fueling, daily macros.' },
  { icon: '🧠', label: 'Mindset', desc: 'Goal-setting, pre-race routines, motivation frameworks.' },
]

export default function ProgramsPage() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="section-pad" style={{ background: 'var(--navy)', paddingTop: 'clamp(64px, 12vw, 96px)', paddingBottom: 'clamp(64px, 12vw, 96px)' }}>
          <div className="container" style={{ maxWidth: '640px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-pale)', marginBottom: '20px' }}>
              Coming soon
            </div>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 400, color: 'white', lineHeight: 1.15, letterSpacing: '-0.5px', marginBottom: '20px' }}>
              HI Programs
            </h1>
            <p style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, fontWeight: 300, marginBottom: '36px' }}>
              Structured 12-week training programs personalised to your race calendar and training week.
              Built on the same evidence as the Learning Trails — now applied directly to your schedule.
            </p>
            <Link
              href="/waitlist"
              style={{
                display: 'inline-block',
                background: 'white',
                color: 'var(--navy)',
                borderRadius: '100px',
                padding: '14px 32px',
                fontSize: '15px',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Join the waitlist →
            </Link>
          </div>
        </section>

        {/* What you get */}
        <section className="section-pad" style={{ background: 'var(--warm)' }}>
          <div className="container" style={{ maxWidth: '680px' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              What&apos;s included
              <div style={{ flex: 1, height: '1px', background: 'var(--sand)' }} />
            </div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 400, color: 'var(--navy)', letterSpacing: '-0.4px', marginBottom: '40px' }}>
              All four pillars, in one program.
            </h2>

            <div className="grid-two" style={{ gap: '16px', marginBottom: '48px' }}>
              {PILLARS.map(({ icon, label, desc }) => (
                <div key={label} style={{ background: 'var(--cream)', borderRadius: '18px', padding: '24px', border: '1px solid var(--sand)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '14px' }}>
                    {icon}
                  </div>
                  <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '18px', fontWeight: 400, color: 'var(--navy)', marginBottom: '6px' }}>{label}</h3>
                  <p style={{ fontSize: '13px', color: '#444440', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>{desc}</p>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--cream)', borderRadius: '20px', padding: 'clamp(24px, 5vw, 36px)', border: '1px solid var(--sand)', textAlign: 'center' }}>
              <p style={{ fontSize: '15px', color: '#444440', lineHeight: 1.75, fontWeight: 300, marginBottom: '24px' }}>
                HI Programs launches later this year. Join the waitlist to get early access and a founding-member discount.
              </p>
              <Link
                href="/waitlist"
                style={{ display: 'inline-block', background: 'var(--navy)', color: 'white', borderRadius: '100px', padding: '13px 30px', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}
              >
                Join the waitlist →
              </Link>
            </div>
          </div>
        </section>

        {/* Back to trails */}
        <section style={{ background: 'var(--cream)', padding: 'clamp(32px, 6vw, 48px) 0', borderTop: '1px solid var(--sand)' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#8A8A80', marginBottom: '12px' }}>
              While you wait — keep building your knowledge base.
            </p>
            <Link href="/trails" style={{ fontSize: '14px', color: 'var(--blue-mid)', fontWeight: 500, textDecoration: 'none' }}>
              Explore Learning Trails →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

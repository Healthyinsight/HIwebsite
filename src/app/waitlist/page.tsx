import Footer from '@/components/Footer'
import NewsletterForm from '@/components/NewsletterForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Challenges App Waitlist — Healthy Insight',
  description: 'Be the first to know when the Healthy Insight Challenges App launches. Structured health challenges backed by the evidence.',
}

export default function WaitlistPage() {
  return (
    <>
      <main>
        <section className="section-pad" style={{ background: 'var(--navy)' }}>
          <div className="container" style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: '44px', marginBottom: '16px', lineHeight: 1 }}>🏆</div>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-pale)', marginBottom: '12px' }}>
              Coming soon
            </div>
            <h1 className="heading-hero" style={{ fontFamily: 'DM Serif Display, serif', fontWeight: 400, color: 'white', letterSpacing: '-0.5px', marginBottom: '16px' }}>
              Challenges App
            </h1>
            <p style={{ fontSize: 'clamp(15px, 2.5vw, 17px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
              Structured health challenges backed by the evidence. Put your Learning Trail knowledge into practice — with accountability built in. Join the waitlist and be first in.
            </p>
          </div>
        </section>

        <section className="section-pad" style={{ background: 'var(--cream)' }}>
          <div className="container" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <p style={{ fontSize: '14px', color: '#444440', textAlign: 'center', marginBottom: '24px', fontWeight: 300, lineHeight: 1.65 }}>
              Leave your email and we will notify you the moment it launches.
            </p>
            <NewsletterForm dark={false} size="lg" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

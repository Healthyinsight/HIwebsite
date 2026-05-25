import Footer from '@/components/Footer'
import WaitlistForm from '@/components/WaitlistForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Path Tracker Waitlist — Healthy Insight',
  description: "Be the first to know when The Path Tracker launches. Drop your email and we'll let you know when it's ready.",
}

export default function WaitlistPage() {
  return (
    <>
      <main>
        <section className="section-pad" style={{ background: 'var(--navy)' }}>
          <div className="container" style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-pale)', marginBottom: '20px' }}>
              Coming soon
            </div>
            <h1 className="heading-hero" style={{ fontFamily: 'DM Serif Display, serif', fontWeight: 400, color: 'white', letterSpacing: '-0.5px', marginBottom: '20px' }}>
              Be the first to know when we launch
            </h1>
            <p style={{ fontSize: 'clamp(15px, 2.5vw, 17px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
              We&apos;re putting the finishing touches on The Path Tracker. Drop your email and we&apos;ll let you know when it&apos;s ready.
            </p>
          </div>
        </section>

        <section className="section-pad" style={{ background: 'var(--cream)' }}>
          <div className="container" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <WaitlistForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

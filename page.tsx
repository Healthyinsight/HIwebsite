import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Healthy Insight translates peer-reviewed research into actionable strategies for motion, nutrition, recovery, and mindset.',
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <section style={{ background: 'var(--cream)', padding: '80px 52px' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '20px' }}>
              About
            </div>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '48px', fontWeight: 400, color: 'var(--navy)', letterSpacing: '-0.8px', lineHeight: 1.1, marginBottom: '28px' }}>
              Your source for evidence-based<br />
              <em style={{ fontStyle: 'italic', color: 'var(--blue-mid)' }}>health strategies.</em>
            </h1>
            <p style={{ fontSize: '17px', color: '#444440', lineHeight: 1.75, fontWeight: 300 }}>
              Healthy Insight translates peer-reviewed research into practical guidance for motion, nutrition, recovery, and mindset. Every article starts with studies and ends with clear steps you can apply today.
            </p>
          </div>
        </section>

        <section style={{ padding: '80px 52px', background: 'var(--warm)' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', fontWeight: 400, color: 'var(--navy)', marginBottom: '24px' }}>
              How HI works
            </h2>
            <p style={{ fontSize: '16px', color: '#444440', lineHeight: 1.75, marginBottom: '32px', fontWeight: 300 }}>
              Here's the thing: health information should be accurate, accessible, and honest. Every article on HI follows the same process.
            </p>
            {[
              { n: '1', title: 'Start with the research', body: 'Recent peer-reviewed studies (5 years preferred), with convergence across multiple findings, not single studies.' },
              { n: '2', title: 'Check the quality', body: 'Sample sizes, methodology, and potential conflicts of interest all matter.' },
              { n: '3', title: 'Translate to practice', body: 'Complex research becomes clear, actionable steps. No jargon, no fluff.' },
              { n: '4', title: 'Show the sources', body: 'Every claim links to research. When evidence is uncertain or conflicting, that\'s stated clearly.' },
            ].map(({ n, title, body }) => (
              <div key={n} style={{ display: 'flex', gap: '20px', marginBottom: '28px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'DM Serif Display, serif', fontSize: '16px', color: 'var(--navy)' }}>
                  {n}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', fontWeight: 400, color: 'var(--navy)', marginBottom: '6px' }}>{title}</h3>
                  <p style={{ fontSize: '15px', color: '#444440', lineHeight: 1.7, fontWeight: 300 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '80px 52px', background: 'var(--navy)' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', fontWeight: 400, color: 'white', marginBottom: '20px' }}>
              About Filip Berggren
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: '20px', fontWeight: 300 }}>
              Filip Berggren is the founder of Healthy Insight. Frustrated by wellness clickbait and influencer trends without evidence, he started HI to translate research into practical action.
            </p>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: '32px', fontWeight: 300 }}>
              He reads peer-reviewed studies, checks the data, and shares what actually works, grounded in physiology, not marketing.
            </p>
            <a href="mailto:filipb@healthyinsight.eu"
              style={{ display: 'inline-block', background: 'white', color: 'var(--navy)', borderRadius: '100px', padding: '12px 26px', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
              Get in touch
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

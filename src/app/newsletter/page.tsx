import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Subscribe to Healthy Insight for new evidence-based articles.',
}

export default function NewsletterPage() {
  return (
    <>
      <Nav />
      <main style={{ padding: '100px 52px', background: 'var(--cream)', minHeight: '50vh' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '36px', fontWeight: 400, color: 'var(--navy)', marginBottom: '20px' }}>
            Newsletter
          </h1>
          <p style={{ fontSize: '16px', color: '#444440', lineHeight: 1.75, marginBottom: '28px', fontWeight: 300 }}>
            Get new articles when they publish. Join readers who want research-backed health strategies without the hype.
          </p>
          <Link
            href="https://www.healthyinsight.eu"
            style={{
              display: 'inline-block',
              background: 'var(--navy)',
              color: 'white',
              borderRadius: '100px',
              padding: '14px 28px',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Subscribe on Healthy Insight
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

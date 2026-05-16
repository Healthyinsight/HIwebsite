import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms of use for Healthy Insight.',
}

export default function TermsPage() {
  return (
    <>
      <main style={{ paddingTop: 'clamp(48px, 10vw, 80px)', paddingBottom: 'clamp(48px, 12vw, 100px)', background: 'var(--warm)', minHeight: '50vh' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '36px', fontWeight: 400, color: 'var(--navy)', marginBottom: '24px' }}>
            Terms
          </h1>
          <p style={{ fontSize: '16px', color: '#444440', lineHeight: 1.75, fontWeight: 300 }}>
            Content is for informational purposes and does not replace professional medical advice. For publication terms, see{' '}
            <a href="https://www.healthyinsight.eu" style={{ color: 'var(--blue-mid)' }}>healthyinsight.eu</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

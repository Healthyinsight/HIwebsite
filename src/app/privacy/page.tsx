import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Healthy Insight.',
}

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main style={{ padding: '80px 52px 100px', background: 'var(--warm)', minHeight: '50vh' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '36px', fontWeight: 400, color: 'var(--navy)', marginBottom: '24px' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '16px', color: '#444440', lineHeight: 1.75, fontWeight: 300 }}>
            This site is a lightweight front-end for Healthy Insight. For full privacy terms related to subscriptions and the publication, see the policies on{' '}
            <a href="https://www.healthyinsight.eu" style={{ color: 'var(--blue-mid)' }}>healthyinsight.eu</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

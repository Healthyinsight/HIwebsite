import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main>
        <section style={{ padding: '80px 52px', background: 'var(--warm)', minHeight: '70vh' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '44px', fontWeight: 400, color: 'var(--navy)', marginBottom: '12px', letterSpacing: '-0.5px' }}>
              Privacy Policy
            </h1>
            <p style={{ fontSize: '14px', color: '#8A8A80', marginBottom: '48px' }}>
              Last updated: April 2026
            </p>

            {[
              {
                title: 'Who we are',
                body: 'Healthy Insight is operated by Filip Berggren. Our website is healthyinsight.eu. For any privacy-related questions, contact us at filipb@healthyinsight.eu.',
              },
              {
                title: 'What data we collect',
                body: 'We collect your email address when you subscribe to our newsletter. We may collect basic analytics data (page views, referral sources) through privacy-respecting analytics tools. We do not use advertising tracking.',
              },
              {
                title: 'How we use your data',
                body: 'Your email address is used solely to send you the Healthy Insight newsletter. We never sell or share your data with third parties. You can unsubscribe at any time using the link in any newsletter.',
              },
              {
                title: 'Data storage',
                body: 'Newsletter subscriber data is stored with our email service provider within the EU or with EU-standard data protection agreements in place.',
              },
              {
                title: 'Your rights (GDPR)',
                body: 'You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at filipb@healthyinsight.eu. You also have the right to lodge a complaint with your local data protection authority.',
              },
              {
                title: 'Cookies',
                body: 'We use minimal cookies for basic site functionality. We do not use advertising or cross-site tracking cookies.',
              },
            ].map(({ title, body }) => (
              <div key={title} style={{ marginBottom: '36px' }}>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', fontWeight: 400, color: 'var(--navy)', marginBottom: '10px' }}>
                  {title}
                </h2>
                <p style={{ fontSize: '16px', color: '#444440', lineHeight: 1.75, fontWeight: 300 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

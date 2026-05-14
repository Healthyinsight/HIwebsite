import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

const sections = [
  {
    title: 'What data we collect',
    body: [
      'We collect your email address when you subscribe to our newsletter.',
      'We may collect basic, anonymised analytics data — such as page views and referral sources — through privacy-respecting tools. We do not use advertising tracking or cross-site tracking.',
    ],
  },
  {
    title: 'How we use your data',
    body: [
      'Your email address is used solely to send you the Healthy Insight newsletter.',
      'We never sell or share your data with third parties. You can unsubscribe at any time using the link at the bottom of any newsletter.',
    ],
  },
  {
    title: 'Cookies',
    body: [
      'We use minimal cookies for basic site functionality. We do not use advertising cookies or cookies that track you across other websites.',
    ],
  },
  {
    title: 'Data retention',
    body: [
      'Newsletter subscriber data is stored with our email service provider under EU data protection standards. We keep your data only for as long as you remain subscribed.',
      'You can delete your data at any time by unsubscribing or by contacting us directly.',
    ],
  },
  {
    title: 'Your rights',
    body: [
      'Under GDPR, you have the right to access, correct, or delete your personal data at any time.',
      'To exercise any of these rights, contact us at filipb@healthyinsight.eu. You also have the right to lodge a complaint with your national data protection authority.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'Healthy Insight is operated by Filip Berggren.',
      'For any privacy-related questions, reach us at filipb@healthyinsight.eu.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <main>
        <section
          style={{
            background: 'var(--warm)',
            paddingTop: 'clamp(48px, 10vw, 96px)',
            paddingBottom: 'clamp(64px, 12vw, 112px)',
            minHeight: '70vh',
          }}
        >
          <div className="container" style={{ maxWidth: '680px' }}>

            {/* Page header */}
            <h1
              style={{
                fontFamily: 'DM Serif Display, serif',
                fontWeight: 400,
                fontSize: 'clamp(32px, 6vw, 48px)',
                color: 'var(--navy)',
                letterSpacing: '-0.5px',
                marginBottom: '16px',
                lineHeight: 1.15,
              }}
            >
              Privacy Policy
            </h1>

            <p
              style={{
                fontSize: '15px',
                color: '#8A8A80',
                marginBottom: '8px',
              }}
            >
              Last updated: April 2026
            </p>

            {/* Intro */}
            <p
              style={{
                fontSize: '17px',
                color: '#444440',
                lineHeight: 1.75,
                fontWeight: 300,
                marginTop: '24px',
                marginBottom: '56px',
                maxWidth: '560px',
              }}
            >
              We keep your data simple. This policy explains what we collect,
              why, and how you can control it.
            </p>

            {/* Divider */}
            <hr
              style={{
                border: 'none',
                borderTop: '1px solid var(--sand)',
                marginBottom: '56px',
              }}
            />

            {/* Sections */}
            {sections.map(({ title, body }, i) => (
              <div
                key={title}
                style={{
                  marginBottom: i < sections.length - 1 ? '48px' : '0',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'DM Serif Display, serif',
                    fontSize: 'clamp(18px, 3vw, 22px)',
                    fontWeight: 400,
                    color: 'var(--navy)',
                    marginBottom: '14px',
                    letterSpacing: '-0.2px',
                  }}
                >
                  {title}
                </h2>
                {body.map((paragraph, j) => (
                  <p
                    key={j}
                    style={{
                      fontSize: '16px',
                      color: '#444440',
                      lineHeight: 1.75,
                      fontWeight: 300,
                      marginBottom: j < body.length - 1 ? '12px' : '0',
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

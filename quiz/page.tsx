import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import HealthIQQuiz from '@/components/HealthIQQuiz'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Health IQ Quiz',
  description: 'Find out where you actually stand on sleep, training, nutrition, and recovery. Get a personalised score and evidence-based reading list.',
}

export default function QuizPage() {
  return (
    <>
      <Nav />
      <main>
        <section style={{ background: 'var(--cream)', padding: '64px 52px 40px' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '16px' }}>
              5 questions
            </div>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '44px', fontWeight: 400, color: 'var(--navy)', lineHeight: 1.1, letterSpacing: '-0.5px', marginBottom: '16px' }}>
              What is your Health IQ?
            </h1>
            <p style={{ fontSize: '17px', color: '#444440', lineHeight: 1.75, maxWidth: '420px', margin: '0 auto 48px', fontWeight: 300 }}>
              Answer 5 questions about your sleep, training, and nutrition habits. Get a personalised score and evidence-based reading list.
            </p>
          </div>
        </section>

        <section style={{ padding: '48px 52px 96px', background: 'var(--warm)' }}>
          <HealthIQQuiz />
        </section>
      </main>
      <Footer />
    </>
  )
}

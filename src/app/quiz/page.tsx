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
      <main>
        <section style={{ background: 'var(--cream)', paddingTop: 'clamp(40px, 8vw, 64px)', paddingBottom: 'clamp(28px, 6vw, 40px)' }}>
          <div className="container" style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '16px' }}>
              5 questions
            </div>
            <h1 className="heading-hero" style={{ fontFamily: 'DM Serif Display, serif', fontWeight: 400, color: 'var(--navy)', lineHeight: 1.1, letterSpacing: '-0.5px', marginBottom: '16px' }}>
              What is your Health IQ?
            </h1>
            <p style={{ fontSize: '17px', color: '#444440', lineHeight: 1.75, maxWidth: '420px', margin: '0 auto 48px', fontWeight: 300 }}>
              Answer 5 questions about your sleep, training, and nutrition habits. Get a personalised score and evidence-based reading list.
            </p>
          </div>
        </section>

        <section style={{ background: 'var(--warm)', paddingTop: 'clamp(32px, 8vw, 48px)', paddingBottom: 'clamp(56px, 12vw, 96px)' }}>
          <div className="container">
            <HealthIQQuiz />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

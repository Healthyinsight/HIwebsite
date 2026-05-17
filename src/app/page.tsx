import { Fragment } from 'react'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { getLatestArticles } from '@/lib/articles'
import NewsletterForm from '@/components/NewsletterForm'
import TrailCard from '@/components/TrailCard'
import { getActiveTrails } from '@/lib/trails'
import Link from 'next/link'
import HomeScrollUI from '@/components/HomeScrollUI'

export default function HomePage() {
  const latest = getLatestArticles(6)
  const featuredTrails = getActiveTrails().slice(0, 3)

  return (
    <>
      <main>

        {/* HERO */}
        <section style={{ background: 'var(--cream)', paddingTop: 'clamp(40px, 10vw, 72px)', paddingBottom: 'clamp(48px, 10vw, 80px)' }}>
          <div className="container" style={{ maxWidth: '620px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '22px' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--blue-mid)' }} />
              Built for professional amateurs.
            </div>

            <h1 className="heading-hero" style={{ fontFamily: 'DM Serif Display, serif', fontWeight: 400, color: 'var(--navy)', marginBottom: '22px', letterSpacing: '-0.8px' }}>
              Train smarter. Race stronger.
            </h1>
            <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(1.1rem, 3.5vw, 1.35rem)', fontWeight: 400, color: '#444440', marginBottom: '34px', lineHeight: 1.5 }}>
              The personal training app that actually gets to know you.
              Empowers you with personal health insights every day — then coaches you
              based on your body, your schedule, and what is proven to work.
            </p>

            <div style={{ marginBottom: '16px' }}>
              <Link href="/trails"
                style={{ display: 'block', textAlign: 'center', background: 'var(--navy)', color: 'white', borderRadius: '100px', padding: '0 30px', fontSize: '16px', fontWeight: 500, textDecoration: 'none', minHeight: '54px', lineHeight: '54px' }}>
                Get your training plan →
              </Link>
            </div>

            <p style={{ fontSize: '14px', color: '#8A8A80', fontWeight: 400, textAlign: 'center' }}>
              Let&apos;s stop the guesswork.
            </p>
          </div>
        </section>

        {/* TRUST PROOF POINTS */}
        <div style={{ background: 'var(--warm)', borderTop: '1px solid var(--sand)', borderBottom: '1px solid var(--sand)', padding: '18px clamp(16px, 4vw, 52px)' }}>
          <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '640px', margin: '0 auto' }}>
            <span style={{ fontSize: '14px', color: '#444440', fontWeight: 400 }}>📚 Evidence-based protocols</span>
            <span style={{ fontSize: '14px', color: '#444440', fontWeight: 400 }}>🔬 Trusted sources, no hype</span>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <section style={{ background: 'var(--warm)', paddingTop: 'clamp(48px, 10vw, 84px)', paddingBottom: 'clamp(48px, 10vw, 84px)' }}>
          <div className="container">
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              Getting started
              <div style={{ flex: 1, height: '1px', background: 'var(--sand)' }} />
            </div>
            <h2 className="heading-section" style={{ fontFamily: 'DM Serif Display, serif', fontWeight: 400, color: 'var(--navy)', letterSpacing: '-0.4px', marginBottom: '48px' }}>
              From information overload to race-day clarity.
            </h2>
            <div className="grid-three">
              {[
                {
                  step: 'Step 1',
                  icon: '📖',
                  title: 'Learn',
                  desc: 'Follow a Learning Trail built for endurance athletes. Zone 2, periodization, sleep for performance, race fueling: each trail takes you from first principles to race-day application, level by level.',
                },
                {
                  step: 'Step 2',
                  icon: '⚡',
                  title: 'Build your Health IQ',
                  desc: "Every article you complete deepens your understanding and builds your Health IQ score. Track your progress through the levels and know exactly what you've mastered.",
                },
                {
                  step: 'Step 3',
                  icon: '🎯',
                  title: 'Apply',
                  desc: "Turn evidence into your actual race plan. When you're ready for personalised support, HI Programs meet you exactly at your training stage.",
                },
              ].map(({ step, icon, title, desc }) => (
                <div key={step} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)' }}>
                    {step}
                  </div>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px' }}>
                    {icon}
                  </div>
                  <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', fontWeight: 400, color: 'var(--navy)', margin: 0 }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#444440', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <div className="trust-strip">
          {[
            { num: '30–50', label: 'studies per\ndeep-dive article' },
            { num: '5y', label: 'preferred recency\nof cited research' },
            { num: '0', label: 'affiliate links\never' },
            { num: '4', label: 'evidence-based\npillars' },
          ].map((item, i, arr) => (
            <Fragment key={item.num}>
              <div className="trust-strip__item">
                <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '30px', color: 'var(--blue-pale)', fontWeight: 400 }}>
                  {item.num}
                </span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textAlign: 'center', lineHeight: 1.4, whiteSpace: 'pre-line' }}>
                  {item.label}
                </span>
              </div>
              {i < arr.length - 1 && <div className="trust-strip__sep" aria-hidden />}
            </Fragment>
          ))}
        </div>

        {/* LEARNING TRAILS */}
        <section id="trails" style={{ background: 'var(--cream)', paddingTop: 'clamp(48px, 10vw, 84px)', paddingBottom: 'clamp(48px, 10vw, 84px)', scrollMarginTop: '112px' }}>
          <div className="container">
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              Learning Trails
              <div style={{ flex: 1, height: '1px', background: 'var(--sand)' }} />
            </div>
            <div className="section-heading-row" style={{ marginBottom: '36px' }}>
              <h2 className="heading-section" style={{ fontFamily: 'DM Serif Display, serif', fontWeight: 400, color: 'var(--navy)', letterSpacing: '-0.4px', margin: 0 }}>
                Build your knowledge,<br />step by step.
              </h2>
              <Link href="/trails" style={{ fontSize: '14px', color: 'var(--navy)', fontWeight: 500, textDecoration: 'none', flexShrink: 0 }}>
                View all trails →
              </Link>
            </div>
            <div className="grid-three">
              {featuredTrails.map(trail => (
                <TrailCard key={trail.id} trail={trail} />
              ))}
            </div>
          </div>
        </section>

        {/* PILLARS */}
        <section id="pillars" style={{ background: 'var(--warm)', paddingTop: 'clamp(48px, 10vw, 84px)', paddingBottom: 'clamp(48px, 10vw, 84px)', scrollMarginTop: '112px' }}>
          <div className="container">
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              Four pillars
              <div style={{ flex: 1, height: '1px', background: 'var(--sand)' }} />
            </div>
            <h2 className="heading-section" style={{ fontFamily: 'DM Serif Display, serif', fontWeight: 400, color: 'var(--navy)', letterSpacing: '-0.4px', marginBottom: '12px' }}>
              Four areas that determine your race result.
            </h2>
            <p style={{ fontSize: '15px', color: '#444440', lineHeight: 1.75, maxWidth: '490px', marginBottom: '52px', fontWeight: 300 }}>
              The evidence base for your training, recovery, nutrition, and mindset. Organised around what actually moves the needle on race day.
            </p>

            <div className="grid-pillars">
              {[
                {
                  href: '/motion',    icon: '🏃', label: 'Motion',    bg: 'var(--sky)',
                  desc: 'Zone 2 training, VO₂ max, periodization, and race-specific strength work. The training science that separates a strong finish from a survival march.',
                  startHref: '/articles/strength-training-for-beginners',
                  startLabel: 'Strength Training for Beginners',
                },
                {
                  href: '/nutrition', icon: '🥗', label: 'Nutrition', bg: '#EDE8DC',
                  desc: 'Fueling for long training blocks and race day: carbohydrate periodization, protein timing, and what the research says about race-week eating.',
                  startHref: '/articles/fuel-during-training',
                  startLabel: 'Fuel During Training',
                },
                {
                  href: '/recovery',  icon: '😴', label: 'Recovery',  bg: 'var(--sky)',
                  desc: 'Sleep quality, HRV, and active recovery protocols. The half of training most first-timers underestimate, and the one with the biggest performance upside.',
                  startHref: '/articles/sleep-for-performance',
                  startLabel: 'Sleep for Performance',
                },
                {
                  href: '/mindset',   icon: '🧠', label: 'Mindset',   bg: '#E8E3D8',
                  desc: 'Pre-race anxiety, motivation through hard training blocks, and the psychology of crossing your first finish line.',
                  startHref: '/articles',
                  startLabel: 'Browse all articles',
                },
              ].map(({ href, icon, label, bg, desc, startHref, startLabel }) => (
                <div key={href} style={{ background: 'var(--cream)', borderRadius: '22px', padding: '30px 24px', border: '1px solid transparent', display: 'flex', flexDirection: 'column' }}>
                  <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px', fontSize: '19px' }}>
                      {icon}
                    </div>
                    <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', fontWeight: 400, color: 'var(--navy)', marginBottom: '9px' }}>{label}</h3>
                    <p style={{ fontSize: '13px', color: '#444440', lineHeight: 1.65, marginBottom: '14px' }}>{desc}</p>
                    <span style={{ display: 'inline-block', fontSize: '13px', color: 'var(--blue-mid)', fontWeight: 500 }}>Explore →</span>
                  </Link>
                  <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid var(--sand)' }}>
                    <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', color: '#8A8A80', marginBottom: '5px' }}>Start with</div>
                    <Link href={startHref} style={{ fontSize: '12px', color: 'var(--navy)', textDecoration: 'none', lineHeight: 1.4 }}>
                      {startLabel} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ACTION-FIRST BLOCK */}
        <section id="protocols" style={{ background: 'var(--cream)', paddingTop: 'clamp(48px, 10vw, 84px)', paddingBottom: 'clamp(48px, 10vw, 84px)', scrollMarginTop: '112px' }}>
          <div className="container">
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              This week&apos;s protocol
              <div style={{ flex: 1, height: '1px', background: 'var(--sand)' }} />
            </div>
            <div className="section-heading-row">
              <h2 className="heading-section" style={{ fontFamily: 'DM Serif Display, serif', fontWeight: 400, color: 'var(--navy)', letterSpacing: '-0.4px', margin: 0 }}>
                3 things you can do<br />this week.
              </h2>
              <Link href="/protocols" style={{ fontSize: '14px', color: 'var(--navy)', fontWeight: 500, textDecoration: 'none', flexShrink: 0 }}>
                See all protocols →
              </Link>
            </div>

            <div className="grid-three">
              {[
                {
                  num: '01',
                  pillar: 'Recovery',
                  title: 'Sleep 8 hours, 3 nights in a row',
                  why: 'Sleep extension produces measurable performance gains within 72 hours — reaction time, sprint speed, and mood all improve.',
                  evidence: 'strong',
                  href: '/articles/sleep-extension-performance-protocols',
                  source: 'Sleep Extension Protocols',
                },
                {
                  num: '02',
                  pillar: 'Motion',
                  title: 'Do one Zone 2 session this week (30–45 min)',
                  why: 'Zone 2 training builds your aerobic base — the foundation for all other fitness. Most people skip it because it feels too easy.',
                  evidence: 'strong',
                  href: '/articles/zone-2-reality-check',
                  source: 'Zone 2 Reality Check',
                },
                {
                  num: '03',
                  pillar: 'Nutrition',
                  title: 'Eat 20–40g protein within 2 hours post-training',
                  why: 'The post-exercise window is real, though more flexible than once believed. Protein timing supports muscle protein synthesis when total intake is adequate.',
                  evidence: 'mixed',
                  href: '/articles/fuel-during-training',
                  source: 'Fuel During Training',
                },
              ].map(({ num, pillar, title, why, evidence, href, source }) => (
                <div key={num} style={{ background: 'var(--warm)', borderRadius: '22px', padding: '28px', border: '1px solid rgba(15,42,63,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '28px', color: 'var(--blue-pale)', fontWeight: 400 }}>{num}</span>
                    <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--blue-mid)', background: 'var(--sky)', padding: '4px 12px', borderRadius: '100px' }}>{pillar}</span>
                  </div>
                  <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '19px', fontWeight: 400, color: 'var(--navy)', lineHeight: 1.3, marginBottom: '12px' }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#444440', lineHeight: 1.65, marginBottom: '20px', fontWeight: 300 }}>
                    {why}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--sand)' }}>
                    <span style={{
                      fontSize: '10px', fontWeight: 500, letterSpacing: '0.8px', textTransform: 'uppercase',
                      padding: '4px 10px', borderRadius: '100px',
                      background: evidence === 'strong' ? 'var(--sky)' : 'var(--sand)',
                      color: evidence === 'strong' ? 'var(--blue)' : 'var(--navy)',
                      border: evidence === 'strong' ? '1px solid var(--blue-pale)' : '1px solid var(--sand)',
                    }}>
                      {evidence === 'strong' ? 'Strong evidence' : 'Mixed evidence'}
                    </span>
                    <Link href={href} style={{ fontSize: '12px', color: 'var(--blue-mid)', fontWeight: 500, textDecoration: 'none' }}>
                      {source} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ARTICLES */}
        <section id="articles" style={{ background: 'var(--warm)', paddingTop: 'clamp(48px, 10vw, 84px)', paddingBottom: 'clamp(48px, 10vw, 84px)', scrollMarginTop: '112px' }}>
          <div className="container">
            <div className="section-heading-row" style={{ marginBottom: '44px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  Latest articles
                  <div style={{ flex: 1, height: '1px', background: 'var(--sand)' }} />
                </div>
                <h2 className="heading-section" style={{ fontFamily: 'DM Serif Display, serif', fontWeight: 400, color: 'var(--navy)', letterSpacing: '-0.4px', margin: 0 }}>
                  Research into action
                </h2>
              </div>
              <Link href="/articles" style={{ fontSize: '14px', color: 'var(--navy)', fontWeight: 500, textDecoration: 'none' }}>
                View all
              </Link>
            </div>

            {/* Top row: large + 2 stacked */}
            <div className="grid-articles-featured">
              <ArticleCard {...latest[0]} large />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <ArticleCard {...latest[1]} />
                <ArticleCard {...latest[2]} />
              </div>
            </div>

            {/* Bottom row: 3 equal */}
            <div className="grid-three" style={{ gap: '18px' }}>
              <ArticleCard {...latest[3]} />
              <ArticleCard {...latest[4]} />
              <ArticleCard {...latest[5]} />
            </div>
          </div>
        </section>

        {/* HOW WE READ THE RESEARCH */}
        <section style={{ background: 'var(--navy)', paddingTop: 'clamp(48px, 10vw, 84px)', paddingBottom: 'clamp(48px, 10vw, 84px)' }}>
          <div className="container grid-two">
          <div style={{ maxWidth: '440px' }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(1.75rem, 5vw, 2.375rem)', fontWeight: 400, color: 'white', letterSpacing: '-0.4px', lineHeight: 1.2, marginBottom: '18px' }}>
              How we read the research
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: '28px', fontWeight: 300 }}>
              Every claim on HI follows a rigorous four-step process. When evidence is uncertain or conflicting, we say so. Honesty builds trust.
            </p>
            <Link href="/about#method"
              style={{ background: 'white', color: 'var(--navy)', borderRadius: '100px', padding: '12px 26px', fontSize: '14px', fontWeight: 500, textDecoration: 'none', display: 'inline-block' }}>
              About our process
            </Link>
          </div>

          <div>
            {[
              { num: '01', title: 'Find the research', body: 'Peer-reviewed studies, meta-analyses, and RCTs. Preferably within the last 5 years.' },
              { num: '02', title: 'Evaluate the evidence', body: 'Sample sizes, methodology, conflicts of interest, and convergence across studies.' },
              { num: '03', title: 'Translate to practice', body: 'Complex findings become clear, actionable steps. No jargon, no gatekeeping.' },
              { num: '04', title: 'Show the sources', body: 'Every claim links to research. Limitations stated clearly. Always.' },
            ].map(({ num, title, body }, i, arr) => (
              <div key={num} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', padding: '20px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '26px', color: 'var(--blue-pale)', opacity: 0.5, lineHeight: 1, flexShrink: 0, width: '34px' }}>{num}</span>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 500, color: 'white', marginBottom: '3px' }}>{title}</h4>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.44)', lineHeight: 1.6 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section id="newsletter" style={{ background: 'var(--cream)', paddingTop: 'clamp(48px, 10vw, 84px)', paddingBottom: 'clamp(48px, 10vw, 84px)', display: 'flex', justifyContent: 'center', scrollMarginTop: '112px' }}>
          <div className="container newsletter-panel">
            <div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '34px', fontWeight: 400, color: 'white', lineHeight: 1.2, letterSpacing: '-0.3px', marginBottom: '13px' }}>
                One evidence-based insight. Every week. For your race.
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '16px', fontWeight: 300 }}>
                Built for runners and triathletes training for their first big event. No fluff, no affiliate links, just the research that matters for your training week, delivered every Sunday.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Always sourced',
                  '0 affiliate links',
                  'Unsubscribe anytime',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginBottom: '6px', fontWeight: 300 }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--blue-pale)', display: 'inline-block', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <NewsletterForm />
          </div>
        </section>

      </main>
      <Footer />
      <HomeScrollUI />
    </>
  )
}


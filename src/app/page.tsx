import { Fragment } from 'react'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { getLatestArticles } from '@/lib/articles'
import NewsletterForm from '@/components/NewsletterForm'
import Link from 'next/link'

export default function HomePage() {
  const latest = getLatestArticles(6)

  return (
    <>
      <main>

        {/* HERO */}
        <section style={{ background: 'var(--cream)', paddingTop: 'clamp(40px, 10vw, 72px)', paddingBottom: 'clamp(48px, 10vw, 80px)' }}>
          <div className="container grid-hero">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '22px' }}>
                <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--blue-mid)' }} />
                Evidence-based health
              </div>

              <h1 className="heading-hero" style={{ fontFamily: 'DM Serif Display, serif', fontWeight: 400, color: 'var(--navy)', marginBottom: '22px', letterSpacing: '-0.8px' }}>
                Evidence-based strategies for a healthier,
                stronger <em style={{ fontStyle: 'italic', color: 'var(--blue-mid)' }}>life.</em>
              </h1>

              <p style={{ fontSize: '17px', lineHeight: 1.75, color: '#444440', maxWidth: '440px', marginBottom: '34px', fontWeight: 300 }}>
                Peer-reviewed research translated into practical guidance for motion, nutrition, recovery, and mindset. No hype. No marketing. Just evidence.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/articles"
                  style={{ background: 'var(--navy)', color: 'white', borderRadius: '100px', padding: '14px 30px', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
                  Start here
                </Link>
                <Link href="/newsletter"
                  style={{ background: 'transparent', color: 'var(--navy)', border: '1px solid rgba(15,42,63,0.25)', borderRadius: '100px', padding: '14px 26px', fontSize: '14px', textDecoration: 'none' }}>
                  Get the newsletter
                </Link>
              </div>

              <p style={{ fontSize: '12px', color: '#8A8A80', marginTop: '14px', fontWeight: 300 }}>
                1 email/week · Always sourced · Always practical
              </p>
            </div>

            {/* Hero cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: 0 }}>
              <HeroIllustrationCard />
              <HeroArticleCard
                pillar="Recovery"
                dotColor="var(--blue-light)"
                title="Fitness Recovery: What Works vs Hype"
                excerpt="Sleep. Fuel. Load. Stress. Tools. That order matters more than any gadget."
                level={2}
                indent="20px"
              />
              <HeroArticleCard
                pillar="Motion"
                dotColor="var(--blue-mid)"
                title="Build Your Running Base"
                excerpt="Zone 2 and why 80% of your training should be easy."
                level={2}
                paddingRight="20px"
              />
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

        {/* PILLARS */}
        <section style={{ background: 'var(--warm)', paddingTop: 'clamp(48px, 10vw, 84px)', paddingBottom: 'clamp(48px, 10vw, 84px)' }}>
          <div className="container">
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              Four pillars
              <div style={{ flex: 1, height: '1px', background: 'var(--sand)' }} />
            </div>
            <h2 className="heading-section" style={{ fontFamily: 'DM Serif Display, serif', fontWeight: 400, color: 'var(--navy)', letterSpacing: '-0.4px', marginBottom: '12px' }}>
              Every article.<br />One framework.
            </h2>
            <p style={{ fontSize: '15px', color: '#444440', lineHeight: 1.75, maxWidth: '490px', marginBottom: '52px', fontWeight: 300 }}>
              Motion, nutrition, recovery, mindset. The fundamentals of human health and performance, grounded in peer-reviewed evidence.
            </p>

            <div className="grid-pillars">
              {[
                {
                  href: '/motion',    icon: '🏃', label: 'Motion',    bg: 'var(--sky)',
                  desc: 'Training, VO₂ max, strength, and endurance grounded in exercise physiology.',
                  startHref: '/articles/strength-training-for-beginners',
                  startLabel: 'Strength Training for Beginners',
                },
                {
                  href: '/nutrition', icon: '🥗', label: 'Nutrition', bg: '#EDE8DC',
                  desc: 'Fueling, supplements, and metabolic health. What the research actually supports.',
                  startHref: '/articles/fuel-during-training',
                  startLabel: 'Fuel During Training',
                },
                {
                  href: '/recovery',  icon: '😴', label: 'Recovery',  bg: 'var(--sky)',
                  desc: 'Sleep, stress management, and active recovery. The fundamentals that move the needle.',
                  startHref: '/articles/sleep-for-performance',
                  startLabel: 'Sleep for Performance',
                },
                {
                  href: '/mindset',   icon: '🧠', label: 'Mindset',   bg: '#E8E3D8',
                  desc: 'Goal-setting, habits, and motivation. Behavioral science applied to health.',
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
        <section style={{ background: 'var(--cream)', paddingTop: 'clamp(48px, 10vw, 84px)', paddingBottom: 'clamp(48px, 10vw, 84px)' }}>
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
        <section style={{ background: 'var(--warm)', paddingTop: 'clamp(48px, 10vw, 84px)', paddingBottom: 'clamp(48px, 10vw, 84px)' }}>
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
        <section style={{ background: 'var(--cream)', paddingTop: 'clamp(48px, 10vw, 84px)', paddingBottom: 'clamp(48px, 10vw, 84px)', display: 'flex', justifyContent: 'center' }}>
          <div className="container newsletter-panel">
            <div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '34px', fontWeight: 400, color: 'white', lineHeight: 1.2, letterSpacing: '-0.3px', marginBottom: '13px' }}>
                Stay evidence-based.
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '16px', fontWeight: 300 }}>
                Research breakdowns, practical guides, and no-hype health insights straight to your inbox.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  '1 email per week',
                  'Every claim sourced',
                  'Always practical, never preachy',
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
    </>
  )
}

function HeroIllustrationCard() {
  return (
    <div className="hero-card hero-card-shift" style={{ background: 'var(--warm)', borderRadius: '20px', padding: '24px', border: '1px solid rgba(15,42,63,0.07)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '1.6px', textTransform: 'uppercase', color: 'var(--blue-mid)' }}>Motion</div>
      <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '17px', color: 'var(--navy)', textAlign: 'center' }}>VO₂ Max — Understanding the Basics</div>
      <div style={{ fontSize: '12px', color: '#8A8A80', textAlign: 'center' }}>An evidence-based guide to aerobic capacity</div>
      <svg width="200" height="118" viewBox="0 0 200 118" fill="none">
        <line x1="100" y1="6" x2="100" y2="48" stroke="#1A4D6E" strokeWidth="3" strokeLinecap="round"/>
        <line x1="100" y1="48" x2="66" y2="70" stroke="#2D7DA8" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="100" y1="48" x2="134" y2="70" stroke="#2D7DA8" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="66" y1="70" x2="46" y2="90" stroke="#5095AC" strokeWidth="2" strokeLinecap="round"/>
        <line x1="66" y1="70" x2="74" y2="95" stroke="#5095AC" strokeWidth="2" strokeLinecap="round"/>
        <line x1="134" y1="70" x2="126" y2="95" stroke="#5095AC" strokeWidth="2" strokeLinecap="round"/>
        <line x1="134" y1="70" x2="154" y2="90" stroke="#5095AC" strokeWidth="2" strokeLinecap="round"/>
        <line x1="46" y1="90" x2="32" y2="108" stroke="#A8CCE0" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="46" y1="90" x2="50" y2="112" stroke="#A8CCE0" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="74" y1="95" x2="62" y2="112" stroke="#A8CCE0" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="74" y1="95" x2="78" y2="114" stroke="#A8CCE0" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="126" y1="95" x2="122" y2="114" stroke="#A8CCE0" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="126" y1="95" x2="138" y2="112" stroke="#A8CCE0" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="154" y1="90" x2="150" y2="112" stroke="#A8CCE0" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="154" y1="90" x2="168" y2="108" stroke="#A8CCE0" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="32" cy="108" r="3" fill="#A8CCE0"/><circle cx="50" cy="112" r="3" fill="#A8CCE0"/>
        <circle cx="62" cy="112" r="2.5" fill="#A8CCE0"/><circle cx="78" cy="114" r="3" fill="#A8CCE0"/>
        <circle cx="122" cy="114" r="3" fill="#A8CCE0"/><circle cx="138" cy="112" r="2.5" fill="#A8CCE0"/>
        <circle cx="150" cy="112" r="3" fill="#A8CCE0"/><circle cx="168" cy="108" r="3" fill="#A8CCE0"/>
        <path d="M68 48 Q54 36 44 24 Q36 14 44 6 Q52 0 64 8 Q72 14 68 26" stroke="#2D7DA8" strokeWidth="1.5" fill="rgba(80,149,172,0.08)" strokeLinecap="round"/>
        <path d="M132 48 Q146 36 156 24 Q164 14 156 6 Q148 0 136 8 Q128 14 132 26" stroke="#2D7DA8" strokeWidth="1.5" fill="rgba(80,149,172,0.08)" strokeLinecap="round"/>
        <circle cx="100" cy="5" r="4" fill="#1A4D6E"/>
      </svg>
      <span style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--sky)', color: 'var(--blue)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '100px' }}>
        Level 1 · Beginner
      </span>
    </div>
  )
}

function HeroArticleCard({ pillar, dotColor, title, excerpt, level, indent, paddingRight }: {
  pillar: string; dotColor: string; title: string; excerpt: string; level: number; indent?: string; paddingRight?: string;
}) {
  return (
    <div className="hero-card-shift" style={{ background: 'var(--warm)', borderRadius: '18px', padding: '18px 22px', border: '1px solid rgba(15,42,63,0.07)', marginLeft: indent, marginRight: paddingRight }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: dotColor, display: 'inline-block' }} />
        <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A8A80' }}>{pillar}</span>
      </div>
      <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '17px', fontWeight: 400, color: 'var(--navy)', lineHeight: 1.3, marginBottom: '6px' }}>{title}</h3>
      <p style={{ fontSize: '13px', color: '#8A8A80', lineHeight: 1.55 }}>{excerpt}</p>
      <span style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--sky)', color: 'var(--blue)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.8px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '100px', marginTop: '10px' }}>
        Level {level} · Intermediate
      </span>
    </div>
  )
}

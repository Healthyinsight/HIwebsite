import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { getLatestArticlesAsync } from '@/lib/articles'
import { getSiteStats } from '@/lib/siteStats'

export const revalidate = 60
import NewsletterForm from '@/components/NewsletterForm'
import TrailCard from '@/components/TrailCard'
import { getActiveTrails } from '@/lib/trails'
import Link from 'next/link'
import HomeScrollUI from '@/components/HomeScrollUI'
import { WAITLIST_MODE } from '@/config'
import HeroAnimation from '@/components/HeroAnimationLoader'

/**
 * The three actions the site leads with. Hardcoded on purpose: "this week"
 * is a curatorial choice, not the newest three rows of a table.
 */
const PROTOCOLS = [
  {
    num: '01',
    pillar: 'Recovery',
    title: 'Sleep 8 hours, 3 nights in a row',
    why: 'Sleep extension produces measurable performance gains within 72 hours: reaction time, sprint speed, and mood all improve.',
    evidence: 'strong',
    href: '/articles/sleep-extension-performance-protocols',
    source: 'Sleep Extension Protocols',
  },
  {
    num: '02',
    pillar: 'Motion',
    title: 'Do one Zone 2 session this week (30–45 min)',
    why: 'Zone 2 training builds your aerobic base, the foundation for all other fitness. Most people skip it because it feels too easy.',
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
] as const

const EVIDENCE_BADGES: Record<string, { label: string; bg: string; color: string; border: string }> = {
  strong: { label: 'Strong evidence', bg: 'var(--sky)',  color: 'var(--blue)', border: '1px solid var(--blue-pale)' },
  mixed:  { label: 'Mixed evidence',  bg: 'var(--sand)', color: 'var(--navy)', border: '1px solid var(--sand)' },
  early:  { label: 'Early evidence',  bg: 'var(--warm)', color: 'var(--navy)', border: '1px dashed var(--blue-pale)' },
}

/** One line each. The pillar pages carry the depth. */
const PILLARS = [
  { href: '/motion',    icon: '🏃', label: 'Motion',    bg: 'var(--sky)', cta: 'See the Motion evidence',
    desc: 'Zone 2, VO₂ max, periodization and race-specific strength.' },
  { href: '/nutrition', icon: '🥗', label: 'Nutrition', bg: '#EDE8DC',    cta: 'See the Nutrition evidence',
    desc: 'Carbohydrate periodization, protein timing and race-week eating.' },
  { href: '/recovery',  icon: '😴', label: 'Recovery',  bg: 'var(--sky)', cta: 'See the Recovery evidence',
    desc: 'Sleep quality, HRV and the active recovery that actually works.' },
  { href: '/mindset',   icon: '🧠', label: 'Mindset',   bg: '#E8E3D8',    cta: 'See the Mindset evidence',
    desc: 'Pre-race anxiety, motivation and the psychology of a first finish line.' },
] as const

const eyebrowStyle = {
  fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase' as const,
  color: 'var(--blue-mid)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px',
}

const sectionHeadingStyle = {
  fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: 400,
  color: 'var(--navy)', letterSpacing: '-0.4px',
}

export default async function HomePage() {
  const stats = await getSiteStats()
  const featuredTrails = getActiveTrails().slice(0, 3)

  // The three protocols already link to articles. Showing those same articles
  // again a few sections down made "Fuel During Training" appear three times on
  // one page, so the latest list is filtered against them. Fetching more than
  // needed leaves room for the ones that get filtered out.
  const protocolSlugs = new Set(PROTOCOLS.map(p => p.href.replace('/articles/', '')))
  const latestPool = await getLatestArticlesAsync(8)
  const latest = latestPool.filter(a => !protocolSlugs.has(a.slug)).slice(0, 3)

  return (
    <>
      <main>

        {/* HERO */}
        <section style={{ background: 'var(--cream)', paddingTop: 'clamp(40px, 10vw, 72px)', paddingBottom: 'clamp(48px, 10vw, 80px)' }}>
          <div className="container grid-hero">
            {/* Text column */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '22px' }}>
                <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--blue-mid)' }} />
                Training for your first half marathon, marathon or 70.3
              </div>

              <h1 className="heading-hero" style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: 400, color: 'var(--navy)', marginBottom: '22px', letterSpacing: '-0.8px' }}>
                Stop guessing. Start training on evidence.
              </h1>
              <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(1.1rem, 3.5vw, 1.35rem)', fontWeight: 400, color: '#444440', marginBottom: '30px', lineHeight: 1.5 }}>
                HI turns peer-reviewed research on training, fueling and recovery into
                three things you can actually do this week. Free to read, every claim
                sourced, zero affiliate links.
              </p>

              {/* One primary action. The newsletter is the defined conversion, so
                  it gets the field rather than a link to a page with a field on it.
                  Everything about Path by HI now lives in its own strip at the
                  bottom, where it cannot compete with this. */}
              <NewsletterForm dark={false} source="hero" submitLabel="Get this week's protocol" />

              <p style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 400, textAlign: 'center', marginTop: '14px' }}>
                One email, every Sunday.
              </p>

              <p style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: 400, textAlign: 'center', marginTop: '10px' }}>
                Or take the{' '}
                <Link href="/quiz" style={{ color: 'var(--blue-mid)', fontWeight: 500, textDecoration: 'none' }}>
                  2-minute Health IQ quiz →
                </Link>
              </p>
            </div>

            {/* Animation column — hidden on mobile via .hero-anim-col */}
            <div className="hero-anim-col">
              <HeroAnimation />
            </div>
          </div>
        </section>

        {/* PROOF ROW. Three claims a reader can check, not four numbers. The
            source count is derived; hardcoding any figure here is a build error
            waiting to happen (see src/lib/siteStats.ts). */}
        <div style={{ background: 'var(--warm)', borderTop: '1px solid var(--sand)', borderBottom: '1px solid var(--sand)', padding: '20px clamp(16px, 4vw, 52px)' }}>
          <div style={{ display: 'flex', gap: '28px', rowGap: '10px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '820px', margin: '0 auto' }}>
            {[
              `${stats.librarySize} sources in the research library`,
              '0 affiliate links, ever',
              'Every claim graded: strong, mixed or early',
            ].map(claim => (
              <span key={claim} style={{ fontSize: '14px', color: '#444440', fontWeight: 400 }}>
                {claim}
              </span>
            ))}
          </div>
        </div>

        {/* DO THIS WEEK */}
        <section id="protocols" style={{ background: 'var(--cream)', paddingTop: 'clamp(48px, 10vw, 84px)', paddingBottom: 'clamp(48px, 10vw, 84px)', scrollMarginTop: '112px' }}>
          <div className="container">
            <div style={eyebrowStyle}>
              Do this week
              <div style={{ flex: 1, height: '1px', background: 'var(--sand)' }} />
            </div>
            <div className="section-heading-row">
              <h2 className="heading-section" style={{ ...sectionHeadingStyle, margin: 0 }}>
                3 things you can do<br />this week.
              </h2>
              <Link href="/protocols" style={{ fontSize: '14px', color: 'var(--navy)', fontWeight: 500, textDecoration: 'none', flexShrink: 0 }}>
                See all protocols →
              </Link>
            </div>

            <div className="grid-three">
              {PROTOCOLS.map(({ num, pillar, title, why, evidence, href, source }) => {
                const badge = EVIDENCE_BADGES[evidence] ?? EVIDENCE_BADGES.mixed
                return (
                  <div key={num} style={{ background: 'var(--warm)', borderRadius: '22px', padding: '28px', border: '1px solid rgba(15,42,63,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '28px', color: 'var(--blue-pale)', fontWeight: 400 }}>{num}</span>
                      <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--blue-mid)', background: 'var(--sky)', padding: '4px 12px', borderRadius: '100px' }}>{pillar}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '19px', fontWeight: 400, color: 'var(--navy)', lineHeight: 1.3, marginBottom: '12px' }}>
                      {title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#444440', lineHeight: 1.65, marginBottom: '20px', fontWeight: 300 }}>
                      {why}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid var(--sand)' }}>
                      <span style={{
                        fontSize: '10px', fontWeight: 500, letterSpacing: '0.8px', textTransform: 'uppercase',
                        padding: '4px 10px', borderRadius: '100px',
                        background: badge.bg, color: badge.color, border: badge.border,
                      }}>
                        {badge.label}
                      </span>
                      <Link href={href} style={{ fontSize: '12px', color: 'var(--blue-mid)', fontWeight: 500, textDecoration: 'none' }}>
                        Read {source} →
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ background: 'var(--warm)', paddingTop: 'clamp(48px, 10vw, 84px)', paddingBottom: 'clamp(48px, 10vw, 84px)' }}>
          <div className="container">
            <div style={eyebrowStyle}>
              Getting started
              <div style={{ flex: 1, height: '1px', background: 'var(--sand)' }} />
            </div>
            <h2 className="heading-section" style={{ ...sectionHeadingStyle, marginBottom: '48px' }}>
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
                  title: 'Track',
                  desc: 'Health IQ is your score for how much evidence-based training knowledge you have actually banked. Every article you finish adds to it, so you can see what you have covered and what you have not.',
                },
                {
                  step: 'Step 3',
                  icon: '🎯',
                  title: 'Apply on race day',
                  desc: "Turn the evidence into your actual race plan: what to run, what to eat, when to rest. When you're ready for personalised support, HI Programs meet you at your training stage.",
                },
              ].map(({ step, icon, title, desc }) => (
                <div key={step} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)' }}>
                    {step}
                  </div>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px' }}>
                    {icon}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '20px', fontWeight: 400, color: 'var(--navy)', margin: 0 }}>
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

        {/* LEARNING TRAILS */}
        <section id="trails" style={{ background: 'var(--cream)', paddingTop: 'clamp(48px, 10vw, 84px)', paddingBottom: 'clamp(48px, 10vw, 84px)', scrollMarginTop: '112px' }}>
          <div className="container">
            <div style={eyebrowStyle}>
              Learning Trails
              <div style={{ flex: 1, height: '1px', background: 'var(--sand)' }} />
            </div>
            <div className="section-heading-row" style={{ marginBottom: '36px' }}>
              <h2 className="heading-section" style={{ ...sectionHeadingStyle, margin: 0 }}>
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
            <div style={eyebrowStyle}>
              Four pillars
              <div style={{ flex: 1, height: '1px', background: 'var(--sand)' }} />
            </div>
            <h2 className="heading-section" style={{ ...sectionHeadingStyle, marginBottom: '36px' }}>
              Four areas that determine your race result.
            </h2>

            <div className="grid-pillars">
              {PILLARS.map(({ href, icon, label, bg, desc, cta }) => (
                <Link key={href} href={href} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ background: 'var(--cream)', borderRadius: '22px', padding: '26px 24px', border: '1px solid transparent', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontSize: '19px' }}>
                      {icon}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '20px', fontWeight: 400, color: 'var(--navy)', marginBottom: '8px' }}>{label}</h3>
                    <p style={{ fontSize: '13px', color: '#444440', lineHeight: 1.65, marginBottom: '16px', flex: 1 }}>{desc}</p>
                    <span style={{ display: 'inline-block', fontSize: '13px', color: 'var(--blue-mid)', fontWeight: 500 }}>{cta} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ARTICLES */}
        <section id="articles" style={{ background: 'var(--cream)', paddingTop: 'clamp(48px, 10vw, 84px)', paddingBottom: 'clamp(48px, 10vw, 84px)', scrollMarginTop: '112px' }}>
          <div className="container">
            <div className="section-heading-row" style={{ marginBottom: '44px' }}>
              <div>
                <div style={eyebrowStyle}>
                  Latest articles
                  <div style={{ flex: 1, height: '1px', background: 'var(--sand)' }} />
                </div>
                <h2 className="heading-section" style={{ ...sectionHeadingStyle, margin: 0 }}>
                  Research into action
                </h2>
              </div>
              <Link href="/articles" style={{ fontSize: '14px', color: 'var(--navy)', fontWeight: 500, textDecoration: 'none', flexShrink: 0 }}>
                View all articles →
              </Link>
            </div>

            {latest.length > 0 && (
              <div className="grid-articles-featured">
                <ArticleCard {...latest[0]} large />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {latest.slice(1).map(article => (
                    <ArticleCard key={article.slug} {...article} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* HOW WE READ THE RESEARCH */}
        <section style={{ background: 'var(--navy)', paddingTop: 'clamp(48px, 10vw, 84px)', paddingBottom: 'clamp(48px, 10vw, 84px)' }}>
          <div className="container grid-two">
          <div style={{ maxWidth: '440px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(1.75rem, 5vw, 2.375rem)', fontWeight: 400, color: 'white', letterSpacing: '-0.4px', lineHeight: 1.2, marginBottom: '18px' }}>
              How we read the research
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: '22px', fontWeight: 300 }}>
              Every claim on HI follows the same four steps. When the evidence is thin or conflicting, we say so.
            </p>

            {/* Transparent founder: the method needs a name attached to it. */}
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '26px', borderLeft: '2px solid var(--blue-pale)', paddingLeft: '16px' }}>
              Written by Filip Berggren, founder of HI. I read the studies, check the
              data, and tell you when the evidence is thin.
            </p>

            <Link href="/about#method"
              style={{ background: 'white', color: 'var(--navy)', borderRadius: '100px', padding: '12px 26px', fontSize: '14px', fontWeight: 500, textDecoration: 'none', display: 'inline-block' }}>
              See how we work with evidence
            </Link>
          </div>

          <div>
            {[
              { num: '01', title: 'Find the research', body: 'Peer-reviewed studies, meta-analyses and RCTs, preferably from the last 5 years.' },
              { num: '02', title: 'Evaluate the evidence', body: 'Sample sizes, methodology, conflicts of interest, convergence across studies.' },
              { num: '03', title: 'Translate to practice', body: 'Findings become clear, actionable steps. No jargon, no gatekeeping.' },
              { num: '04', title: 'Show the sources', body: 'Every claim links to research. Limitations stated clearly. Always.' },
            ].map(({ num, title, body }, i, arr) => (
              <div key={num} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', padding: '20px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '26px', color: 'var(--blue-pale)', opacity: 0.5, lineHeight: 1, flexShrink: 0, width: '34px' }}>{num}</span>
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
              <h2 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(1.5rem, 4.5vw, 2.125rem)', fontWeight: 400, color: 'white', lineHeight: 1.2, letterSpacing: '-0.3px', marginBottom: '13px' }}>
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
            <NewsletterForm source="newsletter-home" />
          </div>
        </section>

        {/* PATH BY HI. The app is closed beta, so it gets a strip at the bottom
            rather than a share of the hero. */}
        <section style={{ background: 'var(--warm)', borderTop: '1px solid var(--sand)', paddingTop: '30px', paddingBottom: '30px' }}>
          <div className="container" style={{ display: 'flex', gap: '10px 22px', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#444440', margin: 0, fontWeight: 400 }}>
              <strong style={{ fontWeight: 600, color: 'var(--navy)' }}>Path by HI</strong>
              {' '}is the app that turns this into your plan. Closed beta.
            </p>
            <Link href={WAITLIST_MODE ? '/waitlist' : 'https://tracker.healthyinsight.eu'}
              style={{ fontSize: '14px', color: 'var(--blue-mid)', fontWeight: 500, textDecoration: 'none' }}>
              {WAITLIST_MODE ? 'Join the waitlist' : 'Start for free'} →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
      <HomeScrollUI />
    </>
  )
}

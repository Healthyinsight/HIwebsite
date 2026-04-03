import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Healthy Insight translates peer-reviewed research into actionable strategies for motion, nutrition, recovery, and mindset.',
}

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>

        {/* HERO */}
        <section style={{ background: 'var(--cream)', padding: '80px 52px' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '20px' }}>
              About
            </div>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '48px', fontWeight: 400, color: 'var(--navy)', letterSpacing: '-0.8px', lineHeight: 1.1, marginBottom: '28px' }}>
              Your source for evidence-based<br />
              <em style={{ fontStyle: 'italic', color: 'var(--blue-mid)' }}>health strategies.</em>
            </h1>
            <p style={{ fontSize: '17px', color: '#444440', lineHeight: 1.75, fontWeight: 300 }}>
              Healthy Insight translates peer-reviewed research into practical guidance for motion, nutrition, recovery, and mindset. Every article starts with studies and ends with clear steps you can apply today.
            </p>
          </div>
        </section>

        {/* WHY HI EXISTS */}
        <section style={{ padding: '80px 52px', background: 'var(--warm)' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '20px' }}>
              Why HI exists
            </div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '34px', fontWeight: 400, color: 'var(--navy)', marginBottom: '32px', lineHeight: 1.2 }}>
              The health information landscape is broken.
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '40px' }}>
              {[
                {
                  icon: '🚫',
                  title: 'What HI is not',
                  items: [
                    'Affiliate marketing or supplement deals',
                    'Influencer trends without evidence',
                    'Click-bait health scare headlines',
                    'Advice designed to sell you something',
                  ],
                },
                {
                  icon: '✓',
                  title: 'What HI is',
                  items: [
                    'Independent research synthesis',
                    'Honest about uncertainty',
                    'Actionable, practical guidance',
                    'Transparent about every source',
                  ],
                },
                {
                  icon: '🎯',
                  title: 'Who it\'s for',
                  items: [
                    'People who want the real picture',
                    'Those tired of contradictory advice',
                    'Anyone who prefers evidence to hype',
                    'Curious, health-motivated people',
                  ],
                },
              ].map(({ icon, title, items }) => (
                <div key={title} style={{ background: 'var(--cream)', borderRadius: '18px', padding: '24px' }}>
                  <div style={{ fontSize: '22px', marginBottom: '12px' }}>{icon}</div>
                  <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '17px', fontWeight: 400, color: 'var(--navy)', marginBottom: '14px' }}>{title}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {items.map(item => (
                      <li key={item} style={{ fontSize: '13px', color: '#444440', lineHeight: 1.6, marginBottom: '6px', display: 'flex', gap: '8px' }}>
                        <span style={{ color: 'var(--blue-mid)', flexShrink: 0 }}>·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p style={{ fontSize: '16px', color: '#444440', lineHeight: 1.75, fontWeight: 300 }}>
              HI was built out of frustration. The internet is full of wellness content designed to keep you scrolling, sell you supplements, or confirm whatever you already believe. Finding reliable, actionable health information requires reading dozens of studies, evaluating their quality, and synthesising conflicting findings. Most people don&apos;t have time for that.
            </p>
            <p style={{ fontSize: '16px', color: '#444440', lineHeight: 1.75, marginTop: '16px', fontWeight: 300 }}>
              That&apos;s what HI does instead.
            </p>
          </div>
        </section>

        {/* HOW HI WORKS */}
        <section id="method" style={{ padding: '80px 52px', background: 'var(--cream)' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '20px' }}>
              The method
            </div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '34px', fontWeight: 400, color: 'var(--navy)', marginBottom: '12px', lineHeight: 1.2 }}>
              How HI works
            </h2>
            <p style={{ fontSize: '16px', color: '#444440', lineHeight: 1.75, marginBottom: '40px', fontWeight: 300 }}>
              Health information should be accurate, accessible, and honest. Every article on HI follows the same four-step process.
            </p>
            {[
              { n: '1', title: 'Start with the research', body: 'Recent peer-reviewed studies (5 years preferred), with convergence across multiple findings, not single studies. RCTs and meta-analyses are weighted most heavily.' },
              { n: '2', title: 'Check the quality', body: 'Sample sizes, methodology, and potential conflicts of interest all matter. A study funded by a supplement company gets more scrutiny than an independent university study.' },
              { n: '3', title: 'Translate to practice', body: 'Complex research becomes clear, actionable steps. No jargon, no fluff. The gap between "what studies show" and "what you should do" is where HI lives.' },
              { n: '4', title: 'Show the sources', body: 'Every claim links to research. When evidence is uncertain or conflicting, that\'s stated clearly — not hidden or glossed over. Epistemic honesty is a feature, not a bug.' },
            ].map(({ n, title, body }) => (
              <div key={n} style={{ display: 'flex', gap: '20px', marginBottom: '28px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'DM Serif Display, serif', fontSize: '16px', color: 'var(--navy)' }}>
                  {n}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', fontWeight: 400, color: 'var(--navy)', marginBottom: '6px' }}>{title}</h3>
                  <p style={{ fontSize: '15px', color: '#444440', lineHeight: 1.7, fontWeight: 300 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRANSPARENCY & SOURCE POLICY */}
        <section id="sources" style={{ padding: '80px 52px', background: 'var(--warm)' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '20px' }}>
              Transparency
            </div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '34px', fontWeight: 400, color: 'var(--navy)', marginBottom: '28px', lineHeight: 1.2 }}>
              Sources & transparency
            </h2>

            <div style={{ background: 'var(--sky)', borderRadius: '16px', padding: '24px 28px', marginBottom: '32px', borderLeft: '3px solid var(--blue-mid)' }}>
              <p style={{ fontSize: '16px', color: 'var(--navy)', lineHeight: 1.7, fontWeight: 400, margin: 0 }}>
                <strong>Important disclaimer:</strong> I&apos;m not a physician, PhD, or licensed dietitian. I synthesise published, peer-reviewed research and translate it into practical guidance. I&apos;m a careful reader of studies — not a producer of them. Nothing on HI constitutes medical advice.
              </p>
            </div>

            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', fontWeight: 400, color: 'var(--navy)', marginBottom: '16px' }}>Source criteria</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
              {[
                { label: 'Peer-reviewed only', desc: 'No blog posts, podcasts, or news articles as primary sources. PubMed, Cochrane, and academic journals are the starting point.' },
                { label: 'Recency matters', desc: '5 years preferred; older research cited when it\'s the most robust available or when foundational understanding hasn\'t changed.' },
                { label: 'Convergence over single studies', desc: 'A single study rarely changes anything. Multiple consistent findings from independent research groups carry real weight.' },
                { label: 'RCTs and meta-analyses weighted higher', desc: 'Randomised controlled trials and meta-analyses are the gold standard. Observational studies are noted as such.' },
                { label: 'Conflicts of interest flagged', desc: 'Industry-funded studies aren\'t disqualified, but they\'re disclosed and evaluated more carefully.' },
              ].map(({ label, desc }) => (
                <li key={label} style={{ display: 'flex', gap: '16px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--sand)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--blue-mid)', display: 'inline-block', flexShrink: 0, marginTop: '7px' }} />
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--navy)', marginBottom: '3px' }}>{label}</div>
                    <div style={{ fontSize: '14px', color: '#444440', lineHeight: 1.65, fontWeight: 300 }}>{desc}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div style={{ background: 'var(--cream)', borderRadius: '16px', padding: '24px 28px' }}>
              <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', fontWeight: 400, color: 'var(--navy)', marginBottom: '10px' }}>Found an error?</h3>
              <p style={{ fontSize: '15px', color: '#444440', lineHeight: 1.7, fontWeight: 300, marginBottom: '16px' }}>
                Science changes. I make mistakes. If you spot an error, a misrepresented study, or a claim that doesn&apos;t hold up, please let me know. Corrections are always welcome and will be published transparently.
              </p>
              <a href="mailto:filipb@healthyinsight.eu"
                style={{ fontSize: '14px', color: 'var(--blue-mid)', fontWeight: 500, textDecoration: 'none' }}>
                filipb@healthyinsight.eu →
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT FILIP */}
        <section style={{ padding: '80px 52px', background: 'var(--navy)' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--blue-pale)', opacity: 0.7, marginBottom: '20px' }}>
              The founder
            </div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '34px', fontWeight: 400, color: 'white', marginBottom: '20px', lineHeight: 1.2 }}>
              About Filip Berggren
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: '20px', fontWeight: 300 }}>
              Filip Berggren is the founder of Healthy Insight. Frustrated by wellness clickbait and influencer trends without evidence, he started HI to translate research into practical action.
            </p>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: '32px', fontWeight: 300 }}>
              He reads peer-reviewed studies, checks the data, and shares what actually works — grounded in physiology, not marketing. HI is the resource he wished existed when he started.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="mailto:filipb@healthyinsight.eu"
                style={{ display: 'inline-block', background: 'white', color: 'var(--navy)', borderRadius: '100px', padding: '12px 26px', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
                Get in touch
              </a>
              <Link href="/newsletter"
                style={{ display: 'inline-block', background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px', padding: '12px 26px', fontSize: '14px', fontWeight: 400, textDecoration: 'none' }}>
                Join the newsletter
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

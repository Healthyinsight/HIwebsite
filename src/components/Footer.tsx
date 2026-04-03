import Link from 'next/link'

export default function Footer() {
  const cols = [
    {
      heading: 'Pillars',
      links: [
        { href: '/motion',    label: 'Motion' },
        { href: '/nutrition', label: 'Nutrition' },
        { href: '/recovery',  label: 'Recovery' },
        { href: '/mindset',   label: 'Mindset' },
      ],
    },
    {
      heading: 'Content',
      links: [
        { href: '/articles',  label: 'All Articles' },
        { href: '/protocols', label: 'Protocols & Guides' },
        { href: '/newsletter', label: 'Newsletter' },
      ],
    },
    {
      heading: 'About',
      links: [
        { href: '/about',         label: 'About HI' },
        { href: '/about#method',  label: 'How we work with evidence' },
        { href: '/about#sources', label: 'Sources & transparency' },
        { href: 'https://tracker.healthyinsight.eu', label: 'The Path Tracker' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { href: '/privacy',  label: 'Privacy Policy' },
        { href: '/terms',    label: 'Terms' },
        { href: 'mailto:filipb@healthyinsight.eu', label: 'Contact' },
      ],
    },
  ]

  return (
    <footer style={{ background: 'var(--cream)', borderTop: '1px solid var(--sand)', padding: '56px 52px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', maxWidth: '1200px', margin: '0 auto', marginBottom: '44px' }}>
        <div>
          <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '19px', color: 'var(--navy)', display: 'block', marginBottom: '12px' }}>
            Healthy Insight
          </span>
          <p style={{ fontSize: '14px', lineHeight: 1.7, maxWidth: '265px', color: '#8A8A80', fontWeight: 300, marginBottom: '0' }}>
            Evidence-based health insights for people who want to make better decisions. Grounded in physiology, not marketing.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.heading}>
            <h4 style={{ fontSize: '10px', fontWeight: 500, marginBottom: '16px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8A8A80' }}>
              {col.heading}
            </h4>
            {col.links.map(({ href, label }) => (
              <Link key={href} href={href}
                style={{ display: 'block', fontSize: '14px', marginBottom: '10px', textDecoration: 'none', color: '#444440' }}>
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '28px', borderTop: '1px solid var(--sand)', maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ fontSize: '13px', color: '#8A8A80' }}>
          © 2026 Healthy Insight. All rights reserved.
        </p>
        <p style={{ fontFamily: 'DM Serif Display, serif', fontStyle: 'italic', fontSize: '14px', color: 'var(--blue-mid)' }}>
          Science Made Simple, Action Made Fun
        </p>
      </div>
    </footer>
  )
}

import Link from 'next/link'

export default function Nav() {
  return (
    <nav style={{
      background: 'rgba(250,250,247,0.94)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(15,42,63,0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Primary nav row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 52px',
        height: '62px',
      }}>
        <Link href="/" style={{ fontFamily: 'DM Serif Display, serif', fontSize: '19px', color: '#0F2A3F', textDecoration: 'none', letterSpacing: '-0.2px', flexShrink: 0 }}>
          Healthy Insight
        </Link>

        <ul style={{ display: 'flex', gap: '24px', listStyle: 'none', margin: 0, padding: 0 }}>
          {[
            { href: '/motion',    label: 'Motion' },
            { href: '/nutrition', label: 'Nutrition' },
            { href: '/recovery',  label: 'Recovery' },
            { href: '/mindset',   label: 'Mindset' },
            { href: '/articles',  label: 'Articles' },
            { href: '/protocols', label: 'Protocols' },
            { href: '/about',     label: 'About' },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link href={href} style={{ fontSize: '14px', color: '#444440', textDecoration: 'none', fontWeight: 400 }}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/newsletter" style={{ background: '#0F2A3F', color: 'white', borderRadius: '100px', padding: '9px 22px', fontSize: '13px', fontWeight: 500, textDecoration: 'none', flexShrink: 0 }}>
          Newsletter
        </Link>
      </div>

      {/* Secondary nav row */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '28px',
        padding: '0 52px 8px',
      }}>
        {[
          { href: '/about#method',  label: 'How we work with evidence' },
          { href: '/about#sources', label: 'Sources & transparency' },
          { href: 'mailto:filipb@healthyinsight.eu', label: 'Contact' },
        ].map(({ href, label }) => (
          <a key={href} href={href} style={{ fontSize: '11px', color: '#8A8A80', textDecoration: 'none', letterSpacing: '0.2px' }}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}

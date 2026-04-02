import Link from 'next/link'

export default function Nav() {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 52px',
      height: '68px',
      background: 'rgba(250,250,247,0.94)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(15,42,63,0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link href="/" style={{ fontFamily: 'DM Serif Display, serif', fontSize: '19px', color: '#0F2A3F', textDecoration: 'none', letterSpacing: '-0.2px' }}>
        Healthy Insight
      </Link>

      <ul style={{ display: 'flex', gap: '32px', listStyle: 'none', margin: 0, padding: 0 }}>
        {[
          { href: '/motion',    label: 'Motion' },
          { href: '/nutrition', label: 'Nutrition' },
          { href: '/recovery',  label: 'Recovery' },
          { href: '/mindset',   label: 'Mindset' },
          { href: '/about',     label: 'About' },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link href={href} style={{ fontSize: '14px', color: '#444440', textDecoration: 'none', fontWeight: 400 }}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/newsletter" style={{ background: '#0F2A3F', color: 'white', borderRadius: '100px', padding: '9px 22px', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>
        Newsletter
      </Link>
    </nav>
  )
}

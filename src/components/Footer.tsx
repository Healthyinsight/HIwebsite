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
      heading: 'Company',
      links: [
        { href: '/about',      label: 'About' },
        { href: '/newsletter', label: 'Newsletter' },
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
    <footer style={{ background: 'var(--cream)', borderTop: '1px solid var(--sand)' }}
      className="px-14 pt-14 pb-10">
      <div className="grid gap-12 mb-11"
        style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
        <div>
          <span className="font-serif text-[19px]" style={{ color: 'var(--navy)' }}>
            Healthy Insight
          </span>
          <p className="text-sm mt-3 leading-relaxed max-w-[265px]"
            style={{ color: '#8A8A80', fontWeight: 300 }}>
            Evidence-based health insights for people who want to make better decisions.
            Grounded in physiology, not marketing.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.heading}>
            <h4 className="text-[10px] font-medium mb-4 tracking-widest uppercase"
              style={{ color: '#8A8A80' }}>
              {col.heading}
            </h4>
            {col.links.map(({ href, label }) => (
              <Link key={href} href={href}
                className="block text-sm mb-2.5 no-underline transition-colors hover:text-navy"
                style={{ color: '#444440' }}>
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-7"
        style={{ borderTop: '1px solid var(--sand)' }}>
        <p className="text-[13px]" style={{ color: '#8A8A80' }}>
          2026 Healthy Insight. All rights reserved.
        </p>
        <p className="font-serif italic text-sm" style={{ color: 'var(--blue-mid)' }}>
          Science Made Simple, Action Made Fun
        </p>
      </div>
    </footer>
  )
}

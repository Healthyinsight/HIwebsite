'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

type NavChild = {
  href: string
  label: string
  description?: string
  external?: boolean
  comingSoon?: boolean
  pillarColor?: string
}

type NavSection = {
  heading?: string
  items: NavChild[]
}

type NavItem = {
  label: string
  href: string
  sections?: NavSection[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Learn',
    href: '/trails',
    sections: [
      {
        heading: 'Trails',
        items: [
          { href: '/trails/recovery', label: 'Sleep Stack', description: 'Optimise recovery and deep sleep' },
          { href: '/trails/motion', label: 'Build Your Engine', description: 'Structured strength and conditioning' },
          { href: '/trails/nutrition', label: 'Fuel the Machine', description: 'Performance nutrition basics', comingSoon: true },
          { href: '/trails/mindset', label: 'The Performance Mind', description: 'Mental frameworks for health', comingSoon: true },
        ],
      },
      {
        heading: 'Formats',
        items: [
          { href: '/protocols', label: 'Protocols', description: 'Step-by-step evidence-based guides' },
          { href: '/quiz', label: 'Health IQ Quiz', description: 'Test your health knowledge' },
        ],
      },
    ],
  },
  {
    label: 'Articles',
    href: '/articles',
    sections: [
      {
        items: [
          { href: '/articles', label: 'All Articles', description: 'Browse the full library' },
        ],
      },
      {
        heading: 'By Pillar',
        items: [
          { href: '/motion', label: 'Motion', description: 'Strength, endurance, mobility', pillarColor: '#253527' },
          { href: '/nutrition', label: 'Nutrition', description: 'Fuel, timing, supplementation', pillarColor: '#1A4D6E' },
          { href: '/recovery', label: 'Recovery', description: 'Sleep, rest, adaptation', pillarColor: '#0F2A3F' },
          { href: '/mindset', label: 'Mindset', description: 'Focus, habit, resilience', pillarColor: '#0A1F2E' },
        ],
      },
    ],
  },
  {
    label: 'Tools',
    href: '/waitlist',
    sections: [
      {
        items: [
          { href: 'https://tracker.healthyinsight.eu/', label: 'Path Tracker', description: 'Track your learning progress', external: true },
          { href: '/waitlist', label: 'Challenges App', description: 'Structured 30-day challenges', comingSoon: true },
        ],
      },
    ],
  },
  {
    label: 'About',
    href: '/about',
    sections: [
      {
        items: [
          { href: '/about', label: 'About HI', description: 'Our mission and approach' },
          { href: '/about#method', label: 'Our Method', description: 'How we evaluate evidence' },
          { href: '/about#sources', label: 'Sources & Transparency', description: 'Our research standards' },
          { href: 'mailto:filipb@healthyinsight.eu', label: 'Contact', description: 'Get in touch with us' },
        ],
      },
    ],
  },
]

function PanelChild({ child, onClick }: { child: NavChild; onClick?: () => void }) {
  const inner = (
    <>
      {child.pillarColor && (
        <span className="nav-item__dot" style={{ background: child.pillarColor }} />
      )}
      <span className="nav-item__text">
        <span className="nav-item__label">{child.label}</span>
        {child.description && (
          <span className="nav-item__desc">{child.description}</span>
        )}
      </span>
      {child.comingSoon && <span className="site-nav__badge">Soon</span>}
    </>
  )

  if (child.comingSoon) {
    return <span className="site-nav__panel-item site-nav__panel-item--disabled">{inner}</span>
  }
  if (child.external) {
    return (
      <a
        href={child.href}
        target="_blank"
        rel="noopener noreferrer"
        className="site-nav__panel-item"
        onClick={onClick}
      >
        {inner}
      </a>
    )
  }
  return (
    <Link href={child.href} className="site-nav__panel-item" onClick={onClick}>
      {inner}
    </Link>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const close = useCallback(() => {
    setOpen(false)
    setExpanded(null)
  }, [])

  const toggle = useCallback(() => setOpen(o => !o), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  // Close overlay on route change
  useEffect(() => { close() }, [pathname, close])

  function isActive(item: NavItem) {
    if (item.href === '/') return pathname === '/'
    return pathname === item.href || pathname.startsWith(item.href + '/')
  }

  return (
    <nav className={`site-nav${scrolled ? ' is-scrolled' : ''}`} aria-label="Main">
      <div className="container site-nav__bar">
        {/* Brand */}
        <Link href="/" className="site-nav__brand">
          Healthy Insight
        </Link>

        {/* Desktop links */}
        <ul className="site-nav__links" role="list">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              className={`site-nav__top${isActive(item) ? ' site-nav__top--active' : ''}`}
            >
              <Link href={item.href}>{item.label}</Link>

              {item.sections && (
                <div className="site-nav__panel" role="menu">
                  {item.sections.map((section, i) => (
                    <div key={i} className="site-nav__panel-section">
                      {section.heading && (
                        <p className="site-nav__panel-heading">{section.heading}</p>
                      )}
                      {section.items.map((child) => (
                        <PanelChild key={child.label} child={child} />
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link href="/newsletter" className="site-nav__cta site-nav__cta--desktop">
          Newsletter
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="site-nav__menu-btn"
          aria-expanded={open}
          aria-controls="nav-overlay"
          onClick={toggle}
        >
          <span className="site-nav__menu-icon" aria-hidden>
            <span /><span /><span />
          </span>
          Menu
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        id="nav-overlay"
        className={`site-nav__overlay${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!open}
      >
        <div className="site-nav__overlay-header">
          <Link href="/" className="site-nav__brand" onClick={close}>
            Healthy Insight
          </Link>
          <button
            type="button"
            className="site-nav__overlay-close"
            aria-label="Close menu"
            onClick={close}
          >
            ✕
          </button>
        </div>

        <nav className="site-nav__acc" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="site-nav__acc-item">
              <button
                type="button"
                className="site-nav__acc-trigger"
                aria-expanded={expanded === item.label}
                onClick={() =>
                  setExpanded(e => e === item.label ? null : item.label)
                }
              >
                {item.label}
                <span className="site-nav__acc-chevron" aria-hidden>
                  {expanded === item.label ? '−' : '+'}
                </span>
              </button>

              {expanded === item.label && item.sections && (
                <div className="site-nav__acc-content">
                  {item.sections.map((section, i) => (
                    <div key={i}>
                      {section.heading && (
                        <p className="site-nav__acc-heading">{section.heading}</p>
                      )}
                      {section.items.map((child) => (
                        <PanelChild key={child.label} child={child} onClick={close} />
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <Link
          href="/newsletter"
          className="site-nav__cta site-nav__cta--overlay"
          onClick={close}
        >
          Get the newsletter
        </Link>
      </div>
    </nav>
  )
}

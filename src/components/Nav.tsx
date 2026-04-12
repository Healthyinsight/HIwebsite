'use client'

import Link from 'next/link'
import { createPortal } from 'react-dom'
import { useCallback, useEffect, useState } from 'react'

type NavChild = {
  href: string
  label: string
  external?: boolean
  comingSoon?: boolean
}

type NavItem = {
  label: string
  href: string
  children?: NavChild[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Trails',
    href: '/trails',
    children: [
      { href: '/trails/recovery', label: 'The Sleep Stack' },
      { href: '/trails/motion', label: 'Build Your Engine' },
      { href: '/trails/nutrition', label: 'Fuel the Machine', comingSoon: true },
      { href: '/trails/mindset', label: 'The Performance Mind', comingSoon: true },
    ],
  },
  {
    label: 'Health IQ',
    href: '/quiz',
  },
  {
    label: 'Articles',
    href: '/articles',
    children: [
      { href: '/articles', label: 'All Articles' },
      { href: '/motion', label: 'Motion' },
      { href: '/nutrition', label: 'Nutrition' },
      { href: '/recovery', label: 'Recovery' },
      { href: '/mindset', label: 'Mindset' },
    ],
  },
  {
    label: 'Protocols',
    href: '/protocols',
  },
  {
    label: 'Tools',
    href: '#',
    children: [
      { href: 'https://tracker.healthyinsight.eu/', label: 'Path Tracker', external: true },
      { href: '/waitlist', label: 'Challenges App', comingSoon: true },
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { href: '/about', label: 'About HI' },
      { href: '/about#method', label: 'How we work with evidence' },
      { href: '/about#sources', label: 'Sources & transparency' },
      { href: 'mailto:filipb@healthyinsight.eu', label: 'Contact' },
    ],
  },
]

function DropdownChild({ child, onClick }: { child: NavChild; onClick?: () => void }) {
  if (child.comingSoon) {
    return (
      <span className="site-nav__dropdown-disabled">
        {child.label}
        <span className="site-nav__badge">Soon</span>
      </span>
    )
  }
  if (child.external) {
    return (
      <a href={child.href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {child.label}
      </a>
    )
  }
  return (
    <Link href={child.href} onClick={onClick}>
      {child.label}
    </Link>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const close = useCallback(() => setOpen(false), [])
  const toggle = useCallback(() => setOpen(o => !o), [])

  useEffect(() => { setMounted(true) }, [])

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

  return (
    <>
      <nav className="site-nav" aria-label="Main">
        <div className="container site-nav__bar">
          <Link href="/" className="site-nav__brand">
            <span className="nav-brand-full">Healthy Insight</span>
            <span className="nav-brand-short">HI</span>
          </Link>

          <ul className="site-nav__links">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="site-nav__top">
                <Link
                  href={item.href}
                  style={item.label === 'Trails' ? { color: 'var(--blue-mid)', fontWeight: 600 } : undefined}
                >{item.label}</Link>
                {item.children && (
                  <div className="site-nav__dropdown" role="menu">
                    {item.children.map((child) => (
                      <DropdownChild key={child.label} child={child} />
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <Link href="/newsletter" className="site-nav__cta site-nav__cta--desktop">
            Newsletter
          </Link>

          <button
            type="button"
            className="site-nav__menu-btn"
            aria-expanded={open}
            aria-controls="nav-drawer"
            onClick={toggle}
          >
            <span className="site-nav__menu-icon" aria-hidden>
              <span /><span /><span />
            </span>
            Menu
          </button>
        </div>
      </nav>

      {mounted && createPortal(
        <>
          <div
            className={`site-nav__backdrop${open ? ' is-open' : ''}`}
            aria-hidden={!open}
            onClick={close}
          />

          <div
            id="nav-drawer"
            className={`site-nav__drawer${open ? ' is-open' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="site-nav__drawer-header">
              <Link href="/" className="site-nav__brand" onClick={close}>HI</Link>
              <button
                type="button"
                className="site-nav__drawer-close"
                aria-label="Close menu"
                onClick={close}
              >
                ✕
              </button>
            </div>

            <nav className="site-nav__drawer-nav" aria-label="Primary">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="site-nav__drawer-group">
                  <Link href={item.href} className="site-nav__drawer-group-title" onClick={close}>
                    {item.label}
                    {item.children && <span style={{ fontSize: '12px', color: '#c0c0b8' }}>›</span>}
                  </Link>
                  {item.children && (
                    <div className="site-nav__drawer-group-children">
                      {item.children.map((child) =>
                        child.comingSoon ? (
                          <span key={child.label}>
                            {child.label}
                            <span className="site-nav__badge">Soon</span>
                          </span>
                        ) : child.external ? (
                          <a key={child.href} href={child.href} target="_blank" rel="noopener noreferrer" onClick={close}>
                            {child.label}
                          </a>
                        ) : (
                          <Link key={child.href} href={child.href} onClick={close}>
                            {child.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <Link href="/newsletter" className="site-nav__cta site-nav__cta--drawer" onClick={close}
              style={{ display: 'block', textAlign: 'center', marginTop: '24px' }}>
              Get the newsletter
            </Link>
          </div>
        </>,
        document.body
      )}
    </>
  )
}

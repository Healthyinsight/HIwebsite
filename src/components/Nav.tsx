'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

const PRIMARY_LINKS = [
  { href: '/motion', label: 'Motion' },
  { href: '/nutrition', label: 'Nutrition' },
  { href: '/recovery', label: 'Recovery' },
  { href: '/mindset', label: 'Mindset' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/articles', label: 'Articles' },
  { href: '/protocols', label: 'Protocols' },
  { href: '/about', label: 'About' },
] as const

const SECONDARY_LINKS = [
  { href: '/about#method', label: 'How we work with evidence' },
  { href: '/about#sources', label: 'Sources & transparency' },
  { href: 'mailto:filipb@healthyinsight.eu', label: 'Contact' },
] as const

export default function Nav() {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])
  const toggle = useCallback(() => setOpen(o => !o), [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  return (
    <nav className="site-nav" aria-label="Main">
      <div className="container site-nav__bar">
        <Link href="/" className="site-nav__brand">
          <span className="nav-brand-full">Healthy Insight</span>
          <span className="nav-brand-short">HI</span>
        </Link>

        <ul className="site-nav__links">
          {PRIMARY_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
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
            <span />
            <span />
            <span />
          </span>
          Menu
        </button>
      </div>

      <div className="container site-nav__secondary site-nav__secondary--desktop">
        {SECONDARY_LINKS.map(({ href, label }) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </div>

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
        <Link href="/newsletter" className="site-nav__cta site-nav__cta--drawer" onClick={close}>
          Newsletter
        </Link>
        <nav className="site-nav__drawer-nav" aria-label="Primary">
          {PRIMARY_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} onClick={close}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="site-nav__drawer-secondary">
          {SECONDARY_LINKS.map(({ href, label }) => (
            <a key={href} href={href} onClick={close}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

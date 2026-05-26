'use client'

import { useEffect, useRef, useState } from 'react'

const NAV_LINKS = [
  { id: 'trails',     label: 'Trails' },
  { id: 'pillars',    label: 'Pillars' },
  { id: 'protocols',  label: 'Protocols' },
  { id: 'articles',   label: 'Articles' },
  { id: 'newsletter', label: 'Newsletter' },
]

export default function HomeScrollUI() {
  const [showNav, setShowNav] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const rafRef = useRef<number | null>(null)
  const prevScrollY = useRef(0)
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function onScroll() {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        const y = window.scrollY
        const scrollingDown = y > prevScrollY.current
        prevScrollY.current = y

        setShowTop(y > 700)

        if (y < 300) {
          setShowNav(false)
        } else if (scrollingDown) {
          setShowNav(false)
        } else {
          setShowNav(true)
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  function scrollToSection(id: string, e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({
      behavior: reducedMotion.current ? 'instant' : 'smooth',
      block: 'start',
    })
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: reducedMotion.current ? 'instant' : 'smooth' })
  }

  const transition = reducedMotion.current ? 'none' : 'transform 0.22s ease, opacity 0.22s ease'

  return (
    <>
      {/* Sticky mini-nav — sits at top: 0, overlays the main nav via z-index */}
      <nav
        aria-label="Page sections"
        aria-hidden={!showNav}
        className="home-sticky-nav"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 101,
          background: 'rgba(250,250,247,0.96)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(15,42,63,0.07)',
          paddingTop: 'env(safe-area-inset-top)',
          transition,
          transform: showNav ? 'translateY(0)' : 'translateY(-110%)',
          opacity: showNav ? 1 : 0,
          pointerEvents: showNav ? 'auto' : 'none',
        }}
      >
        <div style={{
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          overflowX: 'auto',
          paddingInline: 'clamp(16px,4vw,52px)',
        }}>
          {NAV_LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              tabIndex={showNav ? 0 : -1}
              onClick={(e) => scrollToSection(id, e)}
              style={{
                flexShrink: 0,
                padding: '0 16px',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--navy)',
                textDecoration: 'none',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                opacity: 0.72,
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Back-to-top */}
      {showTop && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: 'max(16px, env(safe-area-inset-bottom, 16px))',
            right: '20px',
            zIndex: 1001,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--navy)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '17px',
            lineHeight: 1,
            boxShadow: '0 2px 10px rgba(15,42,63,0.22)',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          ↑
        </button>
      )}
    </>
  )
}

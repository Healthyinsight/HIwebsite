'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * ArticleScrollUI — scroll progress bar + back-to-top button for article pages.
 *
 * Progress bar: updates via direct DOM mutation (barRef.current.style.width)
 * on every scroll tick so no React re-render is triggered per frame.
 *
 * Back-to-top: uses React state but is throttled to one RAF update per frame.
 */
export default function ArticleScrollUI() {
  const barRef = useRef<HTMLDivElement>(null)
  const [showTop, setShowTop] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    function onScroll() {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        const scrollY = window.scrollY
        const docH = document.documentElement.scrollHeight - window.innerHeight
        const pct = docH > 0 ? Math.min(100, (scrollY / docH) * 100) : 0
        if (barRef.current) barRef.current.style.width = `${pct}%`
        setShowTop(scrollY > 400)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Scroll progress bar — sits above the nav */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          zIndex: 1000,
          background: 'rgba(0,0,0,0.07)',
          pointerEvents: 'none',
        }}
      >
        <div
          ref={barRef}
          style={{
            height: '100%',
            width: '0%',
            background: 'var(--blue-mid)',
          }}
        />
      </div>

      {/* Back to top button */}
      {showTop && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '28px',
            right: '20px',
            zIndex: 400,
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'var(--navy)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            lineHeight: 1,
            boxShadow: '0 2px 12px rgba(15,42,63,0.22)',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          ↑
        </button>
      )}
    </>
  )
}

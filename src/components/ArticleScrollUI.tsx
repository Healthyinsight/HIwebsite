'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * ArticleScrollUI — bottom scroll progress bar + back-to-top button.
 *
 * Progress bar: fixed at the bottom of the viewport, above the iOS safe-area
 * inset. Width is updated via direct DOM mutation inside rAF so no React
 * re-render fires per scroll frame.
 *
 * Back-to-top button: appears after 400 px of scroll, sits above the bar
 * (accounts for safe-area + bar height so it's never obscured on notched
 * devices).
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
      {/*
        Bottom progress bar.
        The track sits at `bottom: env(safe-area-inset-bottom, 0px)` so it
        floats just above the iOS home-indicator / notch. On devices without
        a safe area this resolves to `bottom: 0`.
      */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          bottom: 'env(safe-area-inset-bottom, 0px)',
          left: 0,
          right: 0,
          height: '3px',
          zIndex: 1000,
          background: 'rgba(15,42,63,0.08)',
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

      {/*
        Back-to-top button.
        `bottom` = safe-area + 3px bar + 14px gap so the button never
        overlaps the bar or the iOS home indicator.
      */}
      {showTop && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: 'calc(env(safe-area-inset-bottom, 0px) + 3px + 14px)',
            right: '20px',
            zIndex: 1001,
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

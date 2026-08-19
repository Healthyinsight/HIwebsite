'use client'

import { useEffect, useState } from 'react'

/**
 * Back-to-top control for the long listing pages.
 *
 * /articles measured 11,872px on a 390px viewport and /protocols 11,167px,
 * about 14 screens each, with no sticky element and no way back up.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 1200)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        right: 'max(16px, env(safe-area-inset-right))',
        bottom: 'max(16px, env(safe-area-inset-bottom))',
        zIndex: 60,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: '1px solid var(--sand)',
        background: 'var(--navy)',
        color: 'white',
        fontSize: '16px',
        lineHeight: 1,
        cursor: 'pointer',
        boxShadow: '0 4px 14px rgba(15,42,63,0.22)',
      }}
    >
      <span aria-hidden>↑</span>
    </button>
  )
}

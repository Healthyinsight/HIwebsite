'use client'
import { useRef, useEffect } from 'react'
import HeroLogoAnimation from './HeroLogoAnimation'

export default function HeroAnimation() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Smooth lerp mouse parallax — moves the whole logo subtly with the cursor
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf: number
    let tx = 0, ty = 0, cx = 0, cy = 0

    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 20
      ty = (e.clientY / window.innerHeight - 0.5) * 12
    }

    const tick = () => {
      cx += (tx - cx) * 0.055
      cy += (ty - cy) * 0.055
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      style={{
        width: '100%',
        maxWidth: '420px',
        aspectRatio: '1',
        position: 'relative',
        willChange: 'transform',
      }}
    >
      <HeroLogoAnimation />
    </div>
  )
}

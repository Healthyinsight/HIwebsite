'use client'
import { useRef, useEffect, useState } from 'react'
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas'
import HeroLogoAnimation from './HeroLogoAnimation'

export default function HeroAnimation() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [riveReady, setRiveReady] = useState(false)
  const [riveError, setRiveError] = useState(false)

  // ── Smooth lerp mouse parallax (unchanged) ──────────────────────────────
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
      if (wrapperRef.current)
        wrapperRef.current.style.transform = `translate(${cx.toFixed(2)}px,${cy.toFixed(2)}px)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  // ── Rive canvas ─────────────────────────────────────────────────────────
  // Expects /public/animations/hi-hero.riv with an animation named "HeroAnim".
  // Falls back to HeroLogoAnimation (CSS) while loading or on any load error.
  const { RiveComponent } = useRive({
    src: '/animations/hi-hero.riv',
    animations: 'HeroAnim',
    autoplay: true,
    onLoad: () => setRiveReady(true),
    onLoadError: () => setRiveError(true),
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  })

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
      {/* CSS fallback — fades out once Rive has loaded */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: riveReady ? 0 : 1,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
      >
        <HeroLogoAnimation />
      </div>

      {/* Rive canvas — fades in on load; not rendered on error */}
      {!riveError && (
        <RiveComponent
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: riveReady ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      )}
    </div>
  )
}

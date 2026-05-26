'use client'
import { useRef, useEffect, useState } from 'react'
import { useRive } from '@rive-app/react-canvas'
import HeroOrb from './HeroOrb'

export default function HeroAnimation() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [riveError, setRiveError] = useState(false)

  const { RiveComponent, rive } = useRive({
    src: '/animations/hi-hero.riv',
    stateMachines: 'HeroSM',
    autoplay: true,
    onLoadError: () => setRiveError(true),
  })

  const riveReady = !!rive && !riveError

  // Smooth lerp mouse parallax — moves the whole orb subtly with the cursor
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

  // Feed cursor position into Rive state machine inputs when .riv is loaded
  useEffect(() => {
    if (!rive || riveError) return
    const onMove = (e: MouseEvent) => {
      const inputs = rive.stateMachineInputs('HeroSM')
      if (!inputs) return
      const mx = e.clientX / window.innerWidth
      const my = e.clientY / window.innerHeight
      const xInput = inputs.find(i => i.name === 'mouseX')
      const yInput = inputs.find(i => i.name === 'mouseY')
      if (xInput) xInput.value = mx
      if (yInput) yInput.value = my
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [rive, riveError])

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
      {/* CSS animated orb — always visible, fades out if Rive loads successfully */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: riveReady ? 0 : 1,
        transition: 'opacity 0.7s ease',
        pointerEvents: riveReady ? 'none' : 'auto',
      }}>
        <HeroOrb />
      </div>

      {/* Rive canvas — invisible until the .riv file loads; safe no-op until then */}
      {!riveError && (
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: riveReady ? 1 : 0,
          transition: 'opacity 0.7s ease',
        }}>
          <RiveComponent style={{ width: '100%', height: '100%' }} />
        </div>
      )}
    </div>
  )
}

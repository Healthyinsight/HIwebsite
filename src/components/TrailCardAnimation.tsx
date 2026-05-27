'use client'
import { useEffect, useState } from 'react'
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas'
import Image from 'next/image'

// Trail theme names — passed as prop from TrailCard
export type TrailTheme = 'sleep' | 'vo2max' | 'strength' | 'nutrition' | 'mindset'

// These integers are the exact values Filip maps in the Rive editor
// (Number input named "theme" inside State Machine "TrailSM")
const THEME_INDEX: Record<TrailTheme, number> = {
  sleep:     0,
  vo2max:    1,
  strength:  2,
  nutrition: 3,
  mindset:   4,
}

// CSS-filter fallback — matches the hue-rotation approach from TrailCard
const FALLBACK_FILTER: Record<TrailTheme, string> = {
  sleep:     'hue-rotate(-20deg) saturate(0.9)  brightness(0.85)',
  vo2max:    'hue-rotate(-70deg) saturate(1.5)  brightness(0.85)',
  strength:  'hue-rotate(-70deg) saturate(1.5)  brightness(0.85)',
  nutrition: 'hue-rotate(175deg) saturate(1.8)  brightness(0.85)',
  mindset:   'hue-rotate(60deg)  saturate(1.4)  brightness(0.85)',
}

interface TrailCardAnimationProps {
  theme: TrailTheme
  size?: number
}

export default function TrailCardAnimation({ theme, size = 112 }: TrailCardAnimationProps) {
  const [riveReady, setRiveReady] = useState(false)
  const [riveError, setRiveError] = useState(false)

  // Expects /public/animations/hi-trail.riv
  // State Machine "TrailSM", Number input "theme" (0–4)
  const { RiveComponent, rive } = useRive({
    src: '/animations/hi-trail.riv',
    stateMachines: 'TrailSM',
    autoplay: true,
    onLoad: () => setRiveReady(true),
    onLoadError: () => setRiveError(true),
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  })

  // Drive the theme Number input whenever the prop changes
  const themeInput = useStateMachineInput(rive, 'TrailSM', 'theme')
  useEffect(() => {
    if (themeInput != null) themeInput.value = THEME_INDEX[theme]
  }, [theme, themeInput])

  const fallback = (
    <Image
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        opacity: 0.22,
        filter: FALLBACK_FILTER[theme],
        pointerEvents: 'none',
        userSelect: 'none',
        transform: 'rotate(6deg)',
      }}
    />
  )

  // Permanent fallback when .riv file is missing or fails to load
  if (riveError) return fallback

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* Logo watermark while Rive loads */}
      {!riveReady && (
        <div style={{ position: 'absolute', inset: 0 }}>{fallback}</div>
      )}
      <RiveComponent
        style={{
          width: size,
          height: size,
          opacity: riveReady ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  )
}

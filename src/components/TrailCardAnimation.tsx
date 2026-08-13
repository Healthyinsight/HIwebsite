import Image from 'next/image'

// Trail theme names — passed as prop from TrailCard
export type TrailTheme = 'sleep' | 'vo2max' | 'strength' | 'nutrition' | 'mindset'

// Per-theme hue-rotation of the logo watermark
const THEME_FILTER: Record<TrailTheme, string> = {
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
  return (
    <Image
      src="/logo.png"
      alt=""
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        opacity: 0.22,
        filter: THEME_FILTER[theme],
        pointerEvents: 'none',
        userSelect: 'none',
        transform: 'rotate(6deg)',
      }}
    />
  )
}

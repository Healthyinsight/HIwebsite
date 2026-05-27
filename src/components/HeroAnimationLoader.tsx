'use client'
import dynamic from 'next/dynamic'

// Must live in a Client Component — `ssr: false` is not allowed in Server Components.
const HeroAnimation = dynamic(() => import('./HeroAnimation'), {
  ssr: false,
  loading: () => (
    <div
      style={{ width: '100%', maxWidth: '420px', aspectRatio: '1' }}
      aria-hidden="true"
    />
  ),
})

export default HeroAnimation

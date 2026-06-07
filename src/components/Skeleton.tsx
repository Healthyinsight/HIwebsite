import type { CSSProperties, ReactElement } from 'react'

const SHIMMER_STYLE = `
@keyframes hi-shimmer {
  0%   { background-position: -800px 0; }
  100% { background-position: 800px 0; }
}
.hi-skeleton {
  background-color: #E8E2D8;
  background-image: linear-gradient(
    90deg,
    #E8E2D8 25%,
    #F2EDE8 50%,
    #E8E2D8 75%
  );
  background-size: 800px 100%;
  animation: hi-shimmer 1.5s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .hi-skeleton {
    animation: none !important;
    background-image: none !important;
  }
}
`

interface SkeletonBlockProps {
  width?: string | number
  height?: string | number
  borderRadius?: string
  style?: CSSProperties
}

interface SkeletonLineProps {
  width?: string | number
  height?: string | number
  style?: CSSProperties
}

interface ArticleCardSkeletonProps {
  large?: boolean
}

interface SkeletonGroupProps {
  count: number
  children: ReactElement
  gap?: string
}

export function SkeletonBlock({ width = '100%', height = '80px', borderRadius = '8px', style }: SkeletonBlockProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SHIMMER_STYLE }} />
      <div
        className="hi-skeleton"
        style={{ width, height, borderRadius, ...style }}
        aria-hidden="true"
      />
    </>
  )
}

export function SkeletonLine({ width = '100%', height = '14px', style }: SkeletonLineProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SHIMMER_STYLE }} />
      <div
        className="hi-skeleton"
        style={{ width, height, borderRadius: '4px', ...style }}
        aria-hidden="true"
      />
    </>
  )
}

export function SkeletonCircle({ size = '40px' }: { size?: string }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SHIMMER_STYLE }} />
      <div
        className="hi-skeleton"
        style={{ width: size, height: size, borderRadius: '50%', flexShrink: 0 }}
        aria-hidden="true"
      />
    </>
  )
}

export function ArticleCardSkeleton({ large = false }: ArticleCardSkeletonProps) {
  const aspectHeight = large ? '180px' : '130px'
  return (
    <div
      style={{
        borderRadius: '22px',
        overflow: 'hidden',
        border: '1px solid rgba(15,42,63,0.06)',
        background: '#FAFAF7',
        display: 'flex',
        flexDirection: 'column',
      }}
      aria-hidden="true"
      role="presentation"
    >
      <style dangerouslySetInnerHTML={{ __html: SHIMMER_STYLE }} />
      <div className="hi-skeleton" style={{ height: aspectHeight, borderRadius: 0 }} />
      <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className="hi-skeleton" style={{ height: '18px', width: '75%', borderRadius: '4px' }} />
        <div className="hi-skeleton" style={{ height: '14px', borderRadius: '4px' }} />
        <div className="hi-skeleton" style={{ height: '14px', width: '88%', borderRadius: '4px' }} />
        <div className="hi-skeleton" style={{ height: '13px', width: '35%', borderRadius: '4px', marginTop: '8px' }} />
      </div>
    </div>
  )
}

export function SkeletonGroup({ count, children, gap = '20px' }: SkeletonGroupProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{children}</div>
      ))}
    </div>
  )
}

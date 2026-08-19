import Link from 'next/link'
import type { CSSProperties } from 'react'

type HeadingLevel = 'h1' | 'h2' | 'h3'
type HeaderSize = 'sm' | 'md' | 'lg'
type HeaderAlign = 'left' | 'center'

interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  cta?: { href: string; label: string }
  align?: HeaderAlign
  headingLevel?: HeadingLevel
  size?: HeaderSize
  marginBottom?: string
}

const SIZE_FONT: Record<HeaderSize, string> = {
  sm: 'clamp(1.25rem, 3.5vw, 1.625rem)',
  md: 'clamp(1.75rem, 6vw, 2.25rem)',
  lg: 'clamp(2rem, 7vw, 2.75rem)',
}

const SIZE_TRACKING: Record<HeaderSize, string> = {
  sm: '-0.2px',
  md: '-0.4px',
  lg: '-0.6px',
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  cta,
  align = 'left',
  headingLevel: Tag = 'h2',
  size = 'md',
  marginBottom = '48px',
}: SectionHeaderProps) {
  const isCentered = align === 'center'

  const containerStyle: CSSProperties = {
    marginBottom,
    textAlign: isCentered ? 'center' : 'left',
  }

  const labelRowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
    justifyContent: isCentered ? 'center' : 'flex-start',
  }

  const labelStyle: CSSProperties = {
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'var(--blue-mid)',
    flexShrink: 0,
  }

  const lineStyle: CSSProperties = {
    flex: 1,
    height: '1px',
    background: 'var(--sand)',
    display: isCentered ? 'none' : 'block',
  }

  const headingStyle: CSSProperties = {
    fontFamily: 'var(--font-serif), Georgia, serif',
    fontWeight: 400,
    color: 'var(--navy)',
    letterSpacing: SIZE_TRACKING[size],
    fontSize: SIZE_FONT[size],
    lineHeight: 1.15,
    margin: 0,
    marginBottom: subtitle || cta ? '14px' : 0,
  }

  const subtitleStyle: CSSProperties = {
    fontSize: '15px',
    color: '#444440',
    fontWeight: 300,
    lineHeight: 1.7,
    margin: 0,
    marginBottom: cta ? '14px' : 0,
    maxWidth: isCentered ? '560px' : undefined,
    marginInline: isCentered ? 'auto' : undefined,
  }

  const ctaStyle: CSSProperties = {
    fontSize: '14px',
    color: 'var(--navy)',
    fontWeight: 500,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  }

  return (
    <div style={containerStyle}>
      <div style={labelRowStyle}>
        <span style={labelStyle}>{label}</span>
        <div style={lineStyle} />
        {cta && !isCentered && (
          <Link href={cta.href} style={ctaStyle}>
            {cta.label} →
          </Link>
        )}
      </div>

      <Tag style={headingStyle}>{title}</Tag>

      {subtitle && <p style={subtitleStyle}>{subtitle}</p>}

      {cta && isCentered && (
        <Link href={cta.href} style={{ ...ctaStyle, marginTop: '8px' }}>
          {cta.label} →
        </Link>
      )}
    </div>
  )
}

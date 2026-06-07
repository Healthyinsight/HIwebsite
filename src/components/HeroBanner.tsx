import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

interface HeroBannerCta {
  href: string
  label: string
}

interface HeroBannerProps {
  gradient: string
  title: string
  subtitle?: string
  eyebrow?: string
  cta?: HeroBannerCta
  align?: 'left' | 'center'
  minHeight?: string
  children?: ReactNode
}

export default function HeroBanner({
  gradient,
  title,
  subtitle,
  eyebrow,
  cta,
  align = 'left',
  minHeight,
  children,
}: HeroBannerProps) {
  const isCentered = align === 'center'

  const sectionStyle: CSSProperties = {
    background: gradient,
    paddingBlock: 'clamp(48px, 10vw, 84px)',
    paddingInline: 'clamp(16px, 4vw, 52px)',
    minHeight,
  }

  const innerStyle: CSSProperties = {
    width: '100%',
    maxWidth: '1180px',
    marginInline: 'auto',
    textAlign: isCentered ? 'center' : 'left',
  }

  const eyebrowStyle: CSSProperties = {
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'var(--blue-pale)',
    marginBottom: '20px',
    opacity: 0.8,
    display: 'block',
  }

  const titleStyle: CSSProperties = {
    fontFamily: 'DM Serif Display, serif',
    fontWeight: 400,
    color: 'white',
    letterSpacing: '-0.8px',
    lineHeight: 1.08,
    fontSize: 'clamp(2rem, 8vw, 3.25rem)',
    overflowWrap: 'break-word',
    margin: 0,
    marginBottom: subtitle || cta || children ? '20px' : 0,
  }

  const subtitleStyle: CSSProperties = {
    fontSize: 'clamp(15px, 2.5vw, 18px)',
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 1.7,
    maxWidth: isCentered ? '600px' : '520px',
    fontWeight: 300,
    margin: 0,
    marginBottom: cta || children ? '28px' : 0,
    marginInline: isCentered ? 'auto' : undefined,
  }

  const ctaStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.28)',
    borderRadius: '100px',
    padding: '11px 26px',
    color: 'white',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: 'DM Sans, sans-serif',
    textDecoration: 'none',
    transition: 'background 0.15s ease',
  }

  return (
    <section style={sectionStyle}>
      <div style={innerStyle}>
        {eyebrow && <span style={eyebrowStyle}>{eyebrow}</span>}

        <h1 style={titleStyle}>{title}</h1>

        {subtitle && <p style={subtitleStyle}>{subtitle}</p>}

        {cta && (
          <Link href={cta.href} style={ctaStyle}>
            {cta.label}
          </Link>
        )}

        {children}
      </div>
    </section>
  )
}

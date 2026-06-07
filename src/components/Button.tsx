'use client'

import { useState, type CSSProperties, type ButtonHTMLAttributes, type ReactNode } from 'react'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  href?: string
  onClick?: () => void
  fullWidth?: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  children: ReactNode
  className?: string
  style?: CSSProperties
  'aria-label'?: string
}

const SPINNER_CSS = `
@keyframes hi-btn-spin { to { transform: rotate(360deg); } }
`

const BASE: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  borderRadius: '100px',
  fontFamily: 'DM Sans, sans-serif',
  fontWeight: 500,
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'opacity 0.15s ease, transform 0.15s ease, background 0.15s ease',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  border: 'none',
}

type VariantStyle = { background: string; color: string; border: string }

const VARIANT_STYLES: Record<ButtonVariant, VariantStyle> = {
  primary:   { background: 'var(--navy)',        color: 'white',          border: 'none' },
  secondary: { background: 'var(--cream)',       color: 'var(--navy)',    border: '1.5px solid var(--navy)' },
  ghost:     { background: 'transparent',        color: 'var(--navy)',    border: '1.5px solid rgba(15,42,63,0.3)' },
  link:      { background: 'transparent',        color: 'var(--blue-mid)', border: 'none' },
}

type SizeStyle = { fontSize: string; padding: string; minHeight: string }

const SIZE_STYLES: Record<ButtonSize, SizeStyle> = {
  sm: { fontSize: '12px', padding: '0 16px', minHeight: '32px' },
  md: { fontSize: '14px', padding: '0 22px', minHeight: '40px' },
  lg: { fontSize: '15px', padding: '0 28px', minHeight: '48px' },
}

function Spinner({ color }: { color: string }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SPINNER_CSS }} />
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        style={{ animation: 'hi-btn-spin 0.7s linear infinite', flexShrink: 0 }}
        aria-hidden="true"
      >
        <circle
          cx="7.5"
          cy="7.5"
          r="5.5"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="22 12"
        />
      </svg>
    </>
  )
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  href,
  onClick,
  fullWidth = false,
  type = 'button',
  children,
  className,
  style: styleProp,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)

  const isDisabled = disabled || loading
  const variantStyle = VARIANT_STYLES[variant]
  const sizeStyle = SIZE_STYLES[size]

  const hoverOverlay: CSSProperties =
    hovered && !isDisabled
      ? variant === 'primary'
        ? { opacity: 0.88, transform: 'translateY(-1px)' }
        : { background: 'rgba(15,42,63,0.05)' }
      : {}

  const focusOverlay: CSSProperties = focused
    ? { outline: '2px solid var(--blue-mid)', outlineOffset: '3px' }
    : { outline: 'none' }

  const composed: CSSProperties = {
    ...BASE,
    ...variantStyle,
    ...sizeStyle,
    width: fullWidth ? '100%' : undefined,
    opacity: isDisabled ? 0.45 : 1,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    pointerEvents: isDisabled ? 'none' : 'auto',
    textDecoration: variant === 'link' && hovered ? 'underline' : 'none',
    ...hoverOverlay,
    ...focusOverlay,
    ...styleProp,
  }

  const interactions = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  }

  const spinnerColor = variant === 'primary' ? 'rgba(255,255,255,0.8)' : 'var(--navy)'

  const content = (
    <>
      {loading && <Spinner color={spinnerColor} />}
      {children}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        style={composed}
        className={className}
        aria-label={ariaLabel}
        aria-disabled={isDisabled || undefined}
        {...interactions}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      style={composed}
      className={className}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      aria-disabled={isDisabled || undefined}
      {...interactions}
    >
      {content}
    </button>
  )
}

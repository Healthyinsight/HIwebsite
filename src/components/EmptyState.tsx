'use client'

import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

type EmptyStateSize = 'sm' | 'md' | 'lg'

interface EmptyStateAction {
  label: string
  href?: string
  onClick?: () => void
}

interface EmptyStateProps {
  heading: string
  message?: string
  action?: EmptyStateAction
  icon?: ReactNode
  size?: EmptyStateSize
}

const SIZE_PADDING: Record<EmptyStateSize, string> = {
  sm: 'clamp(28px, 6vw, 40px) 0',
  md: 'clamp(40px, 8vw, 72px) 0',
  lg: 'clamp(60px, 12vw, 120px) 0',
}

const SIZE_HEADING: Record<EmptyStateSize, string> = {
  sm: '18px',
  md: '22px',
  lg: '26px',
}

export default function EmptyState({
  heading,
  message,
  action,
  icon,
  size = 'md',
}: EmptyStateProps) {
  const wrapStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: SIZE_PADDING[size],
    gap: '12px',
  }

  const iconWrapStyle: CSSProperties = {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    background: 'var(--sand)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    marginBottom: '4px',
    flexShrink: 0,
  }

  const headingStyle: CSSProperties = {
    fontFamily: 'DM Serif Display, serif',
    fontWeight: 400,
    color: 'var(--navy)',
    fontSize: SIZE_HEADING[size],
    margin: 0,
    lineHeight: 1.25,
  }

  const messageStyle: CSSProperties = {
    fontSize: '14px',
    color: '#8A8A80',
    fontWeight: 300,
    lineHeight: 1.6,
    margin: 0,
    maxWidth: '340px',
  }

  const btnStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--navy)',
    color: 'white',
    border: 'none',
    borderRadius: '100px',
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'DM Sans, sans-serif',
    textDecoration: 'none',
    marginTop: '4px',
  }

  return (
    <div style={wrapStyle} role="status" aria-live="polite">
      {icon && <div style={iconWrapStyle}>{icon}</div>}

      <h3 style={headingStyle}>{heading}</h3>

      {message && <p style={messageStyle}>{message}</p>}

      {action && (
        action.href ? (
          <Link href={action.href} style={btnStyle}>
            {action.label}
          </Link>
        ) : action.onClick ? (
          <button type="button" onClick={action.onClick} style={btnStyle}>
            {action.label}
          </button>
        ) : null
      )}
    </div>
  )
}

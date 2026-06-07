import type { CSSProperties } from 'react'

type BadgeVariant = 'pillar' | 'format' | 'level' | 'neutral'
type BadgeSize = 'sm' | 'md'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
  size?: BadgeSize
  color?: string
  bg?: string
}

const PILLAR_STYLES: Record<string, { bg: string; color: string }> = {
  motion:    { bg: 'rgba(37,53,39,0.13)',  color: '#253527' },
  recovery:  { bg: 'rgba(15,42,63,0.11)',  color: 'var(--navy)' },
  nutrition: { bg: 'rgba(26,77,110,0.11)', color: 'var(--blue)' },
  mindset:   { bg: 'rgba(10,31,46,0.12)',  color: 'var(--navy)' },
}

const FORMAT_STYLES: Record<string, { bg: string; color: string; border?: string }> = {
  'guide':     { bg: 'var(--sky)',  color: 'var(--blue-mid)' },
  'protocol':  { bg: '#E4EEF5',    color: 'var(--navy)' },
  'myth-bust': { bg: '#FEF3E2',    color: '#7A4F00' },
  'review':    { bg: 'var(--warm)', color: '#444440', border: '1px solid var(--sand)' },
  'checklist': { bg: '#F0EEF8',    color: '#4A3A7A' },
}

const LEVEL_STYLES: Record<number, { bg: string; color: string }> = {
  1: { bg: 'var(--sky)',  color: 'var(--blue-mid)' },
  2: { bg: '#D4EAE0',    color: '#1A5A3A' },
  3: { bg: '#FFF0D0',    color: '#7A5A00' },
  4: { bg: '#FFE0D0',    color: '#7A3A1A' },
  5: { bg: '#F0D0F0',    color: '#5A1A5A' },
}

const SIZE_STYLES: Record<BadgeSize, { fontSize: string; padding: string; letterSpacing: string }> = {
  sm: { fontSize: '10px', padding: '4px 10px',  letterSpacing: '0.8px' },
  md: { fontSize: '11px', padding: '5px 14px',  letterSpacing: '1.2px' },
}

function resolveColors(
  variant: BadgeVariant,
  label: string,
  colorOverride?: string,
  bgOverride?: string,
): { bg: string; color: string; border?: string } {
  if (bgOverride || colorOverride) {
    return { bg: bgOverride ?? 'var(--sand)', color: colorOverride ?? '#444440' }
  }

  if (variant === 'pillar') {
    const key = label.toLowerCase().split('·')[0].trim()
    return PILLAR_STYLES[key] ?? { bg: 'var(--sand)', color: '#444440' }
  }

  if (variant === 'format') {
    const key = label.toLowerCase().replace(/\s+/g, '-')
    return FORMAT_STYLES[key] ?? { bg: 'var(--sand)', color: '#444440' }
  }

  if (variant === 'level') {
    const num = parseInt(label.replace(/\D/g, ''), 10)
    return LEVEL_STYLES[num] ?? { bg: 'var(--sand)', color: '#444440' }
  }

  return { bg: 'var(--sand)', color: '#444440' }
}

export default function Badge({
  label,
  variant = 'neutral',
  size = 'md',
  color,
  bg,
}: BadgeProps) {
  const { bg: resolvedBg, color: resolvedColor, border } = resolveColors(variant, label, color, bg)
  const { fontSize, padding, letterSpacing } = SIZE_STYLES[size]

  const style: CSSProperties = {
    background: resolvedBg,
    color: resolvedColor,
    border: border ?? 'none',
    borderRadius: '100px',
    padding,
    fontSize,
    fontWeight: 500,
    letterSpacing,
    textTransform: 'uppercase',
    lineHeight: 1,
    display: 'inline-block',
    whiteSpace: 'nowrap',
  }

  return <span style={style}>{label}</span>
}

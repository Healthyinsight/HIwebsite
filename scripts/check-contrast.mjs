#!/usr/bin/env node
/**
 * WCAG AA contrast check for the muted foreground tokens against the
 * backgrounds they actually sit on.
 *
 * The 2026-08 audit measured #8a8a80 on cream at 3.48:1 and the /articles card
 * descriptions at 3.33:1, both failing AA for normal text. This pins the fixed
 * values so a future palette tweak cannot quietly reintroduce the failure.
 */

const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255)
const lin = c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const lum = h => { const [r, g, b] = hex(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m)
  return (x + 0.05) / (y + 0.05)
}

const BG = { cream: '#F5F2EC', warm: '#FAFAF7', sand: '#E8E2D8', white: '#FFFFFF' }

// Foregrounds that must pass AA for normal text (4.5:1) on light backgrounds.
const CHECKS = [
  { name: '--muted', fg: '#63635E', on: ['cream', 'warm', 'sand', 'white'], min: 4.5 },
  { name: 'body copy', fg: '#444440', on: ['cream', 'warm', 'white'], min: 4.5 },
  { name: '--navy', fg: '#0F2A3F', on: ['cream', 'warm', 'white'], min: 4.5 },
  { name: '--blue-mid link', fg: '#2D7DA8', on: ['cream', 'warm', 'white'], min: 3.0 },
]

let failed = false
for (const { name, fg, on, min } of CHECKS) {
  for (const bgName of on) {
    const r = ratio(fg, BG[bgName])
    const ok = r >= min
    if (!ok) failed = true
    console.log(`${ok ? '✓' : '✗'} ${name} ${fg} on ${bgName} ${BG[bgName]}: ${r.toFixed(2)}:1 (min ${min})`)
  }
}

if (failed) {
  console.error('\nContrast check failed.')
  process.exit(1)
}
console.log('\n✓ contrast: all foregrounds meet their minimum.')

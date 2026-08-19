/**
 * The design tokens the site actually renders.
 *
 * These mirror the custom properties in src/styles/globals.css, which remain
 * the runtime source of truth for CSS. This file exists so the values are
 * importable from TypeScript (the OG image generator needs real hex values, not
 * var() references, because it renders outside the browser) and so there is one
 * documented list rather than hex literals scattered through components.
 *
 * A note on L1 of the 2026-08 audit, which asked for this file on the premise
 * that the written brand spec was stale, specifying teal/sage/lime with
 * Merriweather and Inter. That premise does not hold. The Notion Visual Design
 * Guide was updated in May 2026 and already matches the code: Navy #0F2A3F,
 * Blue #1A4D6E, Sky #D4EAF5, Cream #F5F2EC, Warm #FAFAF7, Sand #E8E2D8, with DM
 * Serif Display for headings and DM Sans for body.
 *
 * Teal is not stale, it is a different product. The same guide assigns Path by
 * HI (the app) a dark theme with a teal accent, distinct from this blue-and-light
 * web palette. The teal/sage/lime and Merriweather/Inter combination survives
 * only in some HI Claude skill descriptions, which is where the correction is
 * still needed. See TODO-path-tracker.md for the related naming question.
 *
 * Nothing here changes the design. It records it.
 */

export const colors = {
  navy: '#0F2A3F',
  blue: '#1A4D6E',
  blueMid: '#2D7DA8',
  blueLight: '#5095AC',
  bluePale: '#A8CCE0',
  sky: '#D4EAF5',
  cream: '#F5F2EC',
  warm: '#FAFAF7',
  sand: '#E8E2D8',
  /** Muted foreground. Darkened in M1 to clear WCAG AA on all light grounds. */
  muted: '#63635E',
  /** Body copy on light backgrounds. */
  body: '#444440',
  /** Headings on light backgrounds where navy would be too heavy. */
  ink: '#1A1A17',
} as const

export const fonts = {
  /** Headings. Loaded via next/font, exposed as --font-serif. */
  serif: 'var(--font-serif), Georgia, serif',
  /** Body. Loaded via next/font, exposed as --font-sans. */
  sans: 'var(--font-sans), system-ui, sans-serif',
} as const

/** Breakpoints, matching the media queries in globals.css. */
export const breakpoints = {
  /** Below this the nav collapses and listings switch to the compact layout. */
  mobile: 640,
  /** Above this the hero rebalances its two columns. */
  wide: 1100,
  /** Container max width. */
  container: 1180,
} as const

export type ColorToken = keyof typeof colors

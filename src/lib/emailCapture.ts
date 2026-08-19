/**
 * One list, one promise. Every email capture on the site posts to
 * /api/subscribe with a source tag and shows the same promise line, so the
 * offer reads identically at every entry point.
 */
export const EMAIL_PROMISE = 'No spam. Unsubscribe any time. We never share your data.'

/** Entry point tags. Kept in sync with SUBSCRIBE_SOURCES in /api/subscribe. */
export const EMAIL_SOURCES = {
  newsletter: 'newsletter',
  trackerWaitlist: 'tracker_waitlist',
  programsWaitlist: 'programs_waitlist',
  trailUnlock: 'trail_unlock',
  quiz: 'quiz',
} as const

/** Visually hidden but available to screen readers and voice control. */
export const VISUALLY_HIDDEN = {
  position: 'absolute' as const,
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden' as const,
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap' as const,
  border: 0,
}

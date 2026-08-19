/**
 * What the LEVEL 1 to LEVEL 5 badges mean.
 *
 * The badges appeared on articles, /articles and /protocols with no legend
 * anywhere on the site, so a reader had no way to tell whether Level 5 meant
 * harder, later in a trail, or more advanced evidence. It means depth.
 */
export const LEVEL_LABELS: Record<number, string> = {
  1: 'Start here',
  2: 'Building on the basics',
  3: 'Applied practice',
  4: 'Advanced',
  5: 'Deep dive',
}

export const LEVEL_DESCRIPTIONS: Record<number, string> = {
  1: 'No prior knowledge assumed. Start here.',
  2: 'Assumes the fundamentals. Builds on Level 1.',
  3: 'Applied practice, for readers already training consistently.',
  4: 'Advanced. Assumes comfort with the underlying mechanisms.',
  5: 'Deep dive into the primary literature.',
}

/** One-line summary of the scale, for legends on listing pages. */
export const LEVEL_SCALE_SUMMARY =
  'Levels run 1 to 5 by depth, not difficulty. Level 1 assumes no prior knowledge; Level 5 goes into the primary literature.'

export function levelLabel(level: number): string {
  return LEVEL_LABELS[level] ?? `Level ${level}`
}

export function levelDescription(level: number): string {
  return LEVEL_DESCRIPTIONS[level] ?? ''
}

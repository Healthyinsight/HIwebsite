#!/usr/bin/env node
/**
 * Fails the build when an article makes a research claim it does not cite.
 *
 *   node scripts/check-citations.mjs
 *
 * An article body that contains a numeric or study claim (a percentage, or a
 * word like "study" / "meta-analys" / "research shows" / "evidence suggests")
 * must have a non-empty `sources` array in hi-sources.json. This is what keeps
 * the promises on /about ("every claim links to research"), /newsletter
 * ("sources always linked") and /articles ("every claim cited") true.
 *
 * Also enforces, so it cannot rot silently:
 *   - every <Cite id="..." /> marker resolves to a source on that article
 *
 * The em-dash and product-name rules live in scripts/check-copy.mjs.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_DIR = path.join(ROOT, 'content', 'articles')

/**
 * Articles that already shipped with a research claim and no sources.
 *
 * This list is a backlog, not a policy. It exists so the rule can be enforced
 * on every new article from today without leaving the build red. Each entry
 * needs sources attached in Notion ("Sources Cited" on the Articles DB),
 * followed by `npm run sync:sources`. Removing the last entry should also
 * remove this list. Nothing may be added here.
 */
const UNCITED_BACKLOG = new Set([
  'advanced-fueling-glucose-fructose-gut-training',
  'advanced-strength-programming-blocks-fatigue-deloads',
  'fuel-during-training',
  'group-training-run-clubs-science',
  'progressive-overload-science-based-methods',
  'race-day-nutrition',
  'strength-for-runners',
  'vo2max-training-advanced-protocols',
  'zone-2-reality-check',
])

const CLAIM_PATTERNS = [
  { name: 'percentage', re: /\d+(?:[.,]\d+)?\s?%/ },
  { name: '"study"', re: /\bstudies\b|\bstudy\b/i },
  { name: '"meta-analys"', re: /meta-analys/i },
  { name: '"research shows"', re: /research (?:shows|show|demonstrates|consistently)/i },
  { name: '"evidence suggests"', re: /evidence (?:suggests|shows|indicates)/i },
]

const sourcesFile = JSON.parse(fs.readFileSync(path.join(ROOT, 'hi-sources.json'), 'utf8'))
const sourceIdsBySlug = new Map(sourcesFile.articles.map(a => [a.slug, new Set(a.source_ids)]))
const library = sourcesFile.sources

const uncited = []
const knownUncited = []
const badMarkers = []
const staleBacklog = []

for (const file of fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx')).sort()) {
  const slug = file.replace(/\.mdx$/, '')
  const body = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')
  const ids = sourceIdsBySlug.get(slug) ?? new Set()

  // Ignore the markup of the markers themselves when looking for claims.
  const prose = body.replace(/<Cite\s+id="[^"]*"\s*\/>/g, '')

  const triggered = CLAIM_PATTERNS.filter(p => p.re.test(prose)).map(p => p.name)
  if (triggered.length > 0 && ids.size === 0) {
    (UNCITED_BACKLOG.has(slug) ? knownUncited : uncited).push({ slug, triggered })
  } else if (UNCITED_BACKLOG.has(slug)) {
    staleBacklog.push(slug)
  }

  for (const m of body.matchAll(/<Cite\s+id="([^"]*)"\s*\/>/g)) {
    const id = m[1]
    if (!library[id]) badMarkers.push({ slug, id, why: 'not in the research library' })
    else if (!ids.has(id)) badMarkers.push({ slug, id, why: 'not among this article\'s sources' })
  }

}

let failed = false

if (uncited.length > 0) {
  failed = true
  console.error(`\n✗ ${uncited.length} article(s) make a research claim with an empty sources array:\n`)
  for (const { slug, triggered } of uncited) {
    console.error(`    ${slug}`)
    console.error(`      matched: ${triggered.join(', ')}`)
  }
  console.error('\n  Attach sources in Notion ("Sources Cited" on the Articles DB), then run')
  console.error('  npm run sync:sources. Or remove the claim.\n')
}

if (badMarkers.length > 0) {
  failed = true
  console.error(`\n✗ ${badMarkers.length} <Cite /> marker(s) do not resolve:\n`)
  for (const { slug, id, why } of badMarkers) console.error(`    ${slug}: id="${id}" ${why}`)
  console.error('')
}

if (staleBacklog.length > 0) {
  failed = true
  console.error(`\n✗ ${staleBacklog.length} article(s) in UNCITED_BACKLOG no longer need to be there.`)
  console.error('  Remove them from scripts/check-citations.mjs:\n')
  for (const slug of staleBacklog) console.error(`    ${slug}`)
  console.error('')
}

if (knownUncited.length > 0) {
  console.warn(`! ${knownUncited.length} article(s) make a research claim with no sources (known backlog):`)
  for (const { slug, triggered } of knownUncited) console.warn(`    ${slug}  [${triggered.join(', ')}]`)
  console.warn('  Attach sources in Notion, run npm run sync:sources, then drop them from UNCITED_BACKLOG.\n')
}

if (failed) process.exit(1)

const withSources = [...sourceIdsBySlug.values()].filter(s => s.size > 0).length
const distinct = new Set(sourcesFile.articles.flatMap(a => a.source_ids)).size
console.log(`✓ citations: ${withSources} articles cite ${distinct} distinct sources, all markers resolve.`)

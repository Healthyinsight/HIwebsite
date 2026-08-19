#!/usr/bin/env node
/**
 * Reports what stands between the article library and "every claim cited".
 *
 *   node scripts/report-citation-gaps.mjs
 *
 * Informational, never fails the build. Two gaps it finds:
 *
 *   1. Articles making a research claim with no sources attached in Notion.
 *   2. URLs cited inline in an MDX body that are not rows in the Research
 *      Library. These are real sources the author used, so the claim is not
 *      unsupported, but the study is invisible to the site: no citation text,
 *      no study type, no quality rating, and it does not count toward the
 *      derived source total.
 *
 * Fixing (2) is a Notion task: add the row to [SOURCE] Research Library DB,
 * relate it to the article, then run `npm run sync:sources`.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_DIR = path.join(ROOT, 'content', 'articles')

const sourcesFile = JSON.parse(fs.readFileSync(path.join(ROOT, 'hi-sources.json'), 'utf8'))
const idsBySlug = new Map(sourcesFile.articles.map(a => [a.slug, new Set(a.source_ids)]))

/** Normalises a URL enough to compare a PMC or PubMed id across host spellings. */
const key = u => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/+$/, '').toLowerCase()
const libraryUrls = new Set(
  Object.values(sourcesFile.sources).map(s => key(s.study_url ?? '')).filter(Boolean),
)

const CLAIM = /\d+(?:[.,]\d+)?\s?%|\bstudy\b|\bstudies\b|meta-analys|research (?:shows|show|demonstrates|consistently)|evidence (?:suggests|shows|indicates)/i

const noSources = []
const unlinked = []

for (const file of fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx')).sort()) {
  const slug = file.replace(/\.mdx$/, '')
  const body = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')
  const attached = idsBySlug.get(slug) ?? new Set()

  const inline = [...new Set(
    [...body.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map(m => m[1]),
  )].filter(u => !u.includes('healthyinsight.eu'))

  const missing = inline.filter(u => !libraryUrls.has(key(u)))
  if (missing.length > 0) unlinked.push({ slug, missing })
  if (attached.size === 0 && CLAIM.test(body)) {
    noSources.push({ slug, inlineCount: inline.length })
  }
}

console.log('Citation gap report\n' + '='.repeat(60))

console.log(`\n1. Articles making a research claim with no sources attached (${noSources.length}):\n`)
for (const { slug, inlineCount } of noSources) {
  const note = inlineCount > 0
    ? `${inlineCount} inline link(s) in the body, none in the library`
    : 'no inline links either'
  console.log(`   ${slug}`)
  console.log(`     ${note}`)
}

const totalMissing = unlinked.reduce((n, u) => n + u.missing.length, 0)
console.log(`\n2. URLs cited on the site but missing from the Research Library (${totalMissing}):\n`)
for (const { slug, missing } of unlinked) {
  console.log(`   ${slug}`)
  for (const u of missing) console.log(`     ${u}`)
}

console.log(`\n${'='.repeat(60)}`)
console.log(`Library: ${sourcesFile.library_size} rows, ${new Set(sourcesFile.articles.flatMap(a => a.source_ids)).size} cited across ${sourcesFile.articles.length} articles.`)
console.log('To close gap 2: add each URL to [SOURCE] Research Library DB in Notion,')
console.log('relate it to the article, then run `npm run sync:sources`.')

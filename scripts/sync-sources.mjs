#!/usr/bin/env node
/**
 * Regenerates hi-sources.json from Notion.
 *
 *   NOTION_API_KEY=... NOTION_ARTICLES_DS_ID=... NOTION_SOURCES_DS_ID=... \
 *     node scripts/sync-sources.mjs
 *
 * Reads two Notion data sources:
 *   [SOURCE] Articles DB         -> "Sources Cited" relation, one row per article
 *   [SOURCE] Research Library DB -> Citation / Study URL / Study Type / Year / Quality Rating
 *
 * Source ids are the first 8 hex characters of the Notion page id. That is what
 * the article `sources` arrays and the <Cite id="..." /> markers reference.
 *
 * Caveat, and the reason this script cannot run unattended: the `Slug` property
 * is empty for every row in the Articles DB, so a Notion article cannot be
 * matched to a site slug automatically. SLUG_BY_NOTION_TITLE below is the
 * hand-verified mapping. When a new article gains sources in Notion, add its
 * title here; the script fails loudly on any title it does not recognise rather
 * than guessing.
 */

import { Client } from '@notionhq/client'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Notion article title -> site slug. Verified against content/articles/*.mdx. */
const SLUG_BY_NOTION_TITLE = {
  'Build your running base: 8–12 weeks to sustainable speed': 'build-your-running-base-8-12-weeks-to-sustainable-speed',
  "Fitness Recovery: What Works vs What's Hype": 'fitness-recovery-what-works',
  'How to Improve Your VO₂ Max: The 12-Week Plan': 'how-to-improve-vo2max-12-week-plan',
  'Managing Sleep Around Competition & Travel': 'managing-sleep-around-competition',
  'Set Goals That Last: A Guide to SMART Goals and Lasting Motivation': 'set-goals-that-last-smart-goals-lasting-motivation',
  'Sleep and Recovery: A Guide for Athletes': 'sleep-and-recovery-guide-for-athletes',
  'Sleep Extension & Performance Protocols: A Deep Dive': 'sleep-extension-performance-protocols',
  'Sleep for Performance': 'sleep-for-performance',
  'Sleep Quality Optimization: Beyond Duration': 'sleep-quality-optimization',
  'Strength Progression: 5 Steps to Sustainable Gains': 'strength-progression-5-steps-to-sustainable-gains',
  'Strength Training for Beginners – Your Evidence-Based Starting Point': 'strength-training-for-beginners',
  'VO₂ Max: Physiological Mechanisms & Research Frontiers': 'vo2max-physiological-mechanisms',
  "VO₂ Max: Why This Number Predicts How Long You'll Live": 'vo2-max-why-this-number-predicts-longevity',
  'VO₂ Max with 4×4 – How to Structure the Block Right': 'vo2-max-4x4-intervals-evidence-based-protocol',
}

/**
 * Sources attached in the audit rather than in Notion, keyed by site slug.
 * The Notion record for the 4×4 article has an empty "Sources Cited" relation,
 * which is why the published article shipped with no reference list. Every id
 * here resolves against the same Research Library. Remove an entry once the
 * Notion record carries the relation itself.
 */
const SOURCE_OVERRIDES = {
  'vo2-max-4x4-intervals-evidence-based-protocol': [
    'f4d259eb', 'a84f4abb', 'd1020f01', 'a485d721', '6f8635cc', '86759d74',
  ],
}

const QUALITY = { '🟢 High': 'High', '🟡 Medium': 'Medium', '🔴 Low': 'Low' }

const shortId = id => id.replace(/-/g, '').slice(0, 8)
const plain = rt => (rt ?? []).map(t => t.plain_text).join('').trim()

async function queryAll(notion, dataSourceId) {
  const out = []
  let cursor
  do {
    const res = await notion.dataSources.query({
      data_source_id: dataSourceId,
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    })
    out.push(...res.results)
    cursor = res.has_more ? res.next_cursor : undefined
  } while (cursor)
  return out
}

async function main() {
  const auth = process.env.NOTION_API_KEY
  const articlesDs = process.env.NOTION_ARTICLES_DS_ID
  const sourcesDs = process.env.NOTION_SOURCES_DS_ID
  if (!auth || !articlesDs || !sourcesDs) {
    console.error('Set NOTION_API_KEY, NOTION_ARTICLES_DS_ID and NOTION_SOURCES_DS_ID.')
    process.exit(1)
  }

  const notion = new Client({ auth })
  const [sourceRows, articleRows] = await Promise.all([
    queryAll(notion, sourcesDs),
    queryAll(notion, articlesDs),
  ])

  const sources = {}
  for (const row of sourceRows) {
    const p = row.properties ?? {}
    const citation = plain(p['Citation']?.title)
    if (!citation) continue
    sources[shortId(row.id)] = {
      citation,
      study_url: p['Study URL']?.url ?? '',
      study_type: p['Study Type']?.select?.name ?? '',
      year: p['Year']?.number ?? null,
      quality: QUALITY[p['Quality Rating']?.select?.name] ?? 'Unrated',
    }
  }

  const articles = []
  const unknownTitles = []
  for (const row of articleRows) {
    const p = row.properties ?? {}
    const title = plain(p['Article']?.title)
    const cited = (p['Sources Cited']?.relation ?? []).map(r => shortId(r.id))
    const slug = SLUG_BY_NOTION_TITLE[title]
    const overrides = slug ? SOURCE_OVERRIDES[slug] : undefined
    const ids = overrides ?? cited
    if (ids.length === 0) continue
    if (!slug) {
      unknownTitles.push(title)
      continue
    }
    articles.push({
      slug,
      notion_title: title,
      category: (p['Category']?.select?.name ?? '').toLowerCase() || null,
      hi_level: p['HI Level']?.select?.name ?? null,
      trail: p['Trail']?.select?.name ?? null,
      source_ids: ids,
      source_count: ids.length,
    })
  }

  // Overrides for articles whose Notion row carries no relation at all.
  for (const [slug, ids] of Object.entries(SOURCE_OVERRIDES)) {
    if (articles.some(a => a.slug === slug)) continue
    articles.push({
      slug, notion_title: null, category: null, hi_level: null, trail: null,
      source_ids: ids, source_count: ids.length,
    })
  }

  if (unknownTitles.length) {
    console.error('Articles with sources but no slug mapping. Add them to SLUG_BY_NOTION_TITLE:')
    for (const t of unknownTitles) console.error(`  - ${t}`)
    process.exit(1)
  }

  const unresolved = [...new Set(articles.flatMap(a => a.source_ids))].filter(id => !sources[id])
  if (unresolved.length) {
    console.error(`Source ids not found in the Research Library: ${unresolved.join(', ')}`)
    process.exit(1)
  }

  articles.sort((a, b) => a.slug.localeCompare(b.slug))
  const payload = {
    _comment: 'Generated from Notion. Regenerate with: npm run sync:sources. Do not hand-edit.',
    generated_at: new Date().toISOString().slice(0, 10),
    library_size: sourceRows.length,
    sources: Object.fromEntries(Object.entries(sources).sort(([a], [b]) => a.localeCompare(b))),
    articles,
  }

  fs.writeFileSync(path.join(ROOT, 'hi-sources.json'), JSON.stringify(payload, null, 2) + '\n')
  const refs = articles.reduce((n, a) => n + a.source_count, 0)
  const distinct = new Set(articles.flatMap(a => a.source_ids)).size
  console.log(`Wrote hi-sources.json: ${sourceRows.length} in library, ${articles.length} articles, ${refs} references, ${distinct} distinct cited.`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

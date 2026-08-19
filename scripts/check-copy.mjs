#!/usr/bin/env node
/**
 * Brand-rule lint for user-facing copy. Runs as a prebuild step.
 *
 *   node scripts/check-copy.mjs
 *
 * Two rules, both from HI's own brand spec:
 *
 *   1. No em-dash (—) in user-facing copy. Use a period, a colon or a comma.
 *      The en-dash (–) is allowed, and is correct, in numeric ranges (90–95%).
 *   2. Product names spelled exactly: HI Programs, The Path Tracker,
 *      Health IQ, Learning Trails.
 *
 * Code comments and CSS section dividers are not user-facing and are skipped.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const ROOTS = ['src', 'content']
const EXTS = new Set(['.ts', '.tsx', '.mdx'])
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', '.vercel'])

/** Wrong spellings mapped to the canonical product name. */
const PRODUCT_NAMES = [
  { wrong: /\bHI programs\b/g, right: 'HI Programs' },
  { wrong: /\bhi programs\b/g, right: 'HI Programs' },
  { wrong: /\bPath Tracker\b(?<!The Path Tracker)/g, right: 'The Path Tracker' },
  { wrong: /\bpath tracker\b/gi, right: 'The Path Tracker', unless: /The Path Tracker/ },
  { wrong: /\bHealthIQ\b/g, right: 'Health IQ' },
  { wrong: /\bhealth iq\b/g, right: 'Health IQ' },
  { wrong: /\blearning trails\b/g, right: 'Learning Trails' },
]

const isComment = line => {
  const s = line.trim()
  return s.startsWith('//') || s.startsWith('*') || s.startsWith('/*') || s.startsWith('{/*')
}

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue
      yield* walk(path.join(dir, entry.name))
    } else if (EXTS.has(path.extname(entry.name))) {
      yield path.join(dir, entry.name)
    }
  }
}

const emDashes = []
const nameIssues = []

for (const root of ROOTS) {
  const abs = path.join(ROOT, root)
  if (!fs.existsSync(abs)) continue
  for (const file of walk(abs)) {
    const rel = path.relative(ROOT, file)
    const lines = fs.readFileSync(file, 'utf8').split('\n')
    lines.forEach((line, i) => {
      if (isComment(line)) return
      if (line.includes('—')) emDashes.push({ rel, line: i + 1, text: line.trim().slice(0, 100) })
      for (const { wrong, right, unless } of PRODUCT_NAMES) {
        wrong.lastIndex = 0
        const m = wrong.exec(line)
        if (m && !(unless && unless.test(line))) {
          nameIssues.push({ rel, line: i + 1, found: m[0], right })
        }
      }
    })
  }
}

let failed = false

if (emDashes.length > 0) {
  failed = true
  console.error(`\n✗ ${emDashes.length} em-dash(es) in user-facing copy.`)
  console.error('  HI brand rule: use a period, a colon or a comma. The en-dash (–) is')
  console.error('  fine in numeric ranges.\n')
  for (const { rel, line, text } of emDashes) console.error(`    ${rel}:${line}  ${text}`)
  console.error('')
}

if (nameIssues.length > 0) {
  failed = true
  console.error(`\n✗ ${nameIssues.length} product name(s) spelled wrong:\n`)
  for (const { rel, line, found, right } of nameIssues) {
    console.error(`    ${rel}:${line}  "${found}" should be "${right}"`)
  }
  console.error('')
}

if (failed) process.exit(1)
console.log('✓ copy: no em-dashes in user-facing strings, product names correct.')

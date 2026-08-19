import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

/**
 * Reading time computed from the actual body, not from a CMS field.
 *
 * The CMS value was hand-entered and drifted badly: the VO2 max 4x4 article
 * claimed "10 min read" for a body of roughly 500 words, about 2 to 3 minutes.
 * Overstating it costs trust on the one page that is asking readers to trust a
 * number.
 */

const WORDS_PER_MINUTE = 200
const CONTENT_DIR = path.join(process.cwd(), 'content', 'articles')

/** Strips MDX markup that is not prose, so word count reflects what is read. */
function toProse(mdx: string): string {
  return mdx
    .replace(/```[\s\S]*?```/g, ' ')          // fenced code
    .replace(/<[^>]+>/g, ' ')                  // JSX and HTML tags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')     // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')   // links keep their text
    .replace(/[#*_`>|-]/g, ' ')                // markdown punctuation
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length
}

/**
 * Minutes to read the local MDX body for a slug, or null when there is no
 * local file. Callers fall back to the stored value in that case.
 */
export function computeReadingMinutes(slug: string): number | null {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const { content } = matter(fs.readFileSync(file, 'utf8'))
  const words = countWords(toProse(content))
  if (words === 0) return null
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

/** Formatted reading time, falling back to the stored value for remote articles. */
export function resolveReadingTime(slug: string, stored: string): string {
  const minutes = computeReadingMinutes(slug)
  return minutes === null ? stored : `${minutes} min`
}

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'articles')

/** Returns the raw MDX body for a slug, or null if no file exists. */
export function getArticleContent(slug: string): string | null {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf8')
  const { content } = matter(raw)
  if (!content.trim()) return null
  return content
}

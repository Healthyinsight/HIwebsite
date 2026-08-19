import { Client } from '@notionhq/client'
import type { QueryDataSourceParameters } from '@notionhq/client'
import type { ArticleMeta, Pillar, ArticleFormat } from './articles'
import { logger } from './logger'

const PILLAR_MAP: Record<string, Pillar> = {
  Motion: 'motion',
  Nutrition: 'nutrition',
  Recovery: 'recovery',
  Mindset: 'mindset',
}

const FORMAT_MAP: Record<string, ArticleFormat> = {
  guide: 'guide',
  protocol: 'protocol',
  'myth-bust': 'myth-bust',
  review: 'review',
  checklist: 'checklist',
  Article: 'guide',
  Guide: 'guide',
  Tool: 'guide',
}

type RichTextProp    = { rich_text: { plain_text: string }[] } | null | undefined
type SelectProp      = { select: { name: string } | null } | null | undefined
type DateProp        = { date: { start: string } | null } | null | undefined
type CheckboxProp    = { checkbox: boolean } | null | undefined
type UrlProp         = { url: string | null } | null | undefined
type NumberProp      = { number: number | null } | null | undefined
type TitleProp       = { title: { plain_text: string }[] } | null | undefined

function txt(prop: RichTextProp): string {
  return prop?.rich_text?.[0]?.plain_text?.trim() ?? ''
}

export async function fetchNotionArticles(): Promise<ArticleMeta[]> {
  const apiKey   = process.env.NOTION_API_KEY
  const sourceId = process.env.NOTION_ARTICLES_DB_ID
  if (!apiKey || !sourceId) return []

  const notion = new Client({ auth: apiKey })

  const filter = {
    property: 'Web Status',
    type: 'select',
    select: { equals: 'Published (Web)' },
  } as unknown as NonNullable<QueryDataSourceParameters['filter']>

  try {
    const res = await notion.dataSources.query({
      data_source_id: sourceId,
      filter,
      page_size: 100,
    })

    const results: ArticleMeta[] = []
    const skippedForSlug: string[] = []

    for (const page of res.results) {
      if (page.object !== 'page' || !('properties' in page)) continue
      const p = page.properties as Record<string, unknown>

      const title        = (p['Article'] as TitleProp)?.title?.[0]?.plain_text?.trim() ?? ''

      // Every row in the Articles DB currently has an empty Slug, which is why
      // this overlay contributes nothing and the site runs on seeds. Skipping
      // silently hid that; name the rows so it shows up in the build log.
      const slug = txt(p['Slug'] as RichTextProp)
      if (!slug) {
        skippedForSlug.push(title || '(untitled)')
        continue
      }
      const excerpt      = txt(p['Description'] as RichTextProp)
      const pillar       = PILLAR_MAP[(p['Category'] as SelectProp)?.select?.name ?? ''] ?? 'motion'
      const rawFormat    = (p['Web Format'] as SelectProp)?.select?.name
                        ?? (p['Content Type'] as SelectProp)?.select?.name
                        ?? 'guide'
      const format       = (FORMAT_MAP[rawFormat] ?? 'guide') as ArticleFormat
      const levelStr     = (p['HI Level'] as SelectProp)?.select?.name ?? ''
      const level        = levelStr ? parseInt(levelStr.replace('Level ', ''), 10) || undefined : undefined
      // `Reading Time` is a Notion number, not rich text. Reading it as rich
      // text meant it always fell back. Reading time is recomputed from the
      // body anyway (M4); this is only the fallback for remote-only articles.
      const readingMinutes = (p['Reading Time'] as NumberProp)?.number ?? null
      const readingTime  = readingMinutes ? `${Math.round(readingMinutes)} min` : '5 min'
      const publishedAt  = (p['Web Published Date'] as DateProp)?.date?.start
                        ?? new Date().toISOString().slice(0, 10)
      const lastReviewed = (p['Last Reviewed Date'] as DateProp)?.date?.start ?? undefined
      const featured     = (p['Featured'] as CheckboxProp)?.checkbox ?? false
      const evidenceStrength = (p['Evidence Strength'] as SelectProp)?.select?.name as ArticleMeta['evidenceStrength'] | undefined
      const evidenceNote = txt(p['Evidence Note'] as RichTextProp) || undefined
      const tldrRaw      = txt(p['TL;DR'] as RichTextProp)
      const tldr         = tldrRaw ? tldrRaw.split('\n').filter(Boolean) : undefined
      const externalUrl  = (p['External Article URL'] as UrlProp)?.url ?? undefined

      results.push({
        slug,
        title,
        excerpt,
        pillar,
        format,
        readingTime,
        publishedAt,
        ...(lastReviewed ? { lastReviewed } : {}),
        ...(level !== undefined ? { level } : {}),
        ...(featured ? { featured: true } : {}),
        ...(evidenceStrength ? { evidenceStrength } : {}),
        ...(evidenceNote ? { evidenceNote } : {}),
        ...(tldr?.length ? { tldr } : {}),
        ...(externalUrl ? { externalArticleUrl: externalUrl } : {}),
      })
    }

    if (skippedForSlug.length > 0) {
      logger.warn('Notion rows skipped: Slug is empty', {
        count: skippedForSlug.length,
        titles: skippedForSlug.join(' | '),
      })
    }

    return results
  } catch (err) {
    logger.warn('Notion fetch failed, using seeds only', { err: String(err) })
    return []
  }
}

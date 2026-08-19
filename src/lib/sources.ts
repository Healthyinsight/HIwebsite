import raw from '../../hi-sources.json'

export type SourceQuality = 'High' | 'Medium' | 'Low' | 'Unrated'

/** A single entry in the HI Research Library. */
export interface Source {
  /** First 8 hex characters of the Notion page id. Stable, used by <Cite id="..." />. */
  id: string
  citation: string
  studyUrl: string
  studyType: string
  year: number | null
  quality: SourceQuality
}

interface RawSource {
  citation: string
  study_url: string
  study_type: string
  year: number | null
  quality: string
}

interface RawArticle {
  slug: string
  source_ids: string[]
}

const rawSources = raw.sources as Record<string, RawSource>
const rawArticles = raw.articles as RawArticle[]

/** Total rows in the Notion Research Library, cited or not. */
export const LIBRARY_SIZE: number = raw.library_size

function toSource(id: string, s: RawSource): Source {
  return {
    id,
    citation: s.citation,
    studyUrl: s.study_url,
    studyType: s.study_type,
    year: s.year,
    quality: (['High', 'Medium', 'Low'].includes(s.quality) ? s.quality : 'Unrated') as SourceQuality,
  }
}

const sourcesBySlug = new Map<string, Source[]>(
  rawArticles.map(a => [
    a.slug,
    a.source_ids.flatMap(id => (rawSources[id] ? [toSource(id, rawSources[id])] : [])),
  ]),
)

/**
 * Ordered reference list for an article, or an empty array when it has none.
 * Order is the order the sources were attached, and it is what the reference
 * numbers in <Cite /> and <References /> refer to.
 */
export function getSourcesForSlug(slug: string): Source[] {
  return sourcesBySlug.get(slug) ?? []
}

/** Distinct sources cited across every article. The honest "backed by N sources" figure. */
export function getDistinctCitedSourceCount(): number {
  return new Set(rawArticles.flatMap(a => a.source_ids)).size
}

/** Slugs that carry at least one source. */
export function getSlugsWithSources(): string[] {
  return rawArticles.filter(a => a.source_ids.length > 0).map(a => a.slug)
}

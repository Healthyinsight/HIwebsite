import { getArticles } from './articles'
import { LIBRARY_SIZE, getDistinctCitedSourceCount, getSlugsWithSources } from './sources'

/**
 * Every self-reported figure the site renders, derived from the content source.
 *
 * Nothing here may be hardcoded. Before the 2026-08 audit four pages carried
 * hand-maintained numbers that contradicted each other: /articles claimed 24
 * articles backed by 75 sources while the homepage claimed 30 to 50 studies per
 * article, which would have implied 720. Deriving them is what keeps the four
 * pages agreeing with each other and with the library.
 */
export interface SiteStats {
  /** Published articles on the site. */
  articleCount: number
  /** Distinct sources cited across every article. Not the sum of per-article counts. */
  citedSourceCount: number
  /** Rows in the Notion Research Library, cited or not. */
  librarySize: number
  /** Articles that carry a full reference list. */
  articlesWithSources: number
  protocolCount: number
  guideCount: number
}

export async function getSiteStats(): Promise<SiteStats> {
  const articles = await getArticles()
  const slugs = new Set(articles.map(a => a.slug))

  return {
    articleCount: articles.length,
    citedSourceCount: getDistinctCitedSourceCount(),
    librarySize: LIBRARY_SIZE,
    articlesWithSources: getSlugsWithSources().filter(s => slugs.has(s)).length,
    protocolCount: articles.filter(a => a.format === 'protocol').length,
    guideCount: articles.filter(a => a.format === 'guide').length,
  }
}

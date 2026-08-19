import type { ArticleMeta } from './articles'
import type { Source } from './sources'

/**
 * JSON-LD builders.
 *
 * No page carried application/ld+json before the 2026-08 audit. For a YMYL
 * health site this is the main machine-readable E-E-A-T channel: it is how a
 * search engine sees who wrote a claim, when it was last reviewed, and what it
 * is cited against. HI's whole differentiator is the sourcing, and none of it
 * was legible to a machine.
 */

export const SITE_URL = 'https://healthyinsight.eu'

const AUTHOR = {
  '@type': 'Person',
  '@id': `${SITE_URL}/about#person`,
  name: 'Filip Berggren',
  url: `${SITE_URL}/about`,
  jobTitle: 'Founder',
  description:
    'Founder of Healthy Insight. Synthesises published, peer-reviewed research into practical guidance. Not a physician, PhD, or licensed dietitian.',
} as const

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: 'Healthy Insight',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      'Evidence-based health and fitness publication covering motion, nutrition, recovery and mindset. Every claim is sourced to peer-reviewed research.',
    founder: AUTHOR,
    sameAs: [] as string[],
  }
}

export function personSchema() {
  return { '@context': 'https://schema.org', ...AUTHOR }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    url: SITE_URL,
    name: 'Healthy Insight',
    inLanguage: 'en-GB',
    publisher: { '@id': `${SITE_URL}#organization` },
  }
}

export function breadcrumbSchema(trail: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}

/**
 * Article schema. `citation` is populated from the article's real sources, so
 * the reference list is machine-readable rather than just rendered.
 */
export function articleSchema(article: ArticleMeta, sources: Source[]) {
  const url = `${SITE_URL}/articles/${article.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.excerpt,
    url,
    inLanguage: 'en-GB',
    datePublished: article.publishedAt,
    dateModified: article.lastReviewed ?? article.publishedAt,
    author: AUTHOR,
    publisher: { '@id': `${SITE_URL}#organization` },
    image: `${url}/opengraph-image`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: article.pillar,
    ...(sources.length > 0
      ? {
          citation: sources.map(s => ({
            '@type': 'ScholarlyArticle',
            name: s.citation,
            ...(s.studyUrl ? { url: s.studyUrl } : {}),
            ...(s.year ? { datePublished: String(s.year) } : {}),
          })),
        }
      : {}),
  }
}

/** Renders one or more schema objects as a script tag. */
export function jsonLd(schema: object | object[]) {
  return {
    __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
  }
}

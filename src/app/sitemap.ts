import { MetadataRoute } from 'next'
import { getArticles } from '@/lib/articles'
import { getActiveTrails } from '@/lib/trails'

const BASE = 'https://healthyinsight.eu'

/**
 * Generated sitemap.
 *
 * This file used to sit at the repo root, where Next never registers it, so
 * /sitemap.xml returned 404 while /robots.txt advertised it. Article dates use
 * the last-reviewed date where the CMS has one, so a re-reviewed article
 * signals as updated rather than looking untouched since publication.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE}/articles`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/protocols`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/trails`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/quiz`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/motion`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/nutrition`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/recovery`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/mindset`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/newsletter`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/about`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE}/waitlist`, priority: 0.4, changeFrequency: 'monthly' },
    { url: `${BASE}/programs`, priority: 0.4, changeFrequency: 'monthly' },
    { url: `${BASE}/privacy`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${BASE}/terms`, priority: 0.3, changeFrequency: 'yearly' },
  ]

  const trailPages: MetadataRoute.Sitemap = getActiveTrails().map(trail => ({
    url: `${BASE}/trails/${trail.id}`,
    priority: 0.7,
    changeFrequency: 'monthly',
  }))

  const articlePages: MetadataRoute.Sitemap = articles.map(a => ({
    url: `${BASE}/articles/${a.slug}`,
    lastModified: new Date(a.lastReviewed ?? a.publishedAt),
    priority: 0.85,
    changeFrequency: 'monthly',
  }))

  return [...staticPages, ...trailPages, ...articlePages]
}

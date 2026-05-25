import { MetadataRoute } from 'next'
import { articles } from '@/lib/articles'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://healthyinsight.eu'

  const staticPages = [
    { url: base, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${base}/articles`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/quiz`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/motion`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/nutrition`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/recovery`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/mindset`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/about`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${base}/newsletter`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/privacy`, priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  const articlePages = articles.map(a => ({
    url: `${base}/articles/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    priority: 0.85,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticPages, ...articlePages]
}

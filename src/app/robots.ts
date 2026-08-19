import { MetadataRoute } from 'next'

/**
 * robots.txt.
 *
 * This file used to sit at the repo root, where Next never registers it. The
 * 2026-08 audit found /robots.txt returning 200 with GPTBot and
 * meta-externalagent disallowed, but no such rule exists anywhere in this
 * repo, so that response was not coming from here.
 *
 * Registering this file means the served robots.txt is now the one below, and
 * AI crawlers are NOT disallowed. That is a deliberate default, not an
 * oversight: HI's differentiator is heavily sourced content, and AI answer
 * engines are a referral path for exactly that. See S6 in the audit.
 *
 * To disallow them again, add entries here. Do not put a competing
 * public/robots.txt in place; it would silently win over this file.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: 'https://healthyinsight.eu/sitemap.xml',
    host: 'https://healthyinsight.eu',
  }
}

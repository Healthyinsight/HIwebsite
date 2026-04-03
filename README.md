# Healthy Insight — healthyinsight.eu

Next.js 15 website for Healthy Insight. Evidence-based health content platform.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + inline styles
- **Content:** Article metadata in `src/lib/articles.ts`, MDX in `content/articles/`
- **Fonts:** DM Serif Display + DM Sans (Google Fonts)
- **Hosting:** Vercel

## Local Development

```bash
npm install
npm run dev
# Opens at http://localhost:3000
```

## Adding a New Article

1. Add the article metadata to `src/lib/articles.ts`:

```typescript
{
  slug: 'your-article-slug',
  title: 'Your Article Title',
  excerpt: 'One-sentence description.',
  pillar: 'motion',        // motion | nutrition | recovery | mindset
  level: 2,               // 1-5 (optional)
  readingTime: '12 min',
  publishedAt: '2026-04-01',
  beehiivUrl: 'https://...',
}
```

2. Optionally create a full MDX file at `content/articles/your-article-slug.mdx`

3. Create a PR — review the diff — merge to deploy.

## Deployment

Deployed automatically on Vercel when merged to `main`.

**DNS:** Point `healthyinsight.eu` CNAME to Vercel.
Remove Beehiiv CNAME when ready to switch.

## Content approval workflow

1. Create branch: `content/article-name`
2. Add article to `articles.ts`
3. Open PR — Filip reviews
4. Merge = live in ~60 seconds

---

*Powered by Healthy Insight. Science Made Simple, Action Made Fun.*

# Healthy Insight — Claude Code Context

## Project overview

**Healthy Insight (HI)** is an evidence-based health and fitness publication at healthyinsight.eu. It covers four pillars: motion, recovery, nutrition, mindset. The site is deployed on Vercel, source on GitHub at `filipmathiasberggren-revops/HIweb2`.

## Stack

- **Framework:** Next.js 15 (App Router), TypeScript strict mode
- **Styling:** Inline styles only — no Tailwind, no CSS modules (except `globals.css` for CSS custom properties and font imports)
- **Fonts:** DM Serif Display (headings) + DM Sans (body) via Google Fonts
- **Email:** Resend API via `/api/subscribe` route
- **Content host:** Beehiiv (articles redirect there; no local MDX rendering)
- **Deployment:** Vercel (auto-deploys from `master`)
- **Language:** English throughout

## CSS custom properties (defined in globals.css)

```
--navy      #0F2A3F    (primary dark)
--blue      #2D7DA8    (primary accent)
--blue-mid  #2D7DA8    (same as blue)
--blue-light #5095AC
--blue-pale  #A8CCE0
--sky        #D4EAF5    (light blue tint)
--cream      #F5F2EC    (warm off-white)
--warm       #EDE8DF    (warm background)
--sand       #E8E2D8    (border/subtle)
```

## Key files

| File | Purpose |
|---|---|
| `src/lib/articles.ts` | All article metadata, `ArticleMeta` type, helper functions |
| `src/lib/pillars.ts` | Shared pillar gradient map |
| `src/components/Nav.tsx` | Two-tier navigation (primary + transparency links) |
| `src/components/ArticleCard.tsx` | Reusable card with format badge |
| `src/components/ArticleFilters.tsx` | Client-side pillar/format/sort filter UI |
| `src/components/NewsletterForm.tsx` | Email signup form (`dark?`, `size?` props) |
| `src/components/HealthIQQuiz.tsx` | 5-question quiz with scoring and email capture |
| `src/components/Footer.tsx` | 4-column footer with content and about links |
| `src/app/page.tsx` | Homepage |
| `src/app/articles/page.tsx` | Articles index (server component, passes to ArticleFilters) |
| `src/app/articles/[slug]/page.tsx` | Article detail with TL;DR + evidence modules |
| `src/app/protocols/page.tsx` | Protocols & guides page |
| `src/app/[pillar]/page.tsx` | Pillar landing pages (motion, recovery, nutrition, mindset) |
| `src/app/about/page.tsx` | About page with #method and #sources anchors |
| `src/app/newsletter/page.tsx` | Newsletter signup page |
| `src/app/quiz/page.tsx` | Health IQ Quiz page |

## Conventions

- `'use client'` directive required for any component using `useState` or event handlers
- `generateStaticParams` + `generateMetadata` for all dynamic routes
- Server components export `metadata` at the top; only pass data down to client components
- Article slugs are kebab-case strings; `beehiivUrl` is the external link target
- `ArticleFormat` values: `'guide' | 'protocol' | 'myth-bust' | 'review' | 'checklist'`
- `Pillar` values: `'motion' | 'recovery' | 'nutrition' | 'mindset'`
- All new articles added to `src/lib/articles.ts` `articles` array — this is the single source for article data
- `next-mdx-remote` is installed but unused; do not add MDX rendering

## Workflow & session context

**Dynamic state (current sprint, decisions, deployment log) lives in Notion — not here.**

At session start:
1. This file loads automatically — no action needed
2. Use Notion MCP to fetch the Sprint Board for current task status
3. Use Notion MCP to fetch Decisions Log for architectural constraints

At session end:
1. Update sprint board tasks in Notion via MCP
2. Log any new decisions in Decisions Log

Notion workspace: check MEMORY.md for Notion page IDs.

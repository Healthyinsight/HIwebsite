# The Path Tracker: fixes needed in the `path-by-hi` project

**Not this repo.** `tracker.healthyinsight.eu` is served by the `path-by-hi`
Vercel project. Every item below has to be fixed there. This file exists so the
findings are not lost, per M10 of the 2026-08 UX audit.

Verified against the served response on 2026-08-18.

## What is wrong

### 1. No server-rendered content

The document is a 1,381-byte shell. Everything renders client-side.

- Nothing for a crawler or a link preview to read.
- A blank first paint on a cold or slow connection.
- Shared links to the tracker carry no title, description or image.

Fix: server-render at least the marketing shell (heading, description, a link
back to the main site), even if the authenticated app stays client-side.

### 2. Product name does not match the brand

`<title>` is `Path by HI`. Everywhere on healthyinsight.eu the product is
**The Path Tracker**.

Fix: `<title>The Path Tracker | Healthy Insight</title>`.

Worth deciding deliberately rather than just renaming: `Path by HI` also
appears in the Notion workspace (Branding & Categories describes "Path by HI"
as HI's single app, dark theme, teal accent). One of the two names is wrong.
Pick one and update both the app and Notion so the brand stops carrying two
names for one product.

### 3. Swedish meta description on an all-English site

```
Din personlig tränings- och insiktsmotor
```

Two problems. The site is English throughout, and the Swedish is
ungrammatical: it should be `Din personliga`, not `Din personlig`.

Fix: replace with English copy matching the main site's voice, no em-dashes.
Suggested: `Your personal training and insight engine. Built on the research,
not on hype.`

### 4. No links back to healthyinsight.eu

The tracker is a dead end. A visitor who lands there cannot get to the
articles, the newsletter or the about page.

Fix: header or footer link back to healthyinsight.eu, at minimum to the
homepage and the newsletter.

### 5. `theme-color` does not match the main site

Tracker sends `#5095AC` (`--blue-light`). The main site sends `#0F2A3F`
(`--navy`).

Fix: align to `#0F2A3F`, or make the difference intentional and documented. Note
that the Notion Visual Design Guide (updated May 2026) says Path by HI runs a
**dark theme with a teal accent** by design, distinct from the blue-and-light
web palette. If that is still the intent, then `theme-color` should be the app's
dark background, not the web navy and not `#5095AC`. Decide, then document it in
the Visual Design Guide.

## Suggested order

1. Title and meta description (minutes, and both are outright wrong today).
2. Links back to the main site (small, and stops the dead end).
3. `theme-color`, once the palette question in item 5 is settled.
4. Server-rendered shell (largest, and the one that needs a real decision about
   the app's rendering strategy).

## Open question for Filip

Items 2 and 5 both come down to one unresolved thing: is The Path Tracker
presented as part of healthyinsight.eu, or as its own product that happens to be
by HI? The name, the palette and the linking all follow from that answer. Worth
logging in the Decisions Log once decided.

#!/usr/bin/env python3
"""
scripts/publish_article.py – HI Content Engine
===============================================
Fetches an article's body from Notion, converts blocks to MDX,
and inserts the article metadata into src/lib/articles.ts.

Required environment variables:
  NOTION_API_KEY   – Notion integration token
  NOTION_PAGE_ID   – ID of the Notion page (article body source)
  ARTICLE_JSON     – JSON string with article metadata (slug, title, pillar, …)

Exit codes:
  0  – success (or article already published, no-op)
  1  – unrecoverable error
"""

import json
import os
import sys
import urllib.error
import urllib.request

NOTION_V     = "2022-06-28"
NOTION_BASE  = "https://api.notion.com/v1"
ARRAY_MARKER = "const articleSeeds: ArticleMeta[] = ["
ARTICLES_TS  = "src/lib/articles.ts"


def require_env(name: str) -> str:
    val = os.environ.get(name, "").strip()
    if not val:
        print(f"Missing required env var: {name}", file=sys.stderr)
        sys.exit(1)
    return val


API_KEY  = require_env("NOTION_API_KEY")
PAGE_ID  = require_env("NOTION_PAGE_ID").replace("-", "")
META_RAW = require_env("ARTICLE_JSON")

try:
    META = json.loads(META_RAW)
except json.JSONDecodeError as exc:
    print(f"ARTICLE_JSON is not valid JSON: {exc}", file=sys.stderr)
    sys.exit(1)

SLUG     = META.get("slug", "").strip()
MDX_PATH = f"content/articles/{SLUG}.mdx"

if not SLUG:
    print("ARTICLE_JSON must include a slug field.", file=sys.stderr)
    sys.exit(1)


def notion_get(path: str) -> dict:
    req = urllib.request.Request(
        f"{NOTION_BASE}{path}",
        headers={"Authorization": f"Bearer {API_KEY}", "Notion-Version": NOTION_V},
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as exc:
        body = exc.read().decode(errors="replace")
        print(f"Notion API {exc.code} on {path}: {body}", file=sys.stderr)
        sys.exit(1)


def fetch_blocks(block_id: str) -> list:
    results, cursor = [], None
    while True:
        url = f"/blocks/{block_id}/children?page_size=100"
        if cursor:
            url += f"&start_cursor={cursor}"
        data = notion_get(url)
        results.extend(data.get("results", []))
        if not data.get("has_more"):
            break
        cursor = data.get("next_cursor")
    return results


def rt_to_md(rich_texts: list) -> str:
    out = ""
    for rt in rich_texts:
        text = rt.get("plain_text", "")
        ann  = rt.get("annotations", {})
        if ann.get("bold"):   text = f"**{text}**"
        if ann.get("italic"): text = f"*{text}*"
        if ann.get("code"):   text = f"`{text}`"
        if rt.get("href"):    text = f"[{text}]({rt['href']})"
        out += text
    return out


def blocks_to_md(blocks: list, depth: int = 0) -> str:
    lines, num_count = [], {}
    for block in blocks:
        btype = block["type"]
        data  = block.get(btype, {})
        text  = rt_to_md(data.get("rich_text", []))
        pad   = "  " * depth

        if btype == "paragraph":
            lines.append(f"{pad}{text}" if text else "")
        elif btype in ("heading_1", "heading_2", "heading_3"):
            hashes = {"heading_1": "#", "heading_2": "##", "heading_3": "###"}[btype]
            lines.append(f"\n{hashes} {text}\n")
        elif btype == "bulleted_list_item":
            lines.append(f"{pad}- {text}")
            if block.get("has_children"):
                lines.append(blocks_to_md(fetch_blocks(block["id"]), depth + 1))
        elif btype == "numbered_list_item":
            n = num_count.get(depth, 0) + 1; num_count[depth] = n
            lines.append(f"{pad}{n}. {text}")
            if block.get("has_children"):
                lines.append(blocks_to_md(fetch_blocks(block["id"]), depth + 1))
        elif btype == "to_do":
            checked = "x" if data.get("checked") else " "
            lines.append(f"{pad}- [{checked}] {text}")
        elif btype == "quote":
            lines.append(f"\n> {text}\n")
        elif btype == "callout":
            emoji = (data.get("icon") or {}).get("emoji", "")
            lines.append(f"\n> {emoji} {text}\n")
        elif btype == "code":
            lang      = data.get("language", "")
            code_text = (data.get("rich_text") or [{}])[0].get("plain_text", "")
            lines.append(f"\n```{lang}\n{code_text}\n```\n")
        elif btype == "divider":
            lines.append("\n---\n")
        elif btype == "image":
            url = ((data.get("file") or {}).get("url") or
                   (data.get("external") or {}).get("url") or "")
            caption = rt_to_md(data.get("caption", []))
            lines.append(f"\n![{caption or 'image'}]({url})\n")
        elif block.get("has_children"):
            lines.append(blocks_to_md(fetch_blocks(block["id"]), depth))

    return "\n".join(l for l in lines if l is not None)


def esc(value) -> str:
    return str(value).replace("\\", "\\\\").replace("'", "\\'")


def build_ts_entry(meta: dict) -> str:
    slug         = esc(meta.get("slug", ""))
    title        = esc(meta.get("title", ""))
    excerpt      = esc(meta.get("excerpt", ""))
    pillar       = esc(meta.get("pillar", "motion"))
    fmt          = esc(meta.get("format", "guide"))
    level        = int(meta.get("level", 1))
    reading_time = esc(meta.get("readingTime", "10 min"))
    published_at = esc(meta.get("publishedAt", ""))
    ev_strength  = esc(meta.get("evidenceStrength", "mixed"))
    ev_note      = esc(meta.get("evidenceNote", ""))
    tldr         = meta.get("tldr", [])

    parts = [
        "  {",
        f"    slug: '{slug}',",
        f"    title: '{title}',",
        f"    excerpt: '{excerpt}',",
        f"    pillar: '{pillar}',",
        f"    format: '{fmt}',",
        f"    level: {level},",
        f"    readingTime: '{reading_time}',",
        f"    publishedAt: '{published_at}',",
        f"    evidenceStrength: '{ev_strength}',",
        f"    evidenceNote: '{ev_note}',",
    ]
    if meta.get("featured"):
        parts.insert(-2, "    featured: true,")
    if tldr:
        parts.append("    tldr: [")
        for item in tldr:
            parts.append(f"      '{esc(item)}',")
        parts.append("    ],")
    parts.append("  },")
    return "\n".join(parts)


def main():
    # Step 1: Fetch and write MDX
    if os.path.exists(MDX_PATH):
        print(f"MDX already exists at {MDX_PATH} — skipping (idempotent).")
    else:
        print(f"Fetching Notion blocks for {PAGE_ID}...")
        blocks  = fetch_blocks(PAGE_ID)
        print(f"  Got {len(blocks)} top-level blocks.")
        content = blocks_to_md(blocks).strip()
        os.makedirs("content/articles", exist_ok=True)
        with open(MDX_PATH, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(content + "\n")
        print(f"Wrote {MDX_PATH}")

    # Step 2: Update articles.ts
    with open(ARTICLES_TS, "r", encoding="utf-8") as fh:
        ts = fh.read()

    if f"slug: '{SLUG}'" in ts:
        print(f"Slug '{SLUG}' already in articles.ts — skipping insert.")
        return

    if ARRAY_MARKER not in ts:
        print(f"Marker not found in {ARTICLES_TS}: {ARRAY_MARKER}", file=sys.stderr)
        sys.exit(1)

    entry = build_ts_entry(META)
    idx   = ts.index(ARRAY_MARKER) + len(ARRAY_MARKER)
    ts    = ts[:idx] + "\n" + entry + ts[idx:]

    with open(ARTICLES_TS, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(ts)
    print(f"Inserted '{SLUG}' into articles.ts")


if __name__ == "__main__":
    main()

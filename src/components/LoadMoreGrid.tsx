'use client'

import { useState } from 'react'
import ArticleCard from '@/components/ArticleCard'
import type { ArticleMeta } from '@/lib/articles'

/**
 * Renders a capped page of articles with a load-more control.
 *
 * The listing pages rendered every article at once, which is what made them
 * about 14 screens tall on a phone.
 */
export default function LoadMoreGrid({
  articles,
  pageSize = 9,
  label = 'articles',
}: {
  articles: ArticleMeta[]
  pageSize?: number
  label?: string
}) {
  const [shown, setShown] = useState(pageSize)
  const visible = articles.slice(0, shown)
  const remaining = articles.length - visible.length

  return (
    <>
      <div className="grid-articles">
        {visible.map(article => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>

      {remaining > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '28px' }}>
          <button
            type="button"
            onClick={() => setShown(n => n + pageSize)}
            style={{
              background: 'var(--navy)',
              color: 'white',
              border: 'none',
              borderRadius: '100px',
              padding: '13px 30px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'var(--font-sans), system-ui, sans-serif',
            }}
          >
            Show {Math.min(pageSize, remaining)} more {label}
            <span style={{ opacity: 0.6, marginLeft: '8px' }}>{remaining} left</span>
          </button>
        </div>
      )}
    </>
  )
}

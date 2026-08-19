'use client'

import { useState, useMemo } from 'react'
import EmptyState from '@/components/EmptyState'
import LoadMoreGrid from '@/components/LoadMoreGrid'
import BackToTop from '@/components/BackToTop'
import type { ArticleMeta, Pillar, ArticleFormat } from '@/lib/articles'

interface ArticleFiltersProps {
  articles: ArticleMeta[]
}

const pillarOptions: { value: Pillar | 'all'; label: string }[] = [
  { value: 'all',       label: 'All' },
  { value: 'motion',    label: 'Motion' },
  { value: 'nutrition', label: 'Nutrition' },
  { value: 'recovery',  label: 'Recovery' },
  { value: 'mindset',   label: 'Mindset' },
]

const formatOptions: { value: ArticleFormat | 'all'; label: string }[] = [
  { value: 'all',       label: 'All formats' },
  { value: 'guide',     label: 'Guide' },
  { value: 'protocol',  label: 'Protocol' },
  { value: 'myth-bust', label: 'Myth-bust' },
  { value: 'review',    label: 'Review' },
  { value: 'checklist', label: 'Checklist' },
]

export default function ArticleFilters({ articles }: ArticleFiltersProps) {
  const [selectedPillar, setSelectedPillar] = useState<Pillar | 'all'>('all')
  const [selectedFormat, setSelectedFormat] = useState<ArticleFormat | 'all'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'editors'>('newest')
  // Collapsed by default on mobile only. CSS forces the panel open on desktop,
  // where 13 chips plus a sort control fit without burying the first article.
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = [...articles]

    if (selectedPillar !== 'all') {
      result = result.filter(a => a.pillar === selectedPillar)
    }
    if (selectedFormat !== 'all') {
      result = result.filter(a => a.format === selectedFormat)
    }

    if (sortBy === 'editors') {
      result = [
        ...result.filter(a => a.featured),
        ...result.filter(a => !a.featured),
      ]
    } else {
      result = result.sort((a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
    }

    return result
  }, [articles, selectedPillar, selectedFormat, sortBy])

  function reset() {
    setSelectedPillar('all')
    setSelectedFormat('all')
    setSortBy('newest')
  }

  const hasActiveFilters = selectedPillar !== 'all' || selectedFormat !== 'all'

  return (
    <div>
      <BackToTop />

      {/* Sticky bar: result count, and the filter toggle on mobile */}
      <div className="listing-stickybar">
        <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
          Showing {filtered.length} of {articles.length} articles
        </span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={reset}
              style={{ fontSize: '13px', color: 'var(--blue-mid)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, fontFamily: 'DM Sans, sans-serif', padding: 0 }}
            >
              Reset
            </button>
          )}
          <button
            type="button"
            className="listing-stickybar__toggle"
            aria-expanded={filtersOpen}
            aria-controls="article-filters"
            onClick={() => setFiltersOpen(o => !o)}
          >
            Filters{hasActiveFilters ? ' ·' : ''}
            <span aria-hidden style={{ marginLeft: '6px' }}>{filtersOpen ? '▲' : '▼'}</span>
          </button>
        </div>
      </div>

      {/* Filter controls */}
      <div
        id="article-filters"
        className={`listing-filters${filtersOpen ? ' is-open' : ''}`}
        style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        {/* Pillar row + sort */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {pillarOptions.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSelectedPillar(value)}
                style={{
                  padding: '7px 18px',
                  borderRadius: '100px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: 'none',
                  fontFamily: 'DM Sans, sans-serif',
                  background: selectedPillar === value ? 'var(--navy)' : 'var(--sand)',
                  color: selectedPillar === value ? 'white' : '#444440',
                  transition: 'background 0.15s, color 0.15s',
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'newest' | 'editors')}
            style={{
              padding: '7px 14px',
              borderRadius: '100px',
              fontSize: '16px',
              border: '1px solid var(--sand)',
              background: 'var(--warm)',
              color: '#444440',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              outline: 'none',
            }}
          >
            <option value="newest">Newest first</option>
            <option value="editors">Editor&apos;s picks first</option>
          </select>
        </div>

        {/* Format row */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {formatOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setSelectedFormat(value)}
              style={{
                padding: '6px 16px',
                borderRadius: '100px',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                border: '1px solid',
                fontFamily: 'DM Sans, sans-serif',
                borderColor: selectedFormat === value ? 'var(--navy)' : 'var(--sand)',
                background: selectedFormat === value ? 'var(--navy)' : 'transparent',
                color: selectedFormat === value ? 'white' : 'var(--muted)',
                transition: 'background 0.15s, color 0.15s, border-color 0.15s',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Article grid */}
      {filtered.length === 0 ? (
        <EmptyState
          heading="No articles match these filters."
          message="Try a different pillar or format combination."
          action={{ label: 'Reset filters', onClick: reset }}
          icon="🔍"
        />
      ) : (
        <LoadMoreGrid articles={filtered} pageSize={9} />
      )}
    </div>
  )
}

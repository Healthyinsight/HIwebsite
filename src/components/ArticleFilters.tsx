'use client'

import { useState, useMemo } from 'react'
import ArticleCard from '@/components/ArticleCard'
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
      {/* Filter controls */}
      <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
              fontSize: '13px',
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
                color: selectedFormat === value ? 'white' : '#8A8A80',
                transition: 'background 0.15s, color 0.15s, border-color 0.15s',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <span style={{ fontSize: '13px', color: '#8A8A80', fontWeight: 300 }}>
          Showing {filtered.length} of {articles.length} articles
        </span>
        {hasActiveFilters && (
          <button
            onClick={reset}
            style={{ fontSize: '13px', color: 'var(--blue-mid)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, fontFamily: 'DM Sans, sans-serif', padding: 0 }}
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Article grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <p style={{ fontSize: '15px', color: '#8A8A80', marginBottom: '16px', fontWeight: 300 }}>
            No articles match these filters.
          </p>
          <button
            onClick={reset}
            style={{ background: 'var(--navy)', color: 'white', border: 'none', borderRadius: '100px', padding: '10px 24px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid-three">
          {filtered.map(article => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      )}
    </div>
  )
}

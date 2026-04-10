import Footer from '@/components/Footer'
import TrailProgress from '@/components/TrailProgress'
import { trails, getTrailById } from '@/lib/trails'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return trails
    .filter(t => !t.comingSoon)
    .map(t => ({ trailId: t.id }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ trailId: string }> }
): Promise<Metadata> {
  const { trailId } = await params
  const trail = getTrailById(trailId)
  if (!trail) return {}
  return {
    title: `${trail.name} — Learning Trail`,
    description: trail.description,
  }
}

const PILLAR_GRADIENTS: Record<string, string> = {
  recovery: 'linear-gradient(135deg, #0F2A3F 0%, #1A4D6E 100%)',
  motion:   'linear-gradient(135deg, #1A3A2A 0%, #1E5C3A 100%)',
  nutrition:'linear-gradient(135deg, #3A2A10 0%, #6B4A1C 100%)',
  mindset:  'linear-gradient(135deg, #2A1A3A 0%, #4A2D6E 100%)',
}

export default async function TrailPage(
  { params }: { params: Promise<{ trailId: string }> }
) {
  const { trailId } = await params
  const trail = getTrailById(trailId)
  if (!trail || trail.comingSoon) notFound()

  const gradient = PILLAR_GRADIENTS[trail.pillar] ?? PILLAR_GRADIENTS.recovery
  const totalIQ = trail.steps.reduce((sum, s) => {
    const pts: Record<number, number> = { 1: 5, 2: 8, 3: 10, 4: 15, 5: 20 }
    return sum + (pts[s.level] ?? 5)
  }, 0) + 25 // +25 trail complete bonus

  return (
    <>
      <main>
        {/* Hero */}
        <section className="section-pad" style={{ background: gradient }}>
          <div className="container" style={{ maxWidth: '680px' }}>
            <Link href="/trails" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', marginBottom: '20px' }}>
              ← All Trails
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '32px', lineHeight: 1 }}>{trail.badge.emoji}</span>
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                {trail.pillar} trail · {trail.steps.length} articles · up to {totalIQ} IQ
              </span>
            </div>
            <h1 className="heading-hero" style={{ fontFamily: 'DM Serif Display, serif', fontWeight: 400, color: 'white', letterSpacing: '-0.5px', marginBottom: '12px' }}>
              {trail.name}
            </h1>
            <p style={{ fontSize: 'clamp(14px, 2.5vw, 17px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, fontWeight: 300, maxWidth: '520px', margin: 0 }}>
              {trail.description}
            </p>
          </div>
        </section>

        {/* Progress + steps */}
        <section className="section-pad" style={{ background: 'var(--warm)' }}>
          <div className="container" style={{ maxWidth: '640px' }}>
            <TrailProgress trail={trail} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

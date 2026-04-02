import PillarListing from '@/components/PillarListing'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Motion',
  description: 'Evidence-based articles on training, cardio, and performance.',
}

export default function MotionPage() {
  return <PillarListing pillar="motion" title="Motion" />
}

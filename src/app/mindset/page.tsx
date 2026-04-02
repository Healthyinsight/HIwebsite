import PillarListing from '@/components/PillarListing'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mindset',
  description: 'Evidence-based articles on mindset and mental performance.',
}

export default function MindsetPage() {
  return <PillarListing pillar="mindset" title="Mindset" />
}

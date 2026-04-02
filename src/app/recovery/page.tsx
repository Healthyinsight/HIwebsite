import PillarListing from '@/components/PillarListing'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recovery',
  description: 'Evidence-based articles on sleep, recovery, and adaptation.',
}

export default function RecoveryPage() {
  return <PillarListing pillar="recovery" title="Recovery" />
}

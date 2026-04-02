import PillarListing from '@/components/PillarListing'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nutrition',
  description: 'Evidence-based articles on fueling and nutrition strategy.',
}

export default function NutritionPage() {
  return <PillarListing pillar="nutrition" title="Nutrition" />
}

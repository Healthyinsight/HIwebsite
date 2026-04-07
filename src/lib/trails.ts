import type { Pillar } from './articles'

export interface TrailStep {
  slug: string
  level: number
  title: string
  readingTime: string
  beehiivUrl: string
}

export interface Trail {
  id: string
  pillar: Pillar
  name: string
  tagline: string
  description: string
  steps: TrailStep[]
  badge: {
    emoji: string
    label: string
  }
  comingSoon?: boolean
}

export const trails: Trail[] = [
  {
    id: 'recovery',
    pillar: 'recovery',
    name: 'The Sleep Stack',
    tagline: 'Master recovery from the ground up',
    description: 'Sleep is the highest-leverage intervention in all of health and performance. This trail takes you from the fundamentals of sleep science to the advanced protocols used by elite athletes.',
    badge: { emoji: '🛌', label: 'Sleep Scientist' },
    steps: [
      {
        slug: 'sleep-for-performance',
        level: 1,
        title: 'Sleep for Performance',
        readingTime: '13 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/sleep-for-performance',
      },
      {
        slug: 'sleep-and-recovery-guide-for-athletes',
        level: 2,
        title: 'Sleep and Recovery: A Guide for Athletes',
        readingTime: '21 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/sleep-and-recovery-a-guide-for-athletes',
      },
      {
        slug: 'fitness-recovery-what-works',
        level: 2,
        title: 'Fitness Recovery: What Works vs What\'s Hype',
        readingTime: '11 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/fitness-recovery-what-works-vs-what-s-hype',
      },
      {
        slug: 'sleep-quality-optimization',
        level: 4,
        title: 'Sleep Quality Optimization: Beyond Duration',
        readingTime: '19 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/sleep-quality-optimization-beyond-duration',
      },
      {
        slug: 'sleep-extension-performance-protocols',
        level: 5,
        title: 'Sleep Extension and Performance Protocols',
        readingTime: '30 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/sleep-extension-performance-protocols-a-deep-dive',
      },
    ],
  },
  {
    id: 'motion',
    pillar: 'motion',
    name: 'Build Your Engine',
    tagline: 'From strength foundations to elite aerobic capacity',
    description: 'Movement is medicine — but only if it\'s the right dose. This trail builds your physical engine systematically, from beginner strength training to the physiology underpinning elite aerobic performance.',
    badge: { emoji: '⚡', label: 'Engine Builder' },
    steps: [
      {
        slug: 'strength-training-for-beginners',
        level: 1,
        title: 'Strength Training for Beginners',
        readingTime: '20 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/strength-training-for-beginners',
      },
      {
        slug: 'zone-2-reality-check',
        level: 2,
        title: 'Zone 2 Reality Check',
        readingTime: '8 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/zone-2-reality-check-the-myth-buster-checklist',
      },
      {
        slug: 'how-to-improve-vo2max-12-week-plan',
        level: 2,
        title: 'How to Improve Your VO2 Max: The 12-Week Plan',
        readingTime: '11 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/how-to-improve-your-vo2-max-the-12-week-plan-e1ac',
      },
      {
        slug: 'intermediate-strength-training',
        level: 3,
        title: 'Intermediate Strength Training',
        readingTime: '16 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/intermediate-strength-training-optimize-your-training-variables',
      },
      {
        slug: 'vo2max-physiological-mechanisms',
        level: 4,
        title: 'VO2 Max: Physiological Mechanisms',
        readingTime: '22 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/vo2-max-physiological-mechanisms-research-frontiers',
      },
    ],
  },
  {
    id: 'nutrition',
    pillar: 'nutrition',
    name: 'Fuel the Machine',
    tagline: 'Evidence-based nutrition for performance',
    description: 'More articles coming soon.',
    badge: { emoji: '🥗', label: 'Nutrition Strategist' },
    comingSoon: true,
    steps: [],
  },
  {
    id: 'mindset',
    pillar: 'mindset',
    name: 'The Performance Mind',
    tagline: 'Psychology of high performance',
    description: 'More articles coming soon.',
    badge: { emoji: '🧠', label: 'Mental Edge' },
    comingSoon: true,
    steps: [],
  },
]

export function getTrailById(id: string): Trail | undefined {
  return trails.find(t => t.id === id)
}

export function getActiveTrails(): Trail[] {
  return trails.filter(t => !t.comingSoon)
}

// Evidence IQ points per article level
const IQ_POINTS: Record<number, number> = { 1: 5, 2: 8, 3: 10, 4: 15, 5: 20 }
const TRAIL_COMPLETE_BONUS = 25

export function calcEvidenceIQ(completedSlugs: string[]): number {
  const slugSet = new Set(completedSlugs)
  const counted = new Set<string>()
  let total = 0

  // Points per unique article
  for (const trail of trails) {
    for (const step of trail.steps) {
      if (slugSet.has(step.slug) && !counted.has(step.slug)) {
        total += IQ_POINTS[step.level] ?? 5
        counted.add(step.slug)
      }
    }
  }

  // Trail completion bonuses
  for (const trail of trails) {
    if (trail.comingSoon || trail.steps.length === 0) continue
    if (trail.steps.every(s => slugSet.has(s.slug))) {
      total += TRAIL_COMPLETE_BONUS
    }
  }

  return total
}

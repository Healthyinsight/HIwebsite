import type { Pillar } from './articles'

export interface TrailQuizOption {
  label: string
  correct?: boolean
}

export interface TrailQuizQuestion {
  question: string
  options: TrailQuizOption[]
  explanation: string // shown only after correct answer
}

export interface TrailStep {
  slug: string
  level: number
  title: string
  readingTime: string
  beehiivUrl: string
  quiz?: TrailQuizQuestion
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
        quiz: {
          question: 'What is the evidence-based sleep duration target for most adults?',
          options: [
            { label: 'Less than 6 hours' },
            { label: '6 to 7 hours' },
            { label: '7 to 9 hours', correct: true },
            { label: 'More than 10 hours' },
          ],
          explanation: 'Research consistently shows 7–9 hours is optimal for most adults. Athletes often need the upper end of that range to support full recovery and adaptation.',
        },
      },
      {
        slug: 'sleep-and-recovery-guide-for-athletes',
        level: 2,
        title: 'Sleep and Recovery: A Guide for Athletes',
        readingTime: '21 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/sleep-and-recovery-a-guide-for-athletes',
        quiz: {
          question: 'During which sleep stage is approximately 70% of daily growth hormone released?',
          options: [
            { label: 'REM sleep' },
            { label: 'Slow-wave (deep) sleep', correct: true },
            { label: 'Light sleep (N1/N2)' },
            { label: 'The transition between sleep stages' },
          ],
          explanation: 'Slow-wave sleep drives the majority of HGH release — critical for muscle protein synthesis and tissue repair. This is why cutting sleep short undermines recovery so dramatically.',
        },
      },
      {
        slug: 'fitness-recovery-what-works',
        level: 2,
        title: "Fitness Recovery: What Works vs What's Hype",
        readingTime: '11 min',
        beehiivUrl: "https://www.healthyinsight.eu/p/fitness-recovery-what-works-vs-what-s-hype",
        quiz: {
          question: 'According to the evidence hierarchy of recovery interventions, which comes first?',
          options: [
            { label: 'Ice baths' },
            { label: 'Compression garments' },
            { label: 'Sleep', correct: true },
            { label: 'Massage' },
          ],
          explanation: 'Sleep is the single highest-leverage recovery tool — no gadget or intervention comes close. Most recovery tools sit in tier 3 or 4 of the evidence hierarchy.',
        },
      },
      {
        slug: 'sleep-quality-optimization',
        level: 4,
        title: 'Sleep Quality Optimization: Beyond Duration',
        readingTime: '19 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/sleep-quality-optimization-beyond-duration',
        quiz: {
          question: 'Which environmental factor has the most robust evidence for improving sleep architecture?',
          options: [
            { label: 'White noise machines' },
            { label: 'Temperature regulation', correct: true },
            { label: 'Aromatherapy (lavender)' },
            { label: 'Blue-light blocking glasses' },
          ],
          explanation: 'A cool sleeping environment (~18°C / 65°F) is among the most well-replicated sleep quality interventions. Core body temperature must drop to initiate and maintain deep sleep.',
        },
      },
      {
        slug: 'sleep-extension-performance-protocols',
        level: 5,
        title: 'Sleep Extension and Performance Protocols',
        readingTime: '30 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/sleep-extension-performance-protocols-a-deep-dive',
        quiz: {
          question: 'In the Stanford basketball sleep extension study, which performance metric improved most significantly?',
          options: [
            { label: 'Three-point shooting percentage' },
            { label: 'Sprint times', correct: true },
            { label: 'Jump height' },
            { label: 'Free throw attempts per game' },
          ],
          explanation: 'Sprint times improved significantly alongside reaction time and mood. The study extended sleep to 10 hours — showing performance benefits are achievable even for athletes who believe they sleep "enough".',
        },
      },
    ],
  },
  {
    id: 'motion',
    pillar: 'motion',
    name: 'Build Your Engine',
    tagline: 'From strength foundations to elite aerobic capacity',
    description: "Movement is medicine — but only if it's the right dose. This trail builds your physical engine systematically, from beginner strength training to the physiology underpinning elite aerobic performance.",
    badge: { emoji: '⚡', label: 'Engine Builder' },
    steps: [
      {
        slug: 'strength-training-for-beginners',
        level: 1,
        title: 'Strength Training for Beginners',
        readingTime: '20 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/strength-training-for-beginners',
        quiz: {
          question: 'How many strength training sessions per week is optimal for beginners?',
          options: [
            { label: '1 session' },
            { label: '2–3 sessions', correct: true },
            { label: '4–5 sessions' },
            { label: 'Daily sessions' },
          ],
          explanation: 'Research shows 2–3 sessions per week is optimal for beginners. More frequent training does not produce faster gains and increases injury risk before movement patterns are established.',
        },
      },
      {
        slug: 'zone-2-reality-check',
        level: 2,
        title: 'Zone 2 Reality Check',
        readingTime: '8 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/zone-2-reality-check-the-myth-buster-checklist',
        quiz: {
          question: 'What is the most reliable low-tech method to confirm you are in Zone 2?',
          options: [
            { label: 'Feeling warm and sweating steadily' },
            { label: 'Heart rate staying below 140 bpm' },
            { label: 'Able to speak in full sentences, slightly labored', correct: true },
            { label: 'Breathing only through the nose' },
          ],
          explanation: 'The "talk test" — full sentences with mild effort — is a research-supported Zone 2 marker. Generic HR formulas are imprecise; metabolic state, not pace or HR, defines Zone 2.',
        },
      },
      {
        slug: 'how-to-improve-vo2max-12-week-plan',
        level: 2,
        title: 'How to Improve Your VO2 Max: The 12-Week Plan',
        readingTime: '11 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/how-to-improve-your-vo2-max-the-12-week-plan-e1ac',
        quiz: {
          question: 'What intensity distribution does the evidence support for improving VO2 max?',
          options: [
            { label: '50% easy, 50% high-intensity' },
            { label: '80% easy (Zone 2), 20% high-intensity', correct: true },
            { label: '100% high-intensity intervals' },
            { label: '60% moderate, 40% high-intensity' },
          ],
          explanation: 'The polarized 80/20 approach — 80% Zone 2, 20% high-intensity — is well-supported for VO2 max gains. Moderate-intensity "grey zone" training produces fatigue without the adaptation stimulus of hard intervals.',
        },
      },
      {
        slug: 'intermediate-strength-training',
        level: 3,
        title: 'Intermediate Strength Training',
        readingTime: '16 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/intermediate-strength-training-optimize-your-training-variables',
        quiz: {
          question: 'What is the primary mechanism driving continued strength gains beyond beginner adaptations?',
          options: [
            { label: 'Muscle soreness signalling repair' },
            { label: 'Progressive overload', correct: true },
            { label: 'Frequently changing exercises' },
            { label: 'Extending rest periods between sets' },
          ],
          explanation: 'Progressive overload — systematically increasing the demand on muscles over time — is the only mechanism that drives continued gains once neural adaptations plateau. More volume, load, or density are the levers.',
        },
      },
      {
        slug: 'vo2max-physiological-mechanisms',
        level: 4,
        title: 'VO2 Max: Physiological Mechanisms',
        readingTime: '22 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/vo2-max-physiological-mechanisms-research-frontiers',
        quiz: {
          question: 'What primarily limits VO2 max in trained endurance athletes?',
          options: [
            { label: 'Lung capacity and oxygen diffusion' },
            { label: 'Blood lactate clearance rate' },
            { label: 'Cardiac output (stroke volume × heart rate)', correct: true },
            { label: 'Skeletal muscle mitochondrial density' },
          ],
          explanation: 'In trained athletes, VO2 max is primarily limited by central cardiovascular factors — specifically stroke volume. The lungs and muscles are rarely the bottleneck; the heart\'s ability to pump oxygenated blood is.',
        },
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

// HIQ (Health IQ) points per article level
const IQ_POINTS: Record<number, number> = { 1: 5, 2: 8, 3: 10, 4: 15, 5: 20 }
const TRAIL_COMPLETE_BONUS = 25

export function calcHealthIQ(completedSlugs: string[]): number {
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

export { IQ_POINTS }

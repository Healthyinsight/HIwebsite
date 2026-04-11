import type { Pillar } from './articles'

export interface TrailStep {
  slug: string              // empty string '' for comingSoon steps
  level: number
  title: string
  readingTime: string       // empty string '' for comingSoon steps
  beehiivUrl: string        // empty string '' for articles never on Beehiiv or comingSoon steps
  comingSoon?: boolean
  evidenceIQPoints?: number // read IQ earned on completion
  quizPoints?: number       // quiz IQ earned on passing
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
  // ─── 1. Sleep Science Trail ───────────────────────────────────────────────
  {
    id: 'sleepScience',
    pillar: 'recovery',
    name: 'Sleep Science Trail',
    tagline: 'From sleep basics to elite recovery protocols',
    description: 'Sleep is the highest-leverage intervention in all of health and performance. This trail takes you from the fundamentals of sleep science to the advanced protocols used by elite athletes.',
    badge: { emoji: '🛌', label: 'Sleep Scientist' },
    steps: [
      {
        slug: 'sleep-for-performance',
        level: 1,
        title: 'Sleep for Performance',
        readingTime: '13 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/sleep-for-performance',
        evidenceIQPoints: 50,
        quizPoints: 25,
      },
      {
        slug: 'sleep-and-recovery-guide-for-athletes',
        level: 2,
        title: 'Sleep and Recovery: A Guide for Athletes',
        readingTime: '21 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/sleep-and-recovery-a-guide-for-athletes',
        evidenceIQPoints: 60,
        quizPoints: 35,
      },
      {
        slug: 'sleep-quality-optimization',
        level: 3,
        title: 'Sleep Quality Optimization: Beyond Duration',
        readingTime: '19 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/sleep-quality-optimization-beyond-duration',
        evidenceIQPoints: 75,
        quizPoints: 50,
      },
      {
        slug: 'managing-sleep-around-competition',
        level: 4,
        title: 'Managing Sleep Around Competition and Travel',
        readingTime: '13 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/managing-sleep-around-competition-travel',
        evidenceIQPoints: 90,
        quizPoints: 60,
      },
      {
        slug: 'sleep-extension-performance-protocols',
        level: 5,
        title: 'Sleep Extension and Performance Protocols',
        readingTime: '30 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/sleep-extension-performance-protocols-a-deep-dive',
        evidenceIQPoints: 100,
        quizPoints: 75,
      },
    ],
  },

  // ─── 2. VO₂ Max Mastery Trail ─────────────────────────────────────────────
  {
    id: 'vo2maxMastery',
    pillar: 'motion',
    name: 'VO₂ Max Mastery Trail',
    tagline: 'Understand and improve your aerobic ceiling',
    description: 'VO₂ max is the single best predictor of both endurance performance and long-term health. This trail goes from the foundational why to advanced training protocols that move the needle.',
    badge: { emoji: '🫁', label: 'VO₂ Max Specialist' },
    steps: [
      {
        slug: '',
        level: 1,
        title: 'VO₂ Max: Why This Number?',
        readingTime: '',
        beehiivUrl: '',
        comingSoon: true,
      },
      {
        slug: 'how-to-improve-vo2max-12-week-plan',
        level: 2,
        title: 'How to Improve Your VO₂ Max: The 12-Week Plan',
        readingTime: '11 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/how-to-improve-your-vo2-max-the-12-week-plan-e1ac',
        evidenceIQPoints: 60,
        quizPoints: 35,
      },
      {
        slug: 'vo2max-training-advanced-protocols',
        level: 3,
        title: 'VO₂ Max Training: Advanced Protocols and Periodization',
        readingTime: '16 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/vo2-max-training-advanced-protocols-periodization',
        evidenceIQPoints: 75,
        quizPoints: 50,
      },
      {
        slug: 'vo2max-physiological-mechanisms',
        level: 4,
        title: 'VO₂ Max: Physiological Mechanisms',
        readingTime: '22 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/vo2-max-physiological-mechanisms-research-frontiers',
        evidenceIQPoints: 90,
        quizPoints: 60,
      },
    ],
  },

  // ─── 3. Strength Mastery Trail ────────────────────────────────────────────
  {
    id: 'strengthMastery',
    pillar: 'motion',
    name: 'Strength Mastery Trail',
    tagline: 'Build strength the right way, from day one',
    description: 'Strength training is the most evidence-backed intervention for performance, longevity, and body composition. This trail builds your foundation then teaches you how to keep progressing.',
    badge: { emoji: '💪', label: 'Strength Specialist' },
    steps: [
      {
        slug: 'strength-training-for-beginners',
        level: 1,
        title: 'Strength Training for Beginners',
        readingTime: '20 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/strength-training-for-beginners',
        evidenceIQPoints: 50,
        quizPoints: 25,
      },
      {
        slug: '',
        level: 2,
        title: 'Strength Progression: 5 Steps',
        readingTime: '',
        beehiivUrl: '',
        comingSoon: true,
      },
      {
        slug: 'intermediate-strength-training',
        level: 3,
        title: 'Intermediate Strength Training: Optimize Your Training Variables',
        readingTime: '16 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/intermediate-strength-training-optimize-your-training-variables',
        evidenceIQPoints: 75,
        quizPoints: 50,
      },
    ],
  },

  // ─── 4. Running Progression Trail ────────────────────────────────────────
  {
    id: 'runningProgression',
    pillar: 'motion',
    name: 'Running Progression Trail',
    tagline: 'Build durability and speed the right way',
    description: 'Running is one of the most accessible and effective forms of exercise — but injury rates are high. This trail gives you the evidence on building a durable running base and supporting it with strength.',
    badge: { emoji: '🏃', label: 'Running Specialist' },
    steps: [
      {
        slug: '',
        level: 2,
        title: 'Build Your Running Base',
        readingTime: '',
        beehiivUrl: '',
        comingSoon: true,
      },
      {
        slug: 'strength-for-runners',
        level: 2,
        title: 'Strength for Runners: 5 Exercises for Running Economy and Durability',
        readingTime: '11 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/strength-for-runners-5-exercises-for-running-economy-and-durability',
        evidenceIQPoints: 60,
        quizPoints: 35,
      },
    ],
  },

  // ─── 5. Fueling Mastery Trail ─────────────────────────────────────────────
  {
    id: 'fuelingMastery',
    pillar: 'nutrition',
    name: 'Fueling Mastery Trail',
    tagline: 'Evidence-based nutrition for performance',
    description: 'What you eat — and when — has a measurable impact on performance, recovery, and body composition. This trail cuts through the noise with evidence-based guidance on fueling for sport.',
    badge: { emoji: '🥗', label: 'Nutrition Strategist' },
    steps: [
      {
        slug: 'fuel-during-training',
        level: 1,
        title: 'Fuel During Training: When You Need Carbs and How to Avoid Energy Crashes',
        readingTime: '13 min',
        beehiivUrl: 'https://www.healthyinsight.eu/p/fuel-during-training-when-you-need-carbs-and-how-to-avoid-energy-crashes',
        evidenceIQPoints: 50,
        quizPoints: 25,
      },
    ],
  },

  // ─── 6. Goal Setting Mastery Trail (coming soon) ──────────────────────────
  {
    id: 'goalSettingMastery',
    pillar: 'mindset',
    name: 'Goal Setting Mastery Trail',
    tagline: 'The psychology of sustainable change',
    description: 'Evidence-based strategies for setting and achieving goals that actually last. Articles coming soon.',
    badge: { emoji: '🧠', label: 'Mental Edge' },
    comingSoon: true,
    steps: [
      {
        slug: '',
        level: 2,
        title: 'Set Goals That Last',
        readingTime: '',
        beehiivUrl: '',
        comingSoon: true,
      },
    ],
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getTrailById(id: string): Trail | undefined {
  return trails.find(t => t.id === id)
}

export function getActiveTrails(): Trail[] {
  return trails.filter(t => !t.comingSoon)
}

/** Returns the trail and step index for a given article slug, or undefined if not in a trail. */
export function getTrailForArticle(slug: string): { trail: Trail; stepIndex: number } | undefined {
  for (const trail of trails) {
    const index = trail.steps.findIndex(s => s.slug === slug && !s.comingSoon)
    if (index !== -1) return { trail, stepIndex: index }
  }
  return undefined
}

// ─── Evidence IQ point scale ─────────────────────────────────────────────────

/** Read IQ points awarded per article level */
export const IQ_POINTS: Record<number, number> = {
  1: 50,
  2: 60,
  3: 75,
  4: 90,
  5: 100,
}

/** Quiz IQ points awarded per article level (on ≥70% pass) */
export const QUIZ_POINTS: Record<number, number> = {
  1: 25,
  2: 35,
  3: 50,
  4: 60,
  5: 75,
}

export const TRAIL_COMPLETE_BONUS = 200
export const MASTERBADGE_BONUS = 500

/**
 * Calculates total Evidence IQ from completed article slugs.
 * Uses step.evidenceIQPoints if set, else falls back to IQ_POINTS[level].
 * Trail completion bonuses are added when all active (non-comingSoon) steps are done.
 */
export function calcEvidenceIQ(completedSlugs: string[]): number {
  const slugSet = new Set(completedSlugs)
  const counted = new Set<string>()
  let total = 0

  // Points per unique completed article (skip comingSoon placeholder steps)
  for (const trail of trails) {
    for (const step of trail.steps) {
      if (!step.slug || step.comingSoon) continue
      if (slugSet.has(step.slug) && !counted.has(step.slug)) {
        total += step.evidenceIQPoints ?? IQ_POINTS[step.level] ?? 50
        counted.add(step.slug)
      }
    }
  }

  // Trail completion bonuses — only when all active steps are done
  for (const trail of trails) {
    if (trail.comingSoon) continue
    const activeSteps = trail.steps.filter(s => !s.comingSoon && s.slug)
    if (activeSteps.length === 0) continue
    if (activeSteps.every(s => slugSet.has(s.slug))) {
      total += TRAIL_COMPLETE_BONUS
    }
  }

  return total
}

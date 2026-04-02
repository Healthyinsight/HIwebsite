export type Pillar = 'motion' | 'nutrition' | 'recovery' | 'mindset'

export interface ArticleMeta {
  slug: string
  title: string
  excerpt: string
  pillar: Pillar
  level?: number
  readingTime: string
  publishedAt: string
  beehiivUrl: string
}

export const articles: ArticleMeta[] = [
  {
    slug: 'fuel-during-training',
    title: 'Fuel During Training: When You Need Carbs and How to Avoid Energy Crashes',
    excerpt: 'The evidence on intra-workout nutrition. When carbohydrates actually matter, and when they don\'t.',
    pillar: 'nutrition',
    readingTime: '13 min',
    publishedAt: '2026-03-01',
    beehiivUrl: 'https://www.healthyinsight.eu/p/fuel-during-training-when-you-need-carbs-and-how-to-avoid-energy-crashes',
  },
  {
    slug: 'fitness-recovery-what-works',
    title: 'Fitness Recovery: What Works vs What\'s Hype',
    excerpt: 'The evidence points to a clear recovery order. Sleep. Fuel. Load. Stress. Tools. Most "recovery hacks" sit lower than you might think.',
    pillar: 'recovery',
    level: 2,
    readingTime: '11 min',
    publishedAt: '2025-12-22',
    beehiivUrl: 'https://www.healthyinsight.eu/p/fitness-recovery-what-works-vs-what-s-hype',
  },
  {
    slug: 'intermediate-strength-training',
    title: 'Intermediate Strength Training: Optimize Your Training Variables',
    excerpt: 'Once the basics are solid, the variables that drive further progress become more nuanced. Evidence-based guidance for the intermediate lifter.',
    pillar: 'motion',
    level: 3,
    readingTime: '16 min',
    publishedAt: '2025-12-14',
    beehiivUrl: 'https://www.healthyinsight.eu/p/intermediate-strength-training-optimize-your-training-variables',
  },
  {
    slug: 'sleep-extension-performance-protocols',
    title: 'Sleep Extension and Performance Protocols: A Deep Dive',
    excerpt: 'The science of sleep extension for athletes. What the Stanford basketball study actually showed and how to apply it.',
    pillar: 'recovery',
    level: 5,
    readingTime: '30 min',
    publishedAt: '2025-12-13',
    beehiivUrl: 'https://www.healthyinsight.eu/p/sleep-extension-performance-protocols-a-deep-dive',
  },
  {
    slug: 'managing-sleep-around-competition',
    title: 'Managing Sleep Around Competition and Travel',
    excerpt: 'Travel disrupts sleep. Competition nerves disrupt sleep. Here\'s what the evidence says about managing both.',
    pillar: 'recovery',
    level: 3,
    readingTime: '13 min',
    publishedAt: '2025-12-11',
    beehiivUrl: 'https://www.healthyinsight.eu/p/managing-sleep-around-competition-travel',
  },
  {
    slug: 'sleep-quality-optimization',
    title: 'Sleep Quality Optimization: Beyond Duration',
    excerpt: 'Seven hours of poor sleep isn\'t equivalent to seven hours of quality sleep. The evidence on what actually improves sleep architecture.',
    pillar: 'recovery',
    level: 4,
    readingTime: '19 min',
    publishedAt: '2025-12-07',
    beehiivUrl: 'https://www.healthyinsight.eu/p/sleep-quality-optimization-beyond-duration',
  },
  {
    slug: 'sleep-and-recovery-guide-for-athletes',
    title: 'Sleep and Recovery: A Guide for Athletes',
    excerpt: 'A comprehensive guide to the relationship between sleep and athletic recovery. What changes during sleep, and why it matters for performance.',
    pillar: 'recovery',
    level: 2,
    readingTime: '21 min',
    publishedAt: '2025-12-03',
    beehiivUrl: 'https://www.healthyinsight.eu/p/sleep-and-recovery-a-guide-for-athletes',
  },
  {
    slug: 'sleep-for-performance',
    title: 'Sleep for Performance',
    excerpt: 'Discover why 7-9 hours of sleep is critical for athletic performance. Evidence-based strategies to optimize sleep and boost recovery.',
    pillar: 'recovery',
    level: 1,
    readingTime: '13 min',
    publishedAt: '2025-12-03',
    beehiivUrl: 'https://www.healthyinsight.eu/p/sleep-for-performance',
  },
  {
    slug: 'strength-training-for-beginners',
    title: 'Strength Training for Beginners',
    excerpt: 'Evidence-based foundations for building strength. Volume, intensity, frequency, and progression — what the research actually shows for beginners.',
    pillar: 'motion',
    level: 1,
    readingTime: '20 min',
    publishedAt: '2025-11-12',
    beehiivUrl: 'https://www.healthyinsight.eu/p/strength-training-for-beginners',
  },
  {
    slug: 'strength-for-runners',
    title: 'Strength for Runners: 5 Exercises for Running Economy and Durability',
    excerpt: 'Strength training makes you a better runner. The evidence on which exercises actually improve running economy and reduce injury risk.',
    pillar: 'motion',
    level: 2,
    readingTime: '11 min',
    publishedAt: '2025-11-06',
    beehiivUrl: 'https://www.healthyinsight.eu/p/strength-for-runners-5-exercises-for-running-economy-and-durability',
  },
  {
    slug: 'zone-2-reality-check',
    title: 'Zone 2 Reality Check: The Myth-Buster Checklist',
    excerpt: 'Everyone talks about Zone 2. Most people don\'t actually train in it. A research-backed checklist to verify your Zone 2 training is what you think it is.',
    pillar: 'motion',
    level: 2,
    readingTime: '8 min',
    publishedAt: '2025-11-05',
    beehiivUrl: 'https://www.healthyinsight.eu/p/zone-2-reality-check-the-myth-buster-checklist',
  },
  {
    slug: 'vo2max-physiological-mechanisms',
    title: 'VO2 Max: Physiological Mechanisms and Research Frontiers',
    excerpt: 'A deep dive into the physiology of VO2 max. What limits it, how it adapts, and what cutting-edge research reveals about its ceiling.',
    pillar: 'motion',
    level: 4,
    readingTime: '22 min',
    publishedAt: '2025-10-29',
    beehiivUrl: 'https://www.healthyinsight.eu/p/vo2-max-physiological-mechanisms-research-frontiers',
  },
  {
    slug: 'vo2max-training-advanced-protocols',
    title: 'VO2 Max Training: Advanced Protocols and Periodization',
    excerpt: 'Advanced interval structures, block periodization, and how to sequence VO2 max training within a full program.',
    pillar: 'motion',
    level: 4,
    readingTime: '16 min',
    publishedAt: '2025-10-28',
    beehiivUrl: 'https://www.healthyinsight.eu/p/vo2-max-training-advanced-protocols-periodization',
  },
  {
    slug: 'how-to-improve-vo2max-12-week-plan',
    title: 'How to Improve Your VO2 Max: The 12-Week Plan',
    excerpt: 'A structured 12-week plan to meaningfully improve your VO2 max. Built on the evidence for training frequency, intensity distribution, and progression.',
    pillar: 'motion',
    level: 2,
    readingTime: '11 min',
    publishedAt: '2025-10-20',
    beehiivUrl: 'https://www.healthyinsight.eu/p/how-to-improve-your-vo2-max-the-12-week-plan-e1ac',
  },
]

export function getArticlesByPillar(pillar: Pillar) {
  return articles.filter(a => a.pillar === pillar)
}

export function getLatestArticles(count = 6) {
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count)
}

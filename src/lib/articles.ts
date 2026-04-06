export type Pillar = 'motion' | 'nutrition' | 'recovery' | 'mindset'
export type ArticleFormat = 'guide' | 'protocol' | 'myth-bust' | 'review' | 'checklist'

export interface ArticleMeta {
  slug: string
  title: string
  excerpt: string
  pillar: Pillar
  format: ArticleFormat
  level?: number
  readingTime: string
  publishedAt: string
  beehiivUrl: string
  featured?: boolean
  tldr?: string[]
  evidenceStrength?: 'strong' | 'mixed' | 'early'
  evidenceNote?: string
}

export const articles: ArticleMeta[] = [
  {
    slug: 'fuel-during-training',
    title: 'Fuel During Training: When You Need Carbs and How to Avoid Energy Crashes',
    excerpt: 'The evidence on intra-workout nutrition. When carbohydrates actually matter, and when they don\'t.',
    pillar: 'nutrition',
    format: 'guide',
    readingTime: '13 min',
    publishedAt: '2026-03-01',
    beehiivUrl: 'https://www.healthyinsight.eu/p/fuel-during-training-when-you-need-carbs-and-how-to-avoid-energy-crashes',
    featured: true,
    evidenceStrength: 'strong',
    evidenceNote: 'Multiple RCTs confirm carbohydrate timing benefits for sessions over 60 minutes; shorter sessions show no significant benefit.',
    tldr: [
      'Carbohydrates during training only meaningfully help sessions lasting 60+ minutes.',
      'For sessions under 60 min, water is sufficient for most people.',
      'Aim for 30–60g of fast-digesting carbs per hour during long efforts.',
      'Protein intake during training does not improve performance but aids recovery.',
      'Experiment in training — never try new fueling strategies on race day.',
    ],
  },
  {
    slug: 'fitness-recovery-what-works',
    title: 'Fitness Recovery: What Works vs What\'s Hype',
    excerpt: 'The evidence points to a clear recovery order. Sleep. Fuel. Load. Stress. Tools. Most "recovery hacks" sit lower than you might think.',
    pillar: 'recovery',
    format: 'review',
    level: 2,
    readingTime: '11 min',
    publishedAt: '2025-12-22',
    beehiivUrl: 'https://www.healthyinsight.eu/p/fitness-recovery-what-works-vs-what-s-hype',
    evidenceStrength: 'strong',
    evidenceNote: 'Hierarchy of recovery interventions is well-supported; gadget-based tools (ice baths, compression) show modest and inconsistent effects.',
    tldr: [
      'Sleep is the single highest-leverage recovery tool — no gadget comes close.',
      'Fueling within 2 hours post-session meaningfully accelerates muscle repair.',
      'Training load management prevents the fatigue that recovery tools try to fix.',
      'Ice baths blunt adaptation when used after strength sessions — use sparingly.',
      'Most recovery gadgets are tier-4 tools, not tier-1.',
    ],
  },
  {
    slug: 'intermediate-strength-training',
    title: 'Intermediate Strength Training: Optimize Your Training Variables',
    excerpt: 'Once the basics are solid, the variables that drive further progress become more nuanced. Evidence-based guidance for the intermediate lifter.',
    pillar: 'motion',
    format: 'guide',
    level: 3,
    readingTime: '16 min',
    publishedAt: '2025-12-14',
    beehiivUrl: 'https://www.healthyinsight.eu/p/intermediate-strength-training-optimize-your-training-variables',
    evidenceStrength: 'strong',
    evidenceNote: 'Progressive overload and volume manipulation are among the most replicated findings in strength training research.',
  },
  {
    slug: 'sleep-extension-performance-protocols',
    title: 'Sleep Extension and Performance Protocols: A Deep Dive',
    excerpt: 'The science of sleep extension for athletes. What the Stanford basketball study actually showed and how to apply it.',
    pillar: 'recovery',
    format: 'protocol',
    level: 5,
    readingTime: '30 min',
    publishedAt: '2025-12-13',
    beehiivUrl: 'https://www.healthyinsight.eu/p/sleep-extension-performance-protocols-a-deep-dive',
    evidenceStrength: 'mixed',
    evidenceNote: 'The Stanford basketball study is compelling but small (n=11). Replication across sports and populations is limited.',
    tldr: [
      'Sleep extension (9–10 hrs) improved sprint times, reaction time, and mood in the Stanford study.',
      'Benefits are most pronounced for athletes currently sleeping under 8 hours.',
      'Even 30 minutes of additional sleep produces measurable performance improvements.',
      'Consistent schedule matters as much as total duration.',
      'Napping (20–30 min) can partially compensate for short nights before competition.',
    ],
  },
  {
    slug: 'managing-sleep-around-competition',
    title: 'Managing Sleep Around Competition and Travel',
    excerpt: 'Travel disrupts sleep. Competition nerves disrupt sleep. Here\'s what the evidence says about managing both.',
    pillar: 'recovery',
    format: 'guide',
    level: 3,
    readingTime: '13 min',
    publishedAt: '2025-12-11',
    beehiivUrl: 'https://www.healthyinsight.eu/p/managing-sleep-around-competition-travel',
    evidenceStrength: 'mixed',
    evidenceNote: 'Competition-eve sleep disruption is well-documented; intervention strategies have less rigorous evidence but are widely applied.',
  },
  {
    slug: 'sleep-quality-optimization',
    title: 'Sleep Quality Optimization: Beyond Duration',
    excerpt: 'Seven hours of poor sleep isn\'t equivalent to seven hours of quality sleep. The evidence on what actually improves sleep architecture.',
    pillar: 'recovery',
    format: 'guide',
    level: 4,
    readingTime: '19 min',
    publishedAt: '2025-12-07',
    beehiivUrl: 'https://www.healthyinsight.eu/p/sleep-quality-optimization-beyond-duration',
    evidenceStrength: 'strong',
    evidenceNote: 'Sleep architecture research is robust; interventions like temperature, light, and timing are well-replicated across large cohorts.',
  },
  {
    slug: 'sleep-and-recovery-guide-for-athletes',
    title: 'Sleep and Recovery: A Guide for Athletes',
    excerpt: 'A comprehensive guide to the relationship between sleep and athletic recovery. What changes during sleep, and why it matters for performance.',
    pillar: 'recovery',
    format: 'guide',
    level: 2,
    readingTime: '21 min',
    publishedAt: '2025-12-03',
    beehiivUrl: 'https://www.healthyinsight.eu/p/sleep-and-recovery-a-guide-for-athletes',
    featured: true,
    evidenceStrength: 'strong',
    evidenceNote: 'Sleep\'s role in muscle protein synthesis and HGH release is among the most replicated findings in sports science.',
    tldr: [
      'Slow-wave sleep is when 70% of daily growth hormone is released — critical for muscle repair.',
      'Sleep deprivation increases cortisol and decreases testosterone measurably.',
      'Athletes need 8–10 hours; recreational exercisers benefit from at least 7–8.',
      'REM sleep consolidates motor skill learning — especially relevant after learning new movements.',
      'Alcohol disrupts REM sleep even when it doesn\'t shorten total sleep time.',
    ],
  },
  {
    slug: 'sleep-for-performance',
    title: 'Sleep for Performance',
    excerpt: 'Discover why 7-9 hours of sleep is critical for athletic performance. Evidence-based strategies to optimize sleep and boost recovery.',
    pillar: 'recovery',
    format: 'guide',
    level: 1,
    readingTime: '13 min',
    publishedAt: '2025-12-03',
    beehiivUrl: 'https://www.healthyinsight.eu/p/sleep-for-performance',
    evidenceStrength: 'strong',
    evidenceNote: 'The relationship between sleep duration and performance is one of the most robust in sports science.',
    tldr: [
      '7–9 hours is the evidence-based target for most adults; athletes likely need the upper end.',
      'Sleep debt accumulates — you cannot fully recover from a week of short nights in one weekend.',
      'Consistent wake time is more important than consistent bedtime.',
      'Cool, dark, and quiet: the three environmental factors with the most evidence.',
      'Avoid caffeine within 6 hours of sleep — its half-life is longer than most people think.',
    ],
  },
  {
    slug: 'strength-training-for-beginners',
    title: 'Strength Training for Beginners',
    excerpt: 'Evidence-based foundations for building strength. Volume, intensity, frequency, and progression — what the research actually shows for beginners.',
    pillar: 'motion',
    format: 'guide',
    level: 1,
    readingTime: '20 min',
    publishedAt: '2025-11-12',
    beehiivUrl: 'https://www.healthyinsight.eu/p/strength-training-for-beginners',
    featured: true,
    evidenceStrength: 'strong',
    evidenceNote: 'Beginner adaptations to resistance training are among the most studied phenomena in exercise science, with very consistent findings.',
    tldr: [
      'Beginners gain strength faster than anyone else — the "newbie gains" are real and well-documented.',
      '2–3 sessions per week is optimal for beginners; more doesn\'t mean faster progress.',
      'Focus on compound movements (squat, deadlift, press, row) for maximum return on time.',
      'Progressive overload — adding reps or weight over time — is the only mechanism that drives continued gains.',
      'Technique first: a lighter weight with good form builds strength faster than heavy weight with poor form.',
    ],
  },
  {
    slug: 'strength-for-runners',
    title: 'Strength for Runners: 5 Exercises for Running Economy and Durability',
    excerpt: 'Strength training makes you a better runner. The evidence on which exercises actually improve running economy and reduce injury risk.',
    pillar: 'motion',
    format: 'protocol',
    level: 2,
    readingTime: '11 min',
    publishedAt: '2025-11-06',
    beehiivUrl: 'https://www.healthyinsight.eu/p/strength-for-runners-5-exercises-for-running-economy-and-durability',
    evidenceStrength: 'strong',
    evidenceNote: 'Heavy strength training improving running economy is well-replicated; the 5 exercises are chosen based on biomechanical specificity to running.',
    tldr: [
      'Heavy strength training (≥80% 1RM) improves running economy by 2–8% in trained runners.',
      'The 5 key exercises: single-leg press, Romanian deadlift, hip thrust, calf raise, step-up.',
      '2× per week is sufficient — more does not produce additional running economy gains.',
      'Plyometric work (box jumps, bounding) complements heavy lifting for stiffness and speed.',
      'Gains appear within 6–10 weeks; most studies run 8–12 weeks to show significant effects.',
    ],
  },
  {
    slug: 'zone-2-reality-check',
    title: 'Zone 2 Reality Check: The Myth-Buster Checklist',
    excerpt: 'Everyone talks about Zone 2. Most people don\'t actually train in it. A research-backed checklist to verify your Zone 2 training is what you think it is.',
    pillar: 'motion',
    format: 'myth-bust',
    level: 2,
    readingTime: '8 min',
    publishedAt: '2025-11-05',
    beehiivUrl: 'https://www.healthyinsight.eu/p/zone-2-reality-check-the-myth-buster-checklist',
    evidenceStrength: 'strong',
    evidenceNote: 'Zone 2 training benefits are well-established; the common misconceptions addressed here are directly contradicted by lactate threshold research.',
    tldr: [
      'True Zone 2 is harder than most people think — many train at Zone 3 while believing it\'s Zone 2.',
      'The "talk test" (full sentences, slightly labored) is a reliable low-tech Zone 2 marker.',
      'Heart rate zones vary by individual — generic %HRmax formulas are imprecise.',
      '80% of your training volume should be Zone 2 (polarized model) for endurance athletes.',
      'Zone 2 is not slow: it\'s specific. Pace is irrelevant; metabolic state is what matters.',
    ],
  },
  {
    slug: 'vo2max-physiological-mechanisms',
    title: 'VO2 Max: Physiological Mechanisms and Research Frontiers',
    excerpt: 'A deep dive into the physiology of VO2 max. What limits it, how it adapts, and what cutting-edge research reveals about its ceiling.',
    pillar: 'motion',
    format: 'review',
    level: 4,
    readingTime: '22 min',
    publishedAt: '2025-10-29',
    beehiivUrl: 'https://www.healthyinsight.eu/p/vo2-max-physiological-mechanisms-research-frontiers',
    evidenceStrength: 'strong',
    evidenceNote: 'The central vs. peripheral limitation debate is well-researched; stroke volume and mitochondrial density data are from large, replicated studies.',
  },
  {
    slug: 'vo2max-training-advanced-protocols',
    title: 'VO2 Max Training: Advanced Protocols and Periodization',
    excerpt: 'Advanced interval structures, block periodization, and how to sequence VO2 max training within a full program.',
    pillar: 'motion',
    format: 'protocol',
    level: 4,
    readingTime: '16 min',
    publishedAt: '2025-10-28',
    beehiivUrl: 'https://www.healthyinsight.eu/p/vo2-max-training-advanced-protocols-periodization',
    evidenceStrength: 'mixed',
    evidenceNote: 'Interval structures are well-studied; optimal periodization sequencing has fewer RCTs and more observational data from elite sport.',
  },
  {
    slug: 'how-to-improve-vo2max-12-week-plan',
    title: 'How to Improve Your VO2 Max: The 12-Week Plan',
    excerpt: 'A structured 12-week plan to meaningfully improve your VO2 max. Built on the evidence for training frequency, intensity distribution, and progression.',
    pillar: 'motion',
    format: 'protocol',
    level: 2,
    readingTime: '11 min',
    publishedAt: '2025-10-20',
    beehiivUrl: 'https://www.healthyinsight.eu/p/how-to-improve-your-vo2-max-the-12-week-plan-e1ac',
    featured: true,
    evidenceStrength: 'strong',
    evidenceNote: 'VO2 max improvements of 5–15% over 12 weeks are well-documented with the polarized training approach used in this plan.',
    tldr: [
      'VO2 max can improve 5–15% in 12 weeks with the right training structure.',
      'Use 80/20: 80% easy aerobic work (Zone 2), 20% high-intensity intervals (Zone 4–5).',
      'The key interval session: 4–6 × 4 minutes at 90–95% HRmax with equal recovery.',
      'Consistency beats intensity — missing sessions loses more than reducing intensity.',
      'Test at week 0, 6, and 12 to track progress (time trial or lab test).',
    ],
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

export function getArticlesByFormat(format: ArticleFormat) {
  return articles.filter(a => a.format === format)
}

export function getFeaturedArticles() {
  return articles.filter(a => a.featured === true)
}

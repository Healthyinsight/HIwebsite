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
  featured?: boolean
  tldr?: string[]
  evidenceStrength?: 'strong' | 'mixed' | 'early'
  evidenceNote?: string
  /**
   * Canonical full article on the publication host. Used when local MDX is missing or empty.
   * Set explicitly to override the default `https://healthyinsight.beehiiv.com/articles/{slug}`.
   */
  externalArticleUrl?: string
}

// TODO (Fas 4): Pull automatically from Notion Research Library DB via API
export const TOTAL_SOURCES = 75 // Manually synced from Notion Research Library DB. Update when new sources are added.

const PUBLICATION_ARCHIVE_BASE = 'https://healthyinsight.beehiiv.com/articles' as const

const articleSeeds: ArticleMeta[] = [
  {
    slug: 'fuel-during-training',
    title: 'Fuel During Training: When You Need Carbs and How to Avoid Energy Crashes',
    excerpt: 'The evidence on intra-workout nutrition. When carbohydrates actually matter, and when they don\'t.',
    pillar: 'nutrition',
    format: 'guide',
    readingTime: '13 min',
    publishedAt: '2026-03-01',
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
    evidenceStrength: 'strong',
    evidenceNote: 'Progressive overload and volume manipulation are among the most replicated findings in strength training research.',
  },
  {
    slug: 'advanced-strength-programming-blocks-fatigue-deloads',
    title: 'Advanced Strength Programming: Blocks, Fatigue, and Deloads',
    excerpt:
      'Block periodization, fatigue signals, and proactive deloads: how to organize training so volume builds capacity, intensity expresses strength, and you peak instead of burning out.',
    pillar: 'motion',
    format: 'guide',
    level: 4,
    readingTime: '11 min',
    publishedAt: '2025-12-19',
    evidenceStrength: 'mixed',
    evidenceNote:
      'Block structure and deloads are standard in applied strength coaching; optimal sequencing for every individual has less RCT evidence than foundational overload principles.',
    tldr: [
      'Match exercise selection to the competition lift and your weakest link—then protect quality on those lifts.',
      'Run accumulation → intensification → realization blocks, each with one primary job.',
      'Track a few fatigue signals (performance, bar speed, soreness, sleep, readiness)—when several drift, adjust.',
      'Deload proactively (~40–50% fewer sets or reduced load) before performance collapses.',
      'Progress one variable per block (load, reps, or sets) so you know what worked.',
    ],
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
    evidenceStrength: 'strong',
    evidenceNote: 'Sleep architecture research is robust; interventions like temperature, light, and timing are well-replicated across large cohorts.',
  },
  {
    slug: 'sleep-and-recovery-guide-for-athletes',
    title: 'Sleep and Recovery: A Guide for Athletes',
    excerpt:
      'Practical sleep strategies for athletes: managing training schedules, travel, competition stress, and recovery monitoring.',
    pillar: 'recovery',
    format: 'guide',
    level: 2,
    readingTime: '15 min',
    publishedAt: '2025-12-14',
    evidenceStrength: 'mixed',
    evidenceNote:
      'Caffeine timing, light exposure, and training scheduling are well supported; jet lag tactics and wearable/HRV rules blend consensus guidance with smaller or field-based evidence.',
    tldr: [
      'Set a caffeine cutoff about 8–9 hours before bed and watch hidden caffeine in pre-workouts.',
      'Protect sleep by avoiding late high-intensity sessions when you can; midday training often pairs best with sleep quality.',
      'For travel, shift sleep gradually pre-flight and use morning vs evening light strategically after arrival.',
      'Pre-competition: keep the week stable; sleep quality across the prior 2–3 nights matters more than only the night before.',
      'Use overnight HRV as a trend against a rolling baseline — not nightly tracker perfectionism.',
      'When napping, ~20 minutes is usually the safest default; the 30–60 minute window is often the groggiest.',
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
    slug: 'strength-progression-5-steps-to-sustainable-gains',
    title: 'Strength Progression: 5 Steps to Sustainable Gains',
    excerpt:
      'How to progress load, reps, and sets without burning out: one progression lane at a time, RIR on big lifts, simple logging, and proactive deloads.',
    pillar: 'motion',
    format: 'guide',
    level: 2,
    readingTime: '14 min',
    publishedAt: '2025-11-18',
    evidenceStrength: 'strong',
    evidenceNote:
      'Progressive overload, volume thresholds, and autoregulated effort (RIR) are among the most replicated principles in resistance training research.',
    tldr: [
      'Progress one variable at a time: load or reps—not both in the same week.',
      'On main lifts, leave ~2–4 reps in reserve most of the time for sustainable gains.',
      'Aim for ~12–20 sets per muscle group per week across 3–4 sessions.',
      'Deload every 4–6 weeks or when recovery signals slip (~40–50% volume cut or ~30% load reduction).',
      'Log sets × reps × load (plus RIR) so you know what actually moved the needle.',
    ],
  },
  {
    slug: 'build-your-running-base-8-12-weeks-to-sustainable-speed',
    title: 'Build Your Running Base: 8–12 Weeks to Sustainable Speed',
    excerpt:
      'Build a strong aerobic base in 8–12 weeks with the right mix of low-intensity running, strength work, and recovery.',
    pillar: 'motion',
    format: 'guide',
    level: 1,
    readingTime: '14 min',
    publishedAt: '2025-10-14',
    evidenceStrength: 'strong',
    evidenceNote:
      'Polarized intensity distribution, conservative volume progression, and heavy strength training for runners are well supported in systematic reviews and cohort data.',
    tldr: [
      'Keep ~80% of running easy (Zone 1–2); use true quality sparingly for the remaining ~20%.',
      'Progress total weekly volume by about 10% per week; deload every 4th week (~20–30% less time).',
      'Two full-body strength sessions weekly support economy and injury resilience.',
      'After 8–12 weeks, you can shift slightly toward VO₂-style intervals while keeping one long easy run.',
      'Prioritize 7–9 hours sleep—adaptation happens in recovery, not only in the session.',
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
    evidenceStrength: 'mixed',
    evidenceNote: 'Interval structures are well-studied; optimal periodization sequencing has fewer RCTs and more observational data from elite sport.',
  },
  {
    slug: 'vo2-max-why-this-number-predicts-longevity',
    title: 'VO₂ Max: Why This Number Predicts How Long You\'ll Live',
    excerpt:
      'What VO₂ max measures, why it tracks longevity and performance, and how to start improving it with simple cardio and one weekly hard session.',
    pillar: 'motion',
    format: 'guide',
    level: 1,
    readingTime: '9 min',
    publishedAt: '2025-10-20',
    evidenceStrength: 'strong',
    evidenceNote:
      'Cardiorespiratory fitness and mortality links are supported by very large meta-analyses and cohorts; effect sizes depend on fitness classification and confounding adjustment.',
    tldr: [
      'VO₂ max reflects how much oxygen you can use during hard effort — a practical marker of heart–lung–muscle fitness.',
      'Higher fitness is consistently associated with lower all-cause mortality in population studies.',
      'Most beginners can raise VO₂ max meaningfully within weeks by combining mostly easy aerobic work with a small dose of hard intervals.',
      'You can start without lab testing: build a repeatable easy baseline, then add one interval session per week.',
      'Small improvements add up; consistency matters more than gadget precision.',
    ],
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
  {
    slug: 'set-goals-that-last-smart-goals-lasting-motivation',
    title: 'Set Goals That Last: A Guide to SMART Goals and Lasting Motivation',
    excerpt:
      'Build sustainable habits with evidence-based goal-setting strategies that work long-term.',
    pillar: 'mindset',
    format: 'guide',
    level: 2,
    readingTime: '15 min',
    publishedAt: '2025-10-06',
    evidenceStrength: 'strong',
    evidenceNote:
      'Implementation intentions and SMART-style specificity are supported by large meta-analyses and goal-setting theory; exact adherence percentages vary by population and measurement.',
    tldr: [
      'Pair one outcome goal with two concrete process goals you control day to day.',
      'Make process goals SMART, then add if–then plans for likely obstacles.',
      'Track weekly process completion (aim for ~80%+) and review for small tweaks—not wholesale resets.',
      'Celebrate completed sessions; identity-based framing (“I am a runner”) helps you return after misses.',
      'Give a new structure at least ~4 weeks before major changes—habits form on a long tail.',
    ],
  },
]

export const articles: ArticleMeta[] = articleSeeds.map(article => ({
  ...article,
  externalArticleUrl:
    article.externalArticleUrl ?? `${PUBLICATION_ARCHIVE_BASE}/${article.slug}`,
}))

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

// ── Dynamic MDX helpers (used by next-mdx-remote v6 integration) ─────────────

export function getAllArticles(): ArticleMeta[] {
  return articles
}

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return articles.find(a => a.slug === slug)
}

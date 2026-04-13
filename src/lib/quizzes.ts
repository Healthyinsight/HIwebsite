/**
 * Quiz question bank keyed by article slug.
 *
 * QUIZ_BY_SLUG[slug] returns the 3 questions for that article.
 * If a slug is absent, ArticleProgressSection renders a "Quiz coming soon"
 * state and awards 0 points — no fallback to another article's questions.
 *
 * All questions require 100% correct answers to pass (PASS_THRESHOLD = 1.0
 * in MicroQuiz). Add new slugs here as articles are written.
 */

export type Question = {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export const QUIZ_BY_SLUG: Record<string, Question[]> = {
  // ── The Sleep Stack ──────────────────────────────────────────────────────

  'sleep-for-performance': [
    {
      question: 'How many hours of sleep does the international consensus recommend for adult athletes?',
      options: ['5–6 hours', '6–7 hours', '7–9 hours', '10+ hours'],
      correctIndex: 2,
      explanation:
        'A panel of 24 sleep researchers reviewed over 1,000 studies and recommends 7–9 hours per night for adult athletes — with most needing the upper end.',
    },
    {
      question:
        'In the Stanford basketball sleep extension study, how much did sprint times improve when players slept 10 hours per night?',
      options: ['No change', 'About 0.7 seconds', 'About 2 seconds', 'About 5 seconds'],
      correctIndex: 1,
      explanation:
        'When Stanford basketball players extended sleep to 10 hours/night for 5–7 weeks, sprint times improved by 0.7 seconds and shooting accuracy went up by 9%.',
    },
    {
      question: 'Why should you cut caffeine after roughly 2 PM if you want quality sleep?',
      options: [
        'Caffeine increases REM sleep',
        'Caffeine has a 5–6 hour half-life, so it is still active at bedtime',
        'Caffeine raises melatonin too early',
        'Caffeine blocks growth hormone release',
      ],
      correctIndex: 1,
      explanation:
        'Caffeine has a 5–6 hour half-life. A 4 PM coffee leaves roughly half the dose active at 10 PM, reducing deep sleep quality even if you fall asleep fine.',
    },
  ],

  'sleep-and-recovery-guide-for-athletes': [
    {
      question: 'Which sleep stage is most critical for physical recovery and muscle repair?',
      options: ['Stage 1 (light sleep)', 'Stage 2 (light sleep)', 'Slow-wave (deep) sleep', 'REM sleep'],
      correctIndex: 2,
      explanation:
        'Slow-wave sleep drives the largest pulse of growth hormone release, making it the primary window for tissue repair and physical recovery in athletes.',
    },
    {
      question: 'What is "sleep debt" and why does it matter for athletes?',
      options: [
        'A minor inconvenience that only affects beginners',
        'Accumulated sleep deficit that impairs reaction time and recovery — even when athletes feel adapted to it',
        'Only relevant for endurance athletes',
        'Sleep debt cannot affect performance if nutrition is optimal',
      ],
      correctIndex: 1,
      explanation:
        'Sleep debt is cumulative. Research shows athletes feel subjectively "fine" yet show measurable drops in reaction time, force output, and immune function after multiple nights of restricted sleep.',
    },
    {
      question: 'How far in advance should athletes start banking extra sleep before a key competition?',
      options: [
        'The night before only',
        '1–2 days before',
        '1–2 weeks before',
        'Sleep timing before competition makes no difference',
      ],
      correctIndex: 2,
      explanation:
        'Studies on sleep banking show that extending sleep by 1–2 hours per night for 1–2 weeks before competition builds a reserve that buffers against the sleep disruption typical on competition nights.',
    },
  ],

  'sleep-quality-optimization': [
    {
      question:
        'What does research show about blue light exposure in the 2 hours before bed?',
      options: [
        'No measurable effect on sleep onset',
        'It delays melatonin onset by up to 3 hours and reduces REM sleep',
        'It only affects people over 50',
        'Brief exposure (under 15 min) improves sleep depth',
      ],
      correctIndex: 1,
      explanation:
        'Blue light suppresses melatonin via intrinsically photosensitive retinal ganglion cells. Evening exposure can delay melatonin onset by up to 3 hours, reducing total sleep time and REM duration.',
    },
    {
      question: 'What is the evidence-based optimal bedroom temperature for deep sleep?',
      options: [
        '22–24 °C (72–75 °F)',
        '26–28 °C (79–82 °F)',
        '15–19 °C (60–67 °F)',
        'Temperature has no effect on sleep quality',
      ],
      correctIndex: 2,
      explanation:
        'Core body temperature must drop ~1 °C to initiate sleep. A cool room (15–19 °C) accelerates this drop, shortening sleep-onset latency and increasing slow-wave sleep duration.',
    },
    {
      question: 'Which supplement has the strongest evidence for reducing sleep-onset time?',
      options: ['Valerian root', 'Ashwagandha', 'Magnesium glycinate', 'Low-dose melatonin (0.5–1 mg)'],
      correctIndex: 3,
      explanation:
        'Low-dose melatonin (0.5–1 mg taken 30–60 min before bed) has the most robust randomised-trial evidence for shortening sleep-onset latency, particularly when circadian timing is shifted.',
    },
  ],

  // ── Build Your Engine (VO2 max) ───────────────────────────────────────────

  'vo2-max-why-this-number-predicts-longevity': [
    {
      question: 'What does VO2 max measure?',
      options: [
        'Maximum heart rate during a 1-mile run',
        'The maximum rate at which your body can consume and utilise oxygen during maximal effort',
        'The volume of blood pumped per heartbeat',
        'Lung capacity at rest',
      ],
      correctIndex: 1,
      explanation:
        'VO2 max is expressed in mL of oxygen per kg of bodyweight per minute. It reflects the combined capacity of the lungs, heart, blood, and muscles to deliver and use oxygen at peak intensity.',
    },
    {
      question:
        'Compared with the bottom fitness quartile, how much lower is all-cause mortality risk in the top VO2 max quartile?',
      options: [
        'About 10–20% lower',
        'About twice as low',
        'About 4–5× lower',
        'No significant difference after adjusting for diet',
      ],
      correctIndex: 2,
      explanation:
        'Large prospective cohort studies (including the Cleveland Clinic data on 122,000 patients) show that the highest-fitness group has roughly 4–5× lower all-cause mortality than the lowest — a larger effect than most clinical risk factors.',
    },
    {
      question: 'Which training approach is most effective at raising VO2 max?',
      options: [
        'Steady, comfortable daily walks',
        'Heavy strength training (≥85% 1RM)',
        'A combination of HIIT and moderate-intensity zone 2 cardio',
        'Stretching and breath work',
      ],
      correctIndex: 2,
      explanation:
        'Meta-analyses show HIIT produces the largest acute gains in VO2 max by pushing cardiac output and oxygen extraction to their limits, while zone 2 volume builds the aerobic base. Combining both gives the largest long-term improvement.',
    },
  ],

  'how-to-improve-vo2max-12-week-plan': [
    {
      question: 'What is the primary training zone used to build aerobic base volume in a VO2 max programme?',
      options: ['Zone 1 (very easy)', 'Zone 2 (moderate, conversational)', 'Zone 4 (threshold)', 'Zone 5 (maximal)'],
      correctIndex: 1,
      explanation:
        'Zone 2 (roughly 60–70% max HR, where you can hold a full conversation) drives mitochondrial biogenesis and fat oxidation — the aerobic foundation on which higher-intensity work sits.',
    },
    {
      question: 'What does a 4×4 HIIT interval session involve?',
      options: [
        '4 sets of 4 reps of a heavy lift',
        '4 minutes at near-maximal effort followed by 4 minutes of easy recovery, repeated 4 times',
        '4 minutes of running, 4 minutes of rest, for 20 minutes total',
        'A 4-day per week training split',
      ],
      correctIndex: 1,
      explanation:
        'The Norwegian 4×4 protocol (4 min at 90–95% HRmax, 3 min recovery, ×4 rounds) is one of the most studied and effective formats for raising VO2 max, with strong evidence from Wisløff et al.',
    },
    {
      question: 'How quickly can a committed beginner expect a measurable VO2 max improvement?',
      options: ['1–2 days', '1–2 weeks', '4–8 weeks', 'At least 6 months'],
      correctIndex: 2,
      explanation:
        'Most studies show statistically significant VO2 max gains within 4–8 weeks of structured aerobic training. Larger gains accumulate over months and years, but early adaptations are measurable and motivating.',
    },
  ],

  // ── Strength Mastery ─────────────────────────────────────────────────────

  'strength-training-for-beginners': [
    {
      question: 'What primarily drives strength gains in the first 4–8 weeks of training for beginners?',
      options: ['Muscle hypertrophy', 'Increased testosterone', 'Neural adaptations', 'Mitochondrial growth'],
      correctIndex: 2,
      explanation:
        'Early strength gains are predominantly neurological: the brain learns to recruit more motor units, coordinate muscles more efficiently, and inhibit protective mechanisms — before any significant muscle growth occurs.',
    },
    {
      question: 'How many times per week should beginners train each muscle group for optimal strength development?',
      options: ['Once per week', '2–3 times per week', 'Every day', '5–6 times per week'],
      correctIndex: 1,
      explanation:
        'Meta-analyses consistently show that training each muscle group 2–3× per week outperforms once-per-week frequency for beginners, as more frequent practice accelerates the neurological learning process.',
    },
    {
      question: 'What is progressive overload in strength training?',
      options: [
        'Training until exhaustion on every set',
        'Systematically increasing the demand placed on muscles over time — through weight, reps, or volume',
        'Switching exercises every session to confuse muscles',
        'Eating more protein to grow muscles faster',
      ],
      correctIndex: 1,
      explanation:
        'Progressive overload is the foundational principle of strength training: the body adapts to a given stimulus, so you must gradually increase demand (weight, reps, sets, or difficulty) to continue making progress.',
    },
  ],

  'strength-progression-5-steps-to-sustainable-gains': [
    {
      question: 'Which of the following best describes a linear periodisation approach for intermediate lifters?',
      options: [
        'Keeping weight identical every session to build consistency',
        'Increasing load every session in a straight line until progress stalls',
        'Cycling planned heavy, moderate, and light phases over weeks',
        'Changing exercises every workout to prevent adaptation',
      ],
      correctIndex: 1,
      explanation:
        'Linear periodisation adds a small, fixed increment (e.g. 2.5 kg) to the bar each session. It is highly effective for beginners and early intermediates, though progress inevitably slows as you approach genetic potential.',
    },
    {
      question: 'What is a deload week and when is it typically needed?',
      options: [
        'A week off training completely, used every month',
        'A planned reduction in training volume or intensity to allow recovery after accumulated fatigue',
        'A week of bodyweight-only training used by beginners',
        'Deloads are only needed after injury',
      ],
      correctIndex: 1,
      explanation:
        'Deloads (typically every 4–8 weeks) reduce volume or intensity by 30–50%. They allow the nervous system and connective tissue to recover from accumulated fatigue, so you return stronger rather than burning out.',
    },
    {
      question: 'Which rep range has the strongest evidence for maximising muscle hypertrophy?',
      options: ['1–3 reps', '4–6 reps', '6–30 reps (to or near failure)', '40+ reps'],
      correctIndex: 2,
      explanation:
        'A landmark 2017 meta-analysis (Schoenfeld et al.) showed that a wide rep range — roughly 6–30 reps, taken close to failure — produces similar hypertrophy. Load is less critical than proximity to failure and sufficient volume.',
    },
  ],
}

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

  'managing-sleep-around-competition': [
    {
      question: 'Which nights before competition predict performance best, according to the research cited?',
      options: [
        'Only the night immediately before competition',
        'Nights 2–3 before competition',
        'The full week of sleep leading up to competition',
        'Sleep the night of arrival matters most',
      ],
      correctIndex: 1,
      explanation:
        'Research on elite athletes shows sleep 2–3 nights before competition predicts performance better than the night before. Race-night sleep is often disrupted, but its impact is smaller than most athletes fear if prior nights were solid.',
    },
    {
      question: 'Why is eastward travel physiologically harder than westward travel for athletes?',
      options: [
        'Eastward flights are generally longer and more dehydrating',
        'Eastward travel requires a phase advance (earlier sleep), which fights the body\'s natural drift toward later timing',
        'Time zones in the east are more extreme',
        'Westward travel allows more alcohol on the flight',
      ],
      correctIndex: 1,
      explanation:
        'Eastward travel requires advancing your circadian clock (earlier sleep/wake), which opposes the body\'s natural tendency to drift later. Westward travel requires a phase delay, which aligns with that drift — making it easier to adapt.',
    },
    {
      question: 'What is the recommended hotel room temperature for optimal sleep quality?',
      options: [
        '20–22 °C (68–72 °F)',
        '18–20 °C (64–68 °F)',
        '15–17 °C (60–63 °F)',
        'Temperature makes no measurable difference in hotel environments',
      ],
      correctIndex: 2,
      explanation:
        'The article recommends setting room temperature to ~15–17 °C (60–63 °F). Core body temperature must drop to initiate sleep, and a cool room accelerates this drop — reducing first-night disruption in unfamiliar environments.',
    },
  ],

  'sleep-extension-performance-protocols': [
    {
      question: 'In the Stanford basketball sleep extension study, players extended sleep from ~6.7 hours to approximately how many hours per night?',
      options: ['7.5 hours', '8.5 hours', '10 hours', '11 hours'],
      correctIndex: 1,
      explanation:
        'Stanford basketball players extended sleep to ~8.5 hours/night. This produced measurable improvements in sprint times and skill accuracy — demonstrating that performance gains are possible even when athletes are above the minimum 7-hour threshold.',
    },
    {
      question: 'What is the optimal window for a short alertness nap that minimises disruption to nighttime sleep?',
      options: [
        'Right after training, any time of day',
        'Within 2 hours of waking',
        'Between 13:00 and 16:00, at least 6 hours before bedtime',
        'Just before bed, 20 minutes maximum',
      ],
      correctIndex: 2,
      explanation:
        'The 13:00–16:00 window is recommended. A 20–30 minute nap taken 6+ hours before bedtime provides an alertness boost for 2–3 hours with low risk of interfering with nighttime sleep drive.',
    },
    {
      question: 'When implementing sleep extension, why should you increase time in bed via an earlier bedtime rather than sleeping in?',
      options: [
        'Sleeping in is less comfortable',
        'Earlier bedtimes increase melatonin production more than later wake times',
        'Sleeping later disrupts circadian alignment — which can undermine the other benefits of extension',
        'Morning sleep stages are lighter and less restorative than evening stages',
      ],
      correctIndex: 2,
      explanation:
        'The protocol specifically recommends earlier bedtimes to protect circadian alignment. Sleeping in later shifts your clock forward over time, which can create jet-lag-like misalignment — especially problematic around competitions with fixed start times.',
    },
  ],

  // ── Build Your Engine (VO2 max) ───────────────────────────────────────────

  'vo2max-training-advanced-protocols': [
    {
      question: 'What is the key physiological mechanism that makes 30–30 micro-intervals effective at raising VO₂ max?',
      options: [
        'They allow a much higher total training volume per session than 4×4 intervals',
        'Oxygen consumption stays elevated briefly into the recovery, accumulating more time near VO₂ max than expected',
        'They target Zone 2 base fitness more effectively than longer intervals',
        'They are safer for athletes recovering from injury',
      ],
      correctIndex: 1,
      explanation:
        'During 30–30 micro-intervals, oxygen consumption stays elevated briefly into the 30-second recovery period due to oxygen lag. This means you spend more total time near VO₂ max per minute than the work:rest ratio would suggest.',
    },
    {
      question: 'When running 30-second micro-intervals, why should you run by pace/effort rather than heart rate?',
      options: [
        'Heart rate monitors are unreliable during short bursts',
        'Heart rate lags significantly — it won\'t reflect true intensity within a 30-second rep',
        'High heart rates indicate overtraining at this duration',
        'Pace and heart rate are equivalent at VO₂ max intensity',
      ],
      correctIndex: 1,
      explanation:
        'Heart rate lags. In a 30-second rep, your HR hasn\'t risen to reflect actual cardiovascular demand by the time the rep ends. Running by pace or perceived effort is the accurate way to hit the target intensity.',
    },
    {
      question: 'What is the main reason to include a dedicated recovery week in a periodized VO₂ max block?',
      options: [
        'Recovery weeks provide psychological rest from training monotony',
        'The body needs reduced training stress to supercompensate — adaptation happens during recovery, not the training itself',
        'Recovery weeks increase running volume without adding intensity',
        'Recovery weeks are optional add-ons for cautious athletes',
      ],
      correctIndex: 1,
      explanation:
        'The article states directly: "The stimulus is training. The gain is recovery." Skipping recovery weeks is listed as one of the four key mistakes — without a clear recovery window, the body cannot supercompensate from the overload block.',
    },
  ],

  'vo2max-physiological-mechanisms': [
    {
      question: 'In well-trained athletes, what is the most common bottleneck limiting further VO₂ max improvement?',
      options: [
        'Lung capacity and breathing mechanics',
        'Maximum heart rate output',
        'Peripheral adaptations in the muscles — mitochondrial density, capillarization, and oxidative enzyme activity',
        'Blood oxygen saturation at altitude',
      ],
      correctIndex: 2,
      explanation:
        'While early training gains are largely central (cardiac), in well-trained athletes the bottleneck shifts to peripheral machinery: how efficiently muscles extract and use delivered oxygen. More mitochondria, better capillarization, and stronger oxidative enzymes are the levers.',
    },
    {
      question: 'Which cardiac variable is most trainable through endurance training?',
      options: [
        'Maximum heart rate',
        'Stroke volume (the amount of blood pumped per beat)',
        'Resting HRV',
        'Blood pressure at rest',
      ],
      correctIndex: 1,
      explanation:
        'Maximum heart rate is largely genetic and declines with age. Stroke volume is the primary trainable cardiac variable — endurance training increases it through structural remodeling (larger chamber), better filling, and improved contractility.',
    },
    {
      question: 'What is the most practical implication of being a "non-responder" to a specific training protocol?',
      options: [
        'You have low genetic potential and should focus on other fitness goals',
        'High-dose supplements can override genetic limitations in non-responders',
        'Adjusting training variables — intensity distribution, interval structure, frequency, modality, or recovery — often produces a measurable response',
        'Non-responders should restrict training to Zone 2 only',
      ],
      correctIndex: 2,
      explanation:
        'The article emphasizes that "low response to one protocol is not the same as no response to training as a whole." Non-response is a signal to experiment with different training variables, not to stop training.',
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

  'intermediate-strength-training': [
    {
      question: 'What does MRV stand for in intermediate strength programming?',
      options: [
        'Maximum Repetition Volume',
        'Minimum Recommended Volume',
        'Maximum Recoverable Volume — the highest weekly training load you can fully recover from',
        'Muscle Recruitment Value',
      ],
      correctIndex: 2,
      explanation:
        'MRV (Maximum Recoverable Volume) is the highest weekly sets per muscle group that your body can recover from without performance declining. Training above it accumulates fatigue faster than adaptation.',
    },
    {
      question: 'What is the primary goal of the Intensification phase in a 9–12 week block cycle?',
      options: [
        'Maximize training volume and muscle damage',
        'Lower sets and higher intensity to convert accumulated capacity into strength',
        'Test your true one-rep maximum before the next block',
        'Introduce new exercises to prevent accommodation',
      ],
      correctIndex: 1,
      explanation:
        'The Intensification phase follows Accumulation: volume drops, intensity rises (sets of 4–6 reps vs 8–12), and the goal shifts from building work capacity to expressing the strength that capacity enables.',
    },
    {
      question: 'What is the purpose of RPE-based autoregulation in strength training?',
      options: [
        'To replace tracking sets and reps entirely',
        'To ensure you always lift the maximum possible weight',
        'To adjust load or reps so the actual effort matches the intended stimulus, regardless of day-to-day variation',
        'RPE is only useful for competitive powerlifters at elite level',
      ],
      correctIndex: 2,
      explanation:
        'RPE (Rate of Perceived Exertion) lets you hit the target effort — "hard but clean" — even when sleep, stress, or recovery varies. It anchors training to actual readiness rather than a pre-set number on the bar.',
    },
  ],

  'advanced-strength-programming-blocks-fatigue-deloads': [
    {
      question: 'What is the primary purpose of a deload week in advanced strength programming?',
      options: [
        'To practice new exercises at lower risk',
        'To temporarily reduce training stress so accumulated fatigue drops and adaptation shows up in performance',
        'To signal to the body that more muscle tissue is needed',
        'Deloads are mainly psychological — the physical benefit is minor',
      ],
      correctIndex: 1,
      explanation:
        'The article is explicit: deloading is a planned reduction in stress to drop fatigue so adaptation can express itself. It\'s not time off — some intensity is maintained to preserve skill. Skipping deloads until performance collapses is listed as a common mistake.',
    },
    {
      question: 'How many fatigue signals does the article recommend tracking in advanced programming?',
      options: [
        'As many as possible — more data always leads to better decisions',
        'Only HRV (heart rate variability)',
        'A small set of 3–5 reliable indicators',
        'Soreness is the only signal that reliably predicts overtraining',
      ],
      correctIndex: 2,
      explanation:
        'The article recommends tracking 3–5 signals: performance trend, bar speed/rep quality, persistent soreness, sleep quality, and motivation/readiness. If multiple drift the wrong way simultaneously, you adjust — not push through.',
    },
    {
      question: 'Why should you change only one progression variable (load, reps, or sets) per training block?',
      options: [
        'Changing multiple variables simultaneously is physically dangerous',
        'It keeps training fresh and prevents boredom from repetition',
        'Changing everything at once removes the feedback signal — you can\'t tell what actually drove the change',
        'Single-variable progression is required by all major strength methodologies',
      ],
      correctIndex: 2,
      explanation:
        'The article states: "When you change everything at once, you lose the signal." One progression focus per block (add load, or add reps, or add sets) lets you identify what worked and build on it in the next cycle.',
    },
  ],

  // ── Running ──────────────────────────────────────────────────────────────

  'build-your-running-base-8-12-weeks-to-sustainable-speed': [
    {
      question: 'According to the polarized training principle, what percentage of weekly running should be done at easy Zone 1–2 intensity?',
      options: ['20%', '50%', '80%', '100%'],
      correctIndex: 2,
      explanation:
        'The 80/20 rule keeps 80% of running at easy, conversational pace (Zone 1–2) and 20% at hard intensity (Zone 4–5). This builds mitochondrial capacity and aerobic base while limiting cumulative fatigue from the hard sessions.',
    },
    {
      question: 'By how much should total weekly running volume increase each week to stay within safe adaptation limits?',
      options: ['5% maximum', '10% maximum', '20% maximum', 'There is no established weekly limit'],
      correctIndex: 1,
      explanation:
        'Nielsen et al. (2013) tracked 800+ novice runners and found that increasing weekly distance by more than 10% significantly raised injury rates. Tendons and connective tissue adapt slower than cardiovascular fitness, requiring gradual progression.',
    },
    {
      question: 'According to the meta-analysis cited, by approximately how much does regular strength training (2–3× per week) reduce injury risk for runners?',
      options: ['10–15%', '25–35%', '50%', 'No significant effect was found'],
      correctIndex: 2,
      explanation:
        'Balsalobre-Fernández et al. (2016) meta-analyzed 14 studies and found heavy strength training 2–3× per week reduced running injury risk by ~50% and improved running economy by 3–8%, without compromising VO₂ max.',
    },
  ],

  'strength-for-runners': [
    {
      question: 'What minimum load is recommended for strength training to produce running economy improvements in trained runners?',
      options: [
        '30–40% of 1RM (very light, high-rep)',
        '50–60% of 1RM (moderate)',
        'At least 80% of 1RM (heavy loading)',
        'Bodyweight-only exercises are sufficient for runners',
      ],
      correctIndex: 2,
      explanation:
        'The evidence base specifically supports heavy strength training (≥80% 1RM) for improving running economy by 2–8%. Lighter loads don\'t produce the same neuromuscular adaptations that translate into more efficient force transfer through each stride.',
    },
    {
      question: 'How many times per week is strength training recommended for runners to see running economy gains?',
      options: [
        'Once per week',
        'Twice per week',
        'Three to four times per week',
        'Daily, alternating lower and upper body',
      ],
      correctIndex: 1,
      explanation:
        '2× per week is the evidence-based dose for runners. More frequent sessions don\'t produce additional running economy gains and add recovery demand that can interfere with running training quality.',
    },
    {
      question: 'Approximately how many weeks of consistent strength training does it take to produce measurable running economy improvements?',
      options: ['1–2 weeks', '3–4 weeks', '6–10 weeks', 'At least 6 months'],
      correctIndex: 2,
      explanation:
        'Most studies on strength training for running economy run 8–12 weeks, with significant effects emerging around weeks 6–10. The neuromuscular and structural adaptations that improve stride efficiency take several weeks to accumulate.',
    },
  ],

  // ── Nutrition ────────────────────────────────────────────────────────────

  'fuel-during-training': [
    {
      question: 'How much carbohydrate per hour is recommended for a 90-minute moderate-to-hard training session?',
      options: [
        '0 g — stored glycogen is sufficient for sessions under 2 hours',
        '30–60 g per hour',
        '60–90 g per hour',
        '100+ g per hour for maximum performance',
      ],
      correctIndex: 1,
      explanation:
        'A 90-minute session at moderate-to-hard effort falls in the 30–60 g/hour range. This dose has consistent evidence across multiple large reviews and improves performance by slowing glycogen depletion from the start of the session.',
    },
    {
      question: 'Why do sessions over 2.5 hours require a glucose-plus-fructose blend rather than glucose alone?',
      options: [
        'Fructose provides more calories per gram than glucose',
        'Glucose is harder to digest at high doses',
        'Single-source glucose hits an absorption ceiling of ~60 g/hour; fructose uses a separate intestinal pathway, allowing total absorption to reach 90 g/hour',
        'Fructose is uniquely required for muscle glycogen resynthesis',
      ],
      correctIndex: 2,
      explanation:
        'The gut can absorb roughly 60 g/hour from glucose alone. Combining glucose with fructose — which uses a different transporter (GLUT5) — allows total absorption to reach 90 g/hour without increasing GI distress. At lower durations, single-source products are fine.',
    },
    {
      question: 'When should you begin fueling during a session longer than 75 minutes?',
      options: [
        'When you first feel tired or your pace starts dropping',
        'At the halfway point of the session',
        'Within the first 15–20 minutes, before glycogen runs critically low',
        'Only in the final 30 minutes when energy demand peaks',
      ],
      correctIndex: 2,
      explanation:
        'Once glycogen is critically low, you cannot refill fast enough to restore performance — the tank is already dry. Starting within the first 15–20 minutes slows depletion from the outset, which is the entire goal of in-workout fueling.',
    },
  ],

  // ── Mindset ──────────────────────────────────────────────────────────────

  'set-goals-that-last-smart-goals-lasting-motivation': [
    {
      question: 'According to a 2019 study on 267 adults, how much higher was adherence for people who set SMART goals compared to those with vague goals?',
      options: ['10% higher', '39% higher', '100% higher', 'No significant difference was found'],
      correctIndex: 1,
      explanation:
        'Participants who set SMART goals had 39% higher adherence over 6 months. SMART goals eliminate the "I\'ll figure it out later" trap by making the required action specific, measurable, and time-bound.',
    },
    {
      question: 'What are implementation intentions and what effect do they have on goal achievement?',
      options: [
        'Long-term vision statements that increase motivation by 2–3×',
        '"If X then Y" plans that pre-decide your response to obstacles — a meta-analysis of 94 studies found they increase goal achievement by 54% on average',
        'Monthly progress check-ins designed to maintain accountability',
        'Habit-stacking techniques that only work for morning routines',
      ],
      correctIndex: 1,
      explanation:
        'Coined by Peter Gollwitzer, implementation intentions link situational cues to pre-decided actions: "If it\'s raining Tuesday, I\'ll run on the treadmill." The 2006 meta-analysis (n=8,155) found they increased goal achievement by 54%, with the strongest effects when the "if" cue and "then" action were both specific.',
    },
    {
      question: 'On average, how long does research suggest habit formation takes?',
      options: ['21 days', '30 days', '66 days', 'It varies too much for any meaningful average'],
      correctIndex: 2,
      explanation:
        'Research shows habit formation takes 18–254 days depending on complexity, with an average of 66 days. The article recommends giving any goal structure at least 4 weeks before making major changes — and not abandoning plans during the "motivation dip" in Weeks 2–4.',
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

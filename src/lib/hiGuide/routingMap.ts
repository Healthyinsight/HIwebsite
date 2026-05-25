export interface CTA {
  label: string
  href: string
  type: 'trail' | 'quiz' | 'app' | 'article'
}

export interface RoutingEntry {
  id: string
  keywords: string[]
  answer: string
  why: string
  ctas: CTA[]
  safetyDisclaimer?: boolean
}

// Pain/injury keywords — classifier checks these first as a safety override
export const PAIN_KEYWORDS = [
  'pain', 'painful', 'hurts', 'hurt', 'injury', 'injured', 'ache', 'aches',
  'aching', 'sprain', 'strain', 'swelling', 'swollen', 'knee pain', 'back pain',
  'shoulder pain', 'hip pain', 'tendon', 'ligament', 'inflammation',
]

export const QUIZ_FALLBACK_ENTRY: RoutingEntry = {
  id: 'quiz_fallback',
  keywords: [],
  answer:
    "That's a great starting point — and getting the details right means knowing a bit more about where you're starting from. The 5-question Health IQ Quiz takes under 2 minutes and tells us where to focus first across HI's four pillars: motion, recovery, nutrition, and mindset.",
  why: "Without more context, the quiz is the fastest way to route you to the right content.",
  ctas: [
    {
      label: 'Take the 5-Question Health IQ Quiz',
      href: '/quiz',
      type: 'quiz',
    },
  ],
}

export const routingMap: RoutingEntry[] = [
  // ─── Running ───────────────────────────────────────────────────────────────
  {
    id: 'running',
    keywords: [
      'run', 'running', 'jog', 'jogging', '5k', '10k', 'run faster',
      'start running', 'build running', 'running base', 'easy runs',
    ],
    answer:
      "Running is one of the best long-term investments in health and performance — but how you start matters enormously. The most common mistake is ramping up too fast, which is why injury rates in new runners are high. The evidence points to building an aerobic base first: easy, conversational-pace runs over 8–12 weeks before adding speed or volume. HI's Running Progression Trail walks you through this step-by-step.",
    why: "You mentioned running — the Running Progression Trail starts exactly where you should.",
    ctas: [
      { label: 'Start the Running Progression Trail', href: '/trails/runningProgression', type: 'trail' },
      { label: 'Take the Health IQ Quiz', href: '/quiz', type: 'quiz' },
      { label: 'Read: Build Your Running Base', href: '/articles/build-your-running-base-8-12-weeks-to-sustainable-speed', type: 'article' },
    ],
  },

  // ─── Marathon / race ───────────────────────────────────────────────────────
  {
    id: 'marathon',
    keywords: [
      'marathon', 'half marathon', 'race training', 'ultramarathon', 'ultra',
      'trail running', 'triathlon', '10k race', '5k race', 'race day', 'race prep',
    ],
    answer:
      "Race training success comes down to progressive overload, an adequate aerobic base, race-specific work, and recovery. Many recreational runners train too hard too often — injury rates in marathon training hover around 40–50%. The evidence is clear: base first, race-specific intensity second. The Running Progression Trail gives you a structured path from base-building to race-ready.",
    why: "Race training starts with a solid base — the Running Progression Trail is the right place to begin.",
    ctas: [
      { label: 'Start the Running Progression Trail', href: '/trails/runningProgression', type: 'trail' },
      { label: 'Take the Health IQ Quiz', href: '/quiz', type: 'quiz' },
      { label: 'Read: Strength for Runners', href: '/articles/strength-for-runners', type: 'article' },
    ],
  },

  // ─── Sleep ─────────────────────────────────────────────────────────────────
  {
    id: 'sleep',
    keywords: [
      'sleep', 'insomnia', 'wake up tired', 'nap', 'sleep better',
      'sleep quality', 'oversleep', 'cant sleep', "can't sleep",
      'not sleeping', 'sleep schedule', 'bedtime',
    ],
    answer:
      "Sleep is the single highest-leverage intervention in health and performance — it's where adaptation actually happens. Poor sleep blunts training gains, raises injury risk, and impairs cognition. The research is clear: most adults need 7–9 hours, and consistency and sleep environment matter as much as duration. The Sleep Science Trail takes you from the fundamentals to the advanced protocols used by elite athletes.",
    why: "Sleep is your highest-ROI recovery tool — the Sleep Science Trail is the evidence-based entry point.",
    ctas: [
      { label: 'Start the Sleep Science Trail', href: '/trails/sleepScience', type: 'trail' },
      { label: 'Take the Health IQ Quiz', href: '/quiz', type: 'quiz' },
      { label: 'Read: Sleep for Performance', href: '/articles/sleep-for-performance', type: 'article' },
    ],
  },

  // ─── Strength ──────────────────────────────────────────────────────────────
  {
    id: 'strength',
    keywords: [
      'strength', 'weight training', 'lift', 'lifting', 'muscle', 'gym',
      'resistance', 'barbell', 'dumbbell', 'bench press', 'squat', 'deadlift',
      'build muscle', 'get stronger', 'resistance training',
    ],
    answer:
      "Strength training is the most evidence-backed intervention across longevity, body composition, and performance. The key variables are progressive overload, sufficient protein, and recovery between sessions. Beginners can make rapid gains with just 2–3 sessions per week if the fundamentals are right. The Strength Mastery Trail builds from beginner foundations all the way to advanced programming.",
    why: "You mentioned strength training — start with the fundamentals before layering in complexity.",
    ctas: [
      { label: 'Start the Strength Mastery Trail', href: '/trails/strengthMastery', type: 'trail' },
      { label: 'Take the Health IQ Quiz', href: '/quiz', type: 'quiz' },
      { label: 'Read: Strength Training for Beginners', href: '/articles/strength-training-for-beginners', type: 'article' },
    ],
  },

  // ─── VO₂ max / cardio / aerobic ────────────────────────────────────────────
  {
    id: 'vo2max',
    keywords: [
      'vo2max', 'vo2 max', 'aerobic', 'cardio', 'cardiovascular',
      'zone 2', 'heart rate', 'endurance', 'aerobic capacity',
      'fitness level', 'lung capacity', 'aerobic fitness',
    ],
    answer:
      "VO₂ max is the single best predictor of both endurance performance and long-term health — it's worth understanding and improving at any fitness level. Zone 2 training (a pace where you can hold a conversation) builds your aerobic base efficiently. Combining it with VO₂ max intervals gives you the full picture. The VO₂ Max Mastery Trail takes you from 'why does this number matter' to 'how do I move it'.",
    why: "Aerobic capacity is your foundation — the VO₂ Max trail is the right starting point.",
    ctas: [
      { label: 'Start the VO₂ Max Mastery Trail', href: '/trails/vo2maxMastery', type: 'trail' },
      { label: 'Take the Health IQ Quiz', href: '/quiz', type: 'quiz' },
      { label: 'Read: VO₂ Max — Why This Number Predicts How Long You\'ll Live', href: '/articles/vo2-max-why-this-number-predicts-longevity', type: 'article' },
    ],
  },

  // ─── Nutrition / diet ──────────────────────────────────────────────────────
  {
    id: 'nutrition',
    keywords: [
      'nutrition', 'eat', 'eating', 'food', 'diet', 'meal', 'calories',
      'macro', 'macros', 'carbs', 'what to eat', 'healthy eating', 'fuel',
    ],
    answer:
      "Nutrition for health and performance comes down to a few high-leverage principles: adequate protein (1.6–2.2g/kg for active people), enough carbohydrate to fuel training, and eating close to whole food as a foundation. The Fueling Mastery Trail cuts through nutrition noise with evidence-based guidance on what actually moves performance and health metrics.",
    why: "Your question is about nutrition — the Fueling Mastery Trail has the evidence-based answer.",
    ctas: [
      { label: 'Start the Fueling Mastery Trail', href: '/trails/fuelingMastery', type: 'trail' },
      { label: 'Take the Health IQ Quiz', href: '/quiz', type: 'quiz' },
      { label: 'Read: Fuel During Training', href: '/articles/fuel-during-training', type: 'article' },
    ],
  },

  // ─── Protein / supplements ─────────────────────────────────────────────────
  {
    id: 'protein',
    keywords: [
      'protein', 'supplement', 'creatine', 'amino acid', 'whey',
      'bcaa', 'collagen', 'post-workout nutrition', 'pre-workout',
    ],
    answer:
      "Protein is the most evidence-backed nutrition intervention for body composition and performance. The target for active people is 1.6–2.2g per kg of bodyweight daily, spread across meals. Creatine monohydrate is the other supplement with robust, consistent evidence. The Fueling Mastery Trail covers evidence-based nutrition strategy and cuts through supplement noise.",
    why: "Your question is about fueling and supplements — the Fueling Mastery Trail has the evidence-based answer.",
    ctas: [
      { label: 'Start the Fueling Mastery Trail', href: '/trails/fuelingMastery', type: 'trail' },
      { label: 'Take the Health IQ Quiz', href: '/quiz', type: 'quiz' },
    ],
  },

  // ─── Injury / pain (safety) ────────────────────────────────────────────────
  {
    id: 'injury',
    keywords: [
      'pain', 'painful', 'hurts', 'hurt', 'injury', 'injured', 'ache',
      'aches', 'aching', 'sprain', 'strain', 'swelling', 'swollen',
      'knee pain', 'back pain', 'shoulder pain', 'hip pain', 'tendon', 'ligament',
    ],
    answer:
      "Anything involving ongoing pain or a potential injury should be assessed by a qualified physiotherapist or doctor first — no article or guide can replace a hands-on evaluation. Once you have professional clearance, understanding load management and recovery principles can help you return to training smarter. HI's recovery content gives you the evidence-based framework to work with alongside your healthcare provider.",
    why: "Professional assessment comes first — this content gives you the framework to use after you get clearance.",
    ctas: [
      { label: 'Start the Sleep Science Trail', href: '/trails/sleepScience', type: 'trail' },
      { label: 'Take the Health IQ Quiz', href: '/quiz', type: 'quiz' },
      { label: 'Read: Fitness Recovery — What Works vs Hype', href: '/articles/fitness-recovery-guide', type: 'article' },
    ],
    safetyDisclaimer: true,
  },

  // ─── Motivation / habits / goals ───────────────────────────────────────────
  {
    id: 'motivation',
    keywords: [
      'motivation', 'motivat', 'habit', 'habits', 'discipline', 'goal',
      'goals', 'willpower', 'consistency', 'stick with', 'keep going',
      'mindset', 'procrastinat', 'behavior change', 'sustainable',
    ],
    answer:
      "Motivation is unreliable — the evidence points to systems and implementation intentions as more durable drivers of behavior change. Research on SMART goals, habit stacking, and self-determination theory gives us a clear, evidence-based playbook. The Goal Setting Mastery Trail covers the psychology of sustainable change with practical tools you can apply immediately.",
    why: "Your question is about the psychology of change — the Goal Setting Trail is the right path.",
    ctas: [
      { label: 'Start the Goal Setting Mastery Trail', href: '/trails/goalSettingMastery', type: 'trail' },
      { label: 'Take the Health IQ Quiz', href: '/quiz', type: 'quiz' },
      { label: 'Read: Set Goals That Last', href: '/articles/set-goals-that-last-smart-goals-lasting-motivation', type: 'article' },
    ],
  },

  // ─── Stress / anxiety / mental ─────────────────────────────────────────────
  {
    id: 'stress',
    keywords: [
      'stress', 'stressed', 'anxiety', 'anxious', 'burnout',
      'overwhelm', 'overwhelmed', 'focus', 'brain fog', 'mental clarity',
      'mood', 'emotional', 'mental health',
    ],
    answer:
      "Chronic stress has measurable effects on performance, recovery, and health. The evidence-based interventions include consistent sleep, regular physical activity, and cognitive reframing strategies. HI's mindset content covers stress management from a behavioral psychology angle. For significant or persistent stress, combining content-based learning with professional support is the right approach.",
    why: "Your question touches on stress and mindset — the Goal Setting Trail covers evidence-based coping strategies.",
    ctas: [
      { label: 'Start the Goal Setting Mastery Trail', href: '/trails/goalSettingMastery', type: 'trail' },
      { label: 'Take the Health IQ Quiz', href: '/quiz', type: 'quiz' },
    ],
  },

  // ─── Longevity / heart health ──────────────────────────────────────────────
  {
    id: 'longevity',
    keywords: [
      'longevity', 'live longer', 'lifespan', 'healthspan', 'aging',
      'heart health', 'blood pressure', 'cholesterol', 'prevent disease',
      'long term health', 'all-cause mortality',
    ],
    answer:
      "VO₂ max is the single strongest predictor of all-cause mortality in the research literature — stronger than smoking, diabetes, or blood pressure as independent risk factors. Improving your aerobic fitness is arguably the highest-ROI investment you can make for longevity. The VO₂ Max Mastery Trail explains the science and gives you the training protocols to act on it.",
    why: "For longevity and heart health, aerobic fitness is the cornerstone — start with the VO₂ Max trail.",
    ctas: [
      { label: 'Start the VO₂ Max Mastery Trail', href: '/trails/vo2maxMastery', type: 'trail' },
      { label: 'Take the Health IQ Quiz', href: '/quiz', type: 'quiz' },
      { label: 'Read: VO₂ Max — Why This Number Predicts How Long You\'ll Live', href: '/articles/vo2-max-why-this-number-predicts-longevity', type: 'article' },
    ],
  },

  // ─── Performance / athlete ─────────────────────────────────────────────────
  {
    id: 'performance',
    keywords: [
      'performance', 'athlete', 'athletic', 'sport', 'compete',
      'competition', 'peak performance', 'optimize performance',
      'improve performance', 'training performance',
    ],
    answer:
      "Elite performance depends on stacking fundamentals well: aerobic base, strength, sleep, and nutrition. For most athletes, VO₂ max is both a key performance variable and one of the most trainable. The VO₂ Max Mastery Trail gives you the evidence on what actually drives athletic performance and how to program for it effectively.",
    why: "Aerobic capacity is the foundation of most athletic performance — start here.",
    ctas: [
      { label: 'Start the VO₂ Max Mastery Trail', href: '/trails/vo2maxMastery', type: 'trail' },
      { label: 'Start the Strength Mastery Trail', href: '/trails/strengthMastery', type: 'trail' },
      { label: 'Take the Health IQ Quiz', href: '/quiz', type: 'quiz' },
    ],
  },

  // ─── HIIT / intervals ──────────────────────────────────────────────────────
  {
    id: 'hiit',
    keywords: [
      'hiit', 'interval', 'high intensity', 'sprints', 'intervals',
      'tabata', 'crossfit', 'wod', 'interval training',
    ],
    answer:
      "HIIT and interval training are powerful tools — but context matters significantly. Research shows high-intensity work drives VO₂ max most efficiently, but without an adequate aerobic base the risk-to-reward ratio is poor. Most well-designed programs follow a polarized model: roughly 80% low-intensity and 20% high-intensity work. The VO₂ Max Trail covers the full science of how to use intensity correctly.",
    why: "High-intensity training works best in context — the VO₂ Max Trail explains the evidence-based framework.",
    ctas: [
      { label: 'Start the VO₂ Max Mastery Trail', href: '/trails/vo2maxMastery', type: 'trail' },
      { label: 'Take the Health IQ Quiz', href: '/quiz', type: 'quiz' },
    ],
  },

  // ─── Recovery (general) ────────────────────────────────────────────────────
  {
    id: 'recovery',
    keywords: [
      'recovery', 'overtraining', 'rest day', 'deload', 'fatigue',
      'tired after training', 'recover faster', 'muscle recovery',
      'soreness recovery', 'active recovery',
    ],
    answer:
      "Recovery is where adaptation happens — your training is only as effective as your recovery allows. Sleep is the #1 recovery lever, followed by nutrition (especially protein and carbohydrates around training), load management, and stress control. The Sleep Science Trail is the best entry point because sleep is where most people have the largest, most actionable improvement potential.",
    why: "Recovery starts with sleep — the Sleep Science Trail gives you the most evidence-backed protocols.",
    ctas: [
      { label: 'Start the Sleep Science Trail', href: '/trails/sleepScience', type: 'trail' },
      { label: 'Take the Health IQ Quiz', href: '/quiz', type: 'quiz' },
      { label: 'Read: Fitness Recovery — What Works vs Hype', href: '/articles/fitness-recovery-guide', type: 'article' },
    ],
  },

  // ─── Mindfulness / meditation ──────────────────────────────────────────────
  {
    id: 'mindfulness',
    keywords: [
      'meditat', 'mindfulness', 'breathwork', 'breathing exercise',
      'calm', 'mental performance', 'focus techniques', 'visualization',
    ],
    answer:
      "Mindfulness and mental performance are evidence-backed areas — research on meditation shows measurable effects on stress hormones, focus, and even recovery markers. For athletes and active people, mental skills training is one of the highest-leverage underdeveloped areas. The Goal Setting Mastery Trail covers the psychology of performance with a practical, evidence-based lens.",
    why: "Mental performance is a real performance lever — the mindset trail is the right path.",
    ctas: [
      { label: 'Start the Goal Setting Mastery Trail', href: '/trails/goalSettingMastery', type: 'trail' },
      { label: 'Take the Health IQ Quiz', href: '/quiz', type: 'quiz' },
    ],
  },

  // ─── Structured plan / accountability ─────────────────────────────────────
  {
    id: 'plan',
    keywords: [
      'plan', 'program', 'schedule', 'accountability', 'tracking',
      'coach', 'want a plan', 'structured plan', 'training plan',
      'workout plan', 'daily plan',
    ],
    answer:
      "A structured plan with accountability significantly improves outcomes — the evidence on habit formation and goal attainment is clear on this. HI is building PT and Challenges apps designed exactly for this level of structure. The best immediate step is the Health IQ Quiz to identify which trail fits your goals, then use that trail as your structured starting program.",
    why: "You want structure and accountability — the quiz routes you to the right plan.",
    ctas: [
      { label: 'Take the Health IQ Quiz', href: '/quiz', type: 'quiz' },
      { label: 'Join the Waitlist — PT & Challenges App', href: '/waitlist', type: 'app' },
    ],
  },

  // ─── Weight loss / fat loss ────────────────────────────────────────────────
  {
    id: 'weight_loss',
    keywords: [
      'lose weight', 'weight loss', 'fat loss', 'burn fat', 'belly fat',
      'body fat', 'slim down', 'lose fat', 'drop weight', 'cut weight',
    ],
    answer:
      "Fat loss and body composition change are areas where the evidence is clear, but the right approach depends heavily on your context: starting fitness, current diet quality, training history, and lifestyle. Without that baseline, generic advice often misses the mark. The 5-question Health IQ Quiz takes under 2 minutes and routes you to the most relevant content and trail for your situation.",
    why: "Body composition is context-dependent — the quiz routes you to the right starting point.",
    ctas: [
      { label: 'Take the 5-Question Health IQ Quiz', href: '/quiz', type: 'quiz' },
      { label: 'Start the Fueling Mastery Trail', href: '/trails/fuelingMastery', type: 'trail' },
    ],
  },

  // ─── Beginner / new to exercise ────────────────────────────────────────────
  {
    id: 'beginner',
    keywords: [
      'beginner', 'new to', 'never', 'first time', 'not active',
      'start exercising', 'starting out', 'where to start',
      "don't know where", 'dont know where', 'completely new', 'just starting',
      'couch to', 'out of shape',
    ],
    answer:
      "Starting from scratch is actually the best time to build the right habits — the fundamentals matter most when you're new, and there's nothing to unlearn. The 5-question Health IQ Quiz gives us a baseline on where you are across the four pillars and routes you to the right trail for your current level. It takes under 2 minutes.",
    why: "The quiz is the best starting point for beginners — it personalizes which trail to start on.",
    ctas: [
      { label: 'Take the 5-Question Health IQ Quiz', href: '/quiz', type: 'quiz' },
      { label: 'Start the Strength Mastery Trail', href: '/trails/strengthMastery', type: 'trail' },
    ],
  },

  // ─── General health / wellness ─────────────────────────────────────────────
  {
    id: 'general',
    keywords: [
      'healthy', 'healthier', 'wellness', 'overall health',
      'better health', 'general health', 'get in shape', 'stay healthy',
      'be healthier', 'improve health', 'feel better',
    ],
    answer:
      "Getting healthier is the right goal — and the most effective starting point depends on where you are now. HI is organized around four pillars: motion, recovery, nutrition, and mindset. The 5-question Health IQ Quiz identifies where you have the highest leverage for improvement and routes you directly to the right trail.",
    why: "Broad health goals are best served by the quiz — it pinpoints your highest-leverage starting point.",
    ctas: [
      { label: 'Take the 5-Question Health IQ Quiz', href: '/quiz', type: 'quiz' },
    ],
  },

  // ─── Mobility / flexibility ────────────────────────────────────────────────
  {
    id: 'mobility',
    keywords: [
      'mobility', 'flexibility', 'flexible', 'stretching', 'yoga',
      'tight', 'tightness', 'range of motion', 'hip flexor',
      'foam roll', 'foam rolling', 'stretch',
    ],
    answer:
      "Mobility and flexibility are worthwhile but often over-prioritized relative to strength and aerobic fitness. The evidence shows that strength training through full range of motion improves flexibility more efficiently than static stretching alone. Without knowing your primary health goal, the 5-question quiz is the most efficient way to route you to the right starting point.",
    why: "Mobility is best addressed in the context of your broader health goal — the quiz helps route you correctly.",
    ctas: [
      { label: 'Take the 5-Question Health IQ Quiz', href: '/quiz', type: 'quiz' },
      { label: 'Start the Strength Mastery Trail', href: '/trails/strengthMastery', type: 'trail' },
    ],
  },
]

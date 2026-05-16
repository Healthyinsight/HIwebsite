import { routingMap, QUIZ_FALLBACK_ENTRY, PAIN_KEYWORDS, type RoutingEntry } from './routingMap'

export function classifyMessage(message: string): { entry: RoutingEntry; score: number } {
  const lower = message.toLowerCase()

  // Safety override: pain/injury keywords always win
  if (PAIN_KEYWORDS.some(kw => lower.includes(kw))) {
    const injuryEntry = routingMap.find(e => e.id === 'injury')
    if (injuryEntry) return { entry: injuryEntry, score: 10 }
  }

  let bestEntry: RoutingEntry | null = null
  let bestScore = 0

  for (const entry of routingMap) {
    const score = entry.keywords.filter(kw => lower.includes(kw)).length
    if (score > bestScore) {
      bestScore = score
      bestEntry = entry
    }
  }

  if (!bestEntry || bestScore === 0) {
    return { entry: QUIZ_FALLBACK_ENTRY, score: 0 }
  }

  return { entry: bestEntry, score: bestScore }
}

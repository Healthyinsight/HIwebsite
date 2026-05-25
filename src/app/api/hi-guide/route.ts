import { NextRequest, NextResponse } from 'next/server'
import { classifyMessage } from '@/lib/hiGuide/classifier'
import type { CTA } from '@/lib/hiGuide/routingMap'

interface HiGuideRequest {
  message: string
  turn: number
}

interface HiGuideResponse {
  answer: string
  ctas: CTA[]
  why: string
  confidence: number
  safetyDisclaimer: boolean
  nextState: 'chat' | 'choose_path'
}

export async function POST(req: NextRequest): Promise<NextResponse<HiGuideResponse | { error: string }>> {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { message, turn } = body as HiGuideRequest

  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'message is required' }, { status: 400 })
  }

  if (typeof turn !== 'number') {
    return NextResponse.json({ error: 'turn must be a number' }, { status: 400 })
  }

  const trimmed = message.trim().slice(0, 500)
  const { entry, score } = classifyMessage(trimmed)

  const nextState: 'chat' | 'choose_path' = turn >= 1 ? 'choose_path' : 'chat'

  return NextResponse.json({
    answer: entry.answer,
    ctas: entry.ctas,
    why: entry.why,
    confidence: score,
    safetyDisclaimer: entry.safetyDisclaimer ?? false,
    nextState,
  })
}

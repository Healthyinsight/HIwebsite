import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

/**
 * Entry points into the single subscriber list. Every capture on the site posts
 * here with one of these tags, so the list stays one list and we can still tell
 * where someone came from. Before the 2026-08 audit there were four competing
 * captures and two different backends.
 */
const SUBSCRIBE_SOURCES = [
  'newsletter',         // the newsletter block, wherever it appears
  'tracker_waitlist',   // The Path Tracker waitlist
  'programs_waitlist',  // HI Programs waitlist
  'trail_unlock',       // Level 4+ article unlock
  'quiz',               // Health IQ quiz result capture
  'unknown',
] as const

export type SubscribeSource = (typeof SUBSCRIBE_SOURCES)[number]

const KNOWN = new Set<string>(SUBSCRIBE_SOURCES)

/** Legacy tags from before the entry points were consolidated. */
const LEGACY_ALIASES: Record<string, SubscribeSource> = {
  website: 'newsletter',
  article: 'newsletter',
}

function normalizeSubscribeSource(raw: unknown): SubscribeSource {
  if (raw === undefined || raw === null || raw === '') return 'newsletter'
  const s = String(raw).trim().toLowerCase()
  if (KNOWN.has(s)) return s as SubscribeSource
  return LEGACY_ALIASES[s] ?? 'unknown'
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 })
  }

  try {
    const { email, firstName, source: sourceRaw } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const source = normalizeSubscribeSource(sourceRaw)
    const createdAtIso = new Date().toISOString()

    const contactRes = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        first_name: firstName || '',
        unsubscribed: false,
        properties: {
          source,
          created_at_iso: createdAtIso,
        },
      }),
    })

    if (!contactRes.ok) {
      const errBody = await contactRes.text()
      const duplicate =
        contactRes.status === 409 ||
        /already exists/i.test(errBody)
      if (!duplicate) {
        logger.error('Resend contact creation failed', { route: '/api/subscribe', service: 'resend', status: contactRes.status, body: errBody })
        return NextResponse.json({ error: 'Something went wrong. Try again.' }, { status: 502 })
      }
    }

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Filip at Healthy Insight <filip@healthyinsight.eu>',
        to: [email],
        subject: 'Welcome to Healthy Insight',
        html: welcomeEmail(email, firstName),
      }),
    })

    if (!emailRes.ok) {
      const errBody = await emailRes.text()
      logger.warn('Resend welcome email failed', { route: '/api/subscribe', service: 'resend', status: emailRes.status, body: errBody })
    } else {
      logger.info('Subscriber added', { route: '/api/subscribe', source })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    logger.error('Unhandled subscribe error', { route: '/api/subscribe', err: String(err) })
    return NextResponse.json({ error: 'Something went wrong. Try again.' }, { status: 500 })
  }
}

function welcomeEmail(email: string, firstName?: string): string {
  const name = firstName ? `, ${firstName}` : ''
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: 'DM Sans', Georgia, sans-serif; background: #FAFAF7; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 48px 24px; }
    .header { background: #0F2A3F; border-radius: 16px; padding: 40px; text-align: center; margin-bottom: 32px; }
    .header h1 { color: white; font-size: 28px; font-weight: 400; margin: 0 0 8px; font-family: Georgia, serif; }
    .header p { color: rgba(255,255,255,0.6); font-size: 15px; margin: 0; }
    .body { background: white; border-radius: 16px; padding: 40px; border: 1px solid #E8E2D8; }
    .body p { color: #444440; font-size: 16px; line-height: 1.75; margin: 0 0 20px; }
    .cta { display: inline-block; background: #0F2A3F; color: white; text-decoration: none; border-radius: 100px; padding: 13px 28px; font-size: 14px; font-weight: 500; margin: 8px 0 24px; }
    .footer { text-align: center; margin-top: 32px; }
    .footer p { color: #63635E; font-size: 13px; line-height: 1.6; }
    .footer a { color: #2D7DA8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Healthy Insight</h1>
      <p>Evidence-based health, straight to your inbox</p>
    </div>
    <div class="body">
      <p>Hey${name},</p>
      <p>Welcome aboard. You just joined a newsletter that does one thing differently: every claim is sourced, every recommendation is evidence-based, and there are zero conflicts of interest.</p>
      <p>No sponsors. No affiliate links. No supplement recommendations. Just the research, translated into practical steps you can use.</p>
      <p>To get started, here are three articles worth reading right now:</p>
      <ul style="color: #444440; font-size: 15px; line-height: 2;">
        <li><a href="https://healthyinsight.eu/articles/sleep-for-performance" style="color: #2D7DA8;">Sleep for Performance</a> (Level 1, 13 min)</li>
        <li><a href="https://healthyinsight.eu/articles/zone-2-reality-check" style="color: #2D7DA8;">Zone 2 Reality Check</a> (Level 2, 8 min)</li>
        <li><a href="https://healthyinsight.eu/articles/fitness-recovery-what-works" style="color: #2D7DA8;">Fitness Recovery: What Works vs Hype</a> (Level 2, 11 min)</li>
      </ul>
      <a href="https://healthyinsight.eu/articles" class="cta">Browse all articles</a>
      <p style="margin-bottom: 0;">Talk soon,<br><strong>Filip</strong><br><em style="font-size: 14px; color: #63635E;">Founder, Healthy Insight</em></p>
    </div>
    <div class="footer">
      <p>Healthy Insight · healthyinsight.eu<br>
      You're receiving this because you subscribed at healthyinsight.eu.<br>
      <a href="https://healthyinsight.eu/api/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

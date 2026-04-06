import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID // Create one in Resend dashboard

export async function POST(req: NextRequest) {
  try {
    const { email, firstName } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    if (!RESEND_API_KEY) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // 1. Add contact to Resend audience when audience id is configured
    if (RESEND_AUDIENCE_ID) {
      const audienceRes = await fetch(
        `https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            first_name: firstName || '',
            unsubscribed: false,
          }),
        }
      )

      if (!audienceRes.ok && audienceRes.status !== 409) {
        // 409 = already subscribed, that's fine
        console.error('Resend audience error', { status: audienceRes.status })
      }
    } else {
      console.warn('Resend audience id missing; skipping audience add')
    }

    // 2. Send welcome email
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Filip at Healthy Insight <filip@healthyinsight.eu>',
        to: [email],
        subject: 'Welcome to Healthy Insight',
        html: welcomeEmail(firstName),
      }),
    })

    if (!emailRes.ok) {
      console.error('Resend email error', { status: emailRes.status })
      // Still return success — contact was added even if welcome email failed
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Subscribe error')
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

function welcomeEmail(firstName?: string): string {
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
    .footer p { color: #8A8A80; font-size: 13px; line-height: 1.6; }
    .footer a { color: #2D7DA8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Healthy Insight</h1>
      <p>Science Made Simple, Action Made Fun</p>
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
      <p style="margin-bottom: 0;">Talk soon,<br><strong>Filip</strong><br><em style="font-size: 14px; color: #8A8A80;">Founder, Healthy Insight</em></p>
    </div>
    <div class="footer">
      <p>Healthy Insight · healthyinsight.eu<br>
      You're receiving this because you subscribed at healthyinsight.eu.<br>
      <a href="#">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

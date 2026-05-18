import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )

  const { error } = await supabase.from('waitlist').insert({ email: email.toLowerCase().trim() })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'duplicate' }, { status: 409 })
    }
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (apiKey) {
    try {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Filip at Healthy Insight <filip@healthyinsight.eu>',
          to: [email],
          subject: "You're on the list — Healthy Insight",
          html: waitlistConfirmationEmail(),
          text: waitlistConfirmationText(),
        }),
      })
      if (!emailRes.ok) {
        const errBody = await emailRes.text()
        console.error('Waitlist confirmation email error', { status: emailRes.status, body: errBody })
      }
    } catch (err) {
      console.error('Waitlist confirmation email send failed:', err)
    }
  }

  return NextResponse.json({ ok: true })
}

function waitlistConfirmationEmail(): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: 'DM Sans', Georgia, sans-serif; background: #0F2A3F; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 48px 24px; }
    .header { text-align: center; margin-bottom: 40px; }
    .header p { color: rgba(255,255,255,0.45); font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; margin: 0; }
    .body { background: #162F45; border-radius: 16px; padding: 48px 40px; border: 1px solid rgba(255,255,255,0.08); }
    .body h1 { color: #FFFFFF; font-family: Georgia, 'DM Serif Display', serif; font-size: 32px; font-weight: 400; margin: 0 0 28px; line-height: 1.2; }
    .body p { color: rgba(255,255,255,0.75); font-size: 16px; line-height: 1.8; margin: 0 0 20px; }
    .body p:last-child { margin-bottom: 0; }
    .sig { color: rgba(255,255,255,0.55) !important; font-size: 15px !important; }
    .footer { text-align: center; margin-top: 32px; }
    .footer p { color: rgba(255,255,255,0.3); font-size: 12px; line-height: 1.7; }
    .footer a { color: rgba(255,255,255,0.45); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p>Healthy Insight</p>
    </div>
    <div class="body">
      <h1>You made the list.</h1>
      <p>We're putting the finishing touches on The Path Tracker — a personal health intelligence layer built for athletes who want to train smarter and race stronger. We'll reach out personally when it's ready for you.</p>
      <p class="sig">— Filip, founder of Healthy Insight</p>
    </div>
    <div class="footer">
      <p>healthyinsight.eu<br>
      You're receiving this because you signed up at healthyinsight.eu/waitlist</p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

function waitlistConfirmationText(): string {
  return `You made the list.

We're putting the finishing touches on The Path Tracker — a personal health intelligence layer built for athletes who want to train smarter and race stronger. We'll reach out personally when it's ready for you.

— Filip, founder of Healthy Insight

---
healthyinsight.eu
You're receiving this because you signed up at healthyinsight.eu/waitlist`
}

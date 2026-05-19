import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')

  if (!email || !email.includes('@')) {
    return new NextResponse(resultPage('Invalid link', 'This unsubscribe link is invalid.'), {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    })
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )

  const { error } = await supabase
    .from('waitlist')
    .update({ unsubscribed: true })
    .eq('email', email.toLowerCase().trim())

  if (error) {
    console.error('Waitlist unsubscribe error:', error)
    return new NextResponse(
      resultPage('Something went wrong', 'We couldn\'t process your request. Please try again or contact us at filipb@healthyinsight.eu.'),
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    )
  }

  return new NextResponse(
    resultPage("You've been removed.", "No hard feelings. You won't receive any more emails from us about The Path Tracker."),
    { status: 200, headers: { 'Content-Type': 'text/html' } }
  )
}

function resultPage(heading: string, body: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${heading} · Healthy Insight</title>
  <style>
    body { font-family: 'DM Sans', Georgia, sans-serif; background: #FAFAF7; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .card { background: white; border-radius: 16px; padding: 48px 40px; max-width: 480px; width: 90%; border: 1px solid #E8E2D8; text-align: center; }
    h1 { font-family: Georgia, serif; font-weight: 400; color: #0F2A3F; font-size: 26px; margin: 0 0 16px; }
    p { color: #444440; font-size: 15px; line-height: 1.75; margin: 0 0 28px; }
    a { display: inline-block; background: #0F2A3F; color: white; text-decoration: none; border-radius: 100px; padding: 12px 26px; font-size: 14px; font-weight: 500; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${heading}</h1>
    <p>${body}</p>
    <a href="https://healthyinsight.eu">Back to Healthy Insight</a>
  </div>
</body>
</html>`
}

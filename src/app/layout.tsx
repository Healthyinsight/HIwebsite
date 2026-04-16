import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Nav from '@/components/Nav'
import '../styles/globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: {
    default: 'Healthy Insight',
    template: '%s | Healthy Insight',
  },
  description: 'Evidence-based health insights for motion, nutrition, recovery, and mindset. Peer-reviewed research translated into practical guidance.',
  metadataBase: new URL('https://healthyinsight.eu'),
  openGraph: {
    siteName: 'Healthy Insight',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen" style={{ background: 'var(--warm)' }}>
        <Nav />
        <div style={{ paddingTop: 'var(--nav-total-h)' }}>
          {children}
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

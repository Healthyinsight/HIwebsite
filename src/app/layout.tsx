import type { Metadata } from 'next'
import '../styles/globals.css'

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
        {children}
      </body>
    </html>
  )
}

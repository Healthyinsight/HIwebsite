import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Nav from '@/components/Nav'
import { organizationSchema, personSchema, websiteSchema, jsonLd } from '@/lib/schema'
import { EvidenceIQProvider } from '@/components/EvidenceIQProvider'
import { ToastProvider } from '@/components/Toast'
import '../styles/globals.css'

/**
 * L3: self-hosted via next/font. The faces used to load from
 * fonts.googleapis.com, a render-blocking third-party round trip on every page
 * and a data-transfer question on a .eu domain. next/font serves them from our
 * own origin and inlines the @font-face rules, so neither applies.
 */
const serif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
})

const sans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-sans',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  // L6: the site sent no theme-color. --navy, matching the header and footer.
  themeColor: '#0F2A3F',
}

export const metadata: Metadata = {
  title: {
    default: 'Healthy Insight',
    template: '%s | Healthy Insight',
  },
  description: 'Evidence-based health insights for motion, nutrition, recovery, and mindset. Peer-reviewed research translated into practical guidance.',
  metadataBase: new URL('https://healthyinsight.eu'),
  alternates: { canonical: '/' },
  openGraph: {
    siteName: 'Healthy Insight',
    type: 'website',
    // en_GB, not en_US: a .eu domain publishing British-spelled English
    // ("synthesise", "personalised") to a European audience.
    locale: 'en_GB',
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
    <html lang="en-GB" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CWFTWXK09E"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CWFTWXK09E');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd([organizationSchema(), websiteSchema(), personSchema()])}
        />
      </head>
      <body className="min-h-screen" style={{ background: 'var(--warm)' }}>
        <EvidenceIQProvider>
          <Nav />
          <ToastProvider>
            {children}
          </ToastProvider>
        </EvidenceIQProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

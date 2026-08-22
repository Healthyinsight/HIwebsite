/** @type {import('next').NextConfig} */
const nextConfig = {
  // The apex is canonical: metadataBase, sitemap, robots and the JSON-LD
  // SITE_URL all point at https://healthyinsight.eu. Vercel's own domain
  // setting should do this redirect, but this keeps the two hosts from ever
  // serving the same page under different URLs if that setting is lost.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.healthyinsight.eu' }],
        destination: 'https://healthyinsight.eu/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

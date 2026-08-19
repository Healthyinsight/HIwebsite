import { ImageResponse } from 'next/og'
import { colors } from '@/lib/designTokens'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Healthy Insight'

/** Site-wide share card, inherited by every route without its own. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: colors.navy,
          padding: '72px',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, letterSpacing: '3px', textTransform: 'uppercase', color: colors.bluePale, marginBottom: 28 }}>
          Healthy Insight
        </div>
        <div style={{ display: 'flex', fontSize: 68, lineHeight: 1.15, letterSpacing: '-1.5px', marginBottom: 28 }}>
          Train smarter. Race stronger.
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: 'rgba(255,255,255,0.6)' }}>
          Peer-reviewed research on motion, nutrition, recovery and mindset.
        </div>
      </div>
    ),
    size,
  )
}

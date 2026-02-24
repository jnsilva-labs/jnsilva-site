import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'J.N. Silva — Photographer, Filmmaker & Creative Director';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Subtle border */}
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: '1px solid rgba(200, 192, 180, 0.15)',
            display: 'flex',
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 300,
            color: '#F5F0E8',
            letterSpacing: '0.08em',
            marginBottom: 16,
            display: 'flex',
          }}
        >
          J.N. SILVA
        </div>

        {/* Divider line */}
        <div
          style={{
            width: 120,
            height: 1,
            background: '#C8C0B4',
            marginBottom: 24,
            display: 'flex',
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: 'rgba(200, 192, 180, 0.7)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          Photographer &bull; Filmmaker &bull; Creative Director
        </div>

        {/* Credentials */}
        <div
          style={{
            fontSize: 14,
            color: 'rgba(200, 192, 180, 0.4)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginTop: 40,
            display: 'flex',
          }}
        >
          Sotheby&apos;s &bull; TIME &bull; Vogue &bull; NY Times &bull; Entrepreneur
        </div>
      </div>
    ),
    { ...size },
  );
}

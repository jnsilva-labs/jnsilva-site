import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'The Lab — Developer Work by J.N. Silva';
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
        <div
          style={{
            fontSize: 18,
            color: 'rgba(200, 192, 180, 0.6)',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            marginBottom: 28,
            display: 'flex',
          }}
        >
          J.N. Silva
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 300,
            color: '#F5F0E8',
            letterSpacing: '0.06em',
            marginBottom: 20,
            display: 'flex',
          }}
        >
          THE LAB
        </div>
        <div
          style={{
            width: 120,
            height: 1,
            background: '#D4A843',
            marginBottom: 28,
            display: 'flex',
          }}
        />
        <div
          style={{
            fontSize: 22,
            color: 'rgba(200, 192, 180, 0.7)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          Code as a Medium
        </div>
        <div
          style={{
            fontSize: 15,
            color: 'rgba(200, 192, 180, 0.4)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginTop: 36,
            display: 'flex',
          }}
        >
          Generative Art &bull; Interactive &amp; Games &bull; Websites &bull; Pitch Decks
        </div>
      </div>
    ),
    { ...size },
  );
}

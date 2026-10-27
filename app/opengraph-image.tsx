import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Tayyab Ali — Software Engineering Student & Business Development';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function handler(request?: Request) {
  const title =
    new URL(request?.url || 'http://localhost:3000/opengraph-image').searchParams.get('title') ||
    'Tayyab Ali';
  const subtitle =
    new URL(request?.url || 'http://localhost:3000/opengraph-image').searchParams.get('subtitle') ||
    'Software Engineering Student · Sialkot, Pakistan';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#FAFAF7',
          color: '#18181B',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '60px',
            height: '4px',
            background: '#E5A910',
            marginBottom: '40px',
          }}
        />
        <div
          style={{
            fontSize: '64px',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '24px',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: '28px',
            color: '#4A6FA5',
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '80px',
            fontSize: '20px',
            color: '#A1A1AA',
          }}
        >
          tayyab.co
        </div>
      </div>
    ),
    { ...size }
  );
}

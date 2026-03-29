import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'John Herrera — Culinary Engine';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  const forkSrc = await readFile(
    join(process.cwd(), 'public/images/og-fork.png'),
  );
  const forkBase64 = `data:image/png;base64,${forkSrc.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          position: 'relative',
        }}
      >
        {/* Grain-like subtle noise via radial gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 72% 24%, rgba(202,253,0,0.06) 0%, transparent 45%), radial-gradient(circle at 28% 76%, rgba(202,253,0,0.03) 0%, transparent 40%)',
            display: 'flex',
          }}
        />

        {/* Fork logo */}
        <img
          src={forkBase64}
          width={160}
          height={297}
          style={{ marginBottom: 40 }}
          alt=""
        />

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontStyle: 'italic',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            JOHN HERRERA
          </span>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '0.32em',
              opacity: 0.5,
              lineHeight: 1,
            }}
          >
            CULINARY ENGINE
          </span>
        </div>

        {/* Terminal line */}
        <div
          style={{
            marginTop: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 18,
              color: '#cafd00',
              letterSpacing: '0.05em',
              textShadow: '0 0 20px rgba(202,253,0,0.4)',
            }}
          >
            {'$ git commit -m \'umami\''}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

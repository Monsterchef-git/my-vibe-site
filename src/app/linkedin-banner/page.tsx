import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export default async function LinkedInBannerPage() {
  const forkSrc = await readFile(
    join(process.cwd(), 'public/images/og-fork.png'),
  );
  const forkBase64 = `data:image/png;base64,${forkSrc.toString('base64')}`;

  // Generate the image server-side and return it as a data URI
  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 18% 50%, rgba(202,253,0,0.06) 0%, transparent 40%), radial-gradient(circle at 82% 50%, rgba(202,253,0,0.04) 0%, transparent 35%)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
          <img src={forkBase64} width={100} height={186} alt="" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span
              style={{
                fontSize: 42,
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
                fontSize: 18,
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.32em',
                opacity: 0.4,
                lineHeight: 1,
              }}
            >
              CULINARY ENGINE
            </span>
            <span
              style={{
                marginTop: 14,
                fontFamily: 'monospace',
                fontSize: 13,
                color: '#cafd00',
                letterSpacing: '0.05em',
                textShadow: '0 0 16px rgba(202,253,0,0.35)',
              }}
            >
              {'$ git commit -m \'umami\''}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 8,
              marginLeft: 60,
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 11,
                color: '#71717a',
                letterSpacing: '0.3em',
                textTransform: 'uppercase' as const,
              }}
            >
              Chef by Day
            </span>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 11,
                color: '#cafd00',
                letterSpacing: '0.3em',
                textTransform: 'uppercase' as const,
                textShadow: '0 0 12px rgba(202,253,0,0.3)',
              }}
            >
              Vibe-Coder by Night
            </span>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 10,
                color: '#3f3f46',
                letterSpacing: '0.2em',
                marginTop: 4,
              }}
            >
              Medellín, Colombia
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1584, height: 396 },
  );

  const buffer = await imageResponse.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  const dataUri = `data:image/png;base64,${base64}`;

  return (
    <html lang="es">
      <body style={{ margin: 0, background: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 24 }}>
        <p style={{ color: '#666', fontFamily: 'monospace', fontSize: 12 }}>LinkedIn Banner — 1584×396 — Right-click → Save Image As</p>
        <img src={dataUri} width={1584} height={396} alt="LinkedIn Banner" style={{ maxWidth: '90vw', border: '1px solid #333' }} />
      </body>
    </html>
  );
}

'use client';

import Image from 'next/image';
import { Primitive, cx } from '@/components/primitive';
import { SiApple } from 'react-icons/si';
import { HiOutlineCpuChip } from 'react-icons/hi2';

export default function ISolutionSection() {
  return (
    <Primitive.Section id="isolution" className={cx('mt-16')}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '64px',
          alignItems: 'center',
        }}
      >
        <div style={{ padding: '20px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 16px',
              borderRadius: '100px',
              background: 'rgba(0,102,204,0.1)',
              border: '1px solid rgba(0,102,204,0.2)',
              marginBottom: '32px',
            }}
          >
            <SiApple style={{ color: '#0066cc', fontSize: '14px' }} />
            <span
              style={{
                fontSize: '10px',
                fontWeight: '900',
                letterSpacing: '2px',
                color: '#0066cc',
                textTransform: 'uppercase',
              }}
            >
              Certified Repair Logic
            </span>
          </div>

          <h3
            style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: '700',
              color: 'white',
              lineHeight: '0.9',
              letterSpacing: '-0.04em',
              marginBottom: '24px',
              fontFamily: 'var(--sf-display)',
            }}
          >
            iSolution <span style={{ color: '#444' }}>Lab.</span>
          </h3>

          <p
            style={{
              color: '#888',
              lineHeight: '1.6',
              fontSize: '15px',
              maxWidth: '380px',
              marginBottom: '40px',
            }}
          >
            Ingeniería de precisión para el ecosistema Apple. Especialistas en
            micro-soldadura y recuperación de dispositivos en Medellín.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '40px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div>
              <p style={{ color: '#0066cc', fontSize: '32px', fontWeight: '700' }}>
                99.9%
              </p>
              <p
                style={{
                  fontSize: '9px',
                  color: '#555',
                  fontWeight: '900',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                Success Rate
              </p>
            </div>
            <div>
              <p style={{ color: '#34c759', fontSize: '32px', fontWeight: '700' }}>
                ∞
              </p>
              <p
                style={{
                  fontSize: '9px',
                  color: '#555',
                  fontWeight: '900',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                Precision Tools
              </p>
            </div>
          </div>
        </div>

        <div
          className="isolution-card"
          style={{
            minHeight: '500px',
            position: 'relative',
            background: 'rgba(20, 20, 22, 0.8)',
            boxShadow: 'var(--apple-shadow)',
            cursor: 'pointer',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <Image
              src="/images/isolution.png"
              alt="Captura del sitio de iSolution Service Center con hero de reparación Apple en Medellín."
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="bg-image"
              style={{
                objectFit: 'cover',
                filter: 'grayscale(100%) brightness(0.6)',
                opacity: 0.4,
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(0,0,0,0.9) 100%)',
              zIndex: 1,
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 2,
              padding: '48px',
              height: '500px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <HiOutlineCpuChip
                style={{ color: 'rgba(0,102,204,0.6)', fontSize: '48px' }}
              />
              <div
                style={{
                  fontSize: '9px',
                  color: '#666',
                  textAlign: 'right',
                  fontFamily: 'monospace',
                  lineHeight: '1.5',
                }}
              >
                MODEL: A2141 / LOGIC BOARD <br />
                <span style={{ color: '#0066cc' }}>BGA REBALLING PROCESS_</span>
              </div>
            </div>

            <a
              href="https://isolution.com.co"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-apple"
              style={{ alignSelf: 'flex-end', transition: 'all 0.3s ease' }}
            >
              Agendar Reparación _
            </a>
          </div>
        </div>
      </div>
    </Primitive.Section>
  );
}

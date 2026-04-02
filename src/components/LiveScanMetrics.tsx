'use client';

import { useEffect, useState } from 'react';
import { cx } from '@/components/primitive';

const SCAN_PROFILES = [
  [
    { label: 'GRASA', value: 'RENDER_RATIO...88%' },
    { label: 'CALOR', value: 'BRASAS_ACTIVAS' },
    { label: 'TEXTURA', value: 'CORTEZA_ESTABLE' },
    { label: 'SERVICIO', value: 'VENTANA_PASE...42S' },
  ],
  [
    { label: 'TEMP', value: 'SOUS_VIDE...54°C' },
    { label: 'TIEMPO', value: 'COCCIÓN...12H' },
    { label: 'PRESIÓN', value: 'VACÍO_TOTAL' },
    { label: 'ESTADO', value: 'PROTEÍNA_ÓPTIMA' },
  ],
  [
    { label: 'ÁCIDO', value: 'EMULSIÓN...pH_3.8' },
    { label: 'DULCE', value: 'REDUCCIÓN...72°Bx' },
    { label: 'SAL', value: 'EQUILIBRIO_FINO' },
    { label: 'UMAMI', value: 'FERMENT...+96H' },
  ],
  [
    { label: 'MISE', value: 'EN_PLACE...100%' },
    { label: 'PASE', value: 'VENTANA...18:30H' },
    { label: 'COVERS', value: 'SERVICIO...×48' },
    { label: 'TIMING', value: 'ON_TIME_∞' },
  ],
] as const;

const CYCLE_MS = 3200;
const FLASH_MS = 360;

export default function LiveScanMetrics({ className }: { className?: string }) {
  const [profileIndex, setProfileIndex] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlashing(true);
      const t = setTimeout(() => {
        setProfileIndex((prev) => (prev + 1) % SCAN_PROFILES.length);
        setIsFlashing(false);
      }, FLASH_MS);
      return () => clearTimeout(t);
    }, CYCLE_MS);

    return () => clearInterval(interval);
  }, []);

  const metrics = SCAN_PROFILES[profileIndex];

  return (
    <div
      className={cx(
        'grid gap-2.5 rounded-[1.75rem] border border-lime-400/18 bg-black/58 p-3 sm:p-4 backdrop-blur-xl transition-all duration-500 group-hover:border-lime-400/38 group-hover:bg-black/72 sm:max-w-[28rem]',
        className,
      )}
    >
      {metrics.map((metric, index) => (
        <div
          key={metric.label}
          className={cx(
            'flex items-center justify-between gap-3 sm:gap-4 border-b border-lime-400/10 pb-2 font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.22em] overflow-hidden motion-reduce:transition-none',
            index === metrics.length - 1 && 'border-b-0 pb-0',
            isFlashing
              ? 'text-zinc-700 transition-colors duration-75'
              : 'text-zinc-400 transition-all duration-300 group-hover:text-lime-200',
          )}
        >
          <span
            className={cx(
              'shrink-0 motion-reduce:transition-none',
              isFlashing
                ? 'text-zinc-800 transition-colors duration-75'
                : 'text-zinc-500 transition-colors duration-300 group-hover:text-lime-400',
            )}
          >
            {metric.label}
          </span>
          <span
            className={cx(
              'text-right truncate min-w-0 transition-opacity motion-reduce:transition-none',
              isFlashing ? 'opacity-0 duration-75' : 'opacity-100 duration-200',
            )}
          >
            {metric.value}
          </span>
        </div>
      ))}
    </div>
  );
}

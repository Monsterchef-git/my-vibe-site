'use client';

import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/utils/cx';

const STAMP = 'John Herrera ---';
const HOLD_BEFORE_LOCKUP = 320;
const LOCKUP_REVEAL = 760;

type Phase = 'stamp' | 'lockup' | 'done';

export default function AboutNameStamp() {
  const [phase, setPhase] = useState<Phase>('stamp');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mediaQuery.matches) {
      const frame = window.requestAnimationFrame(() => {
        setPhase('done');
      });

      return () => window.cancelAnimationFrame(frame);
    }

    timeoutRef.current = setTimeout(() => {
      setPhase('lockup');
      timeoutRef.current = setTimeout(() => {
        setPhase('done');
      }, LOCKUP_REVEAL);
    }, HOLD_BEFORE_LOCKUP);

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const stampVisible = phase === 'stamp';
  const lockupVisible = phase === 'lockup' || phase === 'done';

  return (
    <div className="relative min-h-[12rem] sm:min-h-[14rem] md:min-h-[15.5rem] lg:min-h-[17rem]">
      <p
        aria-hidden="true"
        className={cx(
          'absolute left-0 top-0 font-mono text-[10px] uppercase tracking-[0.42em] text-zinc-500 transition-[opacity,transform,letter-spacing] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
          stampVisible
            ? 'translate-y-0 opacity-100 tracking-[0.42em]'
            : '-translate-y-3 opacity-0 tracking-[0.18em]',
        )}
      >
        {STAMP}
      </p>

      <div
        aria-label="John Herrera"
        className={cx(
          'space-y-0 pt-7 transition-[opacity,transform,filter] duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
          lockupVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-sm',
        )}
      >
        <h1 className="font-headline text-[clamp(3.75rem,10vw,8.8rem)] italic leading-[0.9] tracking-[-0.04em]">
          <span className="block text-white">John</span>
          <span className="night-glow block text-[var(--accent-primary)]">Herrera</span>
        </h1>
      </div>
    </div>
  );
}

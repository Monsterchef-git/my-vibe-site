'use client';

import { useEffect, useRef, useState } from 'react';
import InternalPageHeroFrame from '@/components/shared/InternalPageHeroFrame';
import {
  sectionBodyClassName,
  sectionMicroClassName,
} from '@/design/tokens/components/sectionStyles';
import { cx } from '@/lib/utils/cx';

const EYEBROW = 'Selected Work --- John Herrera';
const LINE1 = 'Taste, applied.';
const LINE2 = 'From table to interface.';
const LEFT_LABEL = 'Hospitality';
const RIGHT_LABEL = 'Digital';
const SUBLINE = 'Selected work across hospitality, brand direction and digital product.';

const SPEED_L1 = 68;
const SPEED_L2 = 44;
const PAUSE_BETWEEN = 220;
const HOLD_AFTER_LINES = 260;
const SYSTEM_REVEAL_DELAY = 180;

type Phase = 'l1' | 'pause-between' | 'l2' | 'hold' | 'done';

export default function WorksHero() {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [phase, setPhase] = useState<Phase>('l1');
  const [index, setIndex] = useState(0);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mediaQuery.matches) {
      const frame = window.requestAnimationFrame(() => {
        setLine1(LINE1);
        setLine2(LINE2);
        setPhase('done');
      });

      return () => window.cancelAnimationFrame(frame);
    }

    return undefined;
  }, []);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    clearTimeout(timeoutRef.current);

    if (phase === 'done') {
      return undefined;
    }

    if (phase === 'l1') {
      if (index < LINE1.length) {
        timeoutRef.current = setTimeout(() => {
          setLine1(LINE1.slice(0, index + 1));
          setIndex((currentIndex) => currentIndex + 1);
        }, SPEED_L1);

        return () => clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setPhase('pause-between');
      }, PAUSE_BETWEEN);

      return () => clearTimeout(timeoutRef.current);
    }

    if (phase === 'pause-between') {
      timeoutRef.current = setTimeout(() => {
        setIndex(0);
        setPhase('l2');
      }, PAUSE_BETWEEN);

      return () => clearTimeout(timeoutRef.current);
    }

    if (phase === 'l2') {
      if (index < LINE2.length) {
        timeoutRef.current = setTimeout(() => {
          setLine2(LINE2.slice(0, index + 1));
          setIndex((currentIndex) => currentIndex + 1);
        }, SPEED_L2);

        return () => clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setPhase('hold');
      }, HOLD_AFTER_LINES);

      return () => clearTimeout(timeoutRef.current);
    }

    if (phase === 'hold') {
      timeoutRef.current = setTimeout(() => {
        setPhase('done');
      }, SYSTEM_REVEAL_DELAY);

      return () => clearTimeout(timeoutRef.current);
    }

    return undefined;
  }, [index, phase]);

  const line2Visible = phase === 'l2' || phase === 'hold' || phase === 'done';
  const systemVisible = phase === 'hold' || phase === 'done';
  const sublineVisible = phase === 'done';

  return (
    <InternalPageHeroFrame>
      <div className="space-y-8 md:space-y-10">
        <p className={sectionMicroClassName}>
          {EYEBROW}
        </p>

        <div
          className="relative min-h-[13rem] sm:min-h-[15rem] md:min-h-[16.5rem] lg:min-h-[18rem]"
          aria-label={`${LINE1} ${LINE2}`}
        >
          <span className="sr-only">Taste, applied. From table to interface.</span>

          <div className="space-y-4 md:space-y-6">
            <div className="max-w-5xl cursor-default select-none text-[clamp(3.75rem,10vw,8.8rem)] font-headline italic leading-[0.9] tracking-[-0.04em] text-white">
              {line1}
              {phase === 'l1' && <span className="hero-cursor">|</span>}
            </div>

            {/* Line 2 — demoted to eyebrow (Sprint 3C) */}
            <div
              className={cx(
                'cursor-default select-none font-mono text-[11px] uppercase tracking-[0.32em] text-zinc-400 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                line2Visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
              )}
            >
              {line2}
              {phase === 'l2' && <span className="hero-cursor">|</span>}
            </div>
          </div>
        </div>

        <div
          className={cx(
            'grid gap-3 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:grid-cols-[auto_1fr_auto] md:items-center md:gap-5',
            systemVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          <a
            href="#works-gastronomy"
            data-cursor="cta"
            data-cursor-label="Explore"
            data-cursor-tone="lime"
            className="font-mono text-[11px] uppercase tracking-[0.32em] text-lime-300/78 transition-colors duration-200 hover:text-lime-200 focus-visible:text-lime-200"
          >
            #{LEFT_LABEL}
          </a>
          <div
            aria-hidden="true"
            className="h-px bg-gradient-to-r from-lime-400/35 via-cyan-300/30 to-cyan-300/35"
          />
          <a
            href="#works-development"
            data-cursor="cta"
            data-cursor-label="Explore"
            data-cursor-tone="cyan"
            className="font-mono text-[11px] uppercase tracking-[0.32em] text-cyan-300/78 transition-colors duration-200 hover:text-cyan-200 focus-visible:text-cyan-200 md:text-right"
          >
            #{RIGHT_LABEL}
          </a>
        </div>

        <p
          className={cx(
            sectionBodyClassName,
            'max-w-[32rem] rounded-r-[1.75rem] border-l border-white/12 bg-black/18 py-1.5 pl-6 pr-5 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-[2px]',
            sublineVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          {SUBLINE}
        </p>
      </div>
    </InternalPageHeroFrame>
  );
}

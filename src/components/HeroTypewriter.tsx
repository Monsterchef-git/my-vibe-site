'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const LINE1 = 'Chef by day.';
const LINE2 = 'Digital craft by night.';

const SPEED_L1   = 72;
const SPEED_L2   = 52;
const PAUSE      = 480;

const CHARS      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?';
const SCR_SPEED  = 35;   // ms between ticks
const SCR_STAGGER = 44;  // ms between each char resolving

const shouldScramble = (c: string) => /[a-zA-Z0-9]/.test(c);

function useScramble(text: string) {
  const [display, setDisplay]       = useState(text);
  const [scrambling, setScrambling] = useState(false);
  const timer   = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return () => clearTimeout(timer.current);
  }, []);

  const start = useCallback(() => {
    if (reduced.current) return;
    clearTimeout(timer.current);
    setScrambling(true);
    const chars = text.split('');
    let iter = 0;

    const tick = () => {
      const elapsed = iter * SCR_SPEED;
      const next = chars
        .map((c, i) => {
          if (!shouldScramble(c)) return c;
          if (elapsed >= i * SCR_STAGGER) return c;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');
      setDisplay(next);
      iter++;
      const lastResolve = (chars.length - 1) * SCR_STAGGER;
      if (elapsed < lastResolve + SCR_SPEED) {
        timer.current = setTimeout(tick, SCR_SPEED);
      } else {
        setDisplay(text);
        setScrambling(false);
      }
    };
    tick();
  }, [text]);

  const reset = useCallback(() => {
    clearTimeout(timer.current);
    setDisplay(text);
    setScrambling(false);
  }, [text]);

  return { display, scrambling, start, reset };
}

export default function HeroTypewriter() {
  const [l1, setL1] = useState('');
  const [l2, setL2] = useState('');
  const [phase, setPhase] = useState<'l1' | 'pause' | 'l2' | 'done'>('l1');
  const [idx, setIdx]     = useState(0);

  const s1 = useScramble(LINE1);
  const s2 = useScramble(LINE2);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      const frame = window.requestAnimationFrame(() => {
        setL1(LINE1);
        setL2(LINE2);
        setPhase('done');
      });

      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    if (phase === 'l1') {
      if (idx < LINE1.length) {
        const t = setTimeout(() => {
          setL1(LINE1.slice(0, idx + 1));
          setIdx(i => i + 1);
        }, SPEED_L1);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => { setPhase('pause'); }, PAUSE);
      return () => clearTimeout(t);
    }
    if (phase === 'pause') {
      const t = setTimeout(() => { setPhase('l2'); setIdx(0); }, 0);
      return () => clearTimeout(t);
    }
    if (phase === 'l2') {
      if (idx < LINE2.length) {
        const t = setTimeout(() => {
          setL2(LINE2.slice(0, idx + 1));
          setIdx(i => i + 1);
        }, SPEED_L2);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => { setPhase('done'); }, 0);
      return () => clearTimeout(t);
    }
  }, [phase, idx]);

  const done = phase === 'done';

  // Line 2 display: when scrambling use full scrambled string;
  // when idle split out the dot so it can blink
  const l2Text   = done ? LINE2 : l2;
  const l2Body   = (done && !s2.scrambling) ? LINE2.slice(0, -1) : l2Text;
  const showDot  = done && !s2.scrambling;

  return (
    <div className="space-y-3 md:space-y-4" aria-label={`${LINE1} ${LINE2}`} aria-live="polite">

      {/* Line 1 */}
      <div
        className="max-w-5xl text-6xl font-headline italic leading-[0.92] text-zinc-100 sm:text-7xl md:text-[5.5rem] lg:text-[7.5rem] cursor-default select-none"
        aria-hidden="true"
        onMouseEnter={done ? s1.start : undefined}
        onMouseLeave={done ? s1.reset : undefined}
      >
        {done ? s1.display : l1}
        {phase === 'l1' && <span className="hero-cursor">|</span>}
      </div>

      {/* Line 2 */}
      <div
        className="max-w-5xl text-6xl font-mono uppercase tracking-[-0.08em] text-[#cafd00] night-glow sm:text-7xl md:text-[5.5rem] lg:text-[7.25rem] cursor-default select-none"
        aria-hidden="true"
        onMouseEnter={done ? s2.start : undefined}
        onMouseLeave={done ? s2.reset : undefined}
      >
        {s2.scrambling ? s2.display : l2Body}
        {showDot && <span className="hero-dot-blink">.</span>}
        {(phase === 'l2' || phase === 'pause') && (
          <span className="hero-cursor">|</span>
        )}
      </div>

    </div>
  );
}

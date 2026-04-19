'use client';

import { useEffect, useMemo, useState } from 'react';

const TARGET = 'JOHN HERRERA';
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const TICK_MS = 48;
const DURATION_MS = 780;

function shouldScramble(character: string) {
  return /[A-Z0-9]/.test(character);
}

export default function HomeNameScramble() {
  const [display, setDisplay] = useState(TARGET);

  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(TARGET);
      return undefined;
    }

    const start = performance.now();

    const interval = window.setInterval(() => {
      const now = performance.now();
      const progress = Math.min((now - start) / DURATION_MS, 1);
      const revealCount = Math.floor(progress * TARGET.length);

      const nextValue = TARGET.split('')
        .map((character, index) => {
          if (!shouldScramble(character)) {
            return character;
          }

          if (index < revealCount) {
            return TARGET[index];
          }

          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setDisplay(nextValue);

      if (progress >= 1) {
        window.clearInterval(interval);
        setDisplay(TARGET);
      }
    }, TICK_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [reduceMotion]);

  return (
    <p
      aria-label="John Herrera"
      className="font-mono text-[1.3rem] uppercase tracking-[0.24em] text-lime-300 md:text-[1.65rem]"
    >
      {display}
    </p>
  );
}

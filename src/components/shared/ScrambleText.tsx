'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import type { ElementType, HTMLAttributes } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?';

// Only scramble alphanumeric — spaces, apostrophes, dots, slashes stay fixed
const shouldScramble = (c: string) => /[a-zA-Z0-9]/.test(c);

type ScrambleTextProps = HTMLAttributes<HTMLElement> & {
  text: string;
  as?: ElementType;
  speed?: number;   // ms between ticks
  stagger?: number; // ms between each char resolving
};

export default function ScrambleText({
  text,
  as: Tag = 'span',
  className,
  speed = 35,
  stagger = 42,
  ...props
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return () => clearTimeout(timer.current);
  }, []);

  const scramble = useCallback(() => {
    if (reduced.current) return;
    clearTimeout(timer.current);

    const chars = text.split('');
    let iter = 0;

    const tick = () => {
      const elapsed = iter * speed;
      const next = chars
        .map((c, i) => {
          if (!shouldScramble(c)) return c;
          if (elapsed >= i * stagger) return c; // resolved
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setDisplay(next);
      iter++;

      const lastResolve = (chars.length - 1) * stagger;
      if (elapsed < lastResolve + speed) {
        timer.current = setTimeout(tick, speed);
      } else {
        setDisplay(text);
      }
    };

    tick();
  }, [text, speed, stagger]);

  const reset = useCallback(() => {
    clearTimeout(timer.current);
    setDisplay(text);
  }, [text]);

  return (
    <Tag
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      {...props}
    >
      {display}
    </Tag>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { cx } from '@/components/primitive';

const NAME_EYEBROW = 'John Herrera ---';
const LINE1 = 'Two disciplines.';
const LINE2 = 'One standard.';

const SPEED_L1 = 72;
const SPEED_L2 = 52;
const PAUSE_BETWEEN = 220;
const HOLD_AFTER_LINES = 800;
const SCRAMBLE_OUT_DURATION = 420;
const SCRAMBLE_TICK = 45;
const TAKEOVER_DURATION = 760;
const NAME_SCRAMBLE_TICK = 48;

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?';
const NAME_LINES = ['John', 'Herrera'] as const;

type Phase =
  | 'l1'
  | 'pause-between'
  | 'l2'
  | 'hold'
  | 'scramble-out'
  | 'takeover'
  | 'done';

const shouldScramble = (character: string) => /[a-zA-Z0-9]/.test(character);

function scrambleText(text: string) {
  return text
    .split('')
    .map((character) => {
      if (!shouldScramble(character)) {
        return character;
      }

      return CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join('');
}

export default function HeroTypewriter() {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [scrambledLine1, setScrambledLine1] = useState(LINE1);
  const [scrambledLine2, setScrambledLine2] = useState(LINE2);
  const [scrambledNameLines, setScrambledNameLines] = useState<string[]>([...NAME_LINES]);
  const [phase, setPhase] = useState<Phase>('l1');
  const [index, setIndex] = useState(0);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

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
    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);

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
        setScrambledLine1(LINE1);
        setScrambledLine2(LINE2);
        setPhase('scramble-out');
      }, 0);

      return () => clearTimeout(timeoutRef.current);
    }

    if (phase === 'scramble-out') {
      intervalRef.current = setInterval(() => {
        setScrambledLine1(scrambleText(LINE1));
        setScrambledLine2(scrambleText(LINE2));
      }, SCRAMBLE_TICK);

      timeoutRef.current = setTimeout(() => {
        clearInterval(intervalRef.current);
        setPhase('takeover');
      }, SCRAMBLE_OUT_DURATION);

      return () => {
        clearTimeout(timeoutRef.current);
        clearInterval(intervalRef.current);
      };
    }

    if (phase === 'takeover') {
      const frame = window.requestAnimationFrame(() => {
        setScrambledNameLines(NAME_LINES.map((line) => scrambleText(line)));
      });

      intervalRef.current = setInterval(() => {
        setScrambledNameLines(NAME_LINES.map((line) => scrambleText(line)));
      }, NAME_SCRAMBLE_TICK);

      timeoutRef.current = setTimeout(() => {
        clearInterval(intervalRef.current);
        setScrambledNameLines([...NAME_LINES]);
        setPhase('done');
      }, TAKEOVER_DURATION);

      return () => {
        window.cancelAnimationFrame(frame);
        clearTimeout(timeoutRef.current);
        clearInterval(intervalRef.current);
      };
    }

    return undefined;
  }, [index, phase]);

  const linesAreVisible = phase !== 'takeover' && phase !== 'done';
  const initialEyebrowIsVisible = phase !== 'takeover' && phase !== 'done';
  const takeoverIsVisible = phase === 'takeover' || phase === 'done';
  const isScramblingOut = phase === 'scramble-out';
  const secondLineIsDone = phase === 'hold' || isScramblingOut || takeoverIsVisible;
  const line2Body = secondLineIsDone ? LINE2.slice(0, -1) : line2;

  return (
    <div className="space-y-9">
      <p
        aria-hidden="true"
        className={cx(
          'relative z-[1] cursor-default select-none font-mono text-[10px] uppercase tracking-[0.42em] text-zinc-600 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          initialEyebrowIsVisible ? 'opacity-100 translate-y-0' : 'pointer-events-none -translate-y-4 opacity-0',
        )}
      >
        {NAME_EYEBROW}
      </p>

      <div
        className="relative min-h-[12rem] sm:min-h-[14rem] md:min-h-[15rem] lg:min-h-[17rem]"
        aria-label={`John Herrera. ${LINE1} ${LINE2}`}
      >
        <span className="sr-only">John Herrera. Two disciplines. One standard.</span>

        <div
          aria-hidden="true"
          className={cx(
            'space-y-3 md:space-y-4 transition-[opacity,transform,filter] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
            linesAreVisible
              ? 'opacity-100 translate-y-0 blur-0'
              : 'pointer-events-none -translate-y-3 opacity-0 blur-md',
          )}
        >
          <div className="max-w-5xl cursor-default select-none text-6xl font-headline italic leading-[0.92] text-zinc-100 sm:text-7xl md:text-[5.5rem] lg:text-[7.5rem]">
            {isScramblingOut ? scrambledLine1 : line1}
            {phase === 'l1' && <span className="hero-cursor">|</span>}
          </div>

          <div className="max-w-5xl cursor-default select-none font-mono text-6xl uppercase tracking-[-0.08em] text-[#cafd00] night-glow sm:text-7xl md:text-[5.5rem] lg:text-[7.25rem]">
            {isScramblingOut ? scrambledLine2 : line2Body}
            {secondLineIsDone && !isScramblingOut && linesAreVisible && (
              <span className="hero-dot-blink">.</span>
            )}
            {(phase === 'pause-between' || phase === 'l2') && (
              <span className="hero-cursor">|</span>
            )}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-start"
        >
          <div
            className={cx(
              'font-mono uppercase leading-[0.82] text-zinc-100 transition-[opacity,transform,letter-spacing,filter] duration-[760ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform,letter-spacing,filter]',
              'text-[3.4rem] sm:text-[4.8rem] md:text-[6.25rem] lg:text-[7.4rem]',
              takeoverIsVisible
                ? 'translate-y-0 scale-100 tracking-[0.03em] opacity-100 blur-0'
                : 'translate-y-8 scale-[0.9] tracking-[0.3em] opacity-0 blur-sm',
            )}
          >
            <span className="block text-zinc-200/95">
              {phase === 'takeover' ? scrambledNameLines[0] : NAME_LINES[0]}
            </span>
            <span className="block text-[#cafd00]">
              {phase === 'takeover' ? scrambledNameLines[1] : NAME_LINES[1]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useMemo, useState } from 'react';

import { cx } from '@/components/primitive';

type BootPanelVariant = 'loader' | 'hero';

interface BootPanelProps {
  variant?: BootPanelVariant;
  lines?: string[];
  animated?: boolean;
  className?: string;
}

const DEFAULT_LINES: Record<BootPanelVariant, string[]> = {
  loader: [
    '$ init john_herrera --mode=live',
    '// gastronomy + digital craft loaded',
    '✓ ready',
  ],
  hero: [
    '$ route status /about /works /contact',
    '// selected collaborations available',
    '✓ live',
  ],
};

const REVEAL_DELAYS: Record<BootPanelVariant, number[]> = {
  loader: [120, 380, 680],
  hero: [140, 1020, 1900],
};

const LOOP_RESET_DELAY_MS = 3000;

function getLineTone(line: string) {
  if (line.startsWith('✓')) {
    return 'text-lime-400 drop-shadow-[0_0_10px_rgba(202,253,0,0.18)]';
  }

  if (line.startsWith('//')) {
    return 'text-zinc-500';
  }

  return 'text-zinc-300';
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return reducedMotion;
}

export default function BootPanel({
  variant = 'hero',
  lines,
  animated = true,
  className,
}: BootPanelProps) {
  const reducedMotion = useReducedMotion();
  const resolvedLines = useMemo(() => lines ?? DEFAULT_LINES[variant], [lines, variant]);
  const [visibleLines, setVisibleLines] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!animated || reducedMotion) {
      return;
    }

    const revealDelays = REVEAL_DELAYS[variant];
    const timers: ReturnType<typeof setTimeout>[] = [];

    resolvedLines.forEach((_, index) => {
      const delay = revealDelays[index] ?? revealDelays[revealDelays.length - 1] + (index - revealDelays.length + 1) * 320;
      timers.push(setTimeout(() => setVisibleLines(index + 1), delay));
    });

    if (variant === 'hero') {
      const lastRevealDelay = revealDelays[Math.min(resolvedLines.length, revealDelays.length) - 1] ?? 0;

      timers.push(
        setTimeout(() => {
          setVisibleLines(0);
          setCycle((currentCycle) => currentCycle + 1);
        }, lastRevealDelay + LOOP_RESET_DELAY_MS),
      );
    }

    return () => timers.forEach(clearTimeout);
  }, [animated, cycle, reducedMotion, resolvedLines, variant]);

  const isLoader = variant === 'loader';
  const panelLabel = isLoader ? 'john-herrera init' : 'live status';
  const emptyCursorTone = isLoader ? 'bg-zinc-700' : 'bg-lime-400/70';
  const renderedLines = !animated || reducedMotion ? resolvedLines.length : visibleLines;

  return (
    <div
      className={cx(
        'relative',
        isLoader ? 'mx-auto w-full max-w-sm px-8' : 'pointer-events-none w-full max-w-md',
        className,
      )}
    >
      {isLoader ? (
        <div className="mb-6 text-center">
          <span
            className={cx(
              'glitch-mark font-black tracking-tighter text-white',
              'text-[clamp(4.5rem,12vw,6rem)]',
            )}
            data-text="JH."
          >
            JH.
          </span>
        </div>
      ) : null}

      <div
        className={cx(
          'relative overflow-hidden rounded-[1.5rem] border backdrop-blur-xl',
          isLoader
            ? 'border-zinc-800/60 bg-zinc-950/82 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.5)]'
            : 'border-zinc-800/70 bg-zinc-950/58 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.35)]',
        )}
      >
        <div
          className={cx(
            'crt-static absolute inset-0',
            isLoader ? 'opacity-[0.05]' : 'opacity-[0.022]',
          )}
        />
        <div
          className={cx(
            'crt-scanlines absolute inset-0 pointer-events-none',
            isLoader ? 'opacity-100' : 'opacity-[0.45]',
          )}
        />
        <div
          className={cx(
            'absolute inset-0',
            isLoader
              ? 'bg-[radial-gradient(circle_at_top,rgba(202,253,0,0.08),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_40%)]'
              : 'bg-[radial-gradient(circle_at_top,rgba(202,253,0,0.05),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_45%)]',
          )}
        />

        <div className="relative z-10">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500/55" />
            <div className="h-2 w-2 rounded-full bg-yellow-500/55" />
            <div className="h-2 w-2 rounded-full bg-green-500/55" />
            <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-700">
              {panelLabel}
            </span>
          </div>

          <div
            className={cx(
              'font-mono text-[11px] leading-relaxed',
              isLoader ? 'min-h-[76px] space-y-2' : 'min-h-[68px] space-y-1.5',
            )}
          >
            {resolvedLines.slice(0, renderedLines).map((line, index) => (
              <p
                key={`${variant}-${cycle}-${index}-${line}`}
                className={cx(
                  getLineTone(line),
                  animated && !reducedMotion && 'boot-line-in',
                )}
              >
                {line}
                {index === renderedLines - 1 ? (
                  <span
                    className={cx(
                      'boot-cursor ml-0.5 inline-block h-3.5 w-[6px] translate-y-[2px] bg-lime-400',
                      line.startsWith('✓') && 'shadow-[0_0_12px_rgba(202,253,0,0.35)]',
                    )}
                  />
                ) : null}
              </p>
            ))}

            {renderedLines === 0 ? (
              <p className="text-zinc-700">
                <span
                  className={cx(
                    'boot-cursor inline-block h-3.5 w-[6px] translate-y-[2px]',
                    emptyCursorTone,
                  )}
                />
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ScrambleText from '@/components/shared/ScrambleText';
import { tracking } from '@/design/tokens/primitives/atmosphere';
import { cx } from '@/lib/utils/cx';

const BOOT_STORAGE_KEY = 'jh-boot-seen';
const EXIT_DURATION_MS = 350;

export default function BootSequence() {
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const previousOverflowRef = useRef('');
  const finishingRef = useRef(false);
  const skipRef = useRef<HTMLButtonElement>(null);

  const clearTimeline = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const finish = useCallback(() => {
    if (finishingRef.current) {
      return;
    }

    finishingRef.current = true;
    clearTimeline();
    sessionStorage.setItem(BOOT_STORAGE_KEY, '1');
    setLeaving(true);

    timersRef.current.push(
      setTimeout(() => {
        document.body.style.overflow = previousOverflowRef.current;
        setActive(false);
      }, EXIT_DURATION_MS),
    );
  }, [clearTimeline]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reducedMotion || sessionStorage.getItem(BOOT_STORAGE_KEY)) {
      return;
    }

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startFrame = requestAnimationFrame(() => {
      setActive(true);
    });

    const lineTimeline = [
      { delay: 80, lines: 1 },
      { delay: 240, lines: 2 },
      { delay: 460, lines: 3 },
      { delay: 680, lines: 4 },
      { delay: 900, lines: 5 },
    ];

    lineTimeline.forEach(({ delay, lines }) => {
      timersRef.current.push(
        setTimeout(() => setVisibleLines(lines), delay),
      );
    });

    timersRef.current.push(
      setTimeout(() => setCountdown(2), 1050),
      setTimeout(() => setCountdown(1), 1200),
      setTimeout(finish, 1350),
    );

    return () => {
      cancelAnimationFrame(startFrame);
      clearTimeline();
      document.body.style.overflow = previousOverflowRef.current;
    };
  }, [clearTimeline, finish]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        finish();
        return;
      }

      if (event.key === 'Tab') {
        event.preventDefault();
        skipRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active, finish]);

  if (!active) {
    return null;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="John Herrera site introduction"
      className={cx(
        'boot-overlay fixed inset-0 z-[600] flex items-center justify-center overflow-hidden bg-black',
        leaving && 'is-leaving',
      )}
    >
      <div aria-hidden="true" className="crt-static absolute inset-0 opacity-[0.07]" />
      <div aria-hidden="true" className="crt-scanlines pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.85)_100%)]"
      />

      <div
        aria-live="polite"
        className={cx(
          'relative z-10 w-full max-w-xl space-y-3 px-6 font-mono text-[11px] uppercase leading-5 md:px-10 md:text-xs',
          tracking.label,
        )}
      >
        {visibleLines >= 1 ? (
          <p className="boot-line-in text-zinc-400">
            BOOTING JOHN.HERRERA
            {visibleLines === 1 ? <BootCursor tone="zinc" /> : null}
          </p>
        ) : null}

        {visibleLines >= 2 ? (
          <p className="boot-line-in text-zinc-500">
            LOADING MISE EN PLACE…
            {visibleLines === 2 ? <BootCursor tone="zinc" /> : null}
          </p>
        ) : null}

        {visibleLines >= 3 ? (
          <p className="boot-line-in flex items-center gap-3 text-zinc-300">
            <span className="boot-cursor h-1.5 w-1.5 shrink-0 bg-lime-400 shadow-[0_0_10px_rgba(202,253,0,0.75)]" />
            KITCHEN ONLINE
            {visibleLines === 3 ? <BootCursor tone="lime" /> : null}
          </p>
        ) : null}

        {visibleLines >= 4 ? (
          <p className="boot-line-in flex items-center gap-3 text-zinc-300">
            <span className="boot-cursor h-1.5 w-1.5 shrink-0 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.75)]" />
            DEV ONLINE
            {visibleLines === 4 ? <BootCursor tone="cyan" /> : null}
          </p>
        ) : null}

        {visibleLines >= 5 ? (
          <p className="boot-line-in text-lime-300">
            <ScrambleText
              text={`SERVICE STARTS IN ${countdown}`}
              triggerKey={countdown}
              speed={22}
              stagger={16}
            />
            <BootCursor tone="lime" />
          </p>
        ) : null}
      </div>

      <button
        ref={skipRef}
        type="button"
        onClick={finish}
        className={cx(
          'boot-skip absolute bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 z-20 inline-flex min-h-11 items-center gap-3 px-2 font-mono text-[10px] uppercase text-zinc-500 transition-colors duration-300 hover:text-lime-300 focus-visible:text-lime-300 md:bottom-8 md:right-10',
          tracking.eyebrow,
        )}
      >
        <kbd className="border border-zinc-800 px-1.5 py-1 text-[8px] text-zinc-600">
          ESC
        </kbd>
        SKIP →
      </button>
    </div>,
    document.body,
  );
}

function BootCursor({ tone }: { tone: 'zinc' | 'lime' | 'cyan' }) {
  const toneClassName = {
    zinc: 'bg-zinc-600',
    lime: 'bg-lime-400',
    cyan: 'bg-cyan-400',
  }[tone];

  return (
    <span
      aria-hidden="true"
      className={cx(
        'boot-cursor ml-1 inline-block h-3.5 w-[6px] translate-y-[2px]',
        toneClassName,
      )}
    />
  );
}

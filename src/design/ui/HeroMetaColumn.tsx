'use client';

import { useEffect, useState } from 'react';
import type { HeroTone } from '@/design/primitives/Hero';
import { tracking } from '@/design/tokens/primitives/atmosphere';
import { cx } from '@/lib/utils/cx';

const toneClassNames: Record<HeroTone, string> = {
  lime: 'text-lime-300',
  cyan: 'text-cyan-300',
  blue: 'text-blue-300',
  white: 'text-white',
};

interface HeroMetaColumnProps {
  course: string;
  slug: string;
  tone: HeroTone;
}

function formatMedellinTime(date: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Bogota',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
}

export default function HeroMetaColumn({
  course,
  slug,
  tone,
}: HeroMetaColumnProps) {
  const [time, setTime] = useState('00:00:00');

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const update = () => setTime(formatMedellinTime(new Date()));
    update();

    if (reducedMotion) {
      return;
    }

    let timer: ReturnType<typeof setInterval> | undefined;
    const syncTimer = () => {
      if (timer) {
        clearInterval(timer);
      }
      timer = undefined;

      if (!document.hidden) {
        timer = setInterval(update, 1000);
      }
    };

    document.addEventListener('visibilitychange', syncTimer);
    syncTimer();

    return () => {
      document.removeEventListener('visibilitychange', syncTimer);
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  return (
    <div className={cx('font-mono uppercase text-zinc-400', tracking.eyebrow)}>
      <div className="flex items-center gap-2 whitespace-nowrap text-[10px] lg:hidden">
        <span>{time}</span>
        <span aria-hidden="true" className="text-zinc-700">·</span>
        <span>COURSE {course}</span>
        <span aria-hidden="true" className="text-zinc-700">·</span>
        <span>{slug}</span>
        <span
          aria-label="Available"
          className={cx('ml-auto h-1.5 w-1.5 rounded-full shadow-[0_0_10px_currentColor]', toneClassNames[tone])}
        />
      </div>

      <div className="hidden min-h-48 flex-col items-end justify-between text-right text-[10px] lg:flex">
        <div className="space-y-2">
          <p>{time} · MEDELLIN</p>
          <p>COURSE {course} / 04</p>
          <p className="flex items-center justify-end gap-2">
            STATUS · AVAILABLE
            <span className="relative flex h-2 w-2">
              <span className={cx('absolute inline-flex h-full w-full animate-ping rounded-full opacity-50 motion-reduce:hidden', toneClassNames[tone], 'bg-current')} />
              <span className={cx('relative inline-flex h-2 w-2 rounded-full bg-current shadow-[0_0_10px_currentColor]', toneClassNames[tone])} />
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="h-px w-20 bg-zinc-800" />
          <span className={cx(toneClassNames[tone], '[writing-mode:vertical-rl]')}>
            {slug}
          </span>
        </div>
      </div>
    </div>
  );
}

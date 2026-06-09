'use client';

import { useEffect, useState } from 'react';
import type { HeroTone } from '@/design/primitives/Hero';
import { tracking } from '@/design/tokens/primitives/atmosphere';
import { cx } from '@/lib/utils/cx';

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
      </div>

      <div className="hidden flex-col items-end text-right text-[10px] lg:flex lg:gap-2">
        <p>{time} · MEDELLIN</p>
        <p>COURSE {course} / 04</p>
      </div>
    </div>
  );
}

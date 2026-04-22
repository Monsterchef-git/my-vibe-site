'use client';

import { useEffect, useMemo, useState } from 'react';
import { tracking } from '@/design/tokens/primitives/atmosphere';
import { pageGutterClassName } from '@/design/tokens/semantic/layout';
import { cx } from '@/lib/utils/cx';

type ChapterId = '01' | '02' | '03' | '04';

const CHAPTERS: Record<ChapterId, { next: string; arrow: '↓' | '↑' }> = {
  '01': { next: 'WORKS', arrow: '↓' },
  '02': { next: 'ABOUT', arrow: '↓' },
  '03': { next: 'CONTACT', arrow: '↓' },
  '04': { next: 'TOP', arrow: '↑' },
};

function sanitizeChapter(value: string | undefined): ChapterId {
  if (value === '02' || value === '03' || value === '04') {
    return value;
  }
  return '01';
}

export default function SiteStatusBar() {
  const [chapter, setChapter] = useState<ChapterId>('01');

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-site-chapter]'),
    );

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const nextChapter = sanitizeChapter(
          visible[0]?.target.getAttribute('data-site-chapter') ?? undefined,
        );

        setChapter((current) => (current === nextChapter ? current : nextChapter));
      },
      {
        threshold: [0.35, 0.6, 0.8],
        rootMargin: '-18% 0px -28% 0px',
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (
      window.matchMedia('(max-width: 767px)').matches &&
      typeof navigator !== 'undefined' &&
      'vibrate' in navigator
    ) {
      navigator.vibrate(10);
    }
  }, [chapter]);

  const status = useMemo(() => CHAPTERS[chapter], [chapter]);

  return (
    <div
      className={cx(
        'pointer-events-none fixed inset-x-0 bottom-0 z-40 bg-black/72 backdrop-blur-xl',
        pageGutterClassName,
      )}
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="flex items-center justify-between gap-4 py-2 md:py-3">
        <p className={cx('hidden font-mono text-[10px] uppercase text-zinc-400 md:block', tracking.label)}>
          MEDELLIN, CO · CHAPTER {chapter}
        </p>

        <div className={cx('font-mono text-[10px] uppercase text-zinc-300 transition-opacity duration-300', tracking.label)}>
          <span key={chapter} className="status-index-rise inline-block">
            {chapter}
          </span>{' '}
          / 04
          <span className="ml-2 inline-flex items-center gap-1 md:hidden">
            {status.arrow} NEXT
          </span>
          <span className="hidden md:inline"> — NEXT: {status.next} {status.arrow}</span>
          <span className="sr-only">Current chapter {chapter} of 04</span>
        </div>
      </div>
    </div>
  );
}

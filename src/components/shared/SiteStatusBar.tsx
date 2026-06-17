'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ScrambleText from '@/components/shared/ScrambleText';
import { tracking } from '@/design/tokens/primitives/atmosphere';
import { pageGutterClassName } from '@/design/tokens/semantic/layout';
import { cx } from '@/lib/utils/cx';

type ChapterId = '01' | '02' | '03' | '04';

const CHAPTERS: Record<ChapterId, { label: string; shortLabel: string; href: string; arrow: '↓' | '↑' }> = {
  '01': { label: 'NEXT COURSE: WORKS', shortLabel: 'NEXT', href: '/works', arrow: '↓' },
  '02': { label: 'NEXT COURSE: ABOUT', shortLabel: 'NEXT', href: '/about', arrow: '↓' },
  '03': { label: 'NEXT COURSE: CONTACT', shortLabel: 'NEXT', href: '/contact', arrow: '↓' },
  '04': { label: 'BACK TO HOME', shortLabel: 'HOME', href: '/', arrow: '↑' },
};

function sanitizeChapter(value: string | undefined): ChapterId {
  if (value === '02' || value === '03' || value === '04') {
    return value;
  }
  return '01';
}

function getRouteChapter(pathname: string): ChapterId {
  if (pathname.startsWith('/works')) {
    return '02';
  }

  if (pathname.startsWith('/about')) {
    return '03';
  }

  if (pathname.startsWith('/contact')) {
    return '04';
  }

  return '01';
}

export default function SiteStatusBar() {
  const pathname = usePathname();
  const routeChapter = getRouteChapter(pathname);
  const [visibleChapter, setVisibleChapter] = useState<{
    chapter: ChapterId;
    pathname: string;
  } | null>(null);
  const chapter = visibleChapter?.pathname === pathname ? visibleChapter.chapter : routeChapter;
  const [cycleTick, setCycleTick] = useState(0);
  const [latency, setLatency] = useState(0);

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

        if (visible.length === 0) {
          return;
        }

        const nextChapter = sanitizeChapter(
          visible[0].target.getAttribute('data-site-chapter') ?? undefined,
        );

        setVisibleChapter((current) => {
          if (current?.pathname === pathname && current.chapter === nextChapter) {
            return current;
          }

          return { chapter: nextChapter, pathname };
        });
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
  }, [pathname]);

  useEffect(() => {
    if (
      window.matchMedia('(max-width: 767px)').matches &&
      typeof navigator !== 'undefined' &&
      'vibrate' in navigator
    ) {
      navigator.vibrate(10);
    }
  }, [chapter]);

  const status = CHAPTERS[chapter];
  const metadata = [
    'LAT 6.2476°N · LON -75.5658°W',
    'WEATHER 22°C CLEAR',
    `LATENCY ${latency}ms`,
  ];

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reducedMotion) {
      return;
    }

    let timer: ReturnType<typeof setInterval> | undefined;
    const tick = () => {
      setLatency(Math.round(performance.now()) % 1000);
      setCycleTick((current) => current + 1);
    };
    const syncTimer = () => {
      if (timer) {
        clearInterval(timer);
      }
      timer = undefined;
      if (!document.hidden) {
        timer = setInterval(tick, 4000);
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
  }, [metadata.length]);

  const desktopMetaIndex = cycleTick % metadata.length;
  const showMobileMetadata = cycleTick % 2 === 1;
  const mobileMetaIndex = Math.floor(cycleTick / 2) % metadata.length;

  return (
    <div
      className={cx(
        'pointer-events-none fixed inset-x-0 bottom-0 z-40 bg-black/72 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl',
        pageGutterClassName,
      )}
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="grid min-h-12 grid-cols-1 items-center gap-4 py-2 pl-10 md:grid-cols-[1fr_auto_1fr] md:py-3 md:pl-0">
        <p className={cx('hidden font-mono text-[10px] uppercase text-zinc-400 md:block', tracking.label)}>
          MEDELLIN, CO · COURSE {chapter}
        </p>

        <div className={cx('grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 font-mono text-[10px] uppercase text-zinc-300 transition-opacity duration-300 md:flex md:justify-center', tracking.label)}>
          <span className={cx('min-w-0', showMobileMetadata && 'hidden md:inline')}>
            <span key={chapter} className="status-index-rise inline-block">
              {chapter}
            </span>{' '}
            / 04
          </span>
          <span key={cycleTick} className={cx('status-index-rise min-w-0 truncate text-zinc-500 md:hidden', !showMobileMetadata && 'hidden')}>
            {metadata[mobileMetaIndex]}
          </span>
          <Link
            href={status.href}
            aria-label={status.label}
            data-cursor-mode="link"
            data-cursor-label={status.shortLabel}
            className="pointer-events-auto inline-flex min-h-8 shrink-0 items-center gap-1 justify-self-end rounded-full px-2 text-zinc-300 transition-colors duration-300 hover:text-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none md:ml-2 md:px-0"
          >
            <span className="md:hidden">{status.arrow} {status.shortLabel}</span>
            <span className="relative hidden md:inline">
              — <ScrambleText text={status.label} triggerKey={chapter} /> {status.arrow}
              <span key={chapter} aria-hidden="true" className="status-chapter-underline absolute inset-x-0 -bottom-1 h-px bg-lime-300" />
            </span>
          </Link>
          <span className="sr-only">Current course {chapter} of 04</span>
        </div>

        <p
          key={desktopMetaIndex}
          className={cx('status-index-rise hidden justify-self-end font-mono text-[10px] uppercase text-zinc-500 md:block', tracking.label)}
        >
          {metadata[desktopMetaIndex]}
        </p>
      </div>
    </div>
  );
}

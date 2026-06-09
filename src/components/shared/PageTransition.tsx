'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ScrambleText from '@/components/shared/ScrambleText';
import { tracking } from '@/design/tokens/primitives/atmosphere';
import { cx } from '@/lib/utils/cx';

const courseByPath = {
  '/': '01',
  '/works': '02',
  '/about': '03',
  '/contact': '04',
} as const;

function getCourse(pathname: string) {
  return courseByPath[pathname as keyof typeof courseByPath];
}

const COVER_MS = 380;
const HOLD_MS = 140;

export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [label, setLabel] = useState('');
  const [active, setActive] = useState(false);
  const pendingPathname = useRef<string | null>(null);
  const navigateTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reducedMotion) {
      return;
    }

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest<HTMLAnchorElement>('a[href]');
      if (
        !anchor ||
        anchor.target === '_blank' ||
        anchor.hasAttribute('download')
      ) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      const nextCourse = getCourse(url.pathname);
      const currentCourse = getCourse(pathname);

      if (
        url.origin !== window.location.origin ||
        !nextCourse ||
        !currentCourse ||
        url.pathname === pathname
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      setLabel(`COURSE ${currentCourse} → COURSE ${nextCourse}`);
      setActive(true);
      pendingPathname.current = url.pathname;

      const href = `${url.pathname}${url.search}${url.hash}`;
      if (navigateTimer.current) {
        clearTimeout(navigateTimer.current);
      }
      navigateTimer.current = setTimeout(() => {
        router.push(href);
      }, COVER_MS);
    };

    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [pathname, router]);

  useEffect(() => {
    if (!pendingPathname.current || pendingPathname.current !== pathname) {
      return;
    }

    pendingPathname.current = null;
    if (revealTimer.current) {
      clearTimeout(revealTimer.current);
    }
    revealTimer.current = setTimeout(() => {
      setActive(false);
    }, HOLD_MS);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (navigateTimer.current) {
        clearTimeout(navigateTimer.current);
      }
      if (revealTimer.current) {
        clearTimeout(revealTimer.current);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cx(
        'page-transition pointer-events-none fixed inset-0 z-[500] flex items-center justify-center bg-black',
        active && 'is-active',
      )}
    >
      <ScrambleText
        text={label}
        triggerKey={label}
        className={cx('font-mono text-[11px] uppercase text-lime-300', tracking.label)}
      />
    </div>
  );
}

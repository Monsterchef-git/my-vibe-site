'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { tracking } from '@/design/tokens/primitives/atmosphere';
import { pageGutterClassName } from '@/design/tokens/semantic/layout';
import { cx } from '@/lib/utils/cx';

type Discipline = 'hospitality' | 'digital';
type Filter = 'all' | Discipline;

const FILTERS: {
  id: Filter;
  label: string;
  activeClassName: string;
  underlineClassName: string;
  cursorRole: 'chef' | 'dev';
}[] = [
  { id: 'all', label: 'All', activeClassName: 'text-white', underlineClassName: 'bg-white', cursorRole: 'dev' },
  { id: 'hospitality', label: '#Hospitality', activeClassName: 'text-lime-300', underlineClassName: 'bg-lime-300', cursorRole: 'chef' },
  { id: 'digital', label: '#Digital', activeClassName: 'text-cyan-300', underlineClassName: 'bg-cyan-300', cursorRole: 'dev' },
];

const HASH_TO_FILTER: Record<string, Discipline> = {
  '#works-gastronomy': 'hospitality',
  '#works-development': 'digital',
};

function isVisible(discipline: string | undefined, filter: Filter) {
  if (filter === 'all') return discipline !== undefined;
  // The divider only reads as a bridge when both groups are shown.
  if (discipline === 'divider') return false;
  return discipline === filter;
}

export default function WorksFilter({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<Filter>('all');
  const groupsRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  // Deep links from the home morph CTAs (/works#works-development) preselect.
  useEffect(() => {
    const applyHash = () => {
      const mapped = HASH_TO_FILTER[window.location.hash];
      if (mapped) setFilter(mapped);
    };
    applyHash();
  }, []);

  // Show/hide the discipline groups with a crossfade, then let ScrollTrigger
  // recompute (the gastronomy pin + reveals depend on document height).
  useGSAP(
    () => {
      const groups =
        groupsRef.current?.querySelectorAll<HTMLElement>('[data-discipline]');
      if (!groups) return;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let pendingRefresh = false;

      groups.forEach((group) => {
        const shouldShow = isVisible(group.dataset.discipline, filter);
        const hidden = group.style.display === 'none';

        if (shouldShow && hidden) {
          group.style.display = '';
          pendingRefresh = true;
          if (reduced) gsap.set(group, { autoAlpha: 1 });
          else gsap.fromTo(group, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' });
        } else if (!shouldShow && !hidden) {
          if (reduced) {
            group.style.display = 'none';
            pendingRefresh = true;
          } else {
            gsap.to(group, {
              autoAlpha: 0,
              duration: 0.3,
              ease: 'power2.in',
              onComplete: () => {
                group.style.display = 'none';
                ScrollTrigger.refresh();
              },
            });
          }
        }
      });

      if (pendingRefresh) ScrollTrigger.refresh();
    },
    { dependencies: [filter], scope: groupsRef },
  );

  // Slide the active underline to the selected filter.
  useGSAP(
    () => {
      const bar = barRef.current;
      const underline = underlineRef.current;
      const activeButton = bar?.querySelector<HTMLElement>(`[data-filter="${filter}"]`);
      if (!bar || !underline || !activeButton) return;

      const barBox = bar.getBoundingClientRect();
      const buttonBox = activeButton.getBoundingClientRect();
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      gsap.to(underline, {
        x: buttonBox.left - barBox.left,
        width: buttonBox.width,
        duration: reduced ? 0 : 0.4,
        ease: 'power2.inOut',
      });
    },
    { dependencies: [filter], scope: barRef },
  );

  return (
    <>
      <div
        className={cx(
          'border-y border-zinc-900/70 py-4',
          pageGutterClassName,
        )}
      >
        <div
          ref={barRef}
          role="group"
          aria-label="Filter works"
          className="relative flex items-center gap-6 md:gap-10"
        >
          <span
            ref={underlineRef}
            aria-hidden="true"
            className={cx(
              'pointer-events-none absolute -bottom-4 left-0 h-px',
              FILTERS.find((item) => item.id === filter)?.underlineClassName,
            )}
          />
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              data-filter={item.id}
              data-cursor-mode="cta"
              data-cursor-label="Filter"
              data-cursor-role={item.cursorRole}
              data-magnetic="link"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={cx(
                'min-h-11 font-mono text-[11px] uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
                tracking.eyebrow,
                filter === item.id ? item.activeClassName : 'text-zinc-500 hover:text-zinc-300',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div ref={groupsRef}>{children}</div>
    </>
  );
}

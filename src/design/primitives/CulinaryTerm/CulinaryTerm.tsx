'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cx } from '@/lib/utils/cx';

export const CULINARY_MAP = {
  plating: 'SHIP IT',
  'mise en place': 'SETUP',
  service: 'LIVE',
  prep: 'BUILD',
  pass: 'HANDOFF',
  ticket: 'BRIEF',
  tasting: 'REVIEW',
  course: 'CHAPTER',
} as const;

const CULINARY_DEFINITIONS: Record<AllowedCulinaryTerm, string> = {
  plating: 'the art of arranging a dish for clarity, balance, and impact',
  'mise en place': 'everything prepared and placed before service begins',
  service: 'the live period when preparation becomes delivery',
  prep: 'the work completed before execution',
  pass: 'the final checkpoint between kitchen and guest',
  ticket: 'the brief that sets the work in motion',
  tasting: 'a focused review through direct experience',
  course: 'one chapter in a larger sequence',
};

export type AllowedCulinaryTerm = keyof typeof CULINARY_MAP;

interface CulinaryTermProps {
  term: AllowedCulinaryTerm;
  children?: ReactNode;
  className?: string;
}

export function CulinaryTerm({ term, children, className }: CulinaryTermProps) {
  const label = CULINARY_MAP[term];
  const [open, setOpen] = useState(false);
  const touchMode = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    touchMode.current = window.matchMedia('(hover: none)').matches;
    return () => clearTimeout(closeTimer.current);
  }, []);

  const toggleTooltip = () => {
    if (!touchMode.current) {
      return;
    }

    clearTimeout(closeTimer.current);
    setOpen((current) => {
      const next = !current;
      if (next) {
        closeTimer.current = setTimeout(() => setOpen(false), 2000);
      }
      return next;
    });
  };
  
  return (
    <span
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={toggleTooltip}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleTooltip();
        }
      }}
      data-cursor-role="chef"
      data-cursor-mode="lens"
      data-cursor-label={label}
      className={cx(
        'group/culinary relative inline-block cursor-default border-b border-dashed border-zinc-700 transition-colors hover:border-lime-400/60',
        className
      )}
    >
      {children || term}
      <span
        aria-hidden="true"
        className={cx(
          'pointer-events-none absolute bottom-[calc(100%+0.65rem)] left-1/2 z-50 w-max max-w-[min(18rem,80vw)] -translate-x-1/2 border border-white/10 bg-zinc-950/96 px-3 py-2 font-mono text-[10px] not-italic leading-4 tracking-normal text-zinc-300 opacity-0 shadow-2xl transition-[opacity,transform] duration-200 group-hover/culinary:-translate-y-1 group-hover/culinary:opacity-100 group-focus-visible/culinary:-translate-y-1 group-focus-visible/culinary:opacity-100 motion-reduce:transition-none',
          open && '-translate-y-1 opacity-100',
        )}
      >
        <span className="text-lime-300">{term}:</span>{' '}
        {CULINARY_DEFINITIONS[term]}
      </span>
    </span>
  );
}

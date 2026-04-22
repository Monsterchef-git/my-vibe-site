'use client';

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

export type AllowedCulinaryTerm = keyof typeof CULINARY_MAP;

interface CulinaryTermProps {
  term: AllowedCulinaryTerm;
  children?: ReactNode;
  className?: string;
}

export function CulinaryTerm({ term, children, className }: CulinaryTermProps) {
  const label = CULINARY_MAP[term];
  
  return (
    <span
      data-cursor-role="chef"
      data-cursor-mode="link"
      data-cursor-label={label}
      className={cx(
        'inline-block cursor-default border-b border-dashed border-zinc-700 transition-colors hover:border-lime-400/60',
        className
      )}
    >
      {children || term}
    </span>
  );
}

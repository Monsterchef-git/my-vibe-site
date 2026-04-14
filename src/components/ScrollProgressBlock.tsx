'use client';

import { useRef } from 'react';
import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import useScrollProgress, { type ScrollTone } from '@/components/useScrollProgress';

type ScrollProgressVariant = 'surface' | 'bridge' | 'hero' | 'footer';

const TONE_RGB: Record<ScrollTone, string> = {
  neutral: '161 161 170',
  lime: '202 253 0',
  cyan: '34 211 238',
  blue: '96 165 250',
  white: '255 255 255',
};

interface ScrollProgressStyle extends CSSProperties {
  '--scroll-progress'?: string;
  '--scroll-depth'?: string;
  '--scroll-active'?: string;
  '--scroll-accent-rgb'?: string;
}

interface ScrollProgressBlockProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'footer';
  scrollTone?: ScrollTone;
  variant?: ScrollProgressVariant;
}

export default function ScrollProgressBlock({
  as = 'section',
  className,
  scrollTone = 'neutral',
  style,
  variant = 'surface',
  ...props
}: ScrollProgressBlockProps) {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref);
  const mergedStyle: ScrollProgressStyle = {
    '--scroll-progress': '0',
    '--scroll-depth': '0',
    '--scroll-active': '0',
    '--scroll-accent-rgb': TONE_RGB[scrollTone],
    ...style,
  };

  const sharedProps = {
    'data-scroll-progress': '',
    'data-scroll-tone': scrollTone,
    'data-scroll-variant': variant,
    className: ['scroll-progress-block', `scroll-progress-${variant}`, className]
      .filter(Boolean)
      .join(' '),
    style: mergedStyle,
    ...props,
  };

  if (as === 'div') {
    return (
      <div
        ref={ref as Ref<HTMLDivElement>}
        {...sharedProps}
      />
    );
  }

  if (as === 'footer') {
    return (
      <footer
        ref={ref as Ref<HTMLElement>}
        {...sharedProps}
      />
    );
  }

  return (
    <section
      ref={ref as Ref<HTMLElement>}
      {...sharedProps}
    />
  );
}

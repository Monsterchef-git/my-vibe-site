'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface SplitRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  by?: 'word' | 'char';
  delay?: number; // base delay in ms
  stagger?: number; // ms between each word/char
}

export default function SplitReveal({
  children,
  className = '',
  as: Tag = 'div',
  by = 'word',
  delay = 0,
  stagger = 60,
}: SplitRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  const units = by === 'char'
    ? children.split('')
    : children.split(' ');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const spans = el.querySelectorAll<HTMLSpanElement>('[data-unit]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            spans.forEach((span, i) => {
              span.style.transitionDelay = `${delay + i * stagger}ms`;
              span.classList.add('split-visible');
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, stagger]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={containerRef} className={className} aria-label={children}>
      {units.map((unit, i) => (
        <span
          key={i}
          data-unit
          className="split-unit"
          aria-hidden="true"
        >
          {unit}
          {by === 'word' && i < units.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}

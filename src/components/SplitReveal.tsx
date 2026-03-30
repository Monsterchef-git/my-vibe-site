'use client';

import { useEffect, useRef } from 'react';
import type { ElementType, HTMLAttributes, Ref } from 'react';

type SplitRevealProps = HTMLAttributes<HTMLElement> & {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  by?: 'word' | 'char';
  delay?: number; // base delay in ms
  stagger?: number; // ms between each word/char
};

export default function SplitReveal({
  children,
  className = '',
  as = 'div',
  by = 'word',
  delay = 0,
  stagger = 60,
  ...props
}: SplitRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const Component = as as ElementType;

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
    <Component
      ref={containerRef as Ref<HTMLElement>}
      className={className}
      aria-label={children}
      {...props}
    >
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
    </Component>
  );
}

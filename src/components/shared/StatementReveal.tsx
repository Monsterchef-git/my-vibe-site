'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from '@/lib/gsap';
import { cx } from '@/lib/utils/cx';

interface StatementRevealProps {
  children: ReactNode;
  className?: string;
}

export default function StatementReveal({
  children,
  className,
}: StatementRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Plain-string statements are safe to split; rich statements wrap interactive
  // components (CulinaryTerm) whose DOM React owns and SplitText must not touch.
  const isPlainText = typeof children === 'string';

  // StatementReveal only ever wraps the hero headline, which is always above the
  // fold — so the reveal plays on mount rather than waiting on a scroll trigger
  // (a scroll gate here just races font loading and leaves the hero blank).
  useGSAP(
    () => {
      const node = ref.current;
      if (!node) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      if (isPlainText) {
        let split: SplitText | null = null;
        let tween: gsap.core.Tween | null = null;
        let cancelled = false;

        // Split after fonts settle so line breaks match the rendered Fraunces.
        document.fonts.ready.then(() => {
          if (cancelled || !ref.current) return;

          // No line mask: the hero's tight leading-[0.92] italic has glyphs
          // taller than the line box, so an overflow-clip mask would crop
          // descenders/ascenders permanently. Reveal with a rise + fade instead.
          split = SplitText.create(node, { type: 'lines' });
          tween = gsap.from(split.lines, {
            yPercent: 60,
            autoAlpha: 0,
            duration: 0.9,
            ease: 'expo.out',
            stagger: 0.12,
          });
        });

        return () => {
          cancelled = true;
          tween?.kill();
          split?.revert();
        };
      }

      // Rich children: reveal the block as a whole, leaving its DOM intact.
      const tween = gsap.from(node, {
        yPercent: 16,
        autoAlpha: 0,
        duration: 0.85,
        ease: 'expo.out',
      });

      return () => tween.kill();
    },
    { scope: ref, dependencies: [isPlainText] },
  );

  return (
    <span
      ref={ref}
      className={cx('statement-reveal', !isPlainText && 'inline-block', className)}
    >
      {children}
    </span>
  );
}

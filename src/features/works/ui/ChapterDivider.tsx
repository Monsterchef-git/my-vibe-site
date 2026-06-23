'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { pageGutterClassName } from '@/design/tokens/semantic/layout';
import { cx } from '@/lib/utils/cx';

/**
 * Copy-free editorial divider between the Gastronomy (lime) and Digital (cyan)
 * sections: a hairline that draws left→right on scroll, bridging the two tones.
 * Reduced motion shows it fully drawn.
 */
export default function ChapterDivider() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const line = lineRef.current;
      if (!line) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(line, { scaleX: 1 });
        return;
      }

      gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
      const tween = gsap.to(line, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 82%',
          end: 'top 32%',
          scrub: 0.5,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cx('py-20 md:py-28', pageGutterClassName)}
    >
      <span
        ref={lineRef}
        className="block h-px w-full origin-left bg-[linear-gradient(90deg,rgba(202,253,0,0.7)_0%,rgba(113,113,122,0.5)_50%,rgba(34,211,238,0.7)_100%)]"
      />
    </div>
  );
}

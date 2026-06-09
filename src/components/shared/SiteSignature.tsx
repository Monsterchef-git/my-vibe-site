'use client';

import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/utils/cx';

export default function SiteSignature() {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none flex justify-center pt-12 md:pt-20"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/signature.png"
        alt=""
        className={cx(
          'site-signature block h-auto w-full max-w-[640px] opacity-90 md:max-w-[920px] lg:max-w-[1200px]',
          drawn && 'is-drawn',
        )}
      />
    </div>
  );
}

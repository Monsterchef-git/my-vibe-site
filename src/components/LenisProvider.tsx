'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function LenisProvider() {
  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let lenis: Lenis | null = null;
    let raf: number | null = null;

    const destroyLenis = () => {
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }

      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
    };

    const setupLenis = () => {
      destroyLenis();

      if (!desktopQuery.matches || reducedMotionQuery.matches) {
        return;
      }

      lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 1,
      });

      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };

      raf = requestAnimationFrame(loop);
    };

    setupLenis();
    desktopQuery.addEventListener('change', setupLenis);
    reducedMotionQuery.addEventListener('change', setupLenis);

    return () => {
      desktopQuery.removeEventListener('change', setupLenis);
      reducedMotionQuery.removeEventListener('change', setupLenis);
      destroyLenis();
    };
  }, []);

  return null;
}

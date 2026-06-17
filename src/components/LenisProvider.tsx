'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function LenisProvider() {
  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let lenis: Lenis | null = null;

    // Drive Lenis from GSAP's ticker so there's a single rAF loop shared with
    // ScrollTrigger. gsap.ticker passes seconds; lenis.raf expects ms.
    const tick = (time: number) => {
      lenis?.raf(time * 1000);
    };

    const onLenisScroll = () => ScrollTrigger.update();

    const destroyLenis = () => {
      if (lenis) {
        gsap.ticker.remove(tick);
        lenis.off('scroll', onLenisScroll);
        lenis.destroy();
        lenis = null;
      }
    };

    const setupLenis = () => {
      destroyLenis();

      // No Lenis on touch/mobile or reduced-motion: ScrollTrigger falls back to
      // native scroll, which it tracks on its own.
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

      lenis.on('scroll', onLenisScroll);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
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

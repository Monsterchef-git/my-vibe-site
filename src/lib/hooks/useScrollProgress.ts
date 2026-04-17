'use client';

import { useEffect } from 'react';
import type { RefObject } from 'react';

export type ScrollTone = 'neutral' | 'lime' | 'cyan' | 'blue' | 'white';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function writeProgressVariables(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  const viewportHeight = window.innerHeight || 1;
  const progress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1);
  const centerDistance = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);
  const centerRange = viewportHeight / 2 + rect.height / 2;
  const depth = 1 - clamp(centerDistance / centerRange, 0, 1);
  const active = rect.top < viewportHeight && rect.bottom > 0 ? 1 : 0;

  node.style.setProperty('--scroll-progress', progress.toFixed(4));
  node.style.setProperty('--scroll-depth', depth.toFixed(4));
  node.style.setProperty('--scroll-active', active.toFixed(0));
}

export default function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    let frame = 0;

    const schedule = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (ref.current) {
          writeProgressVariables(ref.current);
        }
      });
    };

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(node);

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);

    schedule();

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      resizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('load', schedule);
    };
  }, [ref]);
}

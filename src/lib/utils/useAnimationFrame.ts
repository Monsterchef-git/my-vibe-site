// src/lib/utils/useAnimationFrame.ts

import { useEffect, useRef } from 'react';

/**
 * Runs the provided callback on every animation frame while the component is mounted.
 * Returns a ref to the current animation frame id for possible manual cancellation.
 * The callback receives the timestamp from requestAnimationFrame.
 */
export function useAnimationFrame(callback: (time: number) => void) {
  const requestRef = useRef<number | null>(null);

  const animate = (time: number) => {
    callback(time);
    requestRef.current = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = window.requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== null) {
        window.cancelAnimationFrame(requestRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return requestRef;
}

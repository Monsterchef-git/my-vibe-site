import { useCallback, useEffect, useRef } from 'react';

/**
 * Frame loop that can pause itself.
 * Callback returns `false` to stop the chain; external callers use the returned
 * `start` fn to resume (pointer move, scroll, hover state change, etc).
 */
export function useAnimationFrame(callback: (time: number) => boolean | void) {
  const idRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const cbRef = useRef(callback);
  const tickRef = useRef<(time: number) => void>(() => {});

  useEffect(() => {
    cbRef.current = callback;
  }, [callback]);

  useEffect(() => {
    tickRef.current = (time: number) => {
      const keepAlive = cbRef.current(time);
      if (keepAlive === false) {
        runningRef.current = false;
        idRef.current = null;
        return;
      }

      idRef.current = window.requestAnimationFrame(tickRef.current);
    };
  }, []);

  const start = useCallback(() => {
    if (runningRef.current) {
      return;
    }

    runningRef.current = true;
    idRef.current = window.requestAnimationFrame(tickRef.current);
  }, []);

  useEffect(() => {
    start();
    return () => {
      if (idRef.current !== null) {
        cancelAnimationFrame(idRef.current);
      }
      runningRef.current = false;
      idRef.current = null;
    };
  }, [start]);

  return start;
}

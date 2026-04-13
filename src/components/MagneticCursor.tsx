'use client';

import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR = [
  'a[href]',
  'button',
  '[role="button"]',
  'input:not([type="hidden"])',
  'textarea',
  'select',
  'summary',
  '[data-magnetic]',
].join(',');

const BASE_SIZE = 26;
const HOVER_MIN_WIDTH = 44;
const HOVER_MAX_WIDTH = 140;
const HOVER_MIN_HEIGHT = 44;
const HOVER_MAX_HEIGHT = 88;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const enabledRef = useRef(false);
  const visibleRef = useRef(false);
  const pressedRef = useRef(false);
  const activeElementRef = useRef<HTMLElement | null>(null);
  const previousLensElementRef = useRef<HTMLElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const sizeRef = useRef({ width: BASE_SIZE, height: BASE_SIZE });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    if (!cursor || !dot) {
      return;
    }

    const desktopQuery = window.matchMedia(
      '(min-width: 768px) and (hover: hover) and (pointer: fine)',
    );
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const clearLensState = (element: HTMLElement | null) => {
      if (!element || element.dataset.magnetic !== 'lens') {
        return;
      }

      element.style.removeProperty('--lens-x');
      element.style.removeProperty('--lens-y');
      element.style.removeProperty('--lens-active');
    };

    const render = () => {
      frameRef.current = null;

      if (!enabledRef.current) {
        return;
      }

      const activeElement = activeElementRef.current;
      const isLensMode = activeElement?.dataset.magnetic === 'lens';
      const pointer = pointerRef.current;
      let targetX = pointer.x;
      let targetY = pointer.y;
      let targetWidth = BASE_SIZE;
      let targetHeight = BASE_SIZE;

      if (activeElement && activeElement.isConnected) {
        const rect = activeElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        if (isLensMode) {
          const lensSize = clamp(Math.max(rect.height + 26, 78), 78, 108);
          const localX = pointer.x - rect.left;
          const localY = pointer.y - rect.top;
          targetX = pointer.x + (centerX - pointer.x) * 0.22;
          targetY = pointer.y + (centerY - pointer.y) * 0.22;
          targetWidth = lensSize;
          targetHeight = lensSize;
          activeElement.style.setProperty('--lens-x', `${localX}px`);
          activeElement.style.setProperty('--lens-y', `${localY}px`);
          activeElement.style.setProperty('--lens-active', '1');
          previousLensElementRef.current = activeElement;
        } else {
          targetX = pointer.x + (centerX - pointer.x) * 0.42;
          targetY = pointer.y + (centerY - pointer.y) * 0.42;
          targetWidth = clamp(rect.width + 18, HOVER_MIN_WIDTH, HOVER_MAX_WIDTH);
          targetHeight = clamp(rect.height + 14, HOVER_MIN_HEIGHT, HOVER_MAX_HEIGHT);
          clearLensState(previousLensElementRef.current);
          previousLensElementRef.current = null;
        }
      } else {
        clearLensState(previousLensElementRef.current);
        previousLensElementRef.current = null;
      }

      const easing = activeElement ? 0.16 : 0.22;
      currentRef.current.x += (targetX - currentRef.current.x) * easing;
      currentRef.current.y += (targetY - currentRef.current.y) * easing;
      sizeRef.current.width += (targetWidth - sizeRef.current.width) * 0.18;
      sizeRef.current.height += (targetHeight - sizeRef.current.height) * 0.18;

      const width = sizeRef.current.width * (pressedRef.current ? 0.9 : 1);
      const height = sizeRef.current.height * (pressedRef.current ? 0.9 : 1);

      cursor.style.opacity = visibleRef.current ? '1' : '0';
      cursor.style.width = `${width}px`;
      cursor.style.height = `${height}px`;
      cursor.style.borderColor = isLensMode ? 'rgba(255,255,255,0.22)' : 'rgba(202,253,0,0.9)';
      cursor.style.background = isLensMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.10)';
      cursor.style.boxShadow = isLensMode
        ? '0 18px 44px rgba(0,0,0,0.26), inset 0 0 0 1px rgba(255,255,255,0.08)'
        : '0 0 22px rgba(202,253,0,0.16), inset 0 0 0 1px rgba(202,253,0,0.14)';
      cursor.style.backdropFilter = 'none';
      dot.style.opacity = isLensMode ? '0' : '1';
      cursor.style.transform = `translate3d(${currentRef.current.x - width / 2}px, ${
        currentRef.current.y - height / 2
      }px, 0)`;

      frameRef.current = window.requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (frameRef.current == null) {
        frameRef.current = window.requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      if (frameRef.current != null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    const resetCursor = () => {
      activeElementRef.current = null;
      visibleRef.current = false;
      pressedRef.current = false;
      sizeRef.current = { width: BASE_SIZE, height: BASE_SIZE };
      cursor.style.opacity = '0';
      cursor.style.width = `${BASE_SIZE}px`;
      cursor.style.height = `${BASE_SIZE}px`;
      clearLensState(previousLensElementRef.current);
      previousLensElementRef.current = null;
      cursor.style.borderColor = 'rgba(202,253,0,0.9)';
      cursor.style.background = 'rgba(0,0,0,0.10)';
      cursor.style.boxShadow = '0 0 22px rgba(202,253,0,0.16), inset 0 0 0 1px rgba(202,253,0,0.14)';
      cursor.style.backdropFilter = 'none';
      dot.style.opacity = '1';
    };

    const updateEnabled = () => {
      const nextEnabled = desktopQuery.matches && !reducedMotionQuery.matches;

      enabledRef.current = nextEnabled;
      setEnabled(nextEnabled);
      document.body.classList.toggle('magnetic-cursor-active', nextEnabled);

      if (!nextEnabled) {
        stopLoop();
        resetCursor();
      }
    };

    const updateInteractiveTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        clearLensState(previousLensElementRef.current);
        previousLensElementRef.current = null;
        activeElementRef.current = null;
        return;
      }

      const interactiveTarget = target.closest(INTERACTIVE_SELECTOR);
      if (activeElementRef.current && activeElementRef.current !== interactiveTarget) {
        clearLensState(previousLensElementRef.current);
        previousLensElementRef.current = null;
      }
      activeElementRef.current = interactiveTarget instanceof HTMLElement ? interactiveTarget : null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!enabledRef.current) {
        return;
      }

      pointerRef.current = { x: event.clientX, y: event.clientY };

      if (!visibleRef.current) {
        visibleRef.current = true;
        currentRef.current = { x: event.clientX, y: event.clientY };
      }

      updateInteractiveTarget(event.target);
      startLoop();
    };

    const handlePointerLeave = () => {
      activeElementRef.current = null;
      visibleRef.current = false;
    };

    const handlePointerDown = () => {
      pressedRef.current = true;
    };

    const handlePointerUp = () => {
      pressedRef.current = false;
    };

    updateEnabled();

    desktopQuery.addEventListener('change', updateEnabled);
    reducedMotionQuery.addEventListener('change', updateEnabled);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', handlePointerUp, { passive: true });
    window.addEventListener('blur', handlePointerLeave);
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      stopLoop();
      document.body.classList.remove('magnetic-cursor-active');
      desktopQuery.removeEventListener('change', updateEnabled);
      reducedMotionQuery.removeEventListener('change', updateEnabled);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('blur', handlePointerLeave);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[260] items-center justify-center rounded-full border border-[#cafd00] bg-black/10 opacity-0 shadow-[0_0_22px_rgba(202,253,0,0.16),inset_0_0_0_1px_rgba(202,253,0,0.14)] ${
        enabled ? 'flex' : 'hidden'
      }`}
    >
      <span
        ref={dotRef}
        className="h-1 w-1 rounded-full bg-[#cafd00] shadow-[0_0_10px_rgba(202,253,0,0.75)] transition-opacity duration-200"
      />
    </div>
  );
}

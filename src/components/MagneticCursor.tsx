'use client';

import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR = [
  '[data-cursor]',
  'a[href]',
  'button',
  '[role="button"]',
  'input:not([type="hidden"])',
  'textarea',
  'select',
  'summary',
  '[data-magnetic]',
].join(',');

const CURSOR_MODES = ['idle', 'link', 'cta', 'lens', 'drag', 'scroll', 'portrait', 'keyword'] as const;
const CURSOR_TONES = ['neutral', 'lime', 'cyan', 'blue', 'white'] as const;
const CURSOR_ROLES = ['chef', 'dev', 'bridge', 'service'] as const;

type CursorMode = (typeof CURSOR_MODES)[number];
type CursorTone = (typeof CURSOR_TONES)[number];
type CursorRole = (typeof CURSOR_ROLES)[number];

const ROLE_MAP: Record<CursorRole, { tone: CursorTone; label: string }> = {
  chef: { tone: 'lime', label: 'TASTE' },
  dev: { tone: 'cyan', label: 'SHIP' },
  bridge: { tone: 'white', label: '→' },
  service: { tone: 'lime', label: 'PLATE' },
};

const BASE_SIZE = 18;
const BASE_EASING = 0.22;

const TONE_RGB: Record<CursorTone, string> = {
  neutral: '161, 161, 170',
  lime: '202, 253, 0',
  cyan: '34, 211, 238',
  blue: '96, 165, 250',
  white: '255, 255, 255',
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const isCursorMode = (value: string | undefined): value is CursorMode =>
  CURSOR_MODES.includes(value as CursorMode);

const isCursorTone = (value: string | undefined): value is CursorTone =>
  CURSOR_TONES.includes(value as CursorTone);

const isCursorRole = (value: string | undefined): value is CursorRole =>
  CURSOR_ROLES.includes(value as CursorRole);

const getCursorMode = (element: HTMLElement | null): CursorMode => {
  if (!element) {
    return 'idle';
  }

  const mode = element.dataset.cursorMode || element.dataset.cursor;
  return isCursorMode(mode) ? mode : 'link';
};

const getCursorLabel = (element: HTMLElement | null): string => {
  if (element?.dataset.cursorLabel) {
    return element.dataset.cursorLabel.trim();
  }

  const role = element?.closest<HTMLElement>('[data-cursor-role]')?.dataset.cursorRole;
  if (isCursorRole(role)) {
    return ROLE_MAP[role].label;
  }

  return '';
};

const getCursorTone = (element: HTMLElement | null): CursorTone => {
  if (!element) {
    return 'neutral';
  }

  const explicitTone = element.dataset.cursorTone
    ?? element.closest<HTMLElement>('[data-cursor-tone]')?.dataset.cursorTone
    ?? element.closest<HTMLElement>('[data-scroll-tone]')?.dataset.scrollTone;

  if (isCursorTone(explicitTone)) {
    return explicitTone;
  }

  const role = element.closest<HTMLElement>('[data-cursor-role]')?.dataset.cursorRole;
  if (isCursorRole(role)) {
    return ROLE_MAP[role].tone;
  }

  return 'neutral';
};

const getStickiness = (element: HTMLElement | null) =>
  element?.dataset.cursorStick === 'true';

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const enabledRef = useRef(false);
  const visibleRef = useRef(false);
  const pressedRef = useRef(false);
  const activeElementRef = useRef<HTMLElement | null>(null);
  const hoveredElementRef = useRef<HTMLElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const sizeRef = useRef({ width: BASE_SIZE, height: BASE_SIZE });
  const velocityRef = useRef({ x: 0, y: 0 });
  const speedRef = useRef(0);
  const angleRef = useRef(0);
  const stretchRef = useRef(0);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const shell = shellRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;

    if (!cursor || !shell || !dot || !label) {
      return;
    }

    const desktopQuery = window.matchMedia(
      '(min-width: 768px) and (hover: hover) and (pointer: fine)',
    );
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const render = () => {
      frameRef.current = null;

      if (!enabledRef.current) {
        return;
      }

      const activeElement = activeElementRef.current?.isConnected
        ? activeElementRef.current
        : null;
      const hoveredElement = hoveredElementRef.current?.isConnected
        ? hoveredElementRef.current
        : null;
      const mode = getCursorMode(activeElement);
      const tone = getCursorTone(activeElement ?? hoveredElement);
      const labelText = getCursorLabel(activeElement);
      const rgb = TONE_RGB[tone];
      const pointer = pointerRef.current;
      const hasLabel = labelText.length > 0;
      const isPressed = pressedRef.current;

      let targetX = pointer.x;
      let targetY = pointer.y;
      let targetWidth = BASE_SIZE;
      let targetHeight = BASE_SIZE;
      let easing = BASE_EASING;

      if (activeElement) {
        const rect = activeElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const stickyBoost = getStickiness(activeElement) ? 0.14 : 0;

        if (mode === 'lens') {
          const localX = rect.width > 0 ? pointer.x - rect.left : 0;
          const localY = rect.height > 0 ? pointer.y - rect.top : 0;
          const lensOffsetX = rect.width > 0 ? ((localX / rect.width) - 0.5) * 18 : 0;
          const lensOffsetY = rect.height > 0 ? ((localY / rect.height) - 0.5) * 12 : 0;

          targetWidth = clamp(rect.width * 0.34, 96, 184);
          targetHeight = clamp(rect.height * 0.2, 68, 116);
          targetX = pointer.x + (centerX - pointer.x) * (0.22 + stickyBoost) + lensOffsetX * 0.34;
          targetY = pointer.y + (centerY - pointer.y) * (0.18 + stickyBoost * 0.4) + lensOffsetY * 0.34;
          easing = 0.14;
        } else if (mode === 'cta') {
          targetWidth = clamp(rect.width + 28, 72, 196);
          targetHeight = clamp(rect.height + 18, 42, 64);
          targetX = pointer.x + (centerX - pointer.x) * (0.46 + stickyBoost);
          targetY = pointer.y + (centerY - pointer.y) * (0.46 + stickyBoost);
          easing = 0.18;
        } else if (mode === 'drag') {
          targetWidth = clamp(rect.width * 0.46, 108, 184);
          targetHeight = clamp(rect.height * 0.16, 48, 74);
          targetX = pointer.x + (centerX - pointer.x) * (0.3 + stickyBoost);
          targetY = pointer.y + (centerY - pointer.y) * (0.26 + stickyBoost * 0.5);
          easing = 0.15;
        } else if (mode === 'scroll') {
          targetWidth = hasLabel ? clamp(labelText.length * 11 + 42, 92, 136) : 96;
          targetHeight = 36;
          targetX = pointer.x;
          targetY = pointer.y;
          easing = 0.2;
        } else if (mode === 'portrait') {
          targetWidth = clamp(rect.width * 0.4, 200, 320);
          targetHeight = clamp(rect.height * 0.3, 200, 320);
          targetX = pointer.x;
          targetY = pointer.y;
          easing = 0.12;
        } else if (mode === 'keyword') {
          targetWidth = 110;
          targetHeight = 44;
          targetX = pointer.x;
          targetY = pointer.y;
          easing = 0.22;
        } else {
          targetWidth = clamp(rect.width + 18, 54, 168);
          targetHeight = clamp(rect.height + 12, 36, 56);
          targetX = pointer.x + (centerX - pointer.x) * (0.38 + stickyBoost);
          targetY = pointer.y + (centerY - pointer.y) * (0.38 + stickyBoost);
          easing = 0.17;
        }
      }

      currentRef.current.x += (targetX - currentRef.current.x) * easing;
      currentRef.current.y += (targetY - currentRef.current.y) * easing;
      sizeRef.current.width += (targetWidth - sizeRef.current.width) * 0.2;
      sizeRef.current.height += (targetHeight - sizeRef.current.height) * 0.2;

      speedRef.current += (
        Math.hypot(velocityRef.current.x, velocityRef.current.y) - speedRef.current
      ) * 0.2;

      const targetAngle = speedRef.current > 0.2
        ? (Math.atan2(velocityRef.current.y, velocityRef.current.x) * 180) / Math.PI
        : 0;
      const maxStretch = mode === 'lens' || mode === 'portrait' ? 0.08 : mode === 'idle' ? 0.04 : 0.14;
      const stretch = clamp(speedRef.current / 26, 0, maxStretch);

      angleRef.current += (targetAngle - angleRef.current) * 0.18;
      stretchRef.current += (stretch - stretchRef.current) * 0.18;

      const width = sizeRef.current.width * (isPressed ? 0.94 : 1);
      const height = sizeRef.current.height * (isPressed ? 0.92 : 1);
      const scaleX = 1 + stretchRef.current;
      const scaleY = 1 - stretchRef.current * 0.42;

      cursor.style.opacity = visibleRef.current ? '1' : '0';
      cursor.style.width = `${width}px`;
      cursor.style.height = `${height}px`;
      cursor.style.transform = `translate3d(${currentRef.current.x - width / 2}px, ${
        currentRef.current.y - height / 2
      }px, 0)`;

      shell.style.borderRadius = mode === 'lens' || mode === 'portrait' ? '28px' : '999px';
      shell.style.transform = `rotate(${angleRef.current}deg) scale(${scaleX}, ${scaleY})`;

      if (mode === 'idle') {
        shell.style.borderColor = `rgba(${rgb}, 0.2)`;
        shell.style.background = 'rgba(10, 10, 10, 0.08)';
        shell.style.boxShadow = `0 0 0 1px rgba(${rgb}, 0.1), 0 0 18px rgba(${rgb}, 0.08)`;
      } else if (mode === 'scroll') {
        shell.style.borderColor = `rgba(${rgb}, 0.72)`;
        shell.style.background = 'rgba(10, 10, 10, 0.18)';
        shell.style.boxShadow = `0 0 0 1px rgba(${rgb}, 0.16), 0 0 28px rgba(${rgb}, 0.18), inset 0 0 22px rgba(${rgb}, 0.06)`;
      } else if (mode === 'cta') {
        shell.style.borderColor = `rgba(${rgb}, 0.9)`;
        shell.style.background = `rgba(${rgb}, 0.08)`;
        shell.style.boxShadow = `0 0 0 1px rgba(${rgb}, 0.18), 0 0 34px rgba(${rgb}, 0.22), inset 0 0 20px rgba(${rgb}, 0.08)`;
      } else if (mode === 'lens') {
        shell.style.borderColor = `rgba(${rgb}, 0.72)`;
        shell.style.background = 'rgba(10, 10, 10, 0.04)';
        shell.style.boxShadow = `0 0 0 1px rgba(${rgb}, 0.14), inset 0 0 0 1px rgba(255, 255, 255, 0.03), 0 18px 42px rgba(0, 0, 0, 0.24)`;
      } else if (mode === 'drag') {
        shell.style.borderColor = `rgba(${rgb}, 0.8)`;
        shell.style.background = 'rgba(10, 10, 10, 0.12)';
        shell.style.boxShadow = `0 0 0 1px rgba(${rgb}, 0.14), 0 16px 34px rgba(0, 0, 0, 0.24)`;
      } else if (mode === 'portrait') {
        shell.style.borderColor = `rgba(${rgb}, 0.15)`;
        shell.style.background = `rgba(${rgb}, 0.02)`;
        shell.style.boxShadow = `0 0 60px 10px rgba(${rgb}, 0.12)`;
        cursor.style.filter = 'blur(12px)';
      } else if (mode === 'keyword') {
        shell.style.borderColor = `rgba(${rgb}, 0.85)`;
        shell.style.background = 'rgba(10, 10, 10, 0.45)';
        shell.style.boxShadow = `0 0 24px rgba(${rgb}, 0.32), inset 0 0 12px rgba(${rgb}, 0.12)`;
      } else {
        shell.style.borderColor = `rgba(${rgb}, 0.82)`;
        shell.style.background = 'rgba(10, 10, 10, 0.12)';
        shell.style.boxShadow = `0 0 0 1px rgba(${rgb}, 0.14), 0 0 26px rgba(${rgb}, 0.14)`;
        cursor.style.filter = 'none';
      }

      dot.style.opacity = mode === 'idle' ? '1' : mode === 'link' ? '0.45' : '0';
      dot.style.background = `rgba(${rgb}, 1)`;
      dot.style.boxShadow = `0 0 14px rgba(${rgb}, 0.72)`;

      label.textContent = labelText.toUpperCase();
      label.style.opacity = hasLabel && mode !== 'idle' ? '1' : '0';
      label.style.color = `rgba(${rgb}, ${mode === 'cta' || mode === 'keyword' ? '1' : '0.88'})`;
      label.style.fontWeight = mode === 'keyword' ? '900' : '400';
      label.style.letterSpacing = hasLabel && (mode === 'scroll' || mode === 'keyword') ? '0.26em' : hasLabel ? '0.32em' : '0.24em';

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
      hoveredElementRef.current = null;
      visibleRef.current = false;
      pressedRef.current = false;
      sizeRef.current = { width: BASE_SIZE, height: BASE_SIZE };
      velocityRef.current = { x: 0, y: 0 };
      speedRef.current = 0;
      angleRef.current = 0;
      stretchRef.current = 0;
      cursor.style.opacity = '0';
      cursor.style.width = `${BASE_SIZE}px`;
      cursor.style.height = `${BASE_SIZE}px`;
      shell.style.transform = 'scale(1)';
      shell.style.borderRadius = '999px';
      shell.style.borderColor = 'rgba(202, 253, 0, 0.2)';
      shell.style.background = 'rgba(10, 10, 10, 0.08)';
      shell.style.boxShadow = '0 0 0 1px rgba(202, 253, 0, 0.1), 0 0 18px rgba(202, 253, 0, 0.08)';
      dot.style.opacity = '1';
      dot.style.background = 'rgba(202, 253, 0, 1)';
      dot.style.boxShadow = '0 0 14px rgba(202, 253, 0, 0.72)';
      label.textContent = '';
      label.style.opacity = '0';
    };

    const updateEnabled = () => {
      // If prefers-reduced-motion: reduce is true, cursor falls back to the system cursor
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
        hoveredElementRef.current = null;
        activeElementRef.current = null;
        return;
      }

      const hoveredTarget = target instanceof HTMLElement ? target : null;
      const interactiveTarget = target.closest(INTERACTIVE_SELECTOR);

      hoveredElementRef.current = hoveredTarget;
      activeElementRef.current = interactiveTarget instanceof HTMLElement ? interactiveTarget : null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!enabledRef.current) {
        return;
      }

      const nextX = event.clientX;
      const nextY = event.clientY;

      if (!visibleRef.current) {
        visibleRef.current = true;
        currentRef.current = { x: nextX, y: nextY };
        pointerRef.current = { x: nextX, y: nextY };
        lastPointerRef.current = { x: nextX, y: nextY };
        velocityRef.current = { x: 0, y: 0 };
      } else {
        const deltaX = nextX - lastPointerRef.current.x;
        const deltaY = nextY - lastPointerRef.current.y;

        velocityRef.current.x += (deltaX - velocityRef.current.x) * 0.22;
        velocityRef.current.y += (deltaY - velocityRef.current.y) * 0.22;
        pointerRef.current = { x: nextX, y: nextY };
        lastPointerRef.current = { x: nextX, y: nextY };
      }

      updateInteractiveTarget(event.target);
      startLoop();
    };

    const handlePointerLeave = () => {
      activeElementRef.current = null;
      hoveredElementRef.current = null;
      visibleRef.current = false;
      velocityRef.current = { x: 0, y: 0 };
    };

    const handlePointerDown = () => {
      pressedRef.current = true;
      startLoop();
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
      className={`pointer-events-none fixed left-0 top-0 z-[260] opacity-0 ${
        enabled ? 'block' : 'hidden'
      }`}
    >
      <span
        ref={shellRef}
        className="absolute inset-0 rounded-full border border-transparent transition-[border-color,background-color,box-shadow] duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
      />
      <span
        ref={labelRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.32em] transition-opacity duration-[400ms] motion-reduce:transition-none"
      />
      <span
        ref={dotRef}
        className="absolute left-1/2 top-1/2 h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-[400ms] motion-reduce:transition-none"
      />
    </div>
  );
}

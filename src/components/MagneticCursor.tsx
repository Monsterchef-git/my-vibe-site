'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { cx } from '@/lib/utils/cx';
import { useAnimationFrame } from '@/lib/utils/useAnimationFrame';

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
const POINTER_SETTLE_DELAY_MS = 96;

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

type StyleSnapshot = {
  cursorOpacity: string;
  cursorWidth: string;
  cursorHeight: string;
  cursorTransform: string;
  cursorFilter: string;
  shellBorderRadius: string;
  shellTransform: string;
  shellBorderColor: string;
  shellBackground: string;
  shellBoxShadow: string;
  dotOpacity: string;
  dotBackground: string;
  dotBoxShadow: string;
  labelOpacity: string;
  labelColor: string;
  labelWeight: string;
  labelLetterSpacing: string;
};

const DEFAULT_STYLE_SNAPSHOT: StyleSnapshot = {
  cursorOpacity: '',
  cursorWidth: '',
  cursorHeight: '',
  cursorTransform: '',
  cursorFilter: '',
  shellBorderRadius: '',
  shellTransform: '',
  shellBorderColor: '',
  shellBackground: '',
  shellBoxShadow: '',
  dotOpacity: '',
  dotBackground: '',
  dotBoxShadow: '',
  labelOpacity: '',
  labelColor: '',
  labelWeight: '',
  labelLetterSpacing: '',
};

const MagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const enabledRef = useRef(false);
  const dirtyRef = useRef(true);
  const visibleRef = useRef(false);
  const pressedRef = useRef(false);
  const userEnabledRef = useRef(true);
  const activeElementRef = useRef<HTMLElement | null>(null);
  const activeRectRef = useRef<DOMRect | null>(null);
  const hoveredElementRef = useRef<HTMLElement | null>(null);
  const lastMoveTsRef = useRef(0);
  const lastStyleRef = useRef<StyleSnapshot>({ ...DEFAULT_STYLE_SNAPSHOT });
  const pointerRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const sizeRef = useRef({ width: BASE_SIZE, height: BASE_SIZE });
  const velocityRef = useRef({ x: 0, y: 0 });
  const speedRef = useRef(0);
  const angleRef = useRef(0);
  const stretchRef = useRef(0);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  const render = useCallback(() => {
    if (!dirtyRef.current) {
      return false;
    }

    const cursor = cursorRef.current;
    const shell = shellRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;

    if (!cursor || !shell || !dot || !label || !enabledRef.current) {
      return false;
    }

    const now = performance.now();
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
    let rect: DOMRect | null = null;

    if (activeElement) {
      rect = activeRectRef.current ?? activeElement.getBoundingClientRect();
      if (!activeRectRef.current) {
        activeRectRef.current = rect;
      }
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
    const qx = Math.round(currentRef.current.x * 10) / 10;
    const qy = Math.round(currentRef.current.y * 10) / 10;
    const qAngle = Math.round(angleRef.current * 10) / 10;
    const qScaleX = Math.round((1 + stretchRef.current) * 1000) / 1000;
    const qScaleY = Math.round((1 - stretchRef.current * 0.42) * 1000) / 1000;
    const qW = Math.round(width * 10) / 10;
    const qH = Math.round(height * 10) / 10;
    const nextCursorOpacity = visibleRef.current ? '1' : '0';
    const nextCursorWidth = `${qW}px`;
    const nextCursorHeight = `${qH}px`;
    const nextCursorTransform = `translate3d(${qx - qW / 2}px, ${
      qy - qH / 2
    }px, 0)`;
    const nextCursorFilter = mode === 'portrait' ? 'none' : 'none';
    const nextShellRadius = mode === 'lens' || mode === 'portrait' ? '28px' : '999px';
    const nextShellTransform = `rotate(${qAngle}deg) scale(${qScaleX}, ${qScaleY})`;

    let nextShellBorderColor = `rgba(${rgb}, 0.82)`;
    let nextShellBackground = 'rgba(10, 10, 10, 0.12)';
    let nextShellShadow = `0 0 0 1px rgba(${rgb}, 0.14), 0 0 26px rgba(${rgb}, 0.14)`;

    if (mode === 'idle') {
      nextShellBorderColor = `rgba(${rgb}, 0.2)`;
      nextShellBackground = 'rgba(10, 10, 10, 0.08)';
      nextShellShadow = `0 0 0 1px rgba(${rgb}, 0.1), 0 0 18px rgba(${rgb}, 0.08)`;
    } else if (mode === 'scroll') {
      nextShellBorderColor = `rgba(${rgb}, 0.72)`;
      nextShellBackground = 'rgba(10, 10, 10, 0.18)';
      nextShellShadow = `0 0 0 1px rgba(${rgb}, 0.16), 0 0 28px rgba(${rgb}, 0.18), inset 0 0 22px rgba(${rgb}, 0.06)`;
    } else if (mode === 'cta') {
      nextShellBorderColor = `rgba(${rgb}, 0.9)`;
      nextShellBackground = `rgba(${rgb}, 0.08)`;
      nextShellShadow = `0 0 0 1px rgba(${rgb}, 0.18), 0 0 34px rgba(${rgb}, 0.22), inset 0 0 20px rgba(${rgb}, 0.08)`;
    } else if (mode === 'lens') {
      nextShellBorderColor = `rgba(${rgb}, 0.72)`;
      nextShellBackground = 'rgba(10, 10, 10, 0.04)';
      nextShellShadow = `0 0 0 1px rgba(${rgb}, 0.14), inset 0 0 0 1px rgba(255, 255, 255, 0.03), 0 18px 42px rgba(0, 0, 0, 0.24)`;
    } else if (mode === 'drag') {
      nextShellBorderColor = `rgba(${rgb}, 0.8)`;
      nextShellBackground = 'rgba(10, 10, 10, 0.12)';
      nextShellShadow = `0 0 0 1px rgba(${rgb}, 0.14), 0 16px 34px rgba(0, 0, 0, 0.24)`;
    } else if (mode === 'portrait') {
      nextShellBorderColor = `rgba(${rgb}, 0.2)`;
      nextShellBackground = `rgba(${rgb}, 0.04)`;
      nextShellShadow = `0 0 36px 6px rgba(${rgb}, 0.14)`;
    } else if (mode === 'keyword') {
      nextShellBorderColor = `rgba(${rgb}, 0.85)`;
      nextShellBackground = 'rgba(10, 10, 10, 0.45)';
      nextShellShadow = `0 0 24px rgba(${rgb}, 0.32), inset 0 0 12px rgba(${rgb}, 0.12)`;
    }

    const nextDotOpacity = mode === 'idle' ? '1' : mode === 'link' ? '0.45' : '0';
    const nextDotBackground = `rgba(${rgb}, 1)`;
    const nextDotShadow = `0 0 14px rgba(${rgb}, 0.72)`;

    const nextText = labelText.toUpperCase();
    if (label.textContent !== nextText) {
      label.textContent = nextText;
    }
    const nextLabelOpacity = hasLabel && mode !== 'idle' ? '1' : '0';
    const nextLabelColor = `rgba(${rgb}, ${mode === 'cta' || mode === 'keyword' ? '1' : '0.88'})`;
    const nextLabelWeight = mode === 'keyword' ? '900' : '400';
    const nextLabelSpacing =
      hasLabel && (mode === 'scroll' || mode === 'keyword')
        ? '0.26em'
        : hasLabel
          ? '0.32em'
          : '0.24em';

    const applyStyle = <K extends keyof StyleSnapshot>(
      key: K,
      node: HTMLElement,
      property: keyof CSSStyleDeclaration,
      value: StyleSnapshot[K],
    ) => {
      if (lastStyleRef.current[key] === value) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (node.style as any)[property] = value;
      lastStyleRef.current[key] = value;
    };

    applyStyle('cursorOpacity', cursor, 'opacity', nextCursorOpacity);
    applyStyle('cursorWidth', cursor, 'width', nextCursorWidth);
    applyStyle('cursorHeight', cursor, 'height', nextCursorHeight);
    applyStyle('cursorTransform', cursor, 'transform', nextCursorTransform);
    applyStyle('cursorFilter', cursor, 'filter', nextCursorFilter);
    applyStyle('shellBorderRadius', shell, 'borderRadius', nextShellRadius);
    applyStyle('shellTransform', shell, 'transform', nextShellTransform);
    applyStyle('shellBorderColor', shell, 'borderColor', nextShellBorderColor);
    applyStyle('shellBackground', shell, 'background', nextShellBackground);
    applyStyle('shellBoxShadow', shell, 'boxShadow', nextShellShadow);
    applyStyle('dotOpacity', dot, 'opacity', nextDotOpacity);
    applyStyle('dotBackground', dot, 'background', nextDotBackground);
    applyStyle('dotBoxShadow', dot, 'boxShadow', nextDotShadow);
    applyStyle('labelOpacity', label, 'opacity', nextLabelOpacity);
    applyStyle('labelColor', label, 'color', nextLabelColor);
    applyStyle('labelWeight', label, 'fontWeight', nextLabelWeight);
    applyStyle('labelLetterSpacing', label, 'letterSpacing', nextLabelSpacing);

    const pointerSettled = now - lastMoveTsRef.current > POINTER_SETTLE_DELAY_MS;
    const settled =
      pointerSettled &&
      Math.abs(targetX - currentRef.current.x) < 0.15 &&
      Math.abs(targetY - currentRef.current.y) < 0.15 &&
      Math.abs(targetWidth - sizeRef.current.width) < 0.5 &&
      Math.abs(targetHeight - sizeRef.current.height) < 0.5 &&
      speedRef.current < 0.02 &&
      stretchRef.current < 0.005;

    if (settled) {
      dirtyRef.current = false;
      return false;
    }
    return true;
  }, []);

  const startFrameLoop = useAnimationFrame(render);

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
    // Respect reduced-motion users by disabling the custom cursor entirely.
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rectFrame = 0;

    const resetCursor = () => {
      activeElementRef.current = null;
      activeRectRef.current = null;
      hoveredElementRef.current = null;
      visibleRef.current = false;
      pressedRef.current = false;
      sizeRef.current = { width: BASE_SIZE, height: BASE_SIZE };
      velocityRef.current = { x: 0, y: 0 };
      speedRef.current = 0;
      angleRef.current = 0;
      stretchRef.current = 0;
      dirtyRef.current = true;
      startFrameLoop();
      lastStyleRef.current = { ...DEFAULT_STYLE_SNAPSHOT };
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
      const nextEnabled = desktopQuery.matches && !reducedMotionQuery.matches && userEnabledRef.current;

      enabledRef.current = nextEnabled;
      dirtyRef.current = true;
      startFrameLoop();
      setEnabled(nextEnabled);
      document.body.classList.toggle('magnetic-cursor-active', nextEnabled);

      if (!nextEnabled) {
        resetCursor();
      }
    };

    const updateInteractiveTarget = (target: EventTarget | null) => {
      dirtyRef.current = true;
      startFrameLoop();
      if (!(target instanceof Element)) {
        hoveredElementRef.current = null;
        activeElementRef.current = null;
        activeRectRef.current = null;
        return;
      }

      const hoveredTarget = target instanceof HTMLElement ? target : null;
      const interactiveTarget = target.closest(INTERACTIVE_SELECTOR);

      hoveredElementRef.current = hoveredTarget;
      activeElementRef.current = interactiveTarget instanceof HTMLElement ? interactiveTarget : null;
      activeRectRef.current = activeElementRef.current?.getBoundingClientRect() ?? null;
    };

    const refreshActiveRect = () => {
      dirtyRef.current = true;
      startFrameLoop();
      if (rectFrame !== 0) {
        return;
      }

      rectFrame = window.requestAnimationFrame(() => {
        rectFrame = 0;
        activeRectRef.current = activeElementRef.current?.getBoundingClientRect() ?? null;
      });
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
      lastMoveTsRef.current = performance.now();
      dirtyRef.current = true;
      startFrameLoop();

      updateInteractiveTarget(event.target);
    };

    const handlePointerLeave = () => {
      activeElementRef.current = null;
      activeRectRef.current = null;
      hoveredElementRef.current = null;
      visibleRef.current = false;
      velocityRef.current = { x: 0, y: 0 };
      dirtyRef.current = true;
    };

    const handlePointerDown = () => {
      pressedRef.current = true;
      dirtyRef.current = true;
      startFrameLoop();
    };

    const handlePointerUp = () => {
      pressedRef.current = false;
      dirtyRef.current = true;
      startFrameLoop();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey && event.shiftKey && event.key.toLowerCase() === 'c')) {
        return;
      }

      userEnabledRef.current = !userEnabledRef.current;
      updateEnabled();

      if (!userEnabledRef.current) {
        resetCursor();
      }
    };

    updateEnabled();

    desktopQuery.addEventListener('change', updateEnabled);
    reducedMotionQuery.addEventListener('change', updateEnabled);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', handlePointerUp, { passive: true });
    window.addEventListener('scroll', refreshActiveRect, { passive: true });
    window.addEventListener('resize', refreshActiveRect);
    window.visualViewport?.addEventListener('resize', refreshActiveRect);
    window.visualViewport?.addEventListener('scroll', refreshActiveRect);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handlePointerLeave);
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      document.body.classList.remove('magnetic-cursor-active');
      if (rectFrame !== 0) {
        window.cancelAnimationFrame(rectFrame);
      }
      desktopQuery.removeEventListener('change', updateEnabled);
      reducedMotionQuery.removeEventListener('change', updateEnabled);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('scroll', refreshActiveRect);
      window.removeEventListener('resize', refreshActiveRect);
      window.visualViewport?.removeEventListener('resize', refreshActiveRect);
      window.visualViewport?.removeEventListener('scroll', refreshActiveRect);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handlePointerLeave);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [startFrameLoop]);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={cx(
        'pointer-events-none fixed left-0 top-0 z-[260] transition-[transform,opacity] duration-300',
        enabled ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
      )}
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
export default MagneticCursor;

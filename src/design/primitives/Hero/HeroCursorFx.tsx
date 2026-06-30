'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { glowPreset } from '@/design/tokens/primitives/atmosphere';
import type { HeroTone } from '@/design/primitives/Hero/Hero';

interface HeroCursorFxProps {
  id?: string;
  className?: string;
  tone: HeroTone;
  children: ReactNode;
}

interface Glyph {
  x: number;
  y: number;
  char: string;
  life: number; // 1 → 0
  vy: number; // px per ms drift, matrix-style fall
}

// Pointer-driven effects are a desktop-with-a-real-pointer enhancement only —
// same gate the BackgroundTerminal uses.
const DESKTOP_QUERY = '(min-width: 768px) and (hover: hover) and (pointer: fine)';
// Recipe shorthand — fractions, degrees and measures — so the trail reads as a
// mise en place raining down rather than generic matrix katakana.
const GLYPHS = [
  '°', '½', '¼', '¾', '⅓', '⅔', '⅛', '⅜',
  'g', 'kg', 'ml', 'cl', 'L', '°C', '°F', '×',
];
const GLYPH_SIZE = 14;
const GLYPH_LIFETIME = 680; // ms until a glyph fully fades
const SPAWN_STEP = 22; // px of travel between spawned glyphs
const MAX_GLYPHS = 80;
const HALO_RADIUS = 190; // px — a tight, subtle pool of light, not a flood
const HALO_PEAK = 0.12; // max opacity of the light halo

/**
 * Hero-scoped cursor effects: a tone-colored light halo that follows the pointer
 * (CSS radial gradient + screen blend) and a matrix-style trail of glyphs that
 * fall and fade behind it (2D canvas). Both reuse the global `magneticcursor:move`
 * bus, so there's one pointer source shared with the custom cursor. Owns the hero
 * `<section>` element; the hero copy/imagery flow through untouched as `children`.
 */
export default function HeroCursorFx({
  id,
  className,
  tone,
  children,
}: HeroCursorFxProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);
  const color = glowPreset[tone].color;

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_QUERY);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnabled(desktopQuery.matches && !motionQuery.matches);

    sync();
    desktopQuery.addEventListener('change', sync);
    motionQuery.addEventListener('change', sync);

    return () => {
      desktopQuery.removeEventListener('change', sync);
      motionQuery.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const glyphs: Glyph[] = [];
    const last = { x: 0, y: 0, has: false };
    let raf = 0;
    let prevTs = 0;
    // Cache the section bounds so each pointer event doesn't force a reflow;
    // refresh on resize/scroll where the box can actually shift.
    let rect: DOMRect | null = null;

    const sizeCanvas = () => {
      const w = section.clientWidth;
      const h = section.clientHeight;
      if (w === 0 || h === 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rect = null;
    };

    const invalidateRect = () => {
      rect = null;
    };

    const draw = (ts: number) => {
      const dt = prevTs ? ts - prevTs : 16;
      prevTs = ts;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${GLYPH_SIZE}px ui-monospace, "SFMono-Regular", Menlo, monospace`;
      ctx.textBaseline = 'top';

      for (let i = glyphs.length - 1; i >= 0; i--) {
        const g = glyphs[i];
        g.life -= dt / GLYPH_LIFETIME;
        g.y += g.vy * dt;
        if (g.life <= 0) {
          glyphs.splice(i, 1);
          continue;
        }
        // Fresh glyphs flash white (matrix "head"), then settle into the tone.
        if (g.life > 0.82) {
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 0.9;
        } else {
          ctx.fillStyle = color;
          ctx.globalAlpha = g.life * 0.7;
        }
        ctx.fillText(g.char, g.x, g.y);
      }
      ctx.globalAlpha = 1;

      raf = glyphs.length > 0 ? requestAnimationFrame(draw) : 0;
      if (raf === 0) prevTs = 0;
    };

    const ensureLoop = () => {
      if (raf === 0) {
        prevTs = 0;
        raf = requestAnimationFrame(draw);
      }
    };

    const handleMove = (event: Event) => {
      if (!(event instanceof CustomEvent)) return;
      const { x, y } = event.detail as { x: number; y: number };
      if (!rect) rect = section.getBoundingClientRect();
      const inside =
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

      if (!inside) {
        section.style.setProperty('--halo-o', '0');
        last.has = false;
        return;
      }

      const lx = x - rect.left;
      const ly = y - rect.top;
      section.style.setProperty('--hmx', `${lx.toFixed(1)}px`);
      section.style.setProperty('--hmy', `${ly.toFixed(1)}px`);
      section.style.setProperty('--halo-o', '1');

      if (!last.has) {
        last.x = lx;
        last.y = ly;
        last.has = true;
        return;
      }

      if (Math.hypot(lx - last.x, ly - last.y) >= SPAWN_STEP) {
        glyphs.push({
          x: lx,
          y: ly,
          char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          life: 1,
          vy: 0.03 + Math.random() * 0.04,
        });
        if (glyphs.length > MAX_GLYPHS) glyphs.shift();
        last.x = lx;
        last.y = ly;
        ensureLoop();
      }
    };

    sizeCanvas();
    const resizeObserver = new ResizeObserver(sizeCanvas);
    resizeObserver.observe(section);
    window.addEventListener('magneticcursor:move', handleMove);
    window.addEventListener('scroll', invalidateRect, { passive: true });

    return () => {
      window.removeEventListener('magneticcursor:move', handleMove);
      window.removeEventListener('scroll', invalidateRect);
      resizeObserver.disconnect();
      if (raf) cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      section.style.removeProperty('--halo-o');
    };
  }, [enabled, color]);

  const haloStyle: CSSProperties = {
    background: `radial-gradient(circle ${HALO_RADIUS}px at var(--hmx, 50%) var(--hmy, 50%), ${color} 0%, transparent 70%)`,
    opacity: `calc(var(--halo-o, 0) * ${HALO_PEAK})`,
    mixBlendMode: 'screen',
    transition: 'opacity 450ms ease',
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className={className}
    >
      {enabled ? (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        />
      ) : null}

      {children}

      {enabled ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30"
          style={haloStyle}
        />
      ) : null}
    </section>
  );
}

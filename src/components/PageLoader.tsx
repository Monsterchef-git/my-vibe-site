'use client';

import { useEffect, useState } from 'react';

const BOOT_LINES = [
  { text: '$ init culinary_engine --mode=night', delay: 100 },
  { text: '// cargando stack: Next.js • Tailwind • IA aplicada', delay: 500, color: 'text-zinc-600' },
  { text: '$ git checkout main --branch="portfolio"', delay: 950 },
  { text: '✓ listo. bienvenido.', delay: 1380, color: 'text-lime-400' },
];

const TOTAL_MS = 2000;

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [lines, setLines] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('jh-loaded')) {
      const frame = window.requestAnimationFrame(() => setVisible(false));
      return () => window.cancelAnimationFrame(frame);
    }

    if (!visible) {
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((_, index) => {
      timers.push(setTimeout(() => setLines(index + 1), BOOT_LINES[index].delay));
    });

    timers.push(setTimeout(() => setFading(true), TOTAL_MS));
    timers.push(setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('jh-loaded', '1');
    }, TOTAL_MS + 600));

    return () => timers.forEach(clearTimeout);
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ${fading ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      <div className="crt-static absolute inset-0 opacity-[0.06]" />
      <div className="crt-scanlines absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />

      <div className="relative z-10 w-full max-w-sm px-8">
        <div className="mb-8 text-center">
          <span className="glitch-mark font-black text-7xl tracking-tighter text-white" data-text="JH.">
            JH.
          </span>
        </div>

        <div className="rounded-[1.5rem] border border-zinc-800/60 bg-zinc-950/80 p-5 backdrop-blur-xl">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500/60" />
            <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
            <div className="h-2 w-2 rounded-full bg-green-500/60" />
            <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-700">
              john-herrera — init
            </span>
          </div>

          <div className="min-h-[90px] space-y-2 font-mono text-[11px] leading-relaxed">
            {BOOT_LINES.slice(0, lines).map((line, index) => (
              <p key={index} className={`${line.color ?? 'text-zinc-400'} boot-line-in`}>
                {line.text}
                {index === lines - 1 && (
                  <span className="boot-cursor ml-0.5 inline-block h-3.5 w-[6px] translate-y-[2px] bg-lime-400" />
                )}
              </p>
            ))}
            {lines === 0 && (
              <p>
                <span className="boot-cursor inline-block h-3.5 w-[6px] translate-y-[2px] bg-zinc-700" />
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

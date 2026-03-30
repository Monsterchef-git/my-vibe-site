'use client';

import { useEffect, useState } from 'react';

const BOOT_LINES = [
  { text: '$ init culinary_engine --mode=night', delay: 100 },
  { text: '// cargando stack: Next.js • Tailwind • IA aplicada', delay: 500, color: 'text-zinc-600' },
  { text: '$ git checkout main --branch="portfolio"', delay: 950 },
  { text: '✓ listo. bienvenido.', delay: 1380, color: 'text-lime-400' },
];

const TOTAL_MS = 2000; // cuando empieza el fade-out

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [lines, setLines] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Solo en primera visita de la sesión
    if (sessionStorage.getItem('jh-loaded')) {
      setVisible(false);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setLines(i + 1), BOOT_LINES[i].delay));
    });

    timers.push(setTimeout(() => setFading(true), TOTAL_MS));
    timers.push(setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('jh-loaded', '1');
    }, TOTAL_MS + 600));

    return () => timers.forEach(clearTimeout);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* CRT static — reutiliza el mismo estilo que 404 */}
      <div className="not-found-static absolute inset-0 opacity-[0.06]" />
      <div className="not-found-scanlines absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />

      <div className="relative z-10 w-full max-w-sm px-8">
        {/* Marca */}
        <div className="mb-8 text-center">
          <span className="not-found-glitch font-black text-7xl tracking-tighter text-white" data-text="JH.">
            JH.
          </span>
        </div>

        {/* Terminal */}
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
            {BOOT_LINES.slice(0, lines).map((line, i) => (
              <p
                key={i}
                className={`${line.color ?? 'text-zinc-400'} not-found-line-in`}
              >
                {line.text}
                {i === lines - 1 && (
                  <span className="not-found-cursor ml-0.5 inline-block h-3.5 w-[6px] translate-y-[2px] bg-lime-400" />
                )}
              </p>
            ))}
            {lines === 0 && (
              <p>
                <span className="not-found-cursor inline-block h-3.5 w-[6px] translate-y-[2px] bg-zinc-700" />
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

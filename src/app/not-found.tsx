'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const TERMINAL_LINES = [
  { text: '$ curl -X GET /unknown-route', delay: 0 },
  { text: 'HTTP/1.1 404 NOT_FOUND', delay: 600, color: 'text-red-400' },
  { text: '// la receta que buscas no existe en este menú', delay: 1200, color: 'text-zinc-600' },
  { text: '$ retry --force...', delay: 2000 },
  { text: 'ERROR: plato no encontrado en ninguna estación', delay: 2800, color: 'text-red-400' },
  { text: '$ ping kitchen.local', delay: 3800 },
  { text: '--- kitchen.local: conexión rechazada ---', delay: 4400, color: 'text-zinc-600' },
  { text: '$ git checkout main --recipe="home"', delay: 5400, color: 'text-lime-400' },
];

const CYCLE_MS = 7000;

export default function NotFound() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    TERMINAL_LINES.forEach((line, index) => {
      timers.push(
        setTimeout(() => setVisibleLines(index + 1), line.delay),
      );
    });

    timers.push(
      setTimeout(() => {
        setVisibleLines(0);
        setCycle((c) => c + 1);
      }, CYCLE_MS),
    );

    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* CRT Static noise background */}
      <div className="not-found-static absolute inset-0 opacity-[0.07]" />

      {/* Scanlines */}
      <div className="not-found-scanlines absolute inset-0 pointer-events-none" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg px-6 text-center">
        {/* Glitching 404 */}
        <div className="not-found-glitch-wrapper mb-8">
          <h1
            className="not-found-glitch text-[clamp(6rem,20vw,12rem)] font-black leading-none tracking-tighter"
            data-text="404"
          >
            404
          </h1>
        </div>

        {/* SIN SEÑAL badge */}
        <div className="mb-10 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-500/50" />
          <span className="not-found-blink font-mono text-[10px] uppercase tracking-[0.5em] text-red-400">
            Sin señal
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-500/50" />
        </div>

        {/* Terminal output */}
        <div className="mx-auto max-w-md rounded-[1.5rem] border border-zinc-800/60 bg-zinc-950/80 p-5 text-left backdrop-blur-xl">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
            <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-700">
              kitchen-terminal
            </span>
          </div>

          <div className="min-h-[200px] space-y-2 font-mono text-[11px] leading-relaxed">
            {TERMINAL_LINES.slice(0, visibleLines).map((line, index) => (
              <p
                key={`${cycle}-${index}`}
                className={`${line.color ?? 'text-zinc-400'} not-found-line-in`}
              >
                {line.text}
                {index === visibleLines - 1 && (
                  <span className="not-found-cursor ml-0.5 inline-block h-3.5 w-[6px] translate-y-[2px] bg-lime-400" />
                )}
              </p>
            ))}
            {visibleLines === 0 && (
              <p className="text-zinc-700">
                <span className="not-found-cursor inline-block h-3.5 w-[6px] translate-y-[2px] bg-zinc-700" />
              </p>
            )}
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="group mt-10 inline-flex items-center gap-3 rounded-full border border-zinc-800/80 bg-zinc-950/70 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500 backdrop-blur-xl transition-all duration-300 hover:border-lime-400/40 hover:text-lime-400 hover:shadow-[0_0_20px_rgba(202,253,0,0.1)]"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-zinc-700 transition-colors group-hover:bg-lime-400 group-hover:shadow-[0_0_8px_#cafd00]" />
          Reconectar _
        </Link>
      </div>
    </div>
  );
}

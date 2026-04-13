import type { Metadata } from 'next';
import ErrorBoundary from '@/components/ErrorBoundary';
import TopNav from '@/components/TopNav';
import DevelopmentSection from '@/components/sections/DevelopmentSection';
import GastronomySection from '@/components/sections/GastronomySection';

export const metadata: Metadata = {
  title: 'Works | John Herrera',
  description:
    'Selección de trabajo gastronómico y digital de John Herrera: experiencias culinarias, sistemas visuales y landings de conversión.',
};

export default function WorksPage() {
  return (
    <main
      id="main-content"
      className="relative z-0 min-h-screen bg-[#0a0a0a] px-6 pb-32 pt-28 text-white md:px-24 md:pt-32"
    >
      <TopNav currentPath="/works" />

      {/* ── Editorial header ── */}
      <header className="mb-24 mt-14 md:mt-20">
        <p className="font-mono text-[9px] uppercase tracking-[0.55em] text-zinc-600">
          Works /
        </p>
        <h1 className="mt-5 text-[clamp(3rem,8vw,7rem)] font-headline italic leading-[0.92] text-white">
          Dos frentes.
          <br />
          <span className="text-[#cafd00] night-glow">Una misma lógica.</span>
        </h1>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.42em] text-zinc-600">
          | Gastronomy · Digital craft.
        </p>
      </header>

      {/* ── Chapter 01 ── */}
      <div className="mb-12 flex items-center gap-6">
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.5em] text-lime-400/70">
          01
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-lime-400/20 to-transparent" />
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.5em] text-lime-400/70">
          Gastronomy
        </span>
      </div>

      <GastronomySection
        id="works-gastronomy"
        className="bg-zinc-950/70"
        contactHref={null}
      />

      {/* ── Chapter 02 ── */}
      <div className="mb-12 mt-24 flex items-center gap-6">
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.5em] text-cyan-400/70">
          02
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/20 to-transparent" />
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.5em] text-cyan-400/70">
          Digital craft
        </span>
      </div>

      <ErrorBoundary>
        <DevelopmentSection
          id="works-development"
          className="bg-zinc-950/70"
          contactHref={null}
        />
      </ErrorBoundary>
    </main>
  );
}

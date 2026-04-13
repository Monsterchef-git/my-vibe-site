import type { Metadata } from 'next';
import ErrorBoundary from '@/components/ErrorBoundary';
import Eyebrow from '@/components/Eyebrow';
import PageIntroHero from '@/components/PageIntroHero';
import TopNav from '@/components/TopNav';
import MonoToken from '@/components/MonoToken';
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

      <PageIntroHero
        className="mb-24"
        eyebrow="Works ———"
        tone="cyan"
        title={
          <h1 className="text-[clamp(3rem,11vw,9rem)] font-headline italic leading-[0.92] text-white">
            Dos frentes.
            <br />
            <span className="text-cyan-400 night-glow-cyan">Una misma lógica.</span>
          </h1>
        }
        description={
          <>
            Gastronomía y craft digital bajo una misma disciplina: precisión, narrativa y
            sistemas diseñados para convertir desde <MonoToken kind="location">Medellín</MonoToken>.
          </>
        }
      />

      {/* ── Chapter 01 ── */}
      <div className="mb-12 flex items-center gap-6">
        <Eyebrow as="span" tone="lime">01</Eyebrow>
        <div className="h-px flex-1 bg-gradient-to-r from-lime-400/24 to-transparent" />
        <Eyebrow as="span" tone="lime">Gastronomy</Eyebrow>
      </div>

      <GastronomySection
        id="works-gastronomy"
        className="bg-zinc-950/70"
        compact
      />

      {/* ── Chapter 02 ── */}
      <div className="mb-12 mt-24 flex items-center gap-6">
        <Eyebrow as="span" tone="cyan">02</Eyebrow>
        <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/24 to-transparent" />
        <Eyebrow as="span" tone="cyan">Digital craft</Eyebrow>
      </div>

      <ErrorBoundary>
        <DevelopmentSection
          id="works-development"
          className="bg-zinc-950/70"
          compact
        />
      </ErrorBoundary>
    </main>
  );
}

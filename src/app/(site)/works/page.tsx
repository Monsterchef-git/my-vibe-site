import type { Metadata } from 'next';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import ScrollProgressBlock from '@/components/shared/ScrollProgressBlock';
import TopNav from '@/components/shared/TopNav';
import { DevelopmentSection } from '@/features/development/ui';
import { GastronomySection } from '@/features/gastronomy/ui';
import { WorksHero } from '@/features/works/ui';

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

      <ErrorBoundary>
        <WorksHero />
      </ErrorBoundary>

      <ErrorBoundary>
        <ScrollProgressBlock
          as="div"
          variant="bridge"
          scrollTone="lime"
          className="scroll-progress-bridge mb-12 mt-16 flex items-center justify-center gap-5 py-2 text-center md:mt-20"
        >
          <div className="scroll-progress-bridge-line h-px flex-1 max-w-28 bg-gradient-to-r from-transparent via-lime-400/35 to-lime-400/12 md:max-w-44" />
          <span className="scroll-progress-bridge-label font-mono text-[10px] uppercase tracking-[0.42em] text-lime-400/60">
            01
          </span>
          <div className="scroll-progress-bridge-line h-px flex-1 max-w-28 bg-gradient-to-r from-lime-400/12 via-lime-400/35 to-transparent md:max-w-44" />
        </ScrollProgressBlock>
      </ErrorBoundary>

      <GastronomySection
        id="works-gastronomy"
        className="bg-zinc-950/70"
        compact
      />

      <ErrorBoundary>
        <ScrollProgressBlock
          as="div"
          variant="bridge"
          scrollTone="cyan"
          className="scroll-progress-bridge mb-12 mt-24 flex items-center justify-center gap-5 py-2 text-center"
        >
          <div className="scroll-progress-bridge-line h-px flex-1 max-w-28 bg-gradient-to-r from-transparent via-cyan-400/35 to-cyan-400/12 md:max-w-44" />
          <span className="scroll-progress-bridge-label font-mono text-[10px] uppercase tracking-[0.42em] text-cyan-400/60">
            02
          </span>
          <div className="scroll-progress-bridge-line h-px flex-1 max-w-28 bg-gradient-to-r from-cyan-400/12 via-cyan-400/35 to-transparent md:max-w-44" />
        </ScrollProgressBlock>
      </ErrorBoundary>

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

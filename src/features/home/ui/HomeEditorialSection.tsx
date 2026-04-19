import ErrorBoundary from '@/components/shared/ErrorBoundary';
import HomeIdentityMorph from '@/features/home/ui/HomeIdentityMorph';

/**
 * Sprint 1A — Editorial full-bleed section below the home hero.
 * Escapes parent padding with negative margins.
 * Morphs between gastronomy and digital craft without moving this section
 * out of the server-rendered home shell.
 */
export default function HomeEditorialSection() {
  return (
    <section
      aria-label="Kitchen craft and digital craft editorial work"
      className="-mx-6 md:-mx-24 relative h-[190svh] overflow-clip bg-black md:h-[220svh]"
    >
      <ErrorBoundary>
        <HomeIdentityMorph />
      </ErrorBoundary>
    </section>
  );
}

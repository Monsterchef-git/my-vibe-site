import type { Metadata } from 'next';
import ErrorBoundary from '@/components/ErrorBoundary';
import AboutHero from '@/components/AboutHero';
import TopNav from '@/components/TopNav';
import AboutSection from '@/components/sections/AboutSection';

export const metadata: Metadata = {
  title: 'About | John Herrera',
  description:
    'Profile of John Herrera: creative chef in Medellin and builder of editorial digital experiences.',
};

export default function AboutPage() {
  return (
    <main
      id="main-content"
      className="relative z-0 min-h-screen bg-[#0a0a0a] px-6 pb-32 pt-28 text-white md:px-24 md:pt-32"
    >
      <TopNav currentPath="/about" />

      <ErrorBoundary>
        <AboutHero />
      </ErrorBoundary>

      <ErrorBoundary>
        <AboutSection id="about-profile" className="bg-zinc-950/70" compact />
      </ErrorBoundary>
    </main>
  );
}

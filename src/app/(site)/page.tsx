import type { Metadata } from 'next';
import TopNav from '@/components/shared/TopNav';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { MonoToken } from '@/design/primitives';
import ScrollProgressBlock from '@/components/shared/ScrollProgressBlock';
import HeroTypewriter from '@/features/home/ui/HeroTypewriter';
import HomeEditorialSection from '@/features/home/ui/HomeEditorialSection';
import { PAGE_SEO, SITE_URL } from '@/lib/constants';

const homeSeo = PAGE_SEO.home;

export const metadata: Metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
  alternates: {
    canonical: homeSeo.path,
  },
  openGraph: {
    title: homeSeo.title,
    description: homeSeo.description,
    url: `${SITE_URL}${homeSeo.path}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: homeSeo.title,
    description: homeSeo.description,
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}${homeSeo.path}#profilepage`,
    url: `${SITE_URL}${homeSeo.path}`,
    name: homeSeo.title,
    description: homeSeo.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: { '@id': `${SITE_URL}/#person` },
  };

  return (
    <main id="main-content" className="min-h-screen signal-static-bg bg-[#0a0a0a] text-white px-6 md:px-24 relative z-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TopNav currentPath="/" />

      {/* Hero Section — Editorial frame */}
      <ErrorBoundary>
        <ScrollProgressBlock
          as="section"
          id="hero"
          variant="hero"
          scrollTone="lime"
          className="relative flex min-h-screen items-end pt-40 pb-16 md:pt-44 md:pb-24"
        >
          {/* Vertical counterweight — right edge, centered, reads bottom-to-top */}
          <div
            aria-hidden="true"
            className="pointer-events-none hidden select-none md:flex md:items-center"
            style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
          >
            <span className="-rotate-90 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.36em] text-zinc-600">
              Chef · Developer · Medellín, CO
            </span>
          </div>

          <div className="w-full max-w-6xl space-y-10">
            <div>
              <h1 className="sr-only">John Herrera | Chef by Day, Digital Craft by Night</h1>
              <ErrorBoundary>
                <HeroTypewriter />
              </ErrorBoundary>
            </div>

            <p
              className="border-l border-lime-400/25 pl-6 font-mono text-sm leading-relaxed text-zinc-400"
              style={{ animation: 'hero-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.8s forwards', opacity: 0 }}
            >
              Service. Structure. Taste.{' '}
              From <MonoToken kind="location">Medellín</MonoToken>.
            </p>
          </div>
        </ScrollProgressBlock>
      </ErrorBoundary>

      <HomeEditorialSection />
    </main>
  );
}

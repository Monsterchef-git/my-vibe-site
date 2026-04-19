import type { Metadata } from 'next';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import ScrollProgressBlock from '@/components/shared/ScrollProgressBlock';
import TopNav from '@/components/shared/TopNav';
import { DevelopmentSection } from '@/features/development/ui';
import { GastronomySection } from '@/features/gastronomy/ui';
import { WorksHero } from '@/features/works/ui';
import { PAGE_SEO, SITE_URL } from '@/lib/constants';

const worksSeo = PAGE_SEO.works;
export const metadata: Metadata = {
  title: worksSeo.title,
  description: worksSeo.description,
  alternates: {
    canonical: worksSeo.path,
  },
  openGraph: {
    title: worksSeo.title,
    description: worksSeo.description,
    url: `${SITE_URL}${worksSeo.path}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: worksSeo.title,
    description: worksSeo.description,
  },
};

export default function WorksPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}${worksSeo.path}#collectionpage`,
    url: `${SITE_URL}${worksSeo.path}`,
    name: worksSeo.title,
    description: worksSeo.description,
    inLanguage: 'es-CO',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#person` },
  };

  return (
    <main
      id="main-content"
      className="relative z-0 min-h-screen bg-[#0a0a0a] px-6 pb-32 pt-28 text-white md:px-24 md:pt-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TopNav currentPath="/works" />

      <ErrorBoundary>
        <WorksHero />
      </ErrorBoundary>

      <ErrorBoundary>
        <ScrollProgressBlock
          as="div"
          variant="bridge"
          scrollTone="lime"
          className="scroll-progress-bridge mb-12 mt-16 px-0 py-2 md:mt-20"
        >
          <div className="scroll-progress-bridge-line h-px w-full bg-gradient-to-r from-lime-400/55 via-lime-400/25 to-transparent" />
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
          className="scroll-progress-bridge mb-12 mt-24 px-0 py-2"
        >
          <div className="scroll-progress-bridge-line h-px w-full bg-gradient-to-r from-lime-400/40 via-cyan-400/35 to-transparent" />
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

import type { Metadata } from 'next';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import TopNav from '@/components/shared/TopNav';
import { tracking } from '@/design/tokens/primitives/atmosphere';
import { DevelopmentSection } from '@/features/development/ui';
import { GastronomySection } from '@/features/gastronomy/ui';
import { WorksHero } from '@/features/works/ui';
import { cx } from '@/lib/utils/cx';
import { PAGE_SEO, SITE_URL } from '@/lib/constants';

const worksSeo = PAGE_SEO.works;
export const metadata: Metadata = {
  title: worksSeo.title,
  description: worksSeo.description,
  keywords: [...worksSeo.keywords],
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
    inLanguage: 'en',
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

      <section
        aria-label="Works filters"
        className="space-y-8 py-10 md:space-y-10 md:py-12"
      >
        <div className="grid gap-3 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-5">
          <a
            href="#works-gastronomy"
            data-cursor="cta"
            data-cursor-label="Explore"
            data-cursor-tone="lime"
            className={cx(
              'inline-flex min-h-11 items-center font-mono text-[11px] uppercase text-lime-300/78 transition-colors duration-300 hover:text-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/65 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:text-lime-200',
              tracking.eyebrow,
            )}
          >
            #Hospitality
          </a>
          <div
            aria-hidden="true"
            className="h-px bg-zinc-800"
          />
          <a
            href="#works-development"
            data-cursor="cta"
            data-cursor-label="Explore"
            data-cursor-tone="cyan"
            className={cx(
              'inline-flex min-h-11 items-center font-mono text-[11px] uppercase text-cyan-300/78 transition-colors duration-300 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/65 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:text-cyan-200 md:justify-end md:text-right',
              tracking.eyebrow,
            )}
          >
            #Digital
          </a>
        </div>
      </section>

      <div aria-hidden="true" className="h-24 md:h-40" />

      <GastronomySection
        id="works-gastronomy"
        compact
      />

      <section
        aria-label="Works narrative bridge"
        className="flex min-h-40 items-center justify-center py-10 md:py-16"
      >
        <p className={cx('text-center font-mono text-[10px] uppercase text-zinc-500', tracking.label)}>
          ready for service →
        </p>
      </section>

      <ErrorBoundary>
        <DevelopmentSection
          id="works-development"
          compact
        />
      </ErrorBoundary>
    </main>
  );
}

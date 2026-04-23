import type { Metadata } from 'next';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import TopNav from '@/components/shared/TopNav';
import { tracking } from '@/design/tokens/primitives/atmosphere';
import { pageGutterClassName } from '@/design/tokens/semantic/layout';
import { DevelopmentSection } from '@/features/development/ui';
import { GastronomySection } from '@/features/gastronomy/ui';
import { WorksHero } from '@/features/works/ui';
import { cx } from '@/lib/utils/cx';
import { PAGE_SEO, SITE_URL } from '@/lib/constants';

const worksSeo = PAGE_SEO.works;
export const dynamic = 'force-static';
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
      data-cursor-role="dev"
      className="relative z-0 min-h-svh bg-[#0a0a0a] pb-20 text-white md:pb-24"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TopNav currentPath="/works" />

      <ErrorBoundary>
        <section data-site-chapter="02">
          <WorksHero />
        </section>
      </ErrorBoundary>

      <section
        aria-label="Works filters"
        className={cx('space-y-8 py-16 md:space-y-10 md:py-24', pageGutterClassName)}
      >
        <div className="grid gap-3 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-5">
          <a
            href="#works-gastronomy"
            data-cursor-mode="cta"
            data-cursor-label="Explore"
            data-cursor-role="chef"
            data-magnetic="link"
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
            data-cursor-mode="cta"
            data-cursor-label="Explore"
            data-cursor-role="dev"
            data-magnetic="link"
            className={cx(
              'inline-flex min-h-11 items-center font-mono text-[11px] uppercase text-cyan-300/78 transition-colors duration-300 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/65 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:text-cyan-200 md:justify-end md:text-right',
              tracking.eyebrow,
            )}
          >
            #Digital
          </a>
        </div>
      </section>

      <GastronomySection
        id="works-gastronomy"
        compact
      />

      <ErrorBoundary>
        <DevelopmentSection
          id="works-development"
          compact
        />
      </ErrorBoundary>
    </main>
  );
}

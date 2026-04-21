import type { Metadata } from 'next';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { AboutHero, AboutSection } from '@/features/about/ui';
import TopNav from '@/components/shared/TopNav';
import { sectionBodyClassName } from '@/design/tokens/components/sectionStyles';
import { pageGutterClassName } from '@/design/tokens/semantic/layout';
import { cx } from '@/lib/utils/cx';
import { PAGE_SEO, SITE_URL } from '@/lib/constants';

const aboutSeo = PAGE_SEO.about;
export const metadata: Metadata = {
  title: aboutSeo.title,
  description: aboutSeo.description,
  keywords: [...aboutSeo.keywords],
  alternates: {
    canonical: aboutSeo.path,
  },
  openGraph: {
    title: aboutSeo.title,
    description: aboutSeo.description,
    url: `${SITE_URL}${aboutSeo.path}`,
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: aboutSeo.title,
    description: aboutSeo.description,
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE_URL}${aboutSeo.path}#aboutpage`,
    url: `${SITE_URL}${aboutSeo.path}`,
    name: aboutSeo.title,
    description: aboutSeo.description,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: { '@id': `${SITE_URL}/#person` },
  };

  return (
    <main
      id="main-content"
      className="relative z-0 min-h-screen overflow-x-clip bg-[#0a0a0a] pb-16 pt-28 text-white md:pt-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TopNav currentPath="/about" />

      <ErrorBoundary>
        <AboutHero />
      </ErrorBoundary>

      <section
        aria-label="About intro"
        className={cx(pageGutterClassName, 'py-48 md:py-64')}
      >
        <p className={`${sectionBodyClassName} max-w-[32rem]`}>
          A way of working shaped by kitchens, now carried into digital.
        </p>
      </section>

      <ErrorBoundary>
        <AboutSection id="about-profile" compact className="pt-24 md:pt-32" />
      </ErrorBoundary>
    </main>
  );
}

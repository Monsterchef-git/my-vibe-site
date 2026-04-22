import type { Metadata } from 'next';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { AboutHero, AboutSection } from '@/features/about/ui';
import TopNav from '@/components/shared/TopNav';
import { PAGE_SEO, SITE_URL } from '@/lib/constants';

const aboutSeo = PAGE_SEO.about;
export const dynamic = 'force-static';
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
      className="relative z-0 min-h-svh overflow-x-clip bg-[#0a0a0a] pb-16 text-white"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TopNav currentPath="/about" />

      <ErrorBoundary>
        <AboutHero />
      </ErrorBoundary>

      <ErrorBoundary>
        <AboutSection id="about-profile" compact className="pt-24 md:pt-32" />
      </ErrorBoundary>
    </main>
  );
}

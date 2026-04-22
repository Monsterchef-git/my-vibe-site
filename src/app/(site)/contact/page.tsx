import type { Metadata } from 'next';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import TopNav from '@/components/shared/TopNav';
import { ContactSection } from '@/features/contact/ui';
import { PAGE_SEO, SITE_URL } from '@/lib/constants';

const contactSeo = PAGE_SEO.contact;
export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: contactSeo.title,
  description: contactSeo.description,
  keywords: [...contactSeo.keywords],
  alternates: {
    canonical: contactSeo.path,
  },
  openGraph: {
    title: contactSeo.title,
    description: contactSeo.description,
    url: `${SITE_URL}${contactSeo.path}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: contactSeo.title,
    description: contactSeo.description,
  },
};

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}${contactSeo.path}#contactpage`,
    url: `${SITE_URL}${contactSeo.path}`,
    name: contactSeo.title,
    description: contactSeo.description,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: { '@id': `${SITE_URL}/#person` },
  };

  return (
    <main
      id="main-content"
      className="relative z-0 bg-[#0a0a0a] text-white"
    >
      <span id="top" aria-hidden="true" className="sr-only" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TopNav currentPath="/contact" />

      <ErrorBoundary>
        <ContactSection />
      </ErrorBoundary>
    </main>
  );
}

import type { Metadata } from 'next';
import TopNav from '@/components/shared/TopNav';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { Hero } from '@/design/primitives';
import ScrollProgressBlock from '@/components/shared/ScrollProgressBlock';
import HomeNameScramble from '@/features/home/ui/HomeNameScramble';
import HomeEditorialSection from '@/features/home/ui/HomeEditorialSection';
import { CulinaryTerm } from '@/design/primitives';
import { PAGE_SEO, SITE_URL } from '@/lib/constants';

const homeSeo = PAGE_SEO.home;
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
  keywords: [...homeSeo.keywords],
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
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: { '@id': `${SITE_URL}/#person` },
  };

  return (
    <main 
      id="main-content" 
      data-cursor-role="chef"
      className="relative z-0 min-h-svh signal-static-bg bg-[#0a0a0a] pb-16 text-white md:pb-20"
    >
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
          data-site-chapter="01"
        >
          <Hero
            eyebrow="HOME"
            statement="Cooked fast. Shipped faster."
            counterLine={<span>twelve years <CulinaryTerm term="plating">plating</CulinaryTerm>. now shipping interfaces.</span>}
            tone="lime"
          >
            <ErrorBoundary>
              <HomeNameScramble />
            </ErrorBoundary>
          </Hero>
        </ScrollProgressBlock>
      </ErrorBoundary>

      <HomeEditorialSection />
    </main>
  );
}

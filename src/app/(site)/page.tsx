import type { Metadata } from 'next';

import ErrorBoundary from '@/components/shared/ErrorBoundary';
import TopNav from '@/components/shared/TopNav';
import { Hero } from '@/design/primitives';
import ScrollProgressBlock from '@/components/shared/ScrollProgressBlock';
import CourseTransition from '@/components/shared/CourseTransition';
import HomeNameScramble from '@/features/home/ui/HomeNameScramble';
import HomeEditorialSection from '@/features/home/ui/HomeEditorialSection';
import { CulinaryTerm } from '@/design/primitives';
import { PAGE_SEO } from '@/lib/constants';
import { buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

const homeSeo = PAGE_SEO.home;
export const dynamic = 'force-static';

export const metadata: Metadata = buildPageMetadata(homeSeo);

export default function Home() {
  const jsonLd = buildPageJsonLd(homeSeo);

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
            course="01"
            slug="#HOME"
            file="01"
          >
            <ErrorBoundary>
              <HomeNameScramble />
            </ErrorBoundary>
          </Hero>
        </ScrollProgressBlock>
      </ErrorBoundary>

      <CourseTransition from="01" to="02" tone="lime" />

      <HomeEditorialSection />
    </main>
  );
}

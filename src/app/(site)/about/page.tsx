import type { Metadata } from 'next';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { AboutHero, AboutSection } from '@/features/about/ui';
import TopNav from '@/components/shared/TopNav';
import CourseTransition from '@/components/shared/CourseTransition';
import { PAGE_SEO } from '@/lib/constants';
import { buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

const aboutSeo = PAGE_SEO.about;
export const dynamic = 'force-static';
export const metadata: Metadata = buildPageMetadata(aboutSeo);

export default function AboutPage() {
  const jsonLd = buildPageJsonLd(aboutSeo);

  return (
    <main
      id="main-content"
      className="relative z-0 min-h-svh overflow-x-clip bg-[#0a0a0a] text-white"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TopNav currentPath="/about" />

      <ErrorBoundary>
        <section data-site-chapter="03">
          <AboutHero />
        </section>
      </ErrorBoundary>

      <CourseTransition from="03" to="04" tone="white" />

      <ErrorBoundary>
        <AboutSection id="about-profile" compact className="pt-24 md:pt-32" />
      </ErrorBoundary>
    </main>
  );
}

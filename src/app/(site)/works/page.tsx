import type { Metadata } from 'next';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import CourseTransition from '@/components/shared/CourseTransition';
import TopNav from '@/components/shared/TopNav';
import { DevelopmentSection } from '@/features/development/ui';
import { GastronomySection } from '@/features/gastronomy/ui';
import { ChapterDivider, WorksFilter, WorksHero } from '@/features/works/ui';
import { PAGE_SEO } from '@/lib/constants';
import { buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

const worksSeo = PAGE_SEO.works;
export const dynamic = 'force-static';
export const metadata: Metadata = buildPageMetadata(worksSeo);

export default function WorksPage() {
  const jsonLd = buildPageJsonLd(worksSeo);

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

      <CourseTransition from="02" to="03" tone="lime" />

      <ErrorBoundary>
        <WorksFilter>
          <div data-discipline="hospitality">
            <GastronomySection
              id="works-gastronomy"
              compact
            />
          </div>

          <div data-discipline="divider">
            <ErrorBoundary>
              <ChapterDivider />
            </ErrorBoundary>
          </div>

          <div data-discipline="digital">
            <ErrorBoundary>
              <DevelopmentSection
                id="works-development"
                compact
              />
            </ErrorBoundary>
          </div>
        </WorksFilter>
      </ErrorBoundary>
    </main>
  );
}

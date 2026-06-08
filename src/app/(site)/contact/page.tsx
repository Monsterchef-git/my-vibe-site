import type { Metadata } from 'next';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import TopNav from '@/components/shared/TopNav';
import { ContactSection } from '@/features/contact/ui';
import { PAGE_SEO } from '@/lib/constants';
import { buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

const contactSeo = PAGE_SEO.contact;
export const dynamic = 'force-static';
export const metadata: Metadata = buildPageMetadata(contactSeo);

export default function ContactPage() {
  const jsonLd = buildPageJsonLd(contactSeo);

  return (
    <main
      id="main-content"
      className="relative z-0 bg-[#0a0a0a] pb-16 text-white md:pb-20"
    >
      <span id="top" aria-hidden="true" className="sr-only" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TopNav currentPath="/contact" />

      <ErrorBoundary>
        <section data-site-chapter="04">
          <ContactSection />
        </section>
      </ErrorBoundary>
    </main>
  );
}

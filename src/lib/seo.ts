import type { Metadata } from 'next';

import { PAGE_SEO, SITE_URL } from '@/lib/constants';

type PageSeo = (typeof PAGE_SEO)[keyof typeof PAGE_SEO];

type PageJsonLd = {
  '@context': 'https://schema.org';
  '@type': string;
  '@id': string;
  url: string;
  name: string;
  description: string;
  inLanguage: 'en';
  isPartOf: { '@id': string };
} & Partial<{
  mainEntity: { '@id': string };
  about: { '@id': string };
}>;

export function buildPageMetadata(seo: PageSeo): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    keywords: [...seo.keywords],
    alternates: {
      canonical: seo.path,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${SITE_URL}${seo.path}`,
      type: seo.openGraphType,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
  };
}

export function buildPageJsonLd(seo: PageSeo): PageJsonLd {
  const pageUrl = `${SITE_URL}${seo.path}`;
  const schemaTarget = `${SITE_URL}/#person`;

  return {
    '@context': 'https://schema.org',
    '@type': seo.schemaType,
    '@id': `${pageUrl}#${seo.schemaId}`,
    url: pageUrl,
    name: seo.title,
    description: seo.description,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    [seo.schemaRelation]: { '@id': schemaTarget },
  };
}

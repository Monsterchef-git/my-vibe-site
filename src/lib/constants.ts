export const SITE_URL = 'https://johnherrerachef.com';
export const SITE_TITLE = 'John Herrera | Chef + Dev in Medellín';
export const SITE_DESCRIPTION =
  'Cooked fast. Shipped faster. Twelve years plating, now shipping interfaces.';
export const PERSON_IMAGE = `${SITE_URL}/images/about-john-herrera.webp`;

export const PAGE_SEO = {
  home: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    keywords: [
      'chef in Medellín',
      'dev in Medellín',
      'chef + dev',
      'kitchen craft',
      'web development',
      'landing pages',
      'conversion landing pages',
    ],
    path: '/',
    openGraphType: 'website',
    schemaType: 'ProfilePage',
    schemaId: 'profilepage',
    schemaRelation: 'mainEntity',
  },
  works: {
    title: 'Works | John Herrera',
    description:
      'Taste, applied. Kitchens and interfaces, same instinct.',
    keywords: [
      'kitchen craft',
      'digital craft',
      'culinary direction',
      'web development portfolio',
      'conversion landing pages',
      'chef dev projects',
    ],
    path: '/works',
    openGraphType: 'website',
    schemaType: 'CollectionPage',
    schemaId: 'collectionpage',
    schemaRelation: 'about',
  },
  about: {
    title: 'About | John Herrera',
    description:
      'Mise en place for the web. The kitchen taught me the rest.',
    keywords: [
      'about John Herrera',
      'chef and dev',
      'chef in Medellín',
      'dev in Medellín',
      'culinary and web work',
    ],
    path: '/about',
    openGraphType: 'profile',
    schemaType: 'AboutPage',
    schemaId: 'aboutpage',
    schemaRelation: 'mainEntity',
  },
  contact: {
    title: 'Contact | John Herrera',
    description:
      'The pass is open. Briefs, reservations, collaborations.',
    keywords: [
      'contact John Herrera',
      'kitchen collaboration',
      'web project inquiry',
      'landing page project',
      'chef dev contact',
    ],
    path: '/contact',
    openGraphType: 'website',
    schemaType: 'ContactPage',
    schemaId: 'contactpage',
    schemaRelation: 'mainEntity',
  },
} as const;

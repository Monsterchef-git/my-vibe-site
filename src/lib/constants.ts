export const SITE_URL = 'https://johnherrerachef.com';
export const SITE_TITLE = 'John Herrera | Chef + Dev in Medellín';
export const SITE_DESCRIPTION =
  'Chef + Dev in Medellín. From the kitchen to the web: simple, effective landing pages and digital experiences built with craft.';
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
  },
  works: {
    title: 'Works | John Herrera',
    description:
      'Kitchen craft and digital craft by John Herrera: culinary direction, web development, and conversion landing pages.',
    keywords: [
      'kitchen craft',
      'digital craft',
      'culinary direction',
      'web development portfolio',
      'conversion landing pages',
      'chef dev projects',
    ],
    path: '/works',
  },
  about: {
    title: 'About | John Herrera',
    description:
      'About John Herrera, a chef and dev in Medellín working between culinary service and web development.',
    keywords: [
      'about John Herrera',
      'chef and dev',
      'chef in Medellín',
      'dev in Medellín',
      'culinary and web work',
    ],
    path: '/about',
  },
  contact: {
    title: 'Contact | John Herrera',
    description:
      'Contact John Herrera for kitchen collaborations and web projects built with clarity and craft.',
    keywords: [
      'contact John Herrera',
      'kitchen collaboration',
      'web project inquiry',
      'landing page project',
      'chef dev contact',
    ],
    path: '/contact',
  },
} as const;

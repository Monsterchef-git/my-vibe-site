export const SITE_URL = 'https://johnherrerachef.com';
export const SITE_TITLE = 'John Herrera | Creative Chef & Digital Craft';
export const SITE_DESCRIPTION =
  'Chef by Day, Digital Craft by Night. Ingenieria culinaria y desarrollo de software de alto nivel en Medellin.';
export const PERSON_IMAGE = `${SITE_URL}/images/about-john-herrera.webp`;

export const PAGE_SEO = {
  home: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    path: '/',
  },
  works: {
    title: 'Works | John Herrera',
    description:
      'Selección de trabajo gastronómico y digital de John Herrera: experiencias culinarias, sistemas visuales y landings de conversión.',
    path: '/works',
  },
  about: {
    title: 'About | John Herrera',
    description:
      'Profile of John Herrera: creative chef in Medellin and builder of editorial digital experiences.',
    path: '/about',
  },
  contact: {
    title: 'Contact | John Herrera',
    description:
      'Contacto para proyectos gastronómicos, experiencias privadas y trabajo de producto digital con John Herrera.',
    path: '/contact',
  },
} as const;

export type Project = {
  id: string;
  number: string;
  title: string;
  tags: string[];
  href: string;
  image: string;
  imageAlt: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'blue-moon',
    number: '01',
    title: 'Blue Moon Cottage',
    tags: ['2026', 'Hospitality', 'Landing'],
    href: 'https://www.bluemoonhopetown.com',
    image: '/works/blue-moon.webp',
    imageAlt: 'Blue Moon Cottage landing hero.',
  },
  {
    id: 'isolution',
    number: '02',
    title: 'iSolution Lab',
    tags: ['2025', 'Landing', 'Apple'],
    href: 'https://isolution.com.co',
    image: '/works/isolution.webp',
    imageAlt: 'iSolution Lab landing screenshot.',
  },
  {
    id: 'meghans',
    number: '03',
    title: "Meghan's Momentum",
    tags: ['2025', 'Editorial'],
    href: 'https://www.meghansmomentumstudios.com',
    image: '/works/meghans.webp',
    imageAlt: "Meghan's Momentum homepage screenshot.",
  },
  {
    id: 'spa-lleras',
    number: '04',
    title: 'Spa Lleras',
    tags: ['2025', 'Landing', 'Wellness'],
    href: 'https://spalleras.com/',
    image: '/works/spa.webp',
    imageAlt: 'Spa Lleras website screenshot.',
  },
  {
    id: 'lleras-medical',
    number: '05',
    title: 'Lleras Medical',
    tags: ['2025', 'Landing', 'Health'],
    href: 'https://www.llerasmedicallounge.com/',
    image: '/works/medical.webp',
    imageAlt: 'Lleras Medical website screenshot.',
  },
  {
    id: 'tecnical',
    number: '06',
    title: 'tecnical.app',
    tags: ['2026', 'SaaS', 'Next.js'],
    href: 'https://www.tecnical.app',
    image: '/works/tecnicalapp.webp',
    imageAlt: 'tecnical.app landing screenshot.',
  },
];

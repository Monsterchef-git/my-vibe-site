export type Project = {
  id: string;
  number: string;
  title: string;
  year: string;
  client: string;
  stack: string;
  role: string;
  href: string;
  image: string;
  imageAlt: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'blue-moon',
    number: '01',
    title: 'Blue Moon Cottage',
    year: '2026',
    client: 'Blue Moon Cottage',
    stack: 'Landing · Hospitality',
    role: 'Creative Direction',
    href: 'https://www.bluemoonhopetown.com',
    image: '/works/blue-moon.webp',
    imageAlt: 'Blue Moon Cottage landing hero.',
  },
  {
    id: 'isolution',
    number: '02',
    title: 'iSolution Lab',
    year: '2025',
    client: 'iSolution Lab',
    stack: 'Landing · Apple Repair',
    role: 'Web Development',
    href: 'https://isolution.com.co',
    image: '/works/isolution.webp',
    imageAlt: 'iSolution Lab landing screenshot.',
  },
  {
    id: 'meghans',
    number: '03',
    title: "Meghan's Momentum",
    year: '2025',
    client: "Meghan's Momentum",
    stack: 'Editorial · Brand Site',
    role: 'Creative Direction',
    href: 'https://www.meghansmomentumstudios.com',
    image: '/works/meghans.webp',
    imageAlt: "Meghan's Momentum homepage screenshot.",
  },
  {
    id: 'spa-lleras',
    number: '04',
    title: 'Spa Lleras',
    year: '2025',
    client: 'Spa Lleras',
    stack: 'Landing · Wellness',
    role: 'Web Development',
    href: 'https://spalleras.com/',
    image: '/works/spa.webp',
    imageAlt: 'Spa Lleras website screenshot.',
  },
  {
    id: 'lleras-medical',
    number: '05',
    title: 'Lleras Medical',
    year: '2025',
    client: 'Lleras Medical',
    stack: 'Landing · Health',
    role: 'Web Development',
    href: 'https://www.llerasmedicallounge.com/',
    image: '/works/medical.webp',
    imageAlt: 'Lleras Medical website screenshot.',
  },
  {
    id: 'tecnical',
    number: '06',
    title: 'tecnical.app',
    year: '2026',
    client: 'tecnical.app',
    stack: 'SaaS · Next.js',
    role: 'Product Design',
    href: 'https://www.tecnical.app',
    image: '/works/tecnicalapp.webp',
    imageAlt: 'tecnical.app landing screenshot.',
  },
];

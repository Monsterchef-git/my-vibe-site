'use client';

import Image from 'next/image';
import ScrambleText from '@/components/ScrambleText';

const PROJECTS = [
  {
    id: 'tecnical',
    number: '01',
    title: 'tecnical.app',
    tags: 'SaaS · Next.js',
    image: '/images/tecnicalapp.png',
    alt: 'Captura de la landing de tecnical.app con propuesta para optimizar la operación de talleres.',
    href: 'https://www.tecnical.app',
  },
  {
    id: 'isolution',
    number: '02',
    title: 'iSolution Lab',
    tags: 'Landing · Apple',
    image: '/images/isolution.png',
    alt: 'Captura de la landing de iSolution Service Center para reparación de dispositivos Apple en Medellín.',
    href: 'https://isolution.com.co',
  },
  {
    id: 'meghans',
    number: '03',
    title: "Meghan's Momentum",
    tags: 'Editorial',
    image: '/images/meghans.png',
    alt: "Captura de la homepage editorial de Meghan's Momentum con enfoque artesanal y artístico.",
    href: 'https://www.meghansmomentumstudios.com',
  },
  {
    id: 'spa-lleras',
    number: '04',
    title: 'Spa Lleras',
    tags: 'Landing · Wellness',
    image: '/images/spa.png',
    alt: 'Captura de la landing de Spa Lleras con hero de spa y reservas de bienestar en Medellín.',
    href: 'https://spalleras.com/',
  },
  {
    id: 'lleras-medical',
    number: '05',
    title: 'Lleras Medical',
    tags: 'Landing · Salud',
    image: '/images/medical.png',
    alt: 'Captura de la homepage de Lleras Medical con servicio premium de terapia intravenosa en Medellín.',
    href: 'https://www.llerasmedicallounge.com/',
  },
  {
    id: 'blue-moon',
    number: '06',
    title: 'Blue Moon Cottage',
    tags: 'Hospitalidad',
    image: '/images/blue-moon-hero.png',
    alt: 'Captura de la web de Blue Moon Cottage con interior de alojamiento frente al mar en Bahamas.',
    href: 'https://www.bluemoonhopetown.com',
  },
] as const;

export default function WorksList() {
  return (
    <div className="w-full">
      {PROJECTS.map((project) => (
        <a
          key={project.id}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-5 border-t border-zinc-800/60 py-6 transition-[border-color] duration-500 last:border-b hover:border-zinc-700/40 md:gap-8 md:py-8"
        >
          {/* Full-width background image revealed on hover */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-700 group-hover:opacity-100">
            <Image
              src={project.image}
              alt=""
              aria-hidden
              fill
              sizes="(min-width: 768px) 80vw, 100vw"
              quality={65}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
          </div>

          {/* Row number */}
          <span className="relative z-10 w-8 shrink-0 font-mono text-[10px] tracking-[0.2em] text-zinc-700 transition-colors duration-500 group-hover:text-zinc-500 md:w-12 md:text-[11px]">
            {project.number}
          </span>

          {/* Project title */}
          <div className="relative z-10 min-w-0 flex-1">
            <ScrambleText
              text={project.title}
              as="span"
              className="block truncate text-2xl font-headline italic leading-none text-white transition-colors duration-300 md:text-4xl lg:text-5xl"
            />
          </div>

          {/* Tags — hidden on mobile */}
          <span className="relative z-10 hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.34em] text-zinc-600 transition-colors duration-500 group-hover:text-zinc-400 sm:block lg:text-[11px]">
            {project.tags}
          </span>

          {/* Arrow */}
          <span className="relative z-10 shrink-0 font-mono text-base text-zinc-700 transition-[color,transform] duration-300 group-hover:translate-x-2 group-hover:text-cyan-400">
            →
          </span>
        </a>
      ))}
    </div>
  );
}

'use client';

import Image from 'next/image';
import Eyebrow from '@/components/Eyebrow';
import ScrambleText from '@/components/ScrambleText';

const PROJECTS = [
  {
    id: 'blue-moon',
    number: '01',
    title: 'Blue Moon Cottage',
    tags: 'Hospitality',
    image: '/images/blue-moon-hero.png',
    alt: 'Homepage for Blue Moon Cottage featuring a coastal hospitality interior in the Bahamas.',
    href: 'https://www.bluemoonhopetown.com',
  },
  {
    id: 'isolution',
    number: '02',
    title: 'iSolution Lab',
    tags: 'Landing · Apple',
    image: '/images/isolution.png',
    alt: 'Landing page for iSolution Service Center focused on Apple device repair in Medellin.',
    href: 'https://isolution.com.co',
  },
  {
    id: 'meghans',
    number: '03',
    title: "Meghan's Momentum",
    tags: 'Editorial',
    image: '/images/meghans.png',
    alt: "Editorial homepage for Meghan's Momentum with an artisanal, art-led direction.",
    href: 'https://www.meghansmomentumstudios.com',
  },
  {
    id: 'spa-lleras',
    number: '04',
    title: 'Spa Lleras',
    tags: 'Landing · Wellness',
    image: '/images/spa.png',
    alt: 'Landing page for Spa Lleras with a wellness-focused hero and booking flow.',
    href: 'https://spalleras.com/',
  },
  {
    id: 'lleras-medical',
    number: '05',
    title: 'Lleras Medical',
    tags: 'Landing · Health',
    image: '/images/medical.png',
    alt: 'Homepage for Lleras Medical promoting premium IV therapy services.',
    href: 'https://www.llerasmedicallounge.com/',
  },
  {
    id: 'tecnical',
    number: '06',
    title: 'tecnical.app',
    tags: 'SaaS · Next.js',
    image: '/images/tecnicalapp.png',
    alt: 'Landing page for tecnical.app focused on improving repair shop operations.',
    href: 'https://www.tecnical.app',
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
              className="block pr-[0.14em] text-2xl font-headline italic leading-[1.02] text-white transition-colors duration-300 md:text-4xl lg:text-5xl"
            />
          </div>

          {/* Tags — hidden on mobile */}
          <Eyebrow
            as="span"
            role="muted"
            className="relative z-10 hidden shrink-0 transition-colors duration-500 group-hover:text-zinc-400 sm:block"
          >
            {project.tags}
          </Eyebrow>

          {/* Arrow */}
          <span className="relative z-10 shrink-0 font-mono text-base text-zinc-700 transition-[color,transform] duration-300 group-hover:translate-x-2 group-hover:text-cyan-400">
            →
          </span>
        </a>
      ))}
    </div>
  );
}

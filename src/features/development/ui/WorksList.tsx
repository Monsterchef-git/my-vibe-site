import Image from 'next/image';
import {
  BLUR_BLUE_MOON,
  BLUR_ISOLUTION,
  BLUR_MEDICAL,
  BLUR_MEGHANS,
  BLUR_SPA,
  BLUR_TECNICAL,
  IMAGE_BLUE_MOON,
  IMAGE_ISOLUTION,
  IMAGE_MEDICAL,
  IMAGE_MEGHANS,
  IMAGE_SPA,
  IMAGE_TECNICAL,
} from '@/lib/imageAssets';

const PROJECTS = [
  {
    id: 'blue-moon',
    number: '01',
    title: 'Blue Moon',
    titleLine2: 'Cottage',
    tags: 'Hospitality · Landing',
    image: IMAGE_BLUE_MOON,
    blurDataURL: BLUR_BLUE_MOON,
    alt: 'Blue Moon Cottage coastal hospitality interior in the Bahamas.',
    href: 'https://www.bluemoonhopetown.com',
  },
  {
    id: 'isolution',
    number: '02',
    title: 'iSolution Lab',
    titleLine2: null,
    tags: 'Landing · Apple',
    image: IMAGE_ISOLUTION,
    blurDataURL: BLUR_ISOLUTION,
    alt: 'Landing page for iSolution Service Center focused on Apple device repair in Medellin.',
    href: 'https://isolution.com.co',
  },
  {
    id: 'meghans',
    number: '03',
    title: "Meghan's",
    titleLine2: 'Momentum',
    tags: 'Editorial',
    image: IMAGE_MEGHANS,
    blurDataURL: BLUR_MEGHANS,
    alt: "Editorial homepage for Meghan's Momentum with an artisanal, art-led direction.",
    href: 'https://www.meghansmomentumstudios.com',
  },
  {
    id: 'spa-lleras',
    number: '04',
    title: 'Spa Lleras',
    titleLine2: null,
    tags: 'Landing · Wellness',
    image: IMAGE_SPA,
    blurDataURL: BLUR_SPA,
    alt: 'Landing page for Spa Lleras with a wellness-focused hero and booking flow.',
    href: 'https://spalleras.com/',
  },
  {
    id: 'lleras-medical',
    number: '05',
    title: 'Lleras',
    titleLine2: 'Medical',
    tags: 'Landing · Health',
    image: IMAGE_MEDICAL,
    blurDataURL: BLUR_MEDICAL,
    alt: 'Homepage for Lleras Medical promoting premium IV therapy services.',
    href: 'https://www.llerasmedicallounge.com/',
  },
  {
    id: 'tecnical',
    number: '06',
    title: 'tecnical.app',
    titleLine2: null,
    tags: 'SaaS · Next.js',
    image: IMAGE_TECNICAL,
    blurDataURL: BLUR_TECNICAL,
    alt: 'Landing page for tecnical.app focused on improving repair shop operations.',
    href: 'https://www.tecnical.app',
  },
] as const;

export default function WorksList() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {PROJECTS.map((project) => (
        <a
          key={project.id}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title}${project.titleLine2 ? ' ' + project.titleLine2 : ''} — ${project.tags} (opens in new tab)`}
          data-cursor="lens"
          data-cursor-label="View"
          data-cursor-tone="cyan"
          data-cursor-stick="true"
          className="group relative block overflow-hidden rounded-[2rem] border border-cyan-400/15 transition-[border-color] duration-500 hover:border-cyan-400/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          {/* Image */}
          <div className="relative h-[52svh]">
            <Image
              src={project.image}
              alt={project.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              placeholder="blur"
              blurDataURL={project.blurDataURL}
              loading="lazy"
              className="object-cover object-top transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />

            {/* Gradient */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.08)_28%,rgba(0,0,0,0.18)_55%,rgba(0,0,0,0.92)_100%)]"
            />

            {/* Cyan radial — section tone */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_45%_at_88%_9%,rgba(34,211,238,0.07),transparent_52%)]"
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-6">

              {/* Top — index + tags */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-cyan-400/60">
                  {project.number}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-zinc-500">
                  {project.tags}
                </span>
              </div>

              {/* Bottom — title + arrow */}
              <div className="flex items-end justify-between gap-3">
                <h3
                  className="font-headline italic leading-[0.86] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(2rem, 5.5vw, 3.75rem)' }}
                >
                  {project.titleLine2 ? (
                    <>
                      <span className="block text-white">{project.title}</span>
                      <span className="block text-cyan-400 night-glow-cyan">{project.titleLine2}</span>
                    </>
                  ) : (
                    <span className="block text-white">{project.title}</span>
                  )}
                </h3>

                <span
                  aria-hidden="true"
                  className="mb-[0.1em] shrink-0 font-mono text-lg text-zinc-500 transition-[color,transform] duration-300 group-hover:translate-x-2 group-hover:text-cyan-400"
                >
                  →
                </span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

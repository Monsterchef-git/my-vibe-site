import { tracking } from '@/design/tokens/primitives/atmosphere';
import { cx } from '@/lib/utils/cx';

const PROJECTS = [
  {
    id: 'blue-moon',
    number: '01',
    title: 'Blue Moon Cottage',
    tags: 'Hospitality · Landing',
    href: 'https://www.bluemoonhopetown.com',
  },
  {
    id: 'isolution',
    number: '02',
    title: 'iSolution Lab',
    tags: 'Landing · Apple',
    href: 'https://isolution.com.co',
  },
  {
    id: 'meghans',
    number: '03',
    title: "Meghan's Momentum",
    tags: 'Editorial',
    href: 'https://www.meghansmomentumstudios.com',
  },
  {
    id: 'spa-lleras',
    number: '04',
    title: 'Spa Lleras',
    tags: 'Landing · Wellness',
    href: 'https://spalleras.com/',
  },
  {
    id: 'lleras-medical',
    number: '05',
    title: 'Lleras Medical',
    tags: 'Landing · Health',
    href: 'https://www.llerasmedicallounge.com/',
  },
  {
    id: 'tecnical',
    number: '06',
    title: 'tecnical.app',
    tags: 'SaaS · Next.js',
    href: 'https://www.tecnical.app',
  },
] as const;

export default function WorksList() {
  return (
    <div className="space-y-0 border-t border-zinc-900">
      {PROJECTS.map((project) => (
        <a
          key={project.id}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} — ${project.tags} (opens in new tab)`}
          data-cursor="link"
          data-cursor-label="Open"
          data-cursor-tone="cyan"
          className="group block border-b border-zinc-900 py-6 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/65 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:py-8"
        >
          <div className="grid gap-4 md:grid-cols-[72px_minmax(0,1fr)_auto] md:items-end md:gap-6">
            <span className={cx('font-mono text-[10px] uppercase text-zinc-500', tracking.eyebrow)}>
              {project.number}
            </span>

            <h3 className="font-headline text-[clamp(2rem,5.4vw,4.6rem)] italic leading-[0.9] text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-300">
              {project.title}
            </h3>

            <span className={cx('font-mono text-[10px] uppercase text-zinc-500 md:text-right', tracking.label)}>
              {project.tags}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}

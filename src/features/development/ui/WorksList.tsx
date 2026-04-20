'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { tracking } from '@/design/tokens/primitives/atmosphere';
import { PROJECTS } from '@/features/development/data/projects';
import { cx } from '@/lib/utils/cx';

export default function WorksList() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const syncHoverCapability = () => setSupportsHover(mediaQuery.matches);

    syncHoverCapability();
    mediaQuery.addEventListener('change', syncHoverCapability);

    return () => mediaQuery.removeEventListener('change', syncHoverCapability);
  }, []);

  return (
    <div className="relative">
      {supportsHover ? (
        <div className="pointer-events-none fixed inset-0 z-0">
          {PROJECTS.map((project) => (
            <Image
              key={project.id}
              src={project.image}
              alt=""
              fill
              sizes="100vw"
              loading="lazy"
              className={cx(
                'object-cover blur-sm grayscale transition-opacity duration-[700ms] motion-reduce:transition-none',
                activeId === project.id ? 'opacity-25 grayscale-0' : 'opacity-0',
              )}
            />
          ))}
        </div>
      ) : null}

      <ul className="relative z-10 divide-y divide-zinc-900/60 border-y border-zinc-900/60">
        {PROJECTS.map((project) => (
          <li key={project.id}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — ${project.imageAlt} (opens in new tab)`}
              data-cursor-mode="lens"
              data-cursor-label="OPEN"
              onMouseEnter={() => setActiveId(project.id)}
              onMouseLeave={() => setActiveId(null)}
              className="group block py-10 transition-colors duration-[700ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/65 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:py-14 motion-reduce:transition-none"
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-8">
                <span className={cx('font-mono text-[10px] uppercase text-zinc-600', tracking.label)}>
                  {project.number}
                </span>

                <h3 className="font-headline text-[clamp(2rem,5.8vw,4rem)] italic leading-[0.9] text-white transition-all duration-[700ms] group-hover:translate-x-2 group-hover:text-cyan-300 motion-reduce:transition-none">
                  {project.title}
                </h3>

                <span className={cx('font-mono text-[10px] uppercase text-zinc-500 md:text-right', tracking.eyebrow)}>
                  {project.tags.join(' · ')}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

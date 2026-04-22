'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { tracking } from '@/design/tokens/primitives/atmosphere';
import { PROJECTS } from '@/features/development/data/projects';
import { cx } from '@/lib/utils/cx';

export default function WorksList() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const syncHoverCapability = () => setSupportsHover(mediaQuery.matches);

    syncHoverCapability();
    mediaQuery.addEventListener('change', syncHoverCapability);

    return () => mediaQuery.removeEventListener('change', syncHoverCapability);
  }, []);

  useEffect(() => {
    const track = document.querySelector<HTMLElement>('[data-works-mobile-track]');
    if (!track) {
      return;
    }

    const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-works-mobile-card]'));
    if (cards.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const winner = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!winner) {
          return;
        }
        const idx = Number((winner.target as HTMLElement).dataset.worksMobileCard ?? 0);
        setActiveMobileIndex(idx);
      },
      {
        threshold: [0.55, 0.75],
        root: track,
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
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

      <div className="relative z-10 space-y-5 md:hidden">
        <div
          data-works-mobile-track
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none]"
        >
          {PROJECTS.map((project, index) => (
            <a
              key={project.id}
              data-works-mobile-card={index}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — ${project.imageAlt} (opens in new tab)`}
              data-cursor-mode="lens"
              data-cursor-label="OPEN"
              className="group block min-w-[85vw] snap-center overflow-hidden rounded-3xl border border-zinc-800/70 bg-zinc-950/70 backdrop-blur-xl"
            >
              <div className="relative h-[50svh] min-h-[20rem]">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="85vw"
                  loading="lazy"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.65)_100%)]"
                />
              </div>
              <div className="space-y-4 p-5">
                <span className={cx('font-mono text-[10px] uppercase text-cyan-300', tracking.label)}>
                  {project.number} / 06
                </span>
                <h3 className="font-headline text-[clamp(2rem,11vw,3.6rem)] italic leading-[0.9] text-white">
                  {project.title}
                </h3>
                <div className="grid grid-cols-1 gap-1 font-mono text-[10px] uppercase text-zinc-400">
                  <span className={tracking.label}>Year {project.year}</span>
                  <span className={tracking.label}>Client {project.client}</span>
                  <span className={tracking.label}>Stack {project.stack}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="flex justify-center gap-2 px-4">
          {PROJECTS.map((project, index) => (
            <span
              key={`${project.id}-dot`}
              aria-hidden="true"
              className={cx(
                'h-1.5 w-1.5 rounded-full transition-colors duration-300',
                index === activeMobileIndex ? 'bg-cyan-300' : 'bg-zinc-700',
              )}
            />
          ))}
        </div>
      </div>

      <ul className="relative z-10 hidden divide-y divide-zinc-900/60 border-y border-zinc-900/60 md:block">
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
              <div className="grid grid-cols-1 gap-5 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-8">
                <span className={cx('font-mono text-[10px] uppercase text-zinc-600', tracking.label)}>
                  {project.number}
                </span>

                <div className="space-y-3">
                  <h3 className="font-headline text-[clamp(3rem,8vw,7rem)] italic leading-[0.88] text-white transition-all duration-[700ms] group-hover:translate-x-2 group-hover:text-cyan-300 motion-reduce:transition-none">
                    {project.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-[10px] uppercase text-zinc-500 md:max-w-lg">
                    <span className={tracking.label}>Year {project.year}</span>
                    <span className={tracking.label}>Client {project.client}</span>
                    <span className={tracking.label}>Stack {project.stack}</span>
                    <span className={tracking.label}>Role {project.role}</span>
                  </div>
                </div>

                <span className={cx('font-mono text-[10px] uppercase text-zinc-500 md:pt-2 md:text-right', tracking.eyebrow)}>
                  file/{project.number}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

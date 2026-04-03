'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import MonoToken from '@/components/MonoToken';
import { CardPrimitive, cx } from '@/components/primitive';

const PROJECTS = [
  {
    id: 'isolution',
    title: 'iSolution Lab',
    description: 'Laboratorio de reparación avanzada y micro-soldadura para el ecosistema Apple.',
    image: '/images/isolution.png',
    alt: 'Captura de la landing de iSolution Service Center para reparación de dispositivos Apple en Medellín.',
    tone: 'cyan' as const,
    label: 'Especialista Apple',
    href: 'https://isolution.com.co',
  },
  {
    id: 'meghans',
    title: "Meghan's Momentum",
    description: 'Experiencia editorial para una artista de taxidermia ética y piezas hechas a mano.',
    image: '/images/meghans.png',
    alt: "Captura de la homepage editorial de Meghan's Momentum con enfoque artesanal y artístico.",
    tone: 'neutral' as const,
    label: 'Portafolio editorial',
    href: 'https://www.meghansmomentumstudios.com',
  },
  {
    id: 'spa-lleras',
    title: 'Spa Lleras',
    description: 'Landing de alta conversión con una atmósfera visual orientada al bienestar.',
    image: '/images/spa.png',
    alt: 'Captura de la landing de Spa Lleras con hero de spa y reservas de bienestar en Medellín.',
    tone: 'cyan' as const,
    label: 'Reserva wellness',
    href: 'https://spalleras.com/',
  },
  {
    id: 'lleras-medical',
    title: 'Lleras Medical',
    description: 'Experiencia digital premium enfocada en revitalización, bienestar profundo y balance personal.',
    image: '/images/medical.png',
    alt: 'Captura de la homepage de Lleras Medical con servicio premium de terapia intravenosa en Medellín.',
    tone: 'blue' as const,
    label: 'Recuperación premium',
    href: 'https://www.llerasmedicallounge.com/',
  },
  {
    id: 'blue-moon',
    title: 'Blue Moon Cottage',
    description: 'Branding y motor de reservas para una experiencia de hospedaje aspiracional.',
    image: '/images/blue-moon-hero.png',
    alt: 'Captura de la web de Blue Moon Cottage con interior de alojamiento frente al mar en Bahamas.',
    tone: 'lime' as const,
    label: 'Hospitalidad premium',
    href: 'https://www.bluemoonhopetown.com',
  },
] as const;

const STACK_DEPTH = 3;
const ANIMATION_MS = 340;
const MOBILE_MEDIA_QUERY = '(max-width: 767px)';

export default function StitchCardStack() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const syncViewport = () => setIsMobile(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener('change', syncViewport);

    return () => {
      mediaQuery.removeEventListener('change', syncViewport);
    };
  }, []);

  const visibleProjects = useMemo(
    () =>
      Array.from({ length: STACK_DEPTH }, (_, offset) => {
        const projectIndex = (index + offset) % PROJECTS.length;
        return PROJECTS[projectIndex];
      }),
    [index],
  );

  const nextCard = () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);

    timeoutRef.current = window.setTimeout(() => {
      setIndex((prev) => (prev + 1) % PROJECTS.length);
      setIsAnimating(false);
      timeoutRef.current = null;
    }, ANIMATION_MS);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className="relative h-[580px] w-full max-w-[580px] sm:h-[600px] sm:max-w-[640px] lg:h-[640px] lg:max-w-[720px]"
        style={{ perspective: '2000px' }}
      >
        {visibleProjects.map((project, offset) => {
          const isTopCard = offset === 0;
          const targetRank = isAnimating && !isTopCard ? offset - 1 : offset;
          const translateY = targetRank * -34;
          const scale = 1 - targetRank * 0.06;
          const opacity = 1 - targetRank * 0.24;
          const zIndex = STACK_DEPTH - targetRank;
          const isIncomingTopCard = isMobile && isAnimating && !isTopCard && targetRank === 0;
          const isPrimaryVisual = isTopCard || isIncomingTopCard;
          const transform = isTopCard && isAnimating
            ? isMobile
              ? 'translate3d(84px, 56px, 0) rotate(8deg) scale(0.96)'
              : 'translate3d(132px, 82px, 0) rotate(12deg) scale(0.94)'
            : isMobile
              ? `translate3d(0, ${translateY}px, 0) rotate(${targetRank * -1.4}deg) scale(${scale})`
              : `translate3d(0, ${translateY}px, ${targetRank * -84}px) rotate(${targetRank * -2.2}deg) scale(${scale})`;

          return (
            <div
              key={project.id}
              onClick={isTopCard ? nextCard : undefined}
              onKeyDown={
                isTopCard
                  ? (event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        nextCard();
                      }
                    }
                  : undefined
              }
              className={cx(
                'group absolute inset-0 mx-auto block h-full w-full max-w-[560px] transform-gpu text-left transition-[transform,opacity] duration-[340ms] ease-[cubic-bezier(0.16,1.18,0.32,1)] [will-change:transform,opacity] sm:max-w-[620px] lg:max-w-[680px]',
                isTopCard
                  ? 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70'
                  : 'pointer-events-none',
              )}
              role={isTopCard ? 'button' : undefined}
              tabIndex={isTopCard ? 0 : -1}
              style={{
                transform,
                opacity: isTopCard && isAnimating ? (isMobile ? 0.36 : 0) : opacity,
                zIndex,
              }}
              aria-hidden={!isTopCard}
              aria-label={isTopCard ? `Ver siguiente proyecto. Actual: ${project.title}` : undefined}
            >
              <CardPrimitive
                tone={project.tone}
                className={cx(
                  'relative flex h-full overflow-hidden border-zinc-800/60 bg-zinc-950/80 p-0 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-[340ms] ease-[cubic-bezier(0.16,1.18,0.32,1)]',
                  isTopCard && 'group-hover:-translate-y-1 group-hover:border-cyan-400/30 group-hover:shadow-[0_0_26px_rgba(34,211,238,0.08),0_30px_120px_rgba(0,0,0,0.55)]',
                )}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] grainy-bg">
                  <div className="relative h-[50%] w-full overflow-hidden sm:h-[56%] lg:h-[62%]">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      sizes="(min-width: 1024px) 680px, 100vw"
                      className={cx(
                        'object-cover [backface-visibility:hidden] transition-[filter,transform,opacity] duration-[260ms] ease-[cubic-bezier(0.16,1.18,0.32,1)] md:duration-[420ms]',
                        isPrimaryVisual
                          ? 'opacity-100 md:opacity-85 md:grayscale group-hover:grayscale-0 group-hover:scale-[1.04]'
                          : 'opacity-72 md:opacity-40 md:grayscale',
                      )}
                    />
                    <div
                      className={cx(
                        'absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent',
                        isPrimaryVisual ? 'opacity-32 md:opacity-100' : 'opacity-40 md:opacity-100',
                      )}
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:gap-5 sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={cx(
                          'font-mono text-[9px] uppercase tracking-[0.28em] sm:tracking-[0.42em]',
                          project.tone === 'cyan'
                            ? 'text-cyan-400'
                            : project.tone === 'blue'
                              ? 'text-blue-400'
                              : project.tone === 'lime'
                                ? 'text-lime-400'
                                : 'text-zinc-500',
                        )}
                      >
                        {project.label}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-700">
                        0{((index + offset) % PROJECTS.length) + 1}
                      </span>
                    </div>

                    <div className="space-y-2.5 sm:space-y-3">
                      <h3 className="text-[2rem] font-headline italic leading-[0.92] text-white sm:text-5xl">
                        <MonoToken kind="project">{project.title}</MonoToken>
                      </h3>
                      <p className="max-w-xl font-mono text-[12px] leading-relaxed text-zinc-400 sm:text-xs sm:text-zinc-500">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/80 pt-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600 sm:tracking-[0.3em]">
                        Explora para revelar
                      </span>
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="pointer-events-auto font-mono text-[10px] uppercase tracking-[0.24em] text-lime-400 transition-[color,transform] duration-[240ms] ease-[cubic-bezier(0.16,1.18,0.32,1)] hover:-translate-y-0.5 hover:text-white sm:tracking-[0.32em]"
                      >
                        Ver proyecto _
                      </a>
                    </div>
                  </div>
                </div>
              </CardPrimitive>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex w-full justify-center">
        <button
          type="button"
          onClick={nextCard}
          className="group flex w-full max-w-[260px] flex-col items-center gap-3 rounded-[2rem] border border-zinc-800/80 bg-black px-6 py-5 text-center transition-[transform,border-color,box-shadow] duration-[260ms] ease-[cubic-bezier(0.16,1.18,0.32,1)] hover:-translate-y-0.5 hover:border-cyan-400/40 hover:shadow-[0_0_24px_rgba(34,211,238,0.08)]"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-zinc-600 transition-colors duration-[220ms] ease-[cubic-bezier(0.16,1.18,0.32,1)] group-hover:text-cyan-400">
            Explorar Proyectos
          </span>
          <div className="h-px w-full overflow-hidden bg-zinc-900">
            <div
              className={cx(
                'h-full w-1/2 bg-cyan-400 transition-transform duration-[340ms] ease-[cubic-bezier(0.16,1.18,0.32,1)]',
                isAnimating ? 'translate-x-[210%]' : '-translate-x-[120%]',
              )}
            />
          </div>
        </button>
      </div>
    </div>
  );
}

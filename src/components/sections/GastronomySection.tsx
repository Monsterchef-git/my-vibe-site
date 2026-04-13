import Image from 'next/image';
import ErrorBoundary from '@/components/ErrorBoundary';
import LiveScanMetrics from '@/components/LiveScanMetrics';
import MonoToken from '@/components/MonoToken';
import ProvenanceTokens from '@/components/ProvenanceTokens';
import ScrollSectionPrimitive from '@/components/ScrollSectionPrimitive';
import { Primitive, cx } from '@/components/primitive';
import { SectionChrome, SectionCTA } from '@/components/sections/SectionChrome';
import {
  sectionBodyClassName,
  sectionIntroClassName,
  sectionTitleClassName,
} from '@/components/sections/sectionStyles';

interface GastronomySectionProps {
  id?: string;
  className?: string;
  contactHref?: string | null;
}

export default function GastronomySection({
  id = 'gastronomy',
  className,
  contactHref = '/contact',
}: GastronomySectionProps) {
  return (
    <ScrollSectionPrimitive id={id} scrollTone="lime" className={cx('space-y-10', className)}>
      <SectionChrome
        index="01"
        label="Gastronomía"
        meta={
          <>
            Chef creativo · eventos · <MonoToken kind="location">Medellín</MonoToken>
          </>
        }
        tone="lime"
      />

      <div className={sectionIntroClassName}>
        <h2 className={cx(sectionTitleClassName, 'text-[var(--accent-primary)] night-glow')}>
          Culinaria Creativa
        </h2>
        <p className={sectionBodyClassName}>
          Diseño experiencias donde la alta cocina y la estrategia se encuentran. Desde el
          desarrollo de menús para <MonoToken kind="project">Wink Eventos</MonoToken> hasta cenas
          privadas en <MonoToken kind="location">Medellín</MonoToken>, cada servicio combina
          ingredientes locales, técnica precisa y una puesta en escena pensada para quedarse en la
          memoria.
        </p>

        <div className="pt-1">
          <ErrorBoundary>
            <ProvenanceTokens />
          </ErrorBoundary>
        </div>
      </div>

      <div className="grid auto-rows-[250px] grid-cols-2 gap-4 md:auto-rows-[300px] md:grid-cols-4">
        <Primitive.Card
          tone="lime"
          className="culinary-glitch-card relative col-span-2 row-span-2 overflow-hidden border-lime-400/30 bg-black p-0 shadow-[0_30px_120px_rgba(0,0,0,0.58)] backdrop-blur-xl"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/culinary-plating.jpeg"
              alt="Platos de carne emplatados para servicio premium"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="object-cover object-center opacity-95 transition-[transform,filter,opacity] duration-700 ease-out md:opacity-55 md:grayscale group-hover:scale-[1.04] group-hover:opacity-85 group-hover:grayscale-0"
            />
            <Image
              src="/images/culinary-plating.jpeg"
              alt=""
              aria-hidden="true"
              fill
              sizes="1px"
              loading="lazy"
              className="pointer-events-none object-cover object-center opacity-0 mix-blend-screen transition-all duration-300 ease-out group-hover:-translate-x-1.5 group-hover:translate-y-0.5 group-hover:opacity-25"
              style={{ filter: 'sepia(1) saturate(8) hue-rotate(24deg) brightness(1.15)' }}
            />
            <Image
              src="/images/culinary-plating.jpeg"
              alt=""
              aria-hidden="true"
              fill
              sizes="1px"
              loading="lazy"
              className="pointer-events-none object-cover object-center opacity-0 mix-blend-screen transition-all duration-300 ease-out group-hover:translate-x-1.5 group-hover:-translate-y-0.5 group-hover:opacity-20"
              style={{ filter: 'sepia(1) saturate(8) hue-rotate(164deg) brightness(1.1)' }}
            />
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(202,253,0,0.16),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.52)_52%,rgba(0,0,0,0.9)_100%)] opacity-55 transition-opacity duration-500 group-hover:opacity-100 md:opacity-100" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(202,253,0,0.05)_0,transparent_28%,transparent_72%,rgba(202,253,0,0.08)_100%)] opacity-18 transition-opacity duration-500 group-hover:opacity-60 md:opacity-30" />
          <div className="culinary-glitch-noise absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="culinary-scanline absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="culinary-scanbar absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(202,253,0,0),rgba(202,253,0,0.16),rgba(202,253,0,0))] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute inset-0 z-10 flex flex-col justify-between p-6">
            <div className="flex min-w-0 flex-wrap items-start justify-between gap-3 sm:gap-4">
              <div className="flex-1 space-y-3">
                <span className="inline-block max-w-full truncate rounded-full border border-lime-400/30 bg-black/70 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.15em] text-lime-400 backdrop-blur-xl sm:px-3 sm:text-[9px] sm:tracking-[0.36em]">
                  SERVICIO: PREMIUM_EVENT_01
                </span>
                <div className="max-w-[16rem] font-mono text-[8px] uppercase tracking-[0.15em] text-zinc-500 transition-colors duration-300 group-hover:text-lime-300/80 line-clamp-2 sm:text-[10px] sm:tracking-[0.3em] sm:line-clamp-none">
                  Lectura sensorial / secuencia de emplatado premium
                </div>
              </div>

              <div className="shrink-0 rounded-2xl border border-lime-400/20 bg-black/55 px-2 py-1.5 font-mono text-[7px] uppercase tracking-[0.15em] text-zinc-500 backdrop-blur-xl transition-colors duration-300 group-hover:border-lime-400/40 group-hover:text-lime-400 sm:px-3 sm:py-2 sm:text-[9px] sm:tracking-[0.3em]">
                LECTURA EN VIVO
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="w-fit max-w-[24rem] rounded-[2rem] border border-white/10 bg-black/55 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl md:bg-black/45">
                <h3 className="max-w-[14rem] text-3xl font-headline italic leading-tight text-white transition-all duration-500 group-hover:text-lime-100 md:text-4xl">
                  Experiencias a Medida
                </h3>
                <p className="mt-2 max-w-[22rem] font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 transition-colors duration-300 group-hover:text-lime-300/90">
                  Producto local / señal precisa / ejecución al fuego
                </p>
              </div>

              <ErrorBoundary>
                <LiveScanMetrics />
              </ErrorBoundary>
            </div>
          </div>
        </Primitive.Card>

        <Primitive.Card tone="neutral" className="group relative row-span-2 overflow-hidden">
          <Image
            src="/images/culinary-chef.jpeg"
            alt="Chef emplatando durante un servicio gastronómico"
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            loading="lazy"
            className="object-cover opacity-80 transition-all md:opacity-40 md:grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <p className="rounded-[1.5rem] border border-white/10 bg-black/60 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.3em] leading-relaxed text-zinc-300 backdrop-blur-xl">
              Chef <br /> en <br /> servicio _
            </p>
          </div>
        </Primitive.Card>

        <Primitive.Card
          tone="lime"
          className="group relative overflow-hidden border-lime-400/20 bg-transparent transition-colors hover:border-lime-400/50"
        >
          <Image
            src="/images/culinary-fresh.jpeg"
            alt="Bowl de atún sellado con vegetales frescos y microgreens"
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            loading="lazy"
            className="object-cover opacity-92 saturate-100 contrast-100 transition-all duration-500 md:opacity-50 md:saturate-50 md:contrast-90 md:grayscale group-hover:scale-105 group-hover:opacity-85 group-hover:grayscale-0 group-hover:saturate-[1.2] group-hover:contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-40 md:opacity-100" />
          <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center px-4 text-center">
            <span className="rounded-full border border-white/10 bg-black/60 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-zinc-300 backdrop-blur-xl group-hover:text-lime-400">
              Composición fresca +
            </span>
          </div>
        </Primitive.Card>

        <Primitive.Card
          tone="neutral"
          className="group relative overflow-hidden border-zinc-800/80 bg-transparent transition-colors hover:border-lime-400/50"
        >
          <Image
            src="/images/culinary-hero.jpeg"
            alt="Servicio gastronómico con sopa cremosa y crostini emplatado"
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            loading="lazy"
            className="object-cover opacity-92 saturate-100 contrast-100 transition-all duration-500 md:opacity-45 md:saturate-50 md:contrast-90 md:grayscale group-hover:scale-105 group-hover:opacity-80 group-hover:grayscale-0 group-hover:saturate-[1.2] group-hover:contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-40 md:opacity-100" />
          <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center px-4 text-center">
            <span className="rounded-full border border-white/10 bg-black/60 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-zinc-300 backdrop-blur-xl group-hover:text-lime-400">
              Servicio emplatado +
            </span>
          </div>
        </Primitive.Card>
      </div>

      {contactHref ? (
        <SectionCTA href={contactHref} label="Contacto _" tone="lime" />
      ) : null}
    </ScrollSectionPrimitive>
  );
}

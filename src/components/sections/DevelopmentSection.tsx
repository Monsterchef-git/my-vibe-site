import Image from 'next/image';
import Link from 'next/link';
import ErrorBoundary from '@/components/ErrorBoundary';
import MonoToken from '@/components/MonoToken';
import StitchCardStack from '@/components/StitchCardStack';
import TypewriterTerminal from '@/components/TypewriterTerminal';
import { Primitive, cx } from '@/components/primitive';
import {
  sectionBodyClassName,
  sectionEyebrowClassName,
  sectionIntroClassName,
  sectionTitleClassName,
} from '@/components/sections/sectionStyles';

interface DevelopmentSectionProps {
  id?: string;
  className?: string;
  contactHref?: string;
}

export default function DevelopmentSection({
  id = 'development',
  className,
  contactHref = '/contact',
}: DevelopmentSectionProps) {
  return (
    <Primitive.Section id={id} className={cx('space-y-10', className)}>
      <div className={sectionIntroClassName}>
        <p className={sectionEyebrowClassName}>Next.js • IA aplicada • landings de conversión</p>
        <h2 className={cx(sectionTitleClassName, 'text-cyan-400')}>Digital Craft</h2>
        <p className={sectionBodyClassName}>
          Construyo experiencias web con precisión técnica y criterio comercial. Trabajo con un
          flujo apoyado en IA para diseñar interfaces rápidas, claras y enfocadas en conversión,
          cuidando tanto el sistema visual como el rendimiento real del producto.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-8 xl:grid-cols-[minmax(0,1.28fr)_minmax(420px,1fr)] xl:items-start">
        <div className="xl:pt-2">
          <ErrorBoundary>
            <StitchCardStack />
          </ErrorBoundary>
        </div>

        <a href="https://www.tecnical.app" target="_blank" rel="noopener noreferrer" className="group block">
          <Primitive.Card
            tone="neutral"
            className="relative flex min-h-[420px] flex-col overflow-hidden border-zinc-800/60 bg-zinc-950/70 p-7 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-500 hover:border-lime-400/30 xl:min-h-[748px] xl:p-8"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src="/images/tecnicalapp.png"
                alt="Captura de la landing de tecnical.app con propuesta para optimizar la operación de talleres."
                fill
                sizes="(min-width: 1280px) 420px, calc(100vw - 3rem)"
                quality={72}
                className="absolute inset-0 object-cover object-top opacity-82 transition-all duration-[1800ms] ease-out md:opacity-36 md:grayscale group-hover:scale-105 group-hover:opacity-72 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(202,253,0,0.1),transparent_36%),linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.68)_30%,rgba(0,0,0,0.9)_100%)] opacity-42 md:opacity-100" />
              <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/78 via-black/42 to-transparent md:from-black/62 md:via-black/28" />
              <div className="grainy-bg absolute inset-0" />
            </div>

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3 rounded-[1.75rem] border border-zinc-800/80 bg-black/62 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.26)] backdrop-blur-md md:bg-black/52">
                  <p className="font-mono text-[9px] uppercase tracking-[0.42em] text-zinc-300 md:text-zinc-600">
                    SaaS para talleres
                  </p>
                  <div>
                    <h4 className="text-3xl font-headline italic leading-none text-white night-glow">
                      <MonoToken kind="project">tecnical.app</MonoToken>
                    </h4>
                    <p className="mt-2 max-w-[20rem] font-mono text-[11px] leading-relaxed text-zinc-200 md:text-zinc-500">
                      Sistema operativo para talleres con foco en procesos, infraestructura y
                      autogestión.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <div className="h-3 w-3 rounded-full bg-red-500/20 transition-colors group-hover:bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/20 transition-colors group-hover:bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500/20 transition-colors group-hover:bg-green-500" />
                </div>
              </div>

              <div className="mt-auto pt-16 xl:pt-20">
                <div className="rounded-[2rem] border border-zinc-800/80 bg-black/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] backdrop-blur-md xl:p-6">
                  <ErrorBoundary>
                    <TypewriterTerminal className="h-[320px] text-[9px] sm:text-[10px] md:text-[11px] xl:h-[360px]" />
                  </ErrorBoundary>
                </div>

                <div className="mt-6 border-t border-zinc-800/80 pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-300 md:text-zinc-600">
                      Operación & SaaS
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-lime-400 transition-colors group-hover:text-white">
                      Ver proyecto _
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Primitive.Card>
        </a>
      </div>

      <Link
        href={contactHref}
        className="group mt-10 flex items-center justify-between gap-4 rounded-[2rem] border border-zinc-800/60 bg-black/40 px-6 py-4 transition-all duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_24px_rgba(34,211,238,0.06)]"
      >
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-400 transition-colors duration-300 group-hover:text-white">
          Conversemos _
        </span>
        <span className="shrink-0 font-mono text-sm text-zinc-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400">
          →
        </span>
      </Link>
    </Primitive.Section>
  );
}

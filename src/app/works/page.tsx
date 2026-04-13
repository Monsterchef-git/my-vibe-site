import type { Metadata } from 'next';
import MonoToken from '@/components/MonoToken';
import TopNav from '@/components/TopNav';
import DevelopmentSection from '@/components/sections/DevelopmentSection';
import GastronomySection from '@/components/sections/GastronomySection';
import { Primitive } from '@/components/primitive';

export const metadata: Metadata = {
  title: 'Works | John Herrera',
  description:
    'Selección de trabajo gastronómico y digital de John Herrera: experiencias culinarias, sistemas visuales y landings de conversión.',
};

export default function WorksPage() {
  return (
    <main
      id="main-content"
      className="relative z-0 min-h-screen bg-[#0a0a0a] px-6 pb-32 pt-28 text-white md:px-24 md:pt-32"
    >
      <TopNav currentPath="/works" />

      <Primitive.Section className="mb-20 mt-14 space-y-8 border-white/10 bg-black/40 md:mt-20">
        <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-[0.34em] text-zinc-500 md:text-[10px]">
          <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1.5 backdrop-blur-xl">
            Works
          </span>
          <span className="rounded-full border border-lime-400/20 bg-lime-400/5 px-3 py-1.5 text-lime-400 backdrop-blur-xl">
            Gastronomy
          </span>
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-cyan-300 backdrop-blur-xl">
            Digital systems
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.72fr)] lg:items-end">
          <div className="space-y-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-zinc-600">
              Selected work / dual practice
            </p>
            <h1 className="max-w-4xl text-5xl font-headline italic leading-[0.94] text-white md:text-7xl">
              Dos frentes.
              <br />
              <span className="text-[#cafd00] night-glow">Una misma lógica.</span>
            </h1>
            <p className="max-w-2xl border-l border-lime-400/25 pl-6 font-mono text-sm leading-relaxed text-zinc-400">
              Esta página reúne la producción visible en cocina y en producto digital.
              El criterio es el mismo en ambos casos: dirección clara, ejecución precisa y
              una superficie final que no se sienta genérica.
            </p>
          </div>

          <div className="space-y-3 rounded-[2rem] border border-white/10 bg-black/55 p-5 backdrop-blur-xl">
            <p className="font-mono text-[9px] uppercase tracking-[0.42em] text-zinc-600">
              {'// scope'}
            </p>
            <div className="space-y-2 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-400">
              <p>
                Culinary: <MonoToken kind="project">Wink Eventos</MonoToken>
              </p>
              <p>
                Digital: <MonoToken kind="project">tecnical.app</MonoToken>
              </p>
              <p>
                Base: <MonoToken kind="location">Medellín</MonoToken>
              </p>
            </div>
          </div>
        </div>
      </Primitive.Section>

      <GastronomySection
        id="works-gastronomy"
        className="bg-zinc-950/70"
        contactHref="/contact"
      />

      <div className="my-24 flex flex-col items-center gap-3">
        <div className="flex w-full items-center gap-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
          <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-600">
            Digital surfaces _
          </p>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
        </div>
      </div>

      <DevelopmentSection
        id="works-development"
        className="bg-zinc-950/70"
        contactHref="/contact"
      />
    </main>
  );
}

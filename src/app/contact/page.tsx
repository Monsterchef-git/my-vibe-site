import type { Metadata } from 'next';
import MonoToken from '@/components/MonoToken';
import TopNav from '@/components/TopNav';
import ContactSection from '@/components/sections/ContactSection';
import { Primitive } from '@/components/primitive';

export const metadata: Metadata = {
  title: 'Contact | John Herrera',
  description:
    'Contacto para proyectos gastronómicos, experiencias privadas y trabajo de producto digital con John Herrera.',
};

export default function ContactPage() {
  return (
    <main
      id="main-content"
      className="relative z-0 min-h-screen bg-[#0a0a0a] px-6 pb-32 pt-28 text-white md:px-24 md:pt-32"
    >
      <TopNav currentPath="/contact" />

      <Primitive.Section className="mb-20 mt-14 space-y-8 border-white/10 bg-black/40 md:mt-20">
        <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-[0.34em] text-zinc-500 md:text-[10px]">
          <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1.5 backdrop-blur-xl">
            Contact
          </span>
          <span className="rounded-full border border-lime-400/20 bg-lime-400/5 px-3 py-1.5 text-lime-400 backdrop-blur-xl">
            Selected collaborations
          </span>
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-cyan-300 backdrop-blur-xl">
            Medellín / Remote
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.72fr)] lg:items-end">
          <div className="space-y-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-zinc-600">
              Reach out / project context
            </p>
            <h1 className="max-w-4xl text-5xl font-headline italic leading-[0.94] text-white md:text-7xl">
              Si hay una idea clara,
              <br />
              <span className="text-[#cafd00] night-glow">construyámosla bien.</span>
            </h1>
            <p className="max-w-2xl border-l border-lime-400/25 pl-6 font-mono text-sm leading-relaxed text-zinc-400">
              Esta página concentra el punto de contacto directo para cenas privadas, dirección
              gastronómica, landings editoriales y superficies digitales orientadas a negocio.
            </p>
          </div>

          <div className="space-y-3 rounded-[2rem] border border-white/10 bg-black/55 p-5 backdrop-blur-xl">
            <p className="font-mono text-[9px] uppercase tracking-[0.42em] text-zinc-600">
              {'// contact_scope'}
            </p>
            <div className="space-y-2 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-400">
              <p>
                Base: <MonoToken kind="location">Medellín</MonoToken>
              </p>
              <p>
                Focus: <MonoToken kind="project">Private dining / editorial landing pages</MonoToken>
              </p>
              <p>
                Status: <MonoToken kind="status">Available</MonoToken>
              </p>
            </div>
          </div>
        </div>
      </Primitive.Section>

      <ContactSection className="bg-zinc-950/70" />
    </main>
  );
}

import Link from 'next/link';
import MonoToken from '@/components/MonoToken';
import ScrollSectionPrimitive from '@/components/ScrollSectionPrimitive';
import { cx } from '@/components/primitive';
import { sectionEyebrowClassName } from '@/components/sections/sectionStyles';

interface AboutSectionProps {
  id?: string;
  className?: string;
  contactHref?: string;
}

const stats = [
  { value: '10+', label: 'Años en\ncocina', accent: false },
  { value: '03', label: 'Marcas\nlanzadas', accent: false },
  { value: '∞', label: 'Obsesión\npor detalle', accent: true },
];

const specRows = [
  { key: 'BASE', value: 'Medellín, Antioquia' },
  { key: 'COCINA', value: 'Contemporánea tropical' },
  { key: 'STACK', value: 'Next.js · Tailwind · IA' },
  { key: 'EXPERTISE', value: 'Landings · SEO · Deploy' },
  { key: 'FILOSOFÍA', value: 'Precisión, producto local, alma' },
];

export default function AboutSection({
  id = 'about',
  className,
  contactHref = '/contact',
}: AboutSectionProps) {
  return (
    <ScrollSectionPrimitive id={id} scrollTone="white" className={cx('pt-20 md:pt-8 overflow-hidden', className)}>

      {/* ── Marca de agua: número de sección ── */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-10 select-none font-headline text-[22vw] font-bold italic leading-none text-zinc-900/60 md:text-[18vw]"
      >
        02
      </span>

      {/* ── Eyebrow ── */}
      <div className="mb-12 flex items-center gap-6">
        <span className={sectionEyebrowClassName}>02 ——— Sobre mí</span>
        <span className="hidden h-px flex-1 bg-zinc-800 md:block" />
        <span className={cx(sectionEyebrowClassName, 'hidden md:block')}>
          Medellín, Colombia
        </span>
      </div>

      {/* ── Headline editorial ── */}
      <div className="mb-16 space-y-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-zinc-600">
          {'// Chef · Dev · Builder'}
        </p>
        <h2 className="font-headline text-[14vw] italic leading-[0.9] text-white md:text-[10vw] lg:text-[8vw]">
          John
        </h2>
        <h2 className="font-headline text-[14vw] italic leading-[0.9] text-[#cafd00] night-glow md:text-[10vw] lg:text-[8vw]">
          Herrera
        </h2>
      </div>

      {/* ── Grid principal ── */}
      <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">

        {/* Columna izquierda: bio + stats */}
        <div className="space-y-12">

          {/* Stats row */}
          <div className="grid grid-cols-3 divide-x divide-zinc-800/60">
            {stats.map((s) => (
              <div key={s.label} className="px-6 first:pl-0 last:pr-0">
                <p
                  className={cx(
                    'font-headline text-5xl italic leading-none md:text-6xl',
                    s.accent ? 'text-[#cafd00] night-glow' : 'text-white',
                  )}
                >
                  {s.value}
                </p>
                <p className="mt-2 whitespace-pre-line font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="grid gap-6 border-t border-zinc-800/60 pt-8 md:grid-cols-2">
            <p className="font-mono text-sm leading-relaxed text-zinc-400">
              Entiendo la creación como equilibrio entre técnica y narrativa. Más de una
              década liderando cocinas en{' '}
              <MonoToken kind="location">Medellín</MonoToken> afinó esa convicción: mi
              propuesta gastronómica es contemporánea, de esencia tropical, con el producto
              local como punto de partida y el rigor técnico como lenguaje.
            </p>
            <p className="font-mono text-sm leading-relaxed text-zinc-500">
              Esa misma obsesión por el detalle la traslado al digital. Desarrollo landings
              de alto impacto, optimizo SEO y diseño sistemas visuales. Hoy elevo el
              estándar de bodas en <MonoToken kind="location">Medellín</MonoToken> desde{' '}
              <MonoToken kind="project">Wink Eventos</MonoToken> y dirijo{' '}
              <MonoToken kind="project">tecnical.app</MonoToken>.
            </p>
          </div>
        </div>

        {/* Columna derecha: spec sheet vertical */}
        <div className="shrink-0 lg:w-60">
          <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.42em] text-zinc-700">
            {'// spec_sheet.yml'}
          </p>
          <div className="space-y-0">
            {specRows.map((item, i) => (
              <div
                key={item.key}
                className={cx(
                  'py-3 font-mono text-[10px] uppercase tracking-[0.18em]',
                  i < specRows.length - 1 && 'border-b border-zinc-800/50',
                )}
              >
                <span className="block text-zinc-700">{item.key}</span>
                <span className="mt-0.5 block text-zinc-300">{item.value}</span>
              </div>
            ))}

            {/* Status CTA */}
            <div className="border-t border-zinc-800/50 pt-4">
              <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-700">
                STATUS
              </span>
              <Link
                href={contactHref}
                className="mt-2 inline-flex rounded-full border border-lime-400/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-lime-400 transition-colors hover:border-lime-400 hover:bg-lime-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60"
              >
                <MonoToken kind="status">Exploremos ideas</MonoToken>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ticker ── */}
      <div className="mt-12 flex items-center gap-4 border-t border-zinc-800/60 pt-6">
        <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
        <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-zinc-600">
          Disponible para proyectos · Wink Eventos · tecnical.app · 2026
        </span>
      </div>

    </ScrollSectionPrimitive>
  );
}

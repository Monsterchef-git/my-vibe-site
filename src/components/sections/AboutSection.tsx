import Eyebrow from '@/components/Eyebrow';
import MonoToken from '@/components/MonoToken';
import ScrollSectionPrimitive from '@/components/ScrollSectionPrimitive';
import { cx } from '@/components/primitive';
import { SectionChrome } from '@/components/sections/SectionChrome';

interface AboutSectionProps {
  id?: string;
  className?: string;
}

const stats = [
  { value: '10+', label: 'Años en\ncocina', accent: false },
  { value: '03', label: 'Marcas\nlanzadas', accent: false },
  { value: '∞', label: 'Obsesión\ndetalle', accent: true },
];

const specRows = [
  { key: 'CIUDAD', value: 'Medellín, Antioquia' },
  { key: 'COCINA', value: 'Contemporánea tropical' },
  { key: 'HERRAMIENTAS', value: 'Next.js · Tailwind · IA' },
  { key: 'ENFOQUE', value: 'Landings · SEO · Dirección visual' },
  { key: 'FILOSOFÍA', value: 'Precisión, producto local, alma' },
];

export default function AboutSection({
  id = 'about',
  className,
}: AboutSectionProps) {
  return (
    <ScrollSectionPrimitive id={id} scrollTone="white" className={cx('pt-20 md:pt-8 overflow-hidden', className)}>
      <SectionChrome
        index="03"
        label="Sobre mí"
        meta="Medellín, Colombia"
        tone="white"
      />

      {/* ── Headline editorial ── */}
      <div className="mb-16 space-y-8">
        <Eyebrow role="muted">About ———</Eyebrow>
        <Eyebrow role="muted">Chef · Builder · Medellín</Eyebrow>
        <div className="space-y-0">
          <h2 className="font-headline text-[clamp(3rem,11vw,9rem)] italic leading-[0.9] text-white">
            John
          </h2>
          <h2 className="font-headline text-[clamp(3rem,11vw,9rem)] italic leading-[0.9] text-[var(--accent-primary)] night-glow">
            Herrera
          </h2>
        </div>
        <p className="max-w-2xl border-l border-white/10 pl-6 font-mono text-sm leading-relaxed text-zinc-400">
          Dos disciplinas, un mismo estándar: servicio, dirección creativa y producto digital
          construidos desde sistema, precisión y criterio editorial.
        </p>
      </div>

      {/* ── Grid principal ── */}
      <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">

        {/* Columna izquierda: bio + stats */}
        <div className="space-y-12">

          {/* Stats row */}
          <div className="grid grid-cols-3 divide-x divide-zinc-800/60">
            {stats.map((s) => (
              <div key={s.label} className="px-2 sm:px-5 first:pl-0 last:pr-0">
                <p
                  className={cx(
                    'font-headline text-4xl italic leading-none sm:text-5xl md:text-6xl',
                    s.accent ? 'text-[var(--accent-primary)] night-glow' : 'text-white',
                  )}
                >
                  {s.value}
                </p>
                <Eyebrow as="p" role="dim" className="mt-2 whitespace-pre-line tracking-[0.18em] sm:tracking-[0.24em]">
                  {s.label}
                </Eyebrow>
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
          <Eyebrow as="span" role="dim" className="mb-4 block">Perfil</Eyebrow>
          <div className="space-y-0">
            {specRows.map((item, i) => (
              <div
                key={item.key}
                className={cx(
                  'py-3',
                  i < specRows.length - 1 && 'border-b border-zinc-800/50',
                )}
              >
                <Eyebrow as="span" role="dim" className="block tracking-[0.18em]">
                  {item.key}
                </Eyebrow>
                <Eyebrow as="span" role="muted" className="mt-0.5 block tracking-[0.18em]">
                  {item.value}
                </Eyebrow>
              </div>
            ))}

            {/* Status CTA */}
            <div className="border-t border-zinc-800/50 pt-4">
              <Eyebrow as="span" role="dim" className="block tracking-[0.18em]">
                DISPONIBILIDAD
              </Eyebrow>
              <MonoToken kind="status" className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.24em]">
                Disponible para ideas en cruce
              </MonoToken>
            </div>
          </div>
        </div>
      </div>

    </ScrollSectionPrimitive>
  );
}

import Link from 'next/link';
import MonoToken from '@/components/MonoToken';
import { Primitive, cx } from '@/components/primitive';
import {
  sectionEyebrowClassName,
  sectionIntroClassName,
  sectionTitleClassName,
} from '@/components/sections/sectionStyles';

interface AboutSectionProps {
  id?: string;
  className?: string;
  contactHref?: string;
}

export default function AboutSection({
  id = 'about',
  className,
  contactHref = '/contact',
}: AboutSectionProps) {
  return (
    <Primitive.Section id={id} className={cx('pt-20 md:pt-8', className)}>
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="space-y-8">
          <div className={sectionIntroClassName}>
            <p className={sectionEyebrowClassName}>
              Medellín, Colombia • +10 años en cocina • digital craft
            </p>
            <h2 className={cx(sectionTitleClassName, 'text-white')}>
              Sobre <span className="text-[#cafd00] night-glow">mí</span>
            </h2>
          </div>

          <div className="space-y-5 border-l border-zinc-800/80 pl-6">
            <p className="font-mono text-sm leading-relaxed text-zinc-400">
              Entiendo la creación como un equilibrio entre técnica y narrativa. Más de una década
              liderando cocinas en <MonoToken kind="location">Medellín</MonoToken> afinó esa
              convicción: mi propuesta gastronómica es contemporánea, de esencia tropical, con el
              producto local como punto de partida y el rigor técnico como lenguaje.
            </p>
            <p className="font-mono text-sm leading-relaxed text-zinc-400">
              Esa misma obsesión por el detalle la traslado al entorno digital. Desarrollo landing
              pages de alto impacto, optimizo SEO y diseño sistemas visuales para marcas que buscan
              presencia real en la web.
            </p>
            <p className="font-mono text-sm leading-relaxed text-zinc-500">
              Hoy, elevo el estándar de las bodas en <MonoToken kind="location">Medellín</MonoToken>{' '}
              desde <MonoToken kind="project">Wink Eventos</MonoToken> y estoy al frente de la
              landing de <MonoToken kind="project">tecnical.app</MonoToken>.
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-full space-y-4 rounded-[2rem] border border-zinc-800/60 bg-black/50 p-6 backdrop-blur-xl md:p-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.42em] text-zinc-600">
              {'// spec_sheet.yml'}
            </p>

            {[
              { key: 'NOMBRE', value: 'John Herrera' },
              { key: 'BASE', value: 'Medellín, Antioquia' },
              { key: 'COCINA', value: 'Contemporánea tropical' },
              { key: 'STACK', value: 'Next.js • Tailwind • IA aplicada' },
              { key: 'EXPERTISE', value: 'Landings • SEO • Diseño • Deploy' },
              { key: 'FILOSOFÍA', value: 'Precisión, producto local, alma' },
              { key: 'STATUS', value: 'Exploremos ideas' },
            ].map((item, index) => (
              <div
                key={item.key}
                className={cx(
                  'flex items-start justify-between gap-6 pb-3 font-mono text-[11px] uppercase tracking-[0.18em]',
                  index < 6 && 'border-b border-zinc-800/50',
                )}
              >
                <span className="shrink-0 text-zinc-600">{item.key}</span>
                {item.key === 'STATUS' ? (
                  <Link
                    href={contactHref}
                    className="btn-exploremos inline-flex rounded-full border border-lime-400/30 px-3 py-1 text-right text-lime-400 transition-colors hover:border-lime-400 hover:bg-lime-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60"
                  >
                    <MonoToken kind="status" className="text-[10px] tracking-[0.24em]">
                      {item.value}
                    </MonoToken>
                  </Link>
                ) : (
                  <span className="text-right text-zinc-300">{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Primitive.Section>
  );
}

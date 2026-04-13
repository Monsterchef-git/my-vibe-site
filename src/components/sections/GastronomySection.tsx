import Image from 'next/image';
import MonoToken from '@/components/MonoToken';
import ScrollSectionPrimitive from '@/components/ScrollSectionPrimitive';
import { Primitive, cx } from '@/components/primitive';
import { SectionChrome } from '@/components/sections/SectionChrome';
import {
  sectionBodyClassName,
  sectionIntroClassName,
  sectionTitleClassName,
} from '@/components/sections/sectionStyles';

interface GastronomySectionProps {
  id?: string;
  className?: string;
  compact?: boolean;
}

export default function GastronomySection({
  id = 'gastronomy',
  className,
  compact = false,
}: GastronomySectionProps) {
  return (
    <ScrollSectionPrimitive id={id} scrollTone="lime" className={cx('space-y-10', className)}>
      {!compact && (
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
      )}

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
      </div>

      <div className="grid auto-rows-[250px] grid-cols-2 gap-4 md:auto-rows-[300px] md:grid-cols-4">
        <Primitive.Card
          tone="lime"
          className="group relative col-span-2 row-span-2 overflow-hidden border-lime-400/30 bg-black p-0 shadow-[0_30px_120px_rgba(0,0,0,0.58)] backdrop-blur-xl"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/culinary-plating.jpeg"
              alt="Platos de carne emplatados para servicio premium"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="object-cover object-center opacity-95 saturate-100 contrast-100 transition-[transform,filter,opacity] duration-700 ease-out md:opacity-50 md:saturate-50 md:contrast-90 md:grayscale group-hover:scale-[1.04] group-hover:opacity-88 group-hover:grayscale-0 group-hover:saturate-[1.18] group-hover:contrast-[1.08]"
            />
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(202,253,0,0.12),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.28)_0,rgba(0,0,0,0.12)_24%,rgba(0,0,0,0.38)_60%,rgba(0,0,0,0.72)_100%)] opacity-72 transition-opacity duration-500 group-hover:opacity-48 md:opacity-82 md:group-hover:opacity-52" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(202,253,0,0.04)_0,transparent_24%,transparent_70%,rgba(202,253,0,0.08)_100%)] opacity-12 transition-opacity duration-500 group-hover:opacity-18 md:opacity-20" />
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/12 to-transparent opacity-55 transition-opacity duration-500 group-hover:opacity-18 md:opacity-78 md:group-hover:opacity-16" />
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/12 to-transparent opacity-55 transition-opacity duration-500 group-hover:opacity-18 md:opacity-78 md:group-hover:opacity-16" />
        </Primitive.Card>
      </div>
    </ScrollSectionPrimitive>
  );
}

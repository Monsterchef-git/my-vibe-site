import Link from 'next/link';
import ErrorBoundary from '@/components/ErrorBoundary';
import WorksList from '@/components/WorksList';
import ScrollSectionPrimitive from '@/components/ScrollSectionPrimitive';
import { cx } from '@/components/primitive';
import {
  sectionBodyClassName,
  sectionEyebrowClassName,
  sectionIntroClassName,
  sectionTitleClassName,
} from '@/components/sections/sectionStyles';

interface DevelopmentSectionProps {
  id?: string;
  className?: string;
  contactHref?: string | null;
}

export default function DevelopmentSection({
  id = 'development',
  className,
  contactHref = '/contact',
}: DevelopmentSectionProps) {
  return (
    <ScrollSectionPrimitive id={id} scrollTone="cyan" className={cx('space-y-10', className)}>
      <div className={sectionIntroClassName}>
        <p className={sectionEyebrowClassName}>Next.js • IA aplicada • landings de conversión</p>
        <h2 className={cx(sectionTitleClassName, 'text-cyan-400')}>Digital Craft</h2>
        <p className={sectionBodyClassName}>
          Construyo experiencias web con precisión técnica y criterio comercial. Trabajo con un
          flujo apoyado en IA para diseñar interfaces rápidas, claras y enfocadas en conversión,
          cuidando tanto el sistema visual como el rendimiento real del producto.
        </p>
      </div>

      <ErrorBoundary>
        <WorksList />
      </ErrorBoundary>

      {contactHref ? (
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
      ) : null}
    </ScrollSectionPrimitive>
  );
}

import ErrorBoundary from '@/components/ErrorBoundary';
import WorksList from '@/components/WorksList';
import ScrollSectionPrimitive from '@/components/ScrollSectionPrimitive';
import { cx } from '@/components/primitive';
import { SectionChrome, SectionCTA } from '@/components/sections/SectionChrome';
import {
  sectionBodyClassName,
  sectionIntroClassName,
  sectionTitleClassName,
} from '@/components/sections/sectionStyles';

interface DevelopmentSectionProps {
  id?: string;
  className?: string;
  contactHref?: string | null;
  compact?: boolean;
}

export default function DevelopmentSection({
  id = 'development',
  className,
  contactHref = '/contact',
  compact = false,
}: DevelopmentSectionProps) {
  return (
    <ScrollSectionPrimitive id={id} scrollTone="cyan" className={cx('space-y-10', className)}>
      {!compact && (
        <SectionChrome
          index="03"
          label="Digital Craft"
          meta="Next.js · IA aplicada · conversión"
          tone="cyan"
        />
      )}

      <div className={sectionIntroClassName}>
        <h2 className={cx(sectionTitleClassName, 'text-cyan-400 night-glow-cyan')}>
          Digital Craft
        </h2>
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
        <SectionCTA href={contactHref} label="Conversemos _" tone="cyan" />
      ) : null}
    </ScrollSectionPrimitive>
  );
}

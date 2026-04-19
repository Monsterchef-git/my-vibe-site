import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { MonoToken } from '@/design/primitives';
import {
  sectionBodyClassName,
  sectionIntroClassName,
  sectionTitleClassName,
} from '@/design/tokens/components/sectionStyles';
import { SectionChrome } from '@/design/ui';
import GastronomyHorizontalGallery from '@/features/gastronomy/ui/GastronomyHorizontalGallery';
import ScrollSectionPrimitive from '@/components/shared/ScrollSectionPrimitive';
import { cx } from '@/lib/utils/cx';

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
    <ScrollSectionPrimitive
      id={id}
      scrollTone="lime"
      className={cx('space-y-12 !overflow-visible', className)}
    >
      {!compact && (
        <SectionChrome
          index="01"
          label="Gastronomia"
          meta={
            <>
              Chef creativo · eventos · <MonoToken kind="location">Medellin</MonoToken>
            </>
          }
          tone="lime"
        />
      )}

      <div className={cx(sectionIntroClassName, 'reveal')}>
        <div className="space-y-4">
          <h2 className={cx(sectionTitleClassName, 'text-[var(--accent-primary)] night-glow')}>
            Gastronomy
          </h2>
          <p className={sectionBodyClassName}>
            Product.
            <br />
            Timing.
            <br />
            Service.
            <br />
            Atmosphere.
          </p>
        </div>
      </div>

      <ErrorBoundary>
        <div>
          <GastronomyHorizontalGallery />
        </div>
      </ErrorBoundary>
    </ScrollSectionPrimitive>
  );
}

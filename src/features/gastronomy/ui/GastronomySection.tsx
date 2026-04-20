import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { MonoToken, CulinaryTerm } from '@/design/primitives';
import {
  sectionBodyClassName,
  sectionIntroClassName,
  sectionTitleClassName,
} from '@/design/tokens/components/sectionStyles';
import { SectionChrome } from '@/design/ui';
import GastronomyHorizontalGallery from '@/features/gastronomy/ui/GastronomyHorizontalGallery';
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
    <section
      id={id}
      data-scroll-tone="lime"
      data-cursor-role="chef"
      className={cx('relative', className)}
    >
      <div className="px-6 pb-32 md:px-10 md:pb-40">
        {!compact && (
          <SectionChrome
            index="01"
            label="Gastronomy"
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
              <CulinaryTerm term="service">Service</CulinaryTerm>.
              <br />
              Atmosphere.
            </p>
          </div>
        </div>
      </div>

      <ErrorBoundary>
        <GastronomyHorizontalGallery />
      </ErrorBoundary>
    </section>
  );
}

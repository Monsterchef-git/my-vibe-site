import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { SectionChrome } from '@/design/ui';
import {
  sectionBodyClassName,
  sectionIntroClassName,
  sectionTitleClassName,
} from '@/design/tokens/components/sectionStyles';
import WorksList from '@/features/development/ui/WorksList';
import { cx } from '@/lib/utils/cx';

interface DevelopmentSectionProps {
  id?: string;
  className?: string;
  compact?: boolean;
}

export default function DevelopmentSection({
  id = 'development',
  className,
  compact = false,
}: DevelopmentSectionProps) {
  return (
    <section
      id={id}
      data-scroll-tone="cyan"
      data-cursor-role="dev"
      className={cx(
        'relative w-full overflow-hidden',
        compact ? 'pt-4 md:pt-6' : 'space-y-10 py-32 md:py-52',
        className
      )}
    >
      {!compact && (
        <SectionChrome
          index="02"
          label="Digital Craft"
          meta="Next.js · IA aplicada · conversión"
          tone="cyan"
        />
      )}

      <div className={cx(sectionIntroClassName, 'reveal')}>
        <h2 className={cx(sectionTitleClassName, 'text-cyan-400 night-glow-cyan')}>
          Digital Craft
        </h2>
        <p className={sectionBodyClassName}>
          Less noise.
          <br />
          More order.
          <br />
          Stronger presence.
        </p>
      </div>

      <ErrorBoundary>
        <WorksList />
      </ErrorBoundary>
    </section>
  );
}

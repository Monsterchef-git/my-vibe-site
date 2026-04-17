import ErrorBoundary from '@/components/shared/ErrorBoundary';
import ScrollSectionPrimitive from '@/components/shared/ScrollSectionPrimitive';
import { SectionChrome } from '@/design/ui';
import {
  sectionBodyClassName,
  sectionIntroClassName,
  sectionTitleClassName,
} from '@/design/tokens/components/sectionStyles';
import WorksFeaturedProject from '@/features/development/ui/WorksFeaturedProject';
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
    <ScrollSectionPrimitive id={id} scrollTone="cyan" className={cx('space-y-10', className)}>
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

      {/* Featured project — cinematic card, breaks list pattern (Sprint 1B) */}
      <WorksFeaturedProject />

      {/* List — projects 02–06 continue the numbered pattern */}
      <ErrorBoundary>
        <WorksList />
      </ErrorBoundary>
    </ScrollSectionPrimitive>
  );
}

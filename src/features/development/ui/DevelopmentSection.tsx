import ErrorBoundary from '@/components/shared/ErrorBoundary';
import ScrollSectionPrimitive from '@/components/shared/ScrollSectionPrimitive';
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
    <ScrollSectionPrimitive 
      id={id} 
      scrollTone="cyan" 
      data-cursor-role="dev"
      className={cx('space-y-10', className)}
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
    </ScrollSectionPrimitive>
  );
}

import ErrorBoundary from '@/components/ErrorBoundary';
import WorksList from '@/components/WorksList';
import ScrollSectionPrimitive from '@/components/ScrollSectionPrimitive';
import { cx } from '@/components/primitive';
import { SectionChrome } from '@/components/sections/SectionChrome';
import {
  sectionBodyClassName,
  sectionIntroClassName,
  sectionTitleClassName,
} from '@/components/sections/sectionStyles';

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

      <div className={sectionIntroClassName}>
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

'use client';

import ScrollProgressBlock from '@/components/shared/ScrollProgressBlock';
import { tracking } from '@/design/tokens/primitives/atmosphere';
import { pageGutterClassName } from '@/design/tokens/semantic/layout';
import type { ScrollTone } from '@/lib/hooks/useScrollProgress';
import { cx } from '@/lib/utils/cx';

interface CourseTransitionProps {
  from: string;
  to: string;
  tone?: ScrollTone;
}

export default function CourseTransition({
  from,
  to,
  tone = 'lime',
}: CourseTransitionProps) {
  return (
    <ScrollProgressBlock
      as="div"
      variant="bridge"
      scrollTone={tone}
      aria-hidden="true"
      className={cx(
        'flex h-20 flex-col justify-center gap-4 overflow-hidden md:h-[7.5rem]',
        pageGutterClassName,
      )}
    >
      <div className="flex items-center gap-4">
        <span className={cx('scroll-progress-bridge-label shrink-0 font-mono text-[10px] uppercase', tracking.label)}>
          COURSE {from} → COURSE {to}
        </span>
        <span className="scroll-progress-bridge-line h-px flex-1 origin-left bg-zinc-700" />
      </div>
      <div className="course-marquee overflow-hidden">
        <div className={cx('course-marquee-track flex w-max font-mono text-[10px] uppercase text-zinc-600 md:text-[11px]', tracking.label)}>
          {[0, 1].map((group) => (
            <span key={group} className="pr-16">
              AVAILABLE Q3 · MEDELLÍN · BUILDING… · AVAILABLE Q3 · MEDELLÍN · BUILDING… ·
            </span>
          ))}
        </div>
      </div>
    </ScrollProgressBlock>
  );
}

import type { ComponentPropsWithoutRef } from 'react';
import { sectionClassName } from '@/design/tokens/components/primitiveTokens';
import { cx } from '@/lib/utils/cx';

export interface SectionPrimitiveProps extends ComponentPropsWithoutRef<'section'> {
  align?: 'center' | 'start' | 'end';
}

export function SectionPrimitive({
  align = 'start',
  className,
  ...props
}: SectionPrimitiveProps) {
  return (
    <section
      className={cx(
        sectionClassName,
        // alignment utilities
        align === 'center' && 'flex items-center justify-center',
        align === 'start' && 'flex items-start justify-start',
        align === 'end' && 'flex items-end justify-end',
        className,
      )}
      {...props}
    />
  );
}

import type { ComponentPropsWithoutRef } from 'react';
import {
  sectionChromedClassName,
  sectionClassName,
} from '@/design/tokens/components/primitiveTokens';
import { cx } from '@/lib/utils/cx';

type SectionPrimitiveVariant = 'plain' | 'chromed';

export interface SectionPrimitiveProps extends ComponentPropsWithoutRef<'section'> {
  align?: 'center' | 'start' | 'end';
  variant?: SectionPrimitiveVariant;
}

export function SectionPrimitive({
  variant = 'plain',
  align = 'start',
  className,
  ...props
}: SectionPrimitiveProps) {
  return (
    <section
      className={cx(
        sectionClassName,
        variant === 'chromed' && sectionChromedClassName,
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

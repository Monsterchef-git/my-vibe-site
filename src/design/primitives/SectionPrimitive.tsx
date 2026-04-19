import type { ComponentPropsWithoutRef } from 'react';
import {
  sectionChromedClassName,
  sectionClassName,
} from '@/design/tokens/components/primitiveTokens';
import { cx } from '@/lib/utils/cx';

type SectionPrimitiveVariant = 'plain' | 'chromed';

export interface SectionPrimitiveProps extends ComponentPropsWithoutRef<'section'> {
  variant?: SectionPrimitiveVariant;
}

export function SectionPrimitive({
  variant = 'plain',
  className,
  ...props
}: SectionPrimitiveProps) {
  return (
    <section
      className={cx(
        sectionClassName,
        variant === 'chromed' && sectionChromedClassName,
        className,
      )}
      {...props}
    />
  );
}

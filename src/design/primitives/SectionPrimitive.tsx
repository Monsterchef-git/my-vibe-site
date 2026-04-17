import type { ComponentPropsWithoutRef } from 'react';
import { sectionClassName } from '@/design/tokens/components/primitiveTokens';
import { cx } from '@/lib/utils/cx';

export type SectionPrimitiveProps = ComponentPropsWithoutRef<'section'>;

export function SectionPrimitive({
  className,
  ...props
}: SectionPrimitiveProps) {
  return <section className={cx(sectionClassName, className)} {...props} />;
}

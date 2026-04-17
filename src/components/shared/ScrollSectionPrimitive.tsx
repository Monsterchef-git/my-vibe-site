'use client';

import type { ComponentPropsWithoutRef } from 'react';
import ScrollProgressBlock from '@/components/shared/ScrollProgressBlock';
import { sectionClassName } from '@/design/tokens/components/primitiveTokens';
import { cx } from '@/lib/utils/cx';
import type { ScrollTone } from '@/lib/hooks/useScrollProgress';

interface ScrollSectionPrimitiveProps extends ComponentPropsWithoutRef<'section'> {
  scrollTone?: ScrollTone;
}

export default function ScrollSectionPrimitive({
  className,
  scrollTone = 'neutral',
  ...props
}: ScrollSectionPrimitiveProps) {
  return (
    <ScrollProgressBlock
      as="section"
      variant="surface"
      scrollTone={scrollTone}
      className={cx(sectionClassName, className)}
      {...props}
    />
  );
}

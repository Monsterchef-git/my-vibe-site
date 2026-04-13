'use client';

import type { ComponentPropsWithoutRef } from 'react';
import ScrollProgressBlock from '@/components/ScrollProgressBlock';
import { cx, sectionClassName } from '@/components/primitive';
import type { ScrollTone } from '@/components/useScrollProgress';

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

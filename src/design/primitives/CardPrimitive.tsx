import type { ComponentPropsWithoutRef } from 'react';
import {
  cardClassName,
  primitiveToneClassNames,
  type PrimitiveTone,
} from '@/design/tokens/components/primitiveTokens';
import { cx } from '@/lib/utils/cx';

export interface CardPrimitiveProps extends ComponentPropsWithoutRef<'div'> {
  tone?: PrimitiveTone;
}

export function CardPrimitive({
  className,
  tone = 'neutral',
  ...props
}: CardPrimitiveProps) {
  return (
    <div
      className={cx(cardClassName, primitiveToneClassNames[tone], className)}
      {...props}
    />
  );
}

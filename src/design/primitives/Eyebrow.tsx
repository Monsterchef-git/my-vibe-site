import type { ComponentPropsWithoutRef, ElementType } from 'react';
import {
  eyebrowDim,
  eyebrowMuted,
  eyebrowPrimary,
  eyebrowTones,
} from '@/design/tokens/components/sectionStyles';
import { cx } from '@/lib/utils/cx';

export type EyebrowRole = 'primary' | 'muted' | 'dim';
export type EyebrowTone = keyof typeof eyebrowTones;

const roleClassNames: Record<EyebrowRole, string> = {
  primary: eyebrowPrimary,
  muted: eyebrowMuted,
  dim: eyebrowDim,
};

export interface EyebrowProps extends ComponentPropsWithoutRef<'p'> {
  as?: ElementType;
  role?: EyebrowRole;
  tone?: EyebrowTone;
}

export default function Eyebrow({
  as: Tag = 'p',
  role = 'primary',
  tone,
  className,
  ...props
}: EyebrowProps) {
  const base = tone ? eyebrowTones[tone] : roleClassNames[role];
  return <Tag className={cx(base, className)} {...props} />;
}

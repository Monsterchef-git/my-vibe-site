import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cx } from '@/components/primitive';
import {
  eyebrowPrimary,
  eyebrowMuted,
  eyebrowDim,
  eyebrowTones,
} from '@/components/sections/sectionStyles';

export type EyebrowRole = 'primary' | 'muted' | 'dim';
export type EyebrowTone = keyof typeof eyebrowTones;

const roleClassNames: Record<EyebrowRole, string> = {
  primary: eyebrowPrimary,
  muted:   eyebrowMuted,
  dim:     eyebrowDim,
};

interface EyebrowProps extends ComponentPropsWithoutRef<'p'> {
  as?: ElementType;
  role?: EyebrowRole;
  tone?: EyebrowTone;
}

/**
 * Eyebrow — canonical small-caps label component.
 *
 * Usage:
 *   <Eyebrow>01 ——— Gastronomía</Eyebrow>
 *   <Eyebrow role="muted">Medellín, Colombia</Eyebrow>
 *   <Eyebrow tone="lime">Gastronomy</Eyebrow>
 *   <Eyebrow as="span" role="dim">spec_key</Eyebrow>
 */
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

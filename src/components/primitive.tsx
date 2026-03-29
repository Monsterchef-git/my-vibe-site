import type { ComponentPropsWithoutRef } from 'react';

type PrimitiveTone = 'neutral' | 'lime' | 'cyan' | 'blue';

type ClassValue = false | null | undefined | string;

function cx(...values: ClassValue[]) {
  return values.filter(Boolean).join(' ');
}

const toneClassNames: Record<PrimitiveTone, string> = {
  neutral: 'border-zinc-800/80 bg-zinc-950/70',
  lime: 'border-lime-400/20 bg-lime-400/5',
  cyan: 'border-cyan-400/20 bg-cyan-400/5',
  blue: 'border-blue-400/20 bg-blue-400/5',
};

export const sectionClassName =
  'relative overflow-hidden rounded-[3rem] border border-zinc-800/80 bg-zinc-950/70 p-6 md:p-8 backdrop-blur-xl';

export const cardClassName =
  'rounded-[2rem] border p-5 md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-300';

export type SectionPrimitiveProps = ComponentPropsWithoutRef<'section'>;

export function SectionPrimitive({
  className,
  ...props
}: SectionPrimitiveProps) {
  return <section className={cx(sectionClassName, className)} {...props} />;
}

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
      className={cx(cardClassName, toneClassNames[tone], className)}
      {...props}
    />
  );
}

export const Primitive = {
  Section: SectionPrimitive,
  Card: CardPrimitive,
};

export { cx };

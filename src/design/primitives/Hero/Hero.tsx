import type { ReactNode } from 'react';
import Eyebrow, { type EyebrowTone } from '@/design/primitives/Eyebrow';
import { cx } from '@/lib/utils/cx';

export type HeroTone = 'lime' | 'cyan' | 'blue' | 'white';

export interface HeroProps {
  eyebrow: string;
  statement: ReactNode;
  counterLine: ReactNode;
  tone: HeroTone;
  anchor?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const toneToEyebrowTone: Record<HeroTone, EyebrowTone> = {
  lime: 'lime',
  cyan: 'cyan',
  blue: 'blue',
  white: 'white',
};

const toneToAccentClassName: Record<HeroTone, string> = {
  lime: 'text-lime-300',
  cyan: 'text-cyan-300',
  blue: 'text-blue-300',
  white: 'text-white',
};

export function Hero({
  eyebrow,
  statement,
  counterLine,
  tone,
  anchor,
  children,
  className,
}: HeroProps) {
  return (
    <section
      className={cx(
        'relative flex min-h-svh w-full items-end px-6 pb-10 pt-28 md:px-24 md:pb-14 md:pt-32 lg:pb-16',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="max-w-[58rem] space-y-6">
          <Eyebrow
            as="p"
            tone={toneToEyebrowTone[tone]}
            className="font-mono uppercase"
          >
            {eyebrow}
          </Eyebrow>

          <h1 className="font-headline text-[clamp(3rem,10vw,8rem)] italic leading-[0.92] text-white">
            {statement}
          </h1>

          <p className="font-mono text-sm uppercase tracking-[0.14em] text-zinc-400 md:text-base">
            {counterLine}
          </p>

          {anchor ? (
            <div
              className={cx(
                'font-mono text-xs uppercase tracking-[0.24em] md:text-sm',
                toneToAccentClassName[tone],
              )}
            >
              {anchor}
            </div>
          ) : null}
        </div>

        {children ? (
          <div className="hidden w-full max-w-[40vw] shrink-0 items-end justify-end lg:flex">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}

import type { ReactNode } from 'react';
import Eyebrow, { type EyebrowTone } from '@/design/primitives/Eyebrow';
import { tracking } from '@/design/tokens/primitives/atmosphere';
import { cx } from '@/lib/utils/cx';

export type HeroTone = 'lime' | 'cyan' | 'blue' | 'white';

export interface HeroProps {
  eyebrow: string;
  statement: ReactNode;
  counterLine: ReactNode;
  tone: HeroTone;
  anchor?: ReactNode;
  children?: ReactNode;
  sidePosition?: 'right' | 'background';
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
  sidePosition = 'right',
  className,
}: HeroProps) {
  const hasSide = Boolean(children);
  const showBackdropSide = hasSide && sidePosition === 'background';
  const showRightSide = hasSide && sidePosition === 'right';

  return (
    <section
      className={cx(
        'relative flex min-h-svh w-full items-end pb-10 pt-28 md:pb-14 md:pt-32 lg:pb-16',
        className,
      )}
    >
      {hasSide ? (
        <div
          aria-hidden="true"
          className={cx(
            'pointer-events-none absolute inset-0 z-0',
            // sidePosition="background" stays background on all tiers
            // sidePosition="right" is backdrop on md, flex-auto on lg+
            sidePosition === 'background'
              ? 'lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[min(55vw,40rem)] 2xl:w-[min(48rem,42vw)]'
              : 'hidden md:block lg:hidden'
          )}
        >
          {children}
        </div>
      ) : null}

      <div className="relative z-10 mx-auto flex w-full max-w-[78rem] flex-col gap-8 px-6 md:px-10 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="max-w-[68rem] space-y-6">
          <Eyebrow
            as="p"
            tone={toneToEyebrowTone[tone]}
            className="font-mono uppercase"
          >
            {eyebrow}
          </Eyebrow>

          <h1 className="font-headline text-[clamp(2.75rem,12vw,6.5rem)] italic leading-[0.92] text-white">
            {statement}
          </h1>

          <p className={cx('font-mono text-sm uppercase text-zinc-400 md:text-base', tracking.label)}>
            {counterLine}
          </p>

          {anchor ? (
            <div
              className={cx(
                'font-mono text-xs uppercase md:text-sm',
                tracking.label,
                toneToAccentClassName[tone],
              )}
            >
              {anchor}
            </div>
          ) : null}
        </div>

        {showRightSide ? (
          <div className="hidden w-full shrink-0 items-end justify-end lg:flex lg:w-[min(48vw,36rem)] 2xl:w-[min(42rem,40vw)]">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}

import type { ReactNode } from 'react';
import Eyebrow from '@/design/primitives/Eyebrow';
import { tracking } from '@/design/tokens/primitives/atmosphere';
import { pageGutterClassName } from '@/design/tokens/semantic/layout';
import { cx } from '@/lib/utils/cx';

export type HeroTone = 'lime' | 'cyan' | 'blue' | 'white';

export interface HeroProps {
  id?: string;
  eyebrow: string;
  statement: ReactNode;
  counterLine: ReactNode;
  tone: HeroTone;
  anchor?: ReactNode;
  children?: ReactNode;
  sidePosition?: 'right' | 'background';
  className?: string;
}

const toneToAccentClassName: Record<HeroTone, string> = {
  lime: 'text-lime-300',
  cyan: 'text-cyan-300',
  blue: 'text-blue-300',
  white: 'text-white',
};

export function Hero({
  id,
  eyebrow,
  statement,
  counterLine,
  tone,
  anchor,
  children,
  sidePosition = 'right',
  align = 'start',
  className,
}: HeroProps & { align?: 'start' | 'center' | 'end' }) {
  const hasSide = Boolean(children);
  const showRightSide = hasSide && sidePosition === 'right';

  return (
    <section
      id={id}
      className={cx(
        'relative flex min-h-svh w-full pb-10 pt-14 md:pb-14 md:pt-32 lg:pb-16',
        align === 'center' && 'items-center',
        align === 'end' && 'items-end',
        align === 'start' && 'items-start',
        className,
      )}
    >
      {hasSide ? (
        <div
          aria-hidden="true"
          className={cx(
            'pointer-events-none absolute inset-0',
            // sidePosition="background" stays background on all tiers
            // sidePosition="right" is backdrop on md, flex-auto on lg+
            sidePosition === 'background'
              ? 'z-[15] lg:top-0 lg:-bottom-[12vh] lg:left-auto lg:right-0 lg:w-[min(55vw,40rem)] 2xl:w-[min(48rem,42vw)]'
              : 'z-0 hidden md:block lg:hidden'
          )}
        >
          {children}
        </div>
      ) : null}

      <div
        className={cx(
          'relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-[78rem] flex-col gap-8 lg:min-h-0 lg:flex-row lg:items-end lg:justify-between lg:gap-10',
          pageGutterClassName,
        )}
      >
        <div className="max-w-[68rem] space-y-6">
          <Eyebrow
            as="p"
            role="muted"
            className="font-mono uppercase"
          >
            {eyebrow}
          </Eyebrow>

          <h1 className="font-headline text-[clamp(3rem,13vw,6.5rem)] italic leading-[0.92] text-white">
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

          {showRightSide ? (
            <div className="pt-2 md:hidden">
              {children}
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

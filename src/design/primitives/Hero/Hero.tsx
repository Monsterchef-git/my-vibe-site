import type { ReactNode } from 'react';
import Link from 'next/link';
import Eyebrow from '@/design/primitives/Eyebrow';
import { tracking } from '@/design/tokens/primitives/atmosphere';
import { pageGutterClassName } from '@/design/tokens/semantic/layout';
import { cx } from '@/lib/utils/cx';

export type HeroTone = 'lime' | 'cyan' | 'blue' | 'white';

export interface HeroProps {
  eyebrow: string;
  statement: ReactNode;
  counterLine: ReactNode;
  tone: HeroTone;
  anchor?: ReactNode;
  index?: string;
  next?: { label: string; href: string };
  meta?: { city?: string; tag?: string };
  statusLineFadeRight?: boolean;
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
  eyebrow,
  statement,
  counterLine,
  tone,
  anchor,
  index,
  next,
  meta,
  statusLineFadeRight = false,
  children,
  sidePosition = 'right',
  align = 'start',
  className,
}: HeroProps & { align?: 'start' | 'center' | 'end' }) {
  const hasSide = Boolean(children);
  const showRightSide = hasSide && sidePosition === 'right';
  const chapter = index ?? '01';
  const metaCity = meta?.city ?? 'MEDELLIN, CO';
  const metaTag = meta?.tag ?? `CHAPTER ${chapter}`;
  const nextArrow = chapter === '04' ? '↑' : '↓';

  return (
    <section
      className={cx(
        'relative flex min-h-svh w-full pb-10 pt-28 md:pb-14 md:pt-32 lg:pb-16',
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

      <div className={cx(
        'relative z-10 mx-auto flex w-full max-w-[78rem] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10',
        pageGutterClassName,
      )}>
        <div className="max-w-[68rem] space-y-6">
          <Eyebrow
            as="p"
            role="muted"
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

      {(index || next) ? (
        <div
          className={cx(
            'absolute bottom-0 left-0 right-0 z-30 bg-black/60 backdrop-blur-md',
            pageGutterClassName,
          )}
        >
          <div
            aria-hidden="true"
            className={cx(
              'pointer-events-none absolute inset-x-0 top-0 h-px',
              statusLineFadeRight
                ? 'bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.05)_56%,rgba(255,255,255,0)_82%)]'
                : 'bg-white/5',
            )}
          />
          <div className="flex items-center justify-between gap-8 py-2 md:py-3">
            <p className={cx('font-mono text-[10px] uppercase text-zinc-400', tracking.label)}>
              {metaCity} · {metaTag}
            </p>

            <div className={cx('font-mono text-[10px] uppercase text-zinc-400', tracking.label)}>
              {index ? `${index} / 04 — ` : ''}
              {next ? (
                <Link
                  href={next.href}
                  className="inline-flex items-center gap-2 text-zinc-400 transition-colors duration-300 hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <span>NEXT: {next.label}</span>
                  <span aria-hidden="true" className="hero-status-arrow opacity-60">
                    {nextArrow}
                  </span>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

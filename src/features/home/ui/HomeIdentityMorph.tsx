'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { sectionBodyClassName } from '@/design/tokens/components/sectionStyles';
import {
  BLUR_BLUE_MOON,
  BLUR_CULINARY_PLATING,
  IMAGE_BLUE_MOON,
  IMAGE_CULINARY_PLATING,
} from '@/lib/imageAssets';
import { cx } from '@/lib/utils/cx';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const MORPH_START = 0.24;
const MORPH_END = 0.74;
const SWITCH_THRESHOLD = 0.52;
const BRIDGE_LABELS = ['KITCHEN CRAFT', 'DIGITAL CRAFT'] as const;

const STATES = [
  {
    id: 'gastronomy',
    word: 'CHEF',
    image: IMAGE_CULINARY_PLATING,
    blurDataURL: BLUR_CULINARY_PLATING,
    imageAlt: 'Editorial culinary plating.',
    dividerClassName: 'bg-lime-300/24',
    linkClassName: 'hover:border-lime-300/45 hover:text-lime-300 focus-visible:border-lime-300/55 focus-visible:text-lime-200 active:text-lime-200',
    wordClassName: 'text-white',
    ambientClassName:
      'bg-[radial-gradient(ellipse_80%_60%_at_88%_8%,rgba(202,253,0,0.12),transparent_50%)]',
    copy: (
      <>
        Kitchen craft.
        <br />
        Service, structure, taste.
      </>
    ),
    href: '/works#works-gastronomy',
    cta: 'See kitchen work →',
  },
  {
    id: 'development',
    word: 'DEV',
    image: IMAGE_BLUE_MOON,
    blurDataURL: BLUR_BLUE_MOON,
    imageAlt: 'Immersive digital interface with editorial treatment.',
    dividerClassName: 'bg-cyan-300/24',
    linkClassName: 'hover:border-cyan-300/45 hover:text-cyan-300 focus-visible:border-cyan-300/55 focus-visible:text-cyan-200 active:text-cyan-200',
    wordClassName: 'text-cyan-300 night-glow-cyan',
    ambientClassName:
      'bg-[radial-gradient(ellipse_80%_60%_at_88%_8%,rgba(34,211,238,0.14),transparent_52%)]',
    copy: (
      <>
        Digital craft.
        <br />
        Product, detail, launch.
      </>
    ),
    href: '/works#works-development',
    cta: 'See digital work →',
  },
] as const;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function mapRange(value: number, start: number, end: number) {
  return clamp((value - start) / (end - start));
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function shouldScramble(character: string) {
  return /[A-Z0-9]/.test(character);
}

function getScrambleChar(index: number, bucket: number) {
  const charIndex = (index * 11 + bucket * 7 + 3) % SCRAMBLE_CHARS.length;
  return SCRAMBLE_CHARS[charIndex];
}

function morphWord(from: string, to: string, progress: number) {
  const maxLength = Math.max(from.length, to.length);
  const bucket = Math.floor(progress * 18);
  const scrambleStart = 0.18;
  const settleStart = 0.58;

  return Array.from({ length: maxLength }, (_, index) => {
    const fromChar = from[index] ?? '\u00A0';
    const toChar = to[index] ?? '\u00A0';

    if (progress <= scrambleStart) {
      return fromChar;
    }

    if (progress >= 0.9) {
      return toChar;
    }

    const leavePoint = 1 - (index + 1) / (maxLength + 1);
    const settlePoint = index / Math.max(1, to.length);

    if (progress < 0.5 && progress < leavePoint) {
      return fromChar;
    }

    if (progress > settleStart && progress > settlePoint) {
      return toChar;
    }

    return shouldScramble(fromChar) || shouldScramble(toChar)
      ? getScrambleChar(index, bucket)
      : '\u00A0';
  }).join('');
}

function getSectionProgress(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  const viewportHeight = window.innerHeight || 1;

  return clamp((viewportHeight - rect.top) / (viewportHeight + rect.height));
}

export default function HomeIdentityMorph() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sectionProgress, setSectionProgress] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncReducedMotion = () => setReducedMotion(mediaQuery.matches);

    syncReducedMotion();
    mediaQuery.addEventListener('change', syncReducedMotion);

    return () => mediaQuery.removeEventListener('change', syncReducedMotion);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) {
      return undefined;
    }

    let frame = 0;

    const schedule = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;

        if (rootRef.current) {
          setSectionProgress(getSectionProgress(rootRef.current));
        }
      });
    };

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(node);

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);

    schedule();

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      resizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('load', schedule);
    };
  }, []);

  const morphProgress = useMemo(() => {
    if (reducedMotion) {
      return sectionProgress >= SWITCH_THRESHOLD ? 1 : 0;
    }

    return easeInOutCubic(mapRange(sectionProgress, MORPH_START, MORPH_END));
  }, [reducedMotion, sectionProgress]);

  const activeState = STATES[morphProgress >= SWITCH_THRESHOLD ? 1 : 0];
  const displayWord = reducedMotion
    ? activeState.word
    : morphWord(STATES[0].word, STATES[1].word, morphProgress);
  const maxWordLength = useMemo(
    () => Math.max(...STATES.map((state) => state.word.length)),
    [],
  );

  const gastronomyOpacity = clamp(1 - morphProgress * 1.05, 0, 0.82);
  const developmentOpacity = clamp(0.12 + morphProgress * 0.7, 0, 0.82);
  const gastronomyTransform = `translate3d(${-2.4 * morphProgress}%, 0, 0) scale(${1 + morphProgress * 0.035})`;
  const developmentTransform = `translate3d(${2.8 * (1 - morphProgress)}%, 0, 0) scale(${1.08 - morphProgress * 0.08})`;
  const bridgeStep = morphProgress >= SWITCH_THRESHOLD ? 1 : 0;

  return (
    <div
      ref={rootRef}
      className="relative h-full"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 bottom-[30%] z-[1]"
          data-cursor="scroll"
          data-cursor-label="Scroll"
          data-cursor-tone={activeState.id === 'development' ? 'cyan' : 'lime'}
        />

        <div
          aria-hidden="true"
          className="identity-morph-frame"
        >
          <Image
            src={STATES[0].image}
            alt={STATES[0].imageAlt}
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={STATES[0].blurDataURL}
            priority
            className="identity-morph-main"
            style={{
              opacity: gastronomyOpacity,
              transform: gastronomyTransform,
              filter: `brightness(${0.9 - morphProgress * 0.16}) saturate(${0.9 - morphProgress * 0.05}) contrast(1)`,
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.04)_22%,rgba(0,0,0,0.38)_55%,rgba(0,0,0,0.92)_100%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.34)_28%,rgba(0,0,0,0.84)_100%)]"
          />

          <div
            aria-hidden="true"
            className={cx('pointer-events-none absolute inset-0', STATES[0].ambientClassName)}
            style={{ opacity: clamp(1 - morphProgress * 0.75, 0, 1) }}
          />
        </div>

        <div
          aria-hidden="true"
          className="identity-morph-frame"
        >
          <Image
            src={STATES[1].image}
            alt={STATES[1].imageAlt}
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={STATES[1].blurDataURL}
            loading="lazy"
            className="identity-morph-main"
            style={{
              opacity: developmentOpacity,
              transform: developmentTransform,
              filter: `brightness(${0.72 + morphProgress * 0.18}) saturate(${0.98 - morphProgress * 0.08}) contrast(1.02)`,
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.04)_22%,rgba(0,0,0,0.38)_55%,rgba(0,0,0,0.92)_100%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.34)_28%,rgba(0,0,0,0.84)_100%)]"
          />

          <div
            aria-hidden="true"
            className={cx('pointer-events-none absolute inset-0', STATES[1].ambientClassName)}
            style={{ opacity: clamp(morphProgress * 1.1, 0, 1) }}
          />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04] mix-blend-soft-light"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.82\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundSize: '160px 160px',
          }}
        />

        <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col justify-end px-6 py-10 md:px-24 md:py-14">
          <div className="relative max-w-5xl space-y-5 md:space-y-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[-1.5rem] bottom-[-2rem] top-[42%] -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.58)_42%,rgba(0,0,0,0.12)_74%,rgba(0,0,0,0)_100%)] blur-2xl md:inset-x-[-2rem]"
            />

            <h2
              aria-label={activeState.word}
              className={cx(
                'inline-block font-headline italic leading-[0.8] tracking-[-0.03em] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] [text-shadow:0_10px_50px_rgba(0,0,0,0.78)]',
                activeState.wordClassName,
              )}
              style={{
                fontSize: 'clamp(6.5rem, 38vw, 32rem)',
                minWidth: `${maxWordLength}ch`,
                whiteSpace: 'pre',
              }}
            >
              {displayWord}
            </h2>

            <div className="space-y-4 border-t border-white/10 pt-5 md:space-y-0 md:grid md:grid-cols-[minmax(0,30rem)_1px_auto] md:items-end md:gap-6 md:pt-6">
              <p
                className={cx(
                  sectionBodyClassName,
                  'max-w-[30rem] text-zinc-100 [text-shadow:0_6px_34px_rgba(0,0,0,0.95)]',
                )}
              >
                {activeState.copy}
              </p>

              <div
                aria-hidden="true"
                className={cx('hidden md:block md:h-12 md:w-px transition-colors duration-300', activeState.dividerClassName)}
              />

              <Link
                href={activeState.href}
                className={cx(
                  'pointer-events-auto inline-flex min-h-11 items-center rounded-full border border-white/15 bg-black/35 px-4 font-mono text-[11px] uppercase tracking-[0.24em] text-white/90 transition-[border-color,color,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-black [text-shadow:0_6px_34px_rgba(0,0,0,0.95)]',
                  activeState.linkClassName,
                )}
              >
                {activeState.cta}
              </Link>
            </div>

            <div
              aria-hidden="true"
              className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.24em]"
            >
              {BRIDGE_LABELS.map((label, index) => (
                <span
                  key={label}
                  className={cx(
                    'transition-colors duration-300',
                    index === bridgeStep && index === 0 && 'text-lime-300',
                    index === bridgeStep && index === 1 && 'text-cyan-300',
                    index !== bridgeStep && index < bridgeStep && 'text-zinc-300/80',
                    index > bridgeStep && 'text-zinc-500',
                  )}
                >
                  {label}
                  {index < BRIDGE_LABELS.length - 1 && <span className="mx-2 text-zinc-600">→</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

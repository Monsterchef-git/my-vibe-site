'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  BLUR_CULINARY_PLATING,
  IMAGE_CULINARY_PLATING,
} from '@/lib/imageAssets';
import { cx } from '@/lib/utils/cx';

type GalleryFrame = {
  id: string;
  src: string;
  alt: string;
  sizes: string;
  panelClassName: string;
  stackClassName: string;
  imageClassName?: string;
  blurDataURL?: string;
  priority?: boolean;
};

const GALLERY_FRAMES: GalleryFrame[] = [
  {
    id: 'plating',
    src: IMAGE_CULINARY_PLATING,
    alt: 'Plated meat dishes prepared for a high-paced dinner service.',
    sizes: '(min-width: 1280px) 34vw, (min-width: 768px) 44vw, 100vw',
    panelClassName: 'h-[72vh] w-[34vw] min-w-[27rem]',
    stackClassName: 'min-h-[30rem]',
    imageClassName: 'object-center scale-[0.9] md:scale-[0.86]',
    blurDataURL: BLUR_CULINARY_PLATING,
    priority: true,
  },
  {
    id: 'seaside-toast',
    src: '/images/culinary-01-optimized.jpg',
    alt: 'Toast with poached egg, hollandaise, pickled onion, and capers served by the sea.',
    sizes: '(min-width: 1280px) 30vw, (min-width: 768px) 40vw, 100vw',
    panelClassName: '-ml-8 mt-[8vh] h-[64vh] w-[30vw] min-w-[22rem]',
    stackClassName: 'min-h-[26rem]',
    imageClassName: 'object-center',
  },
  {
    id: 'causa',
    src: '/images/culinary-04-optimized.jpg',
    alt: 'Lima-style causa with crispy shrimp, avocado, and pickled onion served on a black plate.',
    sizes: '(min-width: 1280px) 22vw, (min-width: 768px) 34vw, 100vw',
    panelClassName: '-ml-14 mt-[24vh] h-[44vh] w-[22vw] min-w-[16rem] z-[2]',
    stackClassName: 'min-h-[22rem]',
    imageClassName: 'object-center',
  },
  {
    id: 'paella',
    src: '/images/culinary-05-optimized.jpg',
    alt: 'Seafood paella in a large pan with shrimp and mussels during dinner service.',
    sizes: '(min-width: 1280px) 52vw, (min-width: 768px) 70vw, 100vw',
    panelClassName: '-ml-10 mt-[12vh] h-[56vh] w-[52vw] min-w-[38rem]',
    stackClassName: 'min-h-[24rem]',
    imageClassName: 'object-center',
  },
  {
    id: 'kitchen',
    src: '/images/culinary-chef.jpeg',
    alt: 'Chef plating during a live kitchen service.',
    sizes: '(min-width: 1280px) 26vw, (min-width: 768px) 38vw, 100vw',
    panelClassName: '-ml-4 mt-[2vh] h-[68vh] w-[26vw] min-w-[20rem]',
    stackClassName: 'min-h-[28rem]',
    imageClassName: 'object-center',
  },
  {
    id: 'chef-portrait',
    src: '/images/culinary-02-optimized.jpg',
    alt: 'Chef smiling in the kitchen while presenting a dish, with mise en place and vegetables in the foreground.',
    sizes: '(min-width: 1280px) 28vw, (min-width: 768px) 40vw, 100vw',
    panelClassName: '-ml-10 mt-[14vh] h-[74vh] w-[28vw] min-w-[21rem] z-[2]',
    stackClassName: 'min-h-[30rem]',
    imageClassName: 'object-center',
  },
  {
    id: 'fresh-bowl',
    src: '/images/culinary-fresh.jpeg',
    alt: 'Seared tuna bowl with fresh vegetables and microgreens.',
    sizes: '(min-width: 1280px) 20vw, (min-width: 768px) 30vw, 100vw',
    panelClassName: '-ml-12 mt-[24vh] h-[46vh] w-[20vw] min-w-[15rem] z-[3]',
    stackClassName: 'min-h-[20rem]',
    imageClassName: 'object-center',
  },
  {
    id: 'breakfast',
    src: '/images/culinary-03-optimized.jpg',
    alt: 'Breakfast spread with eggs, avocado, arepa, sausages, fresh fruit, and smoothie.',
    sizes: '(min-width: 1280px) 24vw, (min-width: 768px) 36vw, 100vw',
    panelClassName: '-ml-8 mt-[8vh] h-[58vh] w-[24vw] min-w-[18rem]',
    stackClassName: 'min-h-[24rem]',
    imageClassName: 'object-center',
  },
  {
    id: 'creamy-plate',
    src: '/images/culinary-hero.jpeg',
    alt: 'Served dish with creamy soup and crostini in an editorial setup.',
    sizes: '(min-width: 1280px) 28vw, (min-width: 768px) 40vw, 100vw',
    panelClassName: '-ml-10 mt-[18vh] h-[54vh] w-[28vw] min-w-[21rem]',
    stackClassName: 'min-h-[24rem]',
    imageClassName: 'object-center',
  },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener('change', syncPreference);

    return () => {
      mediaQuery.removeEventListener('change', syncPreference);
    };
  }, []);

  return reducedMotion;
}

function GalleryStill({
  frame,
  className,
}: {
  frame: GalleryFrame;
  className: string;
}) {
  return (
    <figure
      className={cx(
        'group relative shrink-0 isolate overflow-hidden rounded-[2.5rem] border border-white/8 bg-black/40 shadow-[0_32px_120px_rgba(0,0,0,0.45)]',
        className,
      )}
    >
      <Image
        src={frame.src}
        alt={frame.alt}
        fill
        priority={frame.priority}
        sizes={frame.sizes}
        placeholder={frame.blurDataURL ? 'blur' : 'empty'}
        blurDataURL={frame.blurDataURL}
        loading={frame.priority ? undefined : 'lazy'}
        className={cx(
          'object-cover transition-[transform,filter,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:opacity-64 md:grayscale group-hover:scale-[1.035] group-hover:opacity-100 group-hover:grayscale-0',
          frame.imageClassName,
        )}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] grainy-bg opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0.03)_28%,rgba(0,0,0,0.12)_56%,rgba(0,0,0,0.82)_100%)]"
      />
    </figure>
  );
}

export default function GastronomyHorizontalGallery() {
  const scrollDriverRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    console.log('[GAL-EFFECT]', { trackRef: !!trackRef.current, reducedMotion });
    const track = trackRef.current;

    if (!track || reducedMotion) {
      if (track) {
        track.style.transform = 'translate3d(0, 0, 0)';
      }

      return;
    }

    let frame = 0;

    const syncTrackPosition = () => {
      const section = scrollDriverRef.current;
      const trackEl = trackRef.current;
      if (!section || !trackEl) return;

      const overflow = Math.max(trackEl.scrollWidth - window.innerWidth, 0);
      const scrollableHeight = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-section.getBoundingClientRect().top / scrollableHeight, 0, 1);

      trackEl.style.transform = `translate3d(${-overflow * progress}px, 0, 0)`;
    };

    const schedule = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        syncTrackPosition();
      });
    };

    const resizeObserver = new ResizeObserver(schedule);
    const viewport = window.visualViewport;

    if (scrollDriverRef.current) {
      resizeObserver.observe(scrollDriverRef.current);
    }

    resizeObserver.observe(track);

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);
    viewport?.addEventListener('resize', schedule);
    viewport?.addEventListener('scroll', schedule);

    schedule();

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      resizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('load', schedule);
      viewport?.removeEventListener('resize', schedule);
      viewport?.removeEventListener('scroll', schedule);
    };
  }, [reducedMotion]);

  return (
    <>
      <div className={cx('space-y-4', reducedMotion ? '' : 'md:hidden')}>
        {GALLERY_FRAMES.map((frame) => (
          <GalleryStill
            key={frame.id}
            frame={frame}
            className={frame.stackClassName}
          />
        ))}
      </div>

      {!reducedMotion ? (
        <div
          ref={scrollDriverRef}
          data-cursor="drag"
          data-cursor-label="Scroll"
          data-cursor-tone="lime"
          className="hidden h-[360svh] md:block lg:h-[420svh] xl:h-[440svh]"
        >
          <div className="sticky top-0 flex h-svh items-center overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-[4] w-20 bg-gradient-to-r from-black via-black/82 to-transparent xl:w-28"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-[4] w-24 bg-gradient-to-l from-black via-black/82 to-transparent xl:w-32"
            />

            <div
              ref={trackRef}
              className="flex min-w-max items-start gap-0 pl-[10vw] pr-[18vw] will-change-transform"
            >
              {GALLERY_FRAMES.map((frame) => (
                <GalleryStill
                  key={frame.id}
                  frame={frame}
                  className={frame.panelClassName}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

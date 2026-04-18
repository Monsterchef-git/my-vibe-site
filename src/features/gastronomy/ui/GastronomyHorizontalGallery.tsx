'use client';

import Image from 'next/image';
import { useEffect, useEffectEvent, useRef, useState } from 'react';
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
    alt: 'Platos de carne emplatados para un servicio premium.',
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
    alt: 'Tostada con huevo pochado, salsa holandesa, cebolla encurtida y alcaparras servida frente al mar.',
    sizes: '(min-width: 1280px) 30vw, (min-width: 768px) 40vw, 100vw',
    panelClassName: '-ml-8 mt-[8vh] h-[64vh] w-[30vw] min-w-[22rem]',
    stackClassName: 'min-h-[26rem]',
    imageClassName: 'object-center',
  },
  {
    id: 'causa',
    src: '/images/culinary-04-optimized.jpg',
    alt: 'Causa limena con langostinos crocantes, aguacate y cebolla encurtida servida en plato negro.',
    sizes: '(min-width: 1280px) 22vw, (min-width: 768px) 34vw, 100vw',
    panelClassName: '-ml-14 mt-[24vh] h-[44vh] w-[22vw] min-w-[16rem] z-[2]',
    stackClassName: 'min-h-[22rem]',
    imageClassName: 'object-center',
  },
  {
    id: 'paella',
    src: '/images/culinary-05-optimized.jpg',
    alt: 'Paella de mariscos en paellera grande con camarones y mejillones durante el servicio.',
    sizes: '(min-width: 1280px) 52vw, (min-width: 768px) 70vw, 100vw',
    panelClassName: '-ml-10 mt-[12vh] h-[56vh] w-[52vw] min-w-[38rem]',
    stackClassName: 'min-h-[24rem]',
    imageClassName: 'object-center',
  },
  {
    id: 'kitchen',
    src: '/images/culinary-chef.jpeg',
    alt: 'Chef emplatando durante un servicio gastronomico en cocina.',
    sizes: '(min-width: 1280px) 26vw, (min-width: 768px) 38vw, 100vw',
    panelClassName: '-ml-4 mt-[2vh] h-[68vh] w-[26vw] min-w-[20rem]',
    stackClassName: 'min-h-[28rem]',
    imageClassName: 'object-center',
  },
  {
    id: 'chef-portrait',
    src: '/images/culinary-02-optimized.jpg',
    alt: 'Chef sonriendo en cocina mientras presenta un plato, con mise en place y sarten de vegetales al frente.',
    sizes: '(min-width: 1280px) 28vw, (min-width: 768px) 40vw, 100vw',
    panelClassName: '-ml-10 mt-[14vh] h-[74vh] w-[28vw] min-w-[21rem] z-[2]',
    stackClassName: 'min-h-[30rem]',
    imageClassName: 'object-center',
  },
  {
    id: 'fresh-bowl',
    src: '/images/culinary-fresh.jpeg',
    alt: 'Bowl de atun sellado con vegetales frescos y microgreens.',
    sizes: '(min-width: 1280px) 20vw, (min-width: 768px) 30vw, 100vw',
    panelClassName: '-ml-12 mt-[24vh] h-[46vh] w-[20vw] min-w-[15rem] z-[3]',
    stackClassName: 'min-h-[20rem]',
    imageClassName: 'object-center',
  },
  {
    id: 'breakfast',
    src: '/images/culinary-03-optimized.jpg',
    alt: 'Desayuno con huevos, aguacate, arepa, salchichas, fruta fresca y batido servido en mesa.',
    sizes: '(min-width: 1280px) 24vw, (min-width: 768px) 36vw, 100vw',
    panelClassName: '-ml-8 mt-[8vh] h-[58vh] w-[24vw] min-w-[18rem]',
    stackClassName: 'min-h-[24rem]',
    imageClassName: 'object-center',
  },
  {
    id: 'creamy-plate',
    src: '/images/culinary-hero.jpeg',
    alt: 'Plato servido con sopa cremosa y crostini en montaje editorial.',
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionPreference();

  const syncTrackPosition = useEffectEvent(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) {
      return;
    }

    const overflow = Math.max(track.scrollWidth - window.innerWidth, 0);
    const scrollableHeight = Math.max(section.offsetHeight - window.innerHeight, 1);
    const progress = clamp(-section.getBoundingClientRect().top / scrollableHeight, 0, 1);

    track.style.transform = `translate3d(${-overflow * progress}px, 0, 0)`;
  });

  useEffect(() => {
    const track = trackRef.current;

    if (!track || reducedMotion) {
      if (track) {
        track.style.transform = 'translate3d(0, 0, 0)';
      }

      return;
    }

    let frame = 0;

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

    if (sectionRef.current) {
      resizeObserver.observe(sectionRef.current);
    }

    resizeObserver.observe(track);

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
          ref={sectionRef}
          data-cursor="drag"
          data-cursor-label="Scroll"
          data-cursor-tone="lime"
          className="hidden h-[360svh] md:block lg:h-[420svh] xl:h-[440svh]"
        >
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
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

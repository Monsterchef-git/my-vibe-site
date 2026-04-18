import Image from 'next/image';
import { Eyebrow } from '@/design/primitives';
import { sectionBodyClassName } from '@/design/tokens/components/sectionStyles';
import AboutNameStamp from '@/features/about/ui/AboutNameStamp';
import {
  BLUR_ABOUT_PORTRAIT,
  IMAGE_ABOUT_PORTRAIT,
} from '@/lib/imageAssets';

/**
 * Sprint 1C — Portrait as the hero, not a widget inside it.
 *
 * Mobile:  portrait full-width, name + bio overlaid at bottom
 * Desktop: portrait bleeds to the right edge of the page,
 *          name + bio occupy the left half over black
 */
export default function AboutHero() {
  return (
    <header className="relative -mx-6 -mt-28 min-h-[100svh] overflow-hidden md:-mx-24 md:-mt-32">

      {/* Give the portrait a larger right-side canvas instead of scaling it down inside the hero. */}
      <div className="absolute inset-0 bg-white md:-top-[2%] md:-right-[10%] md:-bottom-[10%] md:left-[30%]">
        <Image
          src={IMAGE_ABOUT_PORTRAIT}
          alt="Portrait of John Herrera"
          fill
          sizes="(min-width: 768px) 70vw, 100vw"
          placeholder="blur"
          blurDataURL={BLUR_ABOUT_PORTRAIT}
          priority
          className="object-cover object-[center_18%] md:object-[center_30%]"
        />
      </div>

      {/* Left-side mask — fades portrait into black on desktop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.78)_18%,rgba(0,0,0,0.28)_52%,transparent_100%)] md:bg-[linear-gradient(90deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0.98)_28%,rgba(0,0,0,0.82)_42%,rgba(0,0,0,0.34)_58%,transparent_78%)]"
      />

      {/* Bottom scrim — name legibility on mobile */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,transparent_35%,rgba(0,0,0,0.55)_68%,rgba(0,0,0,0.92)_100%)] md:bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,transparent_40%,rgba(0,0,0,0.28)_80%,rgba(0,0,0,0.58)_100%)]"
      />

      {/* ── Content — left half ── */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-10 md:w-[54%] md:px-24 md:pb-20">
        <div className="space-y-8">
          <Eyebrow role="muted">About --- John Herrera</Eyebrow>

          <AboutNameStamp />

          <p
            className={`${sectionBodyClassName} max-w-[22rem] rounded-r-[1.75rem] border-l border-white/12 bg-black/28 py-1.5 pl-6 pr-5 backdrop-blur-[2px]`}
          >
            A way of working shaped by kitchens,
            <br className="hidden md:block" />
            {' '}now carried into digital.
          </p>
        </div>
      </div>
    </header>
  );
}

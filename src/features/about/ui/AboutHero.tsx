import Image from 'next/image';
import { Eyebrow } from '@/design/primitives';
import AboutNameStamp from '@/features/about/ui/AboutNameStamp';

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

      {/* ── Portrait — full-bleed right panel (desktop) / full-bleed bg (mobile) ── */}
      <div className="absolute inset-0 md:left-[48%]">
        <Image
          src="/images/about-john-herrera.png"
          alt="Portrait of John Herrera"
          fill
          sizes="(min-width: 768px) 52vw, 100vw"
          loading="eager"
          priority
          className="object-cover object-top"
        />

        {/* Left-side mask — fades portrait into black on desktop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0.85)_18%,rgba(0,0,0,0.32)_52%,transparent_100%)] md:bg-[linear-gradient(90deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0.72)_22%,rgba(0,0,0,0.08)_60%,transparent_100%)]"
        />

        {/* Bottom scrim — name legibility on mobile */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,transparent_35%,rgba(0,0,0,0.55)_68%,rgba(0,0,0,0.92)_100%)] md:bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,transparent_40%,rgba(0,0,0,0.28)_80%,rgba(0,0,0,0.58)_100%)]"
        />
      </div>

      {/* ── Content — left half ── */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-10 md:w-[54%] md:px-24 md:pb-20">
        <div className="space-y-8">
          <Eyebrow role="muted">About --- John Herrera</Eyebrow>

          <AboutNameStamp />

          <p className="max-w-sm border-l border-white/10 pl-6 font-mono text-sm leading-relaxed text-zinc-400">
            A way of working shaped by kitchens,
            <br className="hidden md:block" />
            {' '}now carried into digital.
          </p>
        </div>
      </div>
    </header>
  );
}

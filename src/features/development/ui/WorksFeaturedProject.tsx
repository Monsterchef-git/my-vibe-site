import Image from 'next/image';
import Link from 'next/link';
import { BLUR_BLUE_MOON, IMAGE_BLUE_MOON } from '@/lib/imageAssets';

/**
 * Sprint 1B — Cinematic featured card for the first digital project.
 * Breaks the uniform list pattern with a near-fullscreen editorial moment.
 * Server Component — hover effects are CSS-only via group utilities.
 */
export default function WorksFeaturedProject() {
  return (
    <Link
      href="https://www.bluemoonhopetown.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Blue Moon Cottage — Hospitality · Landing (opens in new tab)"
      data-cursor="lens"
      data-cursor-label="Open"
      data-cursor-tone="cyan"
      data-cursor-stick="true"
      className="group relative block overflow-hidden rounded-[2rem] border border-cyan-400/15 transition-[border-color] duration-500 hover:border-cyan-400/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
    >
      {/* Image — slow scale on hover */}
      <div className="relative h-[52svh]">
        <Image
          src={IMAGE_BLUE_MOON}
          alt="Blue Moon Cottage — coastal hospitality interior, Bahamas"
          fill
          sizes="(min-width: 768px) calc(100vw - 12rem), calc(100vw - 3rem)"
          placeholder="blur"
          blurDataURL={BLUR_BLUE_MOON}
          loading="lazy"
          className="object-cover object-top [clip-path:inset(3%_3%_3%_3%)] group-hover:[clip-path:inset(0%_0%_0%_0%)] group-hover:scale-[1.04] transition-[transform,clip-path] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        />

        {/* Gradient — light veil at top for eyebrow legibility, deep black at bottom for title */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.08)_28%,rgba(0,0,0,0.18)_55%,rgba(0,0,0,0.92)_100%)]"
        />

        {/* Cyan radial — section tone at top-right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_45%_at_88%_9%,rgba(34,211,238,0.09),transparent_52%)]"
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">

          {/* Top row — index + tags */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-cyan-400/60">
              01
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-zinc-500">
              Hospitality · Landing
            </span>
          </div>

          {/* Bottom row — title + arrow */}
          <div className="flex items-end justify-between gap-4">
            <h3
              aria-label="Blue Moon Cottage"
              className="font-headline italic leading-[0.86] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(2.75rem, 7.5vw, 6rem)' }}
            >
              <span className="block text-white">Blue Moon</span>
              <span className="block text-cyan-400 night-glow-cyan">Cottage</span>
            </h3>

            <span
              aria-hidden="true"
              className="mb-[0.12em] shrink-0 font-mono text-xl text-zinc-500 transition-[color,transform] duration-300 group-hover:translate-x-2 group-hover:text-cyan-400"
            >
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

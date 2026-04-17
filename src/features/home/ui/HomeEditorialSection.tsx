import Image from 'next/image';
import Link from 'next/link';

/**
 * Sprint 1A — Editorial full-bleed section below the home hero.
 * Escapes parent padding with negative margins.
 * "CHEF" at ~38vw bleeds off the right edge on all screens.
 */
export default function HomeEditorialSection() {
  return (
    <section
      aria-label="Gastronomía — trabajo editorial"
      className="-mx-6 md:-mx-24 relative min-h-[82svh] overflow-hidden bg-black"
    >
      {/* Full-bleed background image */}
      <Image
        src="/images/culinary-plating.jpeg"
        alt="Emplatado de servicio premium — gastronomía de autor"
        fill
        sizes="100vw"
        loading="lazy"
        className="object-cover object-center opacity-80 saturate-[0.88]"
      />

      {/* Primary gradient — deep black at bottom for text legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.04)_22%,rgba(0,0,0,0.38)_55%,rgba(0,0,0,0.92)_100%)]"
      />

      {/* Lime radial — brand atmosphere, top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_88%_8%,rgba(202,253,0,0.10),transparent_50%)]"
      />

      {/* Content layer */}
      <div className="absolute inset-0 flex flex-col justify-between px-6 py-10 md:px-24 md:py-14">

        {/* Top row — eyebrow + index */}
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-lime-400/60">
            Gastronomía
          </p>
          <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-zinc-600">
            01 / 02
          </span>
        </div>

        {/* Bottom stack — headline + subrow */}
        <div className="space-y-5 md:space-y-6">

          {/* Oversized headline — left-aligned, bleeds off right edge */}
          <h2
            aria-label="Chef"
            className="font-headline italic leading-[0.80] text-white"
            style={{
              fontSize: 'clamp(6.5rem, 38vw, 32rem)',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.03em',
            }}
          >
            CHEF
          </h2>

          {/* Sub-row */}
          <div className="flex items-end justify-between gap-6">
            <p className="border-l border-lime-400/25 pl-5 font-mono text-sm leading-relaxed text-zinc-400 max-w-[22rem]">
              Culinary engineering.
              <br />
              From kitchen to digital.
            </p>

            <Link
              href="/works#works-gastronomy"
              className="shrink-0 font-mono text-[10px] uppercase tracking-[0.42em] text-white/50 transition-colors duration-300 hover:text-lime-400"
            >
              Ver trabajo →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

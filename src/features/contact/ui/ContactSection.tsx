'use client';

import { Eyebrow, MonoToken } from '@/design/primitives';
import ScrambleText from '@/components/shared/ScrambleText';
import { cx } from '@/lib/utils/cx';

interface ContactSectionProps {
  id?: string;
  className?: string;
}

/**
 * Sprint 1D — Contact as a visual installation.
 *
 * The email address is not just large text — each part has its own scale,
 * indentation, and weight. chef@ (small/dim) → JOHNHERRERA (massive/lime) →
 * chef.com (medium/muted). Ratio ≈ 6:1 between smallest and largest.
 *
 * Escapes parent padding with negative margins, fills the viewport,
 * and closes with a stats anchor row.
 */
export default function ContactSection({ id = 'contact', className }: ContactSectionProps) {
  return (
    <footer
      id={id}
      className={cx(
        '-mx-6 -mt-28 relative min-h-screen overflow-hidden md:-mx-24 md:-mt-32',
        className,
      )}
    >
      {/* Ambient lime glow — emanates from behind JOHNHERRERA */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_12%_58%,rgba(202,253,0,0.10),transparent_58%)]"
      />
      {/* Secondary glow — top right, subtle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_90%_18%,rgba(202,253,0,0.04),transparent_55%)]"
      />

      {/* Main layout */}
      <div className="flex min-h-screen flex-col px-6 md:px-24">

        {/* ── Top — eyebrow ── */}
        <div className="flex items-center justify-between gap-4 pt-28 md:pt-36">
          <Eyebrow role="muted" className="whitespace-nowrap">Contact --- John Herrera</Eyebrow>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.42em] text-zinc-700">
            Medellín, CO
          </span>
        </div>

        {/* ── Email installation — main visual mass ── */}
        <div className="flex flex-1 flex-col justify-end pb-20 md:pb-28">

          <a
            href="mailto:chef@johnherrerachef.com"
            aria-label="Send email to chef@johnherrerachef.com"
            className="group block leading-none"
          >
            {/* chef@ — small, indented, dim. Like a label on a container. */}
            <ScrambleText
              as="span"
              text="chef@"
              speed={28}
              stagger={32}
              className="mb-1 ml-[4vw] block font-mono uppercase tracking-[-0.04em] text-zinc-600 transition-colors duration-500 group-hover:text-zinc-400"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2.5rem)' }}
            />

            {/* JOHNHERRERA — the installation. Fills the viewport. */}
            <ScrambleText
              as="span"
              text="JOHNHERRERA"
              speed={22}
              stagger={28}
              className="night-glow block font-mono uppercase tracking-[-0.03em] text-[var(--accent-primary)] transition-[text-shadow] duration-500 group-hover:[text-shadow:0_0_48px_rgba(202,253,0,0.75),0_0_120px_rgba(202,253,0,0.28)]"
              style={{ fontSize: 'clamp(3.5rem, 16vw, 14rem)', lineHeight: 0.88 }}
            />

            {/* chef.com — medium, offset right, fading */}
            <ScrambleText
              as="span"
              text="chef.com"
              speed={28}
              stagger={36}
              className="mt-1 ml-[8vw] block font-mono uppercase tracking-[-0.04em] text-zinc-600 transition-colors duration-500 group-hover:text-zinc-500"
              style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4rem)' }}
            />
          </a>

          {/* Subline — anchored under the email */}
          <p className="ml-[1vw] mt-8 max-w-xs border-l border-lime-400/20 pl-5 font-mono text-sm leading-relaxed text-zinc-500 md:max-w-sm">
            Private inquiries for hospitality,
            <br />
            brand direction and digital product.
          </p>
        </div>

        {/* ── Bottom anchor — stats + social ── */}
        <div className="border-t border-zinc-900/60 py-8 md:py-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

            {/* Social links */}
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { href: 'https://www.instagram.com/johnherrerachef/', label: 'Instagram', color: 'hover:text-lime-400' },
                { href: 'https://github.com/Monsterchef-git', label: 'GitHub', color: 'hover:text-cyan-400' },
                { href: 'https://www.linkedin.com/in/john-herrera-chef/', label: 'LinkedIn', color: 'hover:text-blue-400' },
              ].map(({ href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx('flex items-center gap-2 transition-colors duration-300', color)}
                >
                  <span className="h-px w-4 bg-zinc-800" />
                  <Eyebrow as="span" role="primary">{label}</Eyebrow>
                </a>
              ))}
            </div>

            {/* Closing stats */}
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-700 md:text-right">
              <span>06 Projects</span>
              <span className="mx-3 text-zinc-800">·</span>
              <span>02 Disciplines</span>
              <span className="mx-3 text-zinc-800">·</span>
              <MonoToken kind="location">Medellín</MonoToken>
              <span className="mx-3 text-zinc-800">·</span>
              <span>©{new Date().getFullYear()}</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

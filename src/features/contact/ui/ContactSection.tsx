'use client';

import { Eyebrow, Hero } from '@/design/primitives';
import { sectionMicroClassName } from '@/design/tokens/components/sectionStyles';
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
    <section
      id={id}
      className={cx(
        'relative -mx-6 md:-mx-24',
        className,
      )}
    >
      <Hero
        eyebrow="CONTACT"
        statement="The pass is open."
        counterLine="briefs, reservations, collaborations →"
        tone="lime"
        anchor={
          <span className={cx(sectionMicroClassName, 'text-zinc-500')}>
            Medellin, CO
          </span>
        }
      />

      <section
        aria-label="Email installation"
        className="relative px-6 pb-16 pt-8 md:px-24 md:pb-24 md:pt-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_12%_58%,rgba(202,253,0,0.10),transparent_58%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_90%_18%,rgba(202,253,0,0.04),transparent_55%)]"
        />
        <div className="relative">
          <a
            href="mailto:chef@johnherrerachef.com"
            aria-label="Send email to chef@johnherrerachef.com"
            className="group block leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <ScrambleText
              as="span"
              text="chef@"
              speed={28}
              stagger={32}
              className="mb-1 ml-[2vw] block font-mono uppercase tracking-[-0.04em] text-zinc-400 transition-colors duration-500 group-hover:text-zinc-200 group-focus-visible:text-zinc-200"
              style={{ fontSize: 'clamp(1.15rem, 2.4vw, 2rem)' }}
            />

            {/* JOHNHERRERA — the installation. Fills the viewport. */}
            <ScrambleText
              as="span"
              text="JOHNHERRERA"
              speed={22}
              stagger={28}
              className="night-glow block font-mono uppercase tracking-[-0.03em] text-[var(--accent-primary)] transition-[text-shadow] duration-500 group-hover:[text-shadow:0_0_48px_rgba(202,253,0,0.75),0_0_120px_rgba(202,253,0,0.28)] group-focus-visible:[text-shadow:0_0_48px_rgba(202,253,0,0.75),0_0_120px_rgba(202,253,0,0.28)]"
              style={{ fontSize: 'clamp(3.25rem, 13vw, 11rem)', lineHeight: 0.9 }}
            />

            {/* chef.com — medium, offset right, fading */}
            <ScrambleText
              as="span"
              text="chef.com"
              speed={28}
              stagger={36}
              className="mt-1 ml-[4vw] block font-mono uppercase tracking-[-0.04em] text-zinc-400/88 transition-colors duration-500 group-hover:text-zinc-200 group-focus-visible:text-zinc-200"
              style={{ fontSize: 'clamp(1.5rem, 3.6vw, 3.2rem)' }}
            />
          </a>
        </div>
      </section>

      <footer className="px-6 pb-10 md:px-24 md:pb-14">
        <div className="space-y-0">
          {[
            {
              href: 'https://www.instagram.com/johnherrerachef/',
              label: 'Instagram',
              color: 'text-lime-300 hover:text-lime-200 focus-visible:text-lime-200',
            },
            {
              href: 'https://github.com/Monsterchef-git',
              label: 'GitHub',
              color: 'text-lime-300 hover:text-lime-200 focus-visible:text-lime-200',
            },
            {
              href: 'https://www.linkedin.com/in/john-herrera-chef/',
              label: 'LinkedIn',
              color: 'text-blue-300 hover:text-blue-200 focus-visible:text-blue-200',
            },
          ].map(({ href, label, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cx(
                'flex min-h-14 items-center justify-between border-t border-zinc-900 font-mono text-[11px] uppercase tracking-[0.28em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:min-h-16',
                color,
              )}
            >
              <span>{label}</span>
              <span aria-hidden="true" className="text-zinc-600">↗</span>
            </a>
          ))}
          <div className="border-t border-zinc-900 pt-5 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            © 2026
          </div>
        </div>
      </footer>
    </section>
  );
}

'use client';

import { AmbientGlow, Hero, CulinaryTerm } from '@/design/primitives';
import { sectionMicroClassName } from '@/design/tokens/components/sectionStyles';
import { tracking } from '@/design/tokens/primitives/atmosphere';
import ScrambleText from '@/components/shared/ScrambleText';
import { cx } from '@/lib/utils/cx';

interface ContactSectionProps {
  id?: string;
  className?: string;
}

export default function ContactSection({ id = 'contact', className }: ContactSectionProps) {
  return (
    <section
      id={id}
      className={cx(
        'relative',
        className,
      )}
      data-cursor-role="service"
    >
      <Hero
        eyebrow="CONTACT"
        statement={<CulinaryTerm term="pass">The pass is open.</CulinaryTerm>}
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
        className="relative px-6 py-32 md:px-24 md:py-48"
      >
        <AmbientGlow
          tone="lime"
          intensity="medium"
          position="bottom-left"
        />
        <div className="relative">
          <a
            href="mailto:chef@johnherrerachef.com"
            aria-label="Send email to chef@johnherrerachef.com"
            className="group block w-full max-w-full leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <ScrambleText
              as="span"
              text="chef@"
              speed={28}
              stagger={32}
              className={cx(
                'mb-1 ml-1 block font-mono uppercase text-zinc-400 transition-colors duration-[900ms] group-hover:text-zinc-200 group-focus-visible:text-zinc-200 md:ml-[2vw] motion-reduce:transition-none',
                tracking.dense,
              )}
              style={{ fontSize: 'clamp(1.15rem, 2.4vw, 2rem)' }}
            />

            {/* JOHNHERRERA — the installation. Fills the viewport. */}
            <ScrambleText
              as="span"
              text="JOHNHERRERA"
              speed={22}
              stagger={28}
              className={cx(
                'night-glow block max-w-full font-mono uppercase text-[var(--accent-primary)] transition-[text-shadow] duration-[900ms] group-hover:[text-shadow:0_0_48px_rgba(202,253,0,0.75),0_0_120px_rgba(202,253,0,0.28)] group-focus-visible:[text-shadow:0_0_48px_rgba(202,253,0,0.75),0_0_120px_rgba(202,253,0,0.28)] motion-reduce:transition-none',
                tracking.dense,
              )}
              style={{ fontSize: 'clamp(2.2rem, 9vw, 11rem)', lineHeight: 0.9 }}
            />

            {/* chef.com — medium, offset right, fading */}
            <ScrambleText
              as="span"
              text="chef.com"
              speed={28}
              stagger={36}
              className={cx(
                'mt-1 ml-2 block font-mono uppercase text-zinc-400/88 transition-colors duration-[900ms] group-hover:text-zinc-200 group-focus-visible:text-zinc-200 md:ml-[4vw] motion-reduce:transition-none',
                tracking.dense,
              )}
              style={{ fontSize: 'clamp(1.5rem, 3.6vw, 3.2rem)' }}
            />
          </a>
        </div>
      </section>

      <footer className="px-6 pb-14 pt-48 md:px-24 md:pb-16 md:pt-64">
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
                'flex items-baseline justify-between border-t border-zinc-900/60 py-6 font-mono text-[11px] uppercase transition-colors duration-[700ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:py-7 motion-reduce:transition-none',
                tracking.label,
                color,
              )}
            >
              <span>{label}</span>
              <span aria-hidden="true" className="text-zinc-600">↗</span>
            </a>
          ))}
          <div className={cx('border-y border-zinc-900/60 pt-5 font-mono text-[11px] uppercase text-zinc-500', tracking.label)}>
            © 2026
          </div>
        </div>
      </footer>
    </section>
  );
}

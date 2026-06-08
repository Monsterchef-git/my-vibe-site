'use client';

import { AmbientGlow, Hero, CulinaryTerm } from '@/design/primitives';
import {
  sectionGutterClassName,
  sectionMicroClassName,
} from '@/design/tokens/components/sectionStyles';
import CourseTransition from '@/components/shared/CourseTransition';
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
        course="04"
        slug="#CONTACT"
        file="04"
        anchor={
          <span className={cx(sectionMicroClassName, 'text-zinc-500')}>
            Medellin, CO
          </span>
        }
      />

      <CourseTransition from="04" to="01" tone="lime" />

      <section
        aria-label="Email installation"
        className={cx('relative py-32 md:py-48', sectionGutterClassName)}
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
              style={{ fontSize: 'clamp(1.35rem, 2.8vw, 2.4rem)' }}
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
              style={{ fontSize: 'clamp(2.8rem, 11vw, 13rem)', lineHeight: 0.9 }}
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
              style={{ fontSize: 'clamp(1.9rem, 4.3vw, 4rem)' }}
            />
          </a>
        </div>
      </section>

    </section>
  );
}

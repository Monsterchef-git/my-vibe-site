import Eyebrow from '@/components/Eyebrow';
import MonoToken from '@/components/MonoToken';
import InternalPageHeroFrame from '@/components/InternalPageHeroFrame';
import { cx } from '@/components/primitive';
import ScrambleText from '@/components/ScrambleText';

interface ContactSectionProps {
  id?: string;
  className?: string;
}

export default function ContactSection({
  id = 'contact',
  className,
}: ContactSectionProps) {
  return (
    <footer id={id} className={cx('pb-20', className)}>
      <InternalPageHeroFrame
        as="div"
        className="mt-0 md:mt-0"
        sectionClassName="min-h-[64svh] pt-0 md:min-h-[70svh] md:pt-0"
        contentClassName="justify-end pb-12"
      >
        <div className="space-y-10">
          <Eyebrow role="muted">Contact --- John Herrera</Eyebrow>

          <a
            href="mailto:chef@johnherrerachef.com"
            className="group block font-mono text-[clamp(2.5rem,10vw,12rem)] uppercase tracking-[-0.08em] leading-[0.82] text-zinc-100 transition-all"
          >
            <ScrambleText
              as="span"
              text="chef@"
              className="block -translate-x-[0.01em] text-zinc-200 transition-[transform,color,font-style,letter-spacing] duration-700 delay-75 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[0.06em] group-hover:tracking-[-0.1em] group-hover:text-white group-hover:italic group-hover:delay-100"
              speed={28}
              stagger={32}
            />
            <ScrambleText
              as="span"
              text="johnherrera"
              className="night-glow block translate-x-[0.08em] tracking-[-0.045em] text-[var(--accent-primary)] transition-[transform,color,font-style,letter-spacing] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[0.02em] group-hover:tracking-[-0.06em] group-hover:text-[#e3ff57] group-hover:italic group-hover:delay-0"
              speed={28}
              stagger={32}
            />
            <ScrambleText
              as="span"
              text="chef.com"
              className="block translate-x-[0.18em] text-zinc-500 transition-[transform,color,font-style,letter-spacing] duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[0.24em] group-hover:tracking-[-0.1em] group-hover:text-zinc-300 group-hover:italic group-hover:delay-150"
              speed={28}
              stagger={32}
            />
          </a>

          <p className="max-w-xl border-l border-white/10 pl-6 font-mono text-sm leading-relaxed text-zinc-400">
            Private inquiries for hospitality, brand direction and digital product.
          </p>
        </div>
      </InternalPageHeroFrame>

      <div className="mx-auto max-w-6xl border-t border-zinc-900/50 pt-16">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 md:flex">
            <a
              href="https://www.instagram.com/johnherrerachef/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-lime-400"
            >
              <span className="h-[1px] w-4 bg-zinc-800" />
              <Eyebrow as="span" role="primary">Instagram</Eyebrow>
            </a>
            <a
              href="https://github.com/Monsterchef-git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-cyan-400"
            >
              <span className="h-[1px] w-4 bg-zinc-800" />
              <Eyebrow as="span" role="primary">GitHub</Eyebrow>
            </a>
            <a
              href="https://www.linkedin.com/in/john-herrera-chef/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-blue-400"
            >
              <span className="h-[1px] w-4 bg-zinc-800" />
              <Eyebrow as="span" role="primary">LinkedIn</Eyebrow>
            </a>
          </div>

          <div className="md:text-right">
            <Eyebrow role="dim" className="leading-loose text-zinc-800">
              <MonoToken kind="location">Medellín</MonoToken>, Antioquia <br />
              Chef creativo en <MonoToken kind="project">Wink Eventos</MonoToken> <br />
              Producto digital para <MonoToken kind="project">tecnical.app</MonoToken>
            </Eyebrow>
          </div>
        </div>
      </div>
    </footer>
  );
}

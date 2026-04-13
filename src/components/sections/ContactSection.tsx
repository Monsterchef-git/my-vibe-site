import MonoToken from '@/components/MonoToken';
import ScrollProgressBlock from '@/components/ScrollProgressBlock';
import { cx, sectionClassName } from '@/components/primitive';
import { SectionChrome } from '@/components/sections/SectionChrome';
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
    <ScrollProgressBlock
      as="footer"
      id={id}
      variant="footer"
      scrollTone="blue"
      className={cx(sectionClassName, 'pb-20 pt-20 md:pt-16', className)}
    >
      <div className="mx-auto max-w-7xl">
        <SectionChrome
          index="04"
          label="Contacto"
          meta="Disponible · Medellín, Colombia"
          tone="blue"
          watermarkSide="left"
        />

        <div className="mb-32 space-y-11">
          <ScrambleText
            text="Conversemos"
            className="relative z-[1] font-mono text-[10px] uppercase tracking-[0.42em] text-zinc-600 transition-colors duration-200 hover:text-zinc-400 cursor-default select-none"
          />
          <a
            href="mailto:chef@johnherrerachef.com"
            className="group block font-mono text-[clamp(4rem,12vw,14rem)] uppercase tracking-[-0.08em] leading-[0.82] text-zinc-100 transition-all"
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
        </div>

        <div className="flex flex-col justify-between gap-12 border-t border-zinc-900/50 pt-20 md:flex-row md:items-end">
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 font-mono text-[10px] uppercase tracking-[0.42em] text-zinc-500 md:flex">
            <a
              href="https://www.instagram.com/johnherrerachef/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-lime-400"
            >
              <span className="h-[1px] w-4 bg-zinc-800" /> Instagram
            </a>
            <a
              href="https://github.com/Monsterchef-git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-cyan-400"
            >
              <span className="h-[1px] w-4 bg-zinc-800" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/john-herrera-chef/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-blue-400"
            >
              <span className="h-[1px] w-4 bg-zinc-800" /> LinkedIn
            </a>
          </div>

          <div className="text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.42em] leading-loose text-zinc-800">
              <MonoToken kind="location">Medellín</MonoToken>, Antioquia <br />
              Chef creativo en <MonoToken kind="project">Wink Eventos</MonoToken> <br />
              Producto digital para <MonoToken kind="project">tecnical.app</MonoToken>
            </p>
          </div>
        </div>
      </div>
    </ScrollProgressBlock>
  );
}

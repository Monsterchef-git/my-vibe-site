import MonoToken from '@/components/MonoToken';
import { cx } from '@/components/primitive';

interface ContactSectionProps {
  id?: string;
  className?: string;
}

export default function ContactSection({
  id = 'contact',
  className,
}: ContactSectionProps) {
  return (
    <footer id={id} className={cx('overflow-hidden px-6 pb-20', className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-32 space-y-6">
          <p className="pl-2 font-mono text-[10px] uppercase tracking-[0.8em] text-zinc-600 md:text-xs">
            Conversemos
          </p>
          <a
            href="mailto:chef@johnherrerachef.com"
            className="tight-headline group block text-[13vw] font-black uppercase tracking-tighter leading-[0.8] transition-all md:text-[10vw]"
          >
            <span className="block transition-transform duration-700 group-hover:translate-x-4">
              chef@
            </span>
            <span className="block text-zinc-500 transition-all duration-700 group-hover:-translate-x-4 group-hover:text-white">
              johnherrera
            </span>
            <span className="block transition-transform duration-700 group-hover:translate-x-8">
              chef.com
            </span>
          </a>
        </div>

        <div className="flex flex-col justify-between gap-12 border-t border-zinc-900/50 pt-20 md:flex-row md:items-end">
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500 md:flex">
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
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] leading-loose text-zinc-800">
              <MonoToken kind="location">Medellín</MonoToken>, Antioquia <br />
              Chef creativo en <MonoToken kind="project">Wink Eventos</MonoToken> <br />
              Producto digital para <MonoToken kind="project">tecnical.app</MonoToken>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import MonoToken from '@/components/MonoToken';
import { cx } from '@/components/primitive';

const NAV_ITEMS = [
  { href: '/', label: 'Index' },
  { href: '/about', label: 'About' },
  { href: '/works', label: 'Works' },
  { href: '/contact', label: 'Contact' },
] as const;

interface TopNavProps {
  currentPath: '/' | '/about' | '/works' | '/contact';
}

export default function TopNav({ currentPath }: TopNavProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-[150] px-6 py-5 md:px-10 md:py-8">
      <div className="grid gap-3 lg:grid-cols-[auto_1fr_auto] lg:items-center">
        <Link
          href="/"
          className="justify-self-start rounded-[1.75rem] border border-white/10 bg-black/55 px-4 py-3 backdrop-blur-xl transition-colors hover:border-white/20"
        >
          <p className="font-black text-2xl tracking-[-0.12em] text-white">JH.</p>
          <div className="font-mono text-[9px] uppercase tracking-[0.36em] text-zinc-500">
            Chef / Digital craft
          </div>
        </Link>

        <nav className="justify-self-center overflow-x-auto rounded-full border border-white/10 bg-zinc-900/72 px-2 py-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl [scrollbar-width:none]">
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cx(
                    'rounded-full border px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.32em] whitespace-nowrap transition-[color,border-color,background-color,box-shadow] duration-200',
                    isActive
                      ? 'border-white/10 bg-white text-black shadow-[0_0_18px_rgba(255,255,255,0.16)]'
                      : 'border-transparent text-zinc-500 hover:border-white/10 hover:text-white',
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <Link
          href="/contact"
          className="hidden justify-self-end rounded-[1.75rem] border border-lime-400/20 bg-black/55 px-4 py-3 backdrop-blur-xl transition-colors hover:border-lime-400/45 md:block"
        >
          <div className="flex items-center justify-end gap-3">
            <div className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-400 shadow-[0_0_12px_#cafd00]" />
            </div>
            <div className="space-y-1 text-right">
              <p className="font-mono text-[8px] uppercase tracking-[0.32em] text-zinc-500">
                Availability
              </p>
              <MonoToken
                kind="status"
                className="font-mono text-[10px] uppercase tracking-[0.28em]"
              >
                Selected collaborations
              </MonoToken>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}

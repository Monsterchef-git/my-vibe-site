import Link from 'next/link';

import { glassDepth, tracking } from '@/design/tokens/primitives/atmosphere';
import { pageGutterClassName } from '@/design/tokens/semantic/layout';
import { cx } from '@/lib/utils/cx';

const NAV_ITEMS = [
  { href: '/works', label: 'Works' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

interface TopNavProps {
  currentPath: '/' | '/about' | '/works' | '/contact';
}

export default function TopNav({ currentPath }: TopNavProps) {
  return (
    <header 
      data-cursor-role="bridge"
      className={cx('fixed inset-x-0 top-0 z-[150] py-5 md:py-8', pageGutterClassName)}
    >
      <div className="grid gap-3 lg:grid-cols-[auto_1fr_auto] lg:items-center">

        {/* Logo — sin contenedor, glitch en hover */}
        <Link
          href="/"
          data-cursor-mode="link"
          className="group inline-flex min-h-11 min-w-11 items-center justify-center justify-self-start rounded-full leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <p className={cx('hover-glitch font-black text-2xl text-white transition-colors duration-[400ms] motion-reduce:transition-none', tracking.dense)}>
            JH.
          </p>
        </Link>

        <nav
          aria-label="Primary"
          className={cx(
            'max-w-full justify-self-center overflow-x-auto rounded-full border border-white/10 bg-zinc-900/72 px-2 py-2 shadow-[var(--shadow-stitch-surface)] [scrollbar-width:none]',
            glassDepth.frosted,
          )}
        >
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  data-cursor-mode="link"
                  className={cx(
                    'inline-flex min-h-11 items-center justify-center rounded-full border px-4 py-2.5 font-mono text-[10px] uppercase whitespace-nowrap transition-[color,border-color,background-color,box-shadow] duration-[500ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none',
                    tracking.eyebrow,
                    isActive
                      ? 'border-white/10 bg-white text-black shadow-[0_0_18px_rgba(255,255,255,0.16)]'
                      : 'border-transparent text-zinc-400 hover:border-white/10 hover:text-white focus-visible:border-white/10 focus-visible:text-white',
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* CTA — sin contenedor, flota libre */}
        <Link
          href="/contact"
          data-cursor-mode="cta"
          data-cursor-label="Contact"
          className="group inline-flex min-h-11 items-center justify-self-start gap-2.5 px-1 transition-colors duration-[500ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black lg:justify-self-end motion-reduce:transition-none"
        >
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-primary)] opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_10px_var(--accent-primary)]" />
          </div>
          <span
            className={cx(
              'font-mono text-[10px] uppercase text-zinc-300 transition-colors duration-[500ms] group-hover:text-[var(--accent-primary)] group-focus-visible:text-[var(--accent-primary)] motion-reduce:transition-none',
              tracking.eyebrow,
            )}
          >
            Let&apos;s build.
          </span>
        </Link>

      </div>
    </header>
  );
}

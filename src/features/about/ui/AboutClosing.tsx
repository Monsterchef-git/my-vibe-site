import Link from 'next/link';
import { tracking } from '@/design/tokens/primitives/atmosphere';
import { sectionGutterClassName } from '@/design/tokens/components/sectionStyles';
import { cx } from '@/lib/utils/cx';

export default function AboutClosing() {
  return (
    <section
      aria-label="Contact John Herrera"
      className={cx('pb-24 pt-20 md:pb-32 md:pt-28 lg:pb-48', sectionGutterClassName)}
    >
      <div className="border-t border-white/12 pt-8 md:flex md:items-end md:justify-between md:gap-12">
        <p className="max-w-3xl font-headline text-[clamp(2.7rem,8vw,7rem)] italic leading-[0.95] text-white">
          Built with the discipline of service.
        </p>
        <Link
          href="/contact"
          data-cursor-mode="cta"
          data-cursor-label="Contact"
          data-magnetic="cta"
          className={cx(
            'mt-8 inline-flex min-h-11 items-center border-b border-white/30 font-mono text-[11px] uppercase text-white transition-colors hover:border-lime-300 hover:text-lime-300 focus-visible:text-lime-300 md:mt-0',
            tracking.label,
          )}
        >
          Start a conversation →
        </Link>
      </div>
    </section>
  );
}

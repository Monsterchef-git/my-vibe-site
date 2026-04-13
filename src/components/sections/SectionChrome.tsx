import Link from 'next/link';
import type { ReactNode } from 'react';
import { cx } from '@/components/primitive';
import Eyebrow from '@/components/Eyebrow';
import { eyebrowTones } from '@/components/sections/sectionStyles';

type SectionTone = 'lime' | 'cyan' | 'blue' | 'white';

const toneLineClassNames: Record<SectionTone, string> = {
  lime:  'bg-gradient-to-r from-lime-400/24 to-transparent',
  cyan:  'bg-gradient-to-r from-cyan-400/24 to-transparent',
  blue:  'bg-gradient-to-r from-blue-400/24 to-transparent',
  white: 'bg-gradient-to-r from-white/14 to-transparent',
};

const toneCtaClassNames: Record<
  SectionTone,
  { root: string; label: string; arrow: string }
> = {
  lime: {
    root:  'hover:border-lime-400/30 hover:shadow-[0_0_24px_rgba(202,253,0,0.06)]',
    label: 'text-[var(--accent-primary)] group-hover:text-white',
    arrow: 'group-hover:text-[var(--accent-primary)]',
  },
  cyan: {
    root:  'hover:border-cyan-400/30 hover:shadow-[0_0_24px_rgba(34,211,238,0.06)]',
    label: 'text-cyan-400 group-hover:text-white',
    arrow: 'group-hover:text-cyan-400',
  },
  blue: {
    root:  'hover:border-blue-400/30 hover:shadow-[0_0_24px_rgba(96,165,250,0.06)]',
    label: 'text-blue-400 group-hover:text-white',
    arrow: 'group-hover:text-blue-400',
  },
  white: {
    root:  'hover:border-white/20 hover:shadow-[0_0_24px_rgba(255,255,255,0.06)]',
    label: 'text-white group-hover:text-zinc-200',
    arrow: 'group-hover:text-white',
  },
};

// SectionTone → EyebrowTone mapping (white → primary role, others → toned)
const toneEyebrowMeta: Record<SectionTone, string> = {
  lime:  eyebrowTones.lime,
  cyan:  eyebrowTones.cyan,
  blue:  eyebrowTones.blue,
  white: eyebrowTones.white,
};

interface SectionChromeProps {
  index: string;
  label: string;
  meta?: ReactNode;
  tone?: SectionTone;
  className?: string;
}

export function SectionChrome({
  index,
  label,
  meta,
  tone = 'white',
  className,
}: SectionChromeProps) {
  return (
    <>
      <div className={cx('mb-12 flex items-center gap-6', className)}>
        <Eyebrow as="span">
          {index} ——— {label}
        </Eyebrow>
        <span className={cx('hidden h-px flex-1 md:block', toneLineClassNames[tone])} />
        {meta ? (
          <span className={cx(toneEyebrowMeta[tone], 'hidden md:block')}>
            {meta}
          </span>
        ) : null}
      </div>
    </>
  );
}

interface SectionCTAProps {
  href: string;
  label: string;
  tone?: SectionTone;
  className?: string;
}

export function SectionCTA({
  href,
  label,
  tone = 'white',
  className,
}: SectionCTAProps) {
  const toneClasses = toneCtaClassNames[tone];

  return (
    <Link
      href={href}
      className={cx(
        'group mt-10 flex items-center justify-between gap-4 rounded-[2rem] border border-zinc-800/60 bg-black/40 px-6 py-4 transition-all duration-300',
        toneClasses.root,
        className,
      )}
    >
      <Eyebrow
        as="span"
        className={cx('shrink-0 transition-colors duration-300', toneClasses.label)}
      >
        {label}
      </Eyebrow>
      <span
        className={cx(
          'shrink-0 font-mono text-sm text-zinc-700 transition-all duration-300 group-hover:translate-x-1',
          toneClasses.arrow,
        )}
      >
        →
      </span>
    </Link>
  );
}

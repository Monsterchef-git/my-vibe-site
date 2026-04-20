import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { Eyebrow } from '@/design/primitives';
import { eyebrowTones } from '@/design/tokens/components/sectionStyles';
import { cx } from '@/lib/utils/cx';

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
    root:  'hover:border-lime-400/30 hover:bg-lime-400/[0.04] hover:shadow-[0_0_24px_rgba(202,253,0,0.06)]',
    label: 'text-[var(--accent-primary)] group-hover:text-white',
    arrow: 'group-hover:text-[var(--accent-primary)]',
  },
  cyan: {
    root:  'hover:border-cyan-400/30 hover:bg-cyan-400/[0.04] hover:shadow-[0_0_24px_rgba(34,211,238,0.06)]',
    label: 'text-cyan-400 group-hover:text-white',
    arrow: 'group-hover:text-cyan-400',
  },
  blue: {
    root:  'hover:border-blue-400/30 hover:bg-blue-400/[0.04] hover:shadow-[0_0_24px_rgba(96,165,250,0.06)]',
    label: 'text-blue-400 group-hover:text-white',
    arrow: 'group-hover:text-blue-400',
  },
  white: {
    root:  'hover:border-white/20 hover:bg-white/[0.04] hover:shadow-[0_0_24px_rgba(255,255,255,0.06)]',
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
  const lensStyle = {
    left: 'var(--lens-x, 50%)',
    top: 'var(--lens-y, 50%)',
  } as CSSProperties;

  return (
    <Link
      href={href}
      data-magnetic="lens"
      className={cx(
        'group relative isolate mt-10 flex items-center justify-between gap-4 overflow-hidden rounded-full border border-zinc-800/60 bg-white/[0.02] px-6 py-4 transition-all duration-300',
        toneClasses.root,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.025),transparent_58%,rgba(255,255,255,0.05))] opacity-80 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-[1] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/14 bg-white/[0.08] opacity-0 shadow-[0_0_22px_rgba(255,255,255,0.06)] transition-opacity duration-200 group-hover:opacity-100"
        style={lensStyle}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-[1] h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.12] opacity-0 mix-blend-screen transition-opacity duration-200 group-hover:opacity-100"
        style={lensStyle}
      />
      <Eyebrow
        as="span"
        className={cx('relative z-10 shrink-0 transition-colors duration-300', toneClasses.label)}
      >
        {label}
      </Eyebrow>
      <span
        className={cx(
          'relative z-10 shrink-0 font-mono text-sm text-zinc-700 transition-all duration-300 group-hover:translate-x-1',
          toneClasses.arrow,
        )}
      >
        →
      </span>
    </Link>
  );
}

import type { ReactNode } from 'react';
import { Eyebrow, SectionPrimitive } from '@/design/primitives';
import { cx } from '@/lib/utils/cx';

type HeroTone = 'lime' | 'cyan' | 'white';

const toneGlowClassNames: Record<HeroTone, string> = {
  lime: 'bg-[radial-gradient(circle_at_16%_18%,rgba(202,253,0,0.16),transparent_34%),radial-gradient(circle_at_82%_24%,rgba(34,211,238,0.08),transparent_36%)]',
  cyan: 'bg-[radial-gradient(circle_at_16%_18%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_82%_24%,rgba(96,165,250,0.1),transparent_36%)]',
  white: 'bg-[radial-gradient(circle_at_16%_18%,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_82%_24%,rgba(202,253,0,0.08),transparent_36%)]',
};

interface PageIntroHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  tone?: HeroTone;
  className?: string;
}

export default function PageIntroHero({
  eyebrow,
  title,
  description,
  tone = 'white',
  className,
}: PageIntroHeroProps) {
  return (
    <header className={cx('mt-14 md:mt-20', className)}>
      <SectionPrimitive className="grainy-bg relative px-6 py-10 md:px-10 md:py-14">
        <div
          aria-hidden="true"
          className={cx('pointer-events-none absolute inset-0', toneGlowClassNames[tone])}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_26%,transparent_74%,rgba(255,255,255,0.02)),linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.24))]"
        />
        <div className="relative z-10 max-w-6xl space-y-10">
          <div className="space-y-6">
            <Eyebrow role="muted">{eyebrow}</Eyebrow>
            <div className="max-w-5xl">{title}</div>
          </div>

          <p className="max-w-2xl border-l border-white/10 pl-6 font-mono text-sm leading-relaxed text-zinc-400">
            {description}
          </p>
        </div>
      </SectionPrimitive>
    </header>
  );
}

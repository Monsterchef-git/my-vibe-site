import { Hero, CulinaryTerm } from '@/design/primitives';
import { tracking } from '@/design/tokens/primitives/atmosphere';
import { cx } from '@/lib/utils/cx';

export default function WorksHero() {
  return (
    <Hero
      eyebrow="WORKS"
      statement={<CulinaryTerm term="tasting">Taste, applied.</CulinaryTerm>}
      counterLine="kitchens & interfaces. same instinct."
      tone="lime"
      anchor={
        <a
          href="#works-gastronomy"
          data-cursor-mode="cta"
          data-cursor-label="Explore"
          data-cursor-role="chef"
          className={cx(
            'inline-flex min-h-11 items-center font-mono text-[11px] uppercase text-cyan-300 transition-colors duration-[700ms] hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/65 focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-reduce:transition-none',
            tracking.eyebrow,
          )}
        >
          Start with hospitality
        </a>
      }
    />
  );
}

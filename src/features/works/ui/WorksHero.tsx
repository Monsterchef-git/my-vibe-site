import { Hero } from '@/design/primitives';

export default function WorksHero() {
  return (
    <Hero
      eyebrow="WORKS"
      statement="Taste, applied."
      counterLine="kitchens & interfaces. same instinct."
      tone="lime"
      anchor={
        <a
          href="#works-gastronomy"
          data-cursor="cta"
          data-cursor-label="Explore"
          data-cursor-tone="lime"
          className="inline-flex min-h-11 items-center font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-300 transition-colors duration-300 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/65 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Start with hospitality
        </a>
      }
    />
  );
}

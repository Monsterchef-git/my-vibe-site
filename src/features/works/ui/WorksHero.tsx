import { Hero, CulinaryTerm } from '@/design/primitives';

export default function WorksHero() {
  return (
    <Hero
      eyebrow="WORKS"
      statement={<CulinaryTerm term="tasting">Taste, applied.</CulinaryTerm>}
      counterLine="kitchens & interfaces. same instinct."
      tone="lime"
    />
  );
}

import Image from 'next/image';
import { Hero } from '@/design/primitives';
import {
  BLUR_ABOUT_PORTRAIT,
  IMAGE_ABOUT_PORTRAIT,
} from '@/lib/imageAssets';

export default function AboutHero() {
  return (
    <Hero
      eyebrow="ABOUT"
      statement="Mise en place for the web."
      counterLine="the kitchen taught me the rest."
      tone="white"
      sidePosition="background"
    >
      <div className="relative h-[80svh] w-full lg:h-full">
        <Image
          src={IMAGE_ABOUT_PORTRAIT}
          alt="Portrait of John Herrera"
          width={1240}
          height={1400}
          sizes="(min-width: 1536px) 42rem, (min-width: 1024px) 40rem, 100vw"
          placeholder="blur"
          blurDataURL={BLUR_ABOUT_PORTRAIT}
          priority
          className="h-full w-full object-cover object-[center_18%]"
        />
        {/* Mobile: dark bottom fade to protect statement */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.2)_40%,rgba(0,0,0,0.94)_100%)] lg:hidden"
        />
        {/* Desktop: black canvas bleeds into portrait from the left */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-full bg-[linear-gradient(90deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0.96)_28%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.1)_82%,rgba(0,0,0,0)_100%)] lg:block"
        />
        {/* Desktop: subtle bottom grounding */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-b from-transparent to-black/80 lg:block"
        />
      </div>
    </Hero>
  );
}

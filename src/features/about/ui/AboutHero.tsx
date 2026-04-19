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
          sizes="(min-width: 1536px) min(48rem,42vw), (min-width: 1024px) min(55vw,40rem), 100vw"
          placeholder="blur"
          blurDataURL={BLUR_ABOUT_PORTRAIT}
          priority
          className="h-full w-full object-cover object-[center_18%]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.14)_36%,rgba(0,0,0,0.84)_100%)] lg:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/3 bg-gradient-to-r from-black via-black/60 to-transparent lg:block"
        />
      </div>
    </Hero>
  );
}

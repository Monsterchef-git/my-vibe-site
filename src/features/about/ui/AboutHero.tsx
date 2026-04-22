import Image from 'next/image';
import { CulinaryTerm, Hero } from '@/design/primitives';
import {
  BLUR_ABOUT_CHEF_CUTOUT,
  IMAGE_ABOUT_CHEF_CUTOUT,
} from '@/lib/imageAssets';

export default function AboutHero() {
  return (
    <>
      <Hero
        eyebrow="ABOUT"
        statement={<CulinaryTerm term="mise en place">Mise en place for the web.</CulinaryTerm>}
        counterLine="the kitchen taught me the rest."
        tone="white"
        sidePosition="background"
      >
        <div className="relative hidden h-full w-full lg:block">
          <Image
            src={IMAGE_ABOUT_CHEF_CUTOUT}
            alt="Portrait of John Herrera cutting tomatoes"
            fill
            sizes="(min-width: 1024px) min(55vw, 40rem), 90vw"
            placeholder="blur"
            blurDataURL={BLUR_ABOUT_CHEF_CUTOUT}
            priority
            className="object-contain object-[center_18%] [filter:contrast(1.1)_saturate(0.95)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-soft-light [background-image:radial-gradient(circle_at_24%_22%,rgba(255,255,255,0.36)_0%,transparent_58%),repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_2px)]"
          />
        </div>
      </Hero>

      <section className="relative min-h-svh w-full overflow-hidden lg:hidden">
        <Image
          src={IMAGE_ABOUT_CHEF_CUTOUT}
          alt="Portrait of John Herrera cutting tomatoes"
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_ABOUT_CHEF_CUTOUT}
          loading="lazy"
          className="object-contain object-[center_22%] [filter:contrast(1.1)_saturate(0.95)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent via-black/45 to-black"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-soft-light [background-image:radial-gradient(circle_at_24%_22%,rgba(255,255,255,0.36)_0%,transparent_58%),repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_2px)]"
        />
      </section>
    </>
  );
}

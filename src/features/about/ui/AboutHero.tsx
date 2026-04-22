import Image from 'next/image';
import { CulinaryTerm, Hero } from '@/design/primitives';
import {
  BLUR_ABOUT_CHEF_CUTOUT,
  IMAGE_ABOUT_CHEF_CUTOUT,
} from '@/lib/imageAssets';

export default function AboutHero() {
  return (
    <Hero
      eyebrow="ABOUT"
      statement={<CulinaryTerm term="mise en place">Mise en place for the web.</CulinaryTerm>}
      counterLine="the kitchen taught me the rest."
      tone="white"
      index="03"
      next={{ label: 'CONTACT', href: '/contact' }}
      meta={{ city: 'MEDELLIN, CO', tag: 'CHAPTER 03' }}
      statusLineFadeRight
      sidePosition="background"
    >
      <div className="relative h-full w-full">
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
  );
}

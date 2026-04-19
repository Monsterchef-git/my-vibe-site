import Image from 'next/image';
import { Hero } from '@/design/primitives';
import {
  BLUR_ABOUT_PORTRAIT,
  IMAGE_ABOUT_PORTRAIT,
} from '@/lib/imageAssets';

export default function AboutHero() {
  return (
    <header className="-mx-6 md:-mx-24">
      <Hero
        eyebrow="ABOUT"
        statement="Mise en place for the web."
        counterLine="the kitchen taught me the rest."
        tone="white"
      >
        <div className="relative w-[min(40vw,26rem)] overflow-hidden rounded-xl">
          <Image
            src={IMAGE_ABOUT_PORTRAIT}
            alt="Portrait of John Herrera"
            width={1240}
            height={1400}
            sizes="(min-width: 1024px) 26rem, 40vw"
            placeholder="blur"
            blurDataURL={BLUR_ABOUT_PORTRAIT}
            priority
            className="h-auto w-full object-cover object-[center_28%]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_34%,rgba(0,0,0,0.36)_100%)]"
          />
        </div>
      </Hero>
    </header>
  );
}

import Image from 'next/image';
import AboutNameStamp from '@/components/AboutNameStamp';
import Eyebrow from '@/components/Eyebrow';
import InternalPageHeroFrame from '@/components/InternalPageHeroFrame';

export default function AboutHero() {
  return (
    <InternalPageHeroFrame contentClassName="justify-end">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end lg:gap-14">
        <div className="space-y-8">
          <Eyebrow role="muted">About --- John Herrera</Eyebrow>

          <AboutNameStamp />

          <p className="max-w-xl border-l border-white/10 pl-6 font-mono text-sm leading-relaxed text-zinc-400">
            A way of working shaped by kitchens, now carried into digital.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[280px] lg:mx-0 lg:justify-self-end">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.02] p-2 shadow-[0_24px_72px_rgba(0,0,0,0.28)]">
            <Image
              src="/images/about-john-herrera.png"
              alt="Portrait of John Herrera smiling while cooking."
              width={1656}
              height={2944}
              loading="eager"
              sizes="(min-width: 1024px) 280px, (min-width: 768px) 32vw, 72vw"
              className="h-auto w-full rounded-[1.5rem] bg-white object-cover object-center grayscale-[0.12]"
            />
          </div>
        </div>
      </div>
    </InternalPageHeroFrame>
  );
}

import type { Metadata } from 'next';
import PageIntroHero from '@/components/PageIntroHero';
import TopNav from '@/components/TopNav';
import AboutSection from '@/components/sections/AboutSection';

export const metadata: Metadata = {
  title: 'About | John Herrera',
  description:
    'Profile of John Herrera: creative chef in Medellin and builder of editorial digital experiences.',
};

export default function AboutPage() {
  return (
    <main
      id="main-content"
      className="relative z-0 min-h-screen bg-[#0a0a0a] px-6 pb-32 pt-28 text-white md:px-24 md:pt-32"
    >
      <TopNav currentPath="/about" />

      <PageIntroHero
        className="mb-20"
        eyebrow="About ———"
        tone="white"
        title={
          <h1 className="text-[clamp(3rem,11vw,9rem)] font-headline italic leading-[0.92] text-white">
            Years in kitchens.
            <br />
            <span className="text-[var(--accent-primary)] night-glow">Now across digital.</span>
          </h1>
        }
        description={
          <>
            Same discipline.
            <br />
            Different medium.
          </>
        }
      />

      <AboutSection id="about-profile" className="bg-zinc-950/70" />
    </main>
  );
}

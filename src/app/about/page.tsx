import type { Metadata } from 'next';
import PageIntroHero from '@/components/PageIntroHero';
import TopNav from '@/components/TopNav';
import AboutSection from '@/components/sections/AboutSection';

export const metadata: Metadata = {
  title: 'About | John Herrera',
  description:
    'Perfil de John Herrera: chef creativo en Medellín y constructor de experiencias digitales con enfoque editorial.',
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
            Cocina.
            <br />
            <span className="text-[var(--accent-primary)] night-glow">Código.</span>
          </h1>
        }
        description="El perfil detrás del servicio, la dirección creativa y la construcción digital: una misma obsesión por el detalle aplicada en dos medios distintos."
      />

      <AboutSection id="about-profile" className="bg-zinc-950/70" />
    </main>
  );
}

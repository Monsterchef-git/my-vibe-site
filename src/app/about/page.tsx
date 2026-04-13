import type { Metadata } from 'next';
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

      <AboutSection id="about-profile" className="mt-14 bg-zinc-950/70 md:mt-20" contactHref="/contact" />
    </main>
  );
}

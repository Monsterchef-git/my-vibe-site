import type { Metadata } from 'next';
import TopNav from '@/components/TopNav';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Contact | John Herrera',
  description:
    'Contacto para proyectos gastronómicos, experiencias privadas y trabajo de producto digital con John Herrera.',
};

export default function ContactPage() {
  return (
    <main
      id="main-content"
      className="relative z-0 min-h-screen bg-[#0a0a0a] px-6 pb-32 pt-28 text-white md:px-24 md:pt-32"
    >
      <TopNav currentPath="/contact" />

      <ContactSection className="bg-zinc-950/70" />
    </main>
  );
}

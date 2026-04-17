import type { Metadata } from 'next';
import TopNav from '@/components/shared/TopNav';
import { ContactSection } from '@/features/contact/ui';

export const metadata: Metadata = {
  title: 'Contact | John Herrera',
  description:
    'Contacto para proyectos gastronómicos, experiencias privadas y trabajo de producto digital con John Herrera.',
};

export default function ContactPage() {
  return (
    <main
      id="main-content"
      className="relative z-0 bg-[#0a0a0a] pt-28 text-white md:pt-32"
    >
      <TopNav currentPath="/contact" />

      <ContactSection className="bg-zinc-950/70" />
    </main>
  );
}

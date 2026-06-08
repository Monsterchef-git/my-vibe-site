'use client';

import { usePathname } from 'next/navigation';
import BackgroundTerminal from '@/components/BackgroundTerminal';
import LenisProvider from '@/components/LenisProvider';
import MagneticCursor from '@/components/MagneticCursor';
import ScrollReveal from '@/components/shared/ScrollReveal';
import PageTransition from '@/components/shared/PageTransition';

export default function AppEffects() {
  const pathname = usePathname();
  const showBackgroundTerminal = pathname === '/';

  return (
    <>
      <LenisProvider />
      {showBackgroundTerminal ? <BackgroundTerminal /> : null}
      <MagneticCursor />
      <ScrollReveal />
      <PageTransition />
    </>
  );
}

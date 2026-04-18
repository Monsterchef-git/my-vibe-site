'use client';

import BackgroundTerminal from '@/components/BackgroundTerminal';
import LenisProvider from '@/components/LenisProvider';
import MagneticCursor from '@/components/MagneticCursor';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function AppEffects() {
  return (
    <>
      <LenisProvider />
      <BackgroundTerminal />
      <MagneticCursor />
      <ScrollReveal />
    </>
  );
}

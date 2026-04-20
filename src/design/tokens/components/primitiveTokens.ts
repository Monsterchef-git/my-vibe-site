export type PrimitiveTone = 'neutral' | 'lime' | 'cyan' | 'blue';

export const primitiveToneClassNames: Record<PrimitiveTone, string> = {
  neutral: 'border-zinc-800/80 bg-zinc-950/70',
  lime: 'border-lime-400/20 bg-lime-400/5',
  cyan: 'border-cyan-400/20 bg-cyan-400/5',
  blue: 'border-blue-400/20 bg-blue-400/5',
};

export const sectionClassName =
  'relative px-6 py-24 md:px-8 md:py-40';

export const sectionChromedClassName =
  'border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl';

export const cardClassName =
  'border p-5 md:p-6 shadow-[var(--shadow-stitch-surface)] transition-all duration-300';

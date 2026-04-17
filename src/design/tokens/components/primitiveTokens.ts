export type PrimitiveTone = 'neutral' | 'lime' | 'cyan' | 'blue';

export const primitiveToneClassNames: Record<PrimitiveTone, string> = {
  neutral: 'border-zinc-800/80 bg-zinc-950/70',
  lime: 'border-lime-400/20 bg-lime-400/5',
  cyan: 'border-cyan-400/20 bg-cyan-400/5',
  blue: 'border-blue-400/20 bg-blue-400/5',
};

export const sectionClassName =
  'relative [overflow:clip] rounded-[3rem] border border-zinc-800/80 bg-zinc-950/70 p-6 md:p-8 backdrop-blur-xl';

export const cardClassName =
  'rounded-[2rem] border p-5 md:p-6 shadow-[var(--shadow-stitch-surface)] transition-all duration-300';

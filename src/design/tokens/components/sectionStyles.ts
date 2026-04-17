// Single source of truth for eyebrow and section text styles.

export const eyebrowBase =
  'font-mono text-[10px] uppercase tracking-[0.42em]';

export const eyebrowPrimary = `${eyebrowBase} text-zinc-500`;
export const eyebrowMuted = `${eyebrowBase} text-zinc-600`;
export const eyebrowDim = `${eyebrowBase} text-zinc-700`;

export const eyebrowTones = {
  lime: `${eyebrowBase} text-lime-400/60`,
  cyan: `${eyebrowBase} text-cyan-400/60`,
  blue: `${eyebrowBase} text-blue-400/60`,
  white: `${eyebrowBase} text-white/50`,
} as const;

export const sectionEyebrowClassName = eyebrowPrimary;

export const sectionIntroClassName = 'space-y-3';
export const sectionTitleClassName =
  'text-5xl md:text-7xl font-headline italic leading-none';
export const sectionBodyClassName =
  'max-w-4xl font-mono text-sm leading-relaxed text-zinc-400';

import { tracking } from '@/design/tokens/primitives/atmosphere';

// Single source of truth for eyebrow and section text styles.

export const eyebrowBase =
  `font-mono text-[12px] uppercase ${tracking.eyebrow}`;

export const eyebrowPrimary = `${eyebrowBase} text-zinc-400`;
export const eyebrowMuted = `${eyebrowBase} text-zinc-500`;
export const eyebrowDim = `${eyebrowBase} text-zinc-600`;

export const eyebrowTones = {
  lime: `${eyebrowBase} text-lime-300/78`,
  cyan: `${eyebrowBase} text-cyan-300/78`,
  blue: `${eyebrowBase} text-blue-300/78`,
  white: `${eyebrowBase} text-white/62`,
} as const;

export const sectionEyebrowClassName = eyebrowPrimary;

export const sectionGutterClassName = 'px-6 md:px-10 lg:px-16';

export const sectionIntroClassName = 'space-y-3';
export const sectionTitleClassName =
  'text-[clamp(2.5rem,14vw,4rem)] md:text-7xl font-headline italic leading-none';
export const sectionBodyClassName =
  'max-w-[36rem] font-mono text-[15px] leading-7 text-zinc-200/88 md:text-base md:leading-8';
export const sectionSupportClassName =
  'max-w-[34rem] font-mono text-sm leading-7 text-zinc-300/78 md:text-[15px]';
export const sectionMicroClassName =
  `font-mono text-[11px] uppercase ${tracking.label} text-zinc-500`;

export const glassDepth = {
  sheer: 'backdrop-blur-sm',
  frosted: 'backdrop-blur-xl',
  heavy: 'backdrop-blur-2xl',
} as const;

export const tracking = {
  eyebrow: 'tracking-[0.32em]',
  label: 'tracking-[0.24em]',
  dense: 'tracking-[-0.02em]',
} as const;

export const glowPreset = {
  lime: { color: '#cafd00', size: '60vw', opacity: 0.08 },
  cyan: { color: 'rgb(34 211 238)', size: '60vw', opacity: 0.06 },
  blue: { color: 'rgb(96 165 250)', size: '60vw', opacity: 0.06 },
  white: { color: '#ffffff', size: '50vw', opacity: 0.04 },
} as const;

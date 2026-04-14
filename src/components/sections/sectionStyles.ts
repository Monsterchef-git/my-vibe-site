// ── Eyebrow system ────────────────────────────────────────────────────────────
// Single source of truth for all eyebrow-level text across the site.
// Rule: text-[10px] fixed (no responsive override), tracking-[0.42em], uppercase.

export const eyebrowBase =
  'font-mono text-[10px] uppercase tracking-[0.42em]';

// Semantic roles — use these, never raw color classes on eyebrows
export const eyebrowPrimary = `${eyebrowBase} text-zinc-500`;   // section labels, page ids
export const eyebrowMuted   = `${eyebrowBase} text-zinc-600`;   // meta, contextual info
export const eyebrowDim     = `${eyebrowBase} text-zinc-700`;   // very secondary, spec keys

// Toned — for chapter separators and section bridges
export const eyebrowTones = {
  lime:  `${eyebrowBase} text-lime-400/60`,
  cyan:  `${eyebrowBase} text-cyan-400/60`,
  blue:  `${eyebrowBase} text-blue-400/60`,
  white: `${eyebrowBase} text-white/50`,
} as const;

// Legacy alias — kept for gradual migration, maps to primary
export const sectionEyebrowClassName = eyebrowPrimary;

// ── Section layout helpers ─────────────────────────────────────────────────────
export const sectionIntroClassName = 'space-y-3';
export const sectionTitleClassName  = 'text-5xl md:text-7xl font-headline italic leading-none';
export const sectionBodyClassName   = 'max-w-4xl font-mono text-sm leading-relaxed text-zinc-400';

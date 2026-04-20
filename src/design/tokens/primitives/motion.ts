// src/design/tokens/primitives/motion.ts

// Motion design tokens used across the UI for consistent timing and easing.
// All durations are in milliseconds.
export const motion = {
  // Fast transition for subtle UI feedback (e.g., hover, focus)
  durationFast: 120, // ≤ 120 ms
  // Medium transition for more noticeable state changes
  durationMedium: 250, // ≤ 250 ms
  // Easing curves (cubic‑bezier) matching the visual style
  easeCubic: 'cubic-bezier(0.22, 1, 0.36, 1)',
  easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
};

// Export individual tokens for convenient import
export const durationFast = motion.durationFast;
export const durationMedium = motion.durationMedium;
export const easeCubic = motion.easeCubic;
export const easeOut = motion.easeOut;

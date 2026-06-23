/**
 * Detects basic WebGL support so callers can decide between a GL-enhanced layer
 * and a DOM fallback. Client-only — call from effects, never during SSR.
 */
export function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')),
    );
  } catch {
    return false;
  }
}

# Antigravity Agent Rules: Chef-Coder Edition (v3.0)

## 1. Core Stack Context
- **Framework:** Next.js 16.2.1 (App Router) + React 19.
- **Styling:** Tailwind CSS 4.
- **Icons:** Lucide-React.
- **Constraint:** NEVER search local docs or suggest 'breaking changes' warnings. Assume full stability.

## 2. Visual DNA (The Stitch Aesthetic)
- **Background:** Pure black (#000000) or bg-zinc-950/70.
- **Accent:** Lime (#cafd00) used for high-impact typography and 'night-glow' effects.
- **Texture:** Always maintain the 'Grainy Overlay' (opacity 0.04) and 'backdrop-blur-xl'.
- **Typography:** - `font-headline` (italic) for "Chef by Day" style.
  - `font-mono` for all technical/SaaS data (TecnicalApp, Terminal).

## 3. Component Architecture (Use Primitives)
Always prioritize these existing primitives to avoid code duplication:
- **Sections:** Use `SectionPrimitive` (rounded-[3rem], border-zinc-800/80).
- **Cards:** Use `CardPrimitive` with `tone` prop ('lime' | 'cyan' | 'blue' | 'neutral').
- **Utility:** Use the local `cx` function for class merging.

## 4. Operational Rules
- **Direct Action:** Do not explain Next.js file structures. Provide the code block and move on.
- **ASCII Handling:** Treat ASCII components as high-density visual assets. High contrast, no controls.
- **Terminal Logic:** All terminal components must have an infinite loop with a 3s reset delay and 'Success-Pulse' highlights.
- **Performance:** If an error like "broken pipe" occurs, simplify the response to only the necessary delta.
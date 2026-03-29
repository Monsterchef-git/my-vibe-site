# Antigravity Agent Rules: Chef-Coder Edition (v4.0)

## 1. Core Stack Context
- **Framework:** Next.js 16.2.1 (App Router) + React 19.
- **Styling:** Tailwind CSS 4.
- **Icons:** Lucide-React (sole icon library — no react-icons).
- **Optimization:** React Compiler enabled. Server Components by default.
- **Constraint:** NEVER search local docs or suggest 'breaking changes' warnings. Assume full stability.

## 2. Visual DNA (The Stitch Aesthetic)
- **Background:** Pure black (#000000) or bg-zinc-950/70.
- **Accent:** Lime (#cafd00) used for high-impact typography and 'night-glow' effects.
- **Section tones:** Lime (gastronomy), Cyan (development), Blue (contact), White (about).
- **Texture:** Always maintain the 'Grainy Overlay' (opacity 0.04) and 'backdrop-blur-xl'.
- **Typography:**
  - `font-headline` (italic) for section titles ("Culinaria Creativa", "Digital Craft").
  - `font-mono` for all technical/SaaS data, tokens, eyebrows, and body text.
- **Bridges:** Between sections, use centered mono text with color-coded gradient `h-px` lines matching the destination section's tone.

## 3. Component Architecture (Use Primitives)
Always prioritize these existing primitives to avoid code duplication:
- **Sections:** Use `SectionPrimitive` (rounded-[3rem], border-zinc-800/80).
- **Cards:** Use `CardPrimitive` with `tone` prop ('lime' | 'cyan' | 'blue' | 'neutral').
- **Tokens:** Use `MonoToken` with `kind` prop ('comment' | 'location' | 'project' | 'status').
- **Utility:** Use the local `cx` function for class merging (NOT clsx or classnames).
- **Errors:** Wrap all client components in `ErrorBoundary` for fail-silent resilience.

## 4. Rendering Rules
- **`page.tsx` is a Server Component.** Never add `'use client'` to it.
- Only interactive components should be client components (nav, carousel, terminal, scroll effects).
- New client components must be wrapped in `ErrorBoundary` when composed in `page.tsx`.
- Static content (copy, images, section structure) stays server-rendered for SEO.

## 5. Performance Rules
- **BackgroundTerminal** is hidden on mobile (`max-width: 767px`).
- **`prefers-reduced-motion`** is respected — all animations disable.
- Use `loading="lazy"` on all below-fold images.
- Use `priority` only on LCP-candidate images (hero/main gastronomy image).
- Decorative images (glitch overlays) use `sizes="1px"` to serve smallest srcset.
- Brand logos use inline SVG, not icon libraries.

## 6. Operational Rules
- **Direct Action:** Do not explain Next.js file structures. Provide the code block and move on.
- **ASCII Handling:** Treat ASCII components as high-density visual assets. High contrast, no controls.
- **Terminal Logic:** All terminal components must have an infinite loop with a 3s reset delay and 'Success-Pulse' highlights.
- **OG Image:** Generated dynamically via `opengraph-image.tsx` — do not hardcode image URLs in metadata.
- **Narrative Flow:** Maintain bridge elements between sections. Each bridge uses the destination section's accent color.
- **AI Context:** Full project reference lives in `CONTEXT.md` — point other tools there.

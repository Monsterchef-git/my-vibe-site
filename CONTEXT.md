# Project Context — John Herrera Personal Site

> AI-readable reference for any tool working on this codebase.
> Last updated: 2026-03-29.

## Identity

- **Owner:** John Herrera — creative chef & vibe-coder based in Medellin, Colombia.
- **Concept:** "Chef by Day, Vibe-Coder by Night" — a personal portfolio that presents two disciplines under one brand: culinary direction and digital product craft.
- **Domain:** johnherrerachef.com
- **Language:** Spanish (es_CO). Section titles mix Spanish and English for stylistic effect.

## Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.1 |
| UI | React | 19.2.4 |
| Language | TypeScript (strict) | 5+ |
| Styling | Tailwind CSS | 4 |
| Icons | Lucide React | 1.7+ |
| Build | Turbopack (build) / Webpack (dev) | — |
| Optimization | React Compiler | 1.0.0 |

**No other UI libraries.** `react-icons` was removed — brand logos (Apple) use inline SVG.

## Architecture

### Rendering Strategy
- `page.tsx` is a **Server Component**. All static content (hero, about, gastronomy copy, footer) is pre-rendered at build time.
- Interactive components are **Client Component islands** that hydrate on top:
  - `ScrollReveal.tsx` — IntersectionObserver for `.reveal` class animations.
  - `FloatingNav.tsx` — bottom nav bar with section tracking.
  - `StitchCardStack.tsx` — 3D project carousel (5 projects).
  - `TypewriterTerminal.tsx` — terminal typewriter animation.
- `BackgroundTerminal.tsx` is a Server Component (static HTML, CSS-only animation).
- All client components are wrapped in `ErrorBoundary` for fail-silent resilience.

### File Map

```
src/
├── app/
│   ├── layout.tsx              # Root layout, metadata, OG config, BackgroundTerminal
│   ├── page.tsx                # Main page (Server Component), all sections composed here
│   ├── globals.css             # Global styles, animations, grain, terminal scroll, culinary effects
│   ├── opengraph-image.tsx     # Dynamic OG image generation (1200x630, fork logo + headline)
│   └── twitter-image.tsx       # Re-exports opengraph-image for Twitter cards
├── components/
│   ├── primitive.tsx           # SectionPrimitive, CardPrimitive, cx() utility, tone system
│   ├── MonoToken.tsx           # Styled inline tokens (comment | location | project | status)
│   ├── BackgroundTerminal.tsx  # Fixed backdrop with scrolling terminal logs (Server Component)
│   ├── FloatingNav.tsx         # Bottom navigation with 5 section buttons
│   ├── ScrollReveal.tsx        # Scroll-triggered reveal animations
│   ├── StitchCardStack.tsx     # 3D card stack carousel for projects
│   ├── TypewriterTerminal.tsx  # Terminal typewriter effect with infinite loop
│   ├── LandingCard.tsx         # Individual project card used inside StitchCardStack
│   └── ErrorBoundary.tsx       # Generic error boundary (fail-silent, logs to console)
public/
├── images/
│   ├── og-fork.png             # Fork-circuit brand icon (source for OG + favicons)
│   ├── culinary-*.jpeg         # 4 gastronomy photos
│   ├── isolution.png           # iSolution Lab project screenshot
│   ├── meghans.png             # Meghan's Momentum project screenshot
│   ├── medical.png             # Lleras Medical project screenshot
│   ├── spa.png                 # Spa Lleras project screenshot
│   ├── blue-moon-hero.png      # Blue Moon Cottage project screenshot
│   └── tecnicalapp.png         # TecnicalApp project screenshot
├── apple-touch-icon.png        # 180x180 favicon
├── favicon-32x32.png           # 32x32 favicon
└── favicon-16x16.png           # 16x16 favicon
```

## Visual System

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#000000` / `bg-zinc-950/70` | Page bg, section panels |
| Lime | `#cafd00` | Primary accent, glow, gastronomy tone, status indicators |
| Cyan | `rgb(34 211 238)` | Development tone, project links |
| Blue | `rgb(96 165 250)` | Contact tone, some project cards |
| White | `#ffffff` | About section nav active state |
| Grain | SVG noise at opacity 0.04 | Global overlay + per-card texture |
| Glass | `backdrop-blur-xl` + semi-transparent borders | Cards, nav, header badge |
| Typography | `font-headline` (italic) for titles, `font-mono` for data/tokens | Consistent across sections |

### Key CSS Classes
- `.reveal` / `.reveal.active` — scroll-triggered fade-in with scale.
- `.night-glow` — lime text-shadow effect.
- `.hover-glitch` — 0.3s cubic-bezier color shift on hover.
- `.tight-headline` — letter-spacing tightens on hover.
- `.culinary-glitch-card` — hover glow, scanline, noise effects on gastronomy images.
- `.background-terminal-scroll` — infinite translateY animation for backdrop.
- `.grainy-bg` — inline grain texture per element.

## Page Sections (Narrative Flow)

The page follows a deliberate narrative arc:

1. **Hero** (`#hero`) — "Chef by Day, Vibe-Coder by Night" declaration. Lime glow headline. Short tagline: "Dos disciplinas, un mismo estandar."
2. **About** (`#about`) — Two-column layout: bio narrative (left) + spec sheet terminal (right). Covers 10+ years in kitchens, transition to code, current roles.
3. **Bridge** — `"Lo que cocino _"` with lime gradient lines.
4. **Gastronomy** (`#gastronomy`) — "Culinaria Creativa". Photo grid (2x2 main + 3 side cards) with glitch/scanline effects. Wink Eventos, private dining, culinary metrics display.
5. **Bridge** — `"Lo que construyo _"` with cyan gradient lines.
6. **Development** (`#development`) — "Digital Craft". StitchCardStack (5 projects) + TecnicalApp panel with TypewriterTerminal.
7. **Bridge** — Vertical line + closing phrase: "Si tu proyecto necesita la misma precision que un plato bien ejecutado — hablemos."
8. **Contact** (`#contact`) — Giant email typography CTA + social links (Instagram, GitHub, LinkedIn) + footer info.

### Featured Projects (in StitchCardStack)
1. **iSolution Lab** — Apple repair lab landing (isolution.com.co)
2. **Meghan's Momentum** — Ethical taxidermy artist portfolio (meghansmomentumstudios.com)
3. **Spa Lleras** — Wellness booking landing (spalleras.com)
4. **Lleras Medical** — Premium IV therapy site (llerasmedicallounge.com)
5. **Blue Moon Cottage** — Hospitality booking + branding (bluemoonhopetown.com)

### Sidebar Project
- **TecnicalApp** — SaaS landing for auto repair shops (tecnical.app). Includes live terminal animation.

## SEO & Social

- **OG Image:** Dynamically generated via `opengraph-image.tsx` — black background, fork-circuit logo, "JOHN HERRERA / CULINARY ENGINE", `$ git commit -m 'umami'` in lime monospace.
- **Twitter Card:** `summary_large_image`, same generated image.
- **Favicons:** Fork-circuit icon at 16px, 32px, 180px (apple-touch).
- **Metadata:** Title "John Herrera | Creative Chef & Vibe-Coder", locale es_CO.

## Performance Decisions

- **BackgroundTerminal hidden on mobile** (`max-width: 767px`) — saves GPU on phones.
- **`will-change: transform`** on terminal scroll tracks.
- **`prefers-reduced-motion`** respected — disables all animations.
- **Culinary hero image** has `priority` for LCP optimization.
- **Glitch overlay images** use `sizes="1px"` + `loading="lazy"` — decorative, only load smallest srcset.
- **All below-fold images** use explicit `loading="lazy"`.
- **Single icon library** (Lucide) — no duplicate dependencies.
- **Error boundaries** wrap all client components — page never crashes entirely.

## Component Conventions

- **Sections** use `SectionPrimitive` — `rounded-[3rem]`, `border-zinc-800/80`, `backdrop-blur-xl`.
- **Cards** use `CardPrimitive` with `tone` prop: `'lime'` | `'cyan'` | `'blue'` | `'neutral'`.
- **Class merging** uses local `cx()` function (not clsx/classnames).
- **Inline tokens** use `MonoToken` with `kind` prop: `'comment'` | `'location'` | `'project'` | `'status'`.
- **Terminal components** must loop infinitely with a 3s reset delay.

## Dev Server

```bash
npm install
npm run dev          # Webpack dev server on port 3000
npm run build        # Production build (Turbopack)
npm run lint         # ESLint 9
```

Config at `.claude/launch.json` for Claude Code preview integration.

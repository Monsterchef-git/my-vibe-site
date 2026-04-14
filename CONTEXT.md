# Project Context — John Herrera Personal Site

> AI-readable reference for any tool working on this codebase.
> Last updated: 2026-04-13.

## Identity

- **Owner:** John Herrera — creative chef focused on digital craft based in Medellin, Colombia.
- **Concept:** "Chef by Day, Digital Craft by Night" — a personal portfolio that presents two disciplines under one brand: culinary direction and digital product craft.
- **Domain:** johnherrerachef.com
- **Language:** Spanish (es_CO). Section titles mix Spanish and English for stylistic effect.
- **Current direction:** Premium editorial. Less overt UI/terminal ornament, more typography, whitespace, image presence, and restrained motion.

## Voice Rules

The voice should feel authored, precise, and premium.
It should come from practice, not self-promotion.

### Writing Principles

- Prefer concrete language over abstract claims.
- Avoid repeated use of words like precision, detail, narrative, obsession, standard.
- Gastronomy should feel physical, sensorial, and service-led.
- Digital should feel structured, calm, and intellectually clear.
- About should read as position, not autobiography.
- Contact should feel selective, minimal, and direct.
- Never sound like an agency.
- Never oversell.
- Keep a strong editorial restraint.

### Preferred Copy Direction

- **Home**
  - Prefer:
    - `Two disciplines.`
    - `One standard.`
    - `Service. Structure. Taste.`
  - Over:
    - `Two disciplines. One standard.`
    - `A practice grounded in service, structure, and taste.`

- **Works**
  - Prefer:
    - `Different materials.`
    - `Different tempos.`
    - `Same discipline.`
  - Over:
    - `Two bodies of work. Different materials, different tempos, same level of care.`

- **Gastronomy**
  - Prefer:
    - `Product.`
    - `Timing.`
    - `Service.`
    - `Atmosphere.`
  - Over:
    - `From private dinners to hospitality concepts, the work begins with product and ends with the full rhythm of service.`

- **Digital**
  - Prefer:
    - `Less noise.`
    - `More order.`
    - `Stronger presence.`
  - Over:
    - `A quieter kind of digital work: thoughtful structure, editorial clarity, and performance where it matters.`

- **About**
  - Prefer an entry closer to:
    - `Years in kitchens.`
    - `Now across digital.`
    - `Same discipline.`
    - `Different medium.`
  - Then follow with a more human paragraph below.

- **Contact**
  - Prefer:
    - `Private inquiries.`
  - Over:
    - `Selected commissions and private inquiries.`

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
- `page.tsx` is a **Server Component** and currently acts as a focused brand entry hero, not a long single-page landing.
- Internal pages (`/works`, `/about`, `/contact`) also render as **Server Components** and compose shared sections/primitives.
- Interactive components remain **Client Component islands**:
  - `TopNav.tsx` — primary route navigation.
  - `ScrollReveal.tsx` — reveal triggers where needed.
  - `WorksList.tsx` — hover-driven project list treatment.
  - `HeroTypewriter.tsx`, `MagneticCursor.tsx`, `PageLoader.tsx` — controlled motion layers.
- `BackgroundTerminal.tsx` is a Server Component (static HTML, CSS-only animation).
- Client components should be wrapped in `ErrorBoundary` when composed from route-level Server Components.

### File Map

```
src/
├── app/
│   ├── layout.tsx              # Root layout, metadata, OG config, BackgroundTerminal
│   ├── page.tsx                # Home hero (Server Component)
│   ├── works/page.tsx          # Editorial intro + gastronomy/development chapters
│   ├── about/page.tsx          # Editorial intro + profile section
│   ├── contact/page.tsx        # Contact route with oversized email CTA
│   ├── not-found.tsx           # Custom 404 error page
│   ├── robots.ts               # Search engine robots configuration
│   ├── sitemap.ts              # Search engine sitemap generator
│   ├── globals.css             # Global styles, animations, grain, terminal scroll, culinary effects
│   ├── opengraph-image.tsx     # Dynamic OG image generation (1200x630, fork logo + headline)
│   └── twitter-image.tsx       # Re-exports opengraph-image for Twitter cards
├── components/
│   ├── primitive.tsx           # SectionPrimitive, CardPrimitive, cx() utility, tone system
│   ├── MonoToken.tsx           # Styled inline tokens (comment | location | project | status)
│   ├── BackgroundTerminal.tsx  # Fixed backdrop with scrolling terminal logs (Server Component)
│   ├── TopNav.tsx              # Route navigation
│   ├── LenisProvider.tsx       # Smooth scrolling wrapper
│   ├── MagneticButton.tsx      # Magnetic hover button physics
│   ├── PageLoader.tsx          # Initial loading animation sequence
│   ├── PageIntroHero.tsx       # Shared editorial page-intro hero for internal routes
│   ├── ScrollReveal.tsx        # Scroll-triggered reveal animations
│   ├── ScrambleText.tsx        # Character scramble treatment for select copy
│   ├── TypewriterTerminal.tsx  # Terminal typewriter effect with infinite loop
│   ├── WorksList.tsx           # Editorial project list with hover reveal
│   └── ErrorBoundary.tsx       # Generic error boundary (fail-silent, logs to console)
public/
├── images/
│   ├── og-fork.png             # Fork-circuit brand icon (source for OG + favicons)
│   ├── culinary-*.jpeg         # Gastronomy images
│   └── *.png                   # Project screenshots and social assets
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
- `.night-glow-cyan` — cyan text-shadow treatment for digital craft.
- `.tight-headline` — headline tracking behavior where applied.
- `.background-terminal-scroll` — infinite translateY animation for backdrop.
- `.grainy-bg` — inline grain texture per element.

## Route Map (Narrative Flow)

The experience is now split across dedicated routes:

1. **Home** (`/`) — Brand statement only. Large hero lockup, minimal copy, mono subline from Medellin.
2. **Works** (`/works`) — Uses `PageIntroHero`, then breaks into two chapters:
   - `01` **Gastronomy** — restrained image-led grid, premium service copy, hover-responsive photography.
   - `02` **Digital Craft** — editorial list of projects via `WorksList`.
3. **About** (`/about`) — Uses `PageIntroHero` and a profile section with stats, bio, and spec rail.
4. **Contact** (`/contact`) — Large email lockup, social links, and location/work footer notes.

### Works List Projects
1. **tecnical.app** — SaaS / Next.js
2. **iSolution Lab** — Landing / Apple
3. **Meghan's Momentum** — Editorial
4. **Spa Lleras** — Landing / Wellness
5. **Lleras Medical** — Landing / Salud
6. **Blue Moon Cottage** — Hospitalidad

## SEO & Social

- **OG Image:** Dynamically generated via `opengraph-image.tsx` — black background, fork-circuit logo, "JOHN HERRERA / CULINARY ENGINE", `$ git commit -m 'umami'` in lime monospace.
- **Twitter Card:** `summary_large_image`, same generated image.
- **Favicons:** Fork-circuit icon at 16px, 32px, 180px (apple-touch).
- **Metadata:** Title "John Herrera | Creative Chef & Digital Craft", locale es_CO.

## Performance Decisions

- **BackgroundTerminal hidden on mobile** (`max-width: 767px`) — saves GPU on phones.
- **`will-change: transform`** on terminal scroll tracks.
- **`prefers-reduced-motion`** respected — disables all animations.
- **Culinary hero image** has `priority` for LCP optimization.
- **All below-fold images** use explicit `loading="lazy"`.
- **Single icon library** (Lucide) — no duplicate dependencies.
- **Error boundaries** wrap all client components — page never crashes entirely.

## Component Conventions

- **Sections** use `SectionPrimitive` — `rounded-[3rem]`, `border-zinc-800/80`, `backdrop-blur-xl`.
- **Cards** use `CardPrimitive` with `tone` prop: `'lime'` | `'cyan'` | `'blue'` | `'neutral'`.
- **Class merging** uses local `cx()` function (not clsx/classnames).
- **Inline tokens** use `MonoToken` with `kind` prop: `'comment'` | `'location'` | `'project'` | `'status'`.
- **Terminal components** must loop infinitely with a 3s reset delay.
- **Page intros** for internal pages should prefer `PageIntroHero` over ad-hoc hero sections.
- **Section numbering** in the current editorial order is `01` Gastronomía, `02` Digital Craft, `03` Sobre mí, `04` Contacto.

## Dev Server

```bash
npm install
npm run dev          # Webpack dev server on port 3000
npm run build        # Production build (Turbopack)
npm run lint         # ESLint 9
```

Config at `.claude/launch.json` for Claude Code preview integration.

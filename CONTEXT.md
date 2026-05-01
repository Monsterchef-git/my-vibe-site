# Project Context — John Herrera Personal Site

> AI-readable reference for tools working on this codebase.
> Last updated: 2026-05-01.

## Identity

- **Owner:** John Herrera — chef and web developer based in Medellin, Colombia.
- **Concept:** "Cooked fast. Shipped faster." A personal portfolio that presents kitchen craft and digital product work under one editorial identity.
- **Domain:** johnherrerachef.com
- **Language:** Current implementation uses English metadata and route copy (`lang="en"`, `locale: en_US`). Some culinary/domain words remain intentionally bilingual.
- **Current direction:** Dark editorial portfolio with tactile kitchen references, restrained motion, high-contrast typography, and a lime/cyan/blue signal system.

## Voice Rules

The voice should feel authored, precise, and direct. It should come from practice, not self-promotion.

### Writing Principles

- Prefer concrete language over abstract claims.
- Keep copy short, tactile, and confident.
- Gastronomy should feel physical, service-led, and sensory.
- Digital should feel structured, calm, and clear.
- About should read as position, not autobiography.
- Contact should feel selective, minimal, and direct.
- Never sound like an agency.
- Never oversell.
- Avoid repeated use of words like precision, detail, narrative, obsession, standard.

### Current Copy Anchors

- **Home:** `Cooked fast. Shipped faster.`
- **Home counterline:** `twelve years plating. now shipping interfaces.`
- **Works:** `Taste, applied. Kitchens and interfaces, same instinct.`
- **About:** `Mise en place for the web. The kitchen taught me the rest.`
- **Contact:** `The pass is open. Briefs, reservations, collaborations.`

## Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js App Router | 16.2.1 |
| UI | React | 19.2.4 |
| Language | TypeScript | 5+ |
| Styling | Tailwind CSS | 4 |
| Motion / scroll | Lenis + local hooks | 1.3+ |
| Optimization | React Compiler | 1.0.0 |
| Icons | Lucide React only when icons are needed | AGENTS rule |

`react-icons`, `clsx`, and `classnames` are not dependencies. Use local SVGs/inline SVG for brand marks and `cx()` for class merging.

## Commands

```bash
npm install
npm run dev      # next dev . --webpack
npm run lint     # ESLint 9
npm run build    # next build --webpack
npm start        # next start
```

`next.config.ts` enables `reactCompiler`, security headers, image formats (`avif`, `webp`), compression, and a Turbopack root. Package scripts currently force Webpack for dev and build.

## Architecture

### Rendering Strategy

- Route `page.tsx` files are Server Components and must stay that way.
- Route pages live in `src/app/(site)/` and export `dynamic = 'force-static'`.
- Interactive behavior is isolated in Client Components:
  - `AppEffects.tsx` mounts Lenis, MagneticCursor, ScrollReveal, and the home-only BackgroundTerminal.
  - `TopNav.tsx` handles route navigation.
  - `ScrollProgressBlock.tsx` and `useScrollProgress.ts` power scroll-reactive surfaces.
  - `HomeNameScramble.tsx`, `WorksList.tsx`, and `GastronomyHorizontalGallery.tsx` handle section-specific interactions.
- Client components used from route-level Server Components should be wrapped in `ErrorBoundary`.
- Static copy, SEO metadata, route structure, and JSON-LD remain server-rendered.

### File Map

```text
src/
├── app/
│   ├── layout.tsx                 # Root metadata, JSON-LD, tracking, AppEffects, grain/static overlays
│   ├── globals.css                # Global tokens, effects, animations, responsive motion rules
│   ├── (site)/
│   │   ├── page.tsx               # Home hero + editorial section
│   │   ├── works/page.tsx         # Works hero + gastronomy/development chapters
│   │   ├── about/page.tsx         # About hero + profile section
│   │   └── contact/page.tsx       # Contact section
│   ├── not-found.tsx              # Custom 404
│   ├── robots.ts                  # Robots output
│   ├── sitemap.ts                 # Sitemap output
│   ├── opengraph-image.tsx        # Dynamic OG image
│   └── twitter-image.tsx          # Reuses OG image for Twitter cards
├── components/
│   ├── AppEffects.tsx             # Client-only global effects switchboard
│   ├── BackgroundTerminal.tsx     # Home-only terminal backdrop
│   ├── GoogleTracking*.tsx        # Optional GTM/GA behavior
│   ├── LenisProvider.tsx          # Smooth scroll provider
│   ├── MagneticCursor.tsx         # Custom cursor layer
│   └── shared/
│       ├── ErrorBoundary.tsx
│       ├── TopNav.tsx
│       ├── ScrollProgressBlock.tsx
│       ├── ScrollReveal.tsx
│       ├── ScrambleText.tsx
│       ├── SiteStatusBar.tsx
│       └── InternalPageHeroFrame.tsx
├── design/
│   ├── primitives/
│   │   ├── SectionPrimitive.tsx
│   │   ├── MonoToken.tsx
│   │   ├── Eyebrow.tsx
│   │   ├── Hero/
│   │   ├── AmbientGlow/
│   │   └── CulinaryTerm/
│   ├── tokens/
│   │   ├── primitives/
│   │   ├── semantic/
│   │   └── components/
│   └── ui/
│       └── SectionChrome.tsx
├── features/
│   ├── about/ui/
│   ├── contact/ui/
│   ├── development/data/
│   ├── development/ui/
│   ├── gastronomy/ui/
│   ├── home/ui/
│   └── works/ui/
├── lib/
│   ├── constants.ts               # Site constants and per-route SEO
│   ├── imageAssets.ts             # Shared image references
│   ├── hooks/
│   └── utils/
│       ├── cx.ts
│       └── useAnimationFrame.ts
├── assets/
├── config/
├── content/
└── types/
```

## Route Map

1. **Home** (`/`) — `TopNav`, `Hero`, `HomeNameScramble`, `ScrollProgressBlock`, and `HomeEditorialSection`.
2. **Works** (`/works`) — `WorksHero`, route filters, `GastronomySection`, and `DevelopmentSection`.
3. **About** (`/about`) — `AboutHero` and `AboutSection`.
4. **Contact** (`/contact`) — `ContactSection`.

### Works Projects

Project data is maintained in `src/features/development/data/projects.ts`.

1. **tecnical.app** — SaaS / Next.js
2. **iSolution Lab** — Landing / Apple
3. **Meghan's Momentum** — Editorial
4. **Spa Lleras** — Landing / Wellness
5. **Lleras Medical** — Landing / Salud
6. **Blue Moon Cottage** — Hospitalidad

## Visual System

| Token / Pattern | Value | Usage |
|-----------------|-------|-------|
| Background | `#000000`, `#0a0a0a`, `bg-zinc-950/70` | Page bg and panels |
| Lime | `#cafd00` / `202 253 0` | Primary signal, gastronomy, CTA glow |
| Cyan | `rgb(34 211 238)` | Development tone |
| Blue | `rgb(96 165 250)` | Contact tone |
| White | `#ffffff` | About/nav active/high contrast |
| Grain | SVG noise around `0.03-0.04` opacity | Global texture |
| Glass | `backdrop-blur-xl` plus translucent borders | Nav and surface depth |
| Typography | `font-headline` and `font-mono` | Headlines, tokens, technical copy |

### Key CSS / Effects

- `.signal-static-bg` and `.signal-static-overlay` — global static texture.
- `.night-glow` / `.night-glow-cyan` — accent glow text treatments.
- `.scroll-progress-block` variants — scroll-reactive sections.
- `.background-terminal-scroll` — terminal backdrop movement.
- `.mono-token` variants — comment/location/project/status tokens.
- Motion rules must respect `prefers-reduced-motion`.

## Component Conventions

- **Design primitives** live in `src/design/primitives/`.
- **Composed design-system UI** lives in `src/design/ui/`.
- **Feature-specific UI** lives in `src/features/*/ui/`.
- **Shared app UI** lives in `src/components/shared/`.
- **Global app effects** may live in `src/components/`.
- **Shared logic** lives in `src/lib/`.
- Use `cx()` from `src/lib/utils/cx.ts`; do not introduce `clsx` or `classnames`.
- Prefer existing tokens from `src/design/tokens/` before adding new Tailwind literals.
- Do not put business logic inside `src/design/`.

## SEO, Metadata, and Analytics

- `src/lib/constants.ts` owns `SITE_URL`, `SITE_TITLE`, `SITE_DESCRIPTION`, `PERSON_IMAGE`, and `PAGE_SEO`.
- Root metadata and site/person JSON-LD live in `src/app/layout.tsx`.
- Each route defines its own metadata and page JSON-LD from `PAGE_SEO`.
- Dynamic OG image generation lives in `src/app/opengraph-image.tsx`.
- `twitter-image.tsx` reuses the generated OG image.
- Optional analytics env vars:
  - `NEXT_PUBLIC_GTM_ID`
  - `NEXT_PUBLIC_GA_ID`
- Custom event helpers are implemented in `GoogleTrackingEvents.tsx`.

## Performance and Accessibility Decisions

- `BackgroundTerminal` is mounted only on `/` through `AppEffects`.
- `BackgroundTerminal` must stay hidden on mobile (`max-width: 767px`).
- `prefers-reduced-motion` should disable animation-heavy behavior.
- Use `priority` only for LCP images.
- Use `loading="lazy"` for below-fold images.
- Decorative overlays should not add meaningful accessibility content.
- Keep focus states visible on navigation and CTAs.
- Maintain skip link support via `#main-content`.

## Security and Deployment

Global headers are configured in `next.config.ts`:

- `Content-Security-Policy`
- `Permissions-Policy`
- `Cross-Origin-Opener-Policy`
- `Cross-Origin-Resource-Policy`
- `Strict-Transport-Security`
- `X-DNS-Prefetch-Control`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`

CI is defined in `.github/workflows/ci.yml` and runs:

1. `npm ci`
2. `npm run lint`
3. `npm run build`

## Agent Notes

- Follow `AGENTS.md` first for operational rules.
- Before adding components, search `src/design/primitives/`, `src/design/ui/`, and `src/features/*/ui/`.
- If a requested change requires large moves to match the target architecture, propose the migration and get confirmation before moving files.
- At the end of important tasks, summarize documentation or structure changes clearly.

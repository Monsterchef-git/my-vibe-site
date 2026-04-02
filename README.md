# John Herrera | Creative Chef & Vibe-Coder

Personal portfolio site — "Chef by Day, Vibe-Coder by Night."

Culinary direction and digital product craft from Medellin, Colombia.

## Stack

- **Next.js 16.2.1** (App Router, React Compiler)
- **React 19** with Server Components + Client Component islands
- **TypeScript** (strict mode)
- **Tailwind CSS 4**
- **Lucide React** (single icon library)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run lint
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, metadata, OG tags, BackgroundTerminal
│   ├── page.tsx                # Home page (Server Component)
│   ├── not-found.tsx           # Custom 404 error page
│   ├── robots.ts               # Search engine robots configuration
│   ├── sitemap.ts              # Search engine sitemap generator
│   ├── globals.css             # Global styles, animations, visual effects
│   ├── opengraph-image.tsx     # Dynamic OG image (1200x630)
│   └── twitter-image.tsx       # Twitter card image (re-exports OG)
├── components/
│   ├── primitive.tsx           # SectionPrimitive, CardPrimitive, cx(), tone system
│   ├── MonoToken.tsx           # Styled inline code tokens
│   ├── BackgroundTerminal.tsx  # Fixed scrolling terminal backdrop
│   ├── FloatingNav.tsx         # Bottom navigation bar (5 sections)
│   ├── LenisProvider.tsx       # Smooth scrolling wrapper
│   ├── LiveScanMetrics.tsx     # Culinary metrics scanning animation
│   ├── MagneticButton.tsx      # Magnetic hover button physics
│   ├── PageLoader.tsx          # Initial loading animation sequence
│   ├── ProvenanceTokens.tsx    # Ingredient tags with hover image previews
│   ├── ScrollReveal.tsx        # Scroll-triggered reveal animations
│   ├── SplitReveal.tsx         # Text splitting scroll animation
│   ├── StitchCardStack.tsx     # 3D project carousel
│   ├── LandingCard.tsx         # Project card component
│   ├── TypewriterTerminal.tsx  # Terminal typewriter effect
│   └── ErrorBoundary.tsx       # Fail-silent error boundary
public/
├── images/                     # Project screenshots, culinary photos, provenance images
├── apple-touch-icon.png        # 180x180 favicon
├── favicon-32x32.png           # 32x32 favicon
└── favicon-16x16.png           # 16x16 favicon
```

## Page Sections

1. **Hero** — Brand declaration with lime glow typography
2. **About** — Bio + spec sheet terminal (two-column)
3. **Gastronomy** — Culinary work: photo grid with glitch effects
4. **Development** — Digital projects: 3D card stack + TecnicalApp terminal
5. **Contact** — Email CTA + social links

Sections are connected by narrative bridge elements ("Lo que cocino _", "Lo que construyo _") with color-coded gradient lines.

## Architecture Highlights

- `page.tsx` is a Server Component — static content is pre-rendered for SEO
- Interactive pieces (nav, carousel, terminal) hydrate as Client Component islands
- All client components wrapped in `ErrorBoundary` for resilience
- OG image generated at build time via `next/og` (fork-circuit logo + "Culinary Engine")
- BackgroundTerminal disabled on mobile for GPU savings
- `prefers-reduced-motion` fully respected

## Visual System

- **Background:** `#000000` with grain overlay
- **Accent:** Lime `#cafd00` (gastronomy), Cyan (development), Blue (contact)
- **Glass:** `backdrop-blur-xl` + semi-transparent borders
- **Typography:** `font-headline` (italic titles), `font-mono` (data/terminal)
- **Primitives:** `SectionPrimitive` and `CardPrimitive` with `tone` prop

## AI Context

See [CONTEXT.md](./CONTEXT.md) for a comprehensive AI-readable reference covering architecture, visual system, narrative flow, component conventions, and performance decisions.

## Notes

- This is a portfolio/marketing site, not a reusable package
- No environment variables required
- Domain: johnherrerachef.com

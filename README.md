# John Herrera | Creative Chef & Digital Craft

Personal site built as an editorial portfolio for John Herrera.

The project presents two practices under one signature: premium culinary direction and digital product craft from Medellin, Colombia.

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

## Editorial Direction

- Premium editorial reading over explicit "tech UI" treatment
- Black base, lime/cyan/blue section tones, grain overlay, `backdrop-blur-xl`
- `font-headline` for expressive section titles and `font-mono` for data, labels, and body copy
- Shared section chrome and intro heroes so internal pages echo the home without duplicating it

## Analytics

Set these optional environment variables to enable Google tracking globally:

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

- `NEXT_PUBLIC_GTM_ID`: enables Google Tag Manager
- `NEXT_PUBLIC_GA_ID`: enables direct GA4 installation
- If your GA4 property is already firing through GTM, leave `NEXT_PUBLIC_GA_ID` empty to avoid duplicate page views.

## Production

```bash
npm run lint
npm run build
npm start
```

## Routes

- `/` — minimal hero statement and brand entry point
- `/works` — editorial intro + chapter split for gastronomy and digital work
- `/about` — editorial intro + profile section
- `/contact` — large-format email CTA and social links

## Active Building Blocks

- `PageIntroHero.tsx` provides the shared editorial hero used on `works` and `about`
- `SectionChrome.tsx` handles section index, label, meta, and the shared CTA treatment
- `GastronomySection.tsx` is now a restrained image-led grid with hover response, not a glitch-heavy feature block
- `DevelopmentSection.tsx` uses `WorksList.tsx` for a cleaner editorial project list
- `ContactSection.tsx` focuses on the email lockup and social links
- `primitive.tsx` contains `SectionPrimitive`, `CardPrimitive`, and `cx()`

## Architecture Highlights

- `page.tsx` remains a Server Component
- Internal pages reuse the same visual grammar through shared primitives instead of cloning layouts
- Interactive pieces stay isolated as Client Components and are composed through `ErrorBoundary`
- OG imagery is generated dynamically in `opengraph-image.tsx`
- Background terminal stays off on mobile and motion respects `prefers-reduced-motion`

## AI Context

See [CONTEXT.md](./CONTEXT.md) for a comprehensive AI-readable reference covering architecture, visual system, narrative flow, component conventions, and performance decisions.

## Notes

- This is a portfolio/marketing site, not a reusable package
- Analytics env vars are optional
- Domain: johnherrerachef.com

# John Herrera | Creative Chef & Digital Craft

Personal site built as an editorial portfolio for John Herrera, combining gastronomy and digital product craft in one narrative system.

## Runtime Stack

- Next.js 16.2.1 (App Router, React Compiler)
- React 19
- TypeScript
- Tailwind CSS 4
- Lenis (smooth-scroll behavior)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Commands

```bash
npm run lint
npm run build
npm start
```

## Routes

- `/` Home editorial entry point
- `/works` Works split (gastronomy + development)
- `/about` Profile and trajectory
- `/contact` Contact installation

## Current Architecture

```text
src/
├── app/                      # App Router, layout, metadata, og image
├── design/
│   ├── primitives/           # SectionPrimitive, CardPrimitive, MonoToken, Eyebrow
│   ├── tokens/               # primitives/semantic/components tokens
│   └── ui/                   # composed DS blocks (SectionChrome)
├── features/
│   ├── about/
│   ├── contact/
│   ├── development/
│   ├── gastronomy/
│   ├── home/
│   └── works/
├── components/
│   └── shared/               # shared infra UI (TopNav, ErrorBoundary, scroll helpers)
└── lib/                      # constants, hooks, utils
```

## Design System Source of Truth

Active source of truth is under `src/design/`:

- `src/design/tokens/*` for visual decisions
- `src/design/primitives/*` for base building blocks
- `src/design/ui/*` for composed design-system pieces

## Analytics

Optional env vars:

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

- `NEXT_PUBLIC_GTM_ID`: enables Google Tag Manager
- `NEXT_PUBLIC_GA_ID`: enables direct GA4 installation
- If GA4 is already sent via GTM, leave `NEXT_PUBLIC_GA_ID` empty to avoid duplicates

## AI Context

See [CONTEXT.md](./CONTEXT.md) for full AI-oriented project context.

## Phase 4 Safe Audit

See [docs/phase4-audit.md](./docs/phase4-audit.md) for orphan/debt findings generated without touching active components.

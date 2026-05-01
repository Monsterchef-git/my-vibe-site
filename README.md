# John Herrera | Chef + Dev in Medellín

Personal editorial portfolio for John Herrera, combining kitchen craft and digital product work in one route-based experience.

## Runtime Stack

- Next.js 16.2.1 (App Router, React Compiler)
- React 19
- TypeScript
- Tailwind CSS 4
- Lenis (smooth-scroll behavior)

## Project Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm start
```

`npm run dev` and `npm run build` currently run Next with `--webpack`. `next.config.ts` still defines a Turbopack root for compatibility with future build/dev changes.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

- `/` Home hero and editorial entry point
- `/works` Hospitality and digital work
- `/about` Profile, trajectory, and working position
- `/contact` Contact CTA and social links

All route pages live under `src/app/(site)/` and export `dynamic = 'force-static'`.

## Current Architecture

```text
src/
├── app/                      # Root layout, route group, metadata, OG/Twitter image
├── design/
│   ├── primitives/           # SectionPrimitive, MonoToken, Eyebrow, Hero, AmbientGlow, CulinaryTerm
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
│   ├── shared/               # TopNav, ErrorBoundary, scroll helpers, status bar
│   └── *.tsx                 # app-level effects: Lenis, cursor, tracking, terminal
├── lib/                      # constants, hooks, utils, image assets
├── assets/                   # source asset home
├── config/                   # project configuration home
├── content/                  # reserved content home
└── types/                    # global TypeScript types
```

## Design System Source of Truth

Active source of truth is under `src/design/`:

- `src/design/tokens/*` for visual decisions
- `src/design/primitives/*` for base building blocks
- `src/design/ui/*` for composed design-system pieces
- `src/lib/utils/cx.ts` for class merging

## Security Headers

Configured globally in `next.config.ts`:

- `Content-Security-Policy`
- `Permissions-Policy`
- `Cross-Origin-Opener-Policy`
- `Cross-Origin-Resource-Policy`
- `Strict-Transport-Security`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`

## SEO and Metadata

- Root metadata is defined in `src/app/layout.tsx`.
- Per-route metadata comes from `PAGE_SEO` in `src/lib/constants.ts`.
- The OG image is generated dynamically in `src/app/opengraph-image.tsx`.
- `src/app/twitter-image.tsx` reuses the OG image output.
- `robots.ts` and `sitemap.ts` are generated from the site constants.

## Analytics and Consent

Optional env vars:

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

- `NEXT_PUBLIC_GTM_ID`: enables Google Tag Manager
- `NEXT_PUBLIC_GA_ID`: enables direct GA4 installation
- If GA4 is already sent via GTM, leave `NEXT_PUBLIC_GA_ID` empty to avoid duplicates

Tracked custom events:

- `cta_contact_click`
- `mailto_click`
- `project_click`
- `nav_click`

## CI

GitHub Actions workflow: `.github/workflows/ci.yml`

Runs on every push and pull request:

1. `npm ci`
2. `npm run lint`
3. `npm run build`

## Deployment Checklist

1. Configure env vars (`NEXT_PUBLIC_GTM_ID`, optional `NEXT_PUBLIC_GA_ID`).
2. Run `npm run lint` and `npm run build`.
3. Verify events in GTM/GA debug view.
4. Deploy.

## AI Context

See [CONTEXT.md](./CONTEXT.md) for full AI-oriented project context.
Use [AGENTS.md](./AGENTS.md) as the operational ruleset for coding agents.

## Phase 4 Audit

See [docs/phase4-audit.md](./docs/phase4-audit.md) for cleanup decisions applied in Phase 4.

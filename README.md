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

## Analytics and Consent

Optional env vars:

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

- `NEXT_PUBLIC_GTM_ID`: enables Google Tag Manager
- `NEXT_PUBLIC_GA_ID`: enables direct GA4 installation
- If GA4 is already sent via GTM, leave `NEXT_PUBLIC_GA_ID` empty to avoid duplicates

Consent mode is default-denied and uses this banner copy:

> We use cookies to improve your experience, analyze traffic, and personalize content. You can accept all cookies or reject non-essential cookies.

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
3. Verify consent banner and events in GTM/GA debug view.
4. Deploy.

## AI Context

See [CONTEXT.md](./CONTEXT.md) for full AI-oriented project context.

## Phase 4 Audit

See [docs/phase4-audit.md](./docs/phase4-audit.md) for cleanup decisions applied in Phase 4.

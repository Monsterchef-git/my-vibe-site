# Project Spec

## Purpose

John Herrera's portfolio combines kitchen craft and digital product work in a single editorial site. The codebase is optimized for static route rendering, strong SEO defaults, and a small optional analytics footprint.

## Stack

- Next.js 16.2.1 App Router
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
- Lenis 1.3+
- React Compiler 1.0.0

## Routes

- `/` Home
- `/works` Works
- `/about` About
- `/contact` Contact

Supporting routes:

- `/robots.txt`
- `/sitemap.xml`
- `/opengraph-image`
- `/twitter-image`
- `/_not-found`

## Repository Conventions

- Route files stay under `src/app/(site)/`.
- Route pages stay server-rendered.
- Interactive code lives in client components under `src/components/` or feature UI.
- Shared constants and SEO helpers live in `src/lib/`.
- Design tokens and primitives live in `src/design/`.

## Data and Rendering Flow

- Site-wide metadata comes from `src/lib/constants.ts`.
- Page metadata and page JSON-LD come from `src/lib/seo.ts`.
- Root metadata and site JSON-LD live in `src/app/layout.tsx`.
- The OG image is rendered dynamically in `src/app/opengraph-image.tsx`.
- `src/app/twitter-image.tsx` reuses the OG image response.

## Environment

Currently documented env vars:

- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GA_ID`

No other runtime env vars are required by the app code at this time.

## Scripts

- `npm run dev` - start local dev server
- `npm run lint` - run ESLint
- `npm run typecheck` - run TypeScript without emit
- `npm run build` - production build
- `npm start` - start the production server

## Quality Gates

Required before release:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run build`

## SEO Defaults

- Canonical URLs are based on `SITE_URL`.
- Route metadata is derived from `PAGE_SEO`.
- Open Graph and Twitter metadata are defined per route or at the root layout.
- Dynamic OG generation is used instead of hardcoded image URLs in metadata.
- `robots.ts` and `sitemap.ts` are generated from site constants.

## Analytics Defaults

- Google Tag Manager is optional and guarded by `NEXT_PUBLIC_GTM_ID`.
- Direct GA4 is optional and guarded by `NEXT_PUBLIC_GA_ID`.
- Analytics events currently tracked:
  - `cta_contact_click`
  - `mailto_click`
  - `project_click`
  - `nav_click`

## Deployment

The repository uses standard Vercel/Next deployment flow. Validate locally first, then deploy with the same build command used in CI.

## Maintenance Rules

- Do not add visual redesign work during cleanup passes.
- Do not change published copy without permission.
- Prefer removing dead code over adding wrappers.
- Keep documentation aligned with the real filesystem and scripts.

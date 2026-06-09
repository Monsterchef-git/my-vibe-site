# John Herrera | Chef + Dev in Medellín

Personal editorial portfolio for John Herrera, combining kitchen craft and digital product work in one route-based experience.

## Stack

- Next.js 16.2.1 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Lenis for smooth scroll behavior
- React Compiler enabled

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm start
```

## Local Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` if you want analytics enabled locally.
3. Run `npm run dev`.
4. Open `http://localhost:3000`.

## Environment Variables

Documented in [`.env.example`](./.env.example).

- `NEXT_PUBLIC_GTM_ID`: optional Google Tag Manager container ID.
- `NEXT_PUBLIC_GA_ID`: optional GA4 measurement ID.

If GA4 is already loaded through GTM, keep `NEXT_PUBLIC_GA_ID` empty to avoid duplicate pageviews.

## Routes

- `/` Home hero and editorial entry point
- `/works` Hospitality and digital work
- `/about` Profile, trajectory, and working position
- `/contact` Contact CTA and social links

Route pages live in `src/app/(site)/` and are static server-rendered pages.

## Architecture

```text
src/
├── app/                      # Layout, route pages, metadata, OG/Twitter image, robots, sitemap
├── components/               # App-level effects and shared UI
├── design/                   # Design system primitives, tokens, composed UI
├── features/                 # Feature-owned UI and data
├── lib/                      # Shared constants, hooks, utils, SEO helpers
├── assets/                   # Reserved for source assets
├── config/                   # Reserved for project configuration
├── content/                  # Reserved for content
└── types/                    # Global TypeScript types
```

## Source of Truth

- Design tokens live in `src/design/tokens/`.
- Base primitives live in `src/design/primitives/`.
- Composed design-system UI lives in `src/design/ui/`.
- Feature-specific UI lives in `src/features/*/ui/`.
- Shared app logic lives in `src/lib/`.

## SEO and Metadata

- Root metadata and site JSON-LD live in `src/app/layout.tsx`.
- Per-route metadata is derived from `PAGE_SEO` in `src/lib/constants.ts`.
- Page metadata and page JSON-LD are built in `src/lib/seo.ts`.
- Dynamic OG image generation lives in `src/app/opengraph-image.tsx`.
- `src/app/twitter-image.tsx` reuses the OG image output.
- `src/app/robots.ts` and `src/app/sitemap.ts` are generated from site constants.

## Analytics

Analytics is optional and disabled unless env vars are set.

- `NEXT_PUBLIC_GTM_ID` enables Google Tag Manager.
- `NEXT_PUBLIC_GA_ID` enables direct GA4.

Tracked custom events:

- `cta_contact_click`
- `mailto_click`
- `project_click`
- `nav_click`

## Validation

Run these before shipping changes:

```bash
npm run lint
npm run typecheck
npm run build
```

## Related Docs

- [docs/spec/project-spec.md](./docs/spec/project-spec.md)
- [docs/checklists/tracking-plan.md](./docs/checklists/tracking-plan.md)
- [docs/checklists/deploy-checklist.md](./docs/checklists/deploy-checklist.md)
- [docs/checklists/seo-checklist.md](./docs/checklists/seo-checklist.md)
- [AGENTS.md](./AGENTS.md)

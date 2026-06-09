# Antigravity Agent Rules: Chef-Coder Edition

## 1. Stack

- Next.js 16.2.1 App Router + React 19.
- Tailwind CSS 4.
- Lucide-React only when icons are needed.
- React Compiler is enabled.
- Server Components are the default.

## 2. Project Shape

Keep the repo organized around the current structure:

```text
src/
├── app/          # Route pages, root layout, metadata, robots, sitemap, OG images
├── components/   # App-level effects and shared UI
├── design/       # Tokens, primitives, composed UI
├── features/     # Feature-owned UI and data
├── lib/          # Constants, SEO helpers, hooks, utils
├── assets/       # Reserved
├── config/       # Reserved
├── content/      # Reserved
└── types/        # Global types
```

## 3. Rules

- Do not redesign unless the user asks for redesign work.
- Do not change copy unless the user explicitly permits it.
- Do not change behavior while doing cleanup or documentation passes.
- Prefer existing primitives in `src/design/primitives/` before creating new UI.
- Put reusable composed UI in `src/design/ui/`.
- Put feature-specific UI in `src/features/*/ui/`.
- Put shared logic in `src/lib/`.
- Use the local `cx()` helper for class merging.
- Avoid hardcoded colors, spacing, radius, or typography when a token already exists.
- Do not add new dependencies unless there is a clear justification.

## 4. Rendering

- `page.tsx` files must stay Server Components.
- Client Components should only be used for interaction, motion, or browser APIs.
- Wrap new client components with `ErrorBoundary` when they are used from route pages.
- Keep static copy, images, metadata, and JSON-LD server-rendered.

## 5. SEO

- Use `PAGE_SEO` from `src/lib/constants.ts` and `src/lib/seo.ts` for route metadata.
- Keep dynamic OG image generation in `src/app/opengraph-image.tsx`.
- Keep `robots.ts` and `sitemap.ts` generated from site constants.

## 6. Analytics

- Optional env vars are `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_GA_ID`.
- If GA4 is already loaded through GTM, keep `NEXT_PUBLIC_GA_ID` unset to avoid duplicate events.
- Track only the events already defined in `src/components/GoogleTrackingEvents.tsx` unless the user asks for more.

## 7. Validation

Before finishing meaningful changes, run:

```bash
npm run lint
npm run typecheck
npm run build
```

## 8. Agent Workflow

- Before creating new components, check `src/design/primitives/`, `src/design/ui/`, and `src/features/*/ui/`.
- If a requested refactor requires moving many files, propose the migration first.
- When you finish, summarize the structure or documentation changes briefly and concretely.

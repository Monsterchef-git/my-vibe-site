# Cleanup Report

## What Was Cleaned

- Centralized repeated page SEO metadata and JSON-LD generation into `src/lib/seo.ts`.
- Moved page-specific SEO flags into `src/lib/constants.ts` so each page reuses the same config source.
- Removed an unnecessary `useMemo` from `src/components/shared/SiteStatusBar.tsx`.
- Simplified `src/app/layout.tsx` by removing alias constants and using shared config directly.
- Kept copy, layout intent, and runtime behavior unchanged.

## What Was Moved

- Page metadata creation now lives in `src/lib/seo.ts`.
- Page schema config now lives alongside the rest of the site constants in `src/lib/constants.ts`.

## What Was Removed

- Unused shared components:
  - `src/components/shared/InternalPageHeroFrame.tsx`
  - `src/components/shared/ScrollSectionPrimitive.tsx`
  - `src/components/shared/index.ts`
- Unused starter public assets:
  - `public/file.svg`
  - `public/globe.svg`
  - `public/next.svg`
  - `public/vercel.svg`
  - `public/window.svg`

## What Remains Pending

- No build or lint issues remain from this cleanup.
- I did not remove any image/content assets that still had clear references, so a deeper asset audit is still possible later if desired.
- I did not touch visual copy or redesign-related classes.

## Commands Run

- `rg --files -g 'package.json' -g 'tsconfig.json' -g 'next.config.*' -g 'eslint*' -g 'docs/reports/cleanup-report.md' -g 'CONTEXT.md' -g 'AGENTS.md'`
- `rg --files /Users/mac/code/my-vibe-site`
- `git status --short`
- `sed -n '1,220p' package.json`
- `rg -n "console\\.(log|error|warn|info|debug)" src --glob '!**/*.map'`
- `rg -n "from '.*'|from \\\".*\\\"" src --glob '!**/*.d.ts'`
- `sed -n '1,220p' eslint.config.mjs`
- `npm run lint`
- `npm run build`

## Verification

- `npm run lint` passed.
- `npm run build` passed.

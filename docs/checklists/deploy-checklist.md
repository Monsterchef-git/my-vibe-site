# Deploy Checklist

## Before Deploy

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] Confirm `README.md`, `docs/spec/project-spec.md`, and `AGENTS.md` match the current repo state.
- [ ] Confirm `.env.example` includes every documented env var.
- [ ] Confirm there are no accidental debug logs or temporary files.

## Environment

- [ ] Set `NEXT_PUBLIC_GTM_ID` only if GTM is in use.
- [ ] Set `NEXT_PUBLIC_GA_ID` only if GA4 is not already handled through GTM.

## SEO and Metadata

- [ ] Confirm canonical URLs resolve correctly.
- [ ] Confirm route metadata is populated from `PAGE_SEO`.
- [ ] Confirm `opengraph-image.tsx` still renders successfully.
- [ ] Confirm `robots.txt` and `sitemap.xml` build without errors.

## Post Deploy

- [ ] Open the home page and verify the route renders cleanly.
- [ ] Check `/works`, `/about`, and `/contact` for missing assets or broken links.
- [ ] Verify analytics events in the configured debug view if tracking is enabled.
- [ ] Confirm the deployed build matches the local production build output.

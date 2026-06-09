# SEO Checklist

## Metadata

- [ ] Each route has a unique title.
- [ ] Each route has a unique description.
- [ ] Canonical URLs are correct.
- [ ] Open Graph title and description match the page intent.
- [ ] Twitter cards are present and use the same message as OG where appropriate.

## Structured Data

- [ ] Root `WebSite` JSON-LD is present.
- [ ] Root `Person` JSON-LD is present.
- [ ] Each route includes page-specific JSON-LD.
- [ ] JSON-LD output still matches the route type.

## Images

- [ ] `src/app/opengraph-image.tsx` renders successfully.
- [ ] `src/app/twitter-image.tsx` continues to reuse the OG image.
- [ ] Hero and below-the-fold images use appropriate loading behavior.

## Crawlability

- [ ] `robots.ts` allows the site and blocks only non-public paths.
- [ ] `sitemap.ts` includes all public routes.
- [ ] Canonical links and sitemap URLs use the same site base.

## Content

- [ ] Copy is stable and intentional.
- [ ] Page headings match the metadata topic.
- [ ] No page introduces accidental duplicate titles or descriptions.

## Validation

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`

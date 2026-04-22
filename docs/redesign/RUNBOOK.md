# Execution Runbook

Step-by-step guide to apply the awwwards redesign. Each step is a discrete action you can commit independently. Work top to bottom — dependencies are implicit.

**Sprint order:**
1. ~~S1 — Heroes~~ ✓ done
2. ~~S2 — Narrative & microcopy~~ ✓ done
3. ~~S3 — Tokens & decontainerization~~ ✓ done
4. ~~S3.5 — Post-S3 rescue~~ ✓ done (partial)
5. ~~S3.5b — Root-cause corrections~~ ✓ done
6. ~~S4 — Subtraction~~ ✓ done
7. ~~S4.5 — Cursor as narrative voice~~ ✓ done
8. ~~S5 — Polish~~ ✓ done
9. ~~R1-R3 — Stability Recovery (Addendum)~~ ✓ done
10. ~~S3.6 — Pulido tras el rescue~~ ✓ aplicado
11. ~~S3.6.9 — Addendum post-aplicación~~ ✓ done
12. **S6 — Polish & Performance** ← en curso (cursor preciso + gutters + about bleed + mobile + fluid CPU)
13. ~~Step 6.9 — Mobile awwwards pass~~ ✓ aplicado (2026-04-22)

**Status:** Core redesign live. S3.6 cierra las desviaciones identificadas en el audit de 2026-04-20: código muerto de D7, spec de D9, unificación de padding D10, bugs funcionales (gastronomy gallery + CHEF morph) y optimización del cursor en dev.

**Legend:**
- `[file]` — file you will edit
- `→` — expected result
- `✓` — verify before moving on
- `⚠` — watch out for

---

## Sprint 1 — Heroes

### Step 1.1 · Create `HeroPrimitive`

**Goal:** one primitive all 4 heroes use.

1. Create folder `src/design/primitives/Hero/`
2. Create `src/design/primitives/Hero/Hero.tsx` with props:
   - `eyebrow: string` — always rendered as mono uppercase
   - `statement: ReactNode` — headline italic, clamp(3rem, 10vw, 8rem)
   - `counterLine: ReactNode` — mono, text-zinc-400
   - `tone: 'lime' | 'cyan' | 'blue' | 'white'` — drives accent colors
   - `anchor?: ReactNode` — optional single CTA or scroll cue slot
   - `children?: ReactNode` — optional side slot for portrait/installation
3. Layout: full viewport height, content bottom-left by default, no border, no background
4. Create `src/design/primitives/Hero/index.ts` barrel export
5. Add to `src/design/primitives/index.ts`

✓ Hero renders on a test page with dummy props. No container chrome visible.
⚠ Do NOT wrap in `SectionPrimitive`. The hero is edge-to-edge.

---

### Step 1.2 · Migrate Home hero

**File:** `src/app/(site)/page.tsx` + `src/features/home/ui/HomeIdentityMorph.tsx`

1. Replace the current typewriter hero with `<Hero>` using locked copy:
   - eyebrow: `HOME`
   - statement: `Cooked fast. Shipped faster.`
   - counterLine: `twelve years plating. now shipping interfaces.`
   - tone: `lime`
2. Keep the name scramble reveal — but trigger it on mount, not after a typewriter finishes
3. Remove `HeroTypewriter` component usage
4. Keep the lime/cyan duality downstream in `HomeIdentityMorph` (not in the hero)

✓ No typewriter. Statement appears immediately.
✓ Name scramble animates once on mount.
⚠ LCP should improve — verify with Lighthouse.

---

### Step 1.3 · Migrate Works hero

**File:** `src/features/development/ui/WorksHero.tsx` (or wherever the current hero lives)

1. Replace with `<Hero>`:
   - eyebrow: `WORKS`
   - statement: `Taste, applied.`
   - counterLine: `kitchens & interfaces. same instinct.`
   - tone: `lime` with cyan accent
2. Remove the typewriter animation
3. The `#Hospitality / #Digital` selector moves **below** the hero as a filter bar, not inside it
4. Remove any gradient divider bridge between hero and list — replace with pure whitespace (min-h 160px)

✓ Selector is secondary, not hero content.
✓ Hero statement is immediate on load.

---

### Step 1.4 · Migrate About hero

**File:** `src/features/about/ui/AboutHero.tsx`

1. Replace with `<Hero>`:
   - eyebrow: `ABOUT`
   - statement: `Mise en place for the web.`
   - counterLine: `the kitchen taught me the rest.`
   - tone: `white` (primary) with lime accent
2. Portrait treatment: move from full-bleed-right to a **constrained side slot** (max 40vw, aligned bottom-right)
3. Remove the `bg-black/28 backdrop-blur-[2px]` bio card — text floats directly on canvas
4. The bio paragraph that was inside the glass card moves below the hero as a separate section

✓ No glass card. Text on pure black.
✓ Portrait no longer dominates; statement reads first.
⚠ Contrast: ensure portrait dark areas don't kill white text. May need a subtle gradient mask, not a card.

---

### Step 1.5 · Migrate Contact hero

**File:** `src/features/contact/ui/ContactSection.tsx`

1. Replace top of section with `<Hero>`:
   - eyebrow: `CONTACT`
   - statement: `The pass is open.`
   - counterLine: `briefs, reservations, collaborations →`
   - tone: `lime`
2. The email-as-installation stays as a **separate section below the hero**, not inside it
3. Remove the `rounded-3xl` wrapping card around the whole contact block
4. Remove the border-chrome footer card — social links float on canvas with mono labels and hairline dividers between them

✓ No card wrapping contact content.
✓ Email installation is its own moment, not embedded in hero.

---

### Step 1.6 · Commit Sprint 1

```
git add -A
git commit -m "feat(s1): unify heroes under HeroPrimitive, edge-to-edge"
```

---

## Sprint 2 — Narrative & microcopy

### Step 2.1 · Banned language audit

Run a search for banned terms and replace or delete:

```
grep -rni "premium\|passionate\|we craft\|crafting\|unique\|stunning\|cutting-edge\|journey\|solutions" src/ public/
```

For each hit: rewrite with concrete verbs (`ship`, `build`, `run`, `plate`, `serve`, `open`) or delete the sentence if it adds nothing.

✓ grep returns 0 after this step.

### Step 2.2 · Inject allowed vocabulary

Identify 6-10 places in existing body copy where a culinary term maps cleanly:

- Works section intros — use `plating` or `service` if the context fits
- About bio — `mise en place`, `prep`, `pass`
- Contact form labels — `ticket`, `brief`
- Section eyebrows inside pages — can use `01 — PREP`, `02 — SERVICE` for internal sections (NOT page labels)

⚠ Max 8 total terms across the site. If you exceed, remove the weakest.

### Step 2.3 · Rewrite bridges

Find current bridges (gradient lines between sections). For each:

1. Delete the gradient divider
2. Replace with a single mono sentence, centered, small, zinc-500
   - Example between Home → Works: `from the kitchen →`
   - Example between Works → Contact: `ready to plate →`
3. Add `min-h-40` whitespace above and below

✓ No `bg-gradient-to-*` class on horizontal dividers.

### Step 2.4 · Metadata sweep

**Files:** `src/app/layout.tsx`, `src/app/(site)/**/page.tsx` metadata exports, `opengraph-image.tsx`

1. Rewrite titles and descriptions using locked hero copy
2. OG image should reflect the new statement, not old tagline
3. Remove banned words from all metadata

### Step 2.5 · Commit Sprint 2

```
git commit -m "feat(s2): narrative pass — voice, bridges, metadata"
```

---

## Sprint 3 — Tokens & decontainerization

### Step 3.1 · Create atmosphere tokens

**File:** create `src/design/tokens/primitives/atmosphere.ts`

Define and export:

```ts
export const glassDepth = {
  sheer: 'backdrop-blur-sm',
  frosted: 'backdrop-blur-xl',
  heavy: 'backdrop-blur-2xl',
} as const

export const tracking = {
  eyebrow: 'tracking-[0.32em]',
  label: 'tracking-[0.24em]',
  dense: 'tracking-[-0.02em]',
} as const

export const glowPreset = {
  lime: { color: '#cafd00', size: '60vw', opacity: 0.08 },
  cyan: { color: 'rgb(34 211 238)', size: '60vw', opacity: 0.06 },
  blue: { color: 'rgb(96 165 250)', size: '60vw', opacity: 0.06 },
  white: { color: '#ffffff', size: '50vw', opacity: 0.04 },
} as const
```

### Step 3.2 · Create `AmbientGlow` primitive

**File:** `src/design/primitives/AmbientGlow/AmbientGlow.tsx`

Props: `tone`, `intensity?: 'soft' | 'medium' | 'strong'`, `position?: 'center' | 'top-right' | 'bottom-left'`

Renders an absolutely-positioned radial gradient using `glowPreset`.

### Step 3.3 · Replace inline radial gradients

Search and migrate:

```
grep -rn "radial-gradient" src/
```

For each hit: replace inline style with `<AmbientGlow tone="..." />` positioned absolutely in the parent.

✓ `grep -rn "radial-gradient" src/` returns 0 outside of token files.

### Step 3.4 · Decontainerize `SectionPrimitive`

**File:** `src/design/primitives/SectionPrimitive/SectionPrimitive.tsx`

1. Remove from default classes: `rounded-[3rem]`, `border`, `border-zinc-800/80`, `bg-zinc-950/70`, `backdrop-blur-xl`
2. Keep only: semantic `<section>`, padding tokens, `relative` for positioning
3. Add optional prop `variant?: 'plain' | 'chromed'` — `plain` is default. `chromed` keeps the old look for any rare case that still needs it (should not be used).

✓ Visual scan: no rounded corners on sections. No dark inset panels.

### Step 3.5 · Decontainerize `WorksList`

**File:** `src/features/development/ui/WorksList.tsx`

1. Remove `CardPrimitive` wrapping each project
2. Project row becomes: number · title (large headline) · meta (mono, small) · horizontal rule
3. Hover state: instead of card elevation, use text color shift (zinc-500 → lime) and slight translate
4. No background, no border, no rounded corners

✓ Works page reads as a raw table/list, not a card grid.

### Step 3.6 · Decontainerize Contact

**File:** `src/features/contact/ui/ContactSection.tsx`

1. Remove the `rounded-3xl border` wrapping the section
2. Social links: vertical stack with mono labels, separated by `border-t border-zinc-900`, no card
3. Email installation keeps its presence but sits directly on canvas

### Step 3.7 · Backdrop-blur audit

```
grep -rn "backdrop-blur" src/
```

For each hit:
- If it's on `TopNav` or a modal → migrate to `glassDepth.frosted`
- If it's on content (bio card, project card, etc.) → **remove entirely**

✓ Only TopNav (and any future modal) uses backdrop-blur.

### Step 3.8 · Tracking normalization

```
grep -rn "tracking-\[" src/
```

Migrate each to one of the 3 `tracking.*` tokens. If none fit, the value is probably wrong — discuss before adding a 4th.

### Step 3.9 · Commit Sprint 3

```
git commit -m "refactor(s3): tokens, AmbientGlow, decontainerize sections"
```

---

## Sprint 3.5 — Post-S3 rescue (alignment fix)

**Why this sprint exists:** S3 stripped `SectionPrimitive` chrome, which revealed hidden dependencies on the old container (padding, anchoring, visual pause). Before moving on, fix the fallout.

**Read first:** S0 decisions D9, D10, D11 — they define the target state.

---

### Step 3.5.1 · Fix `HeroPrimitive` breakpoints

**File:** `src/design/primitives/Hero/Hero.tsx`

Current problem: right slot is `hidden` below lg, `max-w-[40vw]` at lg. Portrait squeezes between 768–1024px, locks too narrow at lg.

Actions:
1. Remove `max-w-[40vw]` hard cap. Replace with `w-[min(55vw,40rem)]` on lg, `w-[min(48rem,42vw)]` on 2xl
2. Add a `md` tier: side slot renders as backdrop (absolute, behind text, opacity 0.6, gradient mask) between md and lg
3. Remove duplicate padding (`px-6 md:px-24`) — move it to a single layout wrapper, not both Hero and child sections
4. Set left-column `max-w-[68rem]` on wide screens (was 58rem, too tight when right slot grows)
5. Add prop `sidePosition?: 'right' | 'background'` — `right` for Home/Works, `background` for About portrait on md

✓ Resize from 375px → 2560px and verify smooth transitions, no sudden jumps at md/lg
⚠ Do NOT re-introduce border/bg chrome. The fix is layout math, not containers.

---

### Step 3.5.2 · Rescue About portrait framing

**File:** `src/features/about/ui/AboutHero.tsx`

Current problem: portrait constrained to `w-[min(40vw,26rem)]` with `object-[center_28%]`. Feels like a widget. User wants the previous generous framing without the old full-bleed domination.

Actions:
1. Change width to `w-[min(55vw,40rem)]` (desktop) / full-width (mobile)
2. Change crop to `object-[center_18%]` (less facial zoom, more torso)
3. Add a `pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black via-black/80 to-transparent` mask on desktop — protects text legibility without a card
4. Mobile: portrait becomes full-width backdrop at 80svh; statement overlaid at bottom with gradient mask from transparent top → black bottom
5. Remove any `rounded-*` on the portrait img element — portrait is edge-bleed, not a framed picture

✓ Portrait feels cinematic on desktop and mobile. No visible rectangle around it.
⚠ Test with dark zones of the portrait — make sure white text stays readable. Adjust gradient stops if not.

---

### Step 3.5.3 · Fix Contact double-negative margins

**File:** `src/features/contact/ui/ContactSection.tsx`

Current problem: Hero applies `-mx-6 md:-mx-24`; ContactSection wrapper applies the same. They stack, causing layout shift.

Actions:
1. Choose ONE place to handle edge-bleed — recommend Hero handles it, remove from ContactSection wrapper
2. Email installation below hero: wrap in a plain `<section>` with `px-6 md:px-24 py-24 md:py-40` — no border, no background
3. Social links: vertical stack, each row `py-6 border-t border-zinc-900/60 flex items-baseline justify-between`. No card.
4. Last row has `border-b border-zinc-900/60` to close the list

✓ No horizontal scroll on any viewport
✓ Social links look like a list, not cards

---

### Step 3.5.4 · Rescue WorksList orphan rows

**File:** `src/features/development/ui/WorksList.tsx`

Current problem: rows float with bare `border-t`, lost unifying visual weight.

Actions:
1. Wrap the list in a plain `<ul>` with `divide-y divide-zinc-900/60` — unifies dividers without adding a card
2. Each row: `grid grid-cols-[auto_1fr_auto] gap-8 py-10 md:py-14 items-baseline`
   - col 1: project number in mono, tracking-label, text-zinc-600
   - col 2: project title in headline italic, large (clamp 2rem–4rem)
   - col 3: meta (year · category) in mono, tracking-eyebrow, text-zinc-500
3. Hover: row gets `data-cursor-tone="lime"` (or cyan based on filter); title color shifts to tone; translate-x-2 on the title only
4. Remove any remnant `rounded`, `bg-*`, `shadow-*` on rows

✓ List reads as an editorial index, not a product grid
✓ Hover feels responsive without card elevation

---

### Step 3.5.5 · Normalize section rhythm

Apply D11 across the site.

Actions (per page):
1. **Home** — verify `HomeIdentityMorph` sections have `py-40 md:py-56` between story beats (kitchen → digital)
2. **Works** — `py-24 md:py-32` above the filter bar, `py-40 md:py-56` above the projects list
3. **About** — hero → bio paragraph `py-40 md:py-56`; bio → timeline `py-24 md:py-32`; timeline → values `py-40 md:py-56`
4. **Contact** — hero → email installation `py-24 md:py-32`; installation → socials `py-40 md:py-56`

Remove any remaining hairline dividers that duplicate the whitespace rhythm (they become redundant noise).

✓ Scroll each page end-to-end. Story beats feel like chapters, not a continuous wall.

---

### Step 3.5.6 · AmbientGlow placement audit

**File:** `src/design/primitives/AmbientGlow/AmbientGlow.tsx` and all usages

Current problem: glows feel lighter than old card shadows; sections don't feel grounded.

Actions:
1. Audit each `<AmbientGlow>` usage — is it doing narrative work (signaling tone shift) or decorating?
2. Remove decorative glows. Keep only glows at story transitions (Home kitchen↔digital, Works hospitality↔digital filter change)
3. For grounding individual hero statements, increase intensity preset to `medium` (opacity 0.12 for lime, 0.10 for cyan)
4. Limit to **max 1 glow per visible viewport** — stacking glows flattens their meaning

✓ Glows feel intentional, not ambient decoration.

---

### Step 3.5.7 · Fix `HomeIdentityMorph` chef→dev transition

**Files:** `src/features/home/ui/HomeIdentityMorph.tsx` · `src/features/home/ui/HomeEditorialSection.tsx`

Current problem: the morph relies on the parent section's `offsetHeight` for scroll progress calculations. S3 removed `[overflow:clip]` from `sectionClassName` in `primitiveTokens.ts`. `HomeEditorialSection` has `h-[190svh] md:h-[220svh]` but no longer clips — scroll math receives stale/incorrect boundary values, so the crossfade stops triggering.

Actions:
1. In `HomeEditorialSection`, add explicit `overflow-clip` to the fixed-height wrapper (line ~14). This is required for the morph, not a container chrome — keep it.
2. Verify the `sticky top-0` layer inside still pins correctly after the overflow fix
3. In `HomeIdentityMorph.tsx` around lines 124–129, add a `ResizeObserver` on the section ref to recompute progress on layout changes (not just scroll/resize window events). S3 shifts may have introduced layout reflows the current listeners miss.
4. Verify both images actually load — check the Network tab. If S3 removed an inline background-image preload pattern that was pre-warming the image, add explicit `<img>` preload links in the page head.
5. Test: slow-scroll from top to bottom of the section. Chef image should fully give way to dev image by ~60% scroll progress. Scramble text CHEF→DEV should sync with the visual.

✓ Crossfade is smooth, no jank.
✓ Text scramble and image crossfade are synced to the same progress value.
⚠ `overflow-clip` on HomeEditorialSection is NOT a container violation — it's a morph requirement. Document with a one-line comment.

---

### Step 3.5.8 · Fix Works gastronomy gallery

**File:** `src/features/gastronomy/ui/GastronomyHorizontalGallery.tsx` · `src/features/gastronomy/ui/GastronomySection.tsx`

Current problem: the horizontal scroll-driven gallery on md+ relies on `section.offsetHeight - window.innerHeight` (lines ~180–193) to compute scrollable height. The `GastronomySection` wrapper already patches with `!overflow-visible` to counter S3, but the `h-[360svh]` inner wrapper may no longer receive correct layout context.

Actions:
1. In `GastronomySection.tsx`, replace the `!overflow-visible` patch with an explicit layout wrapper structure:
   - Outer `<section>`: no overflow rules, just semantic/padding
   - Inner `<div className="relative h-[360svh]">`: the true scroll driver
   - Inner sticky: `<div className="sticky top-0 h-svh overflow-hidden">`
2. In `GastronomyHorizontalGallery.tsx`, switch the scroll listener to use the h-[360svh] wrapper's ref (not the section ref) for progress calculations. This decouples gallery math from parent `ScrollSectionPrimitive` layout.
3. Add a `window.visualViewport` listener alongside `window.resize` — mobile viewport changes (URL bar show/hide) can mis-calculate the pinned height.
4. Verify `scrollWidth - window.innerWidth` returns > 0 on all breakpoints — if the track's children aren't sized right after decontainerization, horizontal overflow collapses and the gallery becomes a static stack.

✓ On desktop, horizontal track translates smoothly as you scroll
✓ On mobile, vertical stack fallback works (already tested in original)
✓ No content is cut off at either end of the horizontal track

---

### Step 3.5.9 · Add image field to Works data + hover reveal

**Implements D12.** New visual interaction, not a rescue — but belongs here because it touches `WorksList` which is already being reworked in Step 3.5.4.

**Files:**
- `src/features/development/ui/WorksList.tsx`
- `src/features/development/data/*` (wherever `PROJECTS` array lives, currently inline in WorksList)

Actions:

1. **Extract data** — move the inline `PROJECTS` array (WorksList.tsx lines 4–47) to `src/features/development/data/projects.ts`. Add fields:
   ```ts
   export type Project = {
     id: string
     number: string
     title: string
     tags: string[]
     href: string
     image: string      // NEW — path to hero screenshot under /public/works/
     imageAlt: string   // NEW
   }
   ```

2. **Add images** — create `public/works/` folder. For each project, add a hero screenshot (1600×1000 recommended, WebP or AVIF). You'll need to source/export these — flag which projects lack hero shots.

3. **Create hover preview layer** — in `WorksList.tsx`:
   - Above the `<ul>`, add a fixed-position layer:
     ```tsx
     <div className="pointer-events-none fixed inset-0 z-0">
       {PROJECTS.map(p => <img key={p.id} src={p.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-0 blur-sm grayscale transition-opacity duration-500" data-project-image={p.id} />)}
     </div>
     ```
   - On row `onMouseEnter={() => setActive(p.id)}` / `onMouseLeave={() => setActive(null)}`
   - `useEffect` toggles `opacity-0` ↔ `opacity-25` on the matching `[data-project-image]` element based on `active`
   - Add `data-cursor-mode="lens" data-cursor-label="OPEN"` to each row

4. **Ensure list stays above image** — `<ul>` needs `relative z-10` so text reads over the 25% opacity backdrop.

5. **Touch devices** — wrap the fixed image layer in `@media (hover: hover)` via a Tailwind class or CSS — on touch, image layer never renders.

6. **Lighthouse** — images are large. Use `loading="lazy"` on all except the first 2 (which are likely above fold). Consider `<Image>` from `next/image` with `sizes="100vw"` for optimization.

✓ Hover any project row — background crossfades to its hero image at 25% opacity with blur and grayscale
✓ Leave the list — image fades to 0
✓ Mobile: tapping a row opens `href` in new tab, no preview
✓ No layout shift on hover

⚠ If a project lacks a hero image, use a placeholder (solid dark gradient with project number) — don't skip the project, skip the image.

---

### Step 3.5.10 · Commit S3.5

Split into 2–3 commits for clarity:

```
git commit -m "fix(s3.5): rescue hero breakpoints, portrait, contact, works list rhythm"
git commit -m "fix(s3.5): restore home morph and gastronomy gallery scroll math"
git commit -m "feat(s3.5): works digital list — image reveal on row hover"
```

---

## Sprint 3.5b — Root-cause corrections

**Why this sprint exists:** S3.5 applied, but three problems remain:
1. Heroes still misaligned across pages
2. About portrait still feels detached (a box, not integrated)
3. Gastronomy gallery still doesn't scroll correctly

Each has a specific root cause found in the code. Fix them one at a time.

---

### Step 3.5b.1 · Fix Hero alignment at the consumer level

**Root cause:** `src/features/about/ui/AboutHero.tsx:10` wraps `<Hero>` in `<header className="-mx-6 md:-mx-24">`. This was added to "escape" the parent main's padding. But `<Hero>` already manages its own width via `mx-auto max-w-[78rem] px-6 md:px-24`. The double-escape breaks horizontal layout and causes drift.

**Violation of S0 D13** (Hero hosts itself).

Actions:

1. **`src/features/about/ui/AboutHero.tsx`** — delete the `<header className="-mx-6 md:-mx-24">` wrapper. Return `<Hero>` directly.

2. **`src/app/(site)/about/page.tsx`** — remove `px-6 md:px-24` from the `<main>` element. Main should only manage vertical stacking (`flex flex-col` or similar) and background. Horizontal padding is the section's job.

3. **`src/app/(site)/works/page.tsx`** — same treatment. If main has `px-*`, remove it.

4. **`src/app/(site)/contact/page.tsx`** and **`src/app/(site)/page.tsx`** — audit for the same pattern. Remove any horizontal padding on `<main>`.

5. **Sections after the Hero** (bio paragraph, timeline, works list, etc.) — these now need their own `px-6 md:px-24` because main no longer provides it. Add to each non-Hero section wrapper.

6. Grep to confirm cleanup:
   ```
   grep -rn "-mx-6\|-mx-24" src/features/ src/app/
   ```
   Should return 0 hits after this step.

✓ Resize from 320px → 2560px on all 4 pages. Hero stays edge-to-edge at all widths, internal content aligns to `max-w-[78rem]` centered.
✓ No horizontal scroll on any page.
⚠ Post-Hero sections will shift left by 24/96px when you remove main padding. Restore their padding explicitly — don't skip this.

---

### Step 3.5b.2 · Integrate About portrait (absolute layer)

**Root cause:** `src/features/about/ui/AboutHero.tsx:18` renders the portrait inside Hero's flex side slot with `lg:w-[min(55vw,40rem)]` and `items-end justify-end`. This places it as a rigid flex child that respects Hero's internal `px-6 md:px-24` — so it never bleeds to the viewport edge. Also, the gradient mask at line 36 goes from black-on-left to transparent-on-right, which **covers the portrait** instead of protecting the text.

**Violation of S0 D9** (Portrait integration technique).

Actions:

1. **In `src/design/primitives/Hero/Hero.tsx`** — extend the `sidePosition` prop logic. Add a new behavior: when `sidePosition="background"` AND `lg` breakpoint is active, the side slot renders children as an **absolute layer** anchored to the viewport's right edge, outside the centered `max-w-[78rem]` content column.

   Structure change (conceptual):
   ```
   <section relative>
     {showBackdropSide && <div absolute inset-0 lg:inset-auto lg:right-0 lg:top-0 lg:bottom-0 lg:w-[min(55vw,40rem)]>{children}</div>}
     <div relative z-10 mx-auto max-w-[78rem] ...>{text}</div>
   </section>
   ```

   The portrait layer is a sibling of the centered content column, positioned absolute so it bleeds to viewport edge on desktop, full-backdrop on mobile.

2. **In `src/features/about/ui/AboutHero.tsx`** — the portrait div no longer needs `lg:w-[min(55vw,40rem)]` because the Hero's absolute layer handles it. Simplify to:
   ```
   <div className="relative h-[80svh] w-full lg:h-full">
     <Image ... className="h-full w-full object-cover object-[center_18%]" />
     {/* mobile gradient: top-transparent → bottom-black */}
     {/* desktop gradient: left-black → right-transparent (NOT the reverse) */}
   </div>
   ```

3. **Fix the gradient direction on desktop** — line 36 currently says `bg-gradient-to-r from-black via-black/80 to-transparent`. This needs to be **on the left edge of the portrait, fading to transparent as it goes right**. Same direction actually, but positioned differently:
   ```
   <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/3 bg-gradient-to-r from-black via-black/60 to-transparent lg:block" />
   ```
   This puts the dark mask on the left 2/3 of the portrait, where text overlaps, and lets the right 1/3 show the portrait cleanly bleeding to viewport edge.

4. **Z-index audit** — Hero's content column must have `z-10` or equivalent to sit above the portrait layer. Portrait at `z-0`, content at `z-10`, cursor layer at `z-50` (untouched).

5. **Mobile behavior** — on mobile, portrait becomes full-backdrop (already working via the `lg:hidden` gradient). Statement and counter-line overlay the bottom third. Verify text remains legible against the portrait's brightest zones.

✓ On desktop: portrait bleeds to the right viewport edge; statement reads cleanly over the left; no visible rectangle around the portrait.
✓ On mobile: portrait fills the viewport; statement overlays bottom third with gradient protection.
✓ No `-mx-*` on AboutHero, no widget-like boxing.

---

### Step 3.5b.3 · Gastronomy gallery — remove ScrollSectionPrimitive wrapper

**Root cause:** `src/features/gastronomy/ui/GastronomySection.tsx:25` wraps everything in `<ScrollSectionPrimitive>`, which applies `sectionClassName = 'relative p-6 md:p-8'` plus `space-y-12`. This adds padding and sibling margins around the `h-[360svh]` scroll driver inside `GastronomyHorizontalGallery`. The padding constrains the scroll driver's effective height; `space-y-12` shifts its position relative to the viewport. Together they cause the scroll math (`section.offsetHeight - window.innerHeight` and `rect.top`) to compute progress based on a different element than expected.

Actions:

1. **`src/features/gastronomy/ui/GastronomySection.tsx`** — replace `<ScrollSectionPrimitive>` with a plain `<section>`:
   ```tsx
   <section id={id} className={cx('relative', className)}>
     {/* intro goes here with its own px-6 md:px-24 */}
     <div className="px-6 md:px-24">
       <SectionChrome ... />
       <div className="reveal">
         <h2>Gastronomy</h2>
         <p>Product. Timing. Service. Atmosphere.</p>
       </div>
     </div>
     {/* gallery is sibling, NOT wrapped in padded container */}
     <ErrorBoundary>
       <GastronomyHorizontalGallery />
     </ErrorBoundary>
   </section>
   ```

2. **Remove `space-y-12`** from the section — it was adding margin between the intro and the scroll driver, shifting the driver's `rect.top` relative to viewport. Replace with explicit vertical spacing on the intro block (`pb-40 md:pb-56`) and let the scroll driver start clean.

3. **`src/features/gastronomy/ui/GastronomyHorizontalGallery.tsx`** — no changes needed if refs are already wired (lines 264 and 281 attach `scrollDriverRef` and `trackRef` correctly). Verify the scroll listener attaches after mount by adding a temporary `console.log` inside `schedule()` during testing.

4. **Scroll tone** — `ScrollSectionPrimitive` was providing `scrollTone="lime"` which cued the cursor. Replace by adding `data-scroll-tone="lime"` (or `data-cursor-role="chef"` per D8) directly on the plain `<section>` element.

5. **Error boundary retention** — keep `<ErrorBoundary>` around the gallery. If the refs fail to wire on first render, the boundary prevents the whole page from crashing.

✓ Scrolling down the page pins the gallery at `top-0` and translates the track horizontally.
✓ Track reveals all 9 frames before unpinning.
✓ No layout shift when entering/leaving the pinned state.

⚠ If the gallery still doesn't scroll after removing ScrollSectionPrimitive, the next suspect is a `ScrollProgressBlock` ancestor elsewhere in the page tree applying `overflow-hidden`. Grep for it.

---

### Step 3.5b.4 · Verify cross-page

After applying 3.5b.1–3.5b.3:

1. Walk through all 4 pages from 320px to 2560px in DevTools
2. Confirm: no horizontal scroll, no misaligned hero, no detached portrait, gallery scrolls
3. Run `grep -rn "ScrollSectionPrimitive\|SectionPrimitive" src/` — note remaining usages. Each should be justified or scheduled for removal in S4.

### Step 3.5b.5 · Commit

```
git commit -m "fix(s3.5b): hero consumer contract, portrait absolute bleed, gallery unwrap"
```

---

## Sprint 4 — Subtraction

### Step 4.1 · Remove typewriter

1. Delete `HeroTypewriter` component file
2. Remove all imports
3. Run `npm run typecheck` (or `tsc --noEmit`) — fix any stale imports

### Step 4.2 · Isolate glitch to `JH.` logo only

1. Find all usages of the glitch effect
2. Keep only the one in `src/components/shared/TopNav.tsx` on the `JH.` logo
3. Remove from any hero text, CTA, or other element

### Step 4.3 · Scramble discipline

Keep scramble ONLY in:
- Home hero name reveal (once on mount)
- Contact email hover

Remove scramble from: nav CTAs, WorksHero, anywhere else.

### Step 4.4 · Global grain overlay

1. Remove the grain div from `HomeIdentityMorph`
2. Add a single global grain layer in `src/app/layout.tsx` as a fixed `<div>` with `pointer-events-none`, `z-[1]`, `opacity-[0.03]`, `mix-blend-soft-light`, SVG turbulence background

✓ Grain is visible on every page, identical intensity.

### Step 4.5 · Rounded corners audit

```
grep -rn "rounded-\[3rem\]\|rounded-\[2rem\]" src/
```

- `rounded-[3rem]` → allowed ONLY on Hero-level containers if any remain. Otherwise remove.
- Nested cards → `rounded-xl` max, or none.

### Step 4.6 · Orphan components

Delete any component file that became unused during S1–S4:

```
npx ts-prune
```

or manually verify with:

```
grep -rn "from.*HeroTypewriter\|from.*[OldComponent]" src/
```

### Step 4.7 · Commit Sprint 4

```
git commit -m "chore(s4): subtract typewriter, isolate glitch, global grain"
```

---

## Sprint 4.5 — Cursor as narrative voice

**Why this sprint exists:** the `MagneticCursor` currently works mechanically (mode/tone via data attrs) but has no dialogue with the page story. D8 in S0 defines the target.

**Read first:** S0 decision D8 — mode/tone/label mapping per page context.

---

### Step 4.5.1 · Create `data-cursor-role` inheritance

**File:** `src/components/MagneticCursor.tsx`

Current problem: tone resolution checks `data-cursor-tone` then `data-scroll-tone`. Hardcoded per component.

Actions:
1. Add a 3rd resolver in the pointer lookup chain: `data-cursor-role`
2. Role → tone map:
   - `chef` → lime
   - `dev` → cyan
   - `bridge` → white (reduced opacity)
   - `service` → lime
3. Walk up DOM using `closest('[data-cursor-role]')` — first match wins
4. Role also sets default label if no `data-cursor-label` is present: chef→`TASTE`, dev→`SHIP`, service→`PLATE`, bridge→`→`

✓ Removing any `data-cursor-tone` from existing components still resolves correctly via role.

---

### Step 4.5.2 · Assign roles per page

Apply `data-cursor-role` at the highest sensible level per page.

Actions:
1. **Home** — `HomeIdentityMorph` already switches `data-cursor-tone` based on morph state. Replace with `data-cursor-role={activeState.id === 'development' ? 'dev' : 'chef'}`
2. **Works** — root of Works page gets `data-cursor-role="dev"`. The `#Hospitality` filter button (and all items when that filter is active) gets `data-cursor-role="chef"` override.
3. **About** — page root `data-cursor-role="chef"`. Portrait area `data-cursor-label="THE CHEF"`, scale 1.4× via new mode `portrait`.
4. **Contact** — page root `data-cursor-role="service"`.
5. **TopNav** — `data-cursor-role="bridge"` (neutral connector between rooms).

✓ Remove all hardcoded `data-cursor-tone` once roles cover them.

---

### Step 4.5.3 · Add `CulinaryTerm` primitive

**File:** create `src/design/primitives/CulinaryTerm/CulinaryTerm.tsx`

Purpose: wrap the 8 allowed culinary terms in body copy. Triggers cursor response and optional subtle underline.

Actions:
1. Component: `<CulinaryTerm term="plating">plating</CulinaryTerm>` — renders `<span data-cursor-role="chef" data-cursor-label="TASTE" class="...">`
2. Visual: underline via `underline decoration-zinc-700 underline-offset-4 hover:decoration-lime-400 transition-colors` — hover reveals it's special, not loud by default
3. On hover: cursor scales 1.2× (new mode `keyword`) + label shows the term's digital analogue (from a term→label map):
   - `plating` → `SHIP IT`
   - `mise en place` → `SETUP`
   - `service` → `LIVE`
   - `prep` → `BUILD`
   - `pass` → `HANDOFF`
   - `ticket` → `BRIEF`
   - `tasting` → `REVIEW`
   - `course` → `CHAPTER`

✓ Wrap 6–10 existing occurrences in body copy (About bio, Works intros, Contact form labels).
⚠ Do not over-wrap. The primitive loses power if every line has one.

---

### Step 4.5.4 · Add `portrait` and `keyword` cursor modes

**File:** `src/components/MagneticCursor.tsx`

Actions:
1. Extend the mode union: add `'portrait'` and `'keyword'`
2. `portrait` mode: scale 1.4×, opacity 0.4, no border, soft blur. Used on About portrait.
3. `keyword` mode: scale 1.2×, bold label, tone forced to lime. Used by `CulinaryTerm`.
4. Transitions between modes: spring `stiffness: 180, damping: 22` — avoid harsh jumps.

✓ Hover each mode's triggers and verify smooth morphing.

---

### Step 4.5.5 · Remove dead cursor branches

Audit `MagneticCursor.tsx` for unused modes or tones now that D8 defines the canonical map.

Actions:
1. If a mode is not listed in D8's table, remove it (unless `drag` or `scroll` are still used — check)
2. Remove any inline color values; all tones must come from `colors.ts` tokens

---

### Step 4.5.6 · Reduced motion check

**File:** `src/components/MagneticCursor.tsx`

Actions:
1. If `prefers-reduced-motion: reduce` is true, cursor falls back to the system cursor (hide the custom one)
2. Document this behavior in a one-line comment above the check (this is a non-obvious user preference — the comment justifies itself)

---

### Step 4.5.7 · Commit S4.5

```
git commit -m "feat(s4.5): cursor as narrative voice — roles, keywords, modes"
```

---

## Sprint 5 — Polish

### Step 5.1 · Motion audit

1. Search for all transition/animation durations: `grep -rn "duration-\[\|transition-duration" src/`
2. Increase any duration < 500ms to 600–1000ms for hero-level motion
3. Add `motion-reduce:transition-none` or `motion-reduce:animate-none` where missing

### Step 5.2 · Vertical rhythm

1. Increase section vertical padding by ~20%
2. Desktop: min `py-40` between major sections (160px)
3. Mobile: min `py-24` (96px)

### Step 5.3 · Mobile typography

1. Verify hero statements clamp correctly on 375px viewport
2. Minimum H1 size on mobile: `text-[clamp(2.5rem,14vw,4rem)]`
3. Body mono minimum: `14px`

### Step 5.4 · Lighthouse pass

Run Lighthouse on all 4 pages. Targets:
- LCP < 1.8s
- CLS < 0.05
- Performance > 90
- Accessibility > 95

Fix any regressions before merging.

### Step 5.5 · Silent scroll test

Scroll through all 4 pages with sound off, no interaction. The narrative should read itself:
1. Home — identity established
2. Works — proof
3. About — origin
4. Contact — open door

If any page feels disconnected, revisit S2 microcopy.

### Step 5.6 · Final commit

```
git commit -m "feat(s5): polish — motion, rhythm, mobile type, perf"
```

---

## Sprint 3.6 — Pulido tras el rescue

**Objetivo:** cerrar al 100% D7, D9, D10; arreglar 2 bugs funcionales (gastronomy horizontal scroll y CHEF morph) y matar el lag del cursor en dev.

**Orden de ejecución:** 3.6.0 → 3.6.1 → 3.6.2 → 3.6.3 → 3.6.4 → 3.6.5 → 3.6.6 → 3.6.7. No saltar. Cada paso es un commit.

**Pre-requisito:** rama limpia. Ejecutar `git status` antes de empezar. Si hay cambios sin commitear del rescue anterior, commitearlos primero (`chore(rescue): alignment + gradient fixes`).

---

### Step 3.6.0 · Snapshot de referencia

**Goal:** tener evidencia visual antes de tocar nada, para comparar al final.

1. Arrancar dev server limpio: `pnpm dev` (o `npm run dev`).
2. Esperar a ver `✓ Ready`.
3. Abrir en navegador los 4 pages (`/`, `/works`, `/about`, `/contact`) y tomar screenshots a 1440×900 y 375×812 — guardar en `docs/redesign/snapshots/pre-s36/`.
4. En DevTools → Performance, grabar 5 segundos de hover **sin mover el cursor** en `/`. Exportar el `.json` → `docs/redesign/snapshots/pre-s36/cursor-idle-baseline.json`.

✓ 8 screenshots + 1 trace guardados.
⚠ Si el trace muestra <60fps idle, confirma el diagnóstico del cursor. Guárdalo, lo necesitas para comparar al final.

**Commit:** no aplica (sólo snapshots, no-op en `src/`).

---

### Step 3.6.1 · Podar código muerto (cierra D7)

**Goal:** eliminar `chromed` de `SectionPrimitive` y borrar `CardPrimitive`.

**Files:**
- `src/design/primitives/SectionPrimitive/SectionPrimitive.tsx` (o donde viva hoy)
- `src/design/primitives/SectionPrimitive/index.ts`
- `src/design/tokens/components/*` (cualquier `sectionChromedClassName`)
- `src/design/primitives/CardPrimitive/` → borrar carpeta completa
- `src/design/primitives/index.ts` → remover export de `CardPrimitive`

1. Grep antes de tocar: `grep -rn "variant=\"chromed\"" src/` y `grep -rn "CardPrimitive" src/`. Si algún resultado está en `src/app/` o `src/features/`, DETENTE — hay consumers vivos que no detectó el audit. Flaggear y revisar.
2. En `SectionPrimitive.tsx`: eliminar la rama `variant === 'chromed'` y su classname. Dejar sólo la variante `bare` (o la única que quede). Si `variant` era la única prop que diferenciaba, simplificar la signature.
3. Borrar el token `sectionChromedClassName` de `src/design/tokens/components/sectionStyles.ts`.
4. Borrar `src/design/primitives/CardPrimitive/` completo.
5. Quitar export en el barrel: `src/design/primitives/index.ts`.
6. `pnpm typecheck` (o `tsc --noEmit`). Deben pasar 0 errores.

✓ `grep -rn "chromed\|CardPrimitive" src/` devuelve vacío.
✓ Build de dev sigue compilando.
⚠ Si `sectionStyles.ts` exporta otros classnames referenciados, NO borres el archivo entero.

**Commit:** `refactor(d7): remove chromed variant and CardPrimitive dead code`

---

### Step 3.6.2 · Token único de horizontal padding (cierra D10)

**Goal:** un solo valor de padding horizontal en todo el site (TopNav + Hero + secciones), declarado como token.

**Decisión del token (elegir uno y respetarlo):**
- **Opción A — edge-to-edge real:** `px-6 md:px-10` (24px → 40px). Ya lo usan TopNav y Hero.
- **Opción B — más aire:** `px-6 md:px-12` (24px → 48px).

Recomendado: **Opción A**. Consistente con lo que ya está en TopNav/Hero tras el rescue.

**Files:**
- `src/design/tokens/semantic/layout.ts` (crear si no existe)
- `src/components/shared/TopNav.tsx`
- `src/design/primitives/Hero/Hero.tsx`
- `src/app/(site)/works/page.tsx`
- `src/app/(site)/about/page.tsx`
- `src/features/gastronomy/ui/GastronomySection.tsx`
- `src/features/development/ui/DevelopmentSection.tsx`
- Cualquier otro `px-6 md:px-24` en secciones.

1. Crear `src/design/tokens/semantic/layout.ts`:
   ```ts
   // Single source of truth for page-level horizontal padding.
   // Must match TopNav, Hero, and any full-width section edge.
   export const pageGutterClassName = 'px-6 md:px-10';
   ```
2. Grep: `grep -rn "md:px-24" src/` → lista todas las ocurrencias. Reemplazar cada una por `pageGutterClassName` (import + uso con `cx()`). Ojo: algunas son `md:px-24 md:py-*` — preserva la parte vertical.
3. En `Hero.tsx`: el contenedor de contenido ya usa `px-6 md:px-10`; reemplaza el string literal por el token importado.
4. En `TopNav.tsx`: mismo reemplazo.
5. En secciones (`WorksFilters`, `GastronomySection` intro, `DevelopmentSection` intro, `AboutSection`, bridges): reemplazo mecánico.
6. Levantar dev, comparar ejes X de:
   - `JH.` logo en TopNav
   - Eyebrow del Hero (`HOME`, `WORKS`, `ABOUT`, `CONTACT`)
   - Primer item de la primera sección post-Hero
   Deben estar exactamente alineados en desktop. Si alguno se desvía, falta reemplazar.

✓ En 1440px, inspector muestra `padding-left: 40px` en nav, hero y secciones.
✓ En mobile (375), todo a `padding-left: 24px`.
⚠ Bridges internos (`text-center` decorativos) pueden conservar padding custom — no los toques si visualmente están OK.

**Commit:** `refactor(d10): unify horizontal padding via pageGutterClassName token`

---

### Step 3.6.3 · Portrait width vw-based (cierra D9)

**Goal:** portrait se adapta al viewport (`min(55vw, 40rem)`) en desktop, no con anchos fijos en rem.

**Files:**
- `src/features/about/ui/AboutHero.tsx`
- `src/design/primitives/Hero/Hero.tsx` (verificar slot width del sidePosition="background")

1. En `Hero.tsx`, localizar el slot de `sidePosition === 'background'`. Debe usar:
   ```
   lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[min(55vw,40rem)] 2xl:w-[min(48rem,42vw)]
   ```
   Si ya está así, skip a paso 2. Si no, ajustar.
2. En `AboutHero.tsx`, actualizar el `sizes` de `<Image>`:
   ```tsx
   sizes="(min-width: 1024px) min(55vw, 40rem), 100vw"
   ```
   (Era `(min-width: 1536px) 42rem, (min-width: 1024px) 40rem, 100vw`.)
3. Mantener todo lo demás intacto (gradientes, `object-[center_18%]`, placeholder blur).
4. Dev test: en 1024, 1280, 1440, 1920 px de ancho, el portrait debe respirar y bleed a la derecha sin romper el texto.

✓ A 1280px, el portrait ocupa ~704px (55vw). A 1920px, clampea a 640px (40rem = 640px).
✓ Next/Image sirve la resolución correcta (verificar en Network tab → no carga el 3840w siempre).
⚠ Si el statement del Hero colisiona con el portrait en 1024–1200, sube el `max-w` del texto a `56rem` pero no más.

**Commit:** `fix(d9): portrait width adapts to viewport via min(55vw, 40rem)`

---

### Step 3.6.4 · Verificar y arreglar Gastronomy horizontal scroll

**Goal:** confirmar que la galería horizontal recibe `transform` al scrollear. Si no, arreglar.

**File:** `src/features/gastronomy/ui/GastronomyHorizontalGallery.tsx`

1. `git log -p src/features/gastronomy/ui/GastronomyHorizontalGallery.tsx` — confirmar que ya no aparece `useEffectEvent` (fue removido en el rescue).
2. Arrancar dev. Navegar a `/works`. Scroll hasta que `#works-gastronomy` esté al tope del viewport. Seguir scrolleando.
3. Abrir DevTools → Elements, seleccionar el track:
   ```js
   $0 = document.querySelector('[class*="360svh"] .flex.min-w-max')
   ```
   En Console: `$0.style.transform` mientras sigues scrolleando. Debe mostrar `translate3d(-Xpx, 0px, 0px)` donde X crece con el scroll.
4. Si el transform queda vacío (`""`) o no cambia → bug. Diagnóstico rápido:
   - `console.log` dentro del `useEffect` para ver si mounta.
   - Verificar que `scrollDriverRef` y `trackRef` estén attacheados al DOM correcto (ambos deben devolver un `HTMLDivElement`).
   - Si el `useEffect` no corre nunca: problema de HMR → reiniciar dev server completo (`kill`, `pnpm dev`).
5. Si se confirma bug vivo, el fix canónico es el que ya está aplicado (RAF manual + scroll listener). No reintroducir `useEffectEvent` — en la versión de React del proyecto es canary y no siempre está disponible en el client bundle de Next 16 webpack.
6. Test visual: al final del scroll de la sección, la última imagen debe quedar visible. Al principio, la primera. A mitad, la tercera-cuarta.

✓ `$0.style.transform` crece linealmente con el scroll.
✓ Al final de la sección, el transform está en `~-overflow px` (máximo).
⚠ Si en mobile no se ve nada, es correcto: en móvil se muestra el stack vertical (`space-y-4`), no el track horizontal. Verificar que el branch `md:hidden` sí renderiza en <768px.

**Commit:** `fix(gastronomy): ensure horizontal scroll track updates on scroll` (sólo si hubo cambio).

---

### Step 3.6.5 · Verificar y arreglar CHEF → DEV morph

**Goal:** confirmar que el morph anima con el scroll dentro de `HomeEditorialSection`.

**Files:**
- `src/features/home/ui/HomeIdentityMorph.tsx`
- `src/features/home/ui/HomeEditorialSection.tsx`

1. Arrancar dev en `/`. Scroll lento desde el hero hacia abajo.
2. A partir de `MORPH_START = 0.24` del progress de la sección, el word `CHEF` debe empezar a scramblearse hacia `DEV`. A `0.52` hace el switch. A `0.74` ya está fijo en `DEV`.
3. Debug:
   ```js
   // En Console, con la sección de editorial a la vista:
   const s = document.querySelector('[aria-label*="Kitchen craft"]')
   s.getBoundingClientRect()  // top debe ir de +viewport a -190svh
   ```
4. Si el word no cambia al scrollear:
   - Abrir `HomeIdentityMorph.tsx`.
   - Añadir temporal: `console.log('progress', sectionProgress)` en el render. Scroll y observar que va de 0 a 1.
   - Si queda en 0 constante → `rootRef` no está conectado al wrapper correcto (`HomeEditorialSection` debe tener `h-[190svh] md:h-[220svh]` y el `rootRef` apuntar ahí o a un contenedor interno con esa altura).
   - Si va de 0 a 1 pero el word no cambia → bug en el switch logic (`SWITCH_THRESHOLD`, scramble interval).
5. Quitar `console.log` antes de commitear.

✓ CHEF se scramblea a DEV mientras scrolleas el editorial section.
✓ Al terminar la sección, DEV (cyan) está pintado con `night-glow-cyan`.
⚠ Con `prefers-reduced-motion`, el morph debe hacer un switch instantáneo en 0.5, sin scramble. Verificar en DevTools → Rendering → Emulate.

**Commit:** `fix(home): CHEF→DEV morph scroll math correction` (sólo si hubo cambio).

---

### Step 3.6.6 · Optimización del cursor (core del fix de lag en dev)

**Goal:** bajar el costo por frame del `MagneticCursor` para que no ralentice dev. Sin cambios visuales perceptibles.

**File:** `src/components/MagneticCursor.tsx`

**Estrategia:** 3 cambios localizados. Todos optativos; aplicar en orden y medir después de cada uno.

#### 3.6.6.a · Gatear el RAF por actividad

1. Añadir un ref `dirtyRef = useRef(true)` arriba, junto a los otros refs.
2. En el `render` callback, al final (después de todas las asignaciones), si el estado está completamente estable (speed < 0.01, size deltas < 0.5, sin pointer move reciente) → `dirtyRef.current = false` y early-return en el siguiente frame.
3. En cada handler que cambia estado (`handlePointerMove`, `handlePointerDown`, `handlePointerUp`, `updateEnabled`, `resetCursor`, cambio de `activeElement`): setear `dirtyRef.current = true`.
4. Al principio del `render`: `if (!dirtyRef.current) return;`
5. Ejemplo mínimo del check final:
   ```ts
   const settled =
     Math.abs(targetX - currentRef.current.x) < 0.15 &&
     Math.abs(targetY - currentRef.current.y) < 0.15 &&
     Math.abs(targetWidth - sizeRef.current.width) < 0.5 &&
     Math.abs(targetHeight - sizeRef.current.height) < 0.5 &&
     speedRef.current < 0.02 &&
     stretchRef.current < 0.005;
   if (settled) dirtyRef.current = false;
   ```

✓ Grabar 5s de perf panel con cursor quieto → antes vs después: debe caer de ~60 frames activos/s a ~0–2.

#### 3.6.6.b · Cachear `getBoundingClientRect`

1. Añadir `activeRectRef = useRef<DOMRect | null>(null)`.
2. En `updateInteractiveTarget`, después de setear `activeElementRef.current`: `activeRectRef.current = activeElementRef.current?.getBoundingClientRect() ?? null;`.
3. Añadir listener `window.addEventListener('scroll', invalidateRect, { passive: true })` y `resize` que invaliden `activeRectRef.current = activeElementRef.current?.getBoundingClientRect() ?? null` (throttle con RAF).
4. En el `render`, usar `activeRectRef.current` en lugar de `activeElement.getBoundingClientRect()`.
5. Limpiar listeners en el cleanup del useEffect.

✓ En perf panel, `getBoundingClientRect` ya no aparece como hot path.

#### 3.6.6.c · Diff de estilos antes de escribir

1. Añadir `lastStyleRef = useRef({ borderColor: '', background: '', boxShadow: '', filter: '', /* ... */ })`.
2. Antes de cada `shell.style.X = Y`, comparar con `lastStyleRef.current.X`. Si son iguales, skip.
3. Al escribir, actualizar `lastStyleRef.current.X = Y`.
4. Opcional: quitar `cursor.style.filter = 'blur(12px)'` del modo `portrait`. Sustituir por `opacity: 0.7` + `box-shadow` más amplio. El blur CSS sobre un fixed repintado por frame es el efecto más caro del componente.

✓ Perf panel: style-recalcs por frame bajan de ~10 a ~1–2 en régimen estable.

**Validación final:** repetir el trace de 5s de Step 3.6.0. Comparar FPS idle antes vs después. Objetivo: idle consistente a 60fps, sin drops.

**Commit:** `perf(cursor): gate RAF by dirty flag, cache rect, diff styles`

---

### Step 3.6.7 · Dev toggle del cursor (escape hatch)

**Goal:** atajo de teclado para apagar el cursor en desarrollo sin tocar código.

**File:** `src/components/MagneticCursor.tsx`

1. En el `useEffect` principal, añadir un listener `keydown`:
   ```ts
   const onKey = (e: KeyboardEvent) => {
     if (e.metaKey && e.shiftKey && e.key.toLowerCase() === 'c') {
       const body = document.body;
       body.classList.toggle('magnetic-cursor-active');
       if (!body.classList.contains('magnetic-cursor-active')) {
         resetCursor();
       }
     }
   };
   window.addEventListener('keydown', onKey);
   // cleanup: removeEventListener
   ```
2. CSS: cuando `body` NO tenga la clase `magnetic-cursor-active`, el `cursor` fixed no recibe pointer events y se oculta. Ya hay lógica similar — verificar que `resetCursor` lo esconde correctamente.
3. Documentar el atajo en `AGENTS.md` bajo una sección nueva "Dev shortcuts".

✓ `Cmd+Shift+C` toggle el cursor. En off, el cursor nativo del SO aparece y el RAF del magnetic cursor no hace trabajo útil.
⚠ No debe interferir con Chrome DevTools (`Cmd+Opt+C` inspector). Revisar que el keybind no colisiona.

**Commit:** `feat(cursor): Cmd+Shift+C dev toggle`

---

### Step 3.6.8 · Validación final y snapshot comparativo

1. Repetir los 8 screenshots del Step 3.6.0, guardarlos en `docs/redesign/snapshots/post-s36/`.
2. Diff visual (eyeballing) entre `pre-s36` y `post-s36`:
   - Hero copy idéntico.
   - Alineación vertical de edges (TopNav ↔ Hero ↔ primera sección) = perfecta en todos los viewports.
   - Portrait de About respira y bleedea a la derecha.
   - Gallery de gastronomy scrollea horizontal.
   - CHEF→DEV morph anima.
   - Cursor sin lag en dev.
3. Lighthouse en `/` a ver si no regresamos (LCP, CLS, Performance).
4. Actualizar `S0-alignment.md` marcando D7, D9, D10 como **closed** en la checklist "Definition of done".

**Commit final:** `chore(s36): close alignment audit — D7/D9/D10 complete, perf unlocked`

---

### Definition of done (S3.6)

- [ ] `chromed` variant y `CardPrimitive` fuera del repo. `grep` devuelve vacío.
- [ ] `pageGutterClassName` token existe y se usa en TopNav + Hero + todas las secciones.
- [ ] Portrait de About usa `min(55vw, 40rem)` en desktop.
- [ ] Gastronomy horizontal gallery scrollea y aplica transform al track.
- [ ] CHEF → DEV morph anima durante el scroll del editorial section.
- [ ] Cursor en dev corre idle a 60fps estable (baseline vs post comparados).
- [ ] `Cmd+Shift+C` toggle el cursor.
- [ ] 8 screenshots post-s36 archivados.
- [ ] S0-alignment.md actualizado con D7/D9/D10 closed.

---

## Sprint 3.6.9 — Addendum post-aplicación

**Contexto:** tras aplicar S3.6 completo, quedaron 4 notas del audit visual. Este sprint las cierra.

**Orden:** 3.6.9.1 → 3.6.9.2 → 3.6.9.3 → 3.6.9.4. Pasos cortos, un commit cada uno.

---

### Step 3.6.9.1 · About — aire lateral del statement

**Síntoma:** en `/about` el statement "Mise en place for the web." se lee pegado al borde izquierdo.

**Causa:** `pageGutterClassName = 'px-6 md:px-10'` deja 40px en desktop — insuficiente para un `<h1>` a `clamp(2.75rem, 12vw, 6.5rem)`.

**Fix (recomendado — opción A del reporte):** subir el token global.

**File:** `src/design/tokens/semantic/layout.ts`

```diff
- export const pageGutterClassName = 'px-6 md:px-10';
+ export const pageGutterClassName = 'px-6 md:px-16';
```

1. Guardar. Dev recompila solo.
2. Verificar en 4 páginas (`/`, `/works`, `/about`, `/contact`) que TopNav, Hero y primera sección siguen **alineados en el mismo eje X** — sólo que corrido de 40px a 64px.
3. En mobile (<768px) no cambia nada (`px-6` = 24px intacto).

✓ A 1280px: eyebrow `ABOUT` a 64px del borde, statement respira.
✓ TopNav, Hero eyebrow y primera sección en el mismo eje X.
⚠ Si el JH. logo del nav te parece "muy centrado" tras el cambio, es señal de que 64px es demasiado para tu taste — bajar a `md:px-12` (48px) como compromiso.
⚠ Si secciones con `md:py-*` específico quedan raras por la nueva relación aspect, ajustar `py-*` localmente, no el token.

**Commit:** `style(layout): bump page gutter to md:px-16 for hero breathing room`

---

### Step 3.6.9.2 · Cursor — cortar RAF idle + quantizar + podar shadow

**Síntoma:** el cursor sigue ralentizando dev tras S3.6.6.

**Causa raíz:** el RAF chain de `useAnimationFrame` corre 60fps aunque `render` retorne temprano por `!dirty`. Además los strings de `transform` difieren en decimales imperceptibles, el `diff` nunca acierta, y el `box-shadow` del modo `portrait` tiene 94px de spread que fuerza repaint de un área enorme.

**Files:**
- `src/lib/utils/useAnimationFrame.ts`
- `src/components/MagneticCursor.tsx`

#### 3.6.9.2.a · Hacer que `useAnimationFrame` pueda pausarse

Reemplazar el hook completo:

```ts
// src/lib/utils/useAnimationFrame.ts
import { useCallback, useEffect, useRef } from 'react';

/**
 * Frame loop that can pause itself.
 * Callback returns `false` to stop the chain; external callers use the returned
 * `start` fn to resume (pointer move, scroll, hover state change, etc).
 */
export function useAnimationFrame(callback: (time: number) => boolean | void) {
  const idRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const cbRef = useRef(callback);
  cbRef.current = callback;

  const tick = (time: number) => {
    const keepAlive = cbRef.current(time);
    if (keepAlive === false) {
      runningRef.current = false;
      idRef.current = null;
      return;
    }
    idRef.current = window.requestAnimationFrame(tick);
  };

  const start = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    idRef.current = window.requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    start();
    return () => {
      if (idRef.current !== null) cancelAnimationFrame(idRef.current);
      runningRef.current = false;
      idRef.current = null;
    };
  }, [start]);

  return start;
}
```

#### 3.6.9.2.b · `MagneticCursor` — retorna `false` al settled + start() en handlers

En `src/components/MagneticCursor.tsx`:

1. Capturar el `start` del hook:
   ```ts
   const startFrameLoop = useAnimationFrame(render);
   ```

2. En `render`, cambiar el final:
   ```diff
   - if (settled) {
   -   dirtyRef.current = false;
   - }
   + if (settled) {
   +   dirtyRef.current = false;
   +   return false; // stop RAF chain
   + }
   + return true;
   ```

3. En cada handler que setea `dirtyRef.current = true`, añadir `startFrameLoop()` justo después. Handlers afectados: `handlePointerMove`, `handlePointerDown`, `handlePointerUp`, `updateEnabled`, `resetCursor`, `updateInteractiveTarget`, `refreshActiveRect`.

#### 3.6.9.2.c · Quantizar valores para que el diff de estilos realmente atrape

En `render`, antes de construir los strings de transform, cuantizar:

```ts
const qx = Math.round(currentRef.current.x * 10) / 10;
const qy = Math.round(currentRef.current.y * 10) / 10;
const qAngle = Math.round(angleRef.current * 10) / 10;
const qScaleX = Math.round((1 + stretchRef.current) * 1000) / 1000;
const qScaleY = Math.round((1 - stretchRef.current * 0.42) * 1000) / 1000;
const qW = Math.round(width * 10) / 10;
const qH = Math.round(height * 10) / 10;

const nextCursorTransform = `translate3d(${qx - qW / 2}px, ${qy - qH / 2}px, 0)`;
const nextShellTransform = `rotate(${qAngle}deg) scale(${qScaleX}, ${qScaleY})`;
const nextCursorWidth = `${qW}px`;
const nextCursorHeight = `${qH}px`;
```

#### 3.6.9.2.d · Podar el shadow gigante del portrait + dot write condicional

En `render`:

1. Bajar el shadow del modo `portrait` (línea ~323):
   ```diff
   - nextShellShadow = `0 0 78px 16px rgba(${rgb}, 0.16)`;
   + nextShellShadow = `0 0 36px 6px rgba(${rgb}, 0.14)`;
   ```
2. `label.textContent` sólo si cambió (línea ~334):
   ```diff
   - label.textContent = labelText.toUpperCase();
   + const nextText = labelText.toUpperCase();
   + if (label.textContent !== nextText) {
   +   label.textContent = nextText;
   + }
   ```

**Validación:**
- DevTools → Performance → grabar 5s con cursor quieto sobre fondo neutro en `/`. Objetivo: **0 frames activos** tras ~150ms de inactividad (RAF chain detenida).
- Mover cursor: debe reanimar fluido.
- Hover sobre portrait en `/about`: shadow visible pero más compacto, sin stutter.
- Idle en `/about` con cursor sobre el portrait y luego quitar puntero: ~300ms después RAF se apaga.

✓ Chrome perf panel sin tareas periódicas del `render` en idle.
✓ `node.style.*` writes bajan de ~17/frame a ~0/frame en régimen estable.
⚠ Si el cursor se "queda pegado" tras mover rápido, un handler se te olvidó llamar `startFrameLoop()` — revisar los 7 que listamos.
⚠ En Safari, el diff de `transform` a veces no encaja igual — si hay jitter en Safari, bajar la precisión de quantize a `Math.round(x * 4) / 4` (0.25px).

**Commit:** `perf(cursor): pausable RAF + quantized transforms + trimmed portrait shadow`

---

### Step 3.6.9.3 · About — quitar copy de tecnical.app

**Síntoma:** el párrafo de About menciona "and lead the landing experience for tecnical.app" — ya no corresponde.

**File:** `src/features/about/ui/AboutSection.tsx`

1. Localizar el párrafo (líneas ~61–66):
   ```tsx
   <p className={sectionSupportClassName}>
     Today that same way of thinking informs the digital side of my work: brand
     sites, visual systems, and a more editorial approach to structure. I work as
     Creative Chef at <MonoToken kind="project">Wink Eventos</MonoToken> and lead
     the landing experience for <MonoToken kind="project">tecnical.app</MonoToken>.
   </p>
   ```
2. Reemplazar por:
   ```tsx
   <p className={sectionSupportClassName}>
     Today that same way of thinking informs the digital side of my work: brand
     sites, visual systems, and a more editorial approach to structure. I work as
     Creative Chef at <MonoToken kind="project">Wink Eventos</MonoToken>.
   </p>
   ```
3. **No tocar** las otras apariciones de `tecnical.app` en el repo:
   - `src/app/layout.tsx:109` → JSON-LD `affiliation`
   - `src/components/BackgroundTerminal.tsx:25,61` → sigue siendo proyecto listado en terminal
   - `src/features/development/data/projects.ts:60` → sigue en el Works list
   - `CONTEXT.md:181` → histórico; actualizar sólo si quieres retirar esa afiliación del contexto narrativo del proyecto.

✓ `grep -n "tecnical\.app" src/features/about/` devuelve vacío.
✓ El párrafo sigue gramaticalmente cerrado con el punto tras Wink Eventos.

**Commit:** `copy(about): remove tecnical.app landing mention`

---

### Step 3.6.9.4 · Portrait de About — bleed intencional (cierra D9)

**Síntoma:** el portrait está contenido dentro del Hero; D9 pide que sangre por debajo.

**Causa:** el slot `sidePosition="background"` usa `lg:inset-y-0` que fuerza alto = alto del `<section>` del Hero.

**Files:**
- `src/design/primitives/Hero/Hero.tsx`
- `src/app/(site)/about/page.tsx`
- (opcional) `src/features/about/ui/AboutHero.tsx` si la foto queda cortada raro tras el bleed.

1. En `Hero.tsx`, localizar el bloque del slot backdrop (~línea 66):
   ```diff
   - sidePosition === 'background'
   -   ? 'lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[min(55vw,40rem)] 2xl:w-[min(48rem,42vw)]'
   -   : 'hidden md:block lg:hidden'
   + sidePosition === 'background'
   +   ? 'lg:top-0 lg:-bottom-[12vh] lg:left-auto lg:right-0 lg:w-[min(55vw,40rem)] 2xl:w-[min(48rem,42vw)]'
   +   : 'hidden md:block lg:hidden'
   ```
2. El Hero ya NO debe recortar el overflow. Verificar que `<section>` del Hero **no** tiene `overflow-hidden` ni `overflow-clip` activos. Si los tiene, quitarlos.
3. En `src/app/(site)/about/page.tsx`, prevenir desbordes horizontales parásitos y dejar el bleed vertical intencional:
   ```diff
   - className="relative z-0 min-h-screen bg-[#0a0a0a] pb-16 pt-28 text-white md:pt-32"
   + className="relative z-0 min-h-screen overflow-x-clip bg-[#0a0a0a] pb-16 pt-28 text-white md:pt-32"
   ```
4. La sección `About intro` (`py-40 md:py-56`) puede sentirse pisada por la foto que ahora cruza el límite. Subir el padding sólo en About si hace falta:
   ```diff
   - className={cx(pageGutterClassName, 'py-40 md:py-56')}
   + className={cx(pageGutterClassName, 'py-48 md:py-64')}
   ```
5. (Opcional) en `AboutHero.tsx` el gradiente inferior `h-1/3 bg-gradient-to-b from-transparent to-black/80` vive dentro del slot. Con el bleed de 12vh hacia abajo el gradiente también baja, fundiendo mejor la foto en el fondo negro. Si prefieres que el fade termine exactamente en el borde del Hero, cambiar `h-1/3` por `h-[45%]` — más drama.

**Verificación:**
- A 1440×900, scroll a `/about`. La cara del retrato sobresale por debajo del Hero cruzando a la sección `About intro`. El gradiente inferior suaviza la transición.
- Inspector → `overflow` del `<main>`: `clip` en el eje X; el vertical sigue `visible`.
- DevTools → **Force scroll horizontal** con rueda: el `<main>` no debe generar scrollbar horizontal incluso si algún hijo sobresale.

✓ Portrait bleed visible por debajo del Hero.
✓ Sin scroll horizontal en ninguna viewport.
✓ Intro copy no queda encimada por la foto (el gradiente + padding extra la protegen).
⚠ Si el gradiente inferior del AboutHero se nota cortado (porque el slot ahora es más alto), subirlo a `h-[40%]` o `h-2/5`.
⚠ En tabletas (md, <lg) el slot está oculto por CSS (`hidden md:block lg:hidden` no aplica aquí porque usamos `background`); la foto en mobile sigue siendo el layout stackeado con gradient de abajo — no tocar.

**Commit:** `fix(about)(d9): portrait bleeds past hero bottom edge`

---

### Definition of done (S3.6.9)

- [ ] `pageGutterClassName` actualizado (px-6 md:px-16 o md:px-12 según taste).
- [ ] `useAnimationFrame` admite pausa.
- [ ] `MagneticCursor` retorna `false` en settled y los 7 handlers llaman `startFrameLoop()`.
- [ ] Valores de transform quantizados; `label.textContent` escribe condicional.
- [ ] Shadow del portrait reducido.
- [ ] Perf trace: 0 frames activos en idle del cursor después de 300ms.
- [ ] Párrafo de About sin mención a tecnical.app.
- [ ] Portrait sangra 12vh por debajo del Hero en lg+.
- [ ] `overflow-x-clip` en `<main>` de about.
- [ ] Sin scroll horizontal en ningún viewport.

---

## Sprint 6 — Polish & Performance

**Context:** Sitio en producción. Feedback del usuario 2026-04-21: cursor se siente lento/impreciso, About + Digital Craft pegados a bordes, retrato About no se integra (costura visible con hero), mobile no 100% pulido, preocupación por consumo de Fluid CPU en Vercel.

**Goal:** Rematar la sensación awwwards sin añadir features. Un commit por step.

---

### Step 6.1 · Cursor preciso

**File:** `src/components/MagneticCursor.tsx`

1. `BASE_EASING` de `0.22` → `0.35`. Subir factor magnético en modos `link`/`cta` de `0.38` → `0.55`.
2. Eliminar `stretch` + `angle` (rotación/deformación basada en velocidad): refs, cálculos en `render`, y aplicación al shell.
3. Eliminar modos no usados: `drag`, `keyword`, `portrait`. Reducir `CURSOR_MODES` a `['idle', 'link', 'cta', 'lens', 'scroll']`.
4. Quitar `cursorFilter` (siempre `'none'`) y simplificar transiciones CSS del shell a `transform, opacity` únicamente.
5. Quitar listener `window.visualViewport?.addEventListener('scroll', refreshActiveRect)` (redundante con `window.scroll`).

✓ Cursor engancha y suelta en <100ms. Sin jank al mover rápido. Sin deformación tipo "chicle".
⚠ Después de quitar modo `portrait`, revisar que no se rompa nada en `AboutHero` (el `data-cursor-mode="portrait"` sobre el retrato debe eliminarse en Step 6.3).

---

### Step 6.2 · Gutters laterales

**Files:** `src/design/tokens/components/sectionStyles.ts` + las secciones no-hero.

1. Añadir export `sectionGutterClassName = 'px-6 md:px-10 lg:px-16'` en `sectionStyles.ts`.
2. Aplicar en `AboutSection`, `DevelopmentSection`, `WorksList`, `ContactSection` (envoltorios raíz de cada sección, no en heroes).
3. Asegurar que el gutter se suma al padding vertical existente sin duplicar.

✓ En 390px y 1440px, ningún texto/card toca el borde del viewport.
⚠ No tocar heroes — siguen edge-to-edge (regla Sprint 1).

---

### Step 6.3 · About cutout bleed

**Context:** La foto de John está recortada sobre fondo transparente (PNG) — chef con delantal denim, tirantes rojos, cortando tomates, mirada hacia abajo. Esto permite un tratamiento tipo "cutout editorial" en lugar de rectángulo con gradientes. La integración deja de ser un problema de máscaras y pasa a ser uno de composición tipográfica alrededor de una silueta.

**Files:** `src/features/about/ui/AboutHero.tsx` + `src/features/about/ui/AboutSection.tsx` + `src/lib/imageAssets.ts`

**Decisión de dirección:**
- Foto cutout sobre canvas negro, sin contenedor, sin border, sin rounded, sin gradiente de máscara.
- Color real (opción 1), NO duotone ni B/N con spot color. Tonos originales del denim/tirantes/tomates.
- Figura sangra por el borde inferior: manos y tomates cortados, nunca se muestra la foto completa.
- La silueta **atraviesa el grid tipográfico** — hombro o brazo pisa parte del párrafo/statement.
- Sin `AboutHero` separado: el statement "Mise en place for the web." pasa a vivir dentro de `AboutSection` como parte de la misma composición. Un solo bloque, no dos.

**Asset confirmado:** PNG con alpha transparente real ya guardado en `public/images/about/`. Dimensiones 1656×2944 (~9:16), recorte limpio (pelo, hombros, brazos), tatuaje visible en antebrazo izquierdo (sumar peso narrativo, no taparlo con texto).

**Notas del cutout a tener en cuenta:**
- Verificar al aplicar sobre negro puro que no aparezca halo blanco residual en el pelo rizado (zona superior). Si aparece, reexportar el asset con `decontaminate edges` activado — no se arregla con CSS.
- Corte inferior original termina en manos + tomates. El sangrado final de la sección va a cortar **más arriba** (a la altura del delantal/tirantes), dejando los tomates fuera del frame. Eso es intencional: crea el misterio de "qué está haciendo" que se revela al entrar a gastronomía.
- Ratio 9:16 funciona bien en el lado derecho desktop. En mobile, cuidar `object-position` para no cortar la cara.

**Pasos:**

1. Registrar el asset en `src/lib/imageAssets.ts` como `IMAGE_ABOUT_CHEF_CUTOUT` apuntando a `/images/about/<filename>.png`, con su `BLUR_ABOUT_CHEF_CUTOUT` generado (puedes usar plaiceholder o el pipeline existente). El asset anterior con fondo blanco queda como fallback o se elimina cuando esta tarea esté mergeada.

2. Eliminar `AboutHero.tsx` del render (o vaciarlo a componente que solo devuelve null). El Hero About deja de existir como sección aparte. Actualizar `page.tsx` para no montarlo.

3. Reescribir `AboutSection.tsx` como composición única:
   - Wrapper `relative` con `min-h-screen` y `py-24 md:py-32`.
   - Grid 12 columnas en desktop (`lg:grid-cols-12`).
   - Bloque izquierdo (cols 1–7): eyebrow `ABOUT — 03`, statement `Mise en place for the web.` (font-headline italic grande), counterLine `the kitchen taught me the rest.`, párrafos actuales, profile rows.
   - Bloque derecho (cols 6–12, overlap intencional con el izquierdo): la figura cutout, absolutamente posicionada, `width` ~50–55% del ancho de la sección, alineada al borde derecho y sangrada por abajo (`bottom: -10%` o similar para cortar las manos).

4. Tratamiento de la Image:
   - `filter: contrast(1.1) saturate(0.95)` ligero.
   - Grain overlay al 10–12% sobre la figura (reusar el overlay grain global si existe, o aplicar un `::after` local).
   - `object-position: bottom` para asegurar que el corte suceda en las manos, no en la cabeza.
   - `sizes` responsive: `(min-width: 1024px) 50vw, 90vw`.
   - Mantener `priority` (sigue siendo LCP candidate de esa sección).

5. Detalle de composición awwwards:
   - Línea `h-px bg-[#cafd00]` horizontal que atraviesa la sección a la altura del cuello/manos de la figura, pasando **por detrás** de la silueta (z-index menor que la Image). Ancho full.
   - Opcional: número `03` en `font-headline` italic gigante (`text-[18rem] lg:text-[24rem]`) en `text-white/[0.04]`, absolutamente posicionado detrás de la figura como ancla compositiva.

6. Mobile (`<lg`):
   - Layout vertical: eyebrow → statement → figura full-width (~75% ancho, centrada, sangrada por abajo con manos cortadas) → párrafos → profile rows.
   - Sin gradientes de máscara (no hacen falta con cutout).
   - La línea lime horizontal se mantiene, pero atraviesa la figura en mobile también.

7. Eliminar `data-cursor-mode="portrait"` y `data-cursor-label="THE CHEF"` (modo eliminado en Step 6.1). La figura ya no necesita cursor especial — es contenido estático, no interactivo.

✓ No hay costura visible entre hero y about porque el hero About ya no existe como sección aparte.
✓ La figura se corta por el borde inferior (manos fuera del frame).
✓ La silueta pisa al menos un elemento tipográfico (hombro sobre párrafo o brazo sobre línea lime).
✓ En mobile la figura no compite con el texto — es un bloque entre bloques.
⚠ Confirmar contraste del texto izquierdo cuando haya overlap con la figura — puede necesitar un sutil `text-shadow` o aumento de peso.
⚠ El cutout requiere PNG con alpha real. Si el archivo tiene fondo blanco sólido, el efecto no funciona — hay que generar la versión recortada primero.

---

### Step 6.3b · Correcciones post-aplicación

**Context:** Tras aplicar S6.3, feedback del usuario 2026-04-21: el cutout de la foto funciona bien (color real + grain + sangrado inferior ✓), pero la composición artística alrededor rompe con el resto del site. El AboutHero fusionado dentro de AboutSection dejó de sentirse hermano de los otros heroes (`WORKS`, `CONTACT`). Elementos decorativos extra se sienten forzados.

**Problema identificado:** S6.3 mezcló dos decisiones — "meter el cutout bien" (acierto) y "convertir About en una composición especial distinta al resto" (error). Hay que separar las dos y quedarnos solo con la primera.

**Files:** `src/features/about/ui/AboutHero.tsx` + `src/features/about/ui/AboutSection.tsx` + `src/app/(site)/page.tsx`

**Pasos:**

1. Restaurar `AboutHero.tsx` como componente activo, usando el `<Hero>` primitive igual que `WorksHero` y `ContactSection`:
   - `eyebrow="ABOUT"` (sin `— 03`, sin numeración — ningún otro hero del site la tiene).
   - `statement="Mise en place for the web."` (con el `CulinaryTerm` actual si aplica).
   - `counterLine="the kitchen taught me the rest."`
   - `tone="white"`.
   - `sidePosition="background"`.

2. El cutout vive como `children` del `<Hero>` (slot background), no como elemento absoluto de `AboutSection`:
   - Mantener posición derecha, sangrado inferior, color real + grain ligero — todo lo que ya funciona.
   - Sin borde, sin rounded, sin máscara de gradiente.
   - `object-position` cuidadoso para mobile (no cortar la cara).

3. Eliminar elementos decorativos añadidos en S6.3:
   - Número `03` gigante traslúcido detrás de la figura → fuera. Ningún otro hero del site usa este recurso.
   - Línea `h-px bg-[#cafd00]` horizontal cruzando el párrafo → fuera. Cortar texto con una línea decorativa se siente forzado cuando el resto del site no lo hace.
   - Cualquier `data-cursor-mode="portrait"` o `data-cursor-label="THE CHEF"` residual (el modo ya fue eliminado en Step 6.1).

4. Restaurar `AboutSection.tsx` a su rol original: contenido textual (párrafos + profile rows). Sin composición artística, sin overlap con figura, sin gutters artísticos. Solo aire + tipografía + datos.

5. Actualizar `page.tsx` para volver a montar `<AboutHero />` + `<AboutSection />` como dos componentes separados en el flujo vertical, igual que el resto del site.

✓ AboutHero se lee como hermano de WorksHero y ContactSection — mismo ritmo, misma estructura.
✓ El cutout sigue viviendo en el Hero como side background, sin costuras.
✓ Cero elementos decorativos extra (número gigante, línea lime cruzando texto).
✓ Eyebrow dice `ABOUT` a secas, en el mismo diálogo del resto.
⚠ El único punto de cuidado: que el cutout como `children` del Hero no pelee con el layout del primitive. Si `Hero` espera el children en una columna específica, posicionar la figura absolutamente dentro de ese slot para que sangre por abajo del Hero sin romper el grid.

---

### Step 6.4 · Mobile pass

**Files:** varios, auditoría.

1. Buscar `100vh` → reemplazar por `100svh` donde aplique (heroes, about).
2. Verificar tap targets en nav, botones y cards: mínimo 44×44px.
3. En `src/components/LenisProvider.tsx`, desactivar Lenis en `<768px` (condicionar el init a `window.matchMedia('(min-width: 768px)').matches`).
4. Auditar en 375px y 390px: sin overflow horizontal, tipografía clamp(), carouseles con snap correcto.

✓ Lighthouse Mobile ≥90 en Performance y Accessibility.
⚠ Tras desactivar Lenis, verificar que el momentum nativo de iOS se siente bien y que las revelaciones on-scroll siguen disparando.

---

### Step 6.5 · Vercel Fluid CPU

**Files:** `src/app/**` según hallazgos.

1. Revisar Vercel dashboard → Observability → Fluid Compute. Identificar rutas/funciones más costosas antes de tocar código.
2. Confirmar que `page.tsx` y layouts son Server Components puros sin `fetch` dinámico sin cache.
3. Añadir `export const dynamic = 'force-static'` en rutas estáticas donde aplique.
4. Verificar que `opengraph-image.tsx` cachea correctamente (no regenera por request).
5. Revisar middleware si existe — es el principal driver de fluid CPU.

✓ Invocations/día en rango estático (<100 para un portfolio).
⚠ No optimizar a ciegas: medir primero, actuar después.

---

### Step 6.6 · Works copy + bridge line

**Context:** Feedback del usuario 2026-04-21: el CTA `Start with hospitality` en `WorksHero` suena a onboarding corporativo y no aporta. La línea divisoria actual (`#Hospitality ─── #Digital`) funciona como concepto pero puede pasar a ser más concreta y editorial. La línea le gusta, el copy no.

**Decisión:**
- Eliminar el CTA `Start with hospitality` del `WorksHero`.
- Invertir el peso del bridge: lo concreto arriba, la categoría como subtítulo.

**Files:** `src/features/works/ui/WorksHero.tsx` + `src/app/(site)/works/page.tsx`

**Pasos:**

1. En `WorksHero.tsx`, eliminar el prop `anchor` con el link `Start with hospitality` completo (líneas del `<a>` con `href="#works-gastronomy"`). El Hero queda solo con `eyebrow`, `statement` y `counterLine`.

2. En `works/page.tsx`, reescribir el bridge (líneas ~68–97):
   - `#Hospitality` → `#Kitchen` (lado lime, ancla a `#works-gastronomy`).
   - `#Digital` → `#Interface` (lado cyan, ancla a `#works-development`).
   - Mantener la línea `h-px` central como separador.
   - **Upgrade opcional (recomendado):** cambiar `bg-zinc-800` de la línea central por un gradiente `bg-gradient-to-r from-lime-300/40 via-zinc-800 to-cyan-300/40`. Refuerza visualmente el cruce de mundos.

3. Añadir sublínea tipográfica debajo de cada ancla (`text-[10px] text-zinc-500 mt-1`):
   - Bajo `#Kitchen`: `01 — hospitality`
   - Bajo `#Interface`: `02 — digital`
   - Esto invierte el peso: lo concreto (Kitchen/Interface) gana jerarquía, la categoría (hospitality/digital) queda como pie de página.

4. Mantener los `data-cursor-role` (`chef` en Kitchen, `dev` en Interface) — el cursor sigue cambiando de tono al hover.

✓ WorksHero se siente consistente con el resto de heroes (sin CTA raro, solo statement + counterLine).
✓ El bridge gana concreción: `#Kitchen ─── #Interface` + pies de categoría.
✓ Gradiente lime→cyan en la línea central refuerza el cruce narrativo (opcional pero recomendado).
⚠ Revisar que el hash `#Kitchen` siga anclando a `#works-gastronomy` (el id de la sección no cambia, solo el label visible).

**Estado (2026-04-22):** CTA `Start with hospitality` removido de `WorksHero`.

---

### Step 6.7 · Works density pass

**Context:** Feedback del usuario 2026-04-21: la página `/works` se siente con demasiado aire entre secciones. Diagnóstico: el espacio vertical entre el hero y el primer proyecto suma ~1000–1200px en desktop por acumulación de paddings, un spacer redundante y un bridge de 400px de altura para una sola línea de microcopy. Ese no es el aire awwwards — es hueco.

**Principio rector:** los sites awwwards no tienen menos aire, tienen aire distinto. El aire vive en escala tipográfica, sangrado edge-to-edge y gutters horizontales. NO en gaps verticales entre bloques.

**Files:** `src/app/(site)/works/page.tsx` + `src/features/gastronomy/ui/GastronomySection.tsx` + `src/features/development/ui/DevelopmentSection.tsx` + `src/features/development/ui/WorksList.tsx` + `src/features/gastronomy/ui/GastronomyHorizontalGallery.tsx`

**Pasos:**

1. **Reducir padding de secciones contenedoras en `works/page.tsx`:**
   - Filter row (`#Kitchen ─── #Interface`): `py-32 md:py-48` → `py-16 md:py-24`.
   - Spacer `<div aria-hidden="true" className="h-48 md:h-72" />`: eliminar por completo. Redundante con los paddings de las secciones vecinas.
   - Main wrapper: `pb-32` → `pb-20 md:pb-24`. `pt-28 md:pt-32` queda (respeta el top nav).

2. **Compact de verdad:**
   - Auditar `GastronomySection` y `DevelopmentSection` en modo `compact`. Si heredan `py-32 md:py-52` del modo normal, forzar `py-16 md:py-24` cuando `compact={true}`.
   - El primer proyecto debe ser visible con 1–2 scrolls tras el hero, no con 4.

3. **Eliminar bridge "ready for service →":**
   - Borrar la `<section aria-label="Works narrative bridge">` completa en `works/page.tsx` (líneas ~107–114).
   - El paso gastronomía → development ya está marcado por la filter row arriba (`#Kitchen ─── #Interface`) y por el cambio de tono (lime → cyan). Un segundo bridge es ruido.

4. **Densificar contenido:**
   - `GastronomyHorizontalGallery` y `WorksList`: sangrar edge-to-edge desactivando `pageGutterClassName` en los wrappers de proyectos. El aire lo ponen los gutters internos de cada card/item, no los del main.
   - Títulos de proyecto: si existen en `WorksList`, escalar a `text-[clamp(3rem,8vw,7rem)]`. Grandes, italic, no discretos.
   - Metadata dense: año, cliente, stack, rol — en `font-mono text-[10px]`, apilados cerca del título o sobre la imagen. Estilo "file", no estilo "product card".

5. **Jerarquía del flow final:**
   ```
   WorksHero (full viewport)
     ↓
   #Kitchen ─── #Interface  (filter row, py compact)
     ↓
   GastronomySection edge-to-edge (compact real)
     ↓  (sin bridge)
   DevelopmentSection edge-to-edge (compact real)
   ```

✓ El primer proyecto de gastronomía es visible sin más de 2 scrolls tras el hero.
✓ Entre secciones no hay más de `py-24` de aire vertical en desktop.
✓ Las galerías/listas sangran a los bordes del viewport.
✓ Cero spacers `aria-hidden` de puro relleno en el layout.
⚠ Al quitar el bridge, confirmar que la transición de tono lime→cyan sigue leyéndose. Si no, el filter row debe quedar `sticky top-0` para reforzar la orientación durante el scroll.

---

### Step 6.8 · Hero dialogue pass

**Context:** Feedback del usuario 2026-04-22: los 4 heroes del site no hablan el mismo idioma visual. Diagnósticos acumulados:

- **Eyebrows con color del tono** ([sectionStyles.ts:12-17](src/design/tokens/components/sectionStyles.ts:12)) — HOME/WORKS/CONTACT pintan lime y ABOUT pinta white/62. La metadata debería ser neutral en todo el site; el color del tono tiene que vivir solo en el elemento más grande (statement) + en el scroll cue.
- **Sin indicador de scroll visible en heroes.** El "SCROLL" del home es un cursor label del morph, no un elemento del Hero primitive. Los demás heroes no tienen pista alguna de que haya más contenido abajo.
- **Morph del home con copy redundante y triadas blandas.** "Kitchen craft" / "Digital craft" aparece en bridge label Y en copy (triplicación). Triadas "Service/structure/taste" y "Product/detail/launch" son genéricas de menú y pitch deck respectivamente, sin tensión sensorial.
- **CTAs del morph funcionales, no editoriales.** "See kitchen work →" lee como botón de CMS.

**Principio rector:** un sitio awwwards no gana por gestos aislados, gana por **coherencia radical**. Los 4 heroes deben sentirse páginas de un mismo libro. El diálogo unificado es lo que sostiene todo el resto de gestos visuales.

**Files:**
- `src/design/primitives/Hero/Hero.tsx`
- `src/design/tokens/components/sectionStyles.ts`
- `src/features/home/ui/HomeIdentityMorph.tsx`
- Los 4 heroes (`HomeHero` si existe / `WorksHero` / `AboutHero` / `ContactSection`) para pasar los nuevos props.

---

**Sub-step 6.8a · Eyebrows neutrales en todos los heroes**

1. En `Hero.tsx`, eliminar el map `toneToEyebrowTone` (líneas ~20-25). El eyebrow ya no recibe `tone`.
2. Pasar al Eyebrow siempre `role="muted"` (pinta `text-zinc-500` via `eyebrowMuted`). Alternativamente `role="dim"` (`text-zinc-600`) si queda muy alto contraste.
3. El prop `tone` del Hero sigue existiendo pero solo alimenta: statement accent (si hay `CulinaryTerm` u otro), scroll cue (ver 6.8b), y anchor color (si se mantiene `anchor`).
4. Verificar visualmente que los 4 heroes muestran eyebrow idéntico en color (`ABOUT`, `WORKS`, `CONTACT`, `HOME`).

✓ Los 4 eyebrows leen igual en color. El ojo ya no percibe a ABOUT como "el raro".

---

**Sub-step 6.8b · Status bar inferior (scroll cue + chapter index + metadata)**

**Revisión 2026-04-22 (v3):** historial de decisiones sobre este sub-step:
- v1 propuso línea vertical + punto animado → descartada, poco legible, el usuario no entendió el lenguaje.
- v2 propuso chapter index solo en esquina inferior derecha con flecha → descartada, colisiona con el cutout del About (la figura sangra por el borde inferior derecho y pisa el texto; drop-shadow o subir contraste es compensar, no resolver).
- **v3 (esta):** status bar edge-to-edge en el borde inferior del Hero. Resuelve legibilidad por estructura (tiene su propio backdrop), da contraste garantizado sobre cualquier fondo (negro, cutout, imágenes futuras), y es un gesto awwwards de recurrencia clara en 2025-2026 (Locomotive, Uncommon, varios winners del año).

**Concepto:** una franja fina en el borde inferior del Hero, `bg-black/60 backdrop-blur-md`, que funciona como "status bar" del site. Divide la información en dos extremos: metadata editorial a la izquierda, chapter index a la derecha. Estructura como HUD de cámara o de software editorial.

**Props del `Hero` primitive (opcionales):**
```
index?: string              // "01", "02", "03", "04"
next?: { label: string; href: string }   // { label: 'WORKS', href: '#works' }
meta?: { city?: string; tag?: string }    // metadata para el lado izquierdo
```

**Estructura del elemento:**
- Wrapper: `absolute bottom-0 left-0 right-0 z-20 border-t border-white/5 bg-black/60 backdrop-blur-md`.
- Padding: `py-3 px-6 md:px-10 lg:px-16` (matching `pageGutterClassName`).
- Layout interno: `flex items-center justify-between gap-8`.
- Tipografía: mono uppercase `text-[10px] text-zinc-400` con `tracking-[0.18em]`.

**Lado izquierdo — metadata editorial:**
- Formato: `{meta.city} · {meta.tag}` — ej `MEDELLIN, CO · CHAPTER {index}`.
- Si no se pasa `meta.city`, usar default global `MEDELLIN, CO`.
- Si no se pasa `meta.tag`, fallback a `CHAPTER {index}`.
- **Opcional avanzado:** añadir live time `14:22 GMT-5` que se actualiza cada 60s vía `useEffect`. Metadata viva = site se siente "on" en vez de estático. Es el gesto awwwards de cierre. Si añade complejidad o hay dudas de rendimiento, dejar fuera de la primera iteración.

**Lado derecho — chapter index + arrow:**
- Una sola línea: `{index} / 04 — NEXT: {next.label} ↓`.
- La flecha `↓` (o `↑` en Contact) lleva pulse sutil: opacity `0.5 → 1 → 0.5` cada 2s. El texto no se mueve.
- El texto `NEXT: {next.label} ↓` (incluida la flecha) es un `<Link>` al `next.href` — clickable como teaser del siguiente capítulo. Hover: `text-zinc-200` + flecha opacity 1 constante.
- El segmento `{index} / 04 —` queda como texto estático, no parte del link.
- Respetar `prefers-reduced-motion`: sin pulse, flecha estática.

**Pasar los props en cada hero:**
- `HomeHero`: `index="01" next={{ label: 'WORKS', href: '#works' }}` (o `/works`).
- `WorksHero`: `index="02" next={{ label: 'ABOUT', href: '#about' }}`.
- `AboutHero`: `index="03" next={{ label: 'CONTACT', href: '#contact' }}`.
- `ContactSection`: `index="04" next={{ label: 'TOP', href: '#top' }}` + flecha `↑` invertida.

**Beneficios estructurales de la status bar:**
✓ Legibilidad garantizada sobre cualquier fondo — el backdrop-blur resuelve el problema About sin necesidad de drop-shadow ni subir contraste.
✓ Los 4 heroes cierran con la misma franja visual — diálogo unificado máximo.
✓ Dos funciones en un solo elemento: scroll cue (flecha + pulse) + paginación (chapter index) + orientación (metadata).
✓ Gesto awwwards 2025-2026 verificable (Locomotive, Uncommon).
✓ Elimina el problema de la esquina inferior izquierda vacía — ahora lleva metadata intencional.

⚠ `z-index: 20` sobre el contenido del Hero, pero por debajo del `TopNav` (que suele ir en 50+).
⚠ En About, la figura cutout sigue sangrando por debajo — el backdrop-blur se aplica *sobre* ella, lo que crea un efecto "glass" intencional en esa zona. Verificar que se ve limpio, no turbio. Si molesta, reducir blur a `backdrop-blur-sm` o subir opacidad del black a `bg-black/75`.
⚠ En mobile, revisar que la status bar no rompa la respiración del Hero. Si el hero queda comprimido, reducir `py-3` a `py-2` en mobile.
⚠ Si `next.href` apunta a un `#hash` en la misma página, usar scroll smooth y respetar `prefers-reduced-motion`.

---

**Sub-step 6.8c · Morph copy overhaul (home)**

Cambios en `HomeIdentityMorph.tsx`:

1. **Eliminar bridge labels duplicados.** `BRIDGE_LABELS = ['KITCHEN CRAFT', 'DIGITAL CRAFT']` → `['01 / GASTRONOMY', '02 / INTERFACE']`. Refuerza el diálogo de paginación editorial del Sub-step 6.8b.

2. **Reescribir copy de cada estado** — una frase base fija + segunda línea que muta con el morph:
   - **Estado fijo en la pantalla** (no cambia): `Twelve years plating.`
   - **Estado 1 (CHEF, lime):** segunda línea `Kitchens taught the rhythm.`
   - **Estado 2 (DEV, cyan):** segunda línea `Interfaces keep the beat.`

   En lugar de dos bloques paralelos con triadas genéricas, es **una sola frase de dos líneas** donde la segunda se reescribe al scrollear. El usuario ve una biografía que se actualiza en tiempo real — ese es el gesto awwwards real del morph, no el cambio de slide.

3. **CTAs editoriales, no funcionales:**
   - Estado 1: `See kitchen work →` → `→ watch the kitchen work`
   - Estado 2: `See digital work →` → `→ watch the screens work`

   `watch` sugiere movimiento y sustituye el pasivo `see`. La flecha va antes, como signo editorial, no como botón.

4. **Mantener** la palabra `CHEF → DEV` mutando en tipografía grande — ese gesto ya funciona, es la columna vertebral del morph.

✓ El copy deja de decir "craft" tres veces en 3 segundos.
✓ La triada de cocina y la triada de dev desaparecen como "listas", se vuelven frase.
✓ Los bridge labels se alinean con el chapter index del Sub-step 6.8b (`01 / GASTRONOMY` habla el mismo idioma que `01 / 04 — NEXT: WORKS`).

---

**Criterios de cierre del Step 6.8 completo:**

✓ Test de coherencia: capturas de los 4 heroes alineadas lado a lado se leen como 4 páginas del mismo libro.
✓ En cada hero: eyebrow neutral, statement con accent del tono, counterLine neutral, scroll cue animado con tono, chapter index mono en zinc-500.
✓ Morph del home: frase continua + CTAs editoriales + bridge labels numéricos.
✓ Ningún hero tiene un gesto visual que los otros 3 no repliquen (o en su equivalente).
⚠ Este step toca muchos archivos — dividir en al menos 3 commits: (a) eyebrows neutrales, (b) scroll cue + chapter index primitive, (c) morph copy. Cada uno reversible por separado.

---

### Step 6.9 · Mobile awwwards pass

**Execution update (2026-04-22):** aplicado.
- ✓ 6.9a implementado: clamp del hero, nav/status alturas para mobile, separación del cutout de About en `<lg`.
- ✓ 6.9b implementado: status bar sticky global (`<SiteStatusBar />`) con chapter index por `IntersectionObserver`.
- ✓ 6.9c implementado parcialmente: galerías mobile en `snap-x` + dots + haptic (`navigator.vibrate(10)`) en cambio de chapter.
- ⚠ 6.9c modal editorial de About y progression de form quedan como fase 2.

**Context:** Feedback del usuario 2026-04-22: en mobile se siguen montando textos del hero y la página no se siente 100% mobile. Diagnóstico: el Hero en viewports <768px acumula top nav + eyebrow + statement con clamp mal calibrado + counterLine + status bar, y el About cutout comparte viewport con el texto del hero generando overlap estructural.

**Principio rector:** awwwards mobile ≠ desktop encogido. Los sites awwwards en mobile siguen cuatro reglas que son casi opuestas a sus versiones desktop:

1. **Una idea por viewport.** Cada pantalla es un solo gesto, no una composición multicapa.
2. **Tipografía más grande proporcionalmente**, no más chica — statement que llene 3-4 líneas gigantes.
3. **Scroll choreography en lugar de composición espacial** — el gesto vive en el tiempo, no en el espacio.
4. **Aire vertical generoso, densidad horizontal brutal** — exactamente al revés que desktop.

---

**Sub-step 6.9a · Resolver colisiones actuales (urgente)**

**Files:** `src/design/primitives/Hero/Hero.tsx` + `src/features/about/ui/AboutHero.tsx` + `src/features/about/ui/AboutSection.tsx` + `src/app/(site)/page.tsx`

1. **Hero statement clamp:** en `Hero.tsx:87`, ajustar `text-[clamp(2.75rem,12vw,6.5rem)]` → `text-[clamp(3rem,13vw,6.5rem)]`. El mínimo sube, se acepta que wrappea en 3-4 líneas en 375px — eso es el gesto, no un bug.

2. **Status bar del Hero en mobile (Sub-step 6.8b):** reducir a una sola línea con solo `{index} / 04 ↓`. Sin metadata lado izquierdo (`MEDELLIN, CO · CHAPTER XX` desaparece en <md). Sin `NEXT: {label}`. La metadata completa vuelve en `md:` y superiores. Mobile necesita minimalismo extremo.

3. **About cutout en mobile:** NO compartir viewport con el Hero About. La figura pasa a vivir como bloque separado **debajo** del Hero, ocupando su propio `min-h-svh`. Flow en mobile:
   - Hero About (texto solo, sin figura): `min-h-svh`.
   - Bloque figura (full-width, sangrada por abajo, sin texto superpuesto): `min-h-svh`.
   - AboutSection (párrafos + profile rows): `min-h-[auto]`.
   
   En desktop (`lg:`), el cutout vuelve al slot `children` del Hero como está definido en 6.3b. Este cambio es solo para `<lg`.

4. **Alturas definidas del Hero en mobile:** top nav `h-14`, status bar `h-10`, Hero content real `calc(100svh - 6rem)`. Medir y ajustar — si el counterLine u otros elementos quedan cortados, recortar `py-*` del Hero wrapper.

✓ Cero overlap entre statement, counterLine, status bar y cutout en 375px / 390px / 428px.
✓ El statement ocupa 3-4 líneas gigantes en mobile, no se comprime.
⚠ Al separar el cutout del Hero en mobile, asegurar que el bloque de la figura tiene su propio fade inferior para que no se sienta "suelto".

---

**Sub-step 6.9b · Status bar sticky a la página completa**

**Files:** `src/app/(site)/layout.tsx` (nuevo componente global) + retirar del `Hero` primitive.

1. Mover la status bar del `Hero.tsx` (Sub-step 6.8b) al layout raíz como componente global `<SiteStatusBar />`. Posición: `fixed bottom-0 z-40`, siempre visible durante todo el scroll — no solo en hero.

2. El chapter index dentro de la status bar actualiza en vivo usando `IntersectionObserver` sobre las 4 secciones:
   - Al entrar a Home → muestra `01 / 04 — NEXT: WORKS ↓`.
   - Al entrar a Works → muestra `02 / 04 — NEXT: ABOUT ↓`.
   - Al entrar a About → muestra `03 / 04 — NEXT: CONTACT ↓`.
   - Al entrar a Contact → muestra `04 / 04 — NEXT: TOP ↑`.

3. Transición entre estados: fade suave `transition-opacity duration-300` cuando cambia el label. El `{index}` cambia como counter con una micro-rotación opcional (subida vertical 4px + fade).

4. El `<Hero>` primitive deja de renderizar la status bar — solo contiene eyebrow, statement, counterLine y el slot `children`. Los props `index` / `next` / `meta` se mueven al componente `<SiteStatusBar />` que los deriva del scroll position, no los recibe por prop.

5. En mobile (<md), la status bar sigue siendo `fixed bottom-0` pero con altura reducida (`py-2`) y solo mostrando `{index} / 04 ↓ NEXT` (texto más corto). En desktop, la versión completa con metadata lado izquierdo.

✓ El chapter index es un HUD global, siempre presente, actualizándose con el scroll.
✓ El diálogo unificado se eleva de nivel: no es un elemento de hero, es un elemento del site.
✓ Elimina el problema de overlap del cutout About con el chapter index — ya no viven en el mismo layer.
⚠ Respetar `z-index` vs TopNav (nav va encima de la status bar si hay menú desplegable que se extiende hacia abajo, pero la status bar debe ir encima del contenido general).
⚠ Si la página entra al viewport del form de Contact, el status bar puede tapar el submit button en mobile — considerar ocultarla cuando un form input está enfocado (`:focus-within` del form main).

---

**Sub-step 6.9c · Gestos awwwards específicos de mobile**

**Files:** varios por feature.

1. **Galerías de Works (Gastronomy + Development):**
   - En mobile, convertir el grid vertical en `snap-x snap-mandatory` horizontal. Una card por viewport (`min-w-[85vw]`), swipe táctil.
   - Pagination dots mono abajo (`·· • ··` — dot activo en color del tono).
   - Conservar el grid vertical solo en `md:` y superiores.

2. **About — retrato como modal editorial (opcional, gesto awwwards fuerte):**
   - En mobile, tap sobre la palabra "Chef" en el statement (o sobre el nombre "John Herrera" en el profile) abre la figura cutout fullscreen con fade `duration-500`.
   - Cerrar con tap fuera de la figura o swipe hacia abajo.
   - Reemplaza el bloque separado del Sub-step 6.9a — el cutout deja de vivir en el flow vertical y se convierte en gesto on-demand. Opción más awwwards pero requiere más trabajo. Decidir antes de implementar: bloque separado (simple) vs modal on-tap (gesto awwwards).

3. **Contact form — single-question progression:**
   - Un input por pantalla en mobile. Progreso mono arriba: `01 / 03 — NAME`.
   - Tap Enter o botón `NEXT →` avanza al siguiente campo.
   - En desktop, form tradicional en una pantalla. En mobile, progression editorial.

4. **Transiciones entre secciones en mobile:**
   - Sin Lenis (ya definido en Step 6.4).
   - `scroll-behavior: smooth` nativo.
   - Cuando el chapter index cambia (Sub-step 6.9b), disparar un micro-feedback táctil si `navigator.vibrate` está disponible: `navigator.vibrate(10)`. Haptic sutil, 10ms.

✓ La experiencia mobile tiene su propio vocabulario awwwards — no es mini-desktop.
✓ Horizontal snap galleries, modal cutout, single-question form, haptic feedback en chapter change.
⚠ El haptic feedback solo funciona en algunos navegadores mobile — no es crítico, fallar en silencio.
⚠ El modal cutout es el sub-step más ambicioso del 6.9c. Si el tiempo es corto, priorizar 6.9a + 6.9b y dejar 6.9c como fase 2.

---

**Criterios de cierre del Step 6.9 completo:**

✓ Lighthouse Mobile ≥90 en Performance y Accessibility en 375px / 390px / 428px.
✓ Cero overlap de textos en ningún viewport mobile.
✓ Status bar sticky visible en toda la navegación, actualizándose con el scroll.
✓ Galerías de Works con swipe horizontal en mobile.
✓ El site se siente mobile-native, no mobile-responsive.
⚠ Dividir en 3 commits: (a) fixes de overlap (6.9a), (b) status bar sticky global (6.9b), (c) gestos táctiles (6.9c). El 6.9a es bloqueante; 6.9b y 6.9c son elevaciones.

---

## Global rules while executing

1. **One step = one commit.** Don't batch. Easier to revert.
2. **After every step**, run dev server and visually verify before moving on.
3. **If a step reveals a larger issue**, stop and flag it — don't expand scope silently.
4. **No containers.** If you find yourself adding `border`, `rounded`, `bg-zinc-950/70` to a content wrapper, stop. Use whitespace + type instead.
5. **Test on mobile after every visual step.** The edge-to-edge approach fails silently on mobile if not checked.

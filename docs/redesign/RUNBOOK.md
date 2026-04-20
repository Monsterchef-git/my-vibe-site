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

**Status:** All sprints completed including stability recovery. Redesign is live, polished, and fully stabilized.

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

## Global rules while executing

1. **One step = one commit.** Don't batch. Easier to revert.
2. **After every step**, run dev server and visually verify before moving on.
3. **If a step reveals a larger issue**, stop and flag it — don't expand scope silently.
4. **No containers.** If you find yourself adding `border`, `rounded`, `bg-zinc-950/70` to a content wrapper, stop. Use whitespace + type instead.
5. **Test on mobile after every visual step.** The edge-to-edge approach fails silently on mobile if not checked.

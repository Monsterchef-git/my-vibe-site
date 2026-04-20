# Sprint 0 — Alignment Decisions

**Status:** closed · **Date:** 2026-04-19
**Scope:** awwwards-style redesign of johnherrera.dev
**Narrative:** chef + dev · from kitchens to the web · high-impact, brands that convert

---

## D1 — Hero copy

**Pattern (all 4 pages share this structure):**

```
[eyebrow]         neutral page label, mono, uppercase
[statement]       one sentence, headline italic, ≤6 words
[counter-line]    mono, tensions or answers the statement
[anchor]          single scroll cue OR CTA, never both
```

**Locked copy:**

| Page | Eyebrow | Statement | Counter-line |
|---|---|---|---|
| Home | `HOME` | Cooked fast. Shipped faster. | `twelve years plating. now shipping interfaces.` |
| Works | `WORKS` | Taste, applied. | `kitchens & interfaces. same instinct.` |
| About | `ABOUT` | Mise en place for the web. | `the kitchen taught me the rest.` |
| Contact | `CONTACT` | The pass is open. | `briefs, reservations, collaborations →` |

**Rule:** eyebrows stay neutral. The culinary metaphor lives in body copy and microcopy — never in labels. No course numbering.

---

## D2 — Culinary vocabulary

**Language:** 100% English across the site.

**Allowed (max 8):**
`mise en place` · `service` · `prep` · `plating` · `pass` · `ticket` · `tasting` · `course`

**Banned (cliché):**
`recipe` · `ingredients` · `flavor` · `cooking up` · `secret sauce` · `chef's kiss`

**Rule:** a term only earns its place if it maps cleanly to a digital concept. If it sounds decorative, cut it.

---

## D3 — Signature animations

Two motion moments for the entire site. Everything else is eliminated.

| Animation | Where | Purpose |
|---|---|---|
| **Scramble** | Home name reveal · Contact email hover | Text as material — reveals identity |
| **Glitch** | TopNav `JH.` logo only | Easter egg · brand signature |

**Removed:** typewriter (home, works), scramble on nav/secondary CTAs, glitch on hero text, any decorative motion not listed above.

**Rule:** if a motion effect appears fewer than 3 times with the same intent, it must be deleted or promoted to signature status. No middle ground.

---

## D4 — Page structure

**Option C locked.** No course naming. Numbering lives only in internal section eyebrows if needed (`01`, `02`), never as a page label.

The metaphor is felt, not announced.

---

## D5 — Color system

| Page | Primary tone | Accent | Notes |
|---|---|---|---|
| Home | Lime `#cafd00` | Cyan `rgb(34 211 238)` | Kitchen ↔ digital duality |
| Works | Lime + Cyan (dual) | — | Split `#Hospitality` / `#Digital` preserved |
| About | **White** `#ffffff` | **Lime** | New — origin chapter reads as light |
| Contact | Lime | Blue `rgb(96 165 250)` on LinkedIn only | Blue demoted from primary |

**Social icons in Contact:** all inherit page tone (lime) except LinkedIn (blue). Instagram and GitHub no longer use brand colors.

**Rule:** every section must declare its tone. No neutral/toneless sections.

---

## D8 — Cursor as narrative voice

**Rule:** `MagneticCursor` is not decoration — it is the cursor of a chef who codes. It must reflect the current "room" of the story (kitchen vs digital vs origin vs service) and react to culinary keywords embedded in body copy.

**Modes mapped to narrative:**

| Page / context | Cursor mode | Tone | Label on hover |
|---|---|---|---|
| Home — identity morph (lime state) | `idle` → `cta` on interactive | lime | `ENTER` |
| Home — identity morph (cyan state) | `idle` → `cta` | cyan | `SHIP` |
| Works — hospitality filter | `lens` | lime | `TASTE` |
| Works — digital filter | `lens` | cyan | `OPEN` |
| About — portrait area | `idle` (larger, softer) | white | `THE CHEF` |
| About — body copy | `idle` | lime | — |
| Contact — email installation | `cta` | lime | `PLATE` |
| Contact — social links | `link` | lime (blue on LinkedIn) | `→` |

**Keyword triggers:** any body text wrapped in `<CulinaryTerm>` (new primitive) scales cursor 1.2× and shifts tone to lime with label `TASTE` on hover. Applies only to the 8 allowed terms from D2.

**Data attribute contract** (must be honored site-wide):
- `data-cursor-tone` — lime | cyan | blue | white
- `data-cursor-mode` — idle | link | cta | lens | drag
- `data-cursor-label` — short uppercase string (≤8 chars)
- `data-cursor-role` — chef | dev | bridge | service (auto-maps tone if `data-cursor-tone` is absent)

**Forbidden:** hardcoding cursor tone deep inside components. Tone flows from page → section → element via `data-cursor-role` inheritance.

---

## D13 — Hero hosts itself (consumer contract)

**Rule:** `HeroPrimitive` is responsible for its own edge-to-edge bleed and internal alignment. Consumers must not wrap it in padded or negatively-margined containers.

**Why:** the current AboutHero wraps Hero in `<header className="-mx-6 md:-mx-24">` to escape its parent main's `px-6 md:px-24`. This is the source of the alignment drift: Hero's internal `mx-auto max-w-[78rem] px-6 md:px-24` is already doing the job — the outer negative margins create a double-escape that breaks horizontal layout at certain viewports.

**Contract:**
- Page-level `<main>` **must not** apply horizontal padding when hosting a Hero. Padding is the section's job, not the page's.
- Consumer components (`AboutHero`, `WorksHero`, etc.) **must not** add `-mx-*` margins. They render `<Hero>` directly.
- Hero is always full-viewport-width. Content centering and breathing room live inside Hero via `max-w-[78rem] mx-auto`.
- Sections *after* the Hero that want padded content handle their own `px-6 md:px-24`.

**Forbidden:** `<main className="px-6 md:px-24">` wrapping a page with a Hero. `<header className="-mx-*">` wrappers. Any wrapper that tries to "escape" a parent constraint — the constraint shouldn't exist in the first place.

---

## D9 — Portrait framing (About)

**Rule:** the About portrait is a *character introduction*, not a widget. It gets room to breathe without dominating.

**Spec:**
- Desktop (≥lg): portrait occupies `min(55vw, 40rem)` width — wider than current `40vw/26rem`, narrower than the S1C full-bleed 70vw
- Vertical: anchored bottom-right, bleeds past the bottom edge of the hero (intentional crop)
- Crop: `object-[center_18%]` (not 28%) — shows more torso, less face-zoom
- Gradient mask: left-to-right fade from transparent to pure black at ~40% to protect text legibility
- Mobile: full-width above the fold, 80svh tall, statement sits over the bottom third with gradient mask

**Forbidden:** portrait inside a visible container. Portrait cut off by a hard rectangular box. Portrait centered or small enough to feel like a widget.

**Integration technique (mandatory):** portrait must be rendered as an **absolute-positioned layer** that bleeds to the right viewport edge, not as a flex child in Hero's side slot. Hero's internal padding (`px-6 md:px-24`) would otherwise constrain it to the centered content column — which is what makes it feel detached.

Implementation contract:
- Portrait `<div>` uses `absolute right-0 top-0 bottom-0 w-[min(55vw,40rem)]` on desktop, `relative inset-0 h-[80svh]` on mobile
- Hero's side slot renders the portrait via `sidePosition="background"` on mobile (full-backdrop) AND on desktop (positioned absolute, outside the centered content column)
- Gradient mask direction: **from right to left** — dark on the left edge of the portrait (where text ends), fading to transparent on the right edge of the viewport (where portrait bleeds). Not left-to-right as currently coded.
- Text column in Hero keeps its `max-w-[68rem]` — does not shrink to make room for the portrait. Portrait overlaps the right half of the text column if needed; gradient mask protects legibility.

---

## D10 — Hero layout responsiveness

**Rule:** `HeroPrimitive` must adapt smoothly across viewports, not break at lg.

**Breakpoints:**
- Mobile (<md): stacked. Side slot (if any) sits above text, at 60svh
- Tablet (md–lg): stacked still. Side slot smaller, integrated as backdrop with gradient mask
- Desktop (≥lg): side-by-side with text left, slot right. Slot uses `min(55vw, 40rem)` not `max-w-[40vw]`
- Wide (≥2xl): text anchors to left but max-w clamps around `68rem`. Slot grows up to `48rem` max

**No content max-width greater than `78rem` anywhere on the site.** Edge-to-edge ≠ infinite width.

---

## D11 — Section rhythm without containers

**Rule:** after D7 removed the card chrome, visual pause between sections comes from explicit rules, not ambient styling.

**Rhythm stack (in priority order):**
1. **Whitespace** — section-to-section vertical gap: `py-40 md:py-56` for major section changes (story beat shifts); `py-24 md:py-32` for continuations
2. **Tone shift** — background color never changes (stays black), but `AmbientGlow` tone shifts between sections to signal story change (lime → cyan = crossing the kitchen/digital threshold)
3. **Eyebrow reset** — each new major section opens with a fresh mono eyebrow (`01 · PREP`, `02 · SERVICE`, etc.) in tone of the section
4. **Hairline divider** — `border-t border-zinc-900/60` spans full viewport, used only when rhythm 1–3 are insufficient (rare)

**Forbidden:** relying on the old card borders/rounded corners for section separation. Inline borders on content wrappers. Gradient horizontal dividers (those belong to bridges only).

---

## D12 — Works digital list hover (image reveal)

**Rule:** hovering a project row in the digital list reveals the project's hero image as a soft full-bleed background behind the list, not as a thumbnail next to the row.

**Why:** keeps the editorial-index feel (no cards, no thumbnails in rows), but gives the work visual presence. The image is *atmosphere* for the whole list, not decoration for a single item.

**Spec:**
- Image renders in a fixed-position layer behind the list, `opacity-0` by default
- On row hover: image swaps (crossfade 400ms) and fades to `opacity-25` with a `blur-sm` filter
- Image is desaturated (`grayscale`) until the cursor is actively over the row — cursor leave → back to 0
- Mobile: no hover reveal (touch devices). Alternative: tap opens the project in a new tab, no preview.
- Cursor while hovering row: mode `lens`, label `OPEN`, tone cyan

**Data requirement:** each project in `PROJECTS` needs an `image: string` field (path to a hero screenshot). Currently no image field exists — must be added.

**Forbidden:** thumbnail images inside row content. Image galleries. Hover popups. The image is a whole-list atmosphere, one at a time.

---

## D7 — No containers (edge-to-edge content)

**Rule:** content is never wrapped in visible cards, borders, or chromed sections. Separation between sections = whitespace + typography contrast, not visual containers.

**Implications:**
- `SectionPrimitive` current chrome (`rounded-[3rem] border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl`) is removed. The primitive becomes a semantic/layout wrapper only — no visual styling.
- Works list → raw list on black, separated by dividers or whitespace. No `CardPrimitive` per project.
- Contact → no wrapping card. Content floats on page canvas.
- `CardPrimitive` usage audited and either removed or kept only where a card is semantically correct (e.g., a form field group).
- Backdrop-blur tokens (`glass-*`) only apply to truly floating surfaces (TopNav, modals), not content containers.

**What replaces containers for visual rhythm:**
- Generous vertical whitespace (section gaps ≥ 160px desktop / 96px mobile)
- Type hierarchy contrast (huge headline vs small mono)
- Hairline dividers (`border-t border-zinc-900`) only when structurally needed
- Color/tone shifts between sections (lime zone → cyan zone) replace card separation

---

## D6 — Atmospheric layers

**Grain overlay:** global, mounted in `src/app/layout.tsx`. Opacity `0.03` (down from `0.04`). SVG turbulence filter, `mix-blend-soft-light`.

**Rule:** atmosphere is a constant, not a feature. Per-section grain is forbidden.

---

## Banned language (project-wide audit target)

Remove all instances, including metadata and OG:

- "we craft experiences"
- "premium"
- "passionate"
- "passionate about"
- "crafting"
- "unique"
- "stunning"
- "cutting-edge"
- "journey"
- "solutions"

Replace with concrete verbs: `ship`, `build`, `run`, `plate`, `serve`, `open`.

---

## Definition of done (S0)

- [x] Hero copy locked for 4 pages
- [x] Vocabulary list locked (8 allowed, 6 banned)
- [x] Motion policy locked (scramble + JH. glitch only)
- [x] Page label style locked (neutral eyebrows)
- [x] Color assignments locked (incl. About = white/lime)
- [x] Grain overlay promoted to global
- [x] No containers principle locked (edge-to-edge content)
- [x] Cursor narrative voice locked (D8)
- [x] Portrait framing rules locked (D9)
- [x] Hero responsiveness rules locked (D10)
- [x] Section rhythm rules locked (D11)
- [x] Works digital list hover (image reveal) locked (D12)
- [x] Hero consumer contract locked (D13) — Hero hosts itself

**Next:** Sprint 1 — Heroes. Unify the 4 pages under a single `HeroPrimitive` applying the copy and color rules above.

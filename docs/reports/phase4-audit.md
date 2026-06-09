# Fase 4 Audit

## Orphan components removed

- src/components/BootPanel.tsx
- src/components/LandingCard.tsx
- src/components/LiveScanMetrics.tsx
- src/components/MagneticButton.tsx
- src/components/PageIntroHero.tsx
- src/components/PageLoader.tsx
- src/components/ProvenanceTokens.tsx
- src/components/SplitReveal.tsx
- src/components/StitchCardStack.tsx
- src/components/TypewriterTerminal.tsx
- src/features/development/ui/WorksFeaturedProject.tsx

## Dependency cleanup

- Removed `lucide-react` after removing the only referencing component (`LandingCard.tsx`).

## CSS cleanup

- Removed duplicated `@keyframes hero-fade-up` definition in `src/app/globals.css`.
- Removed unreferenced legacy utility/class blocks tied to deleted components:
  - `material-symbols-outlined`
  - `tight-headline`
  - `status-dot` / `status-pulse`
  - `grain-overlay` / `grain-overlay-animate`
  - `isolution-card*`, `btn-apple`
  - `culinary-*` legacy blocks
  - `split-unit` / `split-visible`

# Fase 4 Audit (Safe Pass)

## Orphan component candidates (not deleted)

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

## Dependency notes

- `lucide-react` is currently referenced only by `src/components/LandingCard.tsx` (orphan candidate), so dependency removal is postponed to avoid touching component inventory without explicit approval.

## CSS notes

- Removed only duplicated `@keyframes hero-fade-up` definition in `src/app/globals.css`.
- No visual utility/class purge was executed in this safe pass.

# Tracking Plan

## Goal

Capture only the events that help answer whether users are navigating, contacting, or opening work items. Keep the plan small and stable.

## Runtime Setup

- `NEXT_PUBLIC_GTM_ID` enables Google Tag Manager.
- `NEXT_PUBLIC_GA_ID` enables direct GA4.
- If GA4 is already deployed through GTM, do not set `NEXT_PUBLIC_GA_ID`.
- Consent defaults to denied in `src/components/GoogleTracking.tsx`.

## Current Events

| Event | Trigger | Notes |
|---|---|---|
| `cta_contact_click` | Contact CTA in the top nav or contact page links | Primary conversion signal |
| `mailto_click` | `mailto:` links | Direct email intent |
| `project_click` | Outbound project links on `/works` | Signals portfolio engagement |
| `nav_click` | Internal navigation links | Measures route movement |

## Event Fields

Each event currently includes:

- `event_category: engagement`
- `event_label`
- `destination` when available
- `location_path`

For GA pageviews, the app sends:

- `page_path`
- `page_location`
- `page_title`

## Operating Rules

- Keep event names stable once they are used in dashboards.
- Add a new event only if it answers a concrete decision.
- Prefer one event per user intent over multiple near-duplicate events.
- Do not send analytics from content that is meant to be non-interactive decoration.

## Review Cadence

- Verify event flow after analytics changes.
- Re-check consent behavior after any GTM or GA updates.
- Confirm that pageview tracking still works after route or layout changes.

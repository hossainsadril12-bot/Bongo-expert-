# Projects page — design

Date: 2026-10-27. Reference: `docs/reference/algorix-projects/design.md` (Algorix /projects layout).

## Goal

A separate `/projects` page that copies the Algorix Projects page layout and copy, but is skinned
entirely in the Bongo Expert design system and keeps the site hierarchy: the same nav at the top
and the same footer at the bottom as the home page.

## Decisions (user-approved)

- **Placement:** new `/projects` page. The home page stays as is; its "More (10+)" link points to `/projects`.
- **Caption plates:** dark navy `#0a1015` (Bongo hero/footer navy), white title, light grey body, tag in `blue-light`.
- **Colours/type:** Bongo tokens only (`@theme` in `src/index.css`): Manrope headings, Inter body, `ink`, `blue-dark` accent, `secondary`, `blue-light`, `#f8faff` page surface. No Agdasima, DM Sans or Algorix greys.

## Page structure (top to bottom)

1. **Navbar** — the home nav, extracted from `Hero.jsx` into `Navbar.jsx`. On `/projects`: "Work" is active (`/projects`, `aria-current="page"`); Services / About / Process go to `/#services` etc.; logo goes to `/`; "Start a Project" goes to `/#contact`. Mobile menu same, with in-page anchors gliding and cross-page links navigating normally.
2. **Hero** (`#f8faff`) — Manrope, weight 400, tight tracking like the home hero.
   - Line 1 centred: "Real-World AI".
   - Line 2 (`lg+`): 3-column grid "Success" | fanned stack of 4 Bongo images | "Stories" (in `blue-dark`).
   - Below: stat card "150+ / Projects delivered" (`blue-light` fill, number in `blue-dark`, rotated about -8°) on the left; paragraph "From automation to predictive analytics, we've helped businesses across industries ship AI systems that deliver measurable results, fast." on the right.
   - Below `lg`: two centred headline lines plus the paragraph; no fan, no stat card.
3. **Project grid** (`#f8faff`) — 2 columns from `md`, 1 column below; 30px gap. Each cell is a photo (`TiltImage`, rounded-lg) plus a separate dark navy caption plate (rounded-lg, ~10px gap). The plate holds the title (Manrope) and description on the left, and the tag and year on the right (`md+`); on phones the tag and year sit inline under the text.
   - AI Customer Support Bot — Automation — 2026 — "Built a conversational AI assistant that resolves customer queries and routes complex issues to the team."
   - Predictive Analytics Platform — Data Analytics — 2026 — "Built a predictive analytics platform that turns raw market data into real-time, actionable forecasts."
   - Smart Vision System — Computer Vision — 2026 — "Built a computer vision system that inspects products in real time and flags defects instantly on the line."
   - Workflow Automation System — Automation — 2026 — "Built a workflow automation system that connects intake, routing, and status updates into one seamless pipeline."
   - Images: Bongo's own `proj1.png`, `proj2.png`, `proj3.png`, `work1.png` (the Algorix photos are the template author's).
4. **Footer** — the existing `Footer.jsx` unchanged visually; its links and CTA point back to home anchors when it renders on `/projects`.

## Motion

Only the tokens in `src/lib/motion.js` (slow, "luxury", no bounce), and every animation honours `useReducedMotion`.
- Headline lines rise through a mask, as in the home Projects heading.
- The photo stack fans out from a single upright pile to fixed angles (-14°, -9°, -4°, 0°) once on load: it shows that there are many projects.
- The stat card and paragraph fade up after the headline.
- Each grid cell's photo wipes in (as on the home page) and its plate fades up after it; `TiltImage` hover tilt is kept.

## Routing

There's no router dependency. `main.jsx` renders `ProjectsPage` when `location.pathname` is `/projects` (trailing slash tolerated), otherwise `App`. The Vite dev server already falls back to `index.html`. A production host needs a rewrite of `/projects` to `/index.html` (noted, not configured here).

## Accessibility

- The body grey on the navy plate must reach ≥ 4.5:1 (checked with `check_contrast.py`).
- `secondary` `#767676` is not used on navy.
- The existing blue focus ring applies; images carry meaningful alt text.

## In scope

`Navbar.jsx` (extracted, Hero uses it), `src/lib/nav.js` (shared links), `MobileMenu.jsx` (homeHref/contactHref props + cross-page links), `Footer.jsx` (page-aware links), `src/pages/ProjectsPage.jsx`, `main.jsx` route switch, home "More (10+)" → `/projects`, a unit test for the projects page render and nav targets, and a browser check of both pages.

## Out of scope

- Algorix's "Trusted by industry leaders" logo wall and text marquee: there are no Bongo client logos.
- Project detail pages.
- Production hosting rewrites.
- Dark mode (the site has none today).
- Any change to the home page visuals other than the "More" link target.

## Branch

Work on a new branch `feat/projects-page` off `fix/project-hover-flicker`.

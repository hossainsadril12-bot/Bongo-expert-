---
version: anydesign-1
name: Algorix Projects page
source: https://algorix-ttm.webflow.io/projects
captured_at: 2026-10-27
description: |
  A Webflow AI-agency template whose Projects page is a white, poster-like hero of condensed
  display type wrapped around a fan of stacked photos, followed by a two-up grid of cinematic
  photo cards with near-black caption plates. Neutral palette, condensed uppercase headings,
  photography carries all the colour.
colors:
  surface: "#FFFFFF"
  surface-tint: "#F7F4FA"
  surface-dark: "#1A1A1A"
  text-primary: "#1A1A1A"
  text-body: "#696969"
  text-on-dark-muted: "#B3B3B3"
  text-on-dark: "#FFFFFF"
  border-dark: "#00000026"
  border-light: "#FFFFFF4D"
  primary-100: "#FF2A18"
typography:
  display: { fontFamily: "Agdasima, sans-serif", fontSize: 100px, fontWeight: 700, lineHeight: 100px }
  display-mobile: { fontFamily: "Agdasima, sans-serif", fontSize: 45px, fontWeight: 700, lineHeight: 55px }
  section-title: { fontFamily: "Agdasima, sans-serif", fontSize: 62px, fontWeight: 700, lineHeight: 72px, textTransform: uppercase }
  card-title: { fontFamily: "Agdasima, sans-serif", fontSize: 24px, fontWeight: 700, lineHeight: 34px, textTransform: uppercase }
  stat-number: { fontFamily: "Agdasima, sans-serif", fontSize: 56px, fontWeight: 400, lineHeight: 1 }
  body: { fontFamily: "DM Sans, sans-serif", fontSize: 16px, fontWeight: 400, lineHeight: 26px }
  body-large: { fontFamily: "DM Sans, sans-serif", fontSize: 18px, fontWeight: 400, lineHeight: 28px }
  label-bracket: { fontFamily: "DM Sans, sans-serif", fontSize: 16px, fontWeight: 400, lineHeight: 26px, letterSpacing: 0.08em }
spacing:
  base: 5px
  scale: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 100]
  section-padding: 100px
  section-padding-mobile: 60px
  container: 1330px
  container-gap: 15px
  card-gap: 30px
rounded:
  card: 10px
  pill: 999px
components:
  nav-menu-pill: { backgroundColor: "{colors.surface-dark}", textColor: "{colors.text-on-dark}", rounded: "{rounded.pill}", padding: 10px 20px }
  project-card: { backgroundColor: "{colors.surface-dark}", textColor: "{colors.text-on-dark-muted}", rounded: "{rounded.card}", padding: 30px }
  stat-card: { backgroundColor: "{colors.surface-tint}", textColor: "{colors.text-primary}", rounded: "{rounded.card}", padding: 25px }
  logo-tile: { backgroundColor: "{colors.surface}", textColor: "{colors.text-body}", rounded: "{rounded.card}", padding: 20px }
  button-outline: { backgroundColor: "transparent", textColor: "{colors.text-on-dark}", rounded: "{rounded.pill}", padding: 12px 30px }
---

# Design Analysis: Algorix Projects page

> Analysis generated with the `anydesign` skill. Date: 2026-10-27. Emphasis: reconstruction, re-skinned onto the Bongo Expert design system

## Source

- URL: https://algorix-ttm.webflow.io/projects (Webflow template "Algorix" by ThemetechMount).
- Method: CSS custom-property digest (`css-vars.json`) plus Playwright computed styles and frames at 1440×900 and 375×812.
- Limits: no tablet viewport; hover and scroll animations were not recorded (static frames only). The "Access 85+ Templates" widget is a Webflow marketplace overlay, not part of the design.

## TL;DR

A loud, condensed display face (Agdasima) does all the brand work on a quiet white page; the hero breaks its own headline in half to drop a fanned stack of photos into the gap. The project list is a strict 2-up grid where each card splits into a photo and a separate dark caption plate. **Insight for Bongo:** keep the composition (split headline + photo stack, image/plate card pair), but swap Agdasima/near-black for Bongo's Manrope + `blue-dark` and its lighter `#f8faff` surfaces.

## 1. Visual identity

### 1.1 Surface description

- **Personality:** bold, editorial, cinematic, confident. ✅ 100px condensed headings, full-bleed moody photos.
- **Mood:** gallery opening. White walls, dramatic framed prints. ✅
- **Stylistic references:** Awwwards-style agency portfolio; condensed-type poster layouts. ⚠️
- **Information density:** low. Four projects fill 2.5 viewports. ✅
- **Implicit positioning:** premium AI studio selling outcomes ("measurable results, fast"). ⚠️

### 1.2 Brand voice / Atmosphere

The page assumes buyers judge an AI studio by taste before capability. So the images are art-directed portraits, not dashboards. Copy is one sentence per project. The only "proof" is a tilted sticky-note stat (150+). Type is set like a film poster so the work feels authored, not engineered. ⚠️

### 1.3 The "ONE brand thing"

- **Thing:** Agdasima 700, condensed, set huge (100px) and uppercase in card titles.
- **Why:** it is the only non-photographic voice; strip it and the page is a generic grid.
- **Restraint:** body copy is plain DM Sans 16px grey; no colour accents in the UI.
- **Where:** hero, card titles, section titles, marquee, footer headings. Never in body or metadata.

## 2. Design System (tokens)

### 2.1 Colors

| Token | Hex | Role | Where it appears | Confidence |
|---|---|---|---|---|
| `surface` | #FFFFFF | page background | hero, project grid | ✅ |
| `surface-tint` | #F7F4FA | lilac-grey band | stat card, client-logo section | ✅ |
| `surface-dark` | #1A1A1A | dark plates | project caption cards, menu pill, footer | ✅ |
| `text-primary` | #1A1A1A | headings | hero, section titles | ✅ |
| `text-body` | #696969 | body copy | hero paragraph, tile labels | ✅ |
| `text-on-dark-muted` | #B3B3B3 | body on dark | card descriptions, tags | ✅ |
| `text-on-dark` | #FFFFFF | titles on dark | card titles, footer headings | ✅ |
| `border-dark` | #00000026 | hairline on light | divider under section title | ✅ |
| `border-light` | #FFFFFF4D | hairline on dark | footer inputs, marquee rule | ✅ |
| `primary-100` | #FF2A18 | defined accent | not visible on this page | ✅ var / ❓ use |

### 2.2 Typography

Heading: **Agdasima** ✅ (condensed display, Google Fonts). Body: **DM Sans** ✅. Fallback `sans-serif`.

| Token | Size | Weight | Line-height | Use |
|---|---|---|---|---|
| `display` | 100px | 700 | 100px | hero "Real-World AI / Success Stories" |
| `display-mobile` | 45px | 700 | 55px | hero on 375px |
| `section-title` | 62px | 700 | 72px | "TRUSTED BY INDUSTRY LEADERS" (uppercase) ⚠️ size |
| `card-title` | 24px | 700 | 34px | project names (uppercase) ⚠️ |
| `stat-number` | ~56px | 400 | 1 | "150+" ⚠️ |
| `body` | 16px | 400 | 26px | all copy |
| `body-large` | 18px | 400 | 28px | footer address |
| `label-bracket` | 16px | 400 | 26px | "[ Client Feedback ]" with brackets |

### 2.3 Spacing

Base 5px ✅ (named scale 5→80). Section padding 100px desktop / 60px mobile ✅. Grid gap 30px between cards (measured) ⚠️. Card inner padding ~30px ⚠️. Photo-to-plate gap ~10px ⚠️.

### 2.4 Radii

Single radius ~10px on photos, plates, logo tiles and stat card ⚠️. Pill (full) on menu button and Subscribe button ✅. Two tiers, never mixed on one element.

### 2.5 Elevation system

| Level | Name | Treatment | Use |
|---|---|---|---|
| 0 | flat | none | everything |
| 1 | tone | `surface-tint` / `surface-dark` fill | stat card, plates, logo tiles |

Flat by design: depth comes from surface tone and the rotated photo stack, never shadows ⚠️. Decorative depth: light page → lilac band → dark footer, a polarity flip toward the bottom.

### 2.6 Borders

1px `border-dark` divider under section titles; 1px `border-light` underline inputs in the footer; no card borders ✅.

### 2.7 Accessibility quick-check

From `design-a11y.md`: heading on page 17.4:1 AAA; body on page 5.49:1 AA; card body on dark 8.3:1 AAA; stat label on lilac 5.04:1 AA. **Bongo `secondary` #767676 on #1a1a1a is 3.83:1, large only.** Use a lighter grey on dark plates.

## 3. Components Inventory

### 3.1 Generic components

#### nav-menu-pill
- Variant: 1 observed. Hamburger icon + "MENU" text, dark pill, top-right.
- Size: ~106×46px.
- Padding/Radius: ~10px 20px / pill.
- States: hover not captured ❓.
- Confidence: ✅ visual.

#### project-card
- Two stacked blocks, separated by ~10px: photo (≈585×530px desktop, cover-cropped) and dark caption plate.
- Plate: title (`card-title`, white) + 3-line description (`text-on-dark-muted`) on the left; tag "AUTOMATION ▪" and year "2026" stacked on the right.
- Mobile: tag and year drop under the description on one line ("AUTOMATION ▪ 2026").
- Padding/Radius: ~30px / 10px on both blocks.
- Confidence: ✅ structure, ⚠️ exact px.

#### stat-card
- "150+" in `stat-number` with "Projects delivered" in body grey, rotated about -8°.
- Fill `surface-tint`, radius 10px. Desktop only, hidden on mobile ✅.

#### logo-tile
- White tile on `surface-tint` band, 4-up × 2 rows, client logo centred, optional "SUCCESS STORIES" caption bottom-right.
- Padding ~20px, radius 10px.

#### button-outline
- "SUBSCRIBE NOW" in footer: 1px light outline, pill, white uppercase 14px text.

### 3.2 Signature components

- **Split headline with photo fan.** Line 1 centred ("Real-World AI"); line 2 split ("Success" … "Stories") with a stack of 4 photos fanned at small rotations sitting in the gap. The front photo is upright. A rotated stat card and a short paragraph float in the lower corners.
- **Image + plate card.** Photo and dark caption are two separate rounded boxes, not one card. That reads as a print with its museum label.
- **Bracket labels.** "[ Client Feedback ]", "[ LET'S CONNECT ]" in body font with square brackets as the eyebrow style.

## 4. Layout & Composition

### 4.1 Grid & containers

Container 1330px max, 15px side gap ✅. Content in the hero/grid sits at ~1200px (x 120→1320 at 1440). The logo section and footer go wider (x 70→1370). 2-column grid, 30px gutter. Hierarchy by size and case only; colour stays neutral.

### 4.2 Composition patterns

1. Centred split-headline hero with photo stack (≈620px tall).
2. 2-up project grid, image + plate per cell, 4 projects (2 rows).
3. Lilac band: bracket label left, uppercase title right, hairline, 4×2 logo tiles.
4. Dark marquee strip of uppercase phrases separated by "/".
5. Dark footer: contact + image left, 3 link columns + newsletter right.

### 4.3 Responsive behavior

| Breakpoint | Hero | Grid | Notes |
|---|---|---|---|
| 1440 desktop | 100px, split line + photo fan + stat card | 2-up | ✅ |
| 375 mobile | 45px, 2 centred lines, no photos, no stat card | 1-up, 15px gutter | ✅ |
| tablet | not captured | ❓ | |

Menu pill 46px tall passes the 44px touch target ✅.

### 4.4 Image behavior

- Photography: cinematic AI-themed portraits and robots, saturated neon (teal, orange, magenta), cover-cropped, radius 10px.
- Hero stack: 4 portrait photos, back ones rotated a few degrees and partly hidden.
- Logos: monochrome black wordmarks on white tiles.

## 5. Reconstruction Notes

**Stack:** rebuild in the existing Bongo app (Vite 7 + React 19 + Tailwind v4 + `motion`); the source is Webflow, no framework signal worth copying.

**Map onto the Bongo design system (required):**

| Algorix | Bongo token to use instead |
|---|---|
| Agdasima display / card titles | `font-manrope` 600, sentence case, tracking -0.02em (as in `Projects.jsx` h2) |
| DM Sans body | `font-inter` 300/400 |
| `text-primary` #1A1A1A | `--color-ink` #3b3b3b; accent word in `--color-blue-dark` #0242be |
| `text-body` #696969 | `--color-secondary` #767676 |
| `surface-tint` #F7F4FA | `#f8faff` (Projects section bg) or `--color-blue-light` #e6eeff for the stat card |
| `surface-dark` #1A1A1A plates | `#0a1017` (Label ink) with body in a ≥4.5:1 grey such as `#a3a9b4` |
| bracket labels | existing `<Label>` component |
| motion | `src/lib/motion.js` `dur`/`ease`, `ease-lux`; `TiltImage` for photos; `MaskWords` for the headline |

**Content to reuse (verbatim):** Hero "Real-World AI Success Stories"; paragraph "From automation to predictive analytics, we've helped businesses across industries ship AI systems that deliver measurable results, fast."; stat "150+ Projects delivered". Projects: AI Customer Support Bot (Automation, 2026), "Built a conversational AI assistant that resolves customer queries and routes complex issues to the team."; Predictive Analytics Platform (Data Analytics, 2026), "Built a predictive analytics platform that turns raw market data into real-time, actionable forecasts."; Smart Vision System (Computer Vision, 2026), "Built a computer vision system that inspects products in real time and flags defects instantly on the line."; Workflow Automation System (Automation, 2026), "Built a workflow automation system that connects intake, routing, and status updates into one seamless pipeline."

**Quick wins:** 2-up grid with `gap-[30px]`; plate as a sibling `div` under the image; hide stat card and photo fan below `lg`.

**Tricky bits:** the split headline needs a 3-column grid (word / stack / word) so the stack stays centred; the fan needs fixed rotations per layer, not random; the photos are third-party template assets, so Bongo needs its own imagery.

**Implicit states:** card hover (image zoom or tilt), menu hover, focus ring (Bongo already has `:focus-visible` blue outline), loading for lazy images.

| Layer | Confidence | Why |
|---|---|---|
| Tokens (color, type) | ✅ | CSS vars + computed styles |
| Spacing / radii | ⚠️ | measured from frames |
| Layout | ✅ | two viewports |
| Motion | ❓ | not captured |

## 6. Do's and Don'ts

### Do
- Keep the photo and the caption plate as two separate rounded boxes with a ~10px gap.
- Split the hero headline around the photo stack on `lg+`, and stack it as plain centred lines on mobile.
- Keep the UI neutral so photography supplies all colour; in Bongo the only UI colour is `--color-blue-dark` on one headline word.
- Use one radius for cards and images and a pill only for buttons, as the source does.
- Put the tag and year on the right of the plate on desktop, and inline under the text on mobile.

### Don't
- Don't use Agdasima or DM Sans in Bongo; use Manrope/Inter from `@theme`.
- Don't put `--color-secondary` #767676 text on a dark plate (3.83:1); use a lighter grey.
- Don't add shadows; depth comes from surface tone and rotation.
- Don't randomise the photo-fan rotations; fix each layer's angle.
- Don't copy the template's photos or client logos; they belong to the template author.

## 7. Open Questions

- Hover and scroll animations: record a screen video or inspect Webflow interactions to settle them.
- Tablet layout (768-1024px): rerun capture with `--viewports tablet`.
- Whether `primary-100` #FF2A18 is used anywhere else on the site.
- Whether Bongo wants dark caption plates or light ones to match its light `#f8faff` section.

## 8. Companion files

- `design-tokens.json`: generated from this frontmatter by `build_tokens_json.py`.
- `design-a11y.md`: WCAG contrast table for 6 pairs.
- `css-vars.json`: raw CSS custom properties.
- Frames: `capture-desktop-01..04.png`, `capture-mobile-01.png` (others captured, not used).

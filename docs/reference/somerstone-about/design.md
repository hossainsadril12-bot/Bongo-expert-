---
version: anydesign-1
name: Somerstone About page
source: https://www.somerstone.com.au/about
captured_at: 2026-10-27
description: |
  A Webflow About page for an Australian family-run property investment group. Pure monochrome
  (black, white, greys), one family (Manrope) at heavy weight with tight negative tracking, and real
  founder photography carry all the trust. It is light at the top, a black band for purpose, white for the
  team, and ends with a giant grey wordmark. Quiet, honest, human.
colors:
  black: "#000000"
  white: "#FFFFFF"
  ink: "#333333"
  grey-60: "#666666"
  grey-40: "#999999"
  grey-20: "#CCCCCC"
  surface-soft: "#F4F4F4"
  border-light: "#DEDEDE"
  card-dark: "#333333"
  card-darker: "#141414"
  primary-lp: "#204CD1"
typography:
  display: { fontFamily: "Manrope, sans-serif", fontSize: 72px, fontWeight: 700, lineHeight: 0.95, letterSpacing: -0.036em }
  display-mobile: { fontFamily: "Manrope, sans-serif", fontSize: 44.8px, fontWeight: 700, lineHeight: 0.95, letterSpacing: -0.036em }
  section-title: { fontFamily: "Manrope, sans-serif", fontSize: 57.6px, fontWeight: 700, lineHeight: 0.95, letterSpacing: -0.032em }
  lead: { fontFamily: "Manrope, sans-serif", fontSize: 19px, fontWeight: 400, lineHeight: 1.26, letterSpacing: -0.02em }
  body: { fontFamily: "Manrope, sans-serif", fontSize: 14px, fontWeight: 400, lineHeight: 20px }
  eyebrow: { fontFamily: "Manrope, sans-serif", fontSize: 13px, fontWeight: 700, lineHeight: 1, textTransform: uppercase, letterSpacing: -0.02em }
  wordmark: { fontFamily: "Manrope, sans-serif", fontSize: 260px, fontWeight: 600, lineHeight: 1, letterSpacing: -0.04em }
spacing:
  base: 8px
  scale: [8, 12, 16, 24, 32, 64, 96, 128]
  page-gutter: 32px
  page-gutter-mobile: 24px
rounded:
  control: 4px
  card: 8px
  photo: 16px
shadows:
  card-dark: "0 0 20px rgba(0,0,0,0.2)"
components:
  nav-menu-button: { backgroundColor: "{colors.card-dark}", textColor: "{colors.white}", rounded: "{rounded.control}", padding: 12px 16px }
  button-outline: { backgroundColor: "{colors.white}", textColor: "{colors.black}", rounded: "{rounded.control}", padding: 12px 16px 12px 12px }
  eyebrow-label: { textColor: "{colors.black}", padding: 0 }
  overlap-card: { backgroundColor: "{colors.card-dark}", textColor: "{colors.white}", rounded: "{rounded.card}", padding: 16px }
  value-card: { backgroundColor: "{colors.card-darker}", textColor: "{colors.grey-40}", rounded: "{rounded.card}", padding: 32px 64px 32px 32px }
  team-card: { backgroundColor: "{colors.white}", textColor: "{colors.ink}", rounded: "0px", padding: 0 }
---

# Design Analysis: Somerstone About page

> Analysis generated with the `anydesign` skill. Date: 2026-10-27. Emphasis: reconstruction (About page layout and style, to be re-skinned for Bongo)

## Source

- URL: https://www.somerstone.com.au/about (Webflow).
- Method: CSS custom-property digest, plus Playwright computed styles, frames at 1440×900 and 375×812, and a full text dump.
- Limits: scroll animations seen only as frozen frames. A white-on-black h2 ("We believe better property decisions…") is in the DOM but not visible in any frame: likely a page-load intro overlay ❓.

## TL;DR

The page sells trust through faces and plain talk. The hero headline is *"We've been where you are."* next to a candid photo of the father-and-son founders. A black purpose band lists four one-line values, then grayscale portraits introduce the people by name and role. Everything is Manrope 700 with tight tracking, in strict monochrome. **Insight for Bongo:** Bongo already uses Manrope, so this structure transfers almost 1:1. Only the black/grey palette swaps for Bongo navy, blue and `#f8faff`.

## 1. Visual identity

### 1.1 Surface description

- **Personality:** honest, warm, grounded, understated. ✅ empathy-first headline, candid founder photo.
- **Mood:** a quiet consulting room, not a sales floor. ✅
- **Stylistic references:** Swiss-minimal Webflow agency template; Linear-like restraint in a human context. ⚠️
- **Information density:** low. Four sections in about 3.3k px. ✅
- **Implicit positioning:** a premium yet approachable family business for "everyday Australians". ✅ copy

### 1.2 Brand voice / Atmosphere

The page treats its buyer as anxious about a big decision. So it never shows off: no awards, no numbers wall, no gradients. It shows the two people who will pick up the phone, admits they've "been there", and names the fear ("paralysed by information overload"). Monochrome and grayscale portraits remove anything that reads as marketing. What's left is people and promises. ⚠️

### 1.3 The "ONE brand thing"

- **Thing:** Manrope 700 headlines at -0.036em tracking with a 0.95 line-height, in pure black.
- **Why:** the dense, tight type is the only "loud" element. It makes plain sentences feel decisive.
- **Restraint:** no colour accent at all on this page (`primary-lp` #204CD1 exists in the CSS but is unused here).
- **Where:** H1, "Meet the experts.", and the footer wordmark. Never in body copy or labels.

## 2. Design System (tokens)

### 2.1 Colors

| Token | Hex | Role | Where it appears | Confidence |
|---|---|---|---|---|
| `black` | #000000 | headings, purpose band bg | H1, black section | ✅ |
| `white` | #FFFFFF | page surface | hero, team, footer | ✅ |
| `ink` | #333333 | body text | lead, bios | ✅ |
| `grey-60` | #666666 | secondary text, card border | bio second paragraph | ✅ |
| `grey-40` | #999999 | labels, button border | footer group labels, value card text | ✅ |
| `grey-20` | #CCCCCC | text on black | purpose paragraph | ⚠️ |
| `surface-soft` | #F4F4F4 | hero tint with subtle noise | hero band | ⚠️ |
| `border-light` | #DEDEDE | hairlines | footer top rule | ✅ var |
| `card-dark` | #333333 | overlap card, MENU button | hero card | ✅ |
| `card-darker` | #141414 | value cards on black | purpose row | ⚠️ |
| `primary-lp` | #204CD1 | blue defined in CSS | not used on About | ✅ var / ❓ use |

### 2.2 Typography

**Manrope** only ✅ (computed). One family, hierarchy by size and weight.

| Token | Size | Weight | Line-height | Use |
|---|---|---|---|---|
| `display` | 72px | 700 | 68.4px (0.95) | H1 "We've been where you are." |
| `display-mobile` | 44.8px | 700 | 42.56px | H1 at 375px |
| `section-title` | 57.6px | 700 | 54.7px | "Meet the experts." |
| `lead` | ~19px | 400 | ~24px | hero paragraph, purpose paragraph, team intro ⚠️ |
| `body` | 14px | 400 | 20px | bios, card text |
| `eyebrow` | ~13px | 700 | 1 | "◆ ABOUT SOMERSTONE", "◆ OUR PURPOSE", "◆ OUR TEAM" (uppercase) |
| `wordmark` | ~260px | 600 | 1 | footer "Somerstone" in grey #4D4D4D ⚠️ |

Tracking is always negative on display (-0.032 to -0.036em). Paragraphs are -0.02em ⚠️.

### 2.3 Spacing

Base 8px ⚠️. Page gutter 32px desktop, 24px mobile ✅ measured. Section padding ~128px vertical ⚠️. Card padding 16px (overlap) and 32/64px (value) ✅ computed.

### 2.4 Radii

Three tiers ✅:
- 4px on controls (MENU, Book a call).
- 8px on cards.
- ~16px on the hero photo, with only its bottom-right corner visibly rounded against the black band ⚠️.

Team portraits are sharp (0px).

### 2.5 Elevation system

| Level | Name | Treatment | Use |
|---|---|---|---|
| 0 | flat | none | text, portraits |
| 1 | tone | `card-dark` / `card-darker` fill + 1px #666 border | overlap card, value cards |
| 2 | glow | `0 0 20px rgba(0,0,0,0.2)` | overlap card only |

Mostly flat. Depth comes from polarity bands: soft-white hero, black purpose band, white team section. A huge faint Somerstone diamond logo sits in the black band as a background watermark.

### 2.6 Borders

1px #999 on the outline button. 1px #666 on dark cards. A 1px hairline above the footer. No focus style observed ❓.

### 2.7 Accessibility quick-check

From `design-a11y.md`: H1 21:1, body 12.6:1, purpose paragraph on black 13.1:1 (all AAA); bio small text 5.74:1 AA. **The footer group labels #999 on white are 2.85:1, which fails AA.** Don't copy that.

## 3. Components Inventory

### 3.1 Generic components

#### nav-menu-button
- Dark pill-ish rectangle: hamburger icon + "MENU", 13px bold uppercase, white on #333.
- Radius 4px, ~46px tall. Opens a menu overlay (not captured ❓).
- Sits beside the outline CTA, top-right.

#### button-outline
- "↗ BOOK A DISCOVERY CALL": arrow icon + uppercase bold label, white fill, 1px #999 border.
- Padding 12px 16px 12px 12px, radius 4px. The single CTA in the header.

#### eyebrow-label
- A small black diamond ◆ (echoes the logo) + uppercase 13px bold label.
- Above each section title: About Somerstone, Our Purpose, Our Team.

#### overlap-card
- Dark #333 card, 8px radius, 1px #666 border, soft glow.
- Content: one sentence ("We're a growing collective built on family values…") plus a text link "↗ START YOUR JOURNEY" with an underline.
- Straddles the hero and black band, left of the photo.

#### value-card
- Four cards in a row on black: a line icon (path, handshake, target…) above a one-line value.
- #141414 fill, 1px border, 8px radius.
- The cards fade from bright to dim left to right, which suggests a staggered scroll reveal or horizontal carousel ⚠️. The 4th card ("We give the same care to your investments as we would our own") is off-frame.

#### team-card
- A grayscale portrait (~443×446, sharp corners), then "NAME / ROLE" (name bold black, role grey), then a one-sentence lead in 15px ink, then a smaller 13px grey paragraph.
- 2-up, centred, ~18px gap.

### 3.2 Signature components

- **Empathy split hero.** Left column: eyebrow, 2-line H1 and a 4-line lead. Right column: a large candid photo of both founders, bleeding down into the black band below. The photo crosses the section edge, and so does the overlap card. That crossing physically joins "who we are" to "why we exist".
- **Purpose band with value cards.** A black section: eyebrow, a ~20px paragraph naming the client's fear, then a row of one-line values with icons.
- **Giant footer wordmark.** "Somerstone" set ~260px in dark grey and clipped at the bottom edge of the page, under a light link matrix (Menu / Social / Contact / Legal).

## 4. Layout & Composition

### 4.1 Grid & containers

- Full width with a 32px gutter, and no max-width container on the hero.
- The team section is centred at ~905px (two 443px columns).
- The hero is a 2-column split of roughly 55/45 with the photo flush right at x≈800-1360.
- Section rhythm: hero ~680px, black band ~900px, team ~1200px, footer ~700px.

### 4.2 Composition patterns

1. Header: logo left, MENU + outline CTA right. There are no inline links; everything is behind MENU.
2. Split hero (text left, photo right) with an overlapping card and photo crossing into the next band.
3. Black purpose band: eyebrow, lead paragraph and a 4-up value card row.
4. Centred team intro: eyebrow, H2 and centred lead, then 2-up grayscale portrait cards.
5. Footer: logo mark left, a 3-column link matrix right, then a giant clipped wordmark.

### 4.3 Responsive behavior

| Breakpoint | Hero | Purpose | Team | Header |
|---|---|---|---|---|
| 1440 | 2-col split, photo right | 4-up cards | 2-up | MENU + Book CTA |
| 375 | stacked: text, then photo inside the black band | stacked cards ⚠️ | 1-up ⚠️ | MENU only (CTA hidden) |

Display scales 72 → 44.8px (×0.62); section title 57.6 → 27.2px. Touch target: MENU 46px ✅.

### 4.4 Image behavior

- Candid colour photo of the founders on a sofa in the hero: natural light, no filters, rounded.
- Studio grayscale portraits on a light grey background in the team section, uniform crop at head and torso.
- Large low-contrast logo watermark inside the black band.
- Line icons (stroke ~2px, grey) on value cards.

## 5. Reconstruction Notes

**Stack:** rebuild inside the Bongo app (Vite + React + Tailwind v4 + motion). The source is Webflow with no framework signal.

**Map onto Bongo (required):**

| Somerstone | Bongo |
|---|---|
| Manrope 700, tight tracking | `font-manrope` (already the Bongo heading face); Bongo heroes use weight 400 to 600, so pick 600 for the About H1 to stay on-brand |
| Black #000 headings | `--color-ink` #3b3b3b with the accent word in `--color-blue-dark` |
| Black purpose band | Bongo navy `#0a1015` (hero and footer navy), text in `#aab1bd` and white |
| `card-dark` / `card-darker` | navy plates `#0a1015` with a 1px `white/10` border, as on `/projects` |
| Outline "Book a discovery call" | the existing Bongo "Start a Project" pill (one CTA intent) |
| MENU-only header | keep the Bongo `Navbar` (links pill + Start a Project), with About active |
| ◆ eyebrow | the existing Bongo `<Label>` (star.svg + text) |
| Footer wordmark + matrix | keep Bongo `Footer` (hierarchy rule). Optional: a giant "Bongo" wordmark in blue-dark at 6% opacity |
| Grayscale team portraits | real Bongo team photos, grayscale, sharp or 8px corners |

**Quick wins:**
- Split hero with `grid lg:grid-cols-[1.2fr_1fr]`.
- The photo crosses into the navy band with negative bottom margin.
- Value cards as a 4-up grid that drops to 2-up and then 1-up.

**Tricky bits:**
- The photo and card cross the section boundary. Use `relative z-10` plus a negative margin, and make sure the navy band starts behind them.
- The value-card stagger fade.
- Finding real team photos; there's no stock alternative.

**Implicit states:** card hover (lift or border brighten), CTA hover, menu open, image loading.

| Layer | Confidence | Why |
|---|---|---|
| Tokens | ✅ | computed styles + CSS vars |
| Layout | ✅ | 2 viewports + full text |
| Motion | ❓ | frames only |
| Value card behaviour | ⚠️ | fade gradient suggests reveal or carousel |

## 6. Do's and Don'ts

### Do
- Lead with a first-person, empathetic H1 next to a real photo of the founders, as in "We've been where you are." beside the sofa photo.
- Let the hero photo and overlap card cross into the next band to tie the sections together.
- Keep each value to one sentence with one line icon, four cards maximum.
- Introduce team members as "NAME / ROLE", a one-sentence lead, then a short detail paragraph.
- Use one heavy display style with negative tracking, and body text in the same family.

### Don't
- Don't use #999 text on white (2.85:1, as the footer labels do); use at least `{colors.grey-60}` (#666666).
- Don't add colour accents beyond the brand's one accent; Somerstone uses none on this page.
- Don't round the team portraits differently from each other; keep one crop and one radius.
- Don't put shadows on anything but the single overlap card.
- Don't hide the only CTA on mobile, as Somerstone does; Bongo's mobile menu already carries "Start a Project".

## 7. Open Questions

- Page-load intro: the hidden h2 "We believe better property decisions…" suggests a statement overlay before the page. A screen recording would confirm it.
- Whether the value cards are a carousel or a staggered scroll reveal. A slow scroll recording would settle it.
- MENU overlay design: not captured; it needs a click-state capture.
- Mobile layout of the value cards and team cards (only the first mobile frame was reviewed).

## 8. Companion files

- `design-tokens.json`: generated from this frontmatter by `build_tokens_json.py`.
- `design-a11y.md`: contrast table for 6 pairs.
- `css-vars.json`: raw CSS variables.
- Frames: `capture-desktop-01..04.png`, `capture-mobile-01.png` (mobile 02 to 04 captured, not reviewed).

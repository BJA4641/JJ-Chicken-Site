# AGENTS.md — JJ Chicken website

Read this file first, every session. Then read `STATE.md` for where the build
currently stands, and `docs/MEMORY.md` for decisions that must not be re-litigated.

---

## What this is

The JJ Chicken website, built as part of a competitive pitch for **Almed Retail's
Website Rebuild Programme** (four F&B brands: JJ Chicken, Juan Valdez, Derwandi,
Solidaire). We are the agency bidding. JJ Chicken is brand one of four.

This repo is JJ Chicken only. Other brands get their own repos, sharing this
component vocabulary but **not** its visual identity — the client's scope says
explicitly that no brand may read as a reskin of another.

---

## Non-negotiables

These come from the client brief or the brand book. Do not change them without
being told to.

1. **No prices anywhere on this site.** Pricing lives on `order.jjchicken.com`
   (ChatFood). One source of truth means a seasonal change never strands a stale
   number on the website. `menu.json` has no price field — keep it that way.
2. **Ordering is an outbound link, not a build.** Almed is outsourcing order
   management. Every order CTA points at `https://order.jjchicken.com`. Keep it a
   single constant (`ORDER_URL` in `assets/js/site.js`) so swapping platform is a
   one-line change.
3. **Bilingual EN/AR with true RTL.** Not a translation layer. Layout mirrors,
   Arabic gets its own typeface, logical CSS properties throughout
   (`margin-inline-start`, `inset-inline-end`, never `margin-left`).
4. **Mobile is the primary experience**, not an adaptation. App-style patterns —
   the client wants this site to become a native app later without a rebuild.
5. **Brand book is law.** Colours, type and ratios below are not suggestions.
6. **No commercial data on the site.** No fees, royalties, unit economics or
   investment figures. Those live in the franchise pack, sent on request.

---

## Brand spec (JJ CHICKEN BRAND BOOK, 2024)

**Colour — primary, 80% of usage**
| | Hex | Notes |
|---|---|---|
| Black | `#000000` | dominant surface |
| Yellow | `#FAD22C` | Pantone 123 C — the brand's single most recognised asset |
| White | `#FFFFFF` | |

**Colour — secondary, 20% of usage**
| | Hex | Notes |
|---|---|---|
| Red | `#EB214A` | Pantone 192 C — used only for BEST SELLER and franchise accents |
| Purple | `#A04E9D` | reserved |
| Navy | `#38568E` | reserved |

Brand book colour map weighting: **50 / 25 / 19 / 2 / 2 / 2**. Keep secondary
colours rare. Yellow is a strike colour, not a background.

**Type**
- Display: **DIN Condensed Bold** — always caps, 50pt+, usually textured.
  Currently substituted with **Oswald** (Google Fonts) pending licensed webfont.
- Body: **Aftika** (Regular / Bold / Extra Bold). Currently substituted with
  **Figtree**.
- Arabic: **IBM Plex Sans Arabic**. Never stretch a Latin face to set Arabic.

**Logo** — abstract chicken head with beak and crest, framed in a semi-square
holding the letters JJ. "JJ" is short for *jayje* / *d'jeje*, Levantine Arabic for
chicken. May be used without the word CHICKEN.

**Signature asset** — the repeating `HORMONE FREE · GRAIN FEED` band. It runs as a
live marquee on every page. It is the one memorable element; do not add competing
signature devices.

---

## Architecture

Static, dependency-free. No build step, no framework, no npm install.
Deploy target is Vercel (static). This is deliberate: the client's marketing team
must never need a developer for routine changes, and the eventual CMS binding
should be a data-layer swap, not a rewrite.

```
index.html          Home — hero, signature rail, USP, entry points to layer two
menu.html           Menu — categories, no prices
locations.html      Branch directory with area filter
franchise.html      Franchise pitch — models, support, criteria, process
assets/css/site.css Single stylesheet, all pages
assets/js/site.js   Drawer, language, marquee, data rendering
assets/data/branches.json   Branch register — source of truth
assets/data/menu.json       Menu — source of truth, no prices
docs/               MEMORY, ROADMAP, SOURCES
STATE.md            Current build status — update at the end of every session
```

**Information architecture.** The homepage does *not* contain menu, locations or
franchise content. Those are second-layer pages, reached from the sidebar drawer,
the footer, or the three explore cards. This was a direct client instruction.

**Navigation.** Sidebar drawer (hamburger, top right) is primary. Footer links are
secondary. Two floating actions sit bottom-right on every page: **Order now**
(→ ChatFood) and **Chat with us**.

---

## Working rules

- **Data before markup.** Adding a branch or menu item means editing JSON, never
  HTML. If you find yourself hand-writing a card, stop and extend the data file.
- **Every string is bilingual.** Pattern: `<span class="en">…</span><span class="ar">…</span>`.
  A missing `.ar` span is a bug, not a todo.
- **Arabic must be reviewed by a native Gulf speaker before anything ships to the
  client.** The Arabic currently in this repo is agency-drafted and has not
  been reviewed. Flag this in any handover.
- **Logical properties only.** `padding-inline`, `inset-inline-end`, `margin-block`.
  A physical `left`/`right` will break RTL.
- **Test both directions.** Toggle to Arabic before calling anything done.
- **Respect `prefers-reduced-motion`.** Already handled in CSS — don't add
  animation that bypasses it.
- **Keyboard and focus.** `:focus-visible` is styled. Keep it visible.

---

## Open questions for the client

Tracked in `STATE.md`. Never invent an answer to these — surface them.

- Silicon Central DSO: outlet phone, exact unit, Google Maps pin
- Official WhatsApp number for the Chat action
- Food truck: does it get its own branch entry?
- Al Shamkha: removed from the site on instruction, but it is a live
  Talabat-exclusive location. Delisting it entirely costs local search visibility.
  Decision pending.
- Wings and Salads categories exist on the ChatFood menu; items not yet supplied
- Licensed DIN Condensed Bold and Aftika webfonts
- Food photography — none supplied yet; the design currently carries no imagery
- "Café" appears throughout the brand book. Is JJ Chicken Café a separate concept
  needing its own space on the site?

---

## Source documents

See `docs/SOURCES.md` for links to the client's brand book, business profile,
franchise strategy deck, branch register and the programme scope of work.

# STATE

**Last updated:** 2026-08-05
**Phase:** Pitch build — JJ Chicken concept, pre-client-presentation
**Deploy:** live at `jjchicken.vercel.app` (Vercel project `jj-chicken-site`)

---

## Done

| | |
|---|---|
| ✅ | Design system locked to brand book — palette, ratios, type scale, marquee |
| ✅ | Bilingual EN/AR with true RTL mirroring, language choice persisted |
| ✅ | Sidebar drawer navigation + footer links |
| ✅ | Floating Order now (→ ChatFood) and Chat with us actions |
| ✅ | `index.html` — hero, signature rail, USP, three explore cards |
| ✅ | `menu.html` — categories from JSON, no prices |
| ✅ | `locations.html` — 12 branches, area filter, tel + directions |
| ✅ | `franchise.html` — 3 models, support pillars, criteria, 6-step process |
| ✅ | `about.html` — name story, vision, mission, history timeline, why charcoal, Almed Retail |
| ✅ | Branch register digitised from Almed's Physical Locations spreadsheet |
| ✅ | Al Shamkha removed, Silicon Central DSO added, per instruction |

## In progress

- Nothing currently mid-flight. Safe to pick up anywhere.

## Next

1. Deploy to Vercel, get a shareable preview URL
2. Careers page (simple) and Contact page
3. Wire the Chat action once the WhatsApp number is confirmed
4. Native Gulf Arabic review of every string — **blocking before client presentation**
5. Add JSON-LD: `Restaurant` per branch, `Organization` with `subOrganization`,
   `BreadcrumbList`, `FAQPage`
6. GA4 + Meta Pixel via GTM with Consent Mode v2, plus PDPL cookie banner
7. Food photography — currently the design carries none

## Blocked

| Item | Waiting on |
|---|---|
| Licensed DIN Condensed Bold + Aftika webfonts | Almed |
| Silicon Central outlet phone, unit, map pin | Almed |
| Official WhatsApp number | Almed |
| Wings + Salads menu items | Almed |
| Food photography | Almed |
| Food truck — own branch entry or not | Almed |
| Al Shamkha delisting vs. keeping for local SEO | Almed decision |
| "Café" — separate concept or sub-brand? | Almed |

---

## Decisions this session

- Leaflet vendored to `assets/vendor/leaflet/` (js, css, 5 images). unpkg is a
  free community CDN with no uptime guarantee; the store locator must not depend
  on it. Both files verify byte-for-byte against the SRI hashes that were in
  `locations.html`, confirming authentic upstream 1.9.4. `integrity`/`crossorigin`
  dropped — they only apply to cross-origin loads.

- `preview.html` got Leaflet **inlined** rather than pointed at
  `assets/vendor/`. It is a single-file build meant to travel on its own; a
  relative path would have broken that silently. Marker images are data URIs.
  Verified: with every external host blocked it renders 11 pins, where the
  previous CDN version rendered none.

- **The map still depends on a second third party.** Basemap tiles come from
  `basemaps.cartocdn.com` (`assets/js/site.js`). If CARTO is down the cards and
  pins still render but the map is blank. Vendoring tiles is not practical —
  a paid provider with an SLA or a static fallback image would be the fix.
  Not addressed here.

- **No generator for `preview.html` exists in this repo**, though the docs
  describe it as generated and never hand-edited. It was updated by a scripted,
  deterministic transform. The missing generator is a real gap — `preview.html`
  can drift from the source pages with nothing to catch it.

- Repo structure repaired. The GitHub web uploads had paired filenames with the
  wrong contents — a file named `site.js` held schema JSON, one named `ROADMAP.md`
  held the stylesheet, `download` held a branch page. A later upload fixed
  `assets/`, `docs/` and `locations/`, leaving 21 mis-paired strays at the root.
  All 21 removed. Every file was identified by reading its content, never its
  name. No renames were needed — every correct file was already in place.

- Where a stray held bytes found nowhere else, the surviving copy was confirmed
  newer before deleting: `assets/css/site.css` carries the About-page rules and
  the `#map` z-index fix; `assets/js/site.js` carries `initReveal`,
  `initParallax` and `rescanReveal`. The root copies predated both.

- `about.html` `<head>` completed. It had the stylesheet and canonical but was
  missing all three `hreflang` alternates, the full Open Graph block, the Twitter
  card and the Google Fonts preconnect — so it rendered in fallback typefaces and
  was invisible to Arabic hreflang targeting. Head rebuilt from the
  `franchise.html` pattern.

- About page added: the name story, vision and mission verbatim from Almed's
  documents, a four-step history, why charcoal, and the Almed Retail parent
  section. Wired into drawer nav, footer, homepage explore cards and sitemap.

- Quality-mark band reverted to badges only — the "claim / standards" headline
  was removed. The five marks speak for themselves.
- Marquee star separators enlarged to 1.35em without changing the word size.

- Repo restructured for a public, client-facing GitHub: all tooling references
  removed, context file renamed to `AGENTS.md`.
- Added `docs/GIT-WORKFLOW.md` and `docs/AGENT-PROMPT.md` — branch naming, PR
  template, delete policy, file organisation rules.
- Homepage rail set to the seven specialty platters, descriptions removed
  pending photography. Sauces moved to the menu page.
- Branch map rebuilt: all twelve pinned, no API key, dark tiles.

- Prices removed from the entire site. They live on ChatFood only.
- Native ordering module dropped — Almed is outsourcing order management.
  Every CTA is now an outbound link to `order.jjchicken.com`.
- Menu, Locations and Franchise moved off the homepage into second-layer pages.
- Homepage reduced to: hero → marquee → signature items → USP → explore cards.
- Signature items show name, Arabic name, description and marination only.

---

## Known issues

- Arabic strings are agency-drafted and unreviewed. Do not ship to client
  without a native Gulf reviewer.
- `menu.json` Wings and Salads categories are empty; they are filtered out of the
  render rather than shown as empty sections.
- Silicon Central has `lat`/`lng` of `null` and a `#` map link.
- Branch count disputed across source documents: brand book says "more than 13",
  its back cover lists 9, the business profile says "9 outlets and 1 Food Truck",
  and the locations register has 12 after our edit. The register is authoritative.

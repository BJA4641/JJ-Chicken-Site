# STATE

**Last updated:** 2026-08-05
**Phase:** Pitch build — JJ Chicken concept, pre-client-presentation
**Deploy:** not yet deployed

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

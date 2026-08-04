# SEO STRATEGY — JJ CHICKEN

Written for Almed Retail. This is what will actually move revenue, what will not,
and the order to do it in.

---

## 1. The honest part first

You asked to rank #1 in the UAE for "grilled chicken", "healthy food", "chicken",
"breast platter" and "good food in UAE". Two of those are winnable and worth
winning. Two are neither, and I would rather say so now than bill for them.

**Not winnable, and not worth it:**

| Query | Why not |
|---|---|
| "good food in UAE" | The SERP is TimeOut, Zomato, Tripadvisor and listicles. Google reads it as a *discovery* query and returns aggregators, not brands. Even at #1 the intent is wrong — nobody searching this is about to order charcoal chicken in Mirdif. |
| "healthy food" | Generic, informational, global. Returns nutrition content and delivery aggregators. A restaurant brand does not compete here. |
| "chicken" | Ambiguous head term. Returns recipes, Wikipedia, and poultry suppliers. |

A single-brand site does not outrank Talabat and Deliveroo on generic discovery
terms — those platforms have thousands of times the domain authority and are the
format Google *wants* to serve for that intent. Budget spent there produces
rankings you cannot get and traffic that would not convert if you did.

**Winnable and valuable:**

| Query cluster | Why it works |
|---|---|
| **"near me" / local pack** | 12 branches = 12 catchments. This is where QSR revenue lives. Highest priority by a distance. |
| **Branded defence** — "jj chicken", "jj chicken menu", "jj chicken dubai mall" | Aggregators currently outrank jjchicken.com for JJ's own name. That is lost margin: every order that goes via Talabat instead of direct costs commission. |
| **"charcoal grilled chicken dubai / abu dhabi"** | Specific, mid-volume, and JJ has a genuine claim — first fast-casual charcoal grill in the UAE. Realistically #1. |
| **Dish + intent** — "chicken breast platter", "tawouk platter dubai", "shawarma rolls dubai" | Long-tail, high intent, low competition. Wins fastest. |
| **"hormone free chicken" / "halal grilled chicken"** | The five quality marks are a real differentiator and almost nobody optimises for them. |
| **Arabic** — "دجاج مشوي على الفحم دبي", "فروج مشوي" | The biggest open opportunity. Most UAE F&B sites publish English-only or machine-translated Arabic. Genuine RTL Arabic content is close to uncontested. |

**Reframe the goal:** not "#1 for healthy food", but *"when anyone within 5km of a
JJ branch searches for grilled chicken, chicken platters, shawarma, or JJ by name,
in English or Arabic, JJ is the first result and the order comes direct."*
That is achievable, measurable, and it pays.

---

## 2. Priorities, in order

### Priority 1 — Google Business Profile (highest ROI, not a website task)
Local pack placement beats organic rankings for QSR. Twelve profiles need:
- Correct, identical NAP matching the website exactly
- Primary category **Chicken restaurant**, secondaries: Charcoal-grilled, Lebanese, Fast food
- Real photos per branch, updated monthly
- Every branch page on the site linked as the profile's website URL (not the homepage — this is the single most common mistake and it wastes eleven of your twelve profiles)
- Menu attribute pointing at `/menu/`
- Ordering link pointing at `order.jjchicken.com`
- Review responses within 48 hours, always

Google Business Profile is where "grilled chicken near me" is won. Not the website.

### Priority 2 — Branch pages ✅ built
One indexable page per branch at `/locations/[branch]/`, each with `Restaurant`
schema, address, geo coordinates, hours, phone, map link and an order action.
Twelve pages targeting "[dish] + [area]" and "near me" intent, each linkable from
its own GBP listing.

### Priority 3 — Branded defence
Own the search for JJ's own name:
- Sitelinks via clean IA and `BreadcrumbList` ✅
- `Organization` + `WebSite` schema ✅
- `subOrganization` linking all twelve branches to the parent ✅
- Consistent `sameAs` across Instagram and Facebook ✅
- Direct-order CTA above every aggregator mention

### Priority 4 — Arabic ✅ foundation built
`hreflang` en-AE / ar-AE / x-default on every page and in the sitemap.
Every string genuinely bilingual with real RTL.
**Blocking:** the Arabic in this build was written by Claude and needs a native
Gulf reviewer before launch. Arabic keyword research has not been done yet and
should be, because it is the cheapest win available.

### Priority 5 — Dish pages (next build)
`/menu/charcoal-grilled-chicken/`, `/menu/tawouk-platter/`,
`/menu/jj-w-batata/`, `/menu/chicken-breast-platter/`, `/menu/shawarma-rolls/`.
One page per hero dish with its own `MenuItem` schema, photography, and
"available at these branches" internal linking. This is what wins
"chicken breast platter" outright.

### Priority 6 — FAQ ✅ schema built, page pending
`FAQPage` schema is live on the homepage covering halal, locations, ordering,
why charcoal, and flavours. A dedicated `/faq/` page should follow — it captures
long-tail "is jj chicken halal", "jj chicken opening hours", "does jj chicken deliver".

---

## 3. What is already built

| | |
|---|---|
| ✅ | `Organization` + `WebSite` + `FAQPage` schema on the homepage |
| ✅ | `Menu` schema with 16 sections and every item, marked `HalalDiet` |
| ✅ | `Restaurant` schema per branch — address, geo, hours, phone, `OrderAction`, `hasMenu` |
| ✅ | `BreadcrumbList` on every branch page |
| ✅ | `subOrganization` graph tying twelve branches to the parent |
| ✅ | 12 indexable branch pages with unique titles, descriptions and body copy |
| ✅ | `sitemap.xml` with hreflang annotations, 16 URLs |
| ✅ | `robots.txt` |
| ✅ | Canonical + hreflang (en-AE / ar-AE / x-default) on all main pages |
| ✅ | Open Graph, Twitter card, theme colour, geo.region |
| ✅ | Static build, no framework, no render-blocking JS — Core Web Vitals by construction |
| ✅ | Semantic headings, one `h1` per page, real `<section>` structure |
| ✅ | Visible focus states, reduced-motion support, logical properties for RTL |

---

## 4. Two honest trade-offs to decide

**Prices are off the site.** Right call commercially — one source of truth on
ChatFood, no stale numbers. The SEO cost: `MenuItem` schema cannot carry `offers`,
so JJ will not surface price in rich results, and "jj chicken prices" queries land
on a page that does not answer them. Two options, both acceptable:
1. Accept it. Prices are a small ranking factor for restaurants.
2. When the CMS is bound, sync price into schema only, from the same ChatFood
   source that feeds the ordering page — never hand-typed, so it cannot go stale.

Do **not** hand-enter prices into schema while hiding them on the page. Google
treats schema that contradicts visible content as spam.

**Ordering lives on a subdomain.** `order.jjchicken.com` is treated by Google as a
mostly separate site, so the conversion happens off the main domain. That is fine —
but it means the main site's job is discovery and trust, and the order button must
be relentless. It already is: floating action on every page, in the drawer, on every
branch card, on the hero.

**One thing to avoid:** do not put the 4.4–4.7 delivery-platform ratings into
`AggregateRating` schema. Self-serving review markup that is not collected on your
own site is against Google's guidelines and risks a manual action. Show them as
design, as we do — just never as structured data.

---

## 5. Measurement

Set up before launch, not after:
- Google Search Console, both `jjchicken.com` and `order.jjchicken.com`
- GA4 via GTM with Consent Mode v2 and a PDPL-compliant banner
- Conversion events: order click, call click, directions click, franchise enquiry
- Track order clicks **per branch page** — that is how you prove local SEO works

**KPIs that matter**, in order: direct orders from organic; local pack impressions
per branch; branded search share vs aggregators; Arabic sessions; calls from the
site. **Not** total keyword count, and not rankings for terms nobody buys from.

---

## 6. Realistic timeline

| Window | What happens |
|---|---|
| Weeks 1–2 | GBP fully rebuilt across 12 branches. Fastest, biggest single lift. |
| Weeks 2–4 | Site launches with everything above. Indexing begins. |
| Weeks 4–8 | Branded terms consolidate. Branch pages start appearing for "[area] + grilled chicken". |
| Months 2–4 | Dish pages rank for long-tail. Arabic starts landing — usually faster than English, because the competition is thinner. |
| Months 4–6 | "charcoal grilled chicken dubai" and similar reach page one. Local pack stabilises across all catchments. |

Anyone promising #1 for "healthy food in UAE" inside six months is either
misunderstanding the SERP or telling you what you want to hear.

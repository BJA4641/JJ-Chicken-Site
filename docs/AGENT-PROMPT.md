# AGENT PROMPT & PR WORKFLOW

Two things here: the prompt to paste at the start of a coding session, and the
rules for how work gets organised into branches, pull requests and deletions.

---

## Part 1 — The kickoff prompt

Paste this verbatim at the start of every new session, before asking for any work.

```
Before doing anything, read these four files in order and confirm you have:

1. AGENTS.md          — brand spec, non-negotiables, house rules
2. STATE.md           — what is done, in progress, and blocked right now
3. docs/MEMORY.md     — settled decisions. Do not re-open these.
4. docs/GIT-WORKFLOW.md — branch, PR and merge conventions

Then run `git pull` and `git status` and tell me the current branch and whether
the tree is clean.

Context: this is the JJ Chicken website, a static bilingual (EN/AR) site for a
UAE charcoal-grilled chicken brand. It is client-facing agency work.

Hard rules, which override any instinct to the contrary:

- No prices anywhere on the site. They live on the external ordering platform.
- Ordering is an outbound link, never a build. One constant, ORDER_URL.
- Content lives in assets/data/*.json. Never hand-write a card in HTML.
- Every user-facing string needs both an .en and an .ar span. A missing .ar is
  a bug, not a todo.
- Use CSS logical properties only (margin-inline-start, inset-inline-end).
  A physical left/right will break the Arabic layout.
- No framework, no npm, no build step. Static by design.
- Never name the tooling used to build this, anywhere in the repo or the site.
- Do not commit secrets or tokens.

Work in branches, open a PR, and wait for my review before merging to main.
Update STATE.md at the end of every session.

Do not start coding yet. Tell me what you have read and what you understand the
current state to be, then wait for my instruction.
```

**Why the last line matters.** An agent that starts editing before confirming
state will happily rebuild something that already exists, or undo a decision made
three sessions ago. One turn of confirmation costs nothing and prevents most of it.

---

## Part 2 — How work is organised

### Branch naming

| Prefix | Use for | Example |
|---|---|---|
| `feat/` | new pages or features | `feat/dish-pages` |
| `fix/` | something broken | `fix/map-blank-on-mobile` |
| `content/` | copy, menu or branch data | `content/arabic-review` |
| `seo/` | schema, meta, sitemap | `seo/faq-page` |
| `chore/` | tidying, docs, config | `chore/update-state` |

One branch per unit of work. If a branch touches four unrelated things it is
four branches.

### The PR loop

```bash
git checkout main && git pull
git checkout -b feat/dish-pages
# ... work ...
git add -A
git commit -m "Add dish pages for tawouk and breast platter"
git push -u origin feat/dish-pages
gh pr create --fill          # or open the PR on github.com
```

Then: review the Vercel preview URL that appears on the PR, approve, merge,
delete the branch.

### What a PR description must contain

```markdown
## What changed
Two lines, plain English. What a reader would notice.

## Why
The instruction or the problem this solves.

## Check this
- [ ] Loads in English and in Arabic
- [ ] Works on mobile
- [ ] No prices appear anywhere
- [ ] JSON still parses (menu and locations pages render)
- [ ] STATE.md updated

## Open questions
Anything needing a client decision. Say so rather than guessing.
```

### When to merge straight to main

Only for: typo fixes, `STATE.md` updates, and single-value data corrections
(a phone number, an address). Everything else goes through a PR — not because
the process is sacred, but because the Vercel preview URL on a PR is the only
way to actually see a change before it is live.

### When to delete

**Delete freely:**
- Merged branches, immediately after merging
- Generated files that are rebuilt from source (`preview.html`, `sitemap.xml`)
- Anything superseded — the old menu structure, dead CSS

**Never delete without asking:**
- Anything in `assets/data/` — that is the source of truth for all content
- `docs/MEMORY.md` — it is the institutional memory
- The twelve branch pages in `locations/` — each is an SEO asset with its own
  Google Business Profile pointing at it
- `.gitignore`

**The test:** if it can be regenerated from something else in the repo, delete
it without ceremony. If it *is* the source, it needs a decision.

### Commit messages

Imperative mood, describes the change, no ceremony:

```
Add dish pages for tawouk and breast platter
Fix map rendering blank when container is hidden
Update branch register — remove Al Shamkha, add Silicon Central
```

Not: `updates`, `fixes`, `wip`, `changes as discussed`.

---

## Part 3 — File organisation

```
/                      Pages live at the root so URLs stay clean
  index.html           /
  menu.html            /menu
  locations.html       /locations
  franchise.html       /franchise
  preview.html         GENERATED — single-file build for client review
  sitemap.xml          GENERATED — rebuild when pages are added
  robots.txt

/locations/            One page per branch. SEO assets. Twelve of them.
                       Each is the destination for its Google Business Profile.
                       Adding a branch means adding a page AND a sitemap entry.

/assets/css/site.css   One stylesheet, every page. No per-page CSS.
/assets/js/site.js     One script. Each feature is its own init function,
                       all called from the DOMContentLoaded handler.
/assets/data/          SOURCE OF TRUTH. Content changes happen here.
  branches.json          12 branches — name, address, phone, geo, map link
  menu.json              16 categories, 75 items, no prices
  marks.json             the five quality marks
  schema-*.json          generated structured data

/docs/
  MEMORY.md            Settled decisions. Read first, change rarely.
  ROADMAP.md           Phases, and an explicit out-of-scope list
  SEO.md               Strategy, competitor targeting, keyword tiers
  SOURCES.md           Provenance for every factual claim
  GIT-WORKFLOW.md      Auth, daily loop, conflicts
  AGENT-PROMPT.md      This file

AGENTS.md              Brand spec and house rules. Read first, every session.
STATE.md               Current status. Update at the end of every session.
README.md              How to run it
```

### Rules that keep this tidy

1. **Pages at the root, data in `assets/data/`, prose in `docs/`.** Nothing else
   at the root.
2. **Adding a branch** = edit `branches.json` → add `locations/[slug].html` →
   add a sitemap entry. Three steps, always all three.
3. **Adding a menu item** = edit `menu.json`. One step. Never touch HTML.
4. **Generated files are never hand-edited.** `preview.html`, `sitemap.xml` and
   `schema-*.json` are rebuilt. Editing them by hand guarantees the next
   regeneration silently discards your change.
5. **New page** = create the file, add it to the drawer nav in all pages, add it
   to the footer, add a sitemap entry, add canonical and hreflang tags. Five
   steps. A page that is not in the sitemap does not exist to Google.

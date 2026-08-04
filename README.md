# JJ Chicken — website

Static bilingual (EN/AR) website for JJ Chicken, built for Almed Retail's
Website Rebuild Programme.

## Run it

No build step, no dependencies. Serve the folder:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

A plain file-open will not work — `menu.html` and `locations.html` fetch JSON,
which needs an HTTP origin.

## Deploy

Vercel, as a static site. No framework preset, no build command, output `./`.

```bash
npx vercel
```

## Structure

```
index.html          Home
menu.html           Menu — no prices, they live on order.jjchicken.com
locations.html      12 branches, area filter
franchise.html      Three models, support, criteria, process
assets/css/site.css Single stylesheet
assets/js/site.js   Drawer, language, marquee, rendering
assets/data/        branches.json + menu.json — edit these, not the HTML
CLAUDE.md           Read first if you are Claude Code
STATE.md            Where the build stands
docs/MEMORY.md      Settled decisions and client context
docs/ROADMAP.md     What comes next
docs/SOURCES.md     Where every fact came from
```

## Editing content

Add a branch or a menu item by editing the JSON. Never hand-write a card in HTML.
Every user-facing string needs both an `.en` and an `.ar` span.

## Before shipping to the client

Arabic in this repo was written by Claude and has **not** been reviewed by a
native Gulf speaker. That review is blocking.

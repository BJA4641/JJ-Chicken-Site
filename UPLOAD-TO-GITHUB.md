# Getting this into GitHub cleanly

If the repo is already messy, do not try to merge — replace. It is faster and
you lose nothing, because everything here is the source of truth.

## Option A — web upload (no terminal)

1. Go to https://github.com/BJA4641/JJ-Chicken-Site
2. Delete the existing files: open each one → the ⋯ menu → **Delete file** →
   commit. Or delete the repo entirely and create it again, which is quicker.
3. On the empty repo page click **uploading an existing file**.
4. Unzip this archive first. Then drag in **the contents of the `jj-chicken`
   folder** — not the folder itself.
   You should be dragging: `index.html`, `menu.html`, `locations.html`,
   `franchise.html`, `preview.html`, `sitemap.xml`, `robots.txt`, `AGENTS.md`,
   `STATE.md`, `README.md`, `.gitignore`, and the `assets`, `docs` and
   `locations` folders.
5. Commit.

**The most common mistake:** dragging the `jj-chicken` folder in, which gives you
`JJ-Chicken-Site/jj-chicken/index.html`. The homepage must sit at the repo root or
nothing will deploy correctly.

## Option B — terminal

```bash
cd jj-chicken
git init
git add .
git commit -m "JJ Chicken site — bilingual, 12 branch pages, full schema"
git branch -M main
git remote add origin https://github.com/BJA4641/JJ-Chicken-Site.git
git push -u origin main --force
```

`--force` overwrites whatever is up there now. That is what you want if the
current state is broken.

## Deploy to Vercel

1. vercel.com → **Add New → Project** → import the repo
2. Framework preset: **Other**
3. Build command: leave empty
4. Output directory: leave empty
5. Deploy

Static site, no build step, no environment variables. It will just serve.

## Checking it worked

- `/` loads the homepage
- `/menu.html` shows 16 categories, no prices
- `/locations.html` shows 12 branches **and a map with 12 yellow pins**
- `/franchise.html` loads
- `/locations/dubai-mall.html` loads — the SEO branch pages
- The عربي button flips the whole layout right-to-left

If the map is blank, the page is being opened directly from disk instead of over
HTTP. Serve it properly: `python3 -m http.server 8000`.

## Making it public for review

Settings → General → scroll to **Danger Zone** → Change visibility → Public.
Once public, the repo can be read directly and reviewed file by file.

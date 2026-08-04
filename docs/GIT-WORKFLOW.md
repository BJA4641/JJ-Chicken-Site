# GIT WORKFLOW

How to work on this repo from a terminal or a coding agent, including while the
repo is **private**. Read once, then follow the daily loop at the bottom.

---

## 1. Authenticate — this is what makes a private repo work

A private repo is unreadable to anything that is not authenticated. Web browsing,
scraping and unauthenticated fetching all return **404** — not "403 forbidden",
but a plain 404, because GitHub deliberately hides the existence of private repos.
So an agent that can only browse the web will never see it, public or not, unless
it has a real git client and a token.

The fix is to authenticate the machine once. Two ways.

### Option A — GitHub CLI (recommended)

```bash
# macOS
brew install gh
# Windows
winget install --id GitHub.cli

gh auth login
# → GitHub.com → HTTPS → authenticate in browser → done
```

`gh auth login` also configures git credentials, so `git clone`, `pull` and `push`
on private repos then work with no further setup.

### Option B — Personal access token

1. github.com → Settings → Developer settings → **Personal access tokens** →
   Fine-grained tokens → Generate new token
2. Repository access: **Only select repositories** → `JJ-Chicken-Site`
3. Permissions → Repository permissions → **Contents: Read and write**
4. Generate, copy the token, store it somewhere safe — it is shown once

```bash
git clone https://github.com/BJA4641/JJ-Chicken-Site.git
# Username: your github username
# Password: paste the token (not your account password)

# so you are not asked every time
git config --global credential.helper store   # macOS: osxkeychain
```

**Never** commit a token. `.gitignore` already excludes `.env`; keep it that way.

---

## 2. First-time setup

```bash
git clone https://github.com/BJA4641/JJ-Chicken-Site.git
cd JJ-Chicken-Site
git config user.name  "Your Name"
git config user.email "you@example.com"
```

Run it locally — the menu, locations and map read JSON over HTTP, so opening the
files directly from disk will leave them blank:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

---

## 3. The daily loop

```bash
git pull                       # always first — never start on a stale tree
# ... make changes ...
git status                     # see what actually changed
git add -A
git commit -m "Add dish pages for tawouk and breast platter"
git push
```

**Pull before you start, every time.** Most merge pain comes from editing a file
that someone already changed upstream.

---

## 4. Branches, when a change is risky

```bash
git checkout -b dish-pages     # branch off main
# ... work, commit ...
git push -u origin dish-pages
```

Then open a pull request on GitHub, review the diff, and merge. Use a branch for
anything you might want to abandon. Commit straight to `main` only for small,
obviously-safe edits.

---

## 5. Merging and conflicts

```bash
git checkout main
git pull
git merge dish-pages
```

If git reports a conflict it will mark the file like this:

```
<<<<<<< HEAD
the version currently on main
=======
the version from your branch
>>>>>>> dish-pages
```

Edit the file so it reads correctly, delete all three marker lines, then:

```bash
git add <file>
git commit
```

**Conflict-prone files in this repo**, because they are generated or dense:
`assets/data/*.json`, `assets/css/site.css`, `sitemap.xml`.
If two people edit `menu.json` at once, take one version wholesale rather than
hand-merging JSON — a half-merged JSON file breaks the whole menu page.

Escape hatches:

```bash
git merge --abort              # back out of a merge in progress
git checkout -- <file>         # throw away local changes to one file
git reset --hard origin/main   # nuclear: match remote exactly, lose local work
```

---

## 6. Rules for an agent working in this repo

Put these in front of any coding agent before it touches anything:

1. **Read `AGENTS.md` first, then `STATE.md`, then `docs/MEMORY.md`.**
   Settled decisions live there. Do not re-open them.
2. **`git pull` before starting. `git push` when a unit of work is done.**
3. **Never commit secrets**, tokens, or anything from `.env`.
4. **Content changes go in `assets/data/*.json`, never in HTML.**
   Hand-writing a card in markup is the single most common regression here.
5. **Every user-facing string needs both `.en` and `.ar`.** A missing `.ar` is a
   bug, not a todo.
6. **Update `STATE.md` at the end of every session** — what changed, what is
   blocked, what is next. That file is how the next session starts informed.
7. **Test both directions** before calling anything done. Flip to Arabic.
8. **Do not add prices to the site.** They live on the ordering platform.
9. **No build step.** No framework, no npm, no bundler. Static by design.
10. **Do not name the tooling used to build this** anywhere in the repo or the
    site. This is client-facing work under the agency's name.

---

## 7. Deploying

Vercel is connected to `main`. Every push to `main` deploys automatically.
Pull requests get their own preview URL — use those for client review rather than
sending screenshots.

To roll back: Vercel dashboard → Deployments → pick a previous one → Promote to
Production. Faster and safer than reverting a commit under pressure.

---

## 8. If the repo is in a bad state

Do not untangle it. Replace it.

```bash
cd jj-chicken                  # the clean tree
git init
git add .
git commit -m "Clean baseline"
git branch -M main
git remote add origin https://github.com/BJA4641/JJ-Chicken-Site.git
git push -u origin main --force
```

`--force` overwrites the remote entirely. That is the intent when the remote is
broken and the local tree is known good.

<div align="center">

# openware.

### Software you own outright.

**Every drop replaces a subscription you are already paying for. Clone it, point it at a model you own, and keep it.**

![drops](https://img.shields.io/badge/drops-0-black?style=flat-square)
![accounts](https://img.shields.io/badge/accounts-0-black?style=flat-square)
![models](https://img.shields.io/badge/models-bring%20your%20own-black?style=flat-square)
![license](https://img.shields.io/badge/license-MIT-black?style=flat-square)

</div>

---

This repository is the **Openware website**, and the place to
[nominate a target](../../issues/new?template=target.md).

Each drop lives in its own repository under
[github.com/openwarehq](https://github.com/openwarehq). Nothing is published
yet — the first replacement is being built and used before it ships.

## The thesis

A subscription for a system prompt and somebody else's API key is not a
company. It's a markup.

Openware ships the thing underneath. Every drop is a **real, working
application** — not a demo, not a UI clone with mocked data, not a "coming
soon." You clone it, you run it, you own it. It talks to *your* model: a local
one on your own hardware, or your own API key.

There is no Openware account. There will never be an Openware account.

## The bar

Every drop clears all five, or it doesn't ship.

1. **Your model. Always.** Local on your own GPU, or your own API key. Never
   ours. If it can't run fully offline against a local model, it doesn't ship.
2. **One command.** `docker compose up`. If installing it needs a wiki, it
   isn't self-hostable — it's homework.
3. **The core job, end to end.** The thing the product is actually *for*,
   working, with real output. Mocked backends are not releases.
4. **An honest "what this doesn't do."** In every README, near the top. Scope
   you state up front is a feature. Scope discovered at 2am is a betrayal.
5. **It gets used before it ships.** If we wouldn't reach for it over the thing
   it replaces, it isn't finished.

---

## Running the site

Next.js static export — `npm run build` writes plain HTML/CSS/JS to `out/`.
No server, no runtime, nothing to host beyond a bucket.

```bash
npm install
npm run dev          # http://localhost:4330
npm run build        # writes out/
npm run typecheck
```

> **Stop the dev server before building.** `next dev` and `next build` both own
> `.next`, so a build against a live dev server replaces the chunks it is
> serving and dev dies with `Cannot find module './240.js'`. Setting `distDir`
> does **not** avoid this — the build's server output still lands in `.next`,
> and all `distDir` does is send the export somewhere other than `out/`.

## Adding a drop

1. Append one object to [`src/data/drops.ts`](./src/data/drops.ts). Every page,
   the search index, the home counters and the static route params derive from
   that array.
2. Put screenshots in `public/shots/` and reference them with a leading slash —
   `asset()` in [`src/lib/asset.ts`](./src/lib/asset.ts) prefixes the deploy
   base path so they resolve at a domain root and under `/<repo>` alike.
3. Restore the detail route, which is parked while the list is empty:

   ```bash
   git mv "src/app/drops/_detail-disabled" "src/app/drops/[slug]"
   ```

   Next cannot export a dynamic route that produces zero pages, so with no
   drops the build fails on `/drops/[slug]`. An `_`-prefixed folder is private
   in the App Router, so the page stays typechecked but unrouted until needed.
   Nothing inside it needs changing.

## Deliberate constraints

- **Three dependencies:** `next`, `react`, `react-dom`. No CSS framework, no
  icon package, no animation library. One stylesheet, `src/app/globals.css`.
- **It fetches nothing at load.** Both typefaces are self-hosted via
  `next/font/local`; the hero board, the brand mark and every icon are inline
  SVG. No CDN, no Google Fonts, no analytics.
- **No vendor logos.** Subscription names appear as text, to say what a drop
  replaces. The marks on the hero board are generic geometry — see the note in
  [`src/components/Glyph.tsx`](./src/components/Glyph.tsx).
- **No "Sign in."** There is no account and there never will be, so the slot
  that would hold one links to the source.
- **Motion fails open.** The scroll-reveal hidden state is gated on an
  attribute only the runtime sets, so with JS unavailable nothing is ever
  hidden. It is disabled entirely under `prefers-reduced-motion`.

## Verified

Measured over the Chrome DevTools protocol against the built export, not
asserted:

- No horizontal overflow at 390, 768, 1280 and 1680 px, across every route.
- Every text node clears WCAG AA contrast, with alpha-composited backgrounds.
- With motion reduced, every animated element sits at its final state.
- With JavaScript disabled, no content is hidden.

## Deploying

`.github/workflows/pages.yml` builds this repo and publishes it to GitHub
Pages on every push to `main`.

**Enable Pages first:** Settings → Pages → Source: **GitHub Actions**. Until
that is set, the first workflow run fails at the deploy step.

The workflow reads the base path from `actions/configure-pages`, so it stays
correct whether the site is served from `openwarehq.github.io/openware`, from a
renamed repo, or from a custom domain.

---

<sub>MIT — take it, sell it, host it, fork it. That's the whole idea. Not
affiliated with any company named here; names describe what a drop replaces,
and no logos or assets are used.</sub>

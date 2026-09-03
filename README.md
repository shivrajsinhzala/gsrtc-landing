# gsrtc.shivrajsinh.in — ST Tracker's marketing and SEO site

Astro, static output, deployed over SSH to nginx on the tracker's own Oracle Cloud VM (Cloudflare
is DNS + CDN only, not Pages — see Deploy below). This domain never runs the tracker itself, on
purpose: every CTA links out to **tracker.shivrajsinh.in**. If a page here ever starts to feel
like the app rather than an advertisement for it, that is the bug to fix — nothing here should
try to show a live bus.

Split out of the `ST-Tracker` repo (it lived in `landing/`) when it moved to Astro. The tracker
app is still there and unchanged.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # generates redirects + feed, builds, then verifies
npm run verify     # the post-build checks on their own, against dist/
```

`npm run build` is deliberately three steps in one:

1. `scripts/gen-redirects.mjs` → `public/_redirects`
2. `scripts/gen-feed.mjs` → `public/rss.xml` + `feed.xml`
3. `astro build`, then `scripts/verify-build.mjs`

Both generators read the same page data the routes are built from, so a page cannot exist
without a redirect from its old URL, or be missing from the feed.

## The pages

| Kind | Count | Source |
|---|---|---|
| Homepage (English + Gujarati) | 2 | `src/pages/index.astro`, `src/pages/gu/index.astro` |
| Hand-written SEO guides | 4 | `src/pages/*.astro` |
| Generated guide / route / city pages | 53 | `src/pages/[slug].astro` ← `src/data/pages.data.mjs` |
| Privacy, 404 | 2 | `src/pages/*.astro` |

The 53 generated pages come from the same `pages.data.mjs` the old build script read, ported
across unchanged. The difference is that they are now built from it on every build rather than
stamped out to disk by a script someone had to remember to re-run.

To add one: give it a genuinely different job — not a synonym of an existing page's title — and
add it to `pages.data.mjs`. Everything else (route, sitemap entry, redirect, feed item) follows.

## URLs, and why the old ones still work

The old site served every page as `<slug>.html`, and that is how Google has them indexed. This
build serves them extensionless (`/gsrtc-tracker`), so **all 70 legacy URLs are 301'd** from
`public/_redirects`, which Cloudflare Pages answers at the edge.

Astro's own `redirects` config is deliberately not used for this: it emits an HTML page carrying
a `<meta http-equiv="refresh">`, which is not a 301 and passes ranking signals more slowly and
less reliably. For 70 pages that already rank, that difference is the whole point.

`?lang=gu` is handled separately by `src/components/LegacyLangRedirect.astro` — Cloudflare
matches `_redirects` on the path only, so a query-string rule there would silently never fire.

`scripts/verify-build.mjs` fails the build if any legacy URL stops resolving.

## Languages

English at `/`, Gujarati at `/gu` — real, separately-rendered documents, which is the main thing
the old client-side `?lang=gu` switch could not be.

**Only the homepage is translated.** The other 70 pages are English-only and deliberately carry
no `hreflang` and no `/gu/` route. The reasoning, and what to do when a page does get
translated, is in [`src/i18n/README.md`](src/i18n/README.md). Read it before adding a Gujarati
URL for anything — the wrong move there actively hurts the pages this site exists to rank.

## Deploy (self-hosted nginx, NOT Cloudflare Pages)

This site is built locally and shipped over SSH to `/var/www/gsrtc-astro` on the same Oracle
Cloud VM that runs the tracker app. Cloudflare sits in front as DNS + CDN only — there is no
Cloudflare Pages project, no CI, no git push that triggers a deploy. See
[`deploy/README.md`](deploy/README.md) for the actual commands, the live nginx config
(`deploy/nginx-gsrtc.conf`), and the rollback procedure.

`public/_headers` and `public/_redirects` are Cloudflare Pages/Netlify convention and are
excluded from what actually ships — nginx's own config carries the equivalent headers, and
`nginx-gsrtc.conf`'s `try_files` handles routing instead of `_redirects`.

After the first deploy, submit `https://gsrtc.shivrajsinh.in/sitemap-index.xml` in Search
Console. Note the filename changed — the old site served `sitemap.xml`, Astro's integration
emits an index plus a child file, and `robots.txt` points at the index.

## It shares the app's design tokens

`:root` in `src/styles/global.css` is a copy of the app's palette from the tracker's
`web/styles.css`. **If the app's palette changes, copy it here too** — a marketing page in
different colours from the product it is selling reads as a different product.

## Analytics and ads

- `public/analytics.js` — GA4 (`G-01KB3Z78PW`), a same-origin loader so the CSP stays at
  `'self'` plus named hosts rather than needing `'unsafe-inline'` for Google's own snippet.
- AdSense is `ca-pub-7164999486301748`, with two manual `<ins>` slots per content page.
  **Auto ads (the in-text format that splices an ad into body copy) cannot be turned off from
  the page** — `enable_page_level_ads: false` is the legacy 2017 API and now throws against the
  modern script tag. It is a dashboard setting: AdSense → Ads → By site.

Both are scoped to this site only. The tracker app's own privacy policy promises no third-party
trackers, and that promise still holds there.

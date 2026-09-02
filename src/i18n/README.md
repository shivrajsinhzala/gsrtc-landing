# Languages on this site

English and Gujarati, with one deliberate asymmetry that several files point back at this note
for the reasoning.

## What changed in the move to Astro

The old site switched language by rewriting the DOM: a `STRINGS` table in `app.js`, a pass over
every `[data-i18n]` element, and `?lang=gu` pushed into the URL. That had a fatal problem for the
thing this site exists to do — a crawler does not run the toggle. `?lang=gu` was byte-identical
to `/`, so Google only ever saw one English document, and the previous developer had already
removed `hreflang` from the sitemap and the head for exactly that reason (there was no separate
document for an alternate to point at).

Astro renders each language as its own document at build time. `/gu` is Gujarati in the HTML that
comes off the server, before any JavaScript runs, with `lang="gu-IN"` on the root element. That
is the entire point of the migration for i18n, and `scripts/verify-build.mjs` asserts it on every
build so it cannot silently regress.

## The asymmetry: the homepage is bilingual, the other 70 pages are not

`src/i18n/ui.ts` holds 106 keys in both languages. Those 106 keys cover the homepage and the
shared chrome — the header, the footer, the hero, the feature cards, the FAQ.

**They do not cover the body copy of the 70 guide, route and city pages.** That copy has never
been translated; it did not exist in Gujarati on the old site either, because the old site only
ever swapped the strings in that table.

So:

- `/` and `/gu` — real translations of the same page. Both declare `hreflang` pointing at each
  other, plus `x-default` on the English one.
- Every other page — English only, at its English URL, with **no** `hreflang` and **no** `/gu/`
  route.

The tempting alternative is to give all 70 pages a `/gu/` URL that serves translated chrome
around an English body. Do not. `hreflang="gu-IN"` on a page whose content is English tells
Google there is a Gujarati edition and then hands it English, which is how a site gets its
alternates ignored across the board — and near-duplicate pages generated only to catch a
language variant are the doorway-page pattern search engines actively suppress. The pages this
site is trying to rank are exactly the pages that would be damaged.

`verify-build.mjs` enforces this both ways: it fails if a translated page is missing `hreflang`,
**and** if an untranslated page declares one.

## Adding a translated page

1. Translate the body copy properly — this is the actual work, and it is not a code change.
2. Add the page under `src/pages/gu/`, rendering the same component as the English route with
   the Gujarati dictionary, the way `src/pages/gu/index.astro` does.
3. Add its path to the `translated` set in `scripts/verify-build.mjs` so the hreflang check
   expects the pair.
4. Set `hasTranslation` on both routes' `<Base>` so the alternates are emitted.

Do them in that order. Steps 2–4 without step 1 produce exactly the failure mode described above.

## The language switch

`SiteHeader.astro` renders it as two real `<a>` links, and only on the homepage — the one page
where both languages exist. A switch shown on a page that has no other language would either
have to lie or dump the reader on an unrelated page.

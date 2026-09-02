/**
 * Pages that are written by hand as their own `.astro` file rather than generated from
 * pages.data.mjs. Kept in one list because two separate things need to agree on it: the
 * legacy `.html` -> clean URL redirect map in astro.config.mjs, and the build verifier that
 * checks every URL the old sitemap advertised still resolves.
 *
 * `index` is deliberately absent — `/index.html` is redirected separately to `/`, not `/index`.
 */
export const HAND_WRITTEN_SLUGS = [
  'gsrtc-tracker',
  'gsrtc-live-bus-tracking',
  'st-bus-live-location',
  'st-bus-tracking',
  'privacy',
];

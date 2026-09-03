// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://gsrtc.shivrajsinh.in';

// The legacy `<slug>.html` -> `/<slug>` redirects are NOT declared here. Astro's static
// `redirects` emit an HTML page carrying a meta refresh, which is not a 301 — for 70 URLs that
// already hold their ranking, that difference is the whole point of doing this carefully. They
// are generated into `public/_redirects` by scripts/gen-redirects.mjs instead, which
// Cloudflare Pages serves as real edge 301s.

export default defineConfig({
  site: SITE,

  // `build.format: 'directory'` (`/foo` -> `foo/index.html`) was tried first and verified live
  // on Cloudflare Pages (2026-09-03) to be wrong for this site, contradicting the comment that
  // used to sit here: Pages forces an unconditional 308 from `/foo` to `/foo/` for any directory
  // whose index Pages resolves — there is no project setting to turn this off, confirmed against
  // Cloudflare's own community reports of the exact same behavior. Every one of the 74 pages
  // built was one redirect hop from working, which fights `trailingSlash: 'never'` below on
  // every single request rather than the handful of legacy `.html` URLs this was meant for.
  // `'file'` (`/foo` -> `foo.html`) is what Pages actually serves at `/foo` directly, no
  // redirect — its "clean URLs" behavior strips the `.html` extension the same way it strips it
  // from the legacy addresses in _redirects. Confirmed via a real deploy to the Pages project
  // before this was kept: no 308 on any content page. scripts/verify-build.mjs was rewritten
  // for this — it used to walk for `index.html` files exclusively, which found nothing here.
  trailingSlash: 'never',
  build: { format: 'file' },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'gu'],
    routing: {
      // English stays at the root so every URL already indexed keeps its shape; Gujarati is
      // served from /gu/. Only pages that genuinely exist in Gujarati get a /gu/ route — see
      // src/i18n/README.md for why the guide pages deliberately do not yet.
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      // 404 is not a destination; privacy is linked but low value and stays in.
      filter: (page) => !page.includes('/404'),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-IN', gu: 'gu-IN' },
      },
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, '') || '/';
        if (path === '/' || path === '/gu') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (path.endsWith('-bus')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (path.endsWith('-st-bus-tracker')) {
          item.priority = 0.85;
          item.changefreq = 'weekly';
        } else if (path === '/privacy') {
          item.priority = 0.3;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }
        return item;
      },
    }),
  ],
});

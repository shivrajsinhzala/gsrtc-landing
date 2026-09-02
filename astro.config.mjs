// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://gsrtc.shivrajsinh.in';

// The legacy `<slug>.html` -> `/<slug>` redirects are NOT declared here. Astro's static
// `redirects` emit an HTML page carrying a meta refresh, which is not a 301 — for 70 URLs that
// already hold their ranking, that difference is the whole point of doing this carefully. They
// are generated into `public/_redirects` by scripts/gen-redirects.mjs instead, which
// Cloudflare Pages serves as real edge 301s. Declaring them here as well also collides with
// `build.format: 'directory'`, which turns `/foo.html` into a *directory* named `foo.html`.

export default defineConfig({
  site: SITE,

  // Cloudflare Pages serves `/foo/index.html` at `/foo` and 301s `/foo/` -> `/foo`, so the
  // canonical form this site advertises everywhere — canonical tags, sitemap, internal links —
  // is the one without the trailing slash. Astro is told the same thing so its own link
  // handling and the sitemap agree with the host instead of fighting it.
  trailingSlash: 'never',
  build: { format: 'directory' },

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

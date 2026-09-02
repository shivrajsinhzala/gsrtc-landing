/* ST Tracker — landing page analytics loader (Google Analytics 4, via gtag.js).
   Deliberately its own file rather than an inline snippet in every page's <head>: this is a
   *marketing* site with no privacy promise against third-party tools (unlike the app itself —
   see web/privacy.html, which explicitly rules this out for tracker.shivrajsinh.in). Loading
   gtag.js from a same-origin script keeps the CSP at
   `script-src 'self' https://www.googletagmanager.com` instead of needing 'unsafe-inline' for
   Google's own inline bootstrap snippet.

   GA_ID is a placeholder until a real property exists. Every page includes this file
   unconditionally, so the placeholder check below is what stops a phantom measurement ID from
   ever being requested — swap it for the real one and every page picks it up from this single
   place, without touching each page's markup. */

const GA_ID = 'G-01KB3Z78PW';

/*
 * Keep the marketing funnel measurable without turning the landing site into a record of a
 * commuter's journey. In particular, never send number plates, PNRs, station names, routes or
 * query strings to GA. The tracker link's pathname and the landing-page pathname are enough to
 * tell us which guide earns an app open.
 */
function track(name, params = {}) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', name, { landing_page: location.pathname, ...params });
}

window.stLandingTrack = track;

if (!/^G-[A-Z0-9]+$/.test(GA_ID) || GA_ID === 'G-XXXXXXXXXX') {
  // Not configured yet. No network request, no dataLayer — nothing to clean up later either.
} else {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line no-inner-declarations
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!target) return;

    let destination;
    try { destination = new URL(target.href); } catch { return; }
    if (destination.origin !== 'https://tracker.shivrajsinh.in') return;

    // Deliberately excludes destination.search: it may contain a bus plate or route IDs.
    track('open_tracker', { destination_path: destination.pathname });
  });
}

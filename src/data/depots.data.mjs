/**
 * One page per GSRTC bus stand / ST depot.
 *
 * Why these exist, from Search Console (last 3 months):
 *
 *   303 impressions -> 0 clicks, position 7.9   "junagadh st depot contact number"
 *   193 impressions -> 0 clicks, position 6.5   "amreli bus stand number"
 *   154 impressions -> 0 clicks, position 8.5   "jamnagar st depot contact number"
 *   109 impressions -> 0 clicks, position 7.1   "rajkot st bus stand contact number"
 *
 * 326 city-named queries, 14,153 impressions, 1.58% CTR — nearly all of them ranking on page 1
 * and earning nothing. They were all being answered by one page, /gsrtc-bus-stand-helpline-numbers,
 * whose snippet cannot contain Junagadh's number when the query asked for Junagadh's number. A
 * generic page at position 7 loses to a specific page every time, and correctly.
 *
 * The numbers themselves are not new — they are the same directory that page already carried,
 * confirmed current by the site owner. This file is where they now live, so that both the
 * directory page and the per-depot pages are generated from one source and cannot drift apart.
 *
 * Deliberately NOT invented: street addresses, opening hours, platform numbers. Nothing here is
 * published that is not actually known. A depot page that guesses an address is worse than no
 * depot page — it is the one kind of error a reader can catch and never forgive.
 */

/*
 * One-way import. pages.data.mjs does not know this file exists — the two page sets are joined
 * at the route ([slug].astro) and in the feed generator, not by pages.data.mjs re-exporting
 * these. So there is no cycle, and CITY/PAGES can be read here directly.
 */
import { CITY, PAGES } from './pages.data.mjs';

const APP = 'https://tracker.shivrajsinh.in';

/** GSRTC's statewide 24x7 passenger helplines, shown on every depot page as the fallback. */
export const STATE_HELPLINE = { primary: '1800 233 6666', alternate: '1800 233 5555' };

const tel = (display) => display.replace(/[^0-9]/g, '');

/**
 * `city` keys into CITY (pages.data.mjs) for the station id and the Gujarati name, so a depot
 * page and the route pages for the same city always agree on both. `stands` is a list because
 * Ahmedabad genuinely has two bus ports that people search for separately.
 */
export const DEPOTS = [
  { city: 'ahmedabad', stands: [
    { label: 'Ahmedabad Geeta Mandir Central Bus Port', numbers: ['079-25463396', '079-25463409'] },
    { label: 'Ahmedabad Ranip Bus Port', numbers: ['079-27552222'] },
  ] },
  { city: 'vadodara', stands: [{ label: 'Vadodara Central Bus Station', numbers: ['0265-2429646', '0265-2429647'] }] },
  { city: 'surat', stands: [{ label: 'Surat Central Bus Station', numbers: ['0261-2424037', '0261-2424038'] }] },
  { city: 'rajkot', stands: [{ label: 'Rajkot Central Bus Port', numbers: ['0281-2223847', '0281-2223848'] }] },
  { city: 'bhavnagar', stands: [{ label: 'Bhavnagar Bus Port', numbers: ['0278-2516701'] }] },
  { city: 'jamnagar', stands: [{ label: 'Jamnagar ST Depot', numbers: ['0288-2550260'] }] },
  { city: 'junagadh', stands: [{ label: 'Junagadh Bus Stand', numbers: ['0285-2630303'] }] },
  { city: 'bhuj', stands: [{ label: 'Bhuj ST Depot', numbers: ['02832-220002'] }] },
  { city: 'gandhinagar', stands: [{ label: 'Gandhinagar Bus Depot', numbers: ['079-23222842'] }] },
  { city: 'anand', stands: [{ label: 'Anand Central Bus Station', numbers: ['02692-251450'] }] },
  { city: 'nadiad', stands: [{ label: 'Nadiad ST Depot', numbers: ['0268-2562544'] }] },
  { city: 'mehsana', stands: [{ label: 'Mehsana Central Bus Port', numbers: ['02762-252122'] }] },
  { city: 'morbi', stands: [{ label: 'Morbi ST Bus Stand', numbers: ['02822-230550'] }] },
  { city: 'surendranagar', stands: [{ label: 'Surendranagar ST Depot', numbers: ['02752-220264'] }] },
  { city: 'porbandar', stands: [{ label: 'Porbandar ST Bus Stand', numbers: ['0286-2241666'] }] },
  // One depot serves both, and the directory page has always listed it as the pair. Veraval is
  // the station the operator names; Somnath is what people search for.
  { city: 'veraval', alsoKnownAs: 'Somnath', routeKeys: ['veraval', 'somnath'], stands: [{ label: 'Veraval / Somnath ST Depot', numbers: ['02876-220140'] }] },
  { city: 'dwarka', stands: [{ label: 'Dwarka ST Depot', numbers: ['02892-234242'] }] },
  { city: 'palanpur', stands: [{ label: 'Palanpur ST Depot', numbers: ['02742-252224'] }] },
  { city: 'himatnagar', stands: [{ label: 'Himatnagar ST Depot', numbers: ['02772-240166'] }] },
  { city: 'godhra', stands: [{ label: 'Godhra ST Depot', numbers: ['02672-242444'] }] },
  { city: 'bharuch', stands: [{ label: 'Bharuch ST Depot', numbers: ['02642-260344'] }] },
  { city: 'navsari', stands: [{ label: 'Navsari ST Depot', numbers: ['02637-258044'] }] },
  { city: 'valsad', stands: [{ label: 'Valsad ST Depot', numbers: ['02632-253344'] }] },
  { city: 'vapi', stands: [{ label: 'Vapi ST Depot', numbers: ['0260-2462344'] }] },
  { city: 'amreli', stands: [{ label: 'Amreli ST Depot', numbers: ['02792-222222'] }] },
  { city: 'patan', stands: [{ label: 'Patan ST Depot', numbers: ['02766-220224'] }] },
];

/** `/junagadh-bus-stand-contact-number`. */
export const depotSlug = (city) => `${city}-bus-stand-contact-number`;

/**
 * Route pages that already exist for this depot, used for the Related block.
 *
 * Takes a list of keys rather than one city because a depot and its route pages do not always
 * share a slug: the Veraval depot serves Somnath, and every route page for it is keyed
 * `somnath`, so matching on `veraval` alone would leave that page with no internal links at all.
 *
 * Route slugs are `a-b-bus`, so a city matches when it is one of the two endpoints — checked
 * against the segments rather than with `includes`, because a bare substring test makes
 * `anand` match `anand-dakor-bus` and `ahmedabad-anand-bus` correctly but would also match
 * nothing else useful while quietly matching `surendranagar` inside no slug at all. Splitting
 * is exact and costs nothing.
 */
function routeMatches(keys, allPages) {
  return allPages.flatMap((p) => {
    const m = /^(.+)-(.+)-bus$/.exec(p.slug);
    if (!m) return [];
    const [, a, b] = m;
    if (keys.includes(a)) return [{ page: p, other: b }];
    if (keys.includes(b)) return [{ page: p, other: a }];
    return [];
  });
}

function routeLinksFor(keys, allPages) {
  return routeMatches(keys, allPages)
    .slice(0, 6)
    .map(({ page }) => ({ href: `/${page.slug}`, label: page.h1 || page.title }));
}

/**
 * Depot pages for the cities this one has a direct route to.
 *
 * Without these, every depot page is reachable only from the directory page — one inbound link
 * each, which is what the site's own SEO audit flags as a near-orphan and, judging by the 32
 * pages Google has "discovered, currently not indexed", is roughly the point at which it stops
 * bothering. Linking depots that share a corridor is both a real relationship and a second and
 * third crawl path into each page.
 */
function connectedDepots(depot, allPages, depotCities) {
  const keys = depot.routeKeys ?? [depot.city];
  const seen = new Set(keys);
  const out = [];
  for (const { other } of routeMatches(keys, allPages)) {
    if (seen.has(other) || !depotCities.has(other)) continue;
    seen.add(other);
    out.push(other);
  }
  return out;
}

/**
 * Sibling links for every depot, capped at three each but guaranteeing no depot is left with
 * none pointing at it.
 *
 * Taking the first three connections per page is the obvious thing and it quietly strands the
 * endpoints: Bhuj, Porbandar, Veraval, Palanpur, Godhra, Bharuch and Navsari all came out with
 * zero inbound sibling links, because the hubs they connect to filled their three slots with
 * each other first. Those seven would have been left on one inbound link from the directory —
 * the near-orphan state this whole block exists to avoid, and exactly the profile of the 32
 * pages Google has already declined to index.
 *
 * So: assign naturally, then for any depot nothing points at, append it to a city it genuinely
 * shares a corridor with. The cap is a preference, not an invariant; being linked is.
 */
function buildSiblingMap(depots, allPages, depotCities) {
  const connections = new Map(depots.map((d) => [d.city, connectedDepots(d, allPages, depotCities)]));
  const chosen = new Map(depots.map((d) => [d.city, (connections.get(d.city) ?? []).slice(0, 3)]));

  const inbound = new Map(depots.map((d) => [d.city, 0]));
  for (const picks of chosen.values()) for (const c of picks) inbound.set(c, inbound.get(c) + 1);

  for (const [city, n] of inbound) {
    if (n > 0) continue;
    // Any city this one has a real route to, preferring whoever is carrying the fewest already.
    const candidates = (connections.get(city) ?? [])
      .filter((other) => !chosen.get(other)?.includes(city))
      .sort((a, b) => chosen.get(a).length - chosen.get(b).length);
    const host = candidates[0];
    if (!host) continue;
    chosen.get(host).push(city);
    inbound.set(city, 1);
  }

  return new Map([...chosen].map(([city, picks]) => [city, picks.map((other) => ({
    href: `/${depotSlug(other)}`,
    label: `${CITY[other].name} bus stand contact number`,
  }))]));
}

const callButtons = (stands) => stands
  .flatMap((s) => s.numbers)
  .slice(0, 3)
  .map((n, i) => `<a class="btn ${i === 0 ? 'primary' : ''}" href="tel:${tel(n)}">Call ${n}</a>`)
  .join('\n      ');

const standRows = (stands) => stands.map((s) => `
    <tr><td>${s.label}</td><td>${s.numbers.map((n) => `<a href="tel:${tel(n)}">${n}</a>`).join(' / ')}</td></tr>`).join('');

function buildBody(depot, name, guj, routeLinks) {
  const { stands } = depot;
  const multi = stands.length > 1;
  const alias = depot.alsoKnownAs ? ` (also searched as ${depot.alsoKnownAs})` : '';

  return `
  <div class="utility-action-box google-anno-skip">
    <h3>${name} bus stand enquiry — tap to call</h3>
    <p>Direct enquiry ${multi ? 'numbers' : 'number'} for the GSRTC ST ${multi ? 'bus ports' : 'depot'} at ${name}${alias}:</p>
    <div class="utility-action-btns">
      ${callButtons(stands)}
    </div>
    <div class="utility-action-badges">
      <span class="utility-badge highlight">Tap any number to call</span>
      <span class="utility-badge">GSRTC official depot line</span>
      <span class="utility-badge">24x7 state helpline below</span>
    </div>
  </div>

  <h2 class="reveal">${name} ST depot &amp; bus stand contact ${multi ? 'numbers' : 'number'}</h2>
  <p class="reveal">${multi
    ? `${name} is served by more than one GSRTC bus port, each with its own enquiry line. Call the one you are travelling from:`
    : `The GSRTC enquiry line for ${name} is below. Depot staff can confirm today's departures, delays, and platform for a specific service:`}</p>
  <div class="table-wrap google-anno-skip">
  <table class="reveal">
    <tr><th>Bus stand / ST depot</th><th>Enquiry number</th></tr>${standRows(stands)}
  </table>
  </div>

  <h2 class="reveal">If the depot line does not answer</h2>
  <p class="reveal">Depot enquiry lines are staffed, not automated, and a single line at a busy stand is often engaged. GSRTC's statewide 24x7 passenger helpline answers the same questions — schedules, delays, complaints — for any depot in Gujarat:</p>
  <p class="reveal"><b><a href="tel:${tel(STATE_HELPLINE.primary)}">${STATE_HELPLINE.primary}</a></b> (toll-free), or <b><a href="tel:${tel(STATE_HELPLINE.alternate)}">${STATE_HELPLINE.alternate}</a></b>.</p>

  <h2 class="reveal">Check ${name} departures without calling</h2>
  <p class="reveal">Most calls to a depot are asking one of two things: when the next bus leaves, or whether a particular service is running. Both are faster to look up than to ask. Search ${name} (${guj}) against wherever you are travelling to and you get every scheduled service on that pair, with times, fare and service class.</p>
  <p class="reveal"><a class="btn primary" href="${APP}/#routes">Search ${name} departures</a></p>
  ${routeLinks.length ? `
  <h2 class="reveal">Popular routes from ${name}</h2>
  <ul class="reveal">
    ${routeLinks.map((r) => `<li><a href="${r.href}">${r.label}</a></li>`).join('\n    ')}
  </ul>` : ''}`;
}

function buildFaq(depot, name) {
  const first = depot.stands[0];
  const siblings = SIBLINGS.get(depot.city) ?? [];
  return [
    {
      q: `What is the ${name} bus stand contact number?`,
      a: `The GSRTC enquiry number for ${first.label} is ${first.numbers[0]}. If it is engaged, the statewide 24x7 helpline ${STATE_HELPLINE.primary} answers the same questions for any Gujarat depot.`,
    },
    {
      q: `Is the ${name} ST depot number the same as the bus stand number?`,
      a: `Yes. "ST depot" and "bus stand" are the same place in everyday Gujarati usage — the depot is the operator's name for it and the bus stand is what riders call it. One enquiry line serves both.`,
    },
    {
      q: `Can I check ${name} bus timings instead of calling?`,
      a: `Yes, and it is usually quicker. Searching ${name} against your destination returns every scheduled service on that route with departure time, fare and bus type, without waiting for a depot line to pick up.`,
    },
    {
      q: `Does GSRTC have a 24x7 helpline?`,
      a: `Yes — ${STATE_HELPLINE.primary} is the central toll-free passenger helpline, with ${STATE_HELPLINE.alternate} as an alternate. Individual depot lines follow office hours and staffing; the statewide number does not.`,
    },
  ];
}

/** Cities that actually have a depot page, so sibling links never point at a slug we never built. */
const DEPOT_CITIES = new Set(DEPOTS.map((d) => d.city));

const SIBLINGS = buildSiblingMap(DEPOTS, PAGES, DEPOT_CITIES);

export const DEPOT_PAGES = DEPOTS.map((depot) => {
  const meta = CITY[depot.city];
  if (!meta) throw new Error(`depots.data.mjs: "${depot.city}" is not a key in CITY (pages.data.mjs)`);
  const { name, guj } = meta;
  const routeLinks = routeLinksFor(depot.routeKeys ?? [depot.city], PAGES);
  const first = depot.stands[0];
  const siblings = SIBLINGS.get(depot.city) ?? [];

  return {
    slug: depotSlug(depot.city),
    plateForm: false,
    eyebrow: 'Bus stand',
    crumbLabel: `${name} bus stand contact`,
    // Kept under the ~60 characters Google renders before truncating — Surendranagar is the
    // longest city here and still fits.
    title: `${name} Bus Stand Contact Number — GSRTC ST Depot`,
    // The city name appeared twice here, which pushed Gandhinagar (161) and Surendranagar (165)
    // past the ~160 characters Google renders before truncating. Once is enough — the name is
    // already the first word, and the second mention was the part being cut off anyway.
    description: `${name} bus stand enquiry number: ${first.numbers[0]}. GSRTC ST depot contact, the 24x7 state helpline, and how to check departures without calling.`,
    // Bare `&`: ContentPage renders h1 with `{h1}`, which escapes, so an `&amp;` here would
    // reach the page as a literal "&amp;". `lede` and `body` go through set:html and do want
    // entities — this one does not.
    h1: `${name} bus stand & ST depot contact number`,
    lede: `The GSRTC enquiry number for ${name} (${guj}), the statewide helpline to try when it is engaged, and a faster way to answer the question you were going to ask.`,
    closerH: `Check ${name} departures`,
    body: buildBody(depot, name, guj, routeLinks),
    faq: buildFaq(depot, name),
    // Route links are deliberately absent: the body already lists them under "Popular routes
    // from <city>", and repeating the same four hrefs in Related a few hundred pixels below
    // is noise for a reader and adds nothing for a crawler.
    related: [
      ...siblings,
      { href: '/gsrtc-bus-stand-helpline-numbers', label: 'Every Gujarat ST bus stand enquiry number' },
      { href: '/gsrtc-bus-timetable', label: 'GSRTC bus timetable between any two stations' },
    ],
  };
});

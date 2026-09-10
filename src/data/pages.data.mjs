/**
 * Data for the generated landing pages — see scripts/build-landing-pages.mjs.
 *
 * All Station IDs below are pulled directly from GSRTC official station datasets
 * (scripts/seed-stations.json). Every route page links using real valid station IDs.
 */

const APP = 'https://tracker.shivrajsinh.in';

// Exported so the homepage's city and route link labels (HomeContent.astro) can show a city's
// Gujarati name on /gu without duplicating this list — every city here already carries one.
export const CITY = {
  ahmedabad: { name: 'Ahmedabad', id: 464, guj: 'અમદાવાદ' },
  surat: { name: 'Surat', id: 505, guj: 'સુરત' },
  // 502 is Vadodara Central. It was 15004 — "Vadodara (Dehgam)", a village stop near
  // Gandhinagar that shares the name — so every Vadodara route page and the homepage link
  // resolved to a station with no services at all: 0 buses in both directions on all four
  // pairs, against 15-80 on the real one. Verified before changing (502->529 Godhra 65,
  // 502->505 Surat 80, 502->676 Anand 21, 502->8402 Bharuch 15, 464->502 Ahmedabad 80).
  vadodara: { name: 'Vadodara', id: 502, guj: 'વડોદરા' },
  rajkot: { name: 'Rajkot', id: 470, guj: 'રાજકોટ' },
  bhavnagar: { name: 'Bhavnagar', id: 595, guj: 'ભાવનગર' },
  jamnagar: { name: 'Jamnagar', id: 497, guj: 'જામનગર' },
  gandhinagar: { name: 'Gandhinagar', id: 438, guj: 'ગાંધીનગર' },
  junagadh: { name: 'Junagadh', id: 1052, guj: 'જુનાગઢ' },
  bhuj: { name: 'Bhuj', id: 594, guj: 'ભુજ' },
  morbi: { name: 'Morbi', id: 462, guj: 'મોરબી' },
  mehsana: { name: 'Mehsana', id: 711, guj: 'મહેસાણા' },
  vapi: { name: 'Vapi', id: 585, guj: 'વાપી' },
  valsad: { name: 'Valsad', id: 543, guj: 'વલસાડ' },
  // Endpoints added for route pages only — they are deliberately absent from CITY_ROUTES's
  // *keys*, so no city page is generated for them. They do appear as destinations of the hub
  // they pair with, which is what gives their route page an inbound link. Each was picked from
  // the tracker's own search log and then checked against its own timetable data before being
  // added, per the Kevadia note below:
  // Khergam (41 buses on the Valsad pair), Mandvi (44 to Bhuj), Tankara (80 to Rajkot).
  khergam: { name: 'Khergam', id: 1807, guj: 'ખેરગામ' },
  mandvi: { name: 'Mandvi', id: 1083, guj: 'માંડવી(ભુજ)' },
  tankara: { name: 'Tankara', id: 1702, guj: 'ટંકારા' },
  navsari: { name: 'Navsari', id: 510, guj: 'નવસારી' },
  anand: { name: 'Anand', id: 676, guj: 'આણંદ' },
  nadiad: { name: 'Nadiad', id: 525, guj: 'નડિયાદ' },
  bharuch: { name: 'Bharuch', id: 8402, guj: 'ભરૂચ' },
  porbandar: { name: 'Porbandar', id: 1208, guj: 'પોરબંદર' },
  somnath: { name: 'Somnath', id: 799, guj: 'સોમનાથ' },
  veraval: { name: 'Veraval', id: 1084, guj: 'વેરાવળ' },
  dwarka: { name: 'Dwarka', id: 471, guj: 'દ્વારકા' },
  palanpur: { name: 'Palanpur', id: 576, guj: 'પાલનપુર' },
  godhra: { name: 'Godhra', id: 529, guj: 'ગોધરા' },
  surendranagar: { name: 'Surendranagar', id: 705, guj: 'સુરેન્દ્રનગર' },
  amreli: { name: 'Amreli', id: 931, guj: 'અમરેલી' },
  ambaji: { name: 'Ambaji', id: 603, guj: 'અંબાજી' },
  // Station id verified against scripts/seed-stations.json: "Diu", id 1193, hub city "Una".
  // Only paired with Rajkot below — see the note by ROUTE_PAIRS for why Ahmedabad/Vadodara/Surat
  // pairings (and Kevadia entirely) were tried and dropped.
  diu: { name: 'Diu', id: 1193, guj: 'દીવ' },
};

/** `&amp;` because this is dropped straight into an href="…" attribute. */
function routeUrl(a, b) {
  return `${APP}/?from=${a.id}&amp;to=${b.id}&amp;fromName=${encodeURIComponent(a.name)}&amp;toName=${encodeURIComponent(b.name)}`;
}

/** Feature and Guide pages */
const FEATURE_PAGES = [
  {
    slug: 'gsrtc-bus-number-plate-format',
    title: 'GSRTC Bus Number Plate Format Explained | ST Tracker',
    description: 'How GSRTC bus number plates are structured, how to read one on the front of a bus, and why the exact plate matters for live tracking.',
    crumbLabel: 'GSRTC bus number plate format',
    h1: 'GSRTC bus number plate format, explained',
    lede: 'Every GSRTC bus carries a plate like <code>GJ-18-ZT-1028</code>. Here is what each part means, and why getting it exactly right matters when you search.',
    body: `
  <h2 class="reveal">Reading the plate</h2>
  <p class="reveal">Gujarat ST buses use the standard Indian vehicle registration format: <code>GJ</code> for the state, a two-digit RTO (registration) code, a letter series, and a four-digit number — for example <code>GJ-18-ZT-1028</code>. The RTO code identifies where the vehicle was first registered, not the route it runs — a Rajkot-registered bus (<code>GJ-3</code>) can run anywhere in the state.</p>
  <p class="reveal">You'll usually find the plate painted on the front bumper and above the windscreen, and again on a metal plate at the rear.</p>

  <h2 class="reveal">Why the exact plate matters for tracking</h2>
  <p class="reveal">Live tracking looks the bus up by that exact registration, so a wrong digit returns nothing rather than the wrong bus. ST Tracker corrects common punctuation differences — spaces instead of dashes, lowercase letters — automatically, but a mistyped digit or letter still won't match.</p>
  <p class="reveal">Don't have the plate, or not sure you read it right? Search by the two stations you're travelling between instead — see <a href="/gsrtc-bus-timetable">the timetable guide</a> — and pick the right departure from the list rather than typing a plate at all.</p>`,
    faq: [
      { q: 'What does GJ-18 mean on a GSRTC bus?', a: 'GJ is the Gujarat state code, and 18 is the RTO (registration) code for where the bus was first registered (e.g. Gandhinagar / Ahmedabad region). It does not indicate which route the bus currently runs.' },
      { q: 'Can I track a bus with only part of the plate?', a: 'No — tracking needs the full registration to match the operator’s records. If you only caught part of it, search by route instead and pick the bus from the departure list.' },
      { q: 'Does it matter if I type the plate with or without dashes?', a: 'No. ST Tracker normalises spacing and dashes automatically before searching, so GJ18ZT1028 and GJ-18-ZT-1028 both work.' },
    ],
    related: [
      { href: '/gsrtc-live-bus-tracking', label: 'How GSRTC live bus tracking works' },
      { href: '/gsrtc-bus-timetable', label: 'GSRTC bus timetable between any two stations' },
    ],
  },
  {
    slug: 'gsrtc-bus-fleet',
    title: 'GSRTC Fleet Size — How Many ST Buses Run | ST Tracker',
    description: 'How many buses GSRTC operates, what a fleet this size means for live tracking coverage, and why not every bus is trackable at once.',
    crumbLabel: 'GSRTC bus fleet',
    h1: 'How big is the GSRTC bus fleet?',
    lede: 'GSRTC runs one of the largest state road transport fleets in India. Here is what that scale actually means for tracking any single bus in it.',
    body: `
  <h2 class="reveal">The numbers</h2>
  <p class="reveal">GSRTC's published fleet runs to <b>8,554 buses</b> across Gujarat's divisions and depots, serving <b>19,026 stations</b> — from major city terminals down to single-stop villages. That scale is why a plate-based search matters: no list of "today's departures" could stay usable at that size, but a single plate resolves to one bus immediately.</p>

  <h2 class="reveal">Fleet size vs. what's trackable right now</h2>
  <p class="reveal">Not all 8,554 buses are running at any given moment. Live tracking only works for a bus that is actually on a scheduled trip — buses at the depot, between shifts, or already parked for the night report no position, which is expected behaviour rather than a gap in coverage. At any moment, the trackable fleet is however many buses are actually out on the road.</p>

  <h2 class="reveal">Divisions and depots</h2>
  <p class="reveal">The fleet is organised into divisions, each covering a region of the state and made up of several depots — the base a given bus and its crew are assigned to. A bus's RTO code (see <a href="/gsrtc-bus-number-plate-format">the plate format guide</a>) hints at where it was registered, which is often but not always its home depot.</p>`,
    faq: [
      { q: 'How many buses does GSRTC operate?', a: 'GSRTC’s fleet runs to 8,554 buses, covering 19,026 stations across Gujarat.' },
      { q: 'Are all 8,554 buses trackable at once?', a: 'No. Live tracking only shows a bus while it is actually on a scheduled trip. A bus at the depot or between shifts reports no position until it sets off again.' },
      { q: 'What is a GSRTC depot?', a: 'A depot is the base a bus and its crew are assigned to. Several depots make up a division, and divisions together cover the whole state.' },
    ],
    related: [
      { href: '/gsrtc-tracker', label: 'GSRTC tracker — what it is and how it compares' },
      { href: '/gsrtc-bus-number-plate-format', label: 'GSRTC bus number plate format explained' },
    ],
  },
  {
    slug: 'nearby-st-bus-stops',
    title: 'Find ST Bus Stops Near You | ST Tracker',
    description: 'How to find GSRTC (ST) bus stations near your current location on a map, with distances — no typing a station name required.',
    crumbLabel: 'Nearby ST bus stops',
    h1: 'Find ST bus stops near you',
    lede: 'New to a town, or just not sure which stand is closest? See every ST bus stop around your current location on a map, with distances.',
    plateForm: false,
    body: `
  <h2 class="reveal">How it works</h2>
  <p class="reveal">The Nearby screen uses your device's location — only once you allow it — to show ST bus stations around you on a map, closest first, with the walking distance to each. There's nothing to type and no station name to guess at.</p>
  <p class="reveal">It's built for the moment a timetable search isn't the right tool: you're already somewhere, and the question is simply "which stand is closest to me right now."</p>

  <h2 class="reveal">Without allowing location access</h2>
  <p class="reveal">Location access is asked for, never assumed — the app explains why before the browser's own permission prompt appears, because a single accidental "Deny" turns location off for the site permanently. If you'd rather not share it, search by station name instead from the home screen and browse the full list of 19,026 covered stations.</p>

  <h2 class="reveal">Once you've found your stop</h2>
  <p class="reveal">Tap a nearby station to see its departures, or search a route from it directly — see <a href="/gsrtc-bus-timetable">the timetable guide</a> for how the two-station search works.</p>`,
    faq: [
      { q: 'How does "stops near me" know my location?', a: 'It uses your browser or device’s location permission, asked for explicitly with an explanation first — it is never assumed or requested silently.' },
      { q: 'Does it work without an account?', a: 'Yes. There is no account anywhere in ST Tracker, for this or any other feature.' },
      { q: 'Can I find nearby stops without allowing location access?', a: 'Yes — search by station name instead from the home screen, which works identically without location permission.' },
    ],
    related: [
      { href: '/gsrtc-tracker', label: 'GSRTC tracker — what it is and how it compares' },
      { href: '/gsrtc-bus-timetable', label: 'GSRTC bus timetable between any two stations' },
    ],
  },
  {
    slug: 'gsrtc-bus-delay-status',
    title: 'Is My GSRTC Bus Running Late? Check Its Delay | ST Tracker',
    description: 'How ST Tracker works out whether a GSRTC bus is running late, why it sometimes stays silent on delay, and how to check before you leave for the stand.',
    crumbLabel: 'GSRTC bus delay status',
    h1: 'Is my GSRTC bus running late?',
    lede: 'A live position on its own does not say "on time" or "late" — it has to be checked against the timetable. Here is how that works, and when the app deliberately says nothing.',
    body: `
  <h2 class="reveal">How delay is worked out</h2>
  <p class="reveal">Once a bus's live position is known, ST Tracker compares where it actually is against where the timetable says it should be by now, along its own route. The result is shown as a plain delay — "running about 8 minutes late" — rather than a raw coordinate you'd have to interpret yourself.</p>

  <h2 class="reveal">Why it sometimes shows nothing</h2>
  <p class="reveal">The app stays silent rather than guessing when the data can't support a confident number — a bus that's been stationary a long time, or an apparent delay bigger than a real bus would ever run, is treated as a sign the estimate itself is unreliable, not as a real two-hour delay. A blank field is meant to be more useful than a wrong one.</p>

  <h2 class="reveal">Typical delay, from real arrivals</h2>
  <p class="reveal">On routes the app watches closely, it also builds a picture of how a specific service usually runs — from real recorded arrival times, not the schedule — so a rider can see "usually around 8 minutes late" for a service they take often, once enough days of data exist.</p>`,
    faq: [
      { q: 'How does the app know if a bus is late?', a: 'It compares the bus’s live GPS position against the timetable for its own route, and reports the difference as a plain delay.' },
      { q: 'Why does the delay sometimes not show at all?', a: 'When the data can’t support a confident estimate — an unusually long stop, or an implausibly large gap — the app stays silent rather than showing a number it can’t back up.' },
      { q: 'Can I see how late a service usually runs, not just today?', a: 'Yes, once enough days of real arrivals have been recorded for that specific service.' },
    ],
    related: [
      { href: '/gsrtc-live-bus-tracking', label: 'How GSRTC live bus tracking works' },
      { href: '/gsrtc-bus-arrival-alerts', label: 'Get an alert before your GSRTC bus arrives' },
    ],
  },
  {
    slug: 'st-bus-crowd-status',
    title: 'How Full Is My ST Bus? Live Crowd Reports | ST Tracker',
    description: 'How crowd reports work on ST Tracker — seats, standing room, cancellations and replacements — reported by other riders before you decide which bus to wait for.',
    crumbLabel: 'ST bus crowd status',
    h1: 'How full is my ST bus?',
    lede: 'Riders report what they see, so you can decide which departure to wait for before you commit to one.',
    body: `
  <h2 class="reveal">Two separate things get reported</h2>
  <p class="reveal">Crowd reports cover two different questions, kept apart deliberately: how full the bus is (seats free, standing room, packed), and its service status (cancelled, replaced by a different bus, or simply never showed up). A cancelled bus doesn't have an occupancy — mixing the two would make neither answer trustworthy.</p>

  <h2 class="reveal">Where you see it</h2>
  <p class="reveal">On the departures list for a route, each upcoming service shows what riders have reported, before you pick one to wait for. It's most useful exactly there — deciding between two buses fifteen minutes apart is a different decision when one is reported standing-room-only and the other has seats.</p>

  <h2 class="reveal">Reporting one yourself</h2>
  <p class="reveal">If you're on a bus or waiting at a stand, you can report what you see in a couple of taps — no account, and a report can be withdrawn shortly after if you made a mistake.</p>`,
    faq: [
      { q: 'Who reports how full a bus is?', a: 'Other riders — anyone using the app can report it in a couple of taps, anonymously, with no account needed.' },
      { q: 'What if a bus never came, or a different one ran the trip?', a: 'That is reported separately from occupancy, as a service status: cancelled, replaced, or a no-show.' },
      { q: 'Can I undo a report I made by mistake?', a: 'Yes, for a short window right after reporting.' },
    ],
    related: [
      { href: '/gsrtc-bus-timetable', label: 'GSRTC bus timetable between any two stations' },
      { href: '/gsrtc-bus-delay-status', label: 'Is my GSRTC bus running late?' },
    ],
  },
  {
    slug: 'gsrtc-bus-arrival-alerts',
    title: 'GSRTC Bus Arrival Alerts — Live Tracking | ST Tracker',
    description: 'How to set an arrival alert for your GSRTC bus so your phone tells you when it is close, instead of watching the map the whole time.',
    crumbLabel: 'GSRTC bus arrival alerts',
    h1: 'Get an alert before your GSRTC bus arrives',
    lede: 'Pick the stop you’re waiting at, and your phone tells you when the bus is close — no need to keep the map open.',
    body: `
  <h2 class="reveal">Setting one up</h2>
  <ol class="reveal">
    <li>Open a bus's live map, or a route's departure list.</li>
    <li>Pick the stop you're waiting at from the route schedule.</li>
    <li>Turn on the arrival alert. Your browser or phone will ask permission to send notifications the first time.</li>
  </ol>
  <p class="reveal">The alert fires shortly before the bus reaches that stop, based on its live GPS position fix — not on the static schedule. It works seamlessly whether the bus is running early, exactly on time, or delayed by traffic.</p>

  <h2 class="reveal">Battery-friendly background monitoring</h2>
  <p class="reveal">ST Tracker uses lightweight Web Push notifications designed to conserve mobile battery life. You don't need to keep your screen awake or watch the live map continuously — lock your phone, step inside a waiting room or tea stall, and your device rings when your bus is 5 to 10 minutes away.</p>

  <h2 class="reveal">On iPhone and iPad</h2>
  <p class="reveal">Safari on iOS delivers web notifications once the site is added to your home screen. Open <a href="${APP}">tracker.shivrajsinh.in</a> in Safari, tap the Share icon, select <b>Add to Home Screen</b>, and enable alerts from the installed icon.</p>`,
    faq: [
      { q: 'Do arrival alerts need an account?', a: 'No. There is no account anywhere in the app — the alert is tied to your browser’s notification permission, not an identity.' },
      { q: 'Why aren’t I getting alerts on iPhone?', a: 'iOS only allows web notifications for a site added to the home screen. Open the app in Safari, tap Share, then Add to Home Screen, and set the alert again from there.' },
      { q: 'Is the alert based on the schedule or the live position?', a: 'The live position, so it still fires at the right time whether the bus is early, on time, or late.' },
    ],
    related: [
      { href: '/gsrtc-bus-delay-status', label: 'Is my GSRTC bus running late?' },
      { href: '/st-bus-live-location', label: 'Find your ST bus’s live location, step by step' },
    ],
  },
  {
    slug: 'gsrtc-bus-timetable',
    title: 'GSRTC Bus Timetable Between Any Two Stations | ST Tracker',
    description: 'Search the GSRTC timetable between any two of 19,026 stations, filter by service type, sort by departure or journey time, and see buses already on the road.',
    crumbLabel: 'GSRTC bus timetable',
    h1: 'GSRTC bus timetable between any two stations',
    lede: 'Search any pair of stations — a city or a single village stop — and see every scheduled and running service between them.',
    body: `
  <h2 class="reveal">Searching a route</h2>
  <p class="reveal">Enter where you're travelling from and to — anywhere across the 19,026 stations the app covers, not just major cities. The result is every GSRTC service on that pair for the day: departure time, journey length, and service classification.</p>
  <p class="reveal">Because Gujarat ST operates both direct point-to-point buses and regional long-distance routes, searching station pairs reveals intermediate express halts that don't appear on basic terminal display boards.</p>

  <h2 class="reveal">Filtering and sorting departures</h2>
  <p class="reveal">Narrow the list by service type (Express, Gurjarnagri, Sleeper, Volvo), and sort by departure time or journey length. Buses already on the road show a live countdown instead of just a scheduled time, so you can see which one is genuinely next rather than which one is listed first.</p>

  <h2 class="reveal">Offline timetable and low-signal support</h2>
  <p class="reveal">Once loaded, route schedules cache locally in your browser storage. If your cellular connection drops while traveling through rural stretches, ST Tracker retains the timetable schedule and estimated intermediate stop timings.</p>`,
    faq: [
      { q: 'Can I search between any two stations, or only major cities?', a: 'Any two of the 19,026 stations the app covers, including single-stop villages, not just major city terminals.' },
      { q: 'Does the timetable show live delays, or only the schedule?', a: 'Both — scheduled times for services yet to depart, and a live countdown for services already on the road.' },
      { q: 'Why does the list still show buses that already left?', a: 'In case you’re boarding further along the route than the origin — a bus that left ten minutes ago may still be minutes from your own stop.' },
    ],
    related: [
      { href: '/gsrtc-advance-booking-rules', label: 'GSRTC advance booking rules & seat reservation' },
      { href: '/gsrtc-tracker', label: 'GSRTC tracker — what it is and how it compares' },
      { href: '/nearby-st-bus-stops', label: 'Find ST bus stops near you' },
    ],
  },
  {
    slug: 'gsrtc-tracking-app',
    title: 'GSRTC Live Tracking App — Which to Use | ST Tracker',
    description: 'Whether GSRTC has a live tracking app, how it differs from the official booking app, and why ST Tracker needs no install to try.',
    crumbLabel: 'GSRTC tracking app',
    h1: 'Is there a GSRTC live tracking app?',
    lede: 'A few different things all get called "the GSRTC app." Here’s what each one is actually for.',
    body: `
  <h2 class="reveal">The official GSRTC app</h2>
  <p class="reveal">GSRTC's own app, available on Google Play and Apple App Store, is the authoritative place for booking tickets, reserving seats, and checking official PNR status. That side of transit operations isn't something ST Tracker replaces.</p>

  <h2 class="reveal">ST Tracker: live tracking, zero install</h2>
  <p class="reveal">ST Tracker is an independent, community-focused tool dedicated to one critical job: showing exactly where a Gujarat ST bus is right now, fast. It's a lightweight Progressive Web App (PWA), not a bloated store download — open <a href="${APP}">tracker.shivrajsinh.in</a> in any mobile browser and it works instantaneously on Android, iPhone, or laptop without creating accounts or entering personal data.</p>

  <h2 class="reveal">Benefits of a modern browser-based tracker</h2>
  <p class="reveal">Unlike heavy native apps that consume hundreds of megabytes of phone storage, request intrusive permissions, and run background services that drain battery life, ST Tracker loads in under a second, consumes negligible data, and updates live telemetry via secure AIS-140 GPS streams. Add it to your home screen for full-screen convenience.</p>`,
    faq: [
      { q: 'Do I need to install anything to track a GSRTC bus?', a: 'No. ST Tracker runs at tracker.shivrajsinh.in in any browser. Installing to your home screen is optional.' },
      { q: 'Is ST Tracker the official GSRTC app?', a: 'No — it’s an independent tool built for the specific job of live tracking. Ticket booking and PNR status stay with the official app.' },
      { q: 'Does ST Tracker work on iPhone?', a: 'Yes, in Safari. Add it to the home screen via Share → Add to Home Screen for arrival notifications.' },
    ],
    related: [
      { href: '/gsrtc-tracker', label: 'GSRTC tracker — what it is and how it compares' },
      { href: '/gsrtc-live-bus-tracking', label: 'How GSRTC live bus tracking works' },
    ],
  },
  {
    slug: 'gsrtc-online-booking-pnr-tracking',
    title: 'GSRTC PNR Status & Bus Tracking: Check Ticket & Bus Number',
    description: 'Track your GSRTC bus by PNR or ticket number. Check if your ticket is confirmed, find assigned bus vehicle plate 1-2 hours before departure & live GPS.',
    crumbLabel: 'GSRTC tracking by PNR',
    h1: 'Track your GSRTC bus using PNR / ticket number',
    lede: 'Booked online on GSRTC or redBus and wondering which bus is assigned to your trip? Here is how to find and track it live.',
    body: `
  <h2 class="reveal">How to check if your GSRTC ticket is confirmed or waitlisted</h2>
  <p class="reveal">When booking an online GSRTC ticket, your reservation SMS or PDF displays a 10-digit or 12-digit <b>PNR (Passenger Name Record)</b>. If your seat status indicates <i>CNF (Confirmed)</i> with an assigned seat number, your booking is guaranteed. If it reflects a waiting list code (WL), seat allocation resolves as cancellations occur up to 2 hours before scheduled departure.</p>

  <h2 class="reveal">How to find your assigned bus plate number from PNR</h2>
  <p class="reveal">Advance reservation tickets do not print the vehicle registration plate because GSRTC depot controllers assign physical buses and crews approximately <b>1 to 2 hours prior to origin departure</b>. To find your physical bus plate:</p>
  <ol class="reveal">
    <li>Open <a href="${APP}">ST Tracker</a> and select the <b>PNR</b> search tab.</li>
    <li>Enter your 10-digit ticket PNR number and tap <b>Search</b>.</li>
    <li>As soon as the depot control room attaches an active coach to your scheduled trip service number, ST Tracker displays the bus registration plate (e.g. GJ-18-ZT-1028), driver crew status, and live map location.</li>
  </ol>

  <h2 class="reveal">Tracking on map &amp; departure countdowns</h2>
  <p class="reveal">Once the bus begins its trip, you can view real-time AIS-140 GPS telematics updated every 20 seconds. Monitor your pickup stop arrival ETA, current traveling speed, and delay alerts directly from your browser without installing heavy apps.</p>`,
    howTo: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Track GSRTC Bus & Check Status by PNR',
      description: 'Find your assigned GSRTC bus number plate and live GPS location using your ticket PNR.',
      totalTime: 'PT1M',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Locate Your PNR',
          text: 'Find the 10-digit PNR reference number from your booking confirmation SMS or ticket PDF.',
        },
        {
          '@type': 'HowToStep',
          name: 'Open ST Tracker PNR Search',
          text: 'Open tracker.shivrajsinh.in and switch to the PNR search tab.',
        },
        {
          '@type': 'HowToStep',
          name: 'Search PNR Number',
          text: 'Enter your PNR code to retrieve assigned bus details and confirmation status.',
        },
        {
          '@type': 'HowToStep',
          name: 'Track Live GPS Location',
          text: 'Tap the assigned bus to open its live location map, next stop countdown, and delay minutes.',
        },
      ],
    },
    faq: [
      { q: 'How do I find my bus number from PNR in GSRTC?', a: 'GSRTC assigns physical bus plates 1 to 2 hours before scheduled departure. Enter your 10-digit PNR on ST Tracker to instantly see the assigned registration number and live GPS tracking link.' },
      { q: 'How do I check if my GSRTC ticket is confirmed or not?', a: 'Check your booking SMS or ticket PDF for seat numbers. A confirmed status shows CNF and seat allocation; waiting status (WL) is updated by depot dispatch up to 2 hours before departure.' },
      { q: 'Can I track a bus with only a PNR number?', a: 'Yes! On ST Tracker, switch to the PNR tab and enter your ticket reference to locate your assigned bus.' },
      { q: 'Why is my PNR not showing a live location yet?', a: 'Depots assign the physical bus 1–2 hours before scheduled departure. Live GPS activates once the bus is flagged active on the road.' },
      { q: 'Does this work for tickets booked on redBus / AbhiBus?', a: 'Yes, as long as you use the GSRTC operator PNR printed on your ticket confirmation SMS or email.' },
    ],
    related: [
      { href: '/gsrtc-advance-booking-rules', label: 'GSRTC advance booking rules & seat reservation' },
      { href: '/gsrtc-ticket-cancellation-refund', label: 'GSRTC ticket cancellation charges and refund rules' },
      { href: '/gsrtc-bus-timetable', label: 'GSRTC bus timetable between any two stations' },
      { href: '/gsrtc-bus-delay-status', label: 'Is my GSRTC bus running late?' },
    ],
  },
  {
    slug: 'gsrtc-volvo-sleeper-ac-bus-tracking',
    title: 'GSRTC Volvo, AC & Sleeper Bus Tracking Live',
    description: 'Track premium GSRTC Volvo, AC Sleeper 2x1, and Gurjarnagri luxury buses live on a map. View departure times, amenities, and delays.',
    crumbLabel: 'GSRTC Volvo & AC tracking',
    h1: 'GSRTC Volvo, AC & Sleeper bus live tracking',
    lede: 'Travelling on premium Gujarat ST services like Volvo, Gurjarnagri, or AC Sleeper? Track them live and check exact arrival times.',
    body: `
  <h2 class="reveal">Premium fleet categories in Gujarat</h2>
  <p class="reveal">GSRTC operates multiple tiers of long-distance and intercity buses across Gujarat:</p>
  <ul class="reveal">
    <li><b>Volvo &amp; Scania Multi-Axle:</b> Premium air-conditioned intercity coaches connecting major hubs like Ahmedabad, Surat, Vadodara, and Rajkot.</li>
    <li><b>AC Sleeper (2x1):</b> Overnight coaches with berths on long-distance routes like Ahmedabad–Bhuj, Surat–Somnath, and Rajkot–Dwarka.</li>
    <li><b>Gurjarnagri (2x2):</b> The backbone express fleet with comfortable pushback 2x2 seating between district headquarters.</li>
  </ul>

  <h2 class="reveal">Amenities and seat booking rules</h2>
  <p class="reveal">GSRTC Volvo and Scania intercity coaches feature 2x2 luxury reclining seats, individual mobile charging points, personal reading lamps, and centralized air conditioning maintained at 22°C–24°C. On overnight AC Sleeper (2x1) coaches, lower and upper berths include fresh linens, window curtains, and spacious underfloor luggage compartments. View the complete <a href="/gsrtc-bus-types-classes">GSRTC bus types and seat layout guide</a> for detailed seating schematics.</p>

  <h2 class="reveal">Live tracking on long highway corridors</h2>
  <p class="reveal">Night Volvo and sleeper coaches travel non-stop on expressways such as NE 1 and NH 48. With AIS-140 GPS telematics streaming updates every 20 seconds, <a href="${APP}">ST Tracker</a> lets you monitor your coach's exact approach coordinates, toll crossings, and expected arrival time at your destination bus station without disturbing the bus crew.</p>`,
    faq: [
      { q: 'Are all GSRTC Volvo and AC buses GPS-tracked?', a: 'Yes, 100% of GSRTC premium Volvo, Sleeper, and Express fleet vehicles are equipped with live GPS transponders.' },
      { q: 'How do I filter for only AC or Sleeper buses?', a: 'Search any route on ST Tracker and tap the AC / Sleeper filter tag above the departures list.' },
    ],
    related: [
      { href: '/gsrtc-bus-types-classes', label: 'GSRTC bus classes: Gurjarnagri, Express, Sleeper & Volvo' },
      { href: '/gsrtc-bus-timetable', label: 'GSRTC bus timetable between any two stations' },
      { href: '/st-bus-crowd-status', label: 'How full is my ST bus?' },
    ],
  },
  {
    slug: 'gsrtc-bus-stand-helpline-numbers',
    plateForm: false,
    title: 'GSRTC Bus Stand Enquiry & Depot Phone Directory (Gujarat)',
    description: 'Official GSRTC bus stand enquiry numbers for all 26 Gujarat depots. Tap-to-call directory: Ahmedabad, Vadodara, Surat, Rajkot, Jamnagar & 1800 233 6666.',
    crumbLabel: 'GSRTC bus stand helplines',
    h1: 'GSRTC bus stand enquiry & depot phone directory',
    lede: 'Direct contact numbers for Gujarat ST bus depots, divisional control rooms, and 24x7 customer support across all 16 GSRTC administrative divisions.',
    body: `
  <div class="utility-action-box google-anno-skip">
    <h3>GSRTC 24x7 Central Passenger Helpline (Toll-Free)</h3>
    <p>Official statewide passenger helpline for Gujarat ST bus schedule inquiries, bus delays, depot assistance, and complaints:</p>
    <div class="utility-action-btns">
      <a class="btn primary" href="tel:18002336666">Call 1800 233 6666 (Toll-Free)</a>
      <a class="btn" href="tel:18002335555">Alt: 1800 233 5555</a>
    </div>
    <div class="utility-action-badges">
      <span class="utility-badge highlight">24x7 Gujarat Toll-Free</span>
      <span class="utility-badge">All 16 Divisions</span>
      <span class="utility-badge">Tap Any Number to Call</span>
    </div>
  </div>

  <h2 class="reveal">GSRTC Central 24x7 Helpline</h2>
  <p class="reveal">The official centralized 24x7 toll-free passenger helpline for GSRTC across Gujarat is <b><a href="tel:18002336666">1800 233 6666</a></b> (or alternate toll-free <b><a href="tel:18002335555">1800 233 5555</a></b>). Commuters can reach customer care for schedule inquiries, grievance redressal, emergency assistance, and booking verification.</p>

  <h2 class="reveal">All Gujarat Bus Station &amp; Depot Enquiry Numbers</h2>
  <p class="reveal">According to GSRTC divisional records, here are direct official enquiry and control room telephone numbers for major bus ports, divisional headquarters, and regional depots across Gujarat (tap any number to call directly):</p>
  <div class="table-wrap google-anno-skip">
  <table class="reveal">
    <tr><th>Bus Station / Depot</th><th>Direct Phone / Helpline</th></tr>
    <tr><td>Ahmedabad Geeta Mandir Central</td><td><a href="tel:07925463396">079-25463396</a> / <a href="tel:07925463409">079-25463409</a></td></tr>
    <tr><td>Ahmedabad Ranip Bus Port</td><td><a href="tel:07927552222">079-27552222</a></td></tr>
    <tr><td>Vadodara Central Bus Station</td><td><a href="tel:02652429646">0265-2429646</a> / <a href="tel:02652429647">0265-2429647</a></td></tr>
    <tr><td>Surat Central Bus Station</td><td><a href="tel:02612424037">0261-2424037</a> / <a href="tel:02612424038">0261-2424038</a></td></tr>
    <tr><td>Rajkot Central Bus Port</td><td><a href="tel:02812223847">0281-2223847</a> / <a href="tel:02812223848">0281-2223848</a></td></tr>
    <tr><td>Bhavnagar Bus Port</td><td><a href="tel:02782516701">0278-2516701</a></td></tr>
    <tr><td>Jamnagar ST Depot</td><td><a href="tel:02882550260">0288-2550260</a></td></tr>
    <tr><td>Junagadh Bus Stand</td><td><a href="tel:02852630303">0285-2630303</a></td></tr>
    <tr><td>Bhuj ST Depot</td><td><a href="tel:02832220002">02832-220002</a></td></tr>
    <tr><td>Gandhinagar Bus Depot</td><td><a href="tel:07923222842">079-23222842</a></td></tr>
    <tr><td>Anand Central Bus Station</td><td><a href="tel:02692251450">02692-251450</a></td></tr>
    <tr><td>Nadiad ST Depot</td><td><a href="tel:02682562544">0268-2562544</a></td></tr>
    <tr><td>Mehsana Central Bus Port</td><td><a href="tel:02762252122">02762-252122</a></td></tr>
    <tr><td>Morbi ST Bus Stand</td><td><a href="tel:02822230550">02822-230550</a></td></tr>
    <tr><td>Surendranagar ST Depot</td><td><a href="tel:02752220264">02752-220264</a></td></tr>
    <tr><td>Porbandar ST Bus Stand</td><td><a href="tel:02862241666">0286-2241666</a></td></tr>
    <tr><td>Somnath / Veraval Depot</td><td><a href="tel:02876220140">02876-220140</a></td></tr>
    <tr><td>Dwarka ST Depot</td><td><a href="tel:02892234242">02892-234242</a></td></tr>
    <tr><td>Palanpur ST Depot</td><td><a href="tel:02742252224">02742-252224</a></td></tr>
    <tr><td>Himatnagar ST Depot</td><td><a href="tel:02772240166">02772-240166</a></td></tr>
    <tr><td>Godhra ST Depot</td><td><a href="tel:02672242444">02672-242444</a></td></tr>
    <tr><td>Bharuch ST Depot</td><td><a href="tel:02642260344">02642-260344</a></td></tr>
    <tr><td>Navsari ST Depot</td><td><a href="tel:02637258044">02637-258044</a></td></tr>
    <tr><td>Valsad ST Depot</td><td><a href="tel:02632253344">02632-253344</a></td></tr>
    <tr><td>Vapi ST Depot</td><td><a href="tel:02602462344">0260-2462344</a></td></tr>
    <tr><td>Amreli ST Depot</td><td><a href="tel:02792222222">02792-222222</a></td></tr>
    <tr><td>Patan ST Depot</td><td><a href="tel:02766220224">02766-220224</a></td></tr>
  </table>
  </div>
  <p class="reveal"><b>Skip phone hold times:</b> You do not need to call the depot to ask whether a bus has departed or is running late. <a href="${APP}">ST Tracker</a> reads live AIS-140 GPS telematics updated every 20 seconds, displaying real-time departure countdowns and delay minutes for all 8,554+ ST buses.</p>`,
    faq: [
      { q: 'What is the toll-free customer care number for GSRTC bus enquiry?', a: 'The official 24x7 GSRTC toll-free customer helpline is 1800 233 6666 (alternate: 1800 233 5555), serving commuters across all 16 Gujarat divisions for complaints, bus inquiries, and lost luggage.' },
      { q: 'What is the Junagadh ST depot bus stand contact number?', a: 'The official enquiry telephone contact for Junagadh Bus Stand is 0285-2630303. For live departures and Mount Girnar shuttle tracking, check ST Tracker.' },
      { q: 'What is the Ahmedabad Geeta Mandir bus stand phone number?', a: 'The enquiry numbers for Ahmedabad Geeta Mandir Central Bus Stand are 079-25463396 and 079-25463409. For Ranip Bus Port, call 079-27552222.' },
      { q: 'What is the Rajkot Central bus stand enquiry phone number?', a: 'The enquiry phone numbers for Rajkot Central Bus Port are 0281-2223847 and 0281-2223848. For live platform countdowns without calling, use ST Tracker.' },
      { q: 'What is the Jamnagar ST depot contact number?', a: 'The official contact telephone number for Jamnagar ST Depot is 0288-2550260.' },
      { q: 'What is the Bhuj ST depot contact number?', a: 'The official inquiry telephone number for Bhuj ST Depot (Kutch Division) is 02832-220002.' },
      { q: 'What is the Surat Central bus station phone number?', a: 'The inquiry numbers for Surat Central Bus Station are 0261-2424037 and 0261-2424038.' },
      { q: 'Can I check bus arrival times and delays without calling the depot?', a: 'Yes. Type your bus number plate or pick a route on ST Tracker to view instantaneous GPS position, delay minutes, and estimated arrival countdowns directly on a map.' },
    ],
    related: [
      { href: '/gsrtc-tracker', label: 'GSRTC tracker — what it is and how it compares' },
      { href: '/nearby-st-bus-stops', label: 'Find ST bus stops near you' },
      { href: '/gsrtc-bus-timetable', label: 'GSRTC bus timetable between any two stations' },
    ],
  },
  {
    slug: 'gsrtc-bus-pass-online',
    plateForm: false,
    title: 'GSRTC e-Pass Online Apply 2026: Student Pass & Portal Login',
    description: 'Official GSRTC e-Pass guide: Direct pass.gsrtc.in portal login, student & ITI concession pass apply form, required documents, fees & live pass status.',
    crumbLabel: 'GSRTC e-pass & bus pass',
    h1: 'GSRTC bus pass & e-pass online: apply, renew & status check',
    lede: 'Daily student, ITI, or office commuter? Apply for or renew your Gujarat ST bus pass on pass.gsrtc.in, track e-Pass application status, and track your daily bus live.',
    body: `
  <div class="utility-action-box google-anno-skip">
    <h3>Official GSRTC e-Pass Online Portals (pass.gsrtc.in)</h3>
    <p>Direct official access to Gujarat ST Concession Pass System (ESCPS) online portals for students, daily commuters, and citizens:</p>
    <div class="utility-action-btns">
      <a class="btn primary" href="https://pass.gsrtc.in" target="_blank" rel="noopener noreferrer">ESCPS Portal Login ↗</a>
      <a class="btn" href="https://pass.gsrtc.in" target="_blank" rel="noopener noreferrer">Track Application Status ↗</a>
      <a class="btn" href="https://pass.gsrtc.in" target="_blank" rel="noopener noreferrer">New Student Registration ↗</a>
    </div>
    <div class="utility-action-badges">
      <span class="utility-badge highlight">Up to 80% Student Discount</span>
      <span class="utility-badge">Recognized ITI, School &amp; College</span>
      <span class="utility-badge">2 to 4 Days Online Approval</span>
    </div>
  </div>

  <h2 class="reveal">GSRTC e-Pass online portal (ESCPS)</h2>
  <p class="reveal">GSRTC manages all student, commuter, and employee bus passes electronically through the <b>Electronic State Transport Concession Pass System (ESCPS)</b> hosted at <a href="https://pass.gsrtc.in" target="_blank" rel="noopener noreferrer">pass.gsrtc.in</a>. Commuters can register a new profile, upload required verification documents, pay concessional fees, and track approval status 100% online without standing in depot queues.</p>

  <h2 class="reveal">Official concession rates and pass categories</h2>
  <div class="table-wrap google-anno-skip">
  <table class="reveal">
    <tr><th>Pass Classification</th><th>Discount / Concession</th><th>Eligible Beneficiaries</th></tr>
    <tr><td>Student Concession Pass</td><td>Up to <b>80% discount</b> on standard fare</td><td>Recognized schools, colleges, ITIs, and universities</td></tr>
    <tr><td>Monthly Commuter Pass</td><td>Economical daily travel pass (~40% savings)</td><td>Regular office employees, daily workers, and business travelers</td></tr>
    <tr><td>Divyangjan (Handicapped) Pass</td><td><b>100% free travel</b> + Escort allowance</td><td>Persons with permanent physical disability (40%+ certified)</td></tr>
    <tr><td>Senior Citizen Travel Pass</td><td>Concessional regional travel</td><td>Gujarat resident senior citizens (aged 60 and above)</td></tr>
    <tr><td>Freedom Fighter &amp; State Awardee</td><td>100% free travel</td><td>Accredited awardees and certified freedom fighters</td></tr>
  </table>
  </div>

  <h2 class="reveal">ITI and vocational student pass online</h2>
  <p class="reveal">Students enrolled in Government and Grant-in-Aid Industrial Training Institutes (ITI), polytechnics, and vocational institutions across Gujarat are entitled to an <b>80% fare concession</b> on standard GSRTC bus tariffs. To apply for an ITI bus pass online on <a href="https://pass.gsrtc.in" target="_blank" rel="noopener noreferrer">pass.gsrtc.in</a>, upload your semester bonafide certificate with the institute principal's signature and stamp, specifying your commuting stop and training center location.</p>

  <h2 class="reveal">How to check GSRTC e-pass application status</h2>
  <p class="reveal">To check your application or renewal progress: visit <a href="https://pass.gsrtc.in" target="_blank" rel="noopener noreferrer">pass.gsrtc.in</a>, click <b>Track Application Status</b>, enter your 10-digit application reference number or registered mobile number, and submit. Verification takes <b>2 to 4 working days</b> by the designated depot passing officer.</p>

  <h2 class="reveal">Documents required for online pass application</h2>
  <ul class="reveal">
    <li><b>Current Academic Bonafide Certificate:</b> Official bonafide stamped and signed by school principal, ITI director, or college dean specifying distance and institution address.</li>
    <li><b>Proof of Residence:</b> Aadhaar card, Election card, or Ration card reflecting Gujarat address.</li>
    <li><b>Photograph &amp; Signature:</b> Recent passport-size photograph and scanned signature under 100 KB.</li>
    <li><b>Previous Pass Number:</b> Required for annual or semester renewal to preserve commuter identity.</li>
  </ul>

  <h2 class="reveal">Pairing your daily pass with live GPS tracking</h2>
  <p class="reveal">Once your pass is active, avoid unnecessary waiting at rural bus stands or city pick-up stops. Open <a href="${APP}">ST Tracker</a> on your phone to track your designated morning and evening bus live on a map. With AIS-140 telematics refreshed every 20 seconds, you can leave home exactly when your bus is approaching.</p>`,
    howTo: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Apply for GSRTC Student E-Pass Online (ESCPS)',
      description: 'Step-by-step process to apply for and track GSRTC student or commuter e-pass on pass.gsrtc.in.',
      totalTime: 'PT5M',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Open the ESCPS Portal',
          text: 'Visit pass.gsrtc.in on your phone or computer and select Student Pass Registration.',
        },
        {
          '@type': 'HowToStep',
          name: 'Register Account & Select Depot',
          text: 'Enter your mobile number, verify OTP, and pick your home GSRTC administrative depot.',
        },
        {
          '@type': 'HowToStep',
          name: 'Enter Journey Route & Upload Documents',
          text: 'Specify boarding station and destination institution. Upload stamped school/college/ITI bonafide certificate and passport photo.',
        },
        {
          '@type': 'HowToStep',
          name: 'Pay Concession Fee Online',
          text: 'Pay the subsidized pass fee via UPI, debit card, or net banking.',
        },
        {
          '@type': 'HowToStep',
          name: 'Track Approval & Collect Pass',
          text: 'Check approval status online in 2–4 working days and collect the smart pass at your designated depot.',
        },
      ],
    },
    faq: [
      { q: 'Where do I apply for a GSRTC student bus pass online?', a: 'Apply online on the official GSRTC Electronic Concession Pass System (ESCPS) portal at pass.gsrtc.in by registering with your mobile number, selecting your home depot, and uploading your student bonafide certificate.' },
      { q: 'Can ITI students get a concessional GSRTC bus pass?', a: 'Yes. Students at government and grant-in-aid ITIs in Gujarat receive up to an 80% fare discount. Submit your semester bonafide signed by your ITI principal on pass.gsrtc.in.' },
      { q: 'How do I check my GSRTC e-pass application status?', a: 'Visit pass.gsrtc.in and navigate to the Track Application Status page. Enter your application reference ID or registered phone number to view whether your pass is under verification, approved, or ready for smart card collection at your local depot.' },
      { q: 'What is the student concession discount on a GSRTC bus pass?', a: 'GSRTC provides recognized school, ITI, and college students up to an 80% discount on ordinary passenger fare tariffs for travel between their residence stop and educational institution.' },
      { q: 'How many days does it take to approve a GSRTC bus pass?', a: 'Online verification is typically completed within 2 to 4 working days by the local depot passing clerk. You receive an SMS notification once approved.' },
      { q: 'Can I track the daily bus on my pass route live?', a: 'Yes. On ST Tracker, enter your route station pair or the bus plate number to monitor real-time bus location, arrival countdowns, and delay alerts on a live map.' },
    ],
    related: [
      { href: '/gsrtc-concession-pass-rules', label: 'GSRTC concession pass rules and eligibility' },
      { href: '/gsrtc-bus-fare-ticket-price', label: 'Official GSRTC bus ticket price chart and fare calculator' },
      { href: '/gsrtc-bus-timetable', label: 'GSRTC bus timetable between any two stations' },
      { href: '/nearby-st-bus-stops', label: 'Find ST bus stops near you' },
    ],
  },
  {
    slug: 'gsrtc-ticket-cancellation-refund',
    plateForm: false,
    title: 'GSRTC Ticket Cancellation Charges & Refund Rules 2026',
    description: 'Official GSRTC ticket cancellation charges & refund rules: 10% to 50% deduction slabs by hours before departure, online cancel steps, refund timeline & policy.',
    crumbLabel: 'GSRTC cancellation & refund',
    h1: 'GSRTC ticket cancellation charges and refund rules',
    lede: 'Plans changed? Here is the exact cancellation charge schedule, how refund windows work, and how to track alternative buses.',
    body: `
  <div class="utility-action-box google-anno-skip">
    <h3>Official GSRTC Ticket Cancellation &amp; Refund Portal</h3>
    <p>Cancel confirmed tickets booked online and initiate automatic bank refund:</p>
    <div class="utility-action-btns">
      <a class="btn primary" href="https://gsrtc.in" target="_blank" rel="noopener noreferrer">Open GSRTC Cancellation Portal ↗</a>
    </div>
    <div class="utility-action-badges">
      <span class="utility-badge highlight">&gt; 24 Hrs: 10% Fee (90% Refund)</span>
      <span class="utility-badge">2 to 24 Hrs: 25% Fee (75% Refund)</span>
      <span class="utility-badge">&lt; 2 Hrs: No Refund</span>
    </div>
  </div>

  <h2 class="reveal">Official cancellation charges and deduction slabs</h2>
  <p class="reveal">GSRTC follows a tiered cancellation fee structure based on how many hours before scheduled bus departure you cancel your ticket:</p>
  <div class="table-wrap google-anno-skip">
  <table class="reveal">
    <tr><th>Time Before Departure</th><th>Deduction Percentage</th><th>Refund Amount</th></tr>
    <tr><td>More than 24 hours</td><td>10% of basic fare</td><td>90% refund</td></tr>
    <tr><td>Between 24 and 2 hours</td><td>20% of basic fare</td><td>80% refund</td></tr>
    <tr><td>Between 2 hours and departure</td><td>50% of basic fare</td><td>50% refund</td></tr>
    <tr><td>After bus departure / No-show</td><td>100% deduction</td><td>No refund</td></tr>
  </table>
  </div>

  <h2 class="reveal">How to cancel online step by step</h2>
  <p class="reveal">For tickets booked via the GSRTC portal, official app, or travel aggregators like redBus, locate the <b>Cancel Ticket</b> link on the respective platform and enter your PNR and registered mobile number. Refunds are credited to your original payment method within 5 to 7 banking days.</p>

  <h2 class="reveal">Rescheduling or finding an alternative departure</h2>
  <p class="reveal">If you cancelled due to a delay or schedule conflict, you can instantly find alternative buses running today on <a href="${APP}">ST Tracker</a> without booking in advance. Check departures between any two cities and view countdowns for running buses.</p>`,
    howTo: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Cancel GSRTC Bus Ticket Online & Claim Refund',
      description: 'Step-by-step instructions to cancel a confirmed GSRTC ticket and receive an automated refund.',
      totalTime: 'PT3M',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Open Official GSRTC Portal',
          text: 'Visit gsrtc.in and click on the Cancel Ticket option from the booking navigation menu.',
        },
        {
          '@type': 'HowToStep',
          name: 'Enter PNR and Mobile Number',
          text: 'Type your 10-digit ticket PNR reference code and the mobile phone number used during booking.',
        },
        {
          '@type': 'HowToStep',
          name: 'Select Seats to Cancel',
          text: 'Choose whether to cancel individual passenger seats or the entire booking reservation.',
        },
        {
          '@type': 'HowToStep',
          name: 'Confirm Deduction and Cancellation',
          text: 'Review the refund percentage (10% to 50% deduction depending on time remaining) and confirm cancellation.',
        },
        {
          '@type': 'HowToStep',
          name: 'Receive Refund Credit',
          text: 'Refund proceeds are credited back to your original UPI, card, or net banking account in 5 to 7 working days.',
        },
      ],
    },
    faq: [
      { q: 'What is the minimum cancellation charge for a GSRTC bus ticket?', a: 'The minimum cancellation fee is 10% of the basic ticket fare when cancelled more than 24 hours prior to scheduled departure.' },
      { q: 'What is the cancellation charge within 2 hours of departure?', a: 'Tickets cancelled between 2 hours and scheduled bus departure incur a 50% cancellation fee, with 50% refunded to your original payment mode.' },
      { q: 'Can I cancel a GSRTC ticket after the bus has departed?', a: 'No. Tickets cannot be cancelled once the scheduled departure time has passed, and no refund is payable for missed buses.' },
      { q: 'How long does it take to receive a GSRTC ticket refund?', a: 'Refunds for online transactions are typically processed and credited back to your bank account or card within 5 to 7 business days.' },
      { q: 'Can I track an alternative bus if my trip is cancelled?', a: 'Yes. Use ST Tracker to search any two Gujarat stations to find real-time running buses, delay alerts, and departure countdowns immediately.' },
    ],
    related: [
      { href: '/gsrtc-advance-booking-rules', label: 'GSRTC advance booking rules & seat reservation' },
      { href: '/gsrtc-online-booking-pnr-tracking', label: 'Track your GSRTC bus using PNR / ticket number' },
      { href: '/gsrtc-bus-delay-status', label: 'Is my GSRTC bus running late?' },
      { href: '/gsrtc-bus-timetable', label: 'GSRTC bus timetable between any two stations' },
    ],
  },
  {
    slug: 'gsrtc-luggage-rules-rates',
    plateForm: false,
    title: 'GSRTC Luggage Charges, Weight Limit & Parcel Rules',
    description: 'How much luggage you can carry on GSRTC Gujarat ST buses, free weight allowance limits, excess baggage rates per 20kg slab, and parcel tracking.',
    crumbLabel: 'GSRTC luggage rules & rates',
    h1: 'GSRTC luggage rules, weight limits and charges',
    lede: 'Carrying bags, parcels, or equipment on a Gujarat ST bus? Here are the official free baggage limits and excess luggage rates.',
    body: `
  <div class="utility-action-box google-anno-skip">
    <h3>GSRTC Free Baggage Allowance &amp; Weight Limits</h3>
    <p>Official free luggage allowances and excess luggage rules on Gujarat ST passenger buses:</p>
    <div class="utility-action-badges">
      <span class="utility-badge highlight">Adult Allowance: 25 kg to 35 kg Free</span>
      <span class="utility-badge">Child Allowance: 15 kg Free</span>
      <span class="utility-badge">Excess Slabs: 20 kg Units</span>
    </div>
  </div>

  <h2 class="reveal">Free baggage allowance per passenger</h2>
  <p class="reveal">Every fare-paying adult passenger on a GSRTC bus is entitled to carry personal luggage free of charge up to specified limits:</p>
  <ul class="reveal">
    <li><b>Express and Local Services:</b> Up to <b>25 kg</b> of personal luggage per adult passenger (15 kg for half-fare child tickets).</li>
    <li><b>Gurjarnagri 2x2 Services:</b> Up to <b>30 kg</b> of personal luggage per passenger.</li>
    <li><b>Volvo &amp; AC Sleeper Coaches:</b> Up to <b>35 kg</b> of baggage stored in underfloor luggage boots.</li>
  </ul>

  <h2 class="reveal">Excess luggage charges and rates</h2>
  <p class="reveal">Luggage exceeding the free allowance is charged in slabs of 20 kg (or part thereof) based on the distance travelled. Charges are collected directly by the conductor against an official printed baggage receipt.</p>

  <h2 class="reveal">Prohibited items and commercial parcels</h2>
  <p class="reveal">Inflammable goods, explosives, gas cylinders, and hazardous chemicals are strictly prohibited on all passenger buses. For shipping unattended commercial consignments, GSRTC provides an official counter-to-counter courier &amp; parcel service between major depots.</p>`,
    faq: [
      { q: 'How much luggage is free in a GSRTC bus?', a: 'Adult passengers can carry up to 25 kg of personal luggage free of charge on Express services, and up to 35 kg on premium Volvo coaches.' },
      { q: 'Can I carry a bicycle or TV in an ST bus?', a: 'Yes, provided space is available in the luggage boot or roof rack. Conductor collects an extra luggage charge according to standard parcel tariff slabs.' },
      { q: 'Does GSRTC offer courier and parcel booking?', a: 'Yes, GSRTC operates an official counter-to-counter parcel delivery service connecting major Gujarat bus stations.' },
    ],
    related: [
      { href: '/gsrtc-bus-fleet', label: 'How big is the GSRTC bus fleet?' },
      { href: '/gsrtc-volvo-sleeper-ac-bus-tracking', label: 'GSRTC Volvo, AC & Sleeper bus live tracking' },
      { href: '/gsrtc-bus-stand-helpline-numbers', label: 'GSRTC bus stand enquiry & helpline directory' },
    ],
  },
  {
    slug: 'gsrtc-night-bus-tracking',
    title: 'GSRTC Night Bus Timetable & Overnight Bus Tracking',
    description: 'Track GSRTC overnight sleeper and express night buses live on a map. See late-night departure times, midnight GPS updates, and set arrival alerts.',
    crumbLabel: 'GSRTC night bus tracking',
    h1: 'GSRTC night bus services and live overnight tracking',
    lede: 'Catching an overnight bus between Gujarat cities? Track midnight departures live, monitor highway delays, and set arrival alerts before your stop.',
    body: `
  <h2 class="reveal">Overnight long-distance network in Gujarat</h2>
  <p class="reveal">GSRTC runs extensive night service networks connecting South Gujarat (Surat, Vapi), Central Gujarat (Ahmedabad, Vadodara), and Saurashtra / Kutch (Rajkot, Bhuj, Jamnagar, Somnath). Departures operate continuously from 9:00 PM until 4:00 AM.</p>

  <h2 class="reveal">Live GPS tracking through the night</h2>
  <p class="reveal">On-board GPS transponders remain active and broadcast positional fixes roughly every 20 seconds throughout the night. Whether your bus is navigating National Highway 48 or state expressways, <a href="${APP}">ST Tracker</a> updates its exact location continuously on the map.</p>

  <h2 class="reveal">Wake up on time with arrival alerts</h2>
  <p class="reveal">Sleeping on an overnight bus? You don’t have to stay awake checking the map. Open ST Tracker on your phone, pick your destination stop, and activate an arrival alert. Your phone will notify you shortly before the bus pulls into your station.</p>`,
    faq: [
      { q: 'Do GSRTC night buses have live GPS tracking?', a: 'Yes. All GSRTC overnight sleeper, luxury, and express night buses feature continuous GPS tracking active 24 hours a day.' },
      { q: 'Can I set an alarm for when my night bus reaches my stop?', a: 'Yes! On ST Tracker, select your destination stop along the route and enable arrival alerts to get notified before arrival.' },
      { q: 'Which routes have the most frequent night buses?', a: 'Major overnight corridors include Ahmedabad ↔ Surat, Surat ↔ Rajkot, Ahmedabad ↔ Bhuj, and Vadodara ↔ Bhavnagar.' },
    ],
    related: [
      { href: '/gsrtc-volvo-sleeper-ac-bus-tracking', label: 'GSRTC Volvo, AC & Sleeper bus live tracking' },
      { href: '/gsrtc-bus-arrival-alerts', label: 'Get an alert before your GSRTC bus arrives' },
      { href: '/gsrtc-bus-delay-status', label: 'Is my GSRTC bus running late?' },
    ],
  },
  {
    slug: 'gsrtc-concession-pass-rules',
    plateForm: false,
    title: 'GSRTC Concession Rules: Senior Citizen & Divyang Pass',
    description: 'Eligibility, discount percentages, and documentation for GSRTC travel concessions including Senior Citizens, Divyangjan (PwD), and Cancer patients.',
    crumbLabel: 'GSRTC concession rules',
    h1: 'GSRTC travel concessions and discounted fare rules',
    lede: 'GSRTC provides subsidized and free travel for eligible citizens across Gujarat. Here is who qualifies and what proof is required.',
    body: `
  <div class="utility-action-box google-anno-skip">
    <h3>Gujarat ST Welfare Concession &amp; Free Travel Schemes</h3>
    <p>Subsidized and 100% free travel schemes for senior citizens, Divyangjan, and medical patients:</p>
    <div class="utility-action-badges">
      <span class="utility-badge highlight">Divyangjan: 100% Free Travel</span>
      <span class="utility-badge">Senior Citizens: Concession on ID</span>
      <span class="utility-badge">Cancer Patients: 100% Free Treatment Transit</span>
    </div>
  </div>

  <h2 class="reveal">Key concession categories and discounts</h2>
  <p class="reveal">Under Gujarat state welfare guidelines, GSRTC extends generous fare concessions across various passenger segments:</p>
  <ul class="reveal">
    <li><b>Senior Citizens (Age 60+):</b> Concessional bus travel on ordinary and express services across the state upon presenting a valid Senior Citizen ID or Aadhaar card.</li>
    <li><b>Divyangjan (Persons with Disabilities):</b> 100% free travel across ordinary, express, and Gurjarnagri services for passengers with 40%+ permanent disability, with concession for an accompanying escort.</li>
    <li><b>Cancer Patients &amp; Attendants:</b> 100% free travel between home residence and specialized cancer treatment hospitals (e.g. GCRI Ahmedabad).</li>
    <li><b>Freedom Fighters:</b> Lifetime free travel in all GSRTC bus classes for registered freedom fighters and their spouses.</li>
  </ul>

  <h2 class="reveal">How to obtain a concession pass</h2>
  <p class="reveal">Eligible beneficiaries can register online through the <a href="/gsrtc-bus-pass-online">GSRTC e-Pass system</a> or submit documentation in person at their nearest divisional depot passing office. Once verified, commuters receive an RFID smart concession card valid across all 16 GSRTC administrative divisions.</p>
  <p class="reveal">Senior citizens traveling on ordinary or express services are not required to obtain an advance pass; showing a government-issued photo ID reflecting date of birth directly to the bus conductor grants immediate fare concession.</p>`,
    faq: [
      { q: 'Do senior citizens get free travel in GSRTC buses?', a: 'Senior citizens aged 60 and above receive special fare concessions upon displaying a valid government ID or smart concession pass.' },
      { q: 'What disability percentage is required for GSRTC Divyang pass?', a: 'A permanent disability certificate of 40% or higher issued by an authorized civil surgeon is required for free travel concessions.' },
      { q: 'Can concession card holders track their buses live?', a: 'Yes! Concession card holders can use ST Tracker to track any ST bus on a map by plate or route for free with no account needed.' },
    ],
    related: [
      { href: '/gsrtc-bus-pass-online', label: 'GSRTC bus pass online: apply, renew & check status' },
      { href: '/gsrtc-bus-stand-helpline-numbers', label: 'GSRTC bus stand enquiry & helpline directory' },
      { href: '/gsrtc-bus-timetable', label: 'GSRTC bus timetable between any two stations' },
    ],
  },
  {
    slug: 'gsrtc-bus-fare-ticket-price',
    plateForm: false,
    title: 'GSRTC Bus Fare Calculator & Ticket Price Chart',
    description: 'Official GSRTC bus ticket price chart and fare calculator. See per km fare rates across Ordinary, Express, Gurjarnagri, Sleeper, and Volvo buses in Gujarat.',
    crumbLabel: 'GSRTC bus fare & ticket price',
    h1: 'GSRTC bus fare calculator and ticket price chart',
    lede: 'Planning an ST bus trip in Gujarat? Here is how GSRTC calculates bus fares per kilometer across all service types, with minimum fares and child concession rules.',
    body: `
  <div class="utility-action-box google-anno-skip">
    <h3>Official GSRTC Bus Ticket Price &amp; Fare Slabs 2026</h3>
    <p>Standard per-kilometer basic tariff rates across Gujarat ST service classes:</p>
    <div class="utility-action-badges">
      <span class="utility-badge highlight">Ordinary: ₹0.95–₹1.05 / km</span>
      <span class="utility-badge">Express: ₹1.15–₹1.25 / km</span>
      <span class="utility-badge">Gurjarnagri: ₹1.35–₹1.45 / km</span>
      <span class="utility-badge">Sleeper: ₹1.70–₹1.85 / km</span>
      <span class="utility-badge">Volvo: ₹2.40–₹2.70 / km</span>
    </div>
  </div>

  <h2 class="reveal">How GSRTC calculates bus fares</h2>
  <p class="reveal">GSRTC fares are regulated by the Gujarat State Transport Authority and calculated per passenger kilometer (based on a stage system where 1 stage equals 6 km). The final ticket fare includes the basic distance tariff, passenger tax, toll surcharge, and a nominal passenger amenities cess.</p>

  <h2 class="reveal">Bus fare rate per kilometer by service type</h2>
  <div class="table-wrap google-anno-skip">
  <table class="reveal">
    <tr><th>Bus Service Class</th><th>Rate Per Km (Approx)</th><th>Minimum Fare</th><th>Best For</th></tr>
    <tr><td>Ordinary / Local (Silver/Blue)</td><td>₹0.95 – ₹1.05 / km</td><td>₹10 (1 stage)</td><td>Short rural trips &amp; village halts</td></tr>
    <tr><td>Express (Green/Cream)</td><td>₹1.15 – ₹1.25 / km</td><td>₹15</td><td>Taluka &amp; intercity travel</td></tr>
    <tr><td>Gurjarnagri 2x2 (Saffron)</td><td>₹1.35 – ₹1.45 / km</td><td>₹20</td><td>Medium-to-long distance 2x2 comfort</td></tr>
    <tr><td>Non-AC Sleeper (2x1)</td><td>₹1.70 – ₹1.85 / km</td><td>₹50</td><td>Overnight journeys across regions</td></tr>
    <tr><td>AC Sleeper (2x1)</td><td>₹2.10 – ₹2.30 / km</td><td>₹80</td><td>Long-haul overnight comfort with AC</td></tr>
    <tr><td>Volvo / Scania Multi-Axle</td><td>₹2.40 – ₹2.70 / km</td><td>₹100</td><td>Expressway executive intercity travel</td></tr>
  </table>
  </div>

  <h2 class="reveal">Child fare and concession rules</h2>
  <ul class="reveal">
    <li><b>Children under 5 years:</b> Travel completely free without a separate seat booking.</li>
    <li><b>Children aged 5 to 12 years:</b> Charged half (50%) of the basic adult fare, rounded up to the nearest rupee, with full seat entitlement.</li>
    <li><b>Senior Citizens (60+) &amp; Divyangjan:</b> Eligible for welfare fare concessions or free travel under Gujarat government schemes upon displaying valid documentation. See full <a href="/gsrtc-concession-pass-rules">GSRTC concession pass rules</a>.</li>
  </ul>

  <h2 class="reveal">Check running buses before you book</h2>
  <p class="reveal">Rather than guessing which bus category gives the best schedule, use <a href="${APP}">ST Tracker</a> to see every scheduled and running bus between your origin and destination, check delay status, and pick the best departure.</p>`,
    faq: [
      { q: 'How is GSRTC bus fare calculated?', a: 'GSRTC fares are calculated by multiplying the travel distance in kilometers by the per-km tariff for the bus class (Ordinary, Express, Gurjarnagri, Sleeper, Volvo), plus passenger tax and toll cess.' },
      { q: 'Are children free on GSRTC buses?', a: 'Children below 5 years of age travel free without a seat reservation. Children between 5 and 12 years pay half of the adult basic fare with a reserved seat.' },
      { q: 'Which GSRTC bus type is the most economical?', a: 'Ordinary (Local) and Express buses offer the lowest per-kilometer fare, while Gurjarnagri 2x2 provides the most balanced combination of affordable fare and cushioned seating comfort.' },
    ],
    related: [
      { href: '/gsrtc-concession-pass-rules', label: 'GSRTC concession pass rules and eligibility' },
      { href: '/gsrtc-bus-types-classes', label: 'GSRTC bus types and seat layout guide' },
      { href: '/gsrtc-advance-booking-rules', label: 'GSRTC advance booking rules & seat reservation' },
      { href: '/gsrtc-volvo-sleeper-ac-bus-tracking', label: 'GSRTC Volvo, AC & Sleeper bus live tracking' },
      { href: '/gsrtc-bus-timetable', label: 'GSRTC bus timetable between any two stations' },
      { href: '/gsrtc-ticket-cancellation-refund', label: 'GSRTC ticket cancellation charges and refund rules' },
    ],
  },
  {
    slug: 'gsrtc-electric-bus-timetable',
    title: 'GSRTC Electric Bus (e-Bus) Routes & Live Tracking',
    description: 'Track GSRTC zero-emission electric buses (e-Buses) live on a map. View daily EV bus routes, timetable schedules, charging stops, and amenities across Gujarat.',
    crumbLabel: 'GSRTC electric bus tracking',
    h1: 'GSRTC electric bus (e-Bus) routes and live tracking',
    lede: 'Gujarat ST is deploying zero-emission electric buses on major intercity routes. Here is how to find e-Bus departures, route corridors, and track them live.',
    body: `
  <h2 class="reveal">Green mobility across Gujarat ST routes</h2>
  <p class="reveal">Under Gujarat’s clean transportation initiatives, GSRTC has inducted modern electric buses (JBM Ecolife and Tata Motors EV fleets) across high-frequency corridors. Featuring whisper-quiet electric motors, regenerative braking, and zero tailpipe emissions, these e-buses offer an eco-friendly alternative to diesel coaches.</p>

  <h2 class="reveal">High-frequency electric bus corridors</h2>
  <ul class="reveal">
    <li><b>Ahmedabad ↔ Gandhinagar:</b> High-frequency executive e-bus shuttle connecting Ranip, Nehrunagar, and Gandhinagar Sector 11/21 bus stands.</li>
    <li><b>Ahmedabad ↔ Vadodara:</b> Fast electric bus departures running via National Expressway 1.</li>
    <li><b>Rajkot ↔ Morbi:</b> Clean commuter services connecting Saurashtra’s major ceramic and industrial cluster.</li>
    <li><b>Vadodara ↔ Ekta Nagar:</b> Eco-friendly tourist shuttles connecting Baroda Central with the Statue of Unity.</li>
  </ul>

  <h2 class="reveal">Passenger amenities on GSRTC e-buses</h2>
  <p class="reveal">Every GSRTC electric coach is equipped with air conditioning, USB charging ports at every row, CCTV surveillance, emergency SOS buttons, and digital Passenger Information System (PIS) display screens announcing upcoming stops.</p>

  <h2 class="reveal">Track electric buses in real time</h2>
  <p class="reveal">Every electric bus is integrated with live GPS telemetry. Search your route on <a href="${APP}">ST Tracker</a> to view active electric services, see countdowns to arrival, and watch the bus move along the route live on the map.</p>`,
    faq: [
      { q: 'Does GSRTC operate electric buses between cities in Gujarat?', a: 'Yes, GSRTC operates air-conditioned zero-emission electric buses on high-density intercity routes including Ahmedabad–Gandhinagar, Ahmedabad–Vadodara, and Rajkot–Morbi.' },
      { q: 'How do I know if an upcoming bus is an electric bus?', a: 'On ST Tracker, search between your origin and destination stations; electric departures are flagged with AC / Electric service markers.' },
      { q: 'Are ticket prices higher for GSRTC electric buses?', a: 'GSRTC electric bus fares are priced similarly to standard AC Express bus services, providing clean luxury travel at affordable state transport tariffs.' },
    ],
    related: [
      { href: '/gsrtc-volvo-sleeper-ac-bus-tracking', label: 'GSRTC Volvo, AC & Sleeper bus live tracking' },
      { href: '/ahmedabad-gandhinagar-bus', label: 'Ahmedabad ↔ Gandhinagar ST bus live tracking' },
      { href: '/gsrtc-bus-delay-status', label: 'Is my GSRTC bus running late?' },
    ],
  },
  {
    slug: 'gsrtc-courier-parcel-service',
    plateForm: false,
    title: 'GSRTC Courier & Parcel Rates, Tracking & Counters',
    description: 'Official guide to GSRTC same-day bus courier and parcel service in Gujarat. See parcel booking counter locations, weight tariff rates, and cargo delivery rules.',
    crumbLabel: 'GSRTC courier & parcel service',
    h1: 'GSRTC parcel & courier service: rates, counters and tracking',
    lede: 'Need to send an urgent document, parcel, or commercial carton across Gujarat? GSRTC’s official depot courier service delivers same-day on scheduled ST buses.',
    body: `
  <div class="utility-action-box google-anno-skip">
    <h3>GSRTC Courier &amp; Parcel Cargo Service</h3>
    <p>Official counter-to-counter fast luggage and document parcel service across 125+ depots in Gujarat:</p>
    <div class="utility-action-badges">
      <span class="utility-badge highlight">Same-Day Intercity Delivery</span>
      <span class="utility-badge">Consignment SMS OTP Tracking</span>
      <span class="utility-badge">125+ Depot Counters</span>
    </div>
  </div>

  <h2 class="reveal">Same-day intercity cargo on Gujarat ST buses</h2>
  <p class="reveal">GSRTC operates an extensive counter-to-counter courier and logistics service across more than 125 bus depots in Gujarat. Because packages travel aboard scheduled passenger buses departing round the clock, shipments typically arrive at destination bus stands within 3 to 8 hours — far faster than conventional overnight private courier networks.</p>

  <h2 class="reveal">How to book a parcel at the bus stand</h2>
  <ol class="reveal">
    <li>Bring your securely packaged parcel to the designated <b>GSRTC Courier &amp; Parcel Counter</b> at your nearest ST depot.</li>
    <li>The counter clerk weighs the parcel, verifies declared contents, and generates a computerised Consignment Note (CN) receipt.</li>
    <li>An SMS notification with consignment details and OTP is transmitted to both the sender and recipient mobile numbers.</li>
    <li>The recipient visits the parcel counter at the destination depot, presents the CN receipt or SMS OTP with valid photo ID, and collects the parcel upon bus arrival.</li>
  </ol>

  <h2 class="reveal">Weight slabs and pricing guidelines</h2>
  <p class="reveal">GSRTC parcel charges are structured in weight slabs (starting from documents under 250 grams up to heavy commercial cartons in 10 kg increments) and distance tiers. Tariffs are heavily subsidized compared to air or private surface couriers.</p>

  <h2 class="reveal">Tracking buses carrying your consignment</h2>
  <p class="reveal">Once your parcel is assigned to a specific scheduled departure, you can monitor that bus’s real-time journey on <a href="${APP}">ST Tracker</a>. View GPS coordinates and arrival countdowns to time your depot pickup perfectly.</p>`,
    faq: [
      { q: 'How fast does GSRTC bus courier deliver parcels?', a: 'GSRTC courier provides same-day delivery between Gujarat cities. Parcels are loaded onto the next scheduled bus departing toward the destination depot.' },
      { q: 'Where are GSRTC parcel counters located?', a: 'Parcel booking counters operate at all major GSRTC central bus stations and divisional depots, typically adjacent to the main parcel gates or depot control rooms.' },
      { q: 'Can I track a bus carrying my parcel online?', a: 'Yes! If you know the scheduled route or registration plate of the bus carrying your shipment, you can monitor its live location on ST Tracker.' },
    ],
    related: [
      { href: '/gsrtc-luggage-rules-rates', label: 'GSRTC luggage rules, weight limits and charges' },
      { href: '/gsrtc-bus-stand-helpline-numbers', label: 'GSRTC bus stand enquiry & helpline directory' },
      { href: '/gsrtc-bus-timetable', label: 'GSRTC bus timetable between any two stations' },
    ],
  },
  {
    slug: 'gsrtc-advance-booking-rules',
    plateForm: false,
    title: 'GSRTC Advance Booking Rules, Reservation Window & Quotas',
    description: 'How many days in advance you can book a GSRTC bus ticket, daily booking opening times, ladies seat quotas, Tatkal rules, and conductor ticket booking.',
    crumbLabel: 'GSRTC advance booking rules',
    h1: 'GSRTC advance booking rules and seat reservation guide',
    lede: 'Planning travel during Diwali, Holi, or summer holidays? Here is how the GSRTC advance booking window works, seat quotas, and how to find buses when reserved seats are full.',
    body: `
  <div class="utility-action-box google-anno-skip">
    <h3>GSRTC Advance Seat Reservation Guidelines</h3>
    <p>Key reservation timeline and booking quotas for Gujarat ST long-distance buses:</p>
    <div class="utility-action-badges">
      <span class="utility-badge highlight">60-Day Advance Booking Window</span>
      <span class="utility-badge">Opens Daily at 00:01 AM</span>
      <span class="utility-badge">Ladies Quota: Seats 1 to 12</span>
    </div>
  </div>

  <h2 class="reveal">The 60-day advance reservation window</h2>
  <p class="reveal">GSRTC allows passengers to book bus tickets up to <b>60 days in advance</b> for all Express, Gurjarnagri, Sleeper, and Volvo long-distance services. Advance reservations for the 60th day open every morning at <b>00:01 AM</b> on the official GSRTC web portal and mobile app.</p>

  <h2 class="reveal">Reserved seat quotas and priorities</h2>
  <ul class="reveal">
    <li><b>Ladies Quota (Seats 1–12):</b> Reserved specifically for female passengers in standard and express buses until 30 minutes prior to departure.</li>
    <li><b>Divyangjan &amp; Senior Citizens:</b> Designated seats near the front boarding door are prioritized for elderly and disabled commuters.</li>
    <li><b>Conductor Walk-in Quota:</b> On ordinary and short-distance express routes, up to 40% of seat inventory is reserved for walk-in passengers purchasing conductor tickets directly at the platform.</li>
  </ul>

  <h2 class="reveal">What to do when advance seats are sold out</h2>
  <p class="reveal">During festival rushes (Diwali, Raksha Bandhan, Uttarayan), online seats often sell out quickly. However, GSRTC schedules dozens of unscheduled "Extra / Mela" buses that do not appear in advance booking systems. Use <a href="${APP}">ST Tracker</a> to see all active buses running on your corridor in real time, check seat availability reports, and catch an unreserved departure.</p>`,
    faq: [
      { q: 'How many days before travel does GSRTC booking open?', a: 'GSRTC opens advance ticket booking 60 days before the journey date at 00:01 AM online.' },
      { q: 'Can I travel on a GSRTC bus without an advance reservation?', a: 'Yes! Most GSRTC buses allocate seats for walk-in passengers, who can buy tickets directly from the conductor aboard the bus or at the depot counter.' },
      { q: 'What happens if advance tickets are fully booked online?', a: 'GSRTC operates unreserved extra buses during peak demand. Use ST Tracker to find active buses currently running on your route.' },
    ],
    related: [
      { href: '/gsrtc-online-booking-pnr-tracking', label: 'Track your GSRTC bus using PNR / ticket number' },
      { href: '/gsrtc-ticket-cancellation-refund', label: 'GSRTC ticket cancellation charges and refund rules' },
      { href: '/gsrtc-bus-timetable', label: 'GSRTC bus timetable between any two stations' },
    ],
  },
  {
    slug: 'gsrtc-bus-types-classes',
    plateForm: false,
    title: 'GSRTC Bus Types & Fleet Classes Explained',
    description: 'Complete guide to GSRTC bus categories: Local, Express, Gurjarnagri 2x2, Sleeper, AC Volvo, and Metro Link. Compare seat layouts, comfort, and ticket fares.',
    crumbLabel: 'GSRTC bus types & classes',
    h1: 'GSRTC bus types and fleet classes, explained',
    lede: 'Confused between Express, Gurjarnagri, and Sleeper? Here is a complete comparison of every GSRTC bus type, seat configuration, and which to choose for your journey.',
    body: `
  <h2 class="reveal">The Gujarat ST fleet hierarchy</h2>
  <p class="reveal">With a fleet of over 8,500 active buses, GSRTC operates multiple specialized vehicle categories tailored to varying travel distances, terrain, and passenger budgets across Gujarat.</p>

  <h2 class="reveal">Comparison of major GSRTC bus categories</h2>
  <ul class="reveal">
    <li><b>Local / Ordinary (Silver &amp; Blue):</b> 3x2 standard seating. Halts at all intermediate rural stops and villages. Best for economical short-distance commutes under 50 km.</li>
    <li><b>Express (Green &amp; Cream):</b> 3x2 standard seating. Stops only at major taluka bus stands and district junctions. Fast, economical transit between neighboring cities.</li>
    <li><b>Gurjarnagri (Saffron &amp; White):</b> 2x2 wide cushioned pushback seats with ample legroom. The premier express backbone of Gujarat connecting district headquarters with minimal halts.</li>
    <li><b>Non-AC Sleeper (2x1):</b> Upper and lower sleeping berths for overnight journeys connecting Saurashtra, Kutch, and South Gujarat.</li>
    <li><b>AC Sleeper &amp; Volvo / Scania:</b> Air-conditioned executive coaches featuring smooth air suspension, reading lights, charging ports, and quiet cabins for long-distance highway travel.</li>
    <li><b>Metro Link / Electric e-Bus:</b> Rapid city-to-city air-conditioned shuttles designed for point-to-point urban corridors.</li>
  </ul>

  <h2 class="reveal">Track any bus category live</h2>
  <p class="reveal">Regardless of bus class, 100% of operational GSRTC vehicles report real-time GPS telemetry. Use <a href="${APP}">ST Tracker</a> to filter departures by category and follow your bus live on the interactive map.</p>`,
    faq: [
      { q: 'What is the difference between Express and Gurjarnagri buses in GSRTC?', a: 'Express buses feature standard 3x2 seating with more intermediate halts, whereas Gurjarnagri buses offer superior 2x2 pushback cushioned seating, more legroom, and faster point-to-point travel.' },
      { q: 'Are all GSRTC bus categories tracked on ST Tracker?', a: 'Yes! ST Tracker supports live tracking for all operational GSRTC categories including Local, Express, Gurjarnagri, Sleeper, and Volvo buses.' },
      { q: 'Does Gurjarnagri bus have air conditioning?', a: 'Standard Gurjarnagri buses are non-AC 2x2 express coaches. For air-conditioned travel, look for AC Sleeper, Volvo, or Electric e-Bus services.' },
    ],
    related: [
      { href: '/gsrtc-volvo-sleeper-ac-bus-tracking', label: 'GSRTC Volvo, AC & Sleeper bus live tracking' },
      { href: '/gsrtc-bus-fare-ticket-price', label: 'GSRTC bus fare calculator and ticket price chart' },
      { href: '/gsrtc-bus-fleet', label: 'How big is the GSRTC bus fleet?' },
    ],
  },
];

/**
 * City hub pages — maps verified destinations per regional hub.
 *
 * Declared above ROUTE_PAIRS because a route page has to know whether its endpoints have a
 * hub page before it can link to one: only the keys here become /<city>-st-bus-tracker, and
 * a route page that linked to one of the others shipped a hard 404.
 */
const CITY_ROUTES = {
  ahmedabad: [CITY.vadodara, CITY.surat, CITY.rajkot, CITY.gandhinagar, CITY.bhavnagar, CITY.mehsana, CITY.bhuj, CITY.anand, CITY.somnath, CITY.dwarka, CITY.palanpur, CITY.ambaji, CITY.junagadh, CITY.jamnagar, CITY.surendranagar, CITY.nadiad, CITY.morbi],
  surat: [CITY.ahmedabad, CITY.vadodara, CITY.vapi, CITY.navsari, CITY.bharuch, CITY.bhavnagar, CITY.rajkot, CITY.amreli],
  vadodara: [CITY.ahmedabad, CITY.surat, CITY.anand, CITY.bharuch, CITY.godhra],
  rajkot: [CITY.ahmedabad, CITY.surat, CITY.morbi, CITY.tankara, CITY.jamnagar, CITY.junagadh, CITY.dwarka, CITY.somnath, CITY.porbandar, CITY.bhavnagar, CITY.diu],
  bhavnagar: [CITY.ahmedabad, CITY.surat, CITY.rajkot, CITY.amreli],
  jamnagar: [CITY.rajkot, CITY.dwarka, CITY.ahmedabad],
  gandhinagar: [CITY.ahmedabad, CITY.mehsana],
  junagadh: [CITY.rajkot, CITY.somnath, CITY.ahmedabad],
  bhuj: [CITY.ahmedabad, CITY.rajkot, CITY.mandvi],
  morbi: [CITY.rajkot, CITY.ahmedabad],
  mehsana: [CITY.ahmedabad, CITY.palanpur],
  vapi: [CITY.surat, CITY.valsad],
  valsad: [CITY.vapi, CITY.surat, CITY.khergam],
  navsari: [CITY.surat],
  anand: [CITY.ahmedabad, CITY.vadodara],
  nadiad: [CITY.ahmedabad, CITY.anand],
  bharuch: [CITY.vadodara, CITY.surat],
  porbandar: [CITY.rajkot],
  somnath: [CITY.rajkot, CITY.ahmedabad, CITY.dwarka, CITY.junagadh],
  dwarka: [CITY.rajkot, CITY.ahmedabad, CITY.somnath, CITY.jamnagar],
  palanpur: [CITY.ahmedabad, CITY.mehsana, CITY.ambaji],
  godhra: [CITY.vadodara],
  surendranagar: [CITY.ahmedabad, CITY.rajkot],
  amreli: [CITY.bhavnagar, CITY.rajkot, CITY.surat],
  ambaji: [CITY.ahmedabad, CITY.palanpur],
  diu: [CITY.rajkot],
};

/** The cities that actually get a hub page — a link to any other one is a 404. */
const CITY_HUBS = new Set(Object.keys(CITY_ROUTES).map((k) => CITY[k].name));

/** Verified corridor distances, typical journey durations, and primary highways */
const ROUTE_FACTS = {
  'somnath-dwarka-bus': { dist: '230 km', time: '4h 30m – 5h 30m', highway: 'NH 51 Coastal Highway' },
  'jamnagar-dwarka-bus': { dist: '130 km', time: '2h 45m – 3h 15m', highway: 'SH 26 / NH 947' },
  'junagadh-somnath-bus': { dist: '85 km', time: '2h 00m – 2h 30m', highway: 'NH 151' },
  'palanpur-ambaji-bus': { dist: '50 km', time: '1h 15m – 1h 30m', highway: 'SH 56' },
  'ahmedabad-surendranagar-bus': { dist: '125 km', time: '2h 30m – 3h 00m', highway: 'Viramgam Highway / SH 17' },
  'ahmedabad-nadiad-bus': { dist: '55 km', time: '1h 00m – 1h 20m', highway: 'NE 1 / NH 48' },
  'surat-rajkot-bus': { dist: '420 km', time: '8h 30m – 9h 30m', highway: 'NH 48 & NH 47' },
  'ahmedabad-junagadh-bus': { dist: '315 km', time: '6h 30m – 7h 30m', highway: 'NH 47 & NH 151' },
  'ahmedabad-jamnagar-bus': { dist: '305 km', time: '6h 00m – 7h 00m', highway: 'NH 47 & SH 26' },
  'surat-amreli-bus': { dist: '370 km', time: '7h 30m – 8h 30m', highway: 'NH 48 & SH 36' },
  'ahmedabad-vadodara-bus': { dist: '110 km', time: '1h 45m – 2h 15m', highway: 'National Expressway 1 (NE 1)' },
  'vadodara-surat-bus': { dist: '140 km', time: '2h 30m – 3h 15m', highway: 'NH 48' },
  'ahmedabad-surat-bus': { dist: '265 km', time: '4h 45m – 5h 30m', highway: 'NE 1 & NH 48' },
  'ahmedabad-rajkot-bus': { dist: '215 km', time: '4h 00m – 4h 45m', highway: 'NH 47' },
  'rajkot-morbi-bus': { dist: '65 km', time: '1h 15m – 1h 30m', highway: 'SH 24 / NH 27' },
  'ahmedabad-gandhinagar-bus': { dist: '30 km', time: '45m – 1h 00m', highway: 'SG Highway / Gandhinagar Corridor' },
  'ahmedabad-bhavnagar-bus': { dist: '195 km', time: '4h 00m – 4h 30m', highway: 'SH 36 / NH 51' },
  'ahmedabad-mehsana-bus': { dist: '75 km', time: '1h 30m – 2h 00m', highway: 'SH 41 State Highway' },
  'ahmedabad-anand-bus': { dist: '75 km', time: '1h 30m – 1h 45m', highway: 'NE 1 / NH 48' },
  'ahmedabad-somnath-bus': { dist: '410 km', time: '8h 00m – 9h 30m', highway: 'NH 47 & NH 151' },
  'ahmedabad-dwarka-bus': { dist: '440 km', time: '8h 30m – 10h 00m', highway: 'NH 47 & NH 947' },
  'ahmedabad-palanpur-bus': { dist: '145 km', time: '3h 00m – 3h 45m', highway: 'SH 41 / NH 27' },
  'ahmedabad-bhuj-bus': { dist: '335 km', time: '6h 30m – 8h 00m', highway: 'NH 947' },
  'ahmedabad-ambaji-bus': { dist: '185 km', time: '4h 00m – 4h 45m', highway: 'SH 41 & SH 56' },
  'surat-bhavnagar-bus': { dist: '350 km', time: '7h 00m – 8h 30m', highway: 'NH 48 & SH 36' },
  'surat-vapi-bus': { dist: '115 km', time: '2h 00m – 2h 30m', highway: 'NH 48 South Gujarat Corridor' },
  'surat-navsari-bus': { dist: '35 km', time: '45m – 1h 00m', highway: 'NH 48' },
  'surat-bharuch-bus': { dist: '70 km', time: '1h 15m – 1h 45m', highway: 'NH 48' },
  'rajkot-jamnagar-bus': { dist: '90 km', time: '1h 45m – 2h 15m', highway: 'SH 26' },
  'rajkot-junagadh-bus': { dist: '105 km', time: '2h 00m – 2h 30m', highway: 'NH 151' },
  'rajkot-dwarka-bus': { dist: '225 km', time: '4h 30m – 5h 30m', highway: 'SH 26 & NH 947' },
  'rajkot-somnath-bus': { dist: '195 km', time: '4h 00m – 4h 45m', highway: 'NH 151' },
  'rajkot-porbandar-bus': { dist: '180 km', time: '3h 45m – 4h 30m', highway: 'NH 27' },
  'rajkot-bhavnagar-bus': { dist: '175 km', time: '3h 45m – 4h 30m', highway: 'SH 25' },
  'vadodara-anand-bus': { dist: '45 km', time: '50m – 1h 10m', highway: 'NH 48' },
  'vadodara-bharuch-bus': { dist: '75 km', time: '1h 20m – 1h 45m', highway: 'NH 48' },
  'vadodara-godhra-bus': { dist: '80 km', time: '1h 45m – 2h 15m', highway: 'SH 5' },
  'bhavnagar-amreli-bus': { dist: '115 km', time: '2h 30m – 3h 15m', highway: 'SH 31' },
  'rajkot-diu-bus': { dist: '235 km', time: '5h 00m – 6h 00m', highway: 'NH 151 & SH 37 via Una' },
  'valsad-vapi-bus': { dist: '30 km', time: '35m – 45m', highway: 'NH 48' },
  'valsad-khergam-bus': { dist: '30 km', time: '45m – 1h 00m', highway: 'SH 186' },
  'ahmedabad-morbi-bus': { dist: '190 km', time: '3h 45m – 4h 30m', highway: 'NH 47 & NH 27' },
  'bhuj-mandvi-bus': { dist: '60 km', time: '1h 15m – 1h 30m', highway: 'SH 47' },
  'rajkot-tankara-bus': { dist: '45 km', time: '50m – 1h 10m', highway: 'SH 24' },
};

/** Route pairs — every link uses a verified station ID from GSRTC seed data */
const ROUTE_PAIRS = [
  // High Traffic Golden Corridors & Pilgrimage Circuits
  {
    slug: 'somnath-dwarka-bus', a: CITY.somnath, b: CITY.dwarka,
    crumbLabel: 'Somnath ↔ Dwarka ST bus',
    extra: `<p class="reveal">Gujarat’s premier Saurashtra pilgrimage coastal corridor connecting the First Jyotirlinga (Somnath Mandir) with Lord Krishna’s Kingdom (Dwarka Jagat Mandir) along National Highway 51 via Porbandar.</p>`,
  },
  {
    slug: 'jamnagar-dwarka-bus', a: CITY.jamnagar, b: CITY.dwarka,
    crumbLabel: 'Jamnagar ↔ Dwarka ST bus',
    extra: `<p class="reveal">High-frequency 130 km feeder corridor linking Jamnagar railway junction with Dwarka, Okha port, and Beyt Dwarka, with buses running every 30 to 45 minutes.</p>`,
  },
  {
    slug: 'junagadh-somnath-bus', a: CITY.junagadh, b: CITY.somnath,
    crumbLabel: 'Junagadh ↔ Somnath ST bus',
    extra: `<p class="reveal">Vital 85 km tourist and local corridor connecting the historic foot of Mount Girnar and Gir Forest gateway with Veraval port and Somnath temple.</p>`,
  },
  {
    slug: 'palanpur-ambaji-bus', a: CITY.palanpur, b: CITY.ambaji,
    crumbLabel: 'Palanpur ↔ Ambaji ST bus',
    extra: `<p class="reveal">North Gujarat’s major Shaktipeeth pilgrim route connecting the Banaskantha railhead at Palanpur with the holy shrine of Goddess Amba in the Aravalli hills.</p>`,
  },
  {
    slug: 'ahmedabad-surendranagar-bus', a: CITY.ahmedabad, b: CITY.surendranagar,
    crumbLabel: 'Ahmedabad ↔ Surendranagar ST bus',
    extra: `<p class="reveal">Industrial and trade artery linking Gujarat’s commercial capital with the ceramic, salt, and cotton hub of Surendranagar and Wadhwan via Viramgam highway.</p>`,
  },
  {
    slug: 'ahmedabad-nadiad-bus', a: CITY.ahmedabad, b: CITY.nadiad,
    crumbLabel: 'Ahmedabad ↔ Nadiad ST bus',
    extra: `<p class="reveal">Bustling Central Gujarat commuter link on NH 48 with nonstop Point-to-Point and Express ST services running continuously between Geeta Mandir and Nadiad bus stand.</p>`,
  },
  {
    slug: 'surat-rajkot-bus', a: CITY.surat, b: CITY.rajkot,
    crumbLabel: 'Surat ↔ Rajkot ST bus',
    extra: `<p class="reveal">The vital Saurashtra–South Gujarat passenger corridor: frequent overnight AC Sleepers, Gurjarnagri 2x2, and day express services connecting Surat Central and Rajkot Central Bus Port.</p>`,
  },
  {
    slug: 'ahmedabad-junagadh-bus', a: CITY.ahmedabad, b: CITY.junagadh,
    crumbLabel: 'Ahmedabad ↔ Junagadh ST bus',
    extra: `<p class="reveal">High-frequency pilgrimage and transit link connecting Ahmedabad Geeta Mandir with Junagadh at the base of Mount Girnar.</p>`,
  },
  {
    slug: 'ahmedabad-jamnagar-bus', a: CITY.ahmedabad, b: CITY.jamnagar,
    crumbLabel: 'Ahmedabad ↔ Jamnagar ST bus',
    extra: `<p class="reveal">Connecting Gujarat’s commercial capital with the Brass City and Reliance refinery hub of Jamnagar via Rajkot bypass.</p>`,
  },
  {
    slug: 'surat-amreli-bus', a: CITY.surat, b: CITY.amreli,
    crumbLabel: 'Surat ↔ Amreli ST bus',
    extra: `<p class="reveal">Direct high-demand Saurashtra corridor with daily night sleeper and express buses linking Amreli district directly with Surat textile and diamond hubs.</p>`,
  },
  {
    slug: 'ahmedabad-vadodara-bus', a: CITY.ahmedabad, b: CITY.vadodara,
    crumbLabel: 'Ahmedabad ↔ Vadodara ST bus',
    extra: `<p class="reveal">The Ahmedabad–Vadodara expressway corridor is Gujarat’s busiest passenger route, with GSRTC Express and AC Volvo buses departing every 10 to 15 minutes between Geeta Mandir / Ranip and Baroda Central Bus Port.</p>`,
  },
  {
    slug: 'vadodara-surat-bus', a: CITY.vadodara, b: CITY.surat,
    crumbLabel: 'Vadodara ↔ Surat ST bus',
    extra: `<p class="reveal">Connecting Central and South Gujarat, this corridor features high-frequency Superfast, Gurjarnagri, and AC services running through Bharuch and Ankleshwar.</p>`,
  },
  {
    slug: 'ahmedabad-surat-bus', a: CITY.ahmedabad, b: CITY.surat,
    crumbLabel: 'Ahmedabad ↔ Surat ST bus',
  },
  {
    slug: 'ahmedabad-rajkot-bus', a: CITY.ahmedabad, b: CITY.rajkot,
    crumbLabel: 'Ahmedabad ↔ Rajkot ST bus',
  },
  {
    slug: 'rajkot-morbi-bus', a: CITY.rajkot, b: CITY.morbi,
    crumbLabel: 'Rajkot ↔ Morbi ST bus',
    extra: `<p class="reveal">This is one of the corridors ST Tracker watches especially closely: buses running it are added to the live tracker automatically as soon as they're found in the day's timetable, with crowd and arrival records updated continuously.</p>`,
  },
  {
    slug: 'ahmedabad-gandhinagar-bus', a: CITY.ahmedabad, b: CITY.gandhinagar,
    crumbLabel: 'Ahmedabad ↔ Gandhinagar ST bus',
    extra: `<p class="reveal">Twin-city government and commuter shuttle corridor with continuous Point-to-Point and Express ST services linking Ranip, ISKCON, and Gandhinagar Sector 11/21 depots.</p>`,
  },
  {
    slug: 'ahmedabad-bhavnagar-bus', a: CITY.ahmedabad, b: CITY.bhavnagar,
    crumbLabel: 'Ahmedabad ↔ Bhavnagar ST bus',
  },
  {
    slug: 'ahmedabad-mehsana-bus', a: CITY.ahmedabad, b: CITY.mehsana,
    crumbLabel: 'Ahmedabad ↔ Mehsana ST bus',
  },
  {
    slug: 'ahmedabad-anand-bus', a: CITY.ahmedabad, b: CITY.anand,
    crumbLabel: 'Ahmedabad ↔ Anand ST bus',
  },
  {
    slug: 'ahmedabad-somnath-bus', a: CITY.ahmedabad, b: CITY.somnath,
    crumbLabel: 'Ahmedabad ↔ Somnath ST bus',
  },
  {
    slug: 'ahmedabad-dwarka-bus', a: CITY.ahmedabad, b: CITY.dwarka,
    crumbLabel: 'Ahmedabad ↔ Dwarka ST bus',
  },
  {
    slug: 'ahmedabad-palanpur-bus', a: CITY.ahmedabad, b: CITY.palanpur,
    crumbLabel: 'Ahmedabad ↔ Palanpur ST bus',
  },
  {
    slug: 'ahmedabad-bhuj-bus', a: CITY.ahmedabad, b: CITY.bhuj,
    crumbLabel: 'Ahmedabad ↔ Bhuj ST bus',
  },
  {
    slug: 'ahmedabad-ambaji-bus', a: CITY.ahmedabad, b: CITY.ambaji,
    crumbLabel: 'Ahmedabad ↔ Ambaji ST bus',
  },
  {
    slug: 'surat-bhavnagar-bus', a: CITY.surat, b: CITY.bhavnagar,
    crumbLabel: 'Surat ↔ Bhavnagar ST bus',
  },
  {
    slug: 'surat-vapi-bus', a: CITY.surat, b: CITY.vapi,
    crumbLabel: 'Surat ↔ Vapi ST bus',
  },
  {
    slug: 'surat-navsari-bus', a: CITY.surat, b: CITY.navsari,
    crumbLabel: 'Surat ↔ Navsari ST bus',
  },
  {
    slug: 'surat-bharuch-bus', a: CITY.surat, b: CITY.bharuch,
    crumbLabel: 'Surat ↔ Bharuch ST bus',
  },
  {
    slug: 'rajkot-jamnagar-bus', a: CITY.rajkot, b: CITY.jamnagar,
    crumbLabel: 'Rajkot ↔ Jamnagar ST bus',
  },
  {
    slug: 'rajkot-junagadh-bus', a: CITY.rajkot, b: CITY.junagadh,
    crumbLabel: 'Rajkot ↔ Junagadh ST bus',
  },
  {
    slug: 'rajkot-dwarka-bus', a: CITY.rajkot, b: CITY.dwarka,
    crumbLabel: 'Rajkot ↔ Dwarka ST bus',
  },
  {
    slug: 'rajkot-somnath-bus', a: CITY.rajkot, b: CITY.somnath,
    crumbLabel: 'Rajkot ↔ Somnath ST bus',
  },
  {
    slug: 'rajkot-porbandar-bus', a: CITY.rajkot, b: CITY.porbandar,
    crumbLabel: 'Rajkot ↔ Porbandar ST bus',
  },
  {
    slug: 'rajkot-bhavnagar-bus', a: CITY.rajkot, b: CITY.bhavnagar,
    crumbLabel: 'Rajkot ↔ Bhavnagar ST bus',
  },
  {
    slug: 'vadodara-anand-bus', a: CITY.vadodara, b: CITY.anand,
    crumbLabel: 'Vadodara ↔ Anand ST bus',
  },
  {
    slug: 'vadodara-bharuch-bus', a: CITY.vadodara, b: CITY.bharuch,
    crumbLabel: 'Vadodara ↔ Bharuch ST bus',
  },
  {
    slug: 'vadodara-godhra-bus', a: CITY.vadodara, b: CITY.godhra,
    crumbLabel: 'Vadodara ↔ Godhra ST bus',
  },
  {
    slug: 'bhavnagar-amreli-bus', a: CITY.bhavnagar, b: CITY.amreli,
    crumbLabel: 'Bhavnagar ↔ Amreli ST bus',
  },
  // Diu: coastal Union Territory, reached by GSRTC via Una. Kevadia (the Statue of Unity) was
  // tried here too — real tourist search volume, and a verified station id (2515, "Statue of
  // Unity (Navagam)") — but every from/to combination the operator's own live search offers
  // (both station-name variants it returns, from Ahmedabad, Vadodara and Surat, today and
  // tomorrow) came back "No buses found". Kevadia's ST service, if it runs at all, is not
  // registered in GetSourceDestinationWiseBusList_V1 the way every other page's is, so shipping
  // it here would put a page's whole reason to exist — the "track this route" button — in front
  // of a rider with nothing behind it. Don't re-add it without first confirming a real trip
  // resolves in the app itself, the way the Diu pair below was checked before being kept.
  {
    slug: 'rajkot-diu-bus', a: CITY.rajkot, b: CITY.diu,
    crumbLabel: 'Rajkot ↔ Diu ST bus',
  },
  /*
   * Added from demand the app itself measured, not from a keyword tool.
   *
   * `timetable_searches` records every route a rider actually asked for and how many buses came
   * back, so a gap here is a query people are already making that this site had no page for —
   * and the same row proves the operator has services on it, which is the check the Kevadia note
   * above exists to enforce. Searches / most buses seen, over the eleven days to 3 September:
   *
   *   Valsad ↔ Vapi        92 searches, up to 74 buses   — the largest uncovered corridor
   *   Valsad ↔ Khergam     44 searches, up to 41 buses
   *   Ahmedabad ↔ Morbi    24 searches, up to 23 buses   — Morbi is the 3rd most searched city
   *   Bhuj ↔ Mandvi        20 searches, up to 44 buses
   *   Rajkot ↔ Tankara     15 searches, up to 80 buses
   *
   * Two others cleared the search threshold and were deliberately left out: Ahmedabad → Mendarda
   * (2 buses at best) and Chitrod → Mehsana (1). A corridor with one bus on it does not deserve
   * a page promising a timetable.
   */
  {
    slug: 'valsad-vapi-bus', a: CITY.valsad, b: CITY.vapi,
    crumbLabel: 'Valsad ↔ Vapi ST bus',
  },
  {
    slug: 'valsad-khergam-bus', a: CITY.valsad, b: CITY.khergam,
    crumbLabel: 'Valsad ↔ Khergam ST bus',
  },
  {
    slug: 'ahmedabad-morbi-bus', a: CITY.ahmedabad, b: CITY.morbi,
    crumbLabel: 'Ahmedabad ↔ Morbi ST bus',
  },
  {
    slug: 'bhuj-mandvi-bus', a: CITY.bhuj, b: CITY.mandvi,
    crumbLabel: 'Bhuj ↔ Mandvi ST bus',
  },
  {
    slug: 'rajkot-tankara-bus', a: CITY.rajkot, b: CITY.tankara,
    crumbLabel: 'Rajkot ↔ Tankara ST bus',
  },
].map(({ slug, a, b, crumbLabel, extra }) => {
  const facts = ROUTE_FACTS[slug] || { dist: '100+ km', time: '2 to 3 hours', highway: 'Gujarat State Highway' };
  return {
    slug,
    // Max 56 characters across all pairs (keeps under 60 chars limit)
    title: `${a.name} to ${b.name} GSRTC Bus Timetable & Tracking`,
    description: `GSRTC bus timetable, ticket fare, schedule and live tracking between ${a.name} and ${b.name} (${facts.dist}, ${facts.time}). Check running ST buses now.`,
    crumbLabel,
    h1: `${a.name} ↔ ${b.name} ST bus timetable & live tracking`,
    lede: `Travelling between ${a.name} and ${b.name}? See every scheduled and running GSRTC service on this corridor, ticket fare estimates, and live countdowns in either direction.`,
    body: `
  <h2 class="reveal">Track this route now</h2>
  <p class="reveal">
    <a class="btn primary" href="${routeUrl(a, b)}">${a.name} → ${b.name}</a>
    &nbsp;
    <a class="btn" href="${routeUrl(b, a)}">${b.name} → ${a.name}</a>
  </p>
  <p class="reveal">Either link opens the live departure list for that direction — running buses show a live countdown, and the rest show their scheduled time. Pick any one to open its live map.</p>
  ${extra || ''}
  <h2 class="reveal">Route specifications and transit overview</h2>
  <div class="table-wrap google-anno-skip">
  <table class="reveal route-facts">
    <tr><th>Route Corridor</th><td>${a.name} ↔ ${b.name}</td></tr>
    <tr><th>Corridor Distance</th><td>${facts.dist}</td></tr>
    <tr><th>Typical Journey Duration</th><td>${facts.time}</td></tr>
    <tr><th>Primary Highway Corridor</th><td>${facts.highway}</td></tr>
    <tr><th>Daily Service Frequency</th><td>Departures every 20 to 45 minutes · First bus ~05:00 AM · Last bus ~23:30 PM</td></tr>
    <tr><th>Estimated Ticket Fare</th><td>Ordinary ~₹0.80/km · Express ~₹0.95/km · Gurjarnagri ~₹1.05/km · Sleeper ~₹1.25/km</td></tr>
    <tr><th>Operating Bus Classes</th><td>Express (3x2), Gurjarnagri (2x2 pushback), Sleeper, AC Volvo</td></tr>
    <tr><th>Live GPS Telematics</th><td>AIS-140 tracking refreshed every ~20s</td></tr>
  </table>
  </div>
  <h2 class="reveal">Don't have a plate number yet</h2>
  <p class="reveal">You don't need one — the links above search by station, and you pick the actual bus from the list once you can see which ones are running. See <a href="/gsrtc-bus-timetable">the full timetable guide</a> for how filtering and sorting the list works.</p>`,
    // Only the endpoints that have a hub page. This used to link both unconditionally, which sent
    // three route pages at a /<city>-st-bus-tracker that is never generated — the small endpoints
    // are deliberately absent from CITY_ROUTES (see the note by CITY), so those were hard 404s.
    related: [
      ...[a, b]
        .filter((c) => CITY_HUBS.has(c.name))
        .map((c) => ({
          href: `/${c.name.toLowerCase()}-st-bus-tracker`,
          label: `${c.name} ST bus tracker`,
        })),
      { href: '/gsrtc-bus-timetable', label: 'GSRTC bus timetable between any two stations' },
      { href: '/gsrtc-bus-fare-ticket-price', label: 'Official GSRTC bus ticket price chart and fare calculator' },
    ],
    faq: [
      {
        q: `What is the GSRTC bus ticket fare from ${a.name} to ${b.name}?`,
        a: `GSRTC bus fares between ${a.name} and ${b.name} depend on service category across the ${facts.dist} corridor: Ordinary/Local is roughly ₹0.80 per km, Express is approximately ₹0.95 per km, and Gurjarnagri 2x2 is about ₹1.05 per km. Exact ticket prices and advance reservations are accessible via ST Tracker and the official booking portal.`,
      },
      {
        q: `What is the first and last GSRTC bus timing from ${a.name} to ${b.name}?`,
        a: `First GSRTC departures on the ${a.name} to ${b.name} route start around 05:00 AM to 06:00 AM, with frequent services operating throughout the day until the last evening/night bus between 23:00 PM and 23:30 PM. Use ST Tracker for real-time departure countdowns today.`,
      },
      {
        q: `Are there GSRTC buses from ${a.name} to ${b.name} every day?`,
        a: `Yes, GSRTC operates frequent daily scheduled services between ${a.name} and ${b.name}. Use the live tracking buttons above to view real-time departures, live delay indicators, and upcoming trips.`,
      },
      {
        q: `How long does a GSRTC bus take from ${a.name} to ${b.name}?`,
        a: `A GSRTC bus takes approximately ${facts.time} to cover the ${facts.dist} distance between ${a.name} and ${b.name} via ${facts.highway}, depending on service classification and road traffic.`,
      },
      {
        q: `What types of GSRTC buses operate between ${a.name} and ${b.name}?`,
        a: `GSRTC operates multiple bus classes on this route including Express (3x2), Gurjarnagri (2x2 pushback), and long-distance Sleeper / AC coaches where scheduled. Commuters can filter departures by category on ST Tracker.`,
      },
      {
        q: `Where do GSRTC buses depart from in ${a.name} and ${b.name}?`,
        a: `Services depart from the central bus station and divisional depots in each city (such as ${a.name} Central and ${b.name} Bus Stand). Check ST Tracker for exact platform information and live bus arrival positions.`,
      },
      {
        q: `Can I track an ST bus on the ${a.name} to ${b.name} route without a plate number?`,
        a: `Yes. Tap the route search buttons above to query by station pair. ST Tracker displays every active bus on the corridor with live countdowns, delay alerts, and interactive map tracking.`,
      },
    ],
  };
});

/** Name back to key, so a CITY object can be turned into the key its route slug is built from. */
const CITY_KEY = Object.fromEntries(Object.entries(CITY).map(([k, v]) => [v.name, k]));
const ROUTE_SLUGS = new Set(ROUTE_PAIRS.map((p) => p.slug));

/** Verified depot enquiry phone directory per city hub */
const DEPOT_CONTACTS = {
  ahmedabad: '079-25463396 / 079-25463409 (Geeta Mandir) & 079-27552222 (Ranip)',
  surat: '0261-2424037 / 0261-2424038 (Surat Central Bus Station)',
  vadodara: '0265-2429646 / 0265-2429647 (Vadodara Central Bus Station)',
  rajkot: '0281-2223847 / 0281-2223848 (Rajkot Central Bus Port)',
  bhavnagar: '0278-2516701 (Bhavnagar Bus Port)',
  jamnagar: '0288-2550260 (Jamnagar ST Depot)',
  gandhinagar: '079-23222842 (Gandhinagar Depot)',
  junagadh: '0285-2630303 (Junagadh Bus Stand)',
  bhuj: '02832-220002 (Bhuj ST Depot)',
  morbi: '02822-230550 (Morbi ST Bus Stand)',
  mehsana: '02762-252122 (Mehsana Bus Port)',
  vapi: '0260-2462344 (Vapi ST Depot)',
  valsad: '02632-253344 (Valsad ST Depot)',
  khergam: '02632-253344 (Valsad Division Control Room)',
  mandvi: '02834-222222 (Mandvi ST Depot)',
  tankara: '02822-230550 (Morbi Division Control Room)',
  navsari: '02637-258044 (Navsari ST Depot)',
  anand: '02692-251450 (Anand Central Bus Station)',
  nadiad: '0268-2562544 (Nadiad ST Depot)',
  bharuch: '02642-260344 (Bharuch ST Depot)',
  porbandar: '0286-2241666 (Porbandar ST Bus Stand)',
  somnath: '02876-220140 (Somnath / Veraval Depot)',
  veraval: '02876-220140 (Veraval Depot)',
  dwarka: '02892-234242 (Dwarka ST Depot)',
  palanpur: '02742-252224 (Palanpur ST Depot)',
  godhra: '02672-242444 (Godhra ST Depot)',
  surendranagar: '02752-220264 (Surendranagar ST Depot)',
  amreli: '02792-222222 (Amreli ST Depot)',
  ambaji: '02749-262134 (Ambaji Bus Stand)',
  diu: '02875-252110 (Diu Bus Stand)',
};

/**
 * The route page covering this pair, if one exists — checked in both directions, because a
 * route page deliberately covers a corridor rather than one direction of it.
 */
function routePageSlug(a, b) {
  const ak = CITY_KEY[a.name];
  const bk = CITY_KEY[b.name];
  return [`${ak}-${bk}-bus`, `${bk}-${ak}-bus`].find((s) => ROUTE_SLUGS.has(s)) ?? null;
}

const CITY_PAGES = Object.entries(CITY_ROUTES).map(([key, destinations]) => {
  const city = CITY[key];
  const depotPhone = DEPOT_CONTACTS[key] || '1800 233 6666 (Central Helpline)';
  const routeLinks = destinations.map((d) => {
    const slug = routePageSlug(city, d);
    const href = slug ? `/${slug}` : routeUrl(city, d);
    return `<li><a href="${href}">${city.name} → ${d.name}</a></li>`;
  }).join('\n      ');
  return {
    slug: `${key}-st-bus-tracker`,
    title: `${city.name} ST Bus Tracker — Timetable, Depot Phone & Map`,
    description: `Track GSRTC ST buses in ${city.name} live on a map. View departure timetables, depot contact (${depotPhone.split(' ')[0]}), route schedules & delay status.`,
    crumbLabel: `${city.name} ST bus tracker`,
    h1: `${city.name} ST bus tracker & timetable`,
    lede: `Track any GSRTC bus running to or from ${city.name}, live — by plate, route schedule, or direct depot departure countdowns.`,
    body: `
  <h2 class="reveal">Popular routes from ${city.name}</h2>
  <ul class="reveal">
      ${routeLinks}
  </ul>
  <p class="reveal">Each link opens the live departure list for that route — running buses show a countdown, the rest show their scheduled time. Don't see your route? Search any station pair directly in the app.</p>

  <h2 class="reveal">${city.name} Bus Stand Enquiry &amp; Depot Phone</h2>
  <p class="reveal">Official GSRTC inquiry contact for ${city.name}: <b>${depotPhone}</b>. For state-wide transit assistance, call the central 24x7 toll-free helpline at <b>1800 233 6666</b>.</p>

  <h2 class="reveal">Track a specific bus by plate number</h2>
  <p class="reveal">If you already have the plate number of a bus headed to or from ${city.name}, enter it in the search bar above to go directly to its live GPS location map.</p>

  <h2 class="reveal">Finding a stand in ${city.name}</h2>
  <p class="reveal">Not sure which ${city.name} stop is closest to you right now? See <a href="/nearby-st-bus-stops">finding ST bus stops near you</a> for a map of stations around your current location, rather than searching by name.</p>`,
    related: [
      { href: '/gsrtc-bus-timetable', label: 'GSRTC bus timetable between any two stations' },
      { href: '/gsrtc-bus-stand-helpline-numbers', label: 'All Gujarat GSRTC bus stand enquiry numbers' },
      { href: '/nearby-st-bus-stops', label: 'Find ST bus stops near you' },
    ],
    faq: [
      {
        q: `What is the ${city.name} ST bus stand enquiry phone number?`,
        a: `The official enquiry telephone contact for ${city.name} bus station is ${depotPhone}. For real-time bus arrivals and delay countdowns on your phone without waiting on hold, use ST Tracker.`,
      },
      {
        q: `Can I track any GSRTC bus that passes through ${city.name}, or only ones starting there?`,
        a: `Any of them — search by plate for a specific bus, or by route for a full departure list, whether ${city.name} is the origin, the destination, or an intermediate stop along the route.`,
      },
      {
        q: `How do I search the GSRTC bus timetable for ${city.name}?`,
        a: `Select ${city.name} as your origin or destination station on ST Tracker to query complete schedules, departure countdowns, and delay statuses across all 19,026 covered Gujarat stations.`,
      },
      {
        q: `How do I find nearby ST bus stops in ${city.name}?`,
        a: `Tap the Nearby Stops radar on ST Tracker to locate bus depots and pick-up stands near your exact GPS coordinates in ${city.name}, with walking distances and departure countdowns.`,
      },
    ],
  };
});

export const PAGES = [...FEATURE_PAGES, ...ROUTE_PAIRS, ...CITY_PAGES];

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
  vadodara: { name: 'Vadodara', id: 15004, guj: 'વડોદરા' },
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
  <p class="reveal">Don't have the plate, or not sure you read it right? Search by the two stations you're travelling between instead — see <a href="gsrtc-bus-timetable.html">the timetable guide</a> — and pick the right departure from the list rather than typing a plate at all.</p>`,
    faq: [
      { q: 'What does GJ-18 mean on a GSRTC bus?', a: 'GJ is the Gujarat state code, and 18 is the RTO (registration) code for where the bus was first registered (e.g. Gandhinagar / Ahmedabad region). It does not indicate which route the bus currently runs.' },
      { q: 'Can I track a bus with only part of the plate?', a: 'No — tracking needs the full registration to match the operator’s records. If you only caught part of it, search by route instead and pick the bus from the departure list.' },
      { q: 'Does it matter if I type the plate with or without dashes?', a: 'No. ST Tracker normalises spacing and dashes automatically before searching, so GJ18ZT1028 and GJ-18-ZT-1028 both work.' },
    ],
    related: [
      { href: 'gsrtc-live-bus-tracking.html', label: 'How GSRTC live bus tracking works' },
      { href: 'gsrtc-bus-timetable.html', label: 'GSRTC bus timetable between any two stations' },
    ],
  },
  {
    slug: 'gsrtc-bus-fleet',
    title: 'GSRTC Fleet Size — How Many ST Buses Run in Gujarat',
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
  <p class="reveal">The fleet is organised into divisions, each covering a region of the state and made up of several depots — the base a given bus and its crew are assigned to. A bus's RTO code (see <a href="gsrtc-bus-number-plate-format.html">the plate format guide</a>) hints at where it was registered, which is often but not always its home depot.</p>`,
    faq: [
      { q: 'How many buses does GSRTC operate?', a: 'GSRTC’s fleet runs to 8,554 buses, covering 19,026 stations across Gujarat.' },
      { q: 'Are all 8,554 buses trackable at once?', a: 'No. Live tracking only shows a bus while it is actually on a scheduled trip. A bus at the depot or between shifts reports no position until it sets off again.' },
      { q: 'What is a GSRTC depot?', a: 'A depot is the base a bus and its crew are assigned to. Several depots make up a division, and divisions together cover the whole state.' },
    ],
    related: [
      { href: 'gsrtc-tracker.html', label: 'GSRTC tracker — what it is and how it compares' },
      { href: 'gsrtc-bus-number-plate-format.html', label: 'GSRTC bus number plate format explained' },
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
  <p class="reveal">Tap a nearby station to see its departures, or search a route from it directly — see <a href="gsrtc-bus-timetable.html">the timetable guide</a> for how the two-station search works.</p>`,
    faq: [
      { q: 'How does "stops near me" know my location?', a: 'It uses your browser or device’s location permission, asked for explicitly with an explanation first — it is never assumed or requested silently.' },
      { q: 'Does it work without an account?', a: 'Yes. There is no account anywhere in ST Tracker, for this or any other feature.' },
      { q: 'Can I find nearby stops without allowing location access?', a: 'Yes — search by station name instead from the home screen, which works identically without location permission.' },
    ],
    related: [
      { href: 'gsrtc-tracker.html', label: 'GSRTC tracker — what it is and how it compares' },
      { href: 'gsrtc-bus-timetable.html', label: 'GSRTC bus timetable between any two stations' },
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
      { href: 'gsrtc-live-bus-tracking.html', label: 'How GSRTC live bus tracking works' },
      { href: 'gsrtc-bus-arrival-alerts.html', label: 'Get an alert before your GSRTC bus arrives' },
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
      { href: 'gsrtc-bus-timetable.html', label: 'GSRTC bus timetable between any two stations' },
      { href: 'gsrtc-bus-delay-status.html', label: 'Is my GSRTC bus running late?' },
    ],
  },
  {
    slug: 'gsrtc-bus-arrival-alerts',
    title: 'GSRTC Bus Arrival Alerts — Get Notified Before It Arrives',
    description: 'How to set an arrival alert for your GSRTC bus so your phone tells you when it is close, instead of watching the map the whole time.',
    crumbLabel: 'GSRTC bus arrival alerts',
    h1: 'Get an alert before your GSRTC bus arrives',
    lede: 'Pick the stop you’re waiting at, and your phone tells you when the bus is close — no need to keep the map open.',
    body: `
  <h2 class="reveal">Setting one up</h2>
  <ol class="reveal">
    <li>Open a bus's live map, or a route's departure list.</li>
    <li>Pick the stop you're waiting at from the route.</li>
    <li>Turn on the alert. Your browser or phone will ask permission to send notifications the first time.</li>
  </ol>
  <p class="reveal">The alert fires shortly before the bus reaches that stop, based on its live position — not on the schedule, so it still works when the bus is running early or late.</p>

  <h2 class="reveal">On iPhone</h2>
  <p class="reveal">Safari can deliver notifications from a website, but only once it's been added to the home screen — open the app in Safari, tap Share, then Add to Home Screen, and set the alert from there.</p>`,
    faq: [
      { q: 'Do arrival alerts need an account?', a: 'No. There is no account anywhere in the app — the alert is tied to your browser’s notification permission, not an identity.' },
      { q: 'Why aren’t I getting alerts on iPhone?', a: 'iOS only allows web notifications for a site added to the home screen. Open the app in Safari, tap Share, then Add to Home Screen, and set the alert again from there.' },
      { q: 'Is the alert based on the schedule or the live position?', a: 'The live position, so it still fires at the right time whether the bus is early, on time, or late.' },
    ],
    related: [
      { href: 'gsrtc-bus-delay-status.html', label: 'Is my GSRTC bus running late?' },
      { href: 'st-bus-live-location.html', label: 'Find your ST bus’s live location, step by step' },
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
  <p class="reveal">Enter where you're travelling from and to — anywhere across the 19,026 stations the app covers, not just major cities. The result is every GSRTC service on that pair for the day: departure time, journey length, and service type.</p>

  <h2 class="reveal">Filtering and sorting</h2>
  <p class="reveal">Narrow the list by service type, and sort by departure time or journey length. Buses already on the road show a live countdown instead of just a scheduled time, so you can see which one is genuinely next rather than which one is listed first.</p>`,
    faq: [
      { q: 'Can I search between any two stations, or only major cities?', a: 'Any two of the 19,026 stations the app covers, including single-stop villages, not just major city terminals.' },
      { q: 'Does the timetable show live delays, or only the schedule?', a: 'Both — scheduled times for services yet to depart, and a live countdown for services already on the road.' },
      { q: 'Why does the list still show buses that already left?', a: 'In case you’re boarding further along the route than the origin — a bus that left ten minutes ago may still be minutes from your own stop.' },
    ],
    related: [
      { href: 'gsrtc-tracker.html', label: 'GSRTC tracker — what it is and how it compares' },
      { href: 'nearby-st-bus-stops.html', label: 'Find ST bus stops near you' },
    ],
  },
  {
    slug: 'gsrtc-tracking-app',
    title: 'GSRTC Live Tracking App — Is There One, and Which to Use',
    description: 'Whether GSRTC has a live tracking app, how it differs from the official booking app, and why ST Tracker needs no install to try.',
    crumbLabel: 'GSRTC tracking app',
    h1: 'Is there a GSRTC live tracking app?',
    lede: 'A few different things all get called "the GSRTC app." Here’s what each one is actually for.',
    body: `
  <h2 class="reveal">The official GSRTC app</h2>
  <p class="reveal">GSRTC's own app, from the app store, is the authoritative place for tickets, PNR status and reservations — that side of things isn't something ST Tracker tries to replace.</p>

  <h2 class="reveal">ST Tracker: live tracking, no install</h2>
  <p class="reveal">ST Tracker is an independent tool focused on one job: showing exactly where a bus is right now, fast. It's a website, not an app-store download — open <a href="${APP}">tracker.shivrajsinh.in</a> in any browser and it works immediately, on Android, iPhone, or a laptop.</p>
  <p class="reveal">It can still be added to your home screen afterwards, so it opens full-screen and starts instantly like an installed app.</p>`,
    faq: [
      { q: 'Do I need to install anything to track a GSRTC bus?', a: 'No. ST Tracker runs at tracker.shivrajsinh.in in any browser. Installing to your home screen is optional.' },
      { q: 'Is ST Tracker the official GSRTC app?', a: 'No — it’s an independent tool built for the specific job of live tracking. Ticket booking and PNR status stay with the official app.' },
      { q: 'Does ST Tracker work on iPhone?', a: 'Yes, in Safari. Add it to the home screen via Share → Add to Home Screen for arrival notifications.' },
    ],
    related: [
      { href: 'gsrtc-tracker.html', label: 'GSRTC tracker — what it is and how it compares' },
      { href: 'gsrtc-bus-arrival-alerts.html', label: 'Get an alert before your GSRTC bus arrives' },
    ],
  },
  {
    slug: 'gsrtc-online-booking-pnr-tracking',
    title: 'GSRTC Bus Tracking by PNR & Ticket Number',
    description: 'How to look up and track your booked GSRTC ST bus using your ticket PNR or booking reference without knowing the bus registration plate.',
    crumbLabel: 'GSRTC tracking by PNR',
    h1: 'Track your GSRTC bus using PNR / ticket number',
    lede: 'Booked online on GSRTC or redBus and wondering which bus is assigned to your trip? Here is how to find and track it live.',
    body: `
  <h2 class="reveal">How PNR lookup works</h2>
  <p class="reveal">When you reserve a seat online, your ticket contains a 10-digit or 12-digit PNR reference. While the physical bus number plate isn't printed on advance tickets, the trip number and scheduled route correspond to an active ST vehicle on trip day.</p>
  <p class="reveal">On <a href="${APP}">ST Tracker</a>, switch the search tab to <b>PNR</b> to pull up your trip details, assigned bus vehicle plate, and live GPS map coordinates immediately.</p>

  <h2 class="reveal">When is the bus assigned?</h2>
  <p class="reveal">GSRTC depots typically assign the specific vehicle number and crew about 1 to 2 hours before the scheduled departure time. If you check earlier, the system will confirm the scheduled timetable and activate live tracking as soon as the bus logs in at the origin depot.</p>`,
    faq: [
      { q: 'Can I track a bus with only a PNR number?', a: 'Yes! On ST Tracker, switch to the PNR tab and enter your ticket reference to locate your assigned bus.' },
      { q: 'Why is my PNR not showing a live location yet?', a: 'Depots assign the physical bus 1–2 hours before scheduled departure. Live GPS activates once the bus is flagged active on the road.' },
      { q: 'Does this work for tickets booked on redBus / AbhiBus?', a: 'Yes, as long as you use the GSRTC operator PNR printed on your ticket confirmation SMS or email.' },
    ],
    related: [
      { href: 'gsrtc-bus-timetable.html', label: 'GSRTC bus timetable between any two stations' },
      { href: 'gsrtc-bus-delay-status.html', label: 'Is my GSRTC bus running late?' },
    ],
  },
  {
    slug: 'gsrtc-volvo-sleeper-ac-bus-tracking',
    title: 'GSRTC Volvo, AC & Sleeper Bus Tracking Live | ST Tracker',
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

  <h2 class="reveal">Filtering by bus category</h2>
  <p class="reveal">When searching a timetable between any two cities on ST Tracker, use the quick service filters (Volvo, AC, Sleeper, Express) to isolate premium departures and monitor their real-time delay status.</p>`,
    faq: [
      { q: 'Are all GSRTC Volvo and AC buses GPS-tracked?', a: 'Yes, 100% of GSRTC premium Volvo, Sleeper, and Express fleet vehicles are equipped with live GPS transponders.' },
      { q: 'How do I filter for only AC or Sleeper buses?', a: 'Search any route on ST Tracker and tap the AC / Sleeper filter tag above the departures list.' },
    ],
    related: [
      { href: 'gsrtc-bus-timetable.html', label: 'GSRTC bus timetable between any two stations' },
      { href: 'st-bus-crowd-status.html', label: 'How full is my ST bus?' },
    ],
  },
  {
    slug: 'gsrtc-bus-stand-helpline-numbers',
    title: 'GSRTC Bus Stand Enquiry & Control Room Numbers | ST Tracker',
    description: 'Comprehensive directory of GSRTC bus stand enquiry numbers, central toll-free helpline, and division control rooms across Gujarat.',
    crumbLabel: 'GSRTC bus stand helplines',
    h1: 'GSRTC bus stand enquiry & helpline directory',
    lede: 'Need to contact a local Gujarat ST bus depot? Find official enquiry numbers, central customer care, and depot control rooms.',
    body: `
  <h2 class="reveal">GSRTC Central 24x7 Helpline</h2>
  <p class="reveal">GSRTC operates a centralized 24x7 toll-free helpline for passenger inquiries, grievance redressal, and emergency assistance: <b>1800 233 6666</b>.</p>

  <h2 class="reveal">Major Bus Station Enquiry Numbers</h2>
  <table class="reveal">
    <tr><th>Bus Station / Depot</th><th>Contact Number</th></tr>
    <tr><td>Ahmedabad Geeta Mandir Central</td><td>079-25463396 / 079-25463409</td></tr>
    <tr><td>Vadodara Central Bus Station</td><td>0265-2429646 / 0265-2429647</td></tr>
    <tr><td>Surat Central Bus Station</td><td>0261-2424037 / 0261-2424038</td></tr>
    <tr><td>Rajkot Central Bus Port</td><td>0281-2223847 / 0281-2223848</td></tr>
    <tr><td>Bhavnagar Bus Port</td><td>0278-2516701</td></tr>
    <tr><td>Jamnagar ST Depot</td><td>0288-2550260</td></tr>
    <tr><td>Junagadh Bus Stand</td><td>0285-2630303</td></tr>
    <tr><td>Bhuj ST Depot</td><td>02832-220002</td></tr>
  </table>
  <p class="reveal">Rather than waiting on phone hold, you can check live bus positions and actual departure countdowns instantly on <a href="${APP}">ST Tracker</a>.</p>`,
    faq: [
      { q: 'What is the toll-free number for GSRTC bus enquiry?', a: 'The GSRTC 24x7 passenger helpline is 1800 233 6666.' },
      { q: 'Can I check bus arrival times without calling the depot?', a: 'Yes! Type your bus plate or route on ST Tracker for immediate real-time GPS locations and countdowns.' },
    ],
    related: [
      { href: 'gsrtc-tracker.html', label: 'GSRTC tracker — what it is and how it compares' },
      { href: 'nearby-st-bus-stops.html', label: 'Find ST bus stops near you' },
    ],
  },
];

/** Route pairs — every link uses a verified station ID from GSRTC seed data */
const ROUTE_PAIRS = [
  // High Traffic Golden Corridors
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
].map(({ slug, a, b, crumbLabel, extra }) => ({
  slug,
  // 60 characters at the longest real pair (Ahmedabad ↔ Gandhinagar), which is the point:
  // past roughly that, Google truncates the title in the result and the reader never sees the
  // half that says what the page offers. The brand suffix was what pushed every one of these
  // over — Google appends the site name itself for long-tail pages anyway.
  //
  // "GSRTC" replaces "ST Bus" here deliberately. Every competing result for these city-pair
  // queries — abhibus, paytm, goibibo, gsrtchelp — leads with GSRTC, and the old title carried
  // the term nowhere at all. "ST bus" is still in the H1, the lede and the description.
  title: `${a.name} to ${b.name} GSRTC Bus Timetable & Live Tracking`,
  description: `Live GSRTC bus tracking and timetable between ${a.name} and ${b.name}, both directions. See running buses now, or search the full schedule.`,
  crumbLabel,
  h1: `${a.name} ↔ ${b.name} ST bus, live`,
  lede: `Travelling between ${a.name} and ${b.name}? See every scheduled and running GSRTC service on this route, in either direction.`,
  body: `
  <h2 class="reveal">Track this route now</h2>
  <p class="reveal">
    <a class="btn primary" href="${routeUrl(a, b)}">${a.name} → ${b.name}</a>
    &nbsp;
    <a class="btn" href="${routeUrl(b, a)}">${b.name} → ${a.name}</a>
  </p>
  <p class="reveal">Either link opens the live departure list for that direction — running buses show a live countdown, and the rest show their scheduled time. Pick any one to open its live map.</p>
  ${extra || ''}
  <h2 class="reveal">Don't have a plate number yet</h2>
  <p class="reveal">You don't need one — the links above search by station, and you pick the actual bus from the list once you can see which ones are running. See <a href="gsrtc-bus-timetable.html">the full timetable guide</a> for how filtering and sorting the list works.</p>`,
  related: [
    { href: `${a.name.toLowerCase()}-st-bus-tracker.html`, label: `${a.name} ST bus tracker` },
    { href: `${b.name.toLowerCase()}-st-bus-tracker.html`, label: `${b.name} ST bus tracker` },
    { href: 'gsrtc-bus-timetable.html', label: 'GSRTC bus timetable between any two stations' },
  ],
  faq: [
    { q: `Are there GSRTC buses from ${a.name} to ${b.name} every day?`, a: `Yes — this is a route GSRTC runs scheduled services on daily. Use the links above to see today’s actual departures rather than a fixed schedule.` },
    { q: 'Can I track a bus on this route without knowing its plate?', a: 'Yes. The links on this page search by station, and you pick the bus you want from the list of departures — no plate needed.' },
  ],
}));

/** City hub pages — maps verified destinations per regional hub */
const CITY_ROUTES = {
  ahmedabad: [CITY.vadodara, CITY.surat, CITY.rajkot, CITY.gandhinagar, CITY.bhavnagar, CITY.mehsana, CITY.bhuj, CITY.anand, CITY.somnath, CITY.dwarka, CITY.palanpur, CITY.ambaji],
  surat: [CITY.ahmedabad, CITY.vadodara, CITY.vapi, CITY.navsari, CITY.bharuch, CITY.bhavnagar],
  vadodara: [CITY.ahmedabad, CITY.surat, CITY.anand, CITY.bharuch, CITY.godhra],
  rajkot: [CITY.ahmedabad, CITY.morbi, CITY.jamnagar, CITY.junagadh, CITY.dwarka, CITY.somnath, CITY.porbandar, CITY.bhavnagar],
  bhavnagar: [CITY.ahmedabad, CITY.surat, CITY.rajkot, CITY.amreli],
  jamnagar: [CITY.rajkot, CITY.dwarka],
  gandhinagar: [CITY.ahmedabad, CITY.mehsana],
  junagadh: [CITY.rajkot, CITY.somnath],
  bhuj: [CITY.ahmedabad, CITY.rajkot],
  morbi: [CITY.rajkot, CITY.ahmedabad],
  mehsana: [CITY.ahmedabad, CITY.palanpur],
  vapi: [CITY.surat, CITY.valsad],
  valsad: [CITY.vapi, CITY.surat],
  navsari: [CITY.surat],
  anand: [CITY.ahmedabad, CITY.vadodara],
  nadiad: [CITY.ahmedabad, CITY.anand],
  bharuch: [CITY.vadodara, CITY.surat],
  porbandar: [CITY.rajkot],
  somnath: [CITY.rajkot, CITY.ahmedabad],
  dwarka: [CITY.rajkot, CITY.ahmedabad],
  palanpur: [CITY.ahmedabad, CITY.mehsana],
  godhra: [CITY.vadodara],
  surendranagar: [CITY.ahmedabad, CITY.rajkot],
  amreli: [CITY.bhavnagar, CITY.rajkot],
  ambaji: [CITY.ahmedabad],
};

/** Name back to key, so a CITY object can be turned into the key its route slug is built from. */
const CITY_KEY = Object.fromEntries(Object.entries(CITY).map(([k, v]) => [v.name, k]));
const ROUTE_SLUGS = new Set(ROUTE_PAIRS.map((p) => p.slug));

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
  // Where a route page exists for the pair, link to it rather than jumping straight out to the
  // app. Every one of these used to be an outbound link, which left 12 route pages with no
  // inbound internal link at all — reachable only from the sitemap, which is the weakest way
  // for a page to be found and gives it nothing to rank on. The route page carries the app
  // links itself, so nobody loses a step; they gain the corridor's context on the way.
  const routeLinks = destinations.map((d) => {
    const slug = routePageSlug(city, d);
    const href = slug ? `${slug}.html` : routeUrl(city, d);
    return `<li><a href="${href}">${city.name} → ${d.name}</a></li>`;
  }).join('\n      ');
  return {
    slug: `${key}-st-bus-tracker`,
    // 57 characters at the longest real city name (Surendranagar) — see the note on the route
    // title above. Keeps both terms people actually search, "ST bus" and "GSRTC".
    title: `${city.name} ST Bus Tracker — GSRTC Timetable & Live Map`,
    description: `Track any GSRTC ST bus to or from ${city.name} live on a map, or search the timetable to and from ${city.name}'s stations.`,
    crumbLabel: `${city.name} ST bus tracker`,
    h1: `${city.name} ST bus tracker`,
    lede: `Track any GSRTC bus running to or from ${city.name}, live — by plate, or by picking a route below.`,
    body: `
  <h2 class="reveal">Popular routes from ${city.name}</h2>
  <ul class="reveal">
      ${routeLinks}
  </ul>
  <p class="reveal">Each link opens the live departure list for that route — running buses show a countdown, the rest show their scheduled time. Don't see your route? Search any station pair directly in the app.</p>

  <h2 class="reveal">Track a specific bus</h2>
  <p class="reveal">If you already have the plate of a bus headed to or from ${city.name}, type it above rather than searching by route — it goes straight to that bus's live map.</p>

  <h2 class="reveal">Finding a stand in ${city.name}</h2>
  <p class="reveal">Not sure which ${city.name} stop is closest to you right now? See <a href="nearby-st-bus-stops.html">finding ST bus stops near you</a> for a map of stations around your current location, rather than searching by name.</p>`,
    related: [
      { href: 'gsrtc-bus-timetable.html', label: 'GSRTC bus timetable between any two stations' },
      { href: 'nearby-st-bus-stops.html', label: 'Find ST bus stops near you' },
    ],
    faq: [
      { q: `Can I track any GSRTC bus that passes through ${city.name}, or only ones starting there?`, a: `Any of them — search by plate for a specific bus, or by route for a full departure list, whether ${city.name} is the origin, the destination, or a stop along the way.` },
      { q: `Does this cover buses from other operators serving ${city.name}?`, a: 'No — only GSRTC’s own ST fleet, since that is the operator whose live position data this tool reads.' },
    ],
  };
});

export const PAGES = [...FEATURE_PAGES, ...ROUTE_PAIRS, ...CITY_PAGES];

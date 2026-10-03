/**
 * Route-page timetables, built from timetables.gen.mjs (see scripts/timetables/pull.mjs).
 *
 * Why route pages carry these: in Search Console the 38 route pages that get impressions
 * averaged position 8-9 and ~1% CTR (33.8k impressions -> 363 clicks, Sep 2026), while 988
 * distinct "<city> to <city> bus time table" style queries landed on them. Every one of those
 * pages said the same thing — "departures every 20 to 45 minutes, first bus ~05:00, last
 * ~23:30" — whatever the corridor. A searcher asking for Rajkot-Jamnagar timings wants the
 * timings, and the tracker already has them: GSRTC's own answers to real rider searches.
 *
 * Rules this file keeps, in the spirit of depots.data.mjs:
 * - Only what GSRTC returned is shown. Nothing is interpolated, and a direction with too little
 *   data falls back to the page's old copy rather than a guessed timetable.
 * - Counts are described as what the list contains ("departures listed"), not as a promise of
 *   how many buses run every day.
 * - ArrivalTimeAtBoarding (timetabled) is the only time used — never the live ETA fields.
 */
import RAW from './timetables.gen.mjs';

/** Fewer listed departures than this and the direction keeps the generic copy. */
export const MIN_SERVICES = 4;
/**
 * With three or more days of searches, a departure seen once on an older day is more likely
 * a one-off (a festival extra, a retimed trip) than a regular service, so it is left out.
 */
const MIN_DAYS_FOR_FILTER = 3;

const BUCKETS = [
  { until: '05:00', label: 'Midnight to 5 AM' },
  { until: '12:00', label: '5 AM to noon' },
  { until: '17:00', label: 'Noon to 5 PM' },
  { until: '21:00', label: '5 PM to 9 PM' },
  { until: '24:00', label: '9 PM to midnight' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "06:05" -> "6:05 AM" — GSRTC's own tickets and boards use 12-hour times. */
export function clock12(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h < 12 ? 'AM' : 'PM';
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${suffix}`;
}

/** 135 -> "2 h 15 min" */
export function duration(mins) {
  if (!mins) return '';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return [h ? `${h} h` : '', m ? `${m} min` : ''].filter(Boolean).join(' ');
}

/** "2026-10-02" -> "2 Oct 2026" */
function day(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function quantile(values, q) {
  const v = values.filter((x) => Number.isFinite(x) && x > 0).sort((a, b) => a - b);
  return v.length ? v[Math.floor((v.length - 1) * q)] : null;
}

const median = (values) => quantile(values, 0.5);

/**
 * GSRTC's scheduled duration is occasionally impossible — 4 h 20 min for Dwarka-Ahmedabad's
 * 473 km is 109 km/h. Nothing it runs averages over 80 km/h door to door, so a duration that
 * implies more is treated as missing rather than shown.
 */
const MAX_KMH = 80;
function plausibleMins(s, corridorKm) {
  if (!s.mins) return null;
  // And a distance under half the corridor's (8 km for a Shirdi-Ahmedabad bus) makes its
  // duration just as meaningless — the departure is kept, its journey time is not.
  if (s.km && corridorKm && s.km < corridorKm / 2) return null;
  const km = s.km || corridorKm;
  return km && km / (s.mins / 60) > MAX_KMH ? null : s.mins;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * One direction's timetable, or null when there is not enough to publish.
 * @returns {null | {
 *   services: {time: string, type: string, route: string, mins: number|null, km: number|null}[],
 *   first: object, last: object, firstDaytime: object|null, km: number|null,
 *   typicalMins: number|null, quickMins: number|null, types: [string, number][],
 *   firstDay: string, lastDay: string
 * }}
 */
export function directionTimetable(fromId, toId) {
  const pair = RAW.pairs[`${fromId}>${toId}`];
  if (!pair) return null;
  const latest = pair.days.length - 1;
  const kept = pair.services
    .filter((s) => pair.days.length < MIN_DAYS_FOR_FILTER || s.seen.length >= 2 || s.seen.includes(latest));
  if (kept.length < MIN_SERVICES) return null;
  const km = median(kept.map((s) => s.km));
  const services = kept.map(({ seen, ...s }) => ({ ...s, mins: plausibleMins(s, km) }));

  const typicalMins = median(services.map((s) => s.mins));
  // Even after the speed check the single shortest duration tends to be an outlier, so
  // "quickest" is the 10th percentile: what the faster buses are actually timetabled at.
  const quickMins = quantile(services.map((s) => s.mins), 0.1);

  const types = new Map();
  for (const s of services) if (s.type) types.set(s.type, (types.get(s.type) || 0) + 1);

  const firstDay = pair.days[0];
  const lastDay = pair.days[latest];
  return {
    services,
    first: services[0],
    last: services[services.length - 1],
    // The first bus is often a 00:30 overnight service; most people asking want the morning one.
    firstDaytime: services.find((s) => s.time >= '05:00') || null,
    km,
    typicalMins,
    // Only worth saying when it is meaningfully quicker than the usual bus.
    quickMins: quickMins && typicalMins && quickMins <= typicalMins - 10 ? quickMins : null,
    types: [...types.entries()].sort((a, b) => b[1] - a[1]),
    firstDay,
    lastDay,
  };
}

/** "Express (40), Gurjar Nagari (22) and Sleeper (9)" */
export function typeList(types, limit = 4) {
  const parts = types.slice(0, limit).map(([t, n]) => `${t} (${n})`);
  return parts.length > 1 ? `${parts.slice(0, -1).join(', ')} and ${parts.at(-1)}` : parts[0] || '';
}

/** One line a facts table or lede can carry. */
export function summaryLine(tt) {
  return `${tt.services.length} departures · first ${clock12(tt.first.time)} · last ${clock12(tt.last.time)}`;
}

/** The full departure list for one direction, split by time of day. */
export function timetableHtml(tt, fromName, toName, anchor) {
  const groups = [];
  let start = '00:00';
  for (const b of BUCKETS) {
    const rows = tt.services.filter((s) => s.time >= start && s.time < b.until);
    if (rows.length) groups.push({ label: b.label, rows });
    start = b.until;
  }
  const facts = [
    tt.km ? `about ${Math.round(tt.km)} km` : '',
    tt.typicalMins ? `usually ${duration(tt.typicalMins)}` : '',
    tt.quickMins ? `quickest about ${duration(tt.quickMins)}` : '',
  ].filter(Boolean).join(' · ');

  return `
  <h2 class="reveal" id="${anchor}">${esc(fromName)} to ${esc(toName)} bus timings</h2>
  <p class="reveal tt-summary"><b>${summaryLine(tt)}</b>${facts ? `<br>${facts}` : ''}</p>
  ${groups.map((g) => `
  <h3 class="tt-group">${g.label} <span>· ${g.rows.length} ${g.rows.length === 1 ? 'bus' : 'buses'}</span></h3>
  <div class="table-wrap tt google-anno-skip">
  <table>
    <thead><tr><th scope="col">Departs</th><th scope="col">Bus</th><th scope="col">Route</th></tr></thead>
    <tbody>
${g.rows.map((s) => `      <tr><td class="tt-time">${clock12(s.time)}</td><td>${esc(s.type)}</td><td>${esc(s.route)}${s.mins ? `<span class="tt-dur">${duration(s.mins)}</span>` : ''}</td></tr>`).join('\n')}
    </tbody>
  </table>
  </div>`).join('')}`;
}

/** "16 Sep 2026" or "13 Sep 2026 and 1 Oct 2026", over every timetable given. */
export function periodOf(...tts) {
  const first = tts.map((t) => t.firstDay).sort()[0];
  const last = tts.map((t) => t.lastDay).sort().at(-1);
  return first === last ? day(last) : `${day(first)} and ${day(last)}`;
}

/** "1 Oct 2026" — the newest date any of these timetables was seen on. */
export function latestOf(...tts) {
  return day(tts.map((t) => t.lastDay).sort().at(-1));
}

/** Shared caveat under the tables — where the times come from and what they do not promise. */
export function sourceNote(tts, cityNames) {
  return `<p class="reveal tt-note">These are GSRTC’s own timetabled departure times, as GSRTC returned them to ST Tracker searches between ${periodOf(...tts)}. The time is when the bus is due at the ${cityNames.map(esc).join(' or ')} stop, not when it left its first station. GSRTC can retime or cancel a trip without notice, and a bus that boards at another stop in the same city may not be listed — open the live list before you leave.</p>`;
}

export const TIMETABLES_GENERATED_AT = RAW.generatedAt;

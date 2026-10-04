/**
 * Runs ON the tracker VM, never locally — it reads the tracker's own SQLite database.
 * scripts/timetables/pull.mjs copies it over, runs it under `nice`, and saves what it prints.
 *
 * Every rider timetable search the tracker answers is stored in `timetable_searches` with the
 * full result list GSRTC returned (server/db.mjs in the tracker repo). That table is the only
 * source this script uses: it never calls GSRTC, so exporting can't spend the upstream budget
 * the live app depends on.
 *
 * Read-only by construction (`readOnly: true`), and every query is a lookup on the
 * (from_id, to_id) index. An unindexed scan of this 1.9 GB file noticeably loads the VM, so a
 * table-wide query must not be added here.
 *
 * Input:  argv[2] = path to a JSON file of [[fromId, toId], ...]
 * Output: JSON on stdout — { generatedAt, pairs: { "<from>><to>": {...} } }
 */
const fs = require('node:fs');
const { DatabaseSync } = require('node:sqlite');

const DB_FILE = process.env.DB_FILE || `${process.env.HOME}/st-tracker/.data/st-tracker.db`;
const MAX_SNAPSHOTS = Number(process.env.MAX_SNAPSHOTS) || 40;
// Older than this and a timing may well have been changed or withdrawn by GSRTC.
const MAX_AGE_DAYS = 21;
// The tracker asks GSRTC for one page of 80 (proxy.mjs, `pageSize: 80`). A snapshot that came
// back with exactly this many rows was probably cut short, which matters for the claims a page
// can make about "every bus".
const PAGE_SIZE = 80;

const pairs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const db = new DatabaseSync(DB_FILE, { readOnly: true });
const snapshots = db.prepare(`
  SELECT date, at, results_json FROM timetable_searches
  WHERE from_id = ? AND to_id = ? AND total_buses > 0 AND at >= ?
  ORDER BY id DESC LIMIT ?`);

/** "10/1/2026 6:20:00 AM" or "6:20 AM" -> "06:20" */
function clock(stamp) {
  const m = /(\d{1,2}):(\d{2})(?::\d{2})?\s*([AP]M)/i.exec(String(stamp || ''));
  if (!m) return null;
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === 'PM') h += 12;
  return `${String(h).padStart(2, '0')}:${m[2]}`;
}

/** "02:15:00" -> 135 */
function minutes(hms) {
  const m = /^(\d{1,2}):(\d{2})/.exec(String(hms || ''));
  return m ? Number(m[1]) * 60 + Number(m[2]) : null;
}

const since = Date.now() - MAX_AGE_DAYS * 86400e3;
const out = {};

for (const [fromId, toId] of pairs) {
  const rows = snapshots.all(String(fromId), String(toId), since, MAX_SNAPSHOTS);
  if (!rows.length) continue;

  const services = new Map();
  const days = new Set();
  let capped = 0;

  for (const row of rows) {
    let list;
    try { list = JSON.parse(row.results_json); } catch { continue; }
    if (!Array.isArray(list) || !list.length) continue;
    days.add(row.date);
    if (list.length >= PAGE_SIZE) capped++;

    for (const b of list) {
      // ArrivalTimeAtBoarding is the timetabled time and stays put while a bus runs late;
      // ArrivalTime and ETATime are live estimates. Only the first belongs in a timetable.
      const time = clock(b.ArrivalTimeAtBoarding);
      if (!time || !b.RouteId) continue;
      // A trip id changes every day; route + departure time is what stays put.
      const key = `${b.RouteId}@${time}`;
      let s = services.get(key);
      if (!s) {
        s = {
          time,
          type: String(b.ServiceType || b.BusServiceType || '').trim(),
          route: String(b.RouteName || '').trim().replace(/\s+/g, ' '),
          mins: minutes(b.SchDuration),
          km: Number.parseFloat(b.SchDistance || b.Distance) || null,
          seen: new Set(),
        };
        services.set(key, s);
      }
      s.seen.add(row.date);
    }
  }

  if (!services.size) continue;
  const dayList = [...days].sort();
  out[`${fromId}>${toId}`] = {
    from: Number(fromId),
    to: Number(toId),
    snapshots: rows.length,
    capped,
    days: dayList,
    // `seen` = indexes into `days`: the dates a service was in GSRTC's answer.
    services: [...services.values()]
      .map((s) => ({ ...s, seen: [...s.seen].map((d) => dayList.indexOf(d)).sort((x, y) => x - y) }))
      .sort((a, b) => a.time.localeCompare(b.time) || a.route.localeCompare(b.route)),
  };
}

process.stdout.write(JSON.stringify({ generatedAt: new Date().toISOString(), pairs: out }));

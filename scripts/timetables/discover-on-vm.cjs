/**
 * Runs ON the tracker VM, never locally. For each origin station, lists the destinations riders
 * searched most often in the last three weeks — the bus-stand pages show departures to those.
 * scripts/timetables/pull-hubs.mjs copies it over and runs it under `nice`.
 *
 * Read-only, and cheap on purpose: `at` sits after the large results_json column, so filtering
 * on it reads every result list. The time window is turned into a row id once (through the `at`
 * index), and the per-origin count then runs on the (from_id, to_id) index with an id bound,
 * reading only columns stored before results_json.
 *
 * Input:  argv[2] = path to a JSON file of [originId, ...]
 * Output: JSON on stdout — { generatedAt, origins: { "<id>": [[toId, searches], ...] } }
 */
const fs = require('node:fs');
const { DatabaseSync } = require('node:sqlite');

const DB_FILE = process.env.DB_FILE || `${process.env.HOME}/st-tracker/.data/st-tracker.db`;
const MAX_AGE_DAYS = 21;
const TOP = Number(process.env.TOP) || 14;

const origins = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const db = new DatabaseSync(DB_FILE, { readOnly: true });
const since = Date.now() - MAX_AGE_DAYS * 86400e3;
// Not MIN(id) ... WHERE at >= ?: SQLite answers that by walking rows from the oldest, reading
// every result list on the way. Ordering by `at` with LIMIT 1 is one step in the `at` index.
const first = db.prepare('SELECT id FROM timetable_searches WHERE at >= ? ORDER BY at ASC LIMIT 1').get(since)?.id;
const top = db.prepare(`
  SELECT to_id, COUNT(*) AS n FROM timetable_searches
  WHERE from_id = ? AND id >= ? AND total_buses > 0
  GROUP BY to_id ORDER BY n DESC LIMIT ?`);

const out = {};
for (const id of origins) out[id] = first == null ? [] : top.all(String(id), first, TOP).map((r) => [Number(r.to_id), r.n]);
process.stdout.write(JSON.stringify({ generatedAt: new Date().toISOString(), origins: out }));

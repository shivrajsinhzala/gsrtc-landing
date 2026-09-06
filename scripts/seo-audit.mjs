#!/usr/bin/env node
/**
 * SEO audit over the built output. Reports rather than fails — this is a review tool, not a
 * gate (verify-build.mjs is the gate).
 *
 * Thresholds are the ones Google's own snippet rendering actually imposes, not folklore:
 * titles are truncated around 580px which is ~60 characters at typical widths, and descriptions
 * around 920px / ~160 characters on desktop.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

const pages = [];
(function walk(dir, prefix = '') {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, `${prefix}/${e.name}`);
    else if (e.name === 'index.html') pages.push({ url: prefix || '/', file: full });
    else if (e.name.endsWith('.html')) pages.push({ url: `${prefix}/${e.name.slice(0, -'.html'.length)}`, file: full });
  }
})(DIST);

/**
 * Titles and descriptions are measured after decoding entities: `&amp;` is five characters in
 * the source and one on the results page, and counting the source spelling reports a title as
 * over budget when it is not. Only the entities that actually appear in this site's copy.
 */
const decode = (s) => s
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&nbsp;/g, ' ');

const strip = (html) => html
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[a-z]+;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const rows = [];
for (const p of pages) {
  const html = fs.readFileSync(p.file, 'utf8');
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim() ?? '');
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => strip(m[1]));
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => strip(m[1]));
  const text = strip(html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html);
  const words = text ? text.split(' ').length : 0;
  const internalLinks = new Set(
    [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1].replace(/\/$/, '') || '/'),
  );
  const schemaTypes = [...html.matchAll(/"@type":\s*"([^"]+)"/g)].map((m) => m[1]);
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)];
  const imgsNoAlt = imgs.filter((m) => !/\salt=/.test(m[0])).length;

  rows.push({
    url: p.url,
    title, titleLen: title.length,
    desc, descLen: desc.length,
    h1Count: h1s.length, h1: h1s[0] ?? '',
    h2Count: h2s.length,
    words,
    internalLinks: internalLinks.size,
    schema: [...new Set(schemaTypes)].filter((t) => !t.startsWith('List') && t !== 'Question' && t !== 'Answer' && t !== 'HowToStep'),
    imgsNoAlt,
  });
}

// ---------- report ----------
const issue = (label, list, fmt = (r) => r.url) => {
  if (!list.length) { console.log(`  ok   ${label}`); return; }
  console.log(`  WARN ${label} — ${list.length}`);
  list.slice(0, 8).forEach((r) => console.log(`         ${fmt(r)}`));
  if (list.length > 8) console.log(`         …and ${list.length - 8} more`);
};

console.log(`\nSEO audit — ${rows.length} pages\n`);

console.log('TITLES');
issue('over 60 chars (truncated in results)', rows.filter((r) => r.titleLen > 60),
  (r) => `${r.titleLen}  ${r.url}  "${r.title}"`);
issue('under 30 chars', rows.filter((r) => r.titleLen && r.titleLen < 30), (r) => `${r.titleLen}  ${r.url}`);
const dupTitles = Object.entries(rows.reduce((a, r) => ((a[r.title] ??= []).push(r.url), a), {}))
  .filter(([, u]) => u.length > 1);
issue('duplicated across pages', dupTitles.map(([t, u]) => ({ url: `${u.join(', ')} → "${t}"` })));

console.log('\nDESCRIPTIONS');
issue('missing', rows.filter((r) => !r.descLen));
issue('over 160 chars (truncated)', rows.filter((r) => r.descLen > 160), (r) => `${r.descLen}  ${r.url}`);
issue('under 70 chars (wasted space)', rows.filter((r) => r.descLen && r.descLen < 70), (r) => `${r.descLen}  ${r.url}`);
const dupDesc = Object.entries(rows.reduce((a, r) => ((a[r.desc] ??= []).push(r.url), a), {}))
  .filter(([d, u]) => d && u.length > 1);
issue('duplicated across pages', dupDesc.map(([, u]) => ({ url: u.join(', ') })));

console.log('\nHEADINGS');
issue('no H1', rows.filter((r) => r.h1Count === 0));
issue('more than one H1', rows.filter((r) => r.h1Count > 1), (r) => `${r.h1Count}  ${r.url}`);
issue('fewer than 2 H2s (thin structure)', rows.filter((r) => r.h2Count < 2), (r) => `${r.h2Count} H2  ${r.url}`);

console.log('\nCONTENT DEPTH');
const thin = rows.filter((r) => r.words < 300).sort((a, b) => a.words - b.words);
issue('under 300 words in <main>', thin, (r) => `${r.words}w  ${r.url}`);
console.log(`  info median words: ${rows.map((r) => r.words).sort((a, b) => a - b)[Math.floor(rows.length / 2)]}`);

console.log('\nINTERNAL LINKING');
const inbound = {};
for (const r of rows) inbound[r.url] = 0;
for (const p of pages) {
  const html = fs.readFileSync(p.file, 'utf8');
  const seen = new Set([...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1].replace(/\/$/, '') || '/'));
  for (const l of seen) if (l in inbound && l !== (p.prefix || p.url)) inbound[l]++;
}
const orphans = Object.entries(inbound).filter(([u, n]) => n <= 1 && u !== '/404').sort((a, b) => a[1] - b[1]);
issue('linked from 1 page or fewer (near-orphan)', orphans.map(([u, n]) => ({ url: `${n} inbound  ${u}` })));

console.log('\nSTRUCTURED DATA');
issue('no schema at all', rows.filter((r) => !r.schema.length));
const withFaq = rows.filter((r) => r.schema.includes('FAQPage')).length;
console.log(`  info FAQPage on ${withFaq}/${rows.length} pages (rich-result eligible)`);
console.log(`  info schema types in use: ${[...new Set(rows.flatMap((r) => r.schema))].join(', ')}`);

console.log('\nIMAGES');
issue('images missing alt', rows.filter((r) => r.imgsNoAlt > 0), (r) => `${r.imgsNoAlt} missing  ${r.url}`);

console.log('');

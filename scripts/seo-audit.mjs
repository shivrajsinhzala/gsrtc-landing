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
  // The blocks are also parsed, not just regex-scanned for types, so the required-property
  // check below can see the actual shape of each node rather than a flat list of names.
  const ld = [];
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { ld.push(JSON.parse(m[1])); } catch (e) { ld.push({ __parseError: String(e) }); }
  }
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
    ld,
    imgsNoAlt,
  });
}

/*
 * /404 is excluded from the checks that judge a page as a search destination — content depth,
 * heading structure, and whether it carries schema.
 *
 * It is not a destination: astro.config.mjs already keeps it out of the sitemap, and a 404
 * *should* be short, single-purpose and schema-free. Counting it as thin content produced
 * three permanent warnings that could never be fixed without making the page worse, and three
 * warnings that can never go away are three warnings nobody reads — which is how a real one
 * gets missed. It stays in the title/description/canonical checks, which do apply to it.
 */
const isDestination = (r) => r.url !== '/404';

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
issue('fewer than 2 H2s (thin structure)', rows.filter((r) => isDestination(r) && r.h2Count < 2), (r) => `${r.h2Count} H2  ${r.url}`);

console.log('\nCONTENT DEPTH');
const thin = rows.filter((r) => isDestination(r) && r.words < 300).sort((a, b) => a.words - b.words);
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
issue('no schema at all', rows.filter((r) => isDestination(r) && !r.schema.length));

/**
 * Required properties per Google's rich-result documentation — not schema.org's own vocabulary,
 * which marks almost nothing as required. A node missing one of these still parses as valid
 * JSON-LD and still validates on schema.org, but Search Console and third-party audits
 * (Semrush's "structured data item is invalid") report it as an error, because the page claims
 * a rich result it cannot be granted.
 *
 * `oneOf` entries mean any one of the listed properties satisfies the requirement.
 */
const GOOGLE_REQUIRED = {
  SoftwareApplication: { required: ['name', 'offers'], oneOf: [['aggregateRating', 'review']] },
  WebApplication: { required: ['name', 'offers'], oneOf: [['aggregateRating', 'review']] },
  MobileApplication: { required: ['name', 'offers'], oneOf: [['aggregateRating', 'review']] },
  Offer: { required: ['price', 'priceCurrency'] },
  AggregateRating: { required: ['ratingValue'], oneOf: [['ratingCount', 'reviewCount']] },
  Question: { required: ['name', 'acceptedAnswer'] },
  HowToStep: { required: ['text'] },
  ListItem: { required: ['position', 'name'] },
  BreadcrumbList: { required: ['itemListElement'] },
  FAQPage: { required: ['mainEntity'] },
  ImageObject: { required: ['url'] },
};

const schemaErrors = [];
const visit = (node, url) => {
  if (Array.isArray(node)) return node.forEach((n) => visit(n, url));
  if (!node || typeof node !== 'object') return;
  if (node.__parseError) {
    schemaErrors.push({ url: `${url} — JSON-LD does not parse: ${node.__parseError}` });
    return;
  }
  const types = [node['@type']].flat().filter((t) => typeof t === 'string');
  for (const t of types) {
    const rule = GOOGLE_REQUIRED[t];
    if (!rule) continue;
    for (const prop of rule.required ?? []) {
      if (node[prop] === undefined) schemaErrors.push({ url: `${url} — ${t} missing required "${prop}"` });
    }
    for (const group of rule.oneOf ?? []) {
      if (!group.some((prop) => node[prop] !== undefined)) {
        schemaErrors.push({ url: `${url} — ${t} missing one of ${group.map((p) => `"${p}"`).join(' / ')}` });
      }
    }
  }
  for (const v of Object.values(node)) visit(v, url);
};
for (const r of rows) visit(r.ld, r.url);

// Collapsed to one line per distinct problem: the same missing property on 123 route pages is
// one thing to fix in one template, not 123 findings to read past.
const byKind = schemaErrors.reduce((a, e) => {
  const kind = e.url.slice(e.url.indexOf(' — '));
  (a[kind] ??= []).push(e.url.slice(0, e.url.indexOf(' — ')));
  return a;
}, {});
issue(
  "fails Google's required properties (reported as invalid by Search Console)",
  Object.entries(byKind).map(([kind, urls]) => ({ url: `${urls.length} page(s)${kind}  e.g. ${urls[0]}` })),
);

const withFaq = rows.filter((r) => r.schema.includes('FAQPage')).length;
console.log(`  info FAQPage on ${withFaq}/${rows.length} pages (rich-result eligible)`);
console.log(`  info schema types in use: ${[...new Set(rows.flatMap((r) => r.schema))].join(', ')}`);

console.log('\nIMAGES');
issue('images missing alt', rows.filter((r) => r.imgsNoAlt > 0), (r) => `${r.imgsNoAlt} missing  ${r.url}`);

console.log('');

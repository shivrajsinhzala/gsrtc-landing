#!/usr/bin/env node
/**
 * Guards the one thing this migration could silently get wrong: losing a URL.
 *
 * The old site advertised 70 URLs in its sitemap, all `<slug>.html`, and those are the URLs
 * Google currently has indexed. After the move each one must either be built as a real page at
 * its new extensionless address, or be redirected to one. A page that quietly stopped existing
 * would not fail the build — it would just start returning 404 to traffic that already ranks.
 *
 * Run against dist/ after `astro build`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const LEGACY_SITEMAP = '/Users/shivrajsinh/ST-Tracker/landing/sitemap.xml';

let failures = 0;
const fail = (msg) => { console.error(`  ✗ ${msg}`); failures++; };
const pass = (msg) => console.log(`  ✓ ${msg}`);

if (!fs.existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}

// --- 1. Every legacy URL is either built or redirected ---------------------------------
const redirects = fs.readFileSync(path.join(DIST, '_redirects'), 'utf8');
const redirectFrom = new Set(
  redirects.split('\n')
    .filter((l) => l.trim() && !l.trim().startsWith('#'))
    .map((l) => l.trim().split(/\s+/)[0]),
);

// build.format: 'file' (astro.config.mjs) — `/foo` is the flat file `foo.html`, not
// `foo/index.html`. Only the true root keeps the `index.html` name, since a file can't be
// named "" before its extension.
const builtPaths = new Set();
(function walk(dir, prefix = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, `${prefix}/${entry.name}`);
    else if (entry.name === 'index.html') builtPaths.add(prefix || '/');
    else if (entry.name.endsWith('.html')) builtPaths.add(`${prefix}/${entry.name.slice(0, -'.html'.length)}`);
  }
})(DIST);

const fileFor = (p) => path.join(DIST, p === '/' ? 'index.html' : `${p}.html`);

if (fs.existsSync(LEGACY_SITEMAP)) {
  const legacyUrls = [...fs.readFileSync(LEGACY_SITEMAP, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname);

  const missing = [];
  for (const url of legacyUrls) {
    if (url === '/') { if (!builtPaths.has('/')) missing.push(url); continue; }
    const slug = url.replace(/^\//, '').replace(/\.html$/, '');
    const isBuilt = builtPaths.has(`/${slug}`);
    const isRedirected = redirectFrom.has(url);
    if (!isBuilt) missing.push(`${url} (no page at /${slug})`);
    else if (!isRedirected) missing.push(`${url} (page exists but no 301 from the old URL)`);
  }
  if (missing.length) missing.forEach((m) => fail(`legacy URL unreachable: ${m}`));
  else pass(`all ${legacyUrls.length} legacy sitemap URLs resolve (built + 301 from .html)`);
} else {
  console.warn('  ! legacy sitemap not found, skipping URL-coverage check');
}

// --- 2. No .html links survive in the output -------------------------------------------
let htmlHrefCount = 0;
const offenders = new Set();
for (const p of builtPaths) {
  const file = fileFor(p);
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/href="(?!https?:|\/\/)([^"]*?\.html)"/g)) {
    htmlHrefCount++;
    offenders.add(`${p} -> ${m[1]}`);
  }
}
if (htmlHrefCount) {
  [...offenders].slice(0, 10).forEach((o) => fail(`internal .html link left in output: ${o}`));
} else pass('no internal .html links remain in any built page');

// --- 3. Canonicals are absolute, extensionless, and self-referential --------------------
let canonicalIssues = 0;
for (const p of builtPaths) {
  const file = fileFor(p);
  const html = fs.readFileSync(file, 'utf8');
  const m = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!m) { fail(`no canonical on ${p}`); canonicalIssues++; continue; }
  const expected = p === '/' ? 'https://gsrtc.shivrajsinh.in/' : `https://gsrtc.shivrajsinh.in${p}`;
  if (m[1] !== expected) { fail(`canonical on ${p} is ${m[1]}, expected ${expected}`); canonicalIssues++; }
}
if (!canonicalIssues) pass(`every page carries a correct self-referential canonical (${builtPaths.size} pages)`);

// --- 4. hreflang only where a translation exists ----------------------------------------
const translated = new Set(['/', '/gu']);
let hreflangIssues = 0;
for (const p of builtPaths) {
  const file = fileFor(p);
  const html = fs.readFileSync(file, 'utf8');
  const has = html.includes('hreflang="gu-IN"');
  if (has && !translated.has(p)) { fail(`${p} declares a Gujarati alternate but has no translation`); hreflangIssues++; }
  if (!has && translated.has(p)) { fail(`${p} is translated but declares no hreflang`); hreflangIssues++; }
}
if (!hreflangIssues) pass('hreflang is declared on exactly the pages that are translated');

// --- 5. The Gujarati homepage is actually Gujarati before any JS ------------------------
const gu = fs.readFileSync(fileFor('/gu'), 'utf8');
if (!/[઀-૿]/.test(gu)) fail('/gu contains no Gujarati characters in its served HTML');
else if (!/<html[^>]+lang="gu-IN"/.test(gu)) fail('/gu does not declare lang="gu-IN"');
else pass('/gu is served as Gujarati HTML with lang="gu-IN" (no JS required)');

console.log(failures ? `\n${failures} check(s) failed.` : '\nAll checks passed.');
process.exit(failures ? 1 : 0);

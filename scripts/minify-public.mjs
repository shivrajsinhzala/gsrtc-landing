#!/usr/bin/env node
/**
 * Minifies the hand-written assets under public/ into their built copies in dist/.
 *
 * Everything Astro itself imports (src/styles/global.css, src/scripts/site.js) is already
 * bundled, hashed and minified into /_astro/ by the build. public/ is the one place that
 * bypasses that pipeline entirely — Cloudflare Pages serves those files byte-for-byte as they
 * are committed — so analytics.js was shipping its full comment block to every visitor and was
 * flagged as unminified JavaScript by both the Semrush and Rank Math audits.
 *
 * Minifying in dist/ rather than in place keeps the source the readable, commented version:
 * the comments in public/analytics.js explain *why* this site loads gtag.js at all, which is
 * worth more in the repository than the ~1 KB it costs on the wire.
 *
 * esbuild is already what Astro's own bundler uses; it is declared as a direct devDependency
 * here so this script does not silently depend on a transitive install.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

/** Files under public/ that are code. Data files (robots.txt, ads.txt, feeds) are left alone. */
const TARGETS = [{ file: 'analytics.js', loader: 'js' }];

let saved = 0;
for (const { file, loader } of TARGETS) {
  const full = path.join(DIST, file);
  if (!fs.existsSync(full)) {
    console.error(`minify-public: ${file} is not in dist — did the build run?`);
    process.exitCode = 1;
    continue;
  }
  const before = fs.readFileSync(full, 'utf8');
  const { code } = await esbuild.transform(before, { loader, minify: true, target: 'es2019' });
  fs.writeFileSync(full, code);
  saved += before.length - code.length;
  console.log(`  ✓ ${file}  ${before.length} → ${code.length} bytes`);
}
console.log(`  minified public/ assets, ${saved} bytes saved`);

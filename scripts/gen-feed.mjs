#!/usr/bin/env node
/**
 * Writes public/rss.xml (and feed.xml, the alias the old site also served).
 *
 * Regenerated from the page data rather than carried across verbatim: every link in the old
 * feed pointed at a `<slug>.html` URL, all of which now only 301. A feed that ships redirects
 * to every reader is a feed that will be re-fetched and re-resolved on every poll for no reason.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES } from '../src/data/pages.data.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://gsrtc.shivrajsinh.in';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const now = new Date().toUTCString();

const HAND_WRITTEN = [
  { slug: 'gsrtc-tracker', title: 'GSRTC Tracker — Track Any Gujarat ST Bus Live', description: 'What a GSRTC tracker does, and how ST Tracker compares to the official app and third-party alternatives.' },
  { slug: 'gsrtc-live-bus-tracking', title: 'How GSRTC Live Bus Tracking Works', description: 'Where the GPS position comes from, how fresh it is, and why a bus sometimes cannot be found.' },
  { slug: 'st-bus-tracking', title: 'ST Bus Tracking in Gujarat — Every Way to Find Your Bus', description: 'Every way people currently find their ST bus, and where a live tracker saves time over each.' },
  { slug: 'st-bus-live-location', title: "Find Your ST Bus's Live Location, Step by Step", description: 'A short walkthrough, plus what to do when the location does not show up.' },
];

const items = [
  {
    slug: '',
    title: 'GSRTC Live Bus Tracking — Track Any Gujarat ST Bus on a Map | ST Tracker',
    description: 'Track any Gujarat ST (GSRTC) bus live on a map by its number plate, with timetables between any two stations and alerts before it arrives.',
  },
  ...HAND_WRITTEN,
  ...PAGES.map((p) => ({ slug: p.slug, title: p.title, description: p.description })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ST Tracker — Gujarat ST (GSRTC) Bus Tracking &amp; Timetables</title>
    <link>${SITE}/</link>
    <description>Live GPS bus tracking and timetables for Gujarat ST (GSRTC) buses across 19,000+ stations.</description>
    <language>en-IN</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>
${items.map((i) => `    <item>
      <title><![CDATA[${i.title}]]></title>
      <link>${SITE}${i.slug ? `/${i.slug}` : '/'}</link>
      <guid isPermaLink="true">${SITE}${i.slug ? `/${i.slug}` : '/'}</guid>
      <description><![CDATA[${i.description}]]></description>
    </item>`).join('\n')}
  </channel>
</rss>
`;

const outDir = path.join(ROOT, 'public');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'rss.xml'), xml);
// The old site served the identical document at both names; keep the second so any existing
// subscriber URL does not break.
fs.writeFileSync(path.join(outDir, 'feed.xml'), xml);
console.log(`gen-feed: wrote rss.xml and feed.xml with ${items.length} items`);

/**
 * The `datePublished` / `dateModified` every page's schema carries.
 *
 * These were hardcoded to '2026-09-06' in seven separate files, which meant every one of the
 * 125 built pages told Google it had not been touched since that date — and would keep saying
 * so after every future deploy, because nothing updated the literal. For timetable and transit
 * queries, where freshness is a real ranking input, that is a signal thrown away for nothing.
 *
 * `dateModified` is now the build timestamp. That is honest for this site specifically: it is
 * statically generated and redeployed when its content changes, so "when was this built" and
 * "when was this last changed" are the same event. It is not a trick to look fresh — a build
 * that changes nothing is not deployed.
 *
 * `datePublished` stays a fixed literal, because it is genuinely fixed: it is when the site
 * first went up, and it must not drift.
 */

/** IST, matching the +05:30 offset the existing literals were written in. */
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

function istIso(date) {
  // toISOString() is UTC, so shift the clock by the offset first and then declare it as +05:30 —
  // the result is the same instant, written in the timezone every other date on this site uses.
  return `${new Date(date.getTime() + IST_OFFSET_MS).toISOString().slice(0, 19)}+05:30`;
}

/** When the site first went live. A constant, not a build artefact. */
export const DATE_PUBLISHED = '2026-01-15T00:00:00+05:30';

/** When this build ran — see the note above for why that is the right value for dateModified. */
export const DATE_MODIFIED = istIso(new Date());

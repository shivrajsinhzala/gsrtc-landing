/**
 * The page bodies in pages.data.mjs were authored when every page was served as `<slug>.html`,
 * so their internal links still point that way. Rewriting them here rather than editing the
 * data keeps that file byte-comparable with the version it was ported from — the whole
 * migration is easier to trust when the content itself provably did not change.
 *
 * Deliberately narrow: only same-site, relative, `.html` hrefs are touched. An absolute URL to
 * tracker.shivrajsinh.in, or anything with a scheme or a leading slash, is left exactly alone.
 */
const RELATIVE_HTML_HREF = /href="(?!https?:|\/\/|\/|#|mailto:)([a-z0-9-]+)\.html(#[a-z0-9-]+)?"/gi;

export function rewriteInternalLinks(html) {
  if (!html) return html;
  return String(html).replace(RELATIVE_HTML_HREF, (_, slug, hash) => `href="/${slug}${hash || ''}"`);
}

/** Same rewrite, for the `related` link lists which carry hrefs as plain data rather than HTML. */
export function rewriteHref(href) {
  if (!href) return href;
  if (/^(https?:|\/\/|\/|#|mailto:)/i.test(href)) return href;
  return href.replace(/^([a-z0-9-]+)\.html(#[a-z0-9-]+)?$/i, (_, slug, hash) => `/${slug}${hash || ''}`);
}

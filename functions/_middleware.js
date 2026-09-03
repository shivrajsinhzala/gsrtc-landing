/**
 * Cloudflare Pages serves identical content on the project's stable `*.pages.dev` alias and any
 * custom domain — there is no dashboard toggle to turn that off. Left alone, Google can discover
 * and index gsrtc-landing.pages.dev as a duplicate of gsrtc.shivrajsinh.in, competing with the
 * real domain for the same content instead of consolidating ranking onto it.
 *
 * Scoped to the exact production alias, not `*.pages.dev` generally — per-deployment preview
 * URLs (the random-hash and branch subdomains GitHub-connected deploys create) must keep working
 * unredirected, or "connect Git for preview deployments" loses its entire point. Nothing links to
 * those, so they carry effectively no indexing risk on their own; the stable alias is the one
 * that's actually discoverable.
 */
const PRODUCTION_ALIAS = 'gsrtc-landing.pages.dev';
const CANONICAL_HOST = 'gsrtc.shivrajsinh.in';

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === PRODUCTION_ALIAS) {
    url.hostname = CANONICAL_HOST;
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}

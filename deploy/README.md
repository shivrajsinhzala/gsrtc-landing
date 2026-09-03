# Deploying

This site is served by nginx directly from `/var/www/gsrtc-astro` on the same Oracle Cloud VM
that runs the tracker app (see `tracker.shivrajsinh.in`'s own deploy notes) — Cloudflare sits in
front as DNS + CDN only, this is not Cloudflare Pages.

`nginx-gsrtc.conf` in this folder is the live server block (`/etc/nginx/sites-available/gsrtc`
on the server), checked in so a change to routing/headers is reviewable like any other code
change rather than living only on the box. Keep the two in sync by hand — there is no CI wiring
this repo to the server yet.

## First deploy (2026-09-03) — what actually happened

1. `npm run build` locally.
2. `tar` the `dist/` output (excluding `_headers`/`_redirects` — Cloudflare Pages/Netlify
   convention, meaningless to nginx) over SSH into a staging dir, then moved it into place at
   `/var/www/gsrtc-astro`, leaving the previous static build untouched at `/var/www/gsrtc` for
   instant rollback (point `root` back at it and reload).
3. Backed up the existing nginx config to `/etc/nginx/backups/` (the box's own convention),
   staged the new one, `nginx -t`, then reloaded.
4. Hit a real bug on first verification: every clean URL, including `/` itself, came back 301.
   Cause: `try_files $uri $uri/ =404` — correct for the old flat-file build, wrong for Astro's
   `directory` output format, where `/gsrtc-tracker` is really the file
   `gsrtc-tracker/index.html`. Referencing a bare directory in try_files makes nginx apply its
   own automatic "add the trailing slash" redirect, which fights `trailingSlash: 'never'` in
   `astro.config.mjs`. Fixed by naming the file explicitly: `try_files $uri $uri/index.html
   =404;` — serves it directly, no redirect.
5. Verified all 70 previously-indexed `.html` URLs 301 to their new address and resolve 200,
   both language homepages serve 200, the two manual ad units and the AdSense script are
   present and unchanged, and hashed `/_astro/` assets load.

## Redeploying

```bash
npm run build
tar --exclude='_headers' --exclude='_redirects' -czf - -C dist . \
  | ssh -i ~/.ssh/st-tracker-deploy ubuntu@130.210.21.111 \
    'rm -rf /tmp/gsrtc-astro-new && mkdir -p /tmp/gsrtc-astro-new && tar -xzf - -C /tmp/gsrtc-astro-new'
ssh -i ~/.ssh/st-tracker-deploy ubuntu@130.210.21.111 '
  sudo rm -rf /var/www/gsrtc-astro.prev
  sudo mv /var/www/gsrtc-astro /var/www/gsrtc-astro.prev
  sudo mv /tmp/gsrtc-astro-new /var/www/gsrtc-astro
  sudo chown -R www-data:www-data /var/www/gsrtc-astro
'
```

Rollback: `sudo mv /var/www/gsrtc-astro /var/www/gsrtc-astro.broken && sudo mv /var/www/gsrtc-astro.prev /var/www/gsrtc-astro`
(or point nginx's `root` back at `/var/www/gsrtc` for the pre-Astro build, then `nginx -t && systemctl reload nginx`).

If `nginx-gsrtc.conf` in this repo changes, push it the same way the first deploy did: back up
`/etc/nginx/sites-available/gsrtc` to `/etc/nginx/backups/` first, `nginx -t` before reloading,
never after.

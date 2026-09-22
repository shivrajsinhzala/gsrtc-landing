/* ST Tracker landing — page behaviour.
 *
 * Ported from the pre-Astro app.js with the language half removed. Language used to be a
 * runtime DOM rewrite driven by a STRINGS table; each language is now its own document
 * rendered at build time (src/i18n/ui.ts), so nothing here has to swap text any more.
 *
 * What is left is the behaviour that genuinely belongs on the client: theme, scroll reveals,
 * the counters, the FAQ fallback, the plate form, the ad slots, and the sticky CTA.
 */

const APP = 'https://tracker.shivrajsinh.in';

/* ------------------------------------------------------------------ theme */

/**
 * Light, dark, or whatever the device says.
 *
 * Three states rather than two: someone who has never touched this should follow their phone
 * when it switches at dusk, and someone who has chosen should be obeyed on every visit. A
 * two-way toggle cannot express "follow the system" once it has been pressed.
 */
const THEMES = ['auto', 'light', 'dark'];

function applyTheme(mode) {
  const root = document.documentElement;
  if (mode === 'auto') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', mode);

  const dark = mode === 'dark'
    || (mode === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);

  // The <source media> in the markup follows the *system*, which is correct with no JavaScript
  // and wrong the moment someone uses the toggle: a light page would keep showing the dark
  // screenshots. Inside a <picture> a matching <source> always beats the <img src>, so the
  // source is what has to be rewritten — setting `img.src` alone changes nothing at all.
  const want = dark ? 'dark' : 'light';
  document.querySelectorAll('.shot picture').forEach((pic) => {
    const src = pic.querySelector('source');
    const img = pic.querySelector('img');
    if (src) src.srcset = src.srcset.replace(/-(light|dark)\.webp/, `-${want}.webp`);
    if (img) img.src = img.src.replace(/-(light|dark)\.webp/, `-${want}.webp`);
  });

  // Keeps the browser chrome in step with the page on mobile.
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.remove());
  const meta = document.createElement('meta');
  meta.name = 'theme-color';
  meta.content = dark ? '#0b1220' : '#f6f8fc';
  document.head.appendChild(meta);

  try { localStorage.setItem('st.landing.theme', mode); } catch { /* private mode */ }

  // The icon alone cannot say which of the three states is active, and screen readers get
  // nothing at all from it. Kept in English rather than pulled from the page dictionary: this
  // script is the one thing shared byte-for-byte between the English and Gujarati documents,
  // and it has no access to either page's translation table at runtime.
  const label = mode === 'auto' ? 'Theme: automatic (follows your device)'
    : mode === 'dark' ? 'Theme: dark' : 'Theme: light';
  document.getElementById('theme-btn')?.setAttribute('aria-label', label);
}

function initTheme() {
  let mode = 'auto';
  try { mode = localStorage.getItem('st.landing.theme') || 'auto'; } catch { /* private mode */ }
  if (!THEMES.includes(mode)) mode = 'auto';
  applyTheme(mode);

  document.getElementById('theme-btn')?.addEventListener('click', () => {
    let current = 'auto';
    try { current = localStorage.getItem('st.landing.theme') || 'auto'; } catch { /* ignore */ }
    // A full 3-state cycle, not light<->dark with auto as a one-time-only first stop. That was
    // the previous behaviour — verified by clicking through it, "auto" became unreachable after
    // a single press and stayed that way until localStorage was cleared, which defeats the
    // entire reason this is three states rather than two (see the comment above THEMES).
    //
    // The one thing worth keeping from the old logic: leaving "auto" should visibly change
    // something, so the first step away from it goes to whichever theme is NOT what the system
    // is currently showing, not to a fixed name. matchMedia is re-read on every click rather
    // than cached, so the order self-corrects if the OS theme changes mid-session.
    const systemDark = matchMedia('(prefers-color-scheme: dark)').matches;
    const cycle = systemDark ? ['auto', 'light', 'dark'] : ['auto', 'dark', 'light'];
    const next = cycle[(cycle.indexOf(current) + 1) % cycle.length];
    applyTheme(next);
  });
}

/* ------------------------------------------------------------------ reveals */

function initReveals() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '200px 0px 200px 0px', threshold: 0 });

  items.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 200) {
      el.classList.add('in');
    } else {
      io.observe(el);
    }
  });
}

/* ------------------------------------------------------------------ counters */

function initCounters() {
  const nums = document.querySelectorAll('[data-count]');
  if (!nums.length || !('IntersectionObserver' in window)) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      io.unobserve(el);
      const target = Number(el.dataset.count);
      if (reduced || !Number.isFinite(target)) return;

      const started = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - started) / 1100);
        // Eased out, so it decelerates into the real figure instead of stopping dead.
        const eased = 1 - (1 - p) ** 3;
        el.textContent = Math.round(target * eased).toLocaleString('en-IN');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: .6 });
  nums.forEach((n) => io.observe(n));
}

/* ------------------------------------------------------------------ faq */

/**
 * One answer open at a time.
 *
 * `<details name="faq">` does this natively in current browsers and keeps working with no
 * JavaScript at all, which is why the markup carries it. This closes the others for the
 * browsers that do not support the attribute yet — without it every answer stays open and the
 * section becomes a wall of text.
 */
function initFaq() {
  const items = [...document.querySelectorAll('.faq details')];
  if (!items.length) return;
  const supportsNative = 'name' in document.createElement('details');
  if (supportsNative) return;

  items.forEach((d) => {
    d.addEventListener('toggle', () => {
      if (!d.open) return;
      items.forEach((other) => { if (other !== d) other.open = false; });
    });
  });
}

/* ------------------------------------------------------------------ plate */

function initPlateForm() {
  const form = document.getElementById('plate-form');
  const input = document.getElementById('plate');
  const tabs = document.querySelectorAll('.search-tab');
  const submitBtn = form?.querySelector('button[type="submit"]');
  if (!form || !input) return;

  let currentTab = 'plate';

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      currentTab = tab.getAttribute('data-tab') || 'plate';

      if (currentTab === 'plate') {
        input.placeholder = 'GJ-18-ZT-1028';
        input.setAttribute('inputmode', 'latin');
        if (submitBtn) submitBtn.textContent = submitBtn.getAttribute('data-text-track') || 'Track';
      } else if (currentTab === 'route') {
        input.placeholder = submitBtn?.getAttribute('data-holder-route') || 'e.g. Rajkot to Ahmedabad';
        input.setAttribute('inputmode', 'text');
        if (submitBtn) submitBtn.textContent = submitBtn.getAttribute('data-text-search') || 'Search';
      } else if (currentTab === 'pnr') {
        input.placeholder = submitBtn?.getAttribute('data-holder-pnr') || 'e.g. 10-digit ticket PNR';
        input.setAttribute('inputmode', 'numeric');
        if (submitBtn) submitBtn.textContent = submitBtn.getAttribute('data-text-lookup') || 'Lookup';
      }
      input.focus();
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();

    if (currentTab === 'pnr') {
      window.stLandingTrack?.('track_pnr_submit');
      if (val) {
        location.href = `${APP}/?pnr=${encodeURIComponent(val)}`;
      } else {
        location.href = '/gsrtc-online-booking-pnr-tracking';
      }
      return;
    }

    if (currentTab === 'route') {
      window.stLandingTrack?.('track_route_submit');
      location.href = `${APP}/?from=470&to=464&fromName=Rajkot&toName=Ahmedabad`;
      return;
    }

    // Default plate search
    const raw = val.toUpperCase() || input.placeholder;
    const plate = raw.replace(/\s+/g, '-').replace(/[^A-Z0-9-]/g, '');
    window.stLandingTrack?.('track_plate_submit');
    location.href = `${APP}/?plate=${encodeURIComponent(plate)}`;
  });
}

/* ------------------------------------------------------------------ advertising */

function initAds() {
  document.querySelectorAll('ins.adsbygoogle[data-ad-slot]').forEach((slot) => {
    const wrap = slot.closest('.ad-slot-wrap');

    // Collapse container when AdSense officially reports unfilled
    const observer = new MutationObserver(() => {
      const status = slot.getAttribute('data-ad-status');
      if (status === 'unfilled') {
        if (wrap) {
          wrap.hidden = true;
          wrap.classList.add('ad-unfilled');
          wrap.style.display = 'none';
        }
        observer.disconnect();
      } else if (status === 'filled') {
        if (wrap) wrap.classList.add('ad-filled');
        observer.disconnect();
      }
    });
    observer.observe(slot, { attributes: true, attributeFilter: ['data-ad-status'] });

    // If adsbygoogle script was blocked by user's ad blocker, collapse after page finishes loading
    window.addEventListener('load', () => {
      setTimeout(() => {
        // Only collapse if the script never initialized at all (e.g. adblocker) and no status was set
        if (!slot.getAttribute('data-ad-status') && !slot.querySelector('iframe')) {
          /*
           * `.complete` is an HTMLImageElement property; a `<script>` does not have one, so this
           * test read `!undefined` and was unconditionally true. The branch it guards therefore
           * collapsed every slot that had no status by this point — including ones that were
           * simply still waiting their turn — which is the wrong outcome for the one case the
           * timer exists to handle.
           *
           * AdSense replaces `window.adsbygoogle` with its own object and sets `loaded` on it
           * once the library is running. Absent or falsy after this long means the script never
           * executed: blocked, or the request failed. That is the only situation in which
           * collapsing reserved space is right.
           */
          const scriptBlocked = !window.adsbygoogle?.loaded;
          if (scriptBlocked && wrap) {
            wrap.hidden = true;
            wrap.classList.add('ad-unfilled');
            wrap.style.display = 'none';
          }
        }
      }, 7000);
    }, { once: true });

    if (slot.dataset.adsenseRequested === '1') return;
    slot.dataset.adsenseRequested = '1';

    /*
     * `adsbygoogle.push({})` is ANONYMOUS. It does not fill the slot you are standing next to —
     * it fills the next `ins.adsbygoogle` in DOCUMENT ORDER that has no `data-adsbygoogle-status`.
     *
     * That is why the previous version of this served nothing. It pushed as soon as the slot had
     * width, without checking whose turn it was. Auto Ads — which cannot be disabled from the
     * page, see the note in Base.astro — injects its own `<ins>` elements into this document,
     * and on the homepage it places about eighteen of them. Every one of those sits ahead of our
     * two manual slots in document order, so both of our pushes were answered by an auto slot
     * and our own `<ins>` elements were never bound at all.
     *
     * Measured on the live site before this fix: 20 `ins.adsbygoogle` on the homepage, 18 of them
     * auto, and both manual slots ending with `data-adsbygoogle-status` still null, zero width,
     * no iframe, and their wrappers collapsed by the fallback below. Two dead units on the page
     * that carries 81% of the site's search traffic.
     *
     * So: wait until this slot genuinely is the next unprocessed `<ins>` before pushing. Waiting
     * is always correct — whatever is ahead resolves within a frame or two, or it is removed, and
     * either way this retries. This is the same rule the app's own web/js/ads.js arrived at after
     * hitting the identical fault; see the long comment at the top of that file.
     */
    const SIZE_ATTEMPTS = 120;

    const pushInOrder = (attemptsLeft) => {
      // Every unprocessed `<ins>` counts, not only ours — binding is by document order and does
      // not care who created the element.
      const all = [...document.querySelectorAll('ins.adsbygoogle')];
      const next = all.find((n) => !n.getAttribute('data-adsbygoogle-status'));

      if (next !== slot) {
        // Not our turn yet. Never evict the blocker here the way the app does: these are static
        // pages with no screen navigation, so anything ahead of us is an auto slot Google is
        // about to fill, and removing it would delete the very revenue this exists to protect.
        if (attemptsLeft > 0) requestAnimationFrame(() => pushInOrder(attemptsLeft - 1));
        return;
      }

      // AdSense measures a zero-width slot as unfillable and burns the request, so a slot that
      // has not been laid out yet is worth waiting for too.
      if (slot.getBoundingClientRect().width <= 0) {
        if (attemptsLeft > 0) requestAnimationFrame(() => pushInOrder(attemptsLeft - 1));
        return;
      }

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {}
    };

    // Two frames for first layout, then up to ~2s of retries at 60fps. The old version allowed
    // five attempts (~7 frames), which is not close to enough to outlast Google placing and
    // processing eighteen auto slots ahead of us.
    requestAnimationFrame(() => requestAnimationFrame(() => pushInOrder(SIZE_ATTEMPTS)));
  });
}

/* ------------------------------------------------------------------ header */

function initHeader() {
  const bar = document.querySelector('.bar');
  if (!bar) return;
  const onScroll = () => bar.classList.toggle('stuck', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ------------------------------------------------------------------ boot */

// Marks the document as scripted *before* anything else. The reveal styles hide their elements
// only under `.js`, so a page whose script fails to run still shows all of its content rather
// than a column of invisible sections.
document.documentElement.classList.add('js');

const boot = () => {
  initTheme();
  initHeader();
  initReveals();
  initCounters();
  initPlateForm();
  initAds();
  initFaq();
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

/* ------------------------------------------------------------------ sticky CTA
 * Shown once the header is out of view, hidden again while the closing call to action is on
 * screen — two buttons doing the same job, one covering the other, is worse than one.
 */
(function stickyCta() {
  const bar = document.getElementById('sticky-cta');
  if (!bar) return;

  const closer = document.querySelector('.closer');
  let closerVisible = false;

  if (closer && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      closerVisible = e.isIntersecting;
      update();
    }, { rootMargin: '0px 0px -20% 0px' }).observe(closer);
  }

  function update() {
    // A screen and a half: far enough that it is not competing with the hero's own buttons,
    // close enough that a reader who bounced off the first section still gets offered it.
    const past = window.scrollY > window.innerHeight * 1.5;
    bar.classList.toggle('on', past && !closerVisible);
  }

  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });

  update();
})();

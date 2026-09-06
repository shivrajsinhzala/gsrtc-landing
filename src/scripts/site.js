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
  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Falls back to the example rather than refusing: someone who presses Track with an empty
    // box wants to see what this does, and a validation error is a poor answer to that.
    const raw = input.value.trim().toUpperCase() || input.placeholder;
    const plate = raw.replace(/\s+/g, '-').replace(/[^A-Z0-9-]/g, '');
    // The analytics event deliberately says only that a search was submitted. The registration
    // itself is sensitive travel context and must never leave this page for analytics.
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
          const scriptBlocked = !document.querySelector('script[src*="adsbygoogle.js"]')?.complete;
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

    const pushWhenSized = (attemptsLeft) => {
      if (slot.getBoundingClientRect().width > 0) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch {}
      } else if (attemptsLeft > 0) {
        requestAnimationFrame(() => pushWhenSized(attemptsLeft - 1));
      }
    };
    requestAnimationFrame(() => requestAnimationFrame(() => pushWhenSized(5)));
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

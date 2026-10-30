/* ===================================================
   main.js: contact form and footer socials.
   The client-side Sanity About sync was removed in the redesign:
   it showed desktop and mobile visitors different bios.
   =================================================== */

/* ── Footer socials (reuse hero markup) ── */
function syncFooterSocials() {
  const heroSocials = document.querySelector('.hero-socials');
  const footer = document.getElementById('footer-socials');
  if (heroSocials && footer) footer.innerHTML = heroSocials.innerHTML;
}

/* ── Contact form ── */
function initContact() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const orig = btn.innerText;
    btn.innerText = 'Sending...';
    btn.disabled = true;
    try {
      const res = await fetch('https://formspree.io/f/mvzbkowo', {
        method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }
      });
      if (res.ok) { btn.innerText = '✓ Sent'; btn.style.background = 'linear-gradient(45deg,#00b09b,#96c93d)'; form.reset(); }
      else throw 0;
    } catch { btn.innerText = 'Error!'; btn.style.background = 'red'; }
    setTimeout(() => { btn.innerText = orig; btn.style.background = ''; btn.disabled = false; }, 3000);
  });
}

/* ── Init ── */
function initSiteEnhancements() {
  syncFooterSocials();
  initContact();
}

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(initSiteEnhancements, { timeout: 500 });
} else {
  setTimeout(initSiteEnhancements, 150);
}
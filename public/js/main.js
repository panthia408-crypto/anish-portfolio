/* ===================================================
   main.js — Sanity CMS sync (About only)
   Hero, socials, CV are hardcoded in HTML for instant load.
   =================================================== */

const PROJECT_ID = "e7hia29y";
const DATASET = "production";

const QUERY = encodeURIComponent(`{
  "about": *[_type == "about"][0]{
    mainBio,
    "imageUrl": aboutImage.asset->url,
    "roles": roles[]{
      title, description, link, linkText,
      "roleImageUrl": roleImage.asset->url
    }
  }
}`);

const API = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

async function syncSite() {
  try {
    const { result } = await (await fetch(API)).json();
    if (!result) return;

    /* ── About section ── */
    if (result.about) renderAbout(result.about);
  } catch (e) {
    console.error('Sync:', e);
  }
}

function renderAbout(data) {
  const card       = document.querySelector('.about-glass-card');
  const aboutImg   = document.getElementById('about-img');
  const bioEl      = document.getElementById('about-description');
  const skills     = document.querySelector('.skills-container');
  const defaultBio = document.getElementById('default-bio-content');
  const contentSide = document.querySelector('.about-content-side');

  let mag = document.getElementById('role-details-container');
  if (!mag) {
    mag = document.createElement('div');
    mag.id = 'role-details-container';
    mag.className = 'magazine-container';
    if (contentSide) contentSide.appendChild(mag);
  }

  const initBio = data.mainBio;
  const initImg = data.imageUrl;

  if (bioEl && initBio) bioEl.innerHTML = `<p>${initBio}</p>`;
  if (aboutImg && initImg) aboutImg.src = initImg;

  // Close button
  let closeBtn = document.querySelector('.close-magazine');
  if (!closeBtn) {
    closeBtn = document.createElement('button');
    closeBtn.className = 'close-magazine';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close');
    if (card) card.appendChild(closeBtn);
  }
  closeBtn.onclick = () => {
    card.classList.remove('expanded');
    if (aboutImg) aboutImg.src = initImg;
    mag.innerHTML = '';
    mag.style.display = 'none';
    if (defaultBio) defaultBio.style.display = '';
    if (bioEl) bioEl.style.display = '';
    window.scrollTo({ top: card.offsetTop - 100, behavior: 'smooth' });
  };

  // Role buttons
  if (skills && data.roles) {
    skills.innerHTML = data.roles.map(r => `
      <button class="role-btn"
        data-title="${esc(r.title)}"
        data-desc="${esc(r.description)}"
        data-link="${esc(r.link || '')}"
        data-linktext="${esc(r.linkText || 'Learn More')}"
        data-img="${esc(r.roleImageUrl || initImg || '')}">
        ${r.title}
      </button>`).join('');

    skills.addEventListener('click', e => {
      const btn = e.target.closest('.role-btn');
      if (!btn) return;
      const d = btn.dataset;
      card.classList.add('expanded');
      if (aboutImg && d.img) aboutImg.src = d.img;
      if (defaultBio) defaultBio.style.display = 'none';
      if (bioEl) bioEl.style.display = 'none';

      const paras = d.desc.split(/\.\s+/).filter(s => s.trim())
        .map(s => `<p>${s.trim()}${s.trim().endsWith('.') ? '' : '.'}</p>`).join('');

      mag.innerHTML = `
        <div class="role-document">
          <span class="about-label">In-Depth Profile</span>
          <h1 class="magazine-title">${d.title}</h1>
          <div class="magazine-columns">${paras}</div>
          ${d.link ? `<a href="${d.link}" target="_blank" rel="noopener" class="role-link">${d.linktext} →</a>` : ''}
        </div>`;
      mag.style.display = 'block';
      mag.style.opacity = '0';
      requestAnimationFrame(() => { mag.style.transition = 'opacity .5s'; mag.style.opacity = '1'; });
      card.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function esc(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

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
syncSite();
syncFooterSocials();
initContact();
const PROJECT_ID = "e7hia29y";
const DATASET = "production";

const QUERY = encodeURIComponent(`{
  "hero": *[_type == "hero"][0]{
    name, tagline, description,
    "imageUrl": profileImage.asset->url
  },
  "about": *[_type == "about"][0]{
    mainBio,
    "imageUrl": aboutImage.asset->url,
    "roles": roles[]{ 
        title, 
        description, 
        link, 
        linkText,
        "roleImageUrl": roleImage.asset->url 
    }
  },
  "socials": *[_type == "socials"]{ platform, url, icon },
  "cv": *[_type == "downloadable" && title == "Main CV"][0]{ "url": file.asset->url }
}`);

const REQ_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

/** * THEME BRIDGE: Ensures the "About" card follows your site's theme 
 * even if your main toggle logic is in a different file.
 */
function syncAboutTheme() {
    const html = document.documentElement;
    const body = document.body;
    
    // Check if site is currently dark via any common method
    const isDark = 
        body.classList.contains('dark') || 
        body.classList.contains('dark-mode') || 
        body.getAttribute('data-theme') === 'dark' ||
        html.classList.contains('dark') ||
        html.getAttribute('data-theme') === 'dark';

    // Force 'dark-mode' class onto body so about.css variables fire
    body.classList.toggle('dark-mode', isDark);
}

// Watch for clicks on theme buttons to update the card instantly
document.addEventListener('click', (e) => {
    if (e.target.closest('.theme-toggle') || e.target.closest('#theme-btn') || e.target.innerText.includes('🌙') || e.target.innerText.includes('☀️')) {
        setTimeout(syncAboutTheme, 50);
    }
});

async function syncSite() {
    try {
        const response = await fetch(REQ_URL);
        const { result } = await response.json();
        if (!result) return;

        // Apply theme sync immediately on load
        syncAboutTheme();

        // ─── HERO SECTION ───────────────────────────────────────────────────
        if (result.hero) {
            const heroImg = document.getElementById('hero-img');
            if (heroImg && result.hero.imageUrl) heroImg.src = result.hero.imageUrl;

            const heroName = document.querySelector('.hero-text h1 span');
            if (heroName && result.hero.name) heroName.innerText = result.hero.name;

            const heroTagline = document.querySelector('.hero-tagline');
            if (heroTagline && result.hero.tagline) heroTagline.innerText = result.hero.tagline;

            const heroDesc = document.querySelector('.hero-description');
            if (heroDesc && result.hero.description) heroDesc.innerText = result.hero.description;
        }

        // ─── ABOUT SECTION ──────────────────────────────────────────────────
        if (result.about) {
            const card              = document.querySelector('.about-glass-card');
            const aboutImgEl        = document.getElementById('about-img');
            const aboutBioEl        = document.getElementById('about-description');
            const skillContainer    = document.querySelector('.skills-container');
            const defaultBio        = document.getElementById('default-bio-content');
            const contentSide       = document.querySelector('.about-content-side');

            let magazineContainer = document.getElementById('role-details-container');
            if (!magazineContainer) {
                magazineContainer = document.createElement('div');
                magazineContainer.id = 'role-details-container';
                magazineContainer.className = 'magazine-container';
                if (contentSide) contentSide.appendChild(magazineContainer);
            }

            const initialBio = result.about.mainBio;
            const initialImg = result.about.imageUrl;

            if (aboutBioEl && initialBio) aboutBioEl.innerHTML = `<p>${initialBio}</p>`;
            if (aboutImgEl && initialImg) aboutImgEl.src = initialImg;

            // ── Close Button ──
            let closeBtn = document.querySelector('.close-magazine');
            if (!closeBtn) {
                closeBtn = document.createElement('button');
                closeBtn.className = 'close-magazine';
                closeBtn.innerHTML = '&times;';
                closeBtn.setAttribute('aria-label', 'Close');
                card.appendChild(closeBtn);
            }

            closeBtn.onclick = (e) => {
                e.stopPropagation();
                card.classList.remove('expanded');
                if (aboutImgEl) aboutImgEl.src = initialImg;
                magazineContainer.innerHTML = '';
                magazineContainer.style.display = 'none';
                if (defaultBio) defaultBio.style.display = '';
                if (aboutBioEl) aboutBioEl.style.display = '';
                window.scrollTo({ top: card.offsetTop - 100, behavior: 'smooth' });
            };

            // ── Role Buttons ──
            if (skillContainer && result.about.roles) {
                skillContainer.innerHTML = result.about.roles.map(role => `
                    <button class="role-btn"
                            data-title="${escAttr(role.title)}"
                            data-desc="${escAttr(role.description)}"
                            data-link="${escAttr(role.link || '')}"
                            data-linktext="${escAttr(role.linkText || 'Learn More')}"
                            data-roleimg="${escAttr(role.roleImageUrl || initialImg || '')}">
                        ${role.title}
                    </button>
                `).join('');

                document.querySelectorAll('.role-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const { title, desc, link, linktext, roleimg } = btn.dataset;

                        card.classList.add('expanded');
                        if (aboutImgEl && roleimg) aboutImgEl.src = roleimg;
                        if (defaultBio) defaultBio.style.display = 'none';
                        if (aboutBioEl) aboutBioEl.style.display = 'none';

                        // MAGAZINE LAYOUT: Flow text properly
                        const sentences = desc.split(/\.\s+/).filter(s => s.trim().length > 0);
                        const paragraphs = sentences.map(s => 
                            `<p>${s.trim()}${s.trim().endsWith('.') ? '' : '.'}</p>`
                        ).join('');

                        magazineContainer.innerHTML = `
                            <div class="role-document">
                                <span class="about-label">In-Depth Profile</span>
                                <h1 class="magazine-title">${title}</h1>
                                <div class="magazine-columns">
                                    ${paragraphs}
                                </div>
                                ${link ? `<a href="${link}" target="_blank" rel="noopener noreferrer" class="role-link">${linktext} →</a>` : ''}
                            </div>
                        `;

                        magazineContainer.style.display = 'block';
                        magazineContainer.style.opacity = '0';
                        requestAnimationFrame(() => {
                            magazineContainer.style.transition = 'opacity 0.5s ease';
                            magazineContainer.style.opacity = '1';
                        });

                        // Standard viewport scroll fix
                        card.scrollTo({ top: 0, behavior: 'smooth' });
                    });
                });
            }
        }

      // ─── SOCIALS ───
if (result.socials) {
    // Select both Hero and Footer social containers
    const heroSocials = document.querySelector('.social-links');
    const footerSocials = document.getElementById('footer-socials');

    const socialHTML = result.socials.map(s => `
        <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-icon-btn">
            <i class="fab ${s.icon}"></i>
        </a>
    `).join('');

    if (heroSocials) heroSocials.innerHTML = socialHTML;
    if (footerSocials) footerSocials.innerHTML = socialHTML;
}

        // ─── CV ───
        if (result.cv) {
            const cvBtn = document.querySelector('.btn-cv');
            if (cvBtn) cvBtn.href = result.cv.url;
        }

    } catch (error) {
        console.error('Sync Error:', error);
    }
}

function escAttr(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

syncSite();
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Stops the "divert to home" issue

    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    const formData = new FormData(this);

    // Visual Feedback: Start sending
    btn.innerText = "Sending...";
    btn.disabled = true;

    try {
        const response = await fetch("https://formspree.io/f/mvzbkowo", {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            // Success State
            btn.innerText = "✓ Message Sent";
            btn.style.background = "linear-gradient(45deg, #00b09b, #96c93d)"; // Success Green
            this.reset(); // Clears the form
        } else {
            throw new Error('Formspree error');
        }
    } catch (error) {
        btn.innerText = "Error! Try again";
        btn.style.background = "red";
    }

    // Reset button after 3 seconds
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = ""; // Revert to CSS gradient
        btn.disabled = false;
    }, 3000);
});
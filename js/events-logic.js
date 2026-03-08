/* events-logic.js — Fetch SOIES events from Sanity, render cards, lightbox */

(function () {
  const PID = 'e7hia29y';
  const DS  = 'production';
  const QUERY = encodeURIComponent('*[_type == "event"] | order(date desc)');
  const API = `https://${PID}.api.sanity.io/v2021-10-21/data/query/${DS}?query=${QUERY}`;

  let allEvents = [];

  function imgUrl(ref) {
    if (!ref) return '';
    return `https://cdn.sanity.io/images/${PID}/${DS}/${ref.replace('image-', '').replace(/-(\w+)$/, '.$1')}`;
  }

  async function fetchEvents() {
    try {
      const res = await fetch(API);
      const { result } = await res.json();
      allEvents = result || [];
      render(allEvents);
    } catch (e) {
      console.error('Events fetch error:', e);
      document.getElementById('events-grid').innerHTML =
        '<div class="no-events"><i class="fas fa-exclamation-circle"></i><p>Unable to load events. Please try again later.</p></div>';
    }
  }

  function formatDate(d) {
    if (!d) return '';
    const dt = new Date(d + 'T00:00:00');
    return dt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function render(events) {
    const grid = document.getElementById('events-grid');
    if (!events.length) {
      grid.innerHTML = '<div class="no-events"><i class="fas fa-calendar-xmark"></i><p>No events published yet. Add events from Sanity Studio to see them here.</p></div>';
      return;
    }

    grid.innerHTML = events.map((ev, i) => {
      const photos = (ev.photos || []).map(p => imgUrl(p.asset?._ref)).filter(Boolean);
      const firstPhoto = photos[0] || '';
      const tags = ev.tags || [];

      return `
        <div class="event-card" data-index="${i}">
          <div class="event-photo" ${firstPhoto ? `onclick="openLightbox(${i}, 0)"` : ''}>
            ${firstPhoto
              ? `<img src="${firstPhoto}" alt="${esc(ev.title)}" loading="lazy">`
              : '<div class="no-photo"><i class="fas fa-image"></i></div>'}
            ${photos.length > 1 ? `<span class="photo-count"><i class="fas fa-images"></i> ${photos.length}</span>` : ''}
          </div>
          <div class="event-body">
            <span class="event-date"><i class="fas fa-calendar-alt"></i> ${formatDate(ev.date)}</span>
            <h3>${esc(ev.title)}</h3>
            ${ev.description ? `<p class="event-desc">${esc(ev.description)}</p>` : ''}
            ${tags.length ? `<div class="event-tags">${tags.map(t => `<span class="event-tag">${esc(t)}</span>`).join('')}</div>` : ''}
            ${photos.length > 1 ? `<button class="view-gallery-btn" onclick="openLightbox(${i}, 0)"><i class="fas fa-images"></i> View ${photos.length} Photos</button>` : ''}
          </div>
        </div>`;
    }).join('');
  }

  function esc(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ── Search ── */
  const searchEl = document.getElementById('events-search');
  if (searchEl) {
    searchEl.addEventListener('input', () => {
      const q = searchEl.value.toLowerCase().trim();
      if (!q) { render(allEvents); return; }
      render(allEvents.filter(ev =>
        (ev.title || '').toLowerCase().includes(q) ||
        (ev.description || '').toLowerCase().includes(q) ||
        (ev.tags || []).some(t => t.toLowerCase().includes(q))
      ));
    });
  }

  /* ── Lightbox ── */
  let lbImages = [], lbIdx = 0;

  window.openLightbox = function (eventIdx, photoIdx) {
    const ev = allEvents[eventIdx];
    if (!ev || !ev.photos) return;
    lbImages = ev.photos.map(p => imgUrl(p.asset?._ref)).filter(Boolean);
    if (!lbImages.length) return;
    lbIdx = photoIdx || 0;
    showLb();
  };

  window.closeLightbox = function () {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = '';
  };

  window.lbNav = function (dir) {
    if (!lbImages.length) return;
    lbIdx = (lbIdx + dir + lbImages.length) % lbImages.length;
    showLb();
  };

  function showLb() {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lb-img');
    const counter = document.getElementById('lb-counter');
    img.src = lbImages[lbIdx];
    counter.textContent = `${lbIdx + 1} / ${lbImages.length}`;
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  /* Close on Escape, arrow key navigation */
  document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox');
    if (!lb || lb.style.display === 'none') return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbNav(-1);
    if (e.key === 'ArrowRight') lbNav(1);
  });

  /* Close on background click */
  document.getElementById('lightbox')?.addEventListener('click', e => {
    if (e.target.id === 'lightbox') closeLightbox();
  });

  fetchEvents();
})();

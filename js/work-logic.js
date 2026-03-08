/* work-logic.js — Search, filter, and view-more for work page */
(function () {
  const searchInput = document.getElementById('work-search');
  const cards = Array.from(document.querySelectorAll('.detail-card'));
  const INITIAL_SHOW = 6;
  let showAll = false;

  /* ── Filter by search ── */
  function filterCards() {
    const q = (searchInput?.value || '').toLowerCase().trim();
    let visible = 0;

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const match = !q || text.includes(q);
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });

    applyViewMore();
    // Update counter
    const counter = document.getElementById('results-count');
    if (counter) counter.textContent = `${visible} project${visible !== 1 ? 's' : ''}`;
  }

  /* ── View More / Less ── */
  function applyViewMore() {
    const q = (searchInput?.value || '').toLowerCase().trim();
    if (q) {
      // When searching, show all matches
      cards.forEach(c => { if (c.style.display !== 'none') c.classList.remove('hidden-card'); });
      toggleViewMoreBtn(false);
      return;
    }

    let count = 0;
    cards.forEach(c => {
      c.style.display = '';
      if (!showAll && count >= INITIAL_SHOW) {
        c.classList.add('hidden-card');
      } else {
        c.classList.remove('hidden-card');
      }
      count++;
    });

    toggleViewMoreBtn(cards.length > INITIAL_SHOW && !showAll);
  }

  function toggleViewMoreBtn(show) {
    const btn = document.getElementById('view-more-btn');
    if (btn) btn.style.display = show ? '' : 'none';
  }

  /* ── Tag filter ── */
  document.addEventListener('click', e => {
    const tag = e.target.closest('.card-tag');
    if (!tag || !searchInput) return;
    searchInput.value = tag.textContent.trim();
    filterCards();
  });

  /* ── Init ── */
  if (searchInput) {
    searchInput.addEventListener('input', () => { showAll = false; filterCards(); });
  }

  const viewMoreBtn = document.getElementById('view-more-btn');
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
      showAll = true;
      applyViewMore();
      viewMoreBtn.style.display = 'none';
    });
  }

  // Initial state
  applyViewMore();
})();

// Ensure elements are grabbed correctly
const menuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

function setMenuOpen(open) {
    navLinks.classList.toggle('active', open);
    menuBtn.classList.toggle('active', open);
    menuBtn.setAttribute('aria-expanded', String(open));
}

// Mobile Menu Toggle
if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navLinks.classList.contains('active');
        setMenuOpen(!isOpen);
    });

    // Keyboard: Enter/Space to toggle
    menuBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            menuBtn.click();
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setMenuOpen(false));
    });

    // Auto-Hide: Close menu when clicking anywhere else
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            setMenuOpen(false);
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            setMenuOpen(false);
            menuBtn.focus();
        }
    });
}
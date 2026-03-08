// Ensure elements are grabbed correctly
const menuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

// Mobile Menu Toggle
if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Stops click from "leaking" to the document
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // 3. Auto-Hide: Close menu when clicking anywhere else
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
}
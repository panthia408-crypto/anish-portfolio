// Ensure elements are grabbed correctly
const menuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const themeBtn = document.getElementById('theme-toggle');

// 1. Theme Toggle Logic
themeBtn.addEventListener('click', () => {
    // Add a temporary class for a "flash" or smooth transition if desired
    document.body.style.transition = "background-color 0.5s ease, color 0.5s ease";
    document.body.classList.toggle('light-theme');
    
    // Save the choice
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme-pref', isLight ? 'light' : 'dark');
});
// 2. Mobile Menu Toggle
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
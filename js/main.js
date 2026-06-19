// Portfolio Interactivity Script

document.addEventListener('DOMContentLoaded', () => {
    setupTheme();
    setupMobileMenu();
    setupTimelineScrollAnimation();
});

// Setup Dark/Light mode theme toggling
function setupTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-toggle-icon');

    // Check system preference or localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        themeIcon.textContent = 'light_mode';
    } else {
        document.documentElement.classList.remove('dark');
        themeIcon.textContent = 'dark_mode';
    }

    // Toggle theme action
    themeToggleBtn.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            themeIcon.textContent = 'dark_mode';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.textContent = 'light_mode';
        }
    });
}

// Mobile Menu toggling logic
function setupMobileMenu() {
    const burgerBtn = document.getElementById('menu-burger');
    const closeBtn = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    const openMenu = () => {
        mobileMenu.classList.remove('pointer-events-none', 'opacity-0');
        mobileMenu.classList.add('opacity-100');
    };

    const closeMenu = () => {
        mobileMenu.classList.add('pointer-events-none', 'opacity-0');
        mobileMenu.classList.remove('opacity-100');
    };

    burgerBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    mobileMenuLinks.forEach(link => link.addEventListener('click', closeMenu));
}

// Fade in elements or highlight timeline elements when in viewport
function setupTimelineScrollAnimation() {
    const cards = document.querySelectorAll('.timeline-card');
    
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        // Prepare card initial states for transition
        card.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-500', 'ease-out');
        observer.observe(card);
    });
}

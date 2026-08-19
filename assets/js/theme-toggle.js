/**
 * Theme Toggle - Loads saved theme from cookie and handles toggle clicks
 * Must be loaded in <head> to prevent Flash of Unstyled Content (FOUC)
 */
(function() {
    const root = document.documentElement;

    // --- Helpers ---
    function getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }

    function setCookie(name, value, days) {
        document.cookie = name + '=' + value +
                          '; expires=' + new Date(Date.now() + days * 864e5).toUTCString() +
                          '; path=/';
    }

    function applyTheme(theme) {
        root.classList.toggle('light-theme', theme === 'light');
    }

    // --- Apply saved or system theme ---
    const saved = getCookie('theme');
    if (saved) {
        applyTheme(saved);
    } else if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
        applyTheme('light');
    }

    // --- Toggle handler ---
    function toggleTheme() {
        const isLight = root.classList.contains('light-theme');
        const newTheme = isLight ? 'dark' : 'light';
        applyTheme(newTheme);
        setCookie('theme', newTheme, 365);
    }

    // --- Attach event listeners after DOM ready ---
    function init() {
        document.querySelectorAll('.theme-toggle').forEach(btn => {
            btn.addEventListener('click', toggleTheme);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

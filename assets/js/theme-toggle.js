/**
 * Theme Toggle - Loads saved theme from cookie and handles toggle clicks
 * Must be loaded in <head> to prevent Flash of Unstyled Content (FOUC)
 */
(function() {
    // --- Helpers ---
    function getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }

    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = name + '=' + value + '; expires=' + expires + '; path=/';
    }

    // --- Apply saved theme ---
    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.classList.add('light-theme');
        } else {
            document.documentElement.classList.remove('light-theme');
        }
    }

    const savedTheme = getCookie('theme');
    
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
        applyTheme('light');
    }
    // else: dark by default

    // --- Toggle handler ---
    function toggleTheme() {
        const isLight = document.documentElement.classList.contains('light-theme');
        const newTheme = isLight ? 'dark' : 'light';
        
        applyTheme(newTheme);
        setCookie('theme', newTheme, 365);
    }

    // --- Attach event listeners ---
    function initToggleButtons() {
        document.querySelectorAll('.theme-toggle').forEach(function(btn) {
            btn.addEventListener('click', toggleTheme);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initToggleButtons);
    } else {
        initToggleButtons();
    }
})();

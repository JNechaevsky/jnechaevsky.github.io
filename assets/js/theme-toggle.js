/**
 * Theme Toggle - Loads saved theme from cookie on page load
 * Must be loaded in <head> to prevent Flash of Unstyled Content (FOUC)
 */
(function() {
    // Check for saved theme preference in cookies
    function getCookie(name) {
        const value = '; ' + document.cookie;
        const parts = value.split('; ' + name + '=');
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    const savedTheme = getCookie('theme');
    
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-theme');
    } else if (savedTheme === 'dark') {
        // Dark theme is default, no class needed
        document.documentElement.classList.remove('light-theme');
    } else {
        // No cookie set - check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.documentElement.classList.add('light-theme');
        }
    }
})();

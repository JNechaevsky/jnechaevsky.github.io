/**
 * Theme Toggle Button Handler
 * Handles click events and icon updates for the theme toggle button
 */
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        updateButtonIcon();
        
        toggleBtn.addEventListener('click', function() {
            document.documentElement.classList.toggle('light-theme');
            updateButtonIcon();
            
            // Save to cookie (expires in 365 days)
            const isLight = document.documentElement.classList.contains('light-theme');
            const expires = new Date();
            expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
            document.cookie = 'theme=' + (isLight ? 'light' : 'dark') + ';expires=' + expires.toUTCString() + ';path=/';
        });
    }
    
    function updateButtonIcon() {
        const isLight = document.documentElement.classList.contains('light-theme');
        toggleBtn.textContent = isLight ? '☀️' : '🌙';
        toggleBtn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    }
});

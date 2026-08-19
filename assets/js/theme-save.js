/**
 * Save selected theme
 */
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    function updateButtonIcon() {
        const isLight = document.documentElement.classList.contains('light-theme');
        toggleBtn.textContent = isLight ? '☀️' : '🌙';
        toggleBtn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    }

    // Устанавливаем иконку при загрузке
    updateButtonIcon();

    toggleBtn.addEventListener('click', function() {
        // toggle() возвращает true, если класс был добавлен
        const isLight = document.documentElement.classList.toggle('light-theme');
        updateButtonIcon();

        // Сохраняем куку на год
        document.cookie = 'theme=' + (isLight ? 'light' : 'dark') +
                          ';expires=' + new Date(Date.now() + 365 * 864e5).toUTCString() +
                          ';path=/';
    });
});

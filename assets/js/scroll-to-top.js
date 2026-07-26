/**
 * Скроллер на верх страницы
 * Author: Polina "Aura" N.
 */

(() => {
    // Защита от дублирования
    if (document.getElementById('scrollTopBtn')) return;

    const btn = document.createElement('button');
    btn.id = 'scrollTopBtn';
    btn.setAttribute('aria-label', '↑');
    btn.style.setProperty('--btn-size', '48px');

    // Сборка SVG через строку
    btn.innerHTML = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(-90 50 50)">
                <circle r="45" cx="50" cy="50" stroke-dasharray="0" style="--radius: 45"/>
            </g>
            <line x1="50" y1="70" x2="50" y2="35" stroke="white" stroke-width="4" stroke-linecap="round"/>
            <polyline points="35,50 50,35 65,50" stroke="white" stroke-width="4" stroke-linecap="round" fill="none"/>
        </svg>
    `;

    document.body.appendChild(btn);

    // Находим круг
    const circle = btn.querySelector('circle');
    const radius = 45; // фиксированный радиус, совпадает с r="45"
    const len = 2 * Math.PI * radius;
    circle.style.strokeDasharray = len;

    const update = () => {
        const maxScroll = document.body.scrollHeight - innerHeight;
        const progress = maxScroll ? window.scrollY / maxScroll : 0;
        circle.style.strokeDashoffset = len * (1 - progress);
        btn.classList.toggle('show', window.scrollY > 100);
    };

    // Объединяем scroll и resize в один обработчик
    const events = ['scroll', 'resize'];
    events.forEach(e => addEventListener(e, update));
    btn.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
    update();
})();

(() => 
{
    const btn = document.getElementById('scrollTopBtn');
    const c = btn.querySelector('circle');

    /* [PN] Сначала вычисляем радиус по stroke-width */
    const strokeWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--stroke-width')) || 4;
    const radius = 50 - strokeWidth / 2;
    c.setAttribute('r', radius);

    /* [PN] Только после этого — длина окружности */
    const len = 2 * Math.PI * radius;
    c.style.strokeDasharray = len;

    const update = () =>
    {
        const p = window.scrollY / (document.body.scrollHeight - innerHeight);
        c.style.strokeDashoffset = len * (1 - p);
        btn.classList.toggle('show', window.scrollY > 100);
    };

    addEventListener('scroll', update);
    addEventListener('resize', update);
    btn.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

    update();
})();

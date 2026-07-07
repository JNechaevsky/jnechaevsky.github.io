(() => 
{
    /* [PN] Защита от дублирования, если скрипт случайно подключен дважды */
    if (document.getElementById('scrollTopBtn'))
    {
        return;
    }

    /* [PN] Создаём кнопку */
    const btn = document.createElement('button');
    btn.id = 'scrollTopBtn';
    btn.setAttribute('aria-label', '↑');
    btn.style.setProperty('--btn-size', '48px');

    /* [PN] Собираем SVG */
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('xmlns', svgNS);

    /* [PN] Круговая обводка */
    const g = document.createElementNS(svgNS, 'g');
    g.setAttribute('transform', 'rotate(-90 50 50)');
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('r', '45');
    circle.setAttribute('cx', '50');
    circle.setAttribute('cy', '50');
    g.appendChild(circle);
    svg.appendChild(g);

    /* [PN] Стрелка: ножка */
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', '50');
    line.setAttribute('y1', '70');
    line.setAttribute('x2', '50');
    line.setAttribute('y2', '35');
    line.setAttribute('stroke', 'white');
    line.setAttribute('stroke-width', '4');
    line.setAttribute('stroke-linecap', 'round');
    svg.appendChild(line);

    /* [PN] Стрелка: наконечник */
    const polyline = document.createElementNS(svgNS, 'polyline');
    polyline.setAttribute('points', '35,50 50,35 65,50');
    polyline.setAttribute('stroke', 'white');
    polyline.setAttribute('stroke-width', '4');
    polyline.setAttribute('stroke-linecap', 'round');
    polyline.setAttribute('fill', 'none');
    svg.appendChild(polyline);

    btn.appendChild(svg);

    /* [PN] Вставляем в DOM */
    document.body.appendChild(btn);

    /* [PN] Вычисляем радиус по stroke-width */
    const strokeWidth = parseFloat(
        getComputedStyle(document.documentElement)
            .getPropertyValue('--stroke-width')
    ) || 4;
    const radius = 50 - strokeWidth / 2;
    circle.setAttribute('r', radius);

    /* [PN] Только после этого — длина окружности */
    const len = 2 * Math.PI * radius;
    circle.style.strokeDasharray = len;

    const update = () =>
    {
        const p = window.scrollY / (document.body.scrollHeight - innerHeight);
        circle.style.strokeDashoffset = len * (1 - p);
        btn.classList.toggle('show', window.scrollY > 100);
    };

    addEventListener('scroll', update);
    addEventListener('resize', update);
    btn.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
    update();
})();

/**
 * Слайдер для сравнения скриншотов
 * Author: Polina "Aura" N.
 */

document.querySelectorAll('.slider-container').forEach(container => {
    const clip = container.querySelector('.slider-img-clip');
    const handle = container.querySelector('.slider-handle');
    const img = container.querySelector('.slider-img');
    let dragging = false;
    let isClick = false;

    const setSliderPosition = (clientX) => {
        const rect = container.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const pct = (x / rect.width) * 100;
        clip.style.width = pct + '%';
        handle.style.left = pct + '%';
    };

    const getX = (e) => e.touches ? e.touches[0].clientX : e.clientX;

    const startDrag = (e) => {
        dragging = true;
        isClick = true;
        document.body.style.userSelect = 'none';
        setSliderPosition(getX(e));
    };

    const stopDrag = () => {
        dragging = false;
        document.body.style.userSelect = '';
        // Сбрасываем флаг клика через небольшой таймаут
        setTimeout(() => { isClick = false; }, 10);
    };

    const onDrag = (e) => {
        if (dragging) {
            e.preventDefault();
            setSliderPosition(getX(e));
        }
    };

    // Перетаскивание с зажатой кнопкой на контейнере
    container.addEventListener('mousedown', (e) => {
        if (!e.target.closest('.slider-handle')) {
            startDrag(e);
        }
    });

    // Клик по контейнеру (если не было перетаскивания)
    container.addEventListener('click', (e) => {
        if (e.target.closest('.slider-handle')) return;
        if (isClick) {
            // Если это был клик без перетаскивания — перемещаем позицию
            setSliderPosition(getX(e));
        }
    });

    // События хендла (для обратной совместимости)
    handle.addEventListener('mousedown', startDrag);
    handle.addEventListener('touchstart', startDrag, { passive: true });

    // Глобальные события
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag, { passive: false });
});

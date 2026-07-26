/**
 * Слайдер для сравнения скриншотов
 * Author: Polina "Aura" N.
 */

document.querySelectorAll('.slider-container').forEach(container => {
    const clip = container.querySelector('.slider-img-clip');
    const handle = container.querySelector('.slider-handle');
    const img = container.querySelector('.slider-img'); // или любая обёртка картинки
    let dragging = false;

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
        document.body.style.userSelect = 'none';
        setSliderPosition(getX(e));
    };

    const stopDrag = () => {
        dragging = false;
        document.body.style.userSelect = '';
    };

    const onDrag = (e) => {
        if (dragging) {
            e.preventDefault();
            setSliderPosition(getX(e));
        }
    };

    // Клик по контейнеру (кроме хендла)
    container.addEventListener('click', (e) => {
        // Игнорируем клик по хендлу, чтобы не было конфликтов
        if (e.target.closest('.slider-handle')) return;
        setSliderPosition(getX(e));
    });

    // События хендла
    handle.addEventListener('mousedown', startDrag);
    handle.addEventListener('touchstart', startDrag, { passive: true });

    // Глобальные события
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag, { passive: false });
});

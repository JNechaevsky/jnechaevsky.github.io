document.querySelectorAll('.slider-container').forEach(container => {
    const clip = container.querySelector('.slider-img-clip');
    const handle = container.querySelector('.slider-handle');
    let dragging = false;

    function setSliderPosition(clientX) {
        const rect = container.getBoundingClientRect();
        let x = clientX - rect.left;
        x = Math.max(0, Math.min(x, rect.width));
        const pct = (x / rect.width) * 100;
        clip.style.width = pct + '%';
        handle.style.left = pct + '%';
    }

    function startDrag(e) {
        dragging = true;
        document.body.style.userSelect = 'none';
        if (e.type.startsWith('touch')) {
            setSliderPosition(e.touches[0].clientX);
        }
    }

    function stopDrag() {
        dragging = false;
        document.body.style.userSelect = '';
    }

    function onDrag(e) {
        if (!dragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        setSliderPosition(clientX);
    }

    handle.addEventListener('mousedown', startDrag);
    handle.addEventListener('touchstart', startDrag, { passive: true });

    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag, { passive: false });
});
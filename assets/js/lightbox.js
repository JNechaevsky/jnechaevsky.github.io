/**
 * Lightbox для скриншотов
 * Author: Polina "Aura" N.
 */

document.addEventListener('DOMContentLoaded', () => {
    const links = [...document.querySelectorAll('.screenshots a')];
    if (!links.length) return;

    let current = 0;
    let overlay = null;
    let wheelTimeout = null;
    let wheelTimeoutTime = 32;

    const createOverlay = () => {
        overlay = document.createElement('div');
        overlay.id = 'lightbox-overlay';
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <button class="lightbox-close" aria-label="Close">&times;</button>
            <button class="lightbox-prev" aria-label="Previous">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button class="lightbox-next" aria-label="Next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            <div class="lightbox-content">
                <img src="" alt="Screenshot" class="lightbox-img">
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.append(overlay);

        // Скрываем кнопки навигации, если картинка всего одна
        const prevBtn = overlay.querySelector('.lightbox-prev');
        const nextBtn = overlay.querySelector('.lightbox-next');
        if (links.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }

        // Делегирование событий на overlay
        overlay.addEventListener('click', e => {
            const target = e.target;
            if (target === overlay || target.closest('.lightbox-close')) close();
            if (target.closest('.lightbox-prev')) navigate(-1);
            if (target.closest('.lightbox-next')) navigate(1);
            if (target.closest('.lightbox-img')) close(); // клик по картинке
        });

        // Колёсико мыши
        overlay.addEventListener('wheel', e => {
            e.preventDefault();
            e.stopPropagation();
            if (wheelTimeout) return;
            const delta = e.deltaY;
            if (delta > 0) navigate(1);
            else if (delta < 0) navigate(-1);
            wheelTimeout = setTimeout(() => {
                wheelTimeout = null;
            }, wheelTimeoutTime);
        }, { passive: false });

        document.addEventListener('keydown', e => {
            if (overlay.style.display === 'none') return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        });
    };

    const navigate = (step) => {
        if (links.length <= 1) return; // если одна картинка — ничего не делаем
        current = (current + step + links.length) % links.length;
        updateImage();
    };

    const updateImage = () => {
        const link = links[current];
        const img = overlay?.querySelector('.lightbox-img');
        const caption = overlay?.querySelector('.lightbox-caption');
        if (!img) return;
        img.src = link.href;
        img.alt = link.querySelector('img')?.alt || 'Screenshot';
        
        // Показываем счётчик только если картинок больше одной
        if (links.length > 1) {
            caption.textContent = `Image ${current + 1} of ${links.length}`;
        } else {
            caption.textContent = '';
        }
    };

    const open = (index) => {
        if (!overlay) createOverlay();
        current = index;
        updateImage();
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    const close = () => {
        if (overlay) {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
            wheelTimeout = null;
        }
    };

    links.forEach((link, i) => {
        link.addEventListener('click', e => {
            e.preventDefault();
            open(i);
        });
    });
});

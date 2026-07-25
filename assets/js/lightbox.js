/**
 * Lightbox для скриншотов
 * Author: Polina "Aura" N.
 */

document.addEventListener('DOMContentLoaded', function () {
    // Собираем ВСЕ ссылки из ВСЕХ блоков .screenshots на странице в один массив
    const allLinks = Array.from(document.querySelectorAll('.screenshots a'));
    
    if (allLinks.length === 0) return;

    allLinks.forEach((link, index) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            openLightbox(index);
        });
    });

    let currentIndex = 0;

    function openLightbox(startIndex) {
        let overlay = document.getElementById('lightbox-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'lightbox-overlay';
            overlay.className = 'lightbox-overlay';
            
            overlay.innerHTML = `
                <button class="lightbox-close" aria-label="Close">
                    &times;
                </button>
                <button class="lightbox-prev" aria-label="Previous">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button class="lightbox-next" aria-label="Next">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                <div class="lightbox-content">
                    <img src="" alt="Screenshot" class="lightbox-img">
                    <div class="lightbox-caption"></div>
                </div>
            `;
            
            document.body.appendChild(overlay);

            overlay.addEventListener('click', function (e) {
                if (e.target === overlay || e.target.closest('.lightbox-close')) {
                    closeLightbox();
                }
            });

            overlay.querySelector('.lightbox-prev').addEventListener('click', function (e) {
                e.stopPropagation();
                currentIndex = (currentIndex - 1 + allLinks.length) % allLinks.length;
                updateLightboxImage();
            });

            overlay.querySelector('.lightbox-next').addEventListener('click', function (e) {
                e.stopPropagation();
                currentIndex = (currentIndex + 1) % allLinks.length;
                updateLightboxImage();
            });
        }

        currentIndex = startIndex;
        updateLightboxImage();
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function updateLightboxImage() {
        const img = document.querySelector('.lightbox-img');
        const caption = document.querySelector('.lightbox-caption');
        const link = allLinks[currentIndex];
        
        img.src = link.href;
        img.alt = link.querySelector('img') ? link.querySelector('img').alt : 'Screenshot';
        caption.textContent = `Image ${currentIndex + 1} of ${allLinks.length}`;
    }

    function closeLightbox() {
        const overlay = document.getElementById('lightbox-overlay');
        if (overlay) {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    document.addEventListener('keydown', function (e) {
        const overlay = document.getElementById('lightbox-overlay');
        if (!overlay || overlay.style.display === 'none') return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + allLinks.length) % allLinks.length;
            updateLightboxImage();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % allLinks.length;
            updateLightboxImage();
        }
    });
});

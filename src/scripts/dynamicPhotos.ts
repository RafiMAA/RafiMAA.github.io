/**
 * Dynamic Photos Module
 * Handles 3D Tilt, Glare, Multi-Photo Lightbox Gallery with Zoom/Nav,
 * Parallax stage effects, and Image Scroll Reveal animations.
 */

export interface GalleryItem {
  src: string;
  title: string;
  badge?: string;
  element?: HTMLElement;
}

let galleryItems: GalleryItem[] = [];
let currentGalleryIndex = 0;
let isZoomed = false;

export function initDynamicPhotos() {
  initTiltAndGlare();
  initGalleryItems();
  initLightboxHandlers();
  initHeroParallax();
  initImageRevealObserver();
}

/**
 * 3D Tilt and Specular Glare Effect
 */
function initTiltAndGlare() {
  const cards = document.querySelectorAll<HTMLElement>(
    '.project-media, .roll-card, .portrait-stage, .tech-card, .cv-card, [data-tilt]'
  );

  cards.forEach((card) => {
    // Add glare layer if not present
    if (!card.querySelector('.tilt-glare') && !card.classList.contains('portrait-stage')) {
      const glare = document.createElement('div');
      glare.className = 'tilt-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate angles (-12 deg to 12 deg)
      const rotateX = ((centerY - y) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      card.style.setProperty('--rotate-x', `${rotateX}deg`);
      card.style.setProperty('--rotate-y', `${rotateY}deg`);
      card.style.setProperty('--glare-x', `${glareX}%`);
      card.style.setProperty('--glare-y', `${glareY}%`);
      card.style.setProperty('--glare-opacity', '0.45');
      card.classList.add('is-tilting');
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rotate-x', '0deg');
      card.style.setProperty('--rotate-y', '0deg');
      card.style.setProperty('--glare-opacity', '0');
      card.classList.remove('is-tilting');
    });
  });
}

/**
 * Aggregate all gallery images on the page for multi-photo lightbox navigation
 */
export function initGalleryItems() {
  galleryItems = [];
  const triggers = document.querySelectorAll<HTMLElement>('[data-lightbox-trigger]');

  triggers.forEach((trigger) => {
    const src = trigger.getAttribute('data-lightbox-trigger');
    if (!src) return;
    const title = trigger.getAttribute('data-lightbox-title') || '';
    const badge = trigger.getAttribute('data-lightbox-badge') || '';
    
    // Assign gallery index to data attribute
    trigger.setAttribute('data-gallery-index', String(galleryItems.length));

    galleryItems.push({
      src,
      title,
      badge,
      element: trigger,
    });
  });

  updateGalleryCounterUI();
}

/**
 * Lightbox Navigation, Zoom, and Keyboard Control
 */
function initLightboxHandlers() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img') as HTMLImageElement | null;
  const modalCaption = document.getElementById('lightbox-caption');
  const modalBadge = document.getElementById('lightbox-badge');
  const modalCounter = document.getElementById('lightbox-counter');
  const backdrop = document.getElementById('lightbox-backdrop');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const zoomBtn = document.getElementById('lightbox-zoom');

  if (!modal) return;

  function updateLightboxView() {
    if (!modalImg || galleryItems.length === 0) return;
    const item = galleryItems[currentGalleryIndex];
    if (!item) return;

    modalImg.style.transform = 'scale(1)';
    isZoomed = false;
    if (zoomBtn) zoomBtn.classList.remove('active');

    modalImg.src = item.src;
    modalImg.alt = item.title;
    if (modalCaption) modalCaption.textContent = item.title;
    if (modalBadge) {
      modalBadge.textContent = item.badge || '';
      modalBadge.style.display = item.badge ? 'inline-block' : 'none';
    }
    if (modalCounter) {
      modalCounter.textContent = `${currentGalleryIndex + 1} / ${galleryItems.length}`;
    }
  }

  function openGalleryAtIndex(index: number) {
    if (galleryItems.length === 0) initGalleryItems();
    if (index < 0 || index >= galleryItems.length) return;
    currentGalleryIndex = index;
    updateLightboxView();
    modal?.classList.add('active');
    modal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal?.classList.remove('active');
    modal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (modalImg) modalImg.style.transform = 'scale(1)';
    isZoomed = false;
  }

  function nextImage() {
    if (galleryItems.length === 0) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    updateLightboxView();
  }

  function prevImage() {
    if (galleryItems.length === 0) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxView();
  }

  function toggleZoom() {
    if (!modalImg) return;
    isZoomed = !isZoomed;
    modalImg.style.transform = isZoomed ? 'scale(1.8)' : 'scale(1)';
    modalImg.style.cursor = isZoomed ? 'zoom-out' : 'zoom-in';
    if (zoomBtn) zoomBtn.classList.toggle('active', isZoomed);
  }

  // Click listener delegation for lightbox triggers
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('[data-lightbox-trigger]');
    if (target) {
      const idxAttr = target.getAttribute('data-gallery-index');
      if (idxAttr !== null) {
        e.preventDefault();
        openGalleryAtIndex(parseInt(idxAttr, 10));
      } else {
        const src = target.getAttribute('data-lightbox-trigger');
        if (src) {
          e.preventDefault();
          const matchIndex = galleryItems.findIndex((g) => g.src === src);
          openGalleryAtIndex(matchIndex >= 0 ? matchIndex : 0);
        }
      }
    }
  });

  backdrop?.addEventListener('click', closeLightbox);
  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', prevImage);
  nextBtn?.addEventListener('click', nextImage);
  zoomBtn?.addEventListener('click', toggleZoom);
  modalImg?.addEventListener('click', toggleZoom);

  // Keyboard navigation & touch swipe
  document.addEventListener('keydown', (e) => {
    if (!modal?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === '+' || e.key === '=') toggleZoom();
  });

  // Touch swipe support
  let touchStartX = 0;
  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) nextImage();
      else prevImage();
    }
  }, { passive: true });
}

function updateGalleryCounterUI() {
  const modalCounter = document.getElementById('lightbox-counter');
  if (modalCounter && galleryItems.length > 0) {
    modalCounter.textContent = `1 / ${galleryItems.length}`;
  }
}

/**
 * Mouse & Scroll Parallax for Hero stage photo elements
 */
function initHeroParallax() {
  const heroStage = document.querySelector('.hero-visual') as HTMLElement;
  const portrait = document.querySelector('.hero-portrait') as HTMLElement;
  const ring1 = document.querySelector('.ring-one') as HTMLElement;
  const ring2 = document.querySelector('.ring-two') as HTMLElement;
  const heroDark = document.querySelector('.hero-dark') as HTMLElement;

  if (!heroStage || !portrait) return;

  heroStage.addEventListener('mousemove', (e) => {
    const rect = heroStage.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    portrait.style.transform = `translate3d(${relX * 16}px, ${relY * 16}px, 0) scale(1.01)`;
    if (ring1) ring1.style.transform = `translate3d(${relX * -24}px, ${relY * -24}px, 0) rotate(${relX * 15}deg)`;
    if (ring2) ring2.style.transform = `translate3d(${relX * 30}px, ${relY * 30}px, 0) rotate(${relY * -20}deg)`;
    if (heroDark) heroDark.style.transform = `translate3d(${relX * -10}px, 0, 0)`;
  });

  heroStage.addEventListener('mouseleave', () => {
    portrait.style.transform = '';
    if (ring1) ring1.style.transform = '';
    if (ring2) ring2.style.transform = '';
    if (heroDark) heroDark.style.transform = '';
  });
}

/**
 * Scroll reveal observer for photo elements
 */
function initImageRevealObserver() {
  const photos = document.querySelectorAll('.project-media, .roll-card-media, .hero-visual');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('photo-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  photos.forEach((photo) => {
    photo.classList.add('photo-reveal-init');
    observer.observe(photo);
  });
}

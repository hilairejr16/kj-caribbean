/**
 * K&J Caribbean — Gallery & Lightbox
 * Reads window.GALLERY_DATA (set by data/gallery.js)
 * Renders grid + full-screen lightbox with keyboard/swipe navigation
 */
'use strict';

(function () {
  /* ── Config ──────────────────────────────────────────── */
  const SWIPE_THRESHOLD = 50; // px

  /* ── State ───────────────────────────────────────────── */
  let items        = [];
  let currentIndex = 0;
  let touchStartX  = 0;
  let isOpen       = false;

  /* ── DOM refs (created once) ─────────────────────────── */
  let lightbox, lbImg, lbVideo, lbCaption, lbCounter, lbClose, lbPrev, lbNext, lbOverlay;

  /* ─────────────────────────────────────────────────────── */
  function init(section) {
    const data = window.GALLERY_DATA?.[section];
    if (!data || !data.length) return;
    items = data;

    /* Render each gallery container marked with data-gallery="section" */
    document.querySelectorAll(`[data-gallery="${section}"]`).forEach(container => {
      container.innerHTML = '';
      container.classList.add('gallery-grid');

      data.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'gallery-card' + (item.featured ? ' gallery-card--featured' : '');
        card.setAttribute('data-index', idx);
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', item.alt);

        if (item.type === 'video') {
          card.innerHTML = `
            <div class="gallery-thumb">
              <img src="${item.thumbnail || item.file}" alt="${item.alt}" loading="lazy" decoding="async">
              <div class="gallery-play-btn" aria-hidden="true">▶</div>
            </div>
            <div class="gallery-cap">${item.caption || ''}</div>`;
        } else {
          card.innerHTML = `
            <div class="gallery-thumb">
              <img src="${item.file}" alt="${item.alt}" loading="lazy" decoding="async">
              <div class="gallery-zoom" aria-hidden="true">🔍</div>
            </div>
            <div class="gallery-cap">${item.caption || ''}</div>`;
        }

        card.addEventListener('click',   () => open(idx));
        card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(idx); });
        container.appendChild(card);
      });
    });

    buildLightbox();
  }

  /* ── Build lightbox DOM (once) ───────────────────────── */
  function buildLightbox() {
    if (document.getElementById('kj-lightbox')) return;

    lightbox = document.createElement('div');
    lightbox.id        = 'kj-lightbox';
    lightbox.className = 'kj-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image viewer');
    lightbox.innerHTML = `
      <div class="lb-overlay" id="lb-overlay"></div>
      <div class="lb-inner">
        <button class="lb-close" id="lb-close" aria-label="Close">✕</button>
        <button class="lb-arrow lb-prev" id="lb-prev" aria-label="Previous">‹</button>
        <div class="lb-media-wrap">
          <img  class="lb-img"   id="lb-img"   alt="" style="display:none">
          <video class="lb-video" id="lb-video" controls playsinline style="display:none"></video>
          <div class="lb-spinner" id="lb-spinner" aria-hidden="true"></div>
        </div>
        <button class="lb-arrow lb-next" id="lb-next" aria-label="Next">›</button>
        <div class="lb-footer">
          <div class="lb-caption" id="lb-caption"></div>
          <div class="lb-counter" id="lb-counter"></div>
        </div>
      </div>`;
    document.body.appendChild(lightbox);

    lbImg     = document.getElementById('lb-img');
    lbVideo   = document.getElementById('lb-video');
    lbCaption = document.getElementById('lb-caption');
    lbCounter = document.getElementById('lb-counter');
    lbClose   = document.getElementById('lb-close');
    lbPrev    = document.getElementById('lb-prev');
    lbNext    = document.getElementById('lb-next');
    lbOverlay = document.getElementById('lb-overlay');

    lbClose.addEventListener('click',   close);
    lbOverlay.addEventListener('click', close);
    lbPrev.addEventListener('click',    prev);
    lbNext.addEventListener('click',    next);

    /* Keyboard */
    document.addEventListener('keydown', e => {
      if (!isOpen) return;
      if (e.key === 'Escape')      close();
      if (e.key === 'ArrowLeft')   prev();
      if (e.key === 'ArrowRight')  next();
    });

    /* Touch/swipe */
    lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend',   e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > SWIPE_THRESHOLD) dx < 0 ? next() : prev();
    });
  }

  /* ── Open lightbox at index ──────────────────────────── */
  function open(idx) {
    currentIndex = idx;
    show(idx);
    lightbox.classList.add('lb-active');
    document.body.style.overflow = 'hidden';
    isOpen = true;
    lbClose.focus();
  }

  /* ── Close lightbox ──────────────────────────────────── */
  function close() {
    lightbox.classList.remove('lb-active');
    document.body.style.overflow = '';
    isOpen = false;
    if (lbVideo) { lbVideo.pause(); lbVideo.src = ''; }
  }

  /* ── Navigate ─────────────────────────────────────────── */
  function prev() { show((currentIndex - 1 + items.length) % items.length); }
  function next() { show((currentIndex + 1) % items.length); }

  /* ── Show item in lightbox ───────────────────────────── */
  function show(idx) {
    currentIndex = idx;
    const item   = items[idx];
    const spinner = document.getElementById('lb-spinner');

    lbPrev.style.display = items.length > 1 ? '' : 'none';
    lbNext.style.display = items.length > 1 ? '' : 'none';
    lbCaption.textContent = item.caption || '';
    lbCounter.textContent = `${idx + 1} / ${items.length}`;

    if (item.type === 'video') {
      lbImg.style.display   = 'none';
      lbVideo.style.display = '';
      spinner.style.display = '';
      lbVideo.src = item.file;
      lbVideo.oncanplay = () => { spinner.style.display = 'none'; };
    } else {
      lbVideo.pause();
      lbVideo.style.display = 'none';
      lbImg.style.display   = 'none';
      spinner.style.display = '';
      const img = new Image();
      img.onload = () => {
        lbImg.src           = item.file;
        lbImg.alt           = item.alt;
        lbImg.style.display = '';
        spinner.style.display = 'none';
      };
      img.src = item.file;
    }
  }

  /* ── Public API ──────────────────────────────────────── */
  window.KJGallery = { init };

  /* ── Auto-init on DOM ready ──────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    if (window.GALLERY_DATA) {
      Object.keys(window.GALLERY_DATA).forEach(section => KJGallery.init(section));
    }
  });
})();

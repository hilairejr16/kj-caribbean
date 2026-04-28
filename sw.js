/**
 * K&J Caribbean — Service Worker
 * Provides offline support and fast load via cache.
 * CACHE_NAME is bumped automatically by scripts/build.js on every build.
 */
'use strict';

const CACHE_NAME = 'kj-v1777417734';

const PRECACHE = [
  './',
  './index.html',
  './menu.html',
  './about.html',
  './contact.html',
  './css/style.css',
  './js/i18n.js',
  './js/main.js',
  './js/gallery.js',
  './data/gallery.js',
  './logo/logo.svg',
  './logo/logo-old.jpeg',
];

/* ── Install: pre-cache core shell ─────────────────────── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: delete old caches ────────────────────────── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch: network-first for HTML, cache-first for assets */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin requests
  if (request.method !== 'GET' || url.origin !== location.origin) return;

  const isHTML     = request.headers.get('accept')?.includes('text/html');
  const isImage    = /\.(jpe?g|png|webp|gif|svg)(\?.*)?$/.test(url.pathname);
  const isCSSorJS  = /\.(css|js)(\?.*)?$/.test(url.pathname);

  if (isHTML) {
    // Network-first for HTML (always fresh content)
    event.respondWith(
      fetch(request)
        .then(res => { caches.open(CACHE_NAME).then(c => c.put(request, res.clone())); return res; })
        .catch(() => caches.match(request))
    );
  } else if (isImage || isCSSorJS) {
    // Cache-first for static assets (versioned via ?v=)
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(res => {
        caches.open(CACHE_NAME).then(c => c.put(request, res.clone()));
        return res;
      }))
    );
  }
});

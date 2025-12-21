const CACHE_NAME = 'bedas-serve-v7';
const ASSETS = [
  '/',
  '/index.html',
  '/chat.html',
  '/admin.html',
  '/offline.html',
  '/styles.css',
  '/db-service.js',
  '/firebase-config.js',
  '/data-services.js',
  '/images/ikon.png',
  '/images/logo pemkab.png',
  '/images/kecamatan.png',
  '/images/camat.png',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap',
  'https://unpkg.com/mammoth/mammoth.browser.min.js',
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js',
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics-compat.js'
];

// Install Service Worker
self.addEventListener('install', event => {
  self.skipWaiting(); // Force activation
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(ASSETS);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim()) // Take control immediately
  );
});

// Stale-While-Revalidate Strategy for most content
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // Skip non-GET requests
  if (req.method !== 'GET') return;

  event.respondWith((async () => {
    // 1. Favicon special case
    if (url.pathname.endsWith('/favicon.ico')) {
      try {
        return await caches.match('/images/ikon.png') || await fetch('/images/ikon.png');
      } catch (_) {
        return new Response('', { status: 204 });
      }
    }

    // 2. Network-first for HTML (ensure fresh content)
    if (req.mode === 'navigate') {
      try {
        const networkResponse = await fetch(req);
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, networkResponse.clone());
        return networkResponse;
      } catch (error) {
        const cachedResponse = await caches.match(req);
        if (cachedResponse) return cachedResponse;
        return caches.match('/offline.html');
      }
    }

    // 3. Stale-While-Revalidate for other assets (CSS, JS, Images)
    const cachedResponse = await caches.match(req);
    const networkFetch = fetch(req).then(response => {
      // Update cache asynchronously
      if (response.ok) {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, responseClone));
      }
      return response;
    }).catch(() => {
      // If network fails, we rely entirely on cache (handled below)
    });

    return cachedResponse || networkFetch;
  })());
});

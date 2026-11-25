const CACHE_NAME = 'eco-app-v3';

// ВАЖНО: все пути ОТНОСИТЕЛЬНЫЕ (./), а не абсолютные (/)
const urlsToCache = [
  './',
  './index.html',
  './tf.min.js',
  './tm-image.min.js',
  './model.json',
  './metadata.json',
  './weights.bin',
  './manifest.json',
  './icon-192.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.error('Кэш не создан:', err))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

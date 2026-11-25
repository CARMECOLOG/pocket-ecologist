const CACHE_NAME = 'eco-app-v1';
const urlsToCache = [
  '.',
  '.index.html',
  '.tf.min.js',
  '.tm-image.min.js',
  '.model.json',
  '.metadata.json',
  '.weights.bin'
];

self.addEventListener('install', event = {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache = cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event = {
  event.respondWith(
    caches.match(event.request)
      .then(response = response  fetch(event.request))
  );
});
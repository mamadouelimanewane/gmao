// Simple Service Worker pour simuler le mode hors-ligne
const CACHE_NAME = 'gmao-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Pour une vraie app, on listerait les assets ici
      return cache.addAll(['/']);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retourne le cache si trouvé, sinon fetch le réseau
      return response || fetch(event.request).catch(() => {
        // En cas d'échec (hors-ligne complet), renvoyer une page générique
        return caches.match('/');
      });
    })
  );
});

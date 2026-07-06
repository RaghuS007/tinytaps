const CACHE = 'tinytaps-v8';
const ASSETS = [
  '/',
  '/play',
  '/tips',
  '/about',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // never cache the presence worker

  // Map incoming requests to the cached clean URLs
  let requestToMatch = e.request;
  
  if (url.pathname === '/index.html') {
    requestToMatch = '/';
  } else if (url.pathname.endsWith('.html')) {
    const cleanPath = url.pathname.slice(0, -5);
    if (['/play', '/tips', '/about'].includes(cleanPath)) {
      requestToMatch = cleanPath;
    }
  }

  e.respondWith(
    caches.match(requestToMatch).then(hit => {
      if (hit) return hit;
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => {
        return caches.match('/play').then(fallback => {
          return fallback || Response.error();
        });
      });
    })
  );
});

const CACHE = 'tinytaps-v9';
const ASSETS = [
  '/',
  '/index.html',
  '/play.html',
  '/tips.html',
  '/about.html',
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

  let path = url.pathname;

  // Normalise clean URLs and HTML extensions
  if (path === '/' || path === '/index.html') {
    path = '/index.html';
  } else if (path === '/play' || path === '/play.html') {
    path = '/play.html';
  } else if (path === '/tips' || path === '/tips.html') {
    path = '/tips.html';
  } else if (path === '/about' || path === '/about.html') {
    path = '/about.html';
  }

  e.respondWith(
    caches.match(path).then(hit => {
      if (hit) return hit;
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => {
        return caches.match('/play.html').then(fallback => {
          return fallback || Response.error();
        });
      });
    })
  );
});

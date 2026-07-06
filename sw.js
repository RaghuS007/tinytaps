const CACHE = 'tinytaps-v6';
const ASSETS = ['/', '/index.html', '/play.html', '/tips.html', '/about.html', '/manifest.json', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // never cache the presence worker

  // Handle Cloudflare Pages clean URLs (e.g. /play -> /play.html)
  let requestToMatch = e.request;
  if (!url.pathname.endsWith('.html') && url.pathname !== '/' && !url.pathname.includes('.')) {
    requestToMatch = url.pathname + '.html';
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
        return caches.match('/play.html').then(fallback => {
          return fallback || Response.error();
        });
      });
    })
  );
});


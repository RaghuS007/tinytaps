const CACHE = 'tinytaps-v10';
const isLocal = location.hostname === 'localhost' || 
                location.hostname === '127.0.0.1' || 
                location.hostname.startsWith('192.168.') || 
                location.hostname.startsWith('10.') || 
                location.hostname.startsWith('127.') || 
                location.hostname.endsWith('.local') ||
                location.hostname === '[::1]';

const ASSETS = [
  '/',
  ...(isLocal ? ['/index.html', '/play.html', '/tips.html', '/about.html'] : ['/play', '/tips', '/about']),
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

  // Normalise clean URLs and HTML extensions based on environment
  if (isLocal) {
    if (path === '/') path = '/index.html';
    else if (path === '/play') path = '/play.html';
    else if (path === '/tips') path = '/tips.html';
    else if (path === '/about') path = '/about.html';
  } else {
    if (path === '/index.html') path = '/';
    else if (path === '/play.html') path = '/play';
    else if (path === '/tips.html') path = '/tips';
    else if (path === '/about.html') path = '/about';
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
        return caches.match(isLocal ? '/play.html' : '/play').then(fallback => {
          return fallback || Response.error();
        });
      });
    })
  );
});

// A robust service worker for caching and immediate updates.

const CACHE_NAME = 'li-khit-rak-tam-nak-ong-v10'; // Incremented version

// List of all critical assets for a complete offline experience.
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/index.js',
    '/manifest.json',
    // External libraries
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;700&family=Noto+Serif+SC:wght@400;700&display=swap',
    // Backgrounds & UI
    'https://i.pinimg.com/1200x/0c/de/4d/0cde4d4cab4e7698588cd4a159a3ca91.jpg',
    'https://i.pinimg.com/1200x/31/0f/20/310f20cb39721c28cda2030be926ab3f.jpg',
    'https://i.pinimg.com/736x/e2/0a/3e/e20a3e1c0ee9777d3f6d4e9a6c23e866.jpg',
    'https://i.pinimg.com/736x/bb/85/38/bb85382d6b2ba84d36451e3d73f1bfe0.jpg',
    // Manifest icons
    'https://i.pinimg.com/736x/c9/e6/84/c9e684351898287808f2eeb5aedb24b2.jpg',
    // Character creation appearance options
    'https://i.pinimg.com/736x/45/86/20/4586206a57395fdb87c9ef8c2f216832.jpg',
    'https://i.pinimg.com/1200x/be/96/bf/be96bf326261afccdd1e239d1611986c.jpg',
    'https://i.pinimg.com/1200x/8e/5e/45/8e5e455787215813b3a6dd38baa5db60.jpg',
    'https://i.pinimg.com/736x/04/9c/54/049c544049c7fe186f78d5c7517a1fd3.jpg',
    'https://i.pinimg.com/736x/16/eb/e8/16ebe86d3b7d8e5c296be25678dbc907.jpg',
    'https://i.pinimg.com/736x/31/07/aa/3107aa3e7249222d86198a4b055568f5.jpg',
    'https://i.pinimg.com/736x/a7/2f/3f/a72f3f131d5af2d3d1b8900d1ac2b350.jpg',
    'https://i.pinimg.com/1200x/07/d6/6b/07d66b02800eed6016866b0b0f139e4c.jpg',
    // Initial NPC images
    'https://i.pinimg.com/736x/67/6e/61/676e618cc4ae65d8b7e14b5ce0c83a44.jpg',
    'https://i.pinimg.com/1200x/a0/ad/90/a0ad90a581a84b4dca2e210011ab3072.jpg',
    'https://i.pinimg.com/736x/cf/14/58/cf145830278fb3cae8df9c289af6f409.jpg',
    'https://i.pinimg.com/736x/67/e2/e4/67e2e4d6c9a08c29e3465704bf697cd4.jpg',
    'https://i.pinimg.com/1200x/0f/ed/13/0fed13c3f250db9dfbaf27fa5b35107b.jpg',
    'https://i.pinimg.com/736x/b4/0a/7a/b40a7a86660650869fad9d12c2857a71.jpg',
    'https://i.pinimg.com/736x/2c/6b/fd/2c6bfd8590e193da8790d7ff65ee5510.jpg',
    'https://i.pinimg.com/736x/6f/cf/0b/6fcf0b3a97a61c3fb5fac826fafea8e7.jpg',
    'https://i.pinimg.com/1200x/bb/30/e8/bb30e87098854989a9587a65473b9b98.jpg',
    'https://i.pinimg.com/1200x/44/db/9d/44db9ddca641d6340ed4b52919f770f1.jpg',
    'https://i.pinimg.com/736x/ab/f8/84/abf884bee699d72207ed27386c8ec396.jpg',
    'https://i.pinimg.com/1200x/16/44/97/164497cea2841c88d578d5015e20c6c2.jpg',
    'https://i.pinimg.com/1200x/08/f3/4b/08f34bbfb02c8c8ca2a229bf46a1d47d.jpg',
    'https://i.pinimg.com/736x/cc/78/96/cc7896f29cedeabe6027f89d794463b8.jpg',
    'https://i.pinimg.com/1200x/c3/cf/ea/c3cfea3d5ab66f1931c2420499516da1.jpg',
    'https://i.pinimg.com/736x/99/90/af/9990af412e3c75d81d1a30187209b296.jpg',
    'https://i.pinimg.com/736x/61/20/67/612067add569d94a40c0d8bcc4201a66.jpg',
    'https://i.pinimg.com/736x/9a/ba/29/9aba29b7e52cfd3361986ace020fcc03.jpg',
    'https://i.pinimg.com/1200x/73/3d/75/733d75e0d7d3ee0a3534ce234b792af3.jpg',
    'https://i.pinimg.com/736x/54/ab/05/54ab05f1d49a7b280009b7d4ba0aa139.jpg',
    'https://i.pinimg.com/736x/3d/aa/b7/3daab79ab15e697d73f7bc82efacb8a9.jpg',
    'https://i.pinimg.com/736x/dc/5b/f1/dc5bf15c37b5e0c3a7a41e340366b8e1.jpg',
    'https://i.pinimg.com/736x/c0/3a/1f/c03a1f726177a2404c9effb8bb45b241.jpg',
    'https://i.pinimg.com/736x/e1/11/1f/e1111f29c62ff917d9b22bce464b3f9d.jpg',
    'https://i.pinimg.com/1200x/86/27/22/862722b319cd10818ce1b4d041b9f59e.jpg',
    'https://i.pinimg.com/1200x/05/f4/17/05f417142740c995f0fd719a42595010.jpg',
    'https://i.pinimg.com/1200x/1c/8b/67/1c8b6718f414c4cd5de6c6b727412a23.jpg',
    'https://i.pinimg.com/1200x/e7/1f/5c/e71f5cccd93adf83dce5b7eedeb3fc44.jpg',
    'https://i.pinimg.com/736x/d8/74/f9/d874f925ce3bbcc41e6563f27a6131b6.jpg',
    'https://i.pinimg.com/736x/9f/c5/a6/9fc5a6ebb7ddf7b3c5b78e9aff1324e6.jpg',
    'https://i.pinimg.com/736x/ba/a6/38/baa638945b969f869fdd6f994582abbc.jpg',
    'https://i.pinimg.com/1200x/ee/53/a3/ee53a372562368f6bb77eafba99a56fc.jpg',
    'https://i.pinimg.com/1200x/28/25/96/2825963ddff5956b46d34a602c4de6b2.jpg',
    'https://i.pinimg.com/736x/c9/29/9d/c9299d7d3a53aeba7f2f68509ce90ef4.jpg',
];

// Install event: precache the essential app shell.
self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching all critical assets for offline use');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => {
      // Force the waiting service worker to become the active service worker.
      return (self as any).skipWaiting();
    })
  );
});

// Activate event: clean up old caches and take control of clients.
self.addEventListener('activate', (event: any) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all open pages without waiting for a reload.
      return (self as any).clients.claim();
    })
  );
});

// Fetch event: serve from cache first, then network, then cache the result (cache-first strategy).
self.addEventListener('fetch', (event: any) => {
  if (event.request.method !== 'GET') {
    return;
  }
    
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // If the resource is in cache, return it.
        if (response) {
          return response;
        }

        // If not in cache, fetch from the network.
        return fetch(event.request).then(
          (networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                // Do not cache requests to the Gemini API.
                if (!event.request.url.includes('generativelanguage')) {
                    cache.put(event.request, responseToCache);
                }
              });
            return networkResponse;
          }
        ).catch(() => {
          // Offline fallback for non-cached resources
        });
      })
    );
});
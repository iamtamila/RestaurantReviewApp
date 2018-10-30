const cacheName ='v1';

const cacheAssets = [
  'index.html',
  'restaurant.html',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js'
]

/*Install event*/
self.addEventListener('install', event => {
  console.log("SW installed");
  event.waitUntil(
    caches
    .open(cacheName)
    .then(cache => {
      console.log('SW caching files');
      cache.addAll(cacheAssets);
    })
    .then(() => self.skipWaiting())
  );
});

/*Activate event*/
self.addEventListener('activate', event => {
  console.log('SW activated');
  event.waitUntil(
    caches.keys()
    .then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache!==cacheName) {
            console.log("SW clear old cache");
            return caches.delete(cache);
          }
        })
      )
    })
  )
})

//Call fetch event
self.addEventListener('fetch', event => {
  console.log("SW fetching");
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request)));
  });

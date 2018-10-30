const cacheName ='v2';

/*Install event*/
self.addEventListener('install', event => {
  console.log("SW installed");
  .then(() => self.skipWaiting())
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
    fetch(event.request)
    .then(res=> {
      /*make copy(clone)of response*/
      const resClone = res.clone();
      /*open*/
      caches
      .open(cacheName)
      .then(cache => {
        //Add the response to the cache
        cache.put(event.request, resClone);
      });
      return res;
    }).catch(err => caches.match(event.request).then(res => res))
  );
});

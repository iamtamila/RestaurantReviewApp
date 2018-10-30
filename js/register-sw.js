//check if the browser supports Service Worker
if ('serviceWorker' in navigator)
{
  navigator.serviceWorker.register('/sw_cached_pages.js').then(function(reg) {
    console.log("Service Worker has been registered");
  }).catch((e) => {
    console.log("Couldn't register service worker... \n", e);
  });
}

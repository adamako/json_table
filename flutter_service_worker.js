'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "d5219301e528f34d3aded3c3544b5ee9",
"/": "d5219301e528f34d3aded3c3544b5ee9",
"main.dart.js": "bf83d9546b2f9b99b26745fc87d7ee94",
"assets/LICENSE": "cec423634fc8fc8b38102cc1994f32f6",
"assets/AssetManifest.json": "5a2fdb346a2ee8a2bc2390ca739d716d",
"assets/FontManifest.json": "01700ba55b08a6141f33e168c4a6c22f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "9a62a954b81a1ad45a58b9bcea89b50b",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/assets/countries.json": "ea6e9bd414ed0de188f3376a52ae60e3"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

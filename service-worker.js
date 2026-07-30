const CACHE_NAME = 'abrahangs-v5';
const urlsToCache = [
    './',
    './hang-workout.html',
    './history.html',
    './css/hang-workout.css',
    './css/history.css',
    './js/hang-workout.js',
    './js/history.js',
    './pictures/Hang 1.JPG',
    './pictures/Hang 2.JPG',
    './pictures/Hang 3.JPG',
    './pictures/Hang 4.JPG',
    './pictures/Hang 5.JPG',
    './pictures/Hang 6.JPG',
    './manifest.json',
    './sounds/8-bit Countdown.mp3',
    './sounds/Race Start Beeps.mp3',
    './sounds/Short Beep Countdown.mp3'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

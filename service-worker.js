const CACHE_NAME = 'abrahangs-v8';
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
    './sounds/Short Beep Countdown.mp3',
    './sounds/Short Beep.mp3'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(async cache => {
                // Attempt to cache each resource but don't fail the install
                // if one or more resources cannot be cached (network errors / 404s).
                const results = await Promise.allSettled(
                    urlsToCache.map(url => cache.add(url).catch(err => {
                        console.warn('Failed to cache', url, err);
                        return null;
                    }))
                );
                return results;
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
            const toDelete = cacheNames.filter(name => name !== CACHE_NAME);
            return Promise.all(toDelete.map(name => caches.delete(name)));
        })
    );
});

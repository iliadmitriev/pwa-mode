const staticCacheName = 'static-app-v1'

const assetsUrls = [
    '/index.html',
    '/404.html',
    '/js/app.js',
    '/style/main.css',
    '/icons/icon-192x192.png',
    '/icons/icon-256x256.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png'
]

self.addEventListener('install', async event => {
    event.waitUntil(
        caches.open(staticCacheName).then(
            cache => cache.addAll(assetsUrls)
        )
    )
})

self.addEventListener('activate', async event => {
    console.log('activate')
})

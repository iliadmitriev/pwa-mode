const staticCacheName = 'static-app-v1'
const dynamicCacheName = 'dynamic-app-v2'

const assetsUrls = [
    '/',
    '/404.html',
    '/offline.html',
    '/js/app.js',
    '/style/main.css',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-256x256.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png'
]

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName)
    await cache.addAll(assetsUrls)
})

self.addEventListener('activate', async event => {
    const cacheKeys = await caches.keys()
    await Promise.all(
        cacheKeys
            .filter(name => name !== staticCacheName)
            .filter(name => name !== dynamicCacheName)
            .map(name => caches.delete(name))
    )

})

self.addEventListener('fetch', async event => {
    const {request} = event
    const url = new URL(request.url)

    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request))
    } else {
        event.respondWith(networkFirst(request))
    }
})

async function cacheFirst(request) {
    const cached = await caches.match(request)
    try {
        return cached ?? await fetch(request)
    } catch (e) {
        return await caches.match('/offline.html')
    }
}

async function networkFirst(request) {
    const cache = await caches.open(dynamicCacheName)
    try {
        const response = await fetch(request)
        await cache.put(request, response.clone())
        return response
    } catch (e) {
        const cached = await cache.match(request)
        return cached ?? await caches.match('/offline.html')
    }
}
const DATA_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=10';

window.addEventListener('load', async () => {

    if ('serviceWorker' in navigator) {
        try {
            const reg = await navigator.serviceWorker.register('/sw.js')
            console.log('Registered service worker', reg.active.scriptURL)
        } catch (e) {
            console.log('Could not register service worker', e)
        }
    } else {
        console.log('serviceWorker is not supported by your browser')
    }

    await loadPosts()
})


const toCard = (post) => `
<div class="card">
    <div class="card-title">
        ${post.title}   
    </div>
    <div class="card-body">
        ${post.body}
    </div>
</div>
`

async function loadPosts() {
    const response = await fetch(DATA_URL)
    const data = await response.json()

    const container = document.querySelector('#posts')
    container.innerHTML = data.map(toCard).join('\n')
}
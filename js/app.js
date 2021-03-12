window.addEventListener('load', async () => {
    await loadPosts()
})

    const DATA_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=10';

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
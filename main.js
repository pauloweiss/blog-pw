// Lista de posts (pode ser expandida)
const posts = [
{ file: 'posts/sample-post.md', title: 'Meu Primeiro Artigo' },
{ file: 'posts/meu-segundo-post.md', title: 'Meu Segundo Artigo' }
];
// Função para carregar e renderizar posts
async function loadPosts(query = '') {
postsContainer.innerHTML = '';
for (const post of posts) {
try {
const response = await fetch(post.file);
if (!response.ok) throw new Error('Erro ao carregar post');
const markdown = await response.text();
const html = marked.parse(markdown);
if (post.title.toLowerCase().includes(query.toLowerCase()) ||
markdown.toLowerCase().includes(query.toLowerCase())) {
const postElement = document.createElement('article');
postElement.classList.add('post');
postElement.innerHTML = `
<h3>${post.title}</h3>
${html}
`;
postsContainer.appendChild(postElement);
}
} catch (error) {
console.error(`Erro ao carregar ${post.file}:`, error);}
}
}
// Carregar posts ao iniciar
loadPosts();
// Adicionar evento de busca
searchBar.addEventListener('input', (e) => {
loadPosts(e.target.value);
});

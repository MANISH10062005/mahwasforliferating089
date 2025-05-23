const form = document.getElementById('add-form');
const list = document.getElementById('list');
let manhwas = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const rating = parseInt(document.getElementById('rating').value);
  const desc = document.getElementById('desc').value;

  manhwas.push({ title, rating, desc });
  renderList();
  form.reset();
});

function renderList() {
  list.innerHTML = '';
  manhwas.sort((a, b) => b.rating - a.rating);
  manhwas.forEach(m => {
    const el = document.createElement('div');
    el.className = 'manhwa';
    el.innerHTML = `
      <h3>${m.title}</h3>
      <p>${m.desc}</p>
      <div class="stars">Rating: ${'⭐'.repeat(m.rating)}</div>
    `;
    list.appendChild(el);
  });
}
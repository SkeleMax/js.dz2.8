import './style.css';
import { products } from '../data.js';
import { productCardTemplate } from './product-card.js';

// ==========================================
// 1. ЛОГИКА ДЛЯ ЗАКЛАДОК (С ЛОКАЛСТОРИДЖЕМ)
// ==========================================
const bookmarkInput = document.querySelector('#bookmarkInput');
const addBookmarkBtn = document.querySelector('#addBookmarkBtn');
const bookmarkList = document.querySelector('#bookmarkList');

let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

function renderBookmarks() {
  bookmarkList.innerHTML = bookmarks.map((url, index) => `
    <li>
      <a href="${url}" target="_blank">${url}</a>
      <button class="delete-btn" data-index="${index}">X</button>
    </li>
  `).join('');
}

addBookmarkBtn.addEventListener('click', () => {
  const url = bookmarkInput.value.trim();
  if (url) {
    bookmarks.push(url);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
    bookmarkInput.value = '';
  }
});

bookmarkList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const index = Number(e.target.dataset.index);
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
  }
});

renderBookmarks();

// ==========================================
// 2. ЛОГИКА ДЛЯ ФОРМЫ (СОХРАНЕНИЕ ДАННЫХ)
// ==========================================
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const saveBtn = document.querySelector('#saveBtn');

usernameInput.value = localStorage.getItem('username') || '';
passwordInput.value = localStorage.getItem('password') || '';

saveBtn.addEventListener('click', () => {
  localStorage.setItem('username', usernameInput.value);
  localStorage.setItem('password', passwordInput.value);
  alert('Дані успішно збережено в localStorage!');
});

// ==========================================
// 3. ЛОГИКА ПРОДУКТОВ + ПОИСК / ФИЛЬТРАЦИЯ
// ==========================================
let currentProducts = [...products];
const productListEl = document.querySelector('#product-list');
const productFormEl = document.querySelector('#product-form');
const searchInput = document.querySelector('#searchInput');

function renderProducts(filteredProducts = currentProducts) {
  const markup = filteredProducts.map(product => productCardTemplate(product)).join('');
  productListEl.innerHTML = markup;
}

// Фильтрация продуктов по названию (Пункт 10)
searchInput.addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase().trim();
  const filtered = currentProducts.filter(product => 
    product.name.toLowerCase().includes(query)
  );
  renderProducts(filtered);
});

productFormEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = event.target.elements.name.value;
  const price = event.target.elements.price.value;
  const description = event.target.elements.description.value;

  const newProduct = {
    id: Date.now(),
    name,
    price: Number(price),
    description,
  };

  currentProducts.push(newProduct);
  renderProducts();
  productFormEl.reset();
  searchInput.value = '';
});

productListEl.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const parentLi = event.target.closest('.product-item');
    const productId = Number(parentLi.dataset.id);

    currentProducts = currentProducts.filter(product => product.id !== productId);
    renderProducts();
  }
});

renderProducts();
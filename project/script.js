'use strict';

class Book {
  constructor(title, author, year, genre, pages, isRead) {
    this.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
    this.title = title;
    this.author = author;
    this.year = Number(year);
    this.genre = genre;
    this.pages = Number(pages);
    this.isRead = Boolean(isRead);
    this.addedAt = new Date().toISOString();
  }

  getInfo() {
    const status = this.isRead ? 'прочитана' : 'не прочитана';
    return `«${this.title}» — ${this.author}, ${this.year} рік, ${this.genre}, ${this.pages} стор. (${status})`;
  }

  getAddedDateLabel() {
    const d = new Date(this.addedAt);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  }
}

const STORAGE_KEY = 'home-library-books';

let books = [];

function saveBooksToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function loadBooksFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return parsed.map((b) => {
      const book = new Book(b.title, b.author, b.year, b.genre, b.pages, b.isRead);
      book.id = b.id;
      book.addedAt = b.addedAt;
      return book;
    });
  } catch (e) {
    console.error('Не вдалося розпарсити localStorage:', e);
    return [];
  }
}

const form = document.getElementById('book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
const pagesInput = document.getElementById('pages');
const genreInput = document.getElementById('genre');
const isReadInput = document.getElementById('isRead');

const errorTitle = document.getElementById('error-title');
const errorAuthor = document.getElementById('error-author');
const errorYear = document.getElementById('error-year');
const errorPages = document.getElementById('error-pages');

const tbody = document.getElementById('books-tbody');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search-input');

const statTotal = document.getElementById('stat-total');
const statRead = document.getElementById('stat-read');
const statUnread = document.getElementById('stat-unread');

const loadBooksBtn = document.getElementById('load-books-btn');
const loadingMsg = document.getElementById('loading-msg');
const postsTable = document.getElementById('posts-table');
const postsTbody = document.getElementById('posts-tbody');

const toastEl = document.getElementById('toast');

const RE_AUTHOR =
/^[A-Za-zА-Яа-яІіЇїЄєҐґ\s]+$/u;
const RE_DIGITS_ONLY = /^\d+$/;
const MIN_YEAR = 1900;

function validateTitle(value) {
  const trimmed = value.trim();
  if (trimmed.length < 3) {
    return 'Назва повинна містити не менше 3 символів.';
  }
  return '';
}

function validateAuthor(value) {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return "Вкажіть автора книги.";
  }
  if (!RE_AUTHOR.test(trimmed)) {
    return 'Автор повинен містити лише літери та пробіли.';
  }
  return '';
}

function validateYear(value) {
  const trimmed = value.trim();
  const currentYear = new Date().getFullYear();
  if (!RE_DIGITS_ONLY.test(trimmed)) {
    return 'Рік видання повинен бути числом.';
  }
  const yearNum = Number(trimmed);
  if (yearNum < MIN_YEAR || yearNum > currentYear) {
    return `Рік має бути в межах від ${MIN_YEAR} до ${currentYear}.`;
  }
  return '';
}

function validatePages(value) {
  const trimmed = value.trim();
  if (!RE_DIGITS_ONLY.test(trimmed)) {
    return 'Кількість сторінок повинна бути числом.';
  }
  const pagesNum = Number(trimmed);
  if (pagesNum <= 0) {
    return 'Кількість сторінок повинна бути більшою за 0.';
  }
  return '';
}

function setFieldError(inputEl, errorEl, message) {
  errorEl.textContent = message;
  inputEl.classList.toggle('invalid', Boolean(message));
}

function renderBooks() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = query
    ? books.filter((book) => book.title.toLowerCase().includes(query))
    : books;

  tbody.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.hidden = false;
    emptyState.textContent = query
      ? `Нічого не знайдено за запитом «${query}».`
      : "Тут поки порожньо. Додай першу книгу зліва — вона з'явиться на полиці.";
  } else {
    emptyState.hidden = true;
  }

  filtered.forEach((book) => {
    const tr = document.createElement('tr');

    const statusBadgeClass = book.isRead ? 'status-read' : 'status-unread';
    const statusLabel = book.isRead ? 'Прочитана' : 'Не прочитана';

    tr.innerHTML = `
      <td class="book-title-cell">${escapeHtml(book.title)}</td>
      <td>${escapeHtml(book.author)}</td>
      <td class="meta-cell">${book.year}</td>
      <td>${escapeHtml(book.genre)}</td>
      <td class="meta-cell">${book.pages}</td>
      <td><span class="status-badge ${statusBadgeClass}">${statusLabel}</span></td>
      <td class="meta-cell">${book.getAddedDateLabel()}</td>
      <td>
        <div class="row-actions">
          ${book.isRead ? '' : `<button type="button" class="btn-done" data-action="read" data-id="${book.id}">Прочитано</button>`}
          <button type="button" class="btn-ribbon" data-action="delete" data-id="${book.id}">Видалити</button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });

  renderStats();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderStats() {
  const total = books.length;
  const read = books.filter((b) => b.isRead).length;
  const unread = total - read;

  statTotal.textContent = total;
  statRead.textContent = read;
  statUnread.textContent = unread;
}

let toastTimeout = null;

function showToast(message, type = 'default') {
  toastEl.textContent = message;
  toastEl.className = 'toast show';
  if (type === 'error') toastEl.classList.add('error');
  if (type === 'success') toastEl.classList.add('success');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2600);
}

function handleFormSubmit(event) {
  event.preventDefault();

  const titleVal = titleInput.value;
  const authorVal = authorInput.value;
  const yearVal = yearInput.value;
  const pagesVal = pagesInput.value;

  const titleErr = validateTitle(titleVal);
  const authorErr = validateAuthor(authorVal);
  const yearErr = validateYear(yearVal);
  const pagesErr = validatePages(pagesVal);

  setFieldError(titleInput, errorTitle, titleErr);
  setFieldError(authorInput, errorAuthor, authorErr);
  setFieldError(yearInput, errorYear, yearErr);
  setFieldError(pagesInput, errorPages, pagesErr);

  if (titleErr || authorErr || yearErr || pagesErr) {
    showToast('Перевірте поля форми — є помилки.', 'error');
    return;
  }

  const newBook = new Book(
    titleVal.trim(),
    authorVal.trim(),
    yearVal.trim(),
    genreInput.value,
    pagesVal.trim(),
    isReadInput.checked
  );

  books.push(newBook);
  saveBooksToStorage();
  renderBooks();

  showToast(`Додано: ${newBook.getInfo()}`, 'success');

  form.reset();
  titleInput.focus();
}

function handleTableClick(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const { action, id } = button.dataset;

  if (action === 'delete') {
    books = books.filter((b) => b.id !== id);
    saveBooksToStorage();
    renderBooks();
    showToast('Книгу видалено.');
  }

  if (action === 'read') {
    const book = books.find((b) => b.id === id);
    if (book) {
      book.isRead = true;
      saveBooksToStorage();
      renderBooks();
      showToast(`«${book.title}» позначено як прочитану.`, 'success');
    }
  }
}

function handleSearchInput() {
  renderBooks();
}

function loadBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books);
    }, 2000);
  });
}

async function handleLoadBooksClick() {
  loadBooksBtn.disabled = true;
  loadingMsg.hidden = false;
  loadingMsg.textContent = 'Завантаження книг…';
  postsTable.hidden = true;
  postsTbody.innerHTML = '';

  try {
    await loadBooks();

    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error(`Сервер повернув статус ${response.status}`);
    }
    const data = await response.json();

    renderPosts(data.slice(0, 20));
    showToast('Дані з мережі завантажено.', 'success');
  } catch (error) {
    console.error(error);
    loadingMsg.textContent = 'Не вдалося завантажити дані. Перевірте з’єднання з мережею.';
    showToast('Помилка завантаження з мережі.', 'error');
    return;
  } finally {
    loadBooksBtn.disabled = false;
  }

  loadingMsg.hidden = true;
}

function renderPosts(posts) {
  postsTbody.innerHTML = '';
  posts.forEach((post) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="meta-cell">${post.id}</td>
      <td>${escapeHtml(post.title)}</td>
    `;
    postsTbody.appendChild(tr);
  });
  postsTable.hidden = false;
}

function init() {
  books = loadBooksFromStorage();
  renderBooks();

  form.addEventListener('submit', handleFormSubmit);
  tbody.addEventListener('click', handleTableClick);
  searchInput.addEventListener('input', handleSearchInput);
  loadBooksBtn.addEventListener('click', handleLoadBooksClick);

  titleInput.addEventListener('input', () => setFieldError(titleInput, errorTitle, ''));
  authorInput.addEventListener('input', () => setFieldError(authorInput, errorAuthor, ''));
  yearInput.addEventListener('input', () => setFieldError(yearInput, errorYear, ''));
  pagesInput.addEventListener('input', () => setFieldError(pagesInput, errorPages, ''));
}

document.addEventListener('DOMContentLoaded', init);
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) => new Promise((resolve) => rl.question(question, resolve));

class Book {
  #title;
  #author;
  #year;
  #isAvailable;

  static #totalBooks = 0;

  constructor(title, author, year) {
    this.#title = title;
    this.#author = author;
    this.#year = year;
    this.#isAvailable = true;
    Book.#totalBooks++;
  }

  get title()       { return this.#title; }
  get author()      { return this.#author; }
  get year()        { return this.#year; }
  get isAvailable() { return this.#isAvailable; }

  borrow() {
    if (!this.#isAvailable) {
      console.log(`Книга "${this.#title}" вже видана.`);
      return false;
    }
    this.#isAvailable = false;
    console.log(`Книга "${this.#title}" успішно видана.`);
    return true;
  }

  returnBook() {
    if (this.#isAvailable) {
      console.log(`Книга "${this.#title}" вже є в бібліотеці.`);
      return false;
    }
    this.#isAvailable = true;
    console.log(`Книга "${this.#title}" повернута до бібліотеки.`);
    return true;
  }

  getInfo() {
    const status = this.#isAvailable ? "Доступна" : "Видана";
    return (
      `   Назва:  ${this.#title}\n` +
      `   Автор:  ${this.#author}\n` +
      `   Рік:    ${this.#year}\n` +
      `   Статус: ${status}`
    );
  }

  static getTotalBooks() {
    return `Загальна кількість книг у системі: ${Book.#totalBooks}`;
  }
}

class ScientificBook extends Book {
  #field;
  #citations;

  constructor(title, author, year, field, citations) {
    super(title, author, year);
    this.#field = field;
    this.#citations = citations;
  }

  get field()     { return this.#field; }
  get citations() { return this.#citations; }

  getCitationRating() {
    if (this.#citations >= 1000) return "Класика науки";
    if (this.#citations >= 100)  return "Відома праця";
    return "Нова публікація";
  }

  getInfo() {
    const base = super.getInfo();
    return (
      base +
      `\n   Галузь:    ${this.#field}` +
      `\n   Цитувань:  ${this.#citations}` +
      `\n   Рейтинг:   ${this.getCitationRating()}`
    );
  }
}

class Library {
  #name;
  #books;

  constructor(name) {
    this.#name = name;
    this.#books = [];
  }

  get books() { return this.#books; }
  get name()  { return this.#name; }

  addBook(book) {
    this.#books.push(book);
    console.log(`Книгу "${book.title}" додано.`);
  }

  showAll() {
    if (this.#books.length === 0) {
      console.log("Бібліотека порожня.");
      return;
    }
    console.log(`\nБібліотека: ${this.#name}`);
    console.log("=".repeat(50));
    this.#books.forEach((book, i) => {
      console.log(`\n[${i + 1}]`);
      console.log(book.getInfo());
    });
    console.log("\n" + Book.getTotalBooks());
    console.log("=".repeat(50));
  }

  findByAuthor(author) {
    const found = this.#books.filter(
      b => b.author.toLowerCase().includes(author.toLowerCase())
    );
    if (found.length === 0) {
      console.log(`Книги автора "${author}" не знайдено.`);
    } else {
      console.log(`\nЗнайдено книг автора "${author}": ${found.length}`);
      found.forEach((b, i) => console.log(`[${i + 1}] ${b.title} (${b.year})`));
    }
    return found;
  }

  getBookByIndex(index) {
    return this.#books[index] || null;
  }
}

const library = new Library("Центральна міська бібліотека");

library.addBook(new Book("Кобзар", "Тарас Шевченко", 1840));
library.addBook(new Book("Тіні забутих предків", "Михайло Коцюбинський", 1911));
library.addBook(new Book("1984", "Джордж Орвелл", 1949));
library.addBook(new ScientificBook("Начала", "Ісаак Ньютон", 1687, "Фізика", 15000));
library.addBook(new ScientificBook("Походження видів", "Чарльз Дарвін", 1859, "Біологія", 8500));

function showMenu() {
  console.log("\n=== МЕНЮ ===");
  console.log("1. Показати всі книги");
  console.log("2. Додати звичайну книгу");
  console.log("3. Додати наукову книгу");
  console.log("4. Видати книгу");
  console.log("5. Повернути книгу");
  console.log("6. Пошук за автором");
  console.log("0. Вийти");
  console.log("============");
}

async function main() {
  console.log("Система бібліотеки запущена.");

  while (true) {
    showMenu();
    const choice = await ask("Ваш вибір: ");

    if (choice === "0") {
      console.log("До побачення!");
      rl.close();
      break;

    } else if (choice === "1") {
      library.showAll();

    } else if (choice === "2") {
      const title  = await ask("Назва: ");
      const author = await ask("Автор: ");
      const year   = await ask("Рік:   ");
      library.addBook(new Book(title, author, Number(year)));

    } else if (choice === "3") {
      const title     = await ask("Назва: ");
      const author    = await ask("Автор: ");
      const year      = await ask("Рік:   ");
      const field     = await ask("Галузь: ");
      const citations = await ask("Кількість цитувань: ");
      library.addBook(new ScientificBook(title, author, Number(year), field, Number(citations)));

    } else if (choice === "4") {
      library.showAll();
      const index = await ask("Номер книги для видачі: ");
      const book = library.getBookByIndex(Number(index) - 1);
      if (book) book.borrow();
      else console.log("Книгу не знайдено.");

    } else if (choice === "5") {
      library.showAll();
      const index = await ask("Номер книги для повернення: ");
      const book = library.getBookByIndex(Number(index) - 1);
      if (book) book.returnBook();
      else console.log("Книгу не знайдено.");

    } else if (choice === "6") {
      const author = await ask("Введіть ім'я автора: ");
      library.findByAuthor(author);

    } else {
      console.log("Невірний вибір. Спробуйте ще раз.");
    }
  }
}

main();
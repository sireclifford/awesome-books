class BookStore {
  constructor() {
    this.booksArray = JSON.parse(localStorage.getItem('books'))
      ? JSON.parse(localStorage.getItem('books'))
      : [];
  }

    removeBook = (bookId) => {
      const temp = this.booksArray.filter(
        (book) => book.id !== bookId,
      );
      this.booksArray = temp;
      localStorage.setItem('books', JSON.stringify(this.booksArray));
      this.retrieveBooks();
    };

    retrieveBooks = () => {
      const bookList = document.querySelector('.books-list');
      bookList.innerHTML = '';
      if (localStorage.getItem('books')) {
        JSON.parse(localStorage.getItem('books')).forEach((element) => {
          const newBook = document.createElement('li');
          newBook.classList.add('book-item');
          newBook.setAttribute('data-id', element.id);
          const bookInfo = document.createElement('div');
          bookInfo.classList.add('book-item__info');
          const bookTitle = document.createElement('p');
          bookTitle.classList.add('book-item__title');
          bookTitle.innerHTML = `${element.title} by ${element.author}`;
          const removeBtn = document.createElement('button');
          removeBtn.classList.add('removeFromShelfBtn');
          removeBtn.innerHTML = 'Remove';
          removeBtn.addEventListener('click', () => {
            this.removeBook(element.id);
          });
          bookInfo.appendChild(bookTitle);
          bookInfo.appendChild(removeBtn);
          newBook.appendChild(bookInfo);
          bookList.appendChild(newBook);
        });
      } else {
        console.log('No books found');
      }
    };

    addBook = (title, author) => {
      const foundBook = this.booksArray.find((book) => book.title === title);
      if (!foundBook) {
        const book = {
          id: this.booksArray.length,
          title,
          author,
        };
        this.booksArray.push(book);
        localStorage.setItem('books', JSON.stringify(this.booksArray));
        // this.retrieveBooks();
      }
    };
}

const addBtn = document.querySelector('.AddToShelfBtn');
addBtn.addEventListener('click', () => {
  const bookStore = new BookStore();
  const title = document.querySelector('#title-input').value;
  const author = document.querySelector('#author-input').value;
  if (title === '' || author === '') {
    alert('Book title and author are required');
  } else {
    bookStore.addBook(title, author);
    alert('Book added to shelf');
    document.querySelector('#title-input').value = '';
    document.querySelector('#author-input').value = '';
  }
});

const listSection = document.querySelector('.booklist');
const addSection = document.querySelector('.addnew');
const contactSection = document.querySelector('.contacts');

const listMenuLink = document.querySelector('#bookslist');
const addMenuLink = document.querySelector('#addbooks');
const contactMenuLink = document.querySelector('#contact');

const date = document.querySelector('.datetime');
const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
};
date.innerHTML = new Date().toLocaleDateString('en-US', options);

addMenuLink.addEventListener('click', () => {
  addSection.style.display = 'block';
  listSection.style.display = 'none';
  contactSection.style.display = 'none';
});

listMenuLink.addEventListener('click', () => {
  const bookStore = new BookStore();
  bookStore.retrieveBooks();
  listSection.style.display = 'block';
  addSection.style.display = 'none';
  contactSection.style.display = 'none';
});

contactMenuLink.addEventListener('click', () => {
  contactSection.style.display = 'block';
  listSection.style.display = 'none';
  addSection.style.display = 'none';
});

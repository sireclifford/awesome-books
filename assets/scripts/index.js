const retrieveBooks = () => {
  const bookList = document.querySelector('.books-list');
  if (localStorage.getItem('books')) {
    const books = JSON.parse(localStorage.getItem('books'))
      .map(
        (book) => `<li class="book-item" data-id="${book.id}">
        <div class="book-item__info">
          <h2 class="book-item__title">${book.title}</h2>
          <p class="book-item__author">${book.author}</p>
          <button class="removeFromShelfBtn" onclick="removeBook(${book.id})">
            Remove
          </button>
        </div>  </li>`,
      )
      .join('');
    bookList.innerHTML = books;
  } else {
    console.log('No books found');
  }
};

window.onload = () => {
  retrieveBooks();
};
const booksArray = [];

const removeBook = (bookId) => {
  const foundBook = JSON.parse(localStorage.getItem('books')).find(
    (book) => book.id === bookId * 1,
  );
  const temp = JSON.parse(localStorage.getItem('books'));
  const index = temp.map((object) => object.id).indexOf(foundBook.id);
  temp.splice(index, 1);
  localStorage.setItem('books', JSON.stringify(temp));
  retrieveBooks();
};

const addBtn = document.querySelector('.AddToShelfBtn');

const booksList = document.querySelector('.books-list');

addBtn.addEventListener('click', () => {
  const title = document.getElementsByClassName('titleTxt')[0].value;
  const author = document.querySelector('.authorTxt').value;

  if (title === '' || author === '') {
    alert('Book title and author are required');
  } else {
    const foundBook = booksArray.find((book) => book.title === title);
    if (!foundBook) {
      const book = {
        id: booksArray.length,
        title,
        author,
      };

      booksArray.push(book);
      localStorage.setItem('books', JSON.stringify(booksArray));

      const bookCard = document.createElement('div');
      bookCard.classList.add('book');
      bookCard.setAttribute('style', 'display: block');
      booksList.appendChild(bookCard);

      const bookTitle = document.createElement('p');
      bookTitle.classList.add('title');
      bookTitle.innerHTML = title;
      bookCard.appendChild(bookTitle);

      const bookAuthor = document.createElement('p');
      bookAuthor.classList.add('author');
      bookAuthor.innerHTML = author;
      bookCard.appendChild(bookAuthor);

      const removeFromShelfBtn = document.createElement('button');
      removeFromShelfBtn.classList.add('removeFromShelfBtn');
      removeFromShelfBtn.setAttribute('id', book.id);
      removeFromShelfBtn.innerHTML = 'Remove';
      removeFromShelfBtn.addEventListener('click', (e) => {
        const bookId = e.target.id;
        removeBook(bookId);
      });
      bookCard.appendChild(removeFromShelfBtn);
    } else {
      alert('Book already exists');
    }
  }
});

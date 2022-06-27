const booksArray = [];

removeBook = (bookId) => {
  const foundBook = booksArray.find((book) => book.id === bookId);
  const index = booksArray.indexOf(foundBook);
  booksArray.splice(index, 1);
};

retrieveBooks = () => {
  console.log("i have been called to retrieve books");
  const bookList = document.querySelector(".books-list");

  const books =
    booksArray ||
    localStorage
      .getItem("books")
      .map(
        (book) =>
          `<div class="book">
          <div>
            <p class="title">${book.title}</p>
          </div>
          <div>
            <p class="author">${book.author}</p>
          </div>
          <div>
            <button class="removeFromShelfBtn" id="${book.id}">Remove</button>
          </div>
        </div>
        `
      )
      .join("");

  const range = document.createRange();

  range.selectNode(bookList);
  const fragment = range.createContextualFragment(books);
  bookList.appendChild(fragment);

  const bookCard = bookList.querySelector(".book");
  bookCard.setAttribute("style", "display: block");

  const removeFromShelfBtn = document.querySelector(".removeFromShelfBtn");
  removeFromShelfBtn.addEventListener("click", (e) => {
    const bookId = e.target.id;
    removeBook(bookId);
  });
};

const addBtn = document.querySelector(".AddToShelfBtn");
const removeBtn = document.querySelector(".removeFromShelfBtn");

// Do the rest of the work here

let myBooks = [
  { book: "Dune part 1", author: "Frank Herbert", pages: 532, read: true },
  { book: "Dune part 2", author: "Frank Herbert", pages: 533, read: false },
  { book: "Dune part 3", author: "Frank Herbert", pages: 532, read: true },
];

displayBooks();
function displayBooks() {
  const booksContainer = document.querySelector("#books_container");

  myBooks.forEach((book) => {
    const bookRow = document.createElement("tr");

    // book table row content
    bookRow.innerHTML = `<td>${book.book}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td><button class="button is-small ${book.read ? "is-dark" : ""}">${
      book.read ? "read" : "not read"
    }</button></td>
    <td><button class="delete"></button></td>`;

    booksContainer.appendChild(bookRow);
  });
}

function Book() {
  // constructor function
}

function addNewBook() {}

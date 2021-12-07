const booksContainer = document.querySelector("#books_container");

document.addEventListener("DOMContentLoaded", () => {
  addNewBook();
  displayBooks();
  handleDelete();
  handelStatueChange();
});

let myBooks = [
  // {
  //   id: 0,
  //   book: "Dune part 1",
  //   author: "Frank Herberttt",
  //   pages: 532,
  //   statue: "read",
  // },
  // {
  //   id: 1,
  //   book: "Dune part 2",
  //   author: "Frank Herbert",
  //   pages: 533,
  //   statue: "not read",
  // },
  // {
  //   id: 2,
  //   book: "Dune part 3",
  //   author: "Frank Herberttt",
  //   pages: 532,
  //   statue: "read",
  // },
];

function Book(book, author, pages, statue) {
  this.book = book;
  this.author = author;
  this.pages = pages;
  this.statue = statue;
}

Book.prototype.generateId = function () {
  this.id = myBooks.length > 0 ? myBooks[myBooks.length - 1].id + 1 : 0;
};

Book.prototype.changeStatue = function () {
  console.log(this.book);
};

// display books in the array when page loaded
function displayBooks() {
  myBooks.forEach((book) => createNewBookRow(book));
}

// listen to form submit and add the new submitted book
function addNewBook() {
  const addBookForm = document.querySelector("form");
  addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const { book, author, pages, statue } = data;
    const newBook = new Book(book, author, pages, statue);
    newBook.generateId();
    myBooks.push(newBook);
    createNewBookRow(newBook);
    console.log(myBooks);
  });
}

// creates new table row in the DOM and add the content to it from book args
function createNewBookRow(book) {
  const bookRow = document.createElement("tr");
  bookRow.setAttribute("data-id", `${book.id}`);
  // book table row content
  bookRow.innerHTML = `<td>${book.book}</td>
  <td>${book.author}</td>
  <td>${book.pages}</td>
  <td><button class="statue-change button is-small ${
    book.statue === "read" ? "is-dark" : ""
  }">${book.statue}</button></td>
  <td><button class="delete"></button></td>`;
  // to render it in the browser
  booksContainer.appendChild(bookRow);
}

function handleDelete() {
  booksContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const id = e.target.parentNode.parentNode.getAttribute("data-id");
      e.target.parentNode.parentNode.remove();
      const index = myBooks.findIndex((book) => book.id == id);
      myBooks.splice(index, 1);
    }
  });
}

// #*#*# this function need to be enhanced ... can be written better that that (note: it works)
function handelStatueChange() {
  booksContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("statue-change")) {
      const id = e.target.parentNode.parentNode.getAttribute("data-id");
      e.target.classList.toggle("is-dark");
      const index = myBooks.findIndex((book) => book.id == id);
      if (myBooks[index].statue === "read") {
        e.target.textContent = "not read";
        myBooks[index].statue = "not read";
      } else if (myBooks[index].statue === "not read") {
        e.target.textContent = "read";
        myBooks[index].statue = "read";
      }
    }
  });
}

// TODO Complete add book form

const myLibrary = [];

const form = document.getElementById("bookForm");
const input = document.querySelector("input");
window.onload = function () {
  form.reset();
};

function Book(title, author, pageNo, read) {
  this.title = title;
  this.author = author;
  this.pageNo = pageNo;
  this.read = read;
  this.bookInfo = function () {
    console.log(
      `${this.title} by ${this.author}, ${this.pageNo} pages, ${this.read}`
    );
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  return myLibrary;
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");

const addBookButton = document.getElementById("add-book");

addBookButton.addEventListener("click", () => {
  console.log("working");
});

// * Empty form validation
const value = input.value;

input.addEventListener("input", () => {
  if (!value) {
    input.dataset.state = "";
    return;
  }

  const trimmed = value.trim();

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    console.log("Submitting");
    // Validate input

    if (trimmed) {
      input.dataset.state = "valid";
    } else {
      input.dataset.state = "invalid";
    }
  });
});

// const theFellowshipOfTheRing = new Book(
// "The Fellowship of the Ring",
// "J.R.R Tolkien",
// 432,
// "read"
// );
//
// const prisonerOfAzkaban = new Book(
// "Harry Potter and the Prisoner of Azkaban",
// "J.K Rowling",
// 435,
// "read"
// );
//
// const catchingFire = new Book(
// "The Hunger Games: Catching Fire",
// "Suzanne Collins",
// 391,
// "not read"
// );

// console.log(catchingFire.bookInfo());

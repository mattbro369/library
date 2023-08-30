const myLibrary = [];
const form = document.getElementById("bookForm");
const input = document.querySelector("input");
const popup = document.querySelector(".popup");
let newBook;
window.onload = function () {
  form.reset();
};

//* Book constructor

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

//TODO Make cross button on form close form
// * Open and close popup form
const addBookButton = document.getElementById("add-book");
const closePopupButton = document.getElementById("close-icon");

function formDisplayChange() {
  if (popup.style.display === "block") {
    popup.style.display = "none";
  } else {
    popup.style.display = "block";
  }
}

addBookButton.addEventListener("click", () => {
  formDisplayChange();
});

function closePopup() {
  popup.style.display = "none";
}

closePopupButton.addEventListener("click", () => {
  closePopup();
  form.reset();
});

// * Function to get values from the form and add them to array
//TODO When the form is submitted, add card with book info

const submitButton = document.querySelector(".submit-button");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const formFields = ["title", "author", "pages", "read"];
  const formValues = [];

  formFields.forEach((field) => {
    let fieldValue =
      field === "read"
        ? document.querySelector(`input[id='${field}']`).checked
          ? "read"
          : "not read"
        : document.querySelector(`input[id='${field}']`).value;

    formValues.push(fieldValue);
  });

  newBook = new Book(
    formValues[0],
    formValues[1],
    formValues[2],
    formValues[3]
  );

  form.reset();

  return newBook;
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

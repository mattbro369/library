const myLibrary = [];
const bookForm = document.getElementById("bookForm");
bookForm.noValidate = true;
const input = document.querySelector("input");
const popup = document.querySelector(".popup");
const formInputs = document.querySelectorAll(".form-input");
const newDiv = document.createElement("div");
let newBook;

window.onload = function () {
  bookForm.reset();
};

//NOTE: Book constructor

function Book(title, author, pageNo, read) {
  this.title = title;
  this.author = author;
  this.pageNo = pageNo;
  this.read = read;
  this.bookInfo = function () {
    console.log(
      `${this.title} by ${this.author}, ${this.pageNo} pages, ${this.read}`,
    );
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  return myLibrary;
}

// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");

// NOTE: Open and close popup form

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
  console.log("working");
});

function closePopup() {
  popup.style.display = "none";
}

closePopupButton.addEventListener("click", () => {
  closePopup();
  // ? This works but seems like a hack, maybe needs improving...
  for (let i = 0; i < 3; i++) {
    removeErrorInput(formInputs[i]);
  }
  bookForm.reset();
});

//TODO: When the form is submitted, add card with book info
// TODO: Restrict input for page number to only numbers using event listener.

const pageNumberInput = document.getElementById("pages");
const pageInputWrapper = document.querySelector(".form-pages-wrapper");

function isNumberKey(event) {
  let charCode = event.code;
  // console.log(charKey);
  console.log(charCode);

  function containsNumbers(str) {
    return /\d/.test(str);
  }

  if (
    // NOTE: Logic = if no numbers, not backspace or tab...
    !containsNumbers(charCode) &&
    charCode !== "Backspace" &&
    charCode !== "Tab"
  ) {
    if (pageInputWrapper.childNodes.length > 5) {
      event.preventDefault();
      return;
    } else {
      event.preventDefault();
      let newDiv = document.createElement("div");
      newDiv.classList.add("invalid-message");
      newDiv.innerText = "Please only enter numbers";
      pageInputWrapper.appendChild(newDiv);
    }
  } else if (
    pageInputWrapper.childNodes.length > 5 &&
    containsNumbers(charCode)
  ) {
    pageInputWrapper.removeChild(pageInputWrapper.lastChild);
  }
}

pageNumberInput.addEventListener("keydown", isNumberKey);

// NOTE: Form validation on submit -- this mostly checks if all fields are filled in

const submitButton = document.querySelector(".submit-button");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  let errors = 0;

  formInputs.forEach((input) => {
    if (input.value.trim() === "") {
      input.classList.add("invalid");
      // console.log(input.id);
      let errorId = input.id;
      let newDiv = document.createElement("div");
      newDiv.classList.add("invalid-message");

      switch (errorId) {
        case "title":
          errorMessage = "Please enter a book title";
          newDiv.innerText = errorMessage;
          document.querySelector(".form-title-wrapper").appendChild(newDiv);
          break;

        case "author":
          errorMessage = "Please enter an author's name ";
          newDiv.innerText = errorMessage;
          document.querySelector(".form-author-wrapper").appendChild(newDiv);
          break;

        case "pages":
          errorMessage = "Please enter a number of pages";
          newDiv.innerText = errorMessage;
          document.querySelector(".form-pages-wrapper").appendChild(newDiv);
          break;
        default:
          break;
      }
      errors++;
    }
  });

  if (errors > 0) {
    return;
  }

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
    formValues[3],
  );

  bookForm.reset();
  closePopup();
  console.log(newBook);
  return newBook;
});

//NOTE: Function to remove error messages, and do so on input.

// FIX: Error messages are being removed incorrectly

function removeErrorInput(input) {
  input.classList.remove("invalid");
  const errorMessageElement =
    input.parentElement.querySelector(".invalid-message");
  if (errorMessageElement) {
    input.parentElement.removeChild(errorMessageElement);
  }
}

formInputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    if (input.classList.contains("invalid")) {
      removeErrorInput(input);
    }
  });
});

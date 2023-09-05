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

function isNumberKey(event) {
  let charCode = event.code;
  // console.log(charKey);
  console.log(charCode);

  function containsNumbers(str) {
    return /\d/.test(str);
  }

  if (
    !containsNumbers(charCode) &&
    charCode !== "Backspace" &&
    charCode !== "Tab"
  ) {
    event.preventDefault();
    newDiv.classList.add("invalid-message");
    newDiv.innerText = "Please only enter a number";
    document.querySelector(".form-pages-wrapper").appendChild(newDiv);
  } else if (
    containsNumbers(charCode) &&
    document.querySelector(".form-pages-wrapper").childNodes.length > 2
  ) {
    removeErrorInput(document.querySelector(".invalid-message"));
  }
}

pageNumberInput.addEventListener("keydown", isNumberKey);

// NOTE: Form validation on submit -- this mostly checks if all fields are filled in

const submitButton = document.querySelector(".submit-button");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  let errors = 0;

  // TODO: Make input only accept numbers

  formInputs.forEach((input) => {
    if (input.value.trim() === "") {
      input.classList.add("invalid");
      console.log(input.id);
      let errorId = input.id;

      newDiv.classList.add("invalid-message");

      switch (errorId) {
        case "title":
          newDiv.innerText = "Please enter a book title";
          document.querySelector(".form-title-wrapper").appendChild(newDiv);
          break;

        case "author":
          newDiv.innerText = "Please enter an author's name";
          document.querySelector(".form-author-wrapper").appendChild(newDiv);
          break;

        case "pages":
          newDiv.innerText = "Please enter a number of pages";
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

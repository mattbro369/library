window.onload = function () {
  bookForm.reset();
};

const cardsWrapper = document.querySelector(".main-cards-wrapper");

//* Book constructor

class Book {
  constructor(title, author, pageNo, read) {
    this.title = title;
    this.author = author;
    this.pageNo = pageNo;
    this.read = read;
  }
}

// * Library constructor

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook);
    }
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }

  getBook(title) {
    return this.books.find((book) => book.title === title);
  }

  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }

  createBookCard(newBook) {
    // let cardsWrapper = document.querySelector(".main-cards-wrapper");
    let newDiv = document.createElement("div");
    newDiv.classList.add("card");
    cardsWrapper.appendChild(newDiv);

    // * Title & Card class array

    let classArray = [
      "card-title-wrapper",
      "card-left",
      "card-seperator",
      "card-right",
    ];

    let cardLeftClassArray = [
      "card-left-author",
      "card-left-pages",
      "card-left-read",
    ];

    let cardRightClassArray = [
      "card-right-author",
      "card-right-pages",
      "card-right-read",
    ];

    for (let i = 0; i < classArray.length; i++) {
      let newDiv = document.createElement("div");
      newDiv.classList.add(classArray[i]);
      cardsWrapper.lastChild.appendChild(newDiv);

      let newCard = cardsWrapper.lastChild;
      let newCardLeft = newCard.querySelector(".card-left");
      let newCardRight = newCard.querySelector(".card-right");

      if (classArray[i] === "card-title-wrapper") {
        let newH2 = document.createElement("h2");
        newH2.innerText = newBook.title;

        newCard.querySelector(".card-title-wrapper").appendChild(newH2);

        let newInput = document.createElement("input");
        newInput.classList.add("remove-book-button");
        newInput.setAttribute("type", "image");
        newInput.setAttribute("src", "./images/remove-icon.png");
        newInput.setAttribute("name", "remove-book");
        newInput.setAttribute("alt", "Remove book");
        newCard.querySelector(".card-title-wrapper").appendChild(newInput);
        newInput.addEventListener("click", (event) => {
          let index =
            event.target.parentElement.parentElement.getAttribute("index");
          removeBookCard(index);
          library.books.splice(index, 1);
          applyIndex();
        });
      } else if (classArray[i] === "card-left") {
        for (let i = 0; i < cardLeftClassArray.length; i++) {
          let newDiv = document.createElement("div");
          newDiv.classList.add(cardLeftClassArray[i]);

          let newH3 = document.createElement("h3");
          let h3Text;

          switch (cardLeftClassArray[i]) {
            case "card-left-author":
              h3Text = "Author";
              break;

            case "card-left-pages":
              h3Text = "Pages";
              break;

            case "card-left-read":
              h3Text = "Read?";
              break;

            default:
              break;
          }

          newH3.innerText = h3Text;
          newCardLeft.appendChild(newDiv).appendChild(newH3);
        }
      } else if (classArray[i] === "card-right") {
        // * Right card classes
        for (let i = 0; i < cardRightClassArray.length; i++) {
          let newDiv = document.createElement("div");
          newDiv.classList.add(cardRightClassArray[i]);

          let newH3 = document.createElement("h3");
          let h3Text;

          switch (cardRightClassArray[i]) {
            case "card-right-author":
              h3Text = newBook.author;
              break;

            case "card-right-pages":
              h3Text = newBook.pageNo;
              break;

            case "card-right-read":
              // h3Text = newBook.read;
              let newLabel = document.createElement("label");
              let newInput = document.createElement("input");
              let newSpan = document.createElement("span");
              newLabel.classList.add("switch");
              newInput.setAttribute("type", "checkbox");
              newInput.classList.add("read");
              newInput.checked = newBook.read; // * Setting the "read" status
              newSpan.classList.add("slider", "round");
              newCardRight.appendChild(newDiv).appendChild(newLabel);
              newLabel.appendChild(newInput);
              newLabel.appendChild(newSpan);

              newInput.addEventListener("change", listenForChange());

              break;

            default:
              break;
          }
          if (!newDiv.classList.contains("card-right-read")) {
            newH3.innerText = h3Text;
            newCardRight.appendChild(newDiv).appendChild(newH3);
          }
        }
      }
    }
  }

  printAll(books) {
    library.books.forEach((book) => {
      library.createBookCard(book);
    });
  }
}

const library = new Library();

// * Open and close popup form

const bookForm = document.getElementById("bookForm");
const input = document.querySelector("input");
const popup = document.querySelector(".popup");
const formInputs = document.querySelectorAll(".form-input");
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
  // * This works but seems like a hack, maybe needs improving...
  for (let i = 0; i < 3; i++) {
    removeErrorInput(formInputs[i]);
  }
  bookForm.reset();
});

const pageNumberInput = document.getElementById("pages");
const pageInputWrapper = document.querySelector(".form-pages-wrapper");

function isNumberKey(event) {
  let charCode = event.code;

  function containsNumbers(str) {
    return /\d/.test(str);
  }

  if (
    // * Logic = if no numbers, not backspace or tab...
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

// * Submit button functions (Validation of form + adding books to library)

const submitButton = document.querySelector(".submit-button");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  // * Validation
  let errors = 0;

  formInputs.forEach((input) => {
    if (input.value.trim() === "") {
      input.classList.add("invalid");
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

  // * Creating book element

  const formFields = ["title", "author", "pages", "read"];
  const formValues = [];

  formFields.forEach((field) => {
    let fieldValue = document.querySelector(`input[id='${field}']`).value;

    if (field === "read") {
      fieldValue = document.getElementById("read").checked;
    }
    formValues.push(fieldValue);
  });

  newBook = new Book(
    formValues[0],
    formValues[1],
    formValues[2],
    formValues[3]
  );

  if (library.isInLibrary(newBook)) {
    alert("This book is already in your library");
    return;
  }

  library.addBook(newBook);
  library.createBookCard(newBook);
  bookForm.reset();
  closePopup();
  applyIndex();
});

//* Function to remove error messages, and do so on input.

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

function removeBookCard(index) {
  let cardArray = Array.from(document.getElementsByClassName("card"));
  cardArray[index].remove();
}

function applyIndex() {
  let cardArray = Array.from(document.getElementsByClassName("card"));
  i = 0;
  cardArray.forEach((card, i) => {
    card.setAttribute("index", i);
    i++;
  });
}

// TODO Add event listener on read.checked to change library status if changed on card

function listenForChange() {
  let checkboxArray = Array.from(document.getElementsByClassName("read"));
  checkboxArray.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      library.books[checkboxArray.indexOf(checkbox)].read = checkbox.checked;
    });
  });
}

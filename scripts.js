

const addBookButton = document.querySelector("#addBookButton");
const mainTable = document.querySelector("#mainTable");
const mainTableBody = document.querySelector("#mainTableBody");
const addBookDialog = document.querySelector("#addBookDialog");
const modalCloseButton = document.querySelector("#modalCloseButton");

const Library = [];


//constructor
function Book(title, author, pages, read){
    this.ID = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function ReadToggle(){
    if (this.textContent === "Yes"){
        this.textContent = "No";
        }
}

function ClearLibrary(){}

function displaybooks(){

    mainTableBody.innerHTML = "";

    Library.forEach(Book => {
        const row = document.createElement('tr');
        const title = document.createElement('td');
        title.textContent = Book.title;
        const author = document.createElement("td");
        author.textContent = Book.author;
        const pages = document.createElement("td");
        pages.textContent = Book.pages;
        const readTd = document.createElement("td");
        const readButton = document.createElement("button");
        readButton.textContent = Book.read;
        readButton.classList.toggle("readButton");
        readButton.setAttribute("data-book-id", Book.ID);

        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);

        readTd.appendChild(readButton);
        row.appendChild(readTd);
        
        mainTableBody.appendChild(row);
        
    });
    const readButtons = document.querySelectorAll(".readButton");
    readButtons.forEach(button => {
        button.addEventListener("click", changeRead);
    })
}

function addToLibrary(){
    
}

function changeRead(){
    const uniqueID = this.dataset.bookId;
    const indexOfBook = Library.findIndex(Book => Book.ID === uniqueID);
    if(Library[indexOfBook].read === "Yes"){
        Library[indexOfBook].read = "No";
    }
    else{
        Library[indexOfBook].read = "Yes";
    }
    displaybooks();
}

addBookButton.addEventListener("click", function(){
    addBookDialog.showModal();
});

modalCloseButton.addEventListener("click", function(){
    addBookDialog.close();
})



const Catch22 = new Book("Catch 22", "Joseph Heller", 300, "Yes");
const testBook = new Book("TestTitle", "TestAuthor", 350, "Yes");
Library.push(Catch22);
Library.push(testBook);
displaybooks();

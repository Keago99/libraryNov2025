

const addBookButton = document.querySelector("#addBookButton");
const addToLibraryButton = document.querySelector("#modalAddButton");
const mainTable = document.querySelector("#mainTable");
const mainTableBody = document.querySelector("#mainTableBody");
const addBookDialog = document.querySelector("#addBookDialog");
const deleteBookDialog = document.querySelector("#deleteConfirmDialog");
const modalCloseButton = document.querySelector("#modalCloseButton");
const deleteConfirmDialog = document.querySelector("#deleteConfirmDialog");
const deleteNoButton = document.querySelector("#deleteNoButton");
const deleteYesButton = document.querySelector("#deleteYesButton");
const addBookForm = document.querySelector("#addBookForm");

const Library = [];


//constructor
function Book(title, author, pages, read){
    this.ID = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


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

        const deleteTd = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "X";
        deleteButton.classList.toggle("deleteButton");
        deleteButton.setAttribute("data-book-id", Book.ID);
    
        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);

        readTd.appendChild(readButton);
        row.appendChild(readTd);

        deleteTd.appendChild(deleteButton);
        row.appendChild(deleteTd);
        
        mainTableBody.appendChild(row);
        
    });
    
    const readButtons = document.querySelectorAll(".readButton");
    const deleteButtons = document.querySelectorAll(".deleteButton");
    
    readButtons.forEach(button => {
        button.addEventListener("click", changeRead);
    });

    deleteButtons.forEach(button => {
        button.addEventListener("click", function(){
            deleteClick(this.dataset.bookId);
        });
    });
}

function addToLibrary(){
    const modalTitle = document.querySelector("#titleAdd").value;
    const modalAuthor = document.querySelector("#authorAdd").value;
    const modalPages = document.querySelector("#pagesAdd").value;
    const modalRead = document.querySelector("#readSelectAdd").value;

    if(modalTitle === "" || modalAuthor === "" || modalPages === "" || modalRead === "" ){
        alert("Please fill out all fields!");
        return;
    }

    const newBook = new Book(modalTitle, modalAuthor, modalPages, modalRead);
    console.log(newBook);
    Library.push(newBook);
    displaybooks();
    addBookDialog.close();
    addBookForm.reset();

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

function deleteClick(bookID){
    deleteTitleSpan = document.querySelector("#bookTitleDelete");
    deleteTitleSpan.innerText = "";
    const indexOfBook = Library.findIndex(Book => Book.ID === bookID);
    const bookTitle = Library[indexOfBook].title;

    const bookTitleDiv = document.createElement("div");
    bookTitleDiv.innerText += bookTitle + "?";
    deleteTitleSpan.appendChild(bookTitleDiv);
    deleteYesButton.setAttribute("data-book-id", bookID);
    deleteConfirmDialog.showModal();
}

function deleteBookYes(bookID){
    const indexOfBook = Library.findIndex(Book => Book.ID === bookID);
    Library.splice(indexOfBook, 1);
    deleteBookDialog.close();
    displaybooks();
}

addBookButton.addEventListener("click", function(){
    addBookDialog.showModal();
});

addToLibraryButton.addEventListener("click", addToLibrary);

modalCloseButton.addEventListener("click", function(){
    addBookDialog.close();
    addBookForm.reset();
})

deleteNoButton.addEventListener("click", function(){
    deleteBookDialog.close();
});

deleteYesButton.addEventListener("click", function(){
    deleteBookYes(this.dataset.bookId);
});


const Catch22 = new Book("Catch 22", "Joseph Heller", 300, "Yes");
const testBook = new Book("TestTitle", "TestAuthor", 350, "No");
Library.push(Catch22);
Library.push(testBook);
displaybooks();


// TODO:
// Send the book ID datatype to the deleteConfirm dialog so the user can see 
// which book they are deleting
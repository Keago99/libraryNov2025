

const addBookButton = document.querySelector("#addBookButton");
const addToLibraryButton = document.querySelector("#modalAddButton");
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
        readButton.setAttribute("data-book-id", Book.ID);

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
    
    readButtons.forEach(button => {
        button.addEventListener("click", changeRead);
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

addToLibraryButton.addEventListener("click", addToLibrary);

modalCloseButton.addEventListener("click", function(){
    addBookDialog.close();
})



const Catch22 = new Book("Catch 22", "Joseph Heller", 300, "Yes");
const testBook = new Book("TestTitle", "TestAuthor", 350, "No");
Library.push(Catch22);
Library.push(testBook);
displaybooks();

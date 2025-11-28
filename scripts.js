

const addBookButton = document.querySelector("#addBookButton");
const mainTable = document.querySelector("#mainTable");

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
    Library.forEach(Book => {
        const row = document.createElement('tr');
        const title = document.createElement('td');
        title.textContent = Book.title;
        const author = document.createElement("td");
        author.textContent = Book.author;
        const pages = document.createElement("td");
        pages.textContent = Book.pages;
        const read = document.createElement("td");
        console.log(Book.read);
        read.textContent = Book.read;

        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(read);
        mainTable.appendChild(row);
    });
}

function addToLibrary(){

}

const Catch22 = new Book("Catch 22", "Joseph Heller", 300, "Yes");
Library.push(Catch22);
displaybooks();

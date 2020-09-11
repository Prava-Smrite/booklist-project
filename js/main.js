//get ui element
let form = document.querySelector('#book-form');
let booklist = document.querySelector('#book-list');
//book class
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{

    static addToBookList(book){
        let list = document.querySelector('#book-list')
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class = "delete">x</a></td>
        `
        list.appendChild(row);
    }
    static clearFields(){
        document.querySelector('#title').value ='';
        document.querySelector('#author').value ='';
        document.querySelector('#isbn').value ='';
    }
    static showAlert(message, className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div,form);

        setTimeout(()=>{
            document.querySelector('.alert').remove()
        },2000)
    }

    static deleteFormBook(target){
        if(target.hasAttribute('href')){
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim())
            UI.showAlert("Removed book !", "success");
        }
    }
}

//local storage class
class Store{
    static getbooks(){
        let books;
        if(localStorage.getItem('books')=== null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addbook(book){
        let books = Store.getbooks();
        books.push(book);


        localStorage.setItem('books',JSON.stringify(books));
    }
    static displayBook(){
        let books = Store.getbooks();
        books.forEach(book => {
            UI.addToBookList(book);
        })
    }
    static removeBook(isbn){
        let books = Store.getbooks();

        books.forEach( (book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1)
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

//add event listener
form.addEventListener('submit', newBook);
booklist.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBook());


//define function
function newBook(e){
    let title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;
   
    

    if(title === '' || author === '' || isbn === ''){
        UI.showAlert("Please, fill all the fields !", "error");
    }else{
        let book = new Book(title,author,isbn);
        UI.addToBookList(book);
        UI.clearFields();
        UI.showAlert("Book added !", "success");
        Store.addbook(book)
    }
    e.preventDefault();
}

function removeBook(e){
    UI.deleteFormBook(e.target);
    e.preventDefault();
}
// Selectors
const nav = document.querySelector('nav');
const a = document.querySelector('.container a');
const img = document.querySelector('.container img');
const add = document.querySelector('.glow-on-hover');
const modal = document.querySelector('.modal');
const button = document.querySelector('.submit');
const input = document.querySelectorAll('input');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');
const inputCheck = document.querySelector('#check');
const bookGrid = document.querySelector('.bookGrid');
const book = document.querySelectorAll('.gridBook');

// Logics
function changeColor(){
    a.style.color = 'black';
    img.style.filter = 'none';
}

function returnColor(){
    a.style.color = 'white';
    img.style.filter = 'invert(99%) sepia(0%) saturate(7500%) hue-rotate(188deg) brightness(101%) contrast(101%)';
}

function openModal(){
    modal.style.display = 'flex';
    inputTitle.value = '';
    inputAuthor.value = '';
    inputPages.value = '';
    inputCheck.checked = false;
}

function closeModal(){
    modal.style.display = 'none';
    if(!inputTitle.value == '')
    if(!inputAuthor.value == '')
    if(!inputPages.value == '')
    addBookToLibrary();
}

function closeModalDiv(event){
    let e = event.target;
    if(e.classList[0] == 'modal'){
        modal.style.display = 'none';
    } 
}

function buttonBook(event){
    let e = event.target;
    if(e.classList[0] == 'reading'){
        e.innerHTML = 'Not read yet';
        e.classList.add('readingYet');
        e.classList.remove('reading');
        console.log('do something');
    } else if (e.classList[0] == 'readingYet') {
        e.innerHTML = 'Read';
        e.classList.add('reading');
        e.classList.remove('readingYet');
    }  
}

function removeBook(event){
    let e = event.target;
    if(e.classList[0] == 'remove'){
        e.parentNode.remove();
    } 
}

// Data structure
let myLibrary = [
    // Object
    {
        title: 'Le Dernier Vœu',
        author: 'Andrzej Sapkowski',
        pages: 375,
        read: true
    }
];


function Book(title, author, pages, read) {
    // Constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {

    let title = inputTitle.value;
    let author = inputAuthor.value;
    let pages = inputPages.value;
    let read = inputCheck.checked;

    // Here we can use Object.create for improve performances
    let newbook = new Book(title, author, pages, read);
    myLibrary.push(newbook);

    // Slice Method to get the last book object in myLibrary
    let lastBook = myLibrary.slice(-1);
    
    // Creating new HTML attributs for display the new Book
    // With CSS class
    const bookDiv = document.createElement("div");
    bookDiv.classList.add('gridBook');

    const bookTitle = document.createElement('p');
    bookTitle.innerText = lastBook[0].title;
    bookDiv.appendChild(bookTitle);

    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = lastBook[0].author;
    bookDiv.appendChild(bookAuthor);

    const bookPages = document.createElement('p');
    bookPages.innerText = lastBook[0].pages +' '+'pages';
    bookDiv.appendChild(bookPages);

    if(lastBook[0].read == true){
        const bookRead  = document.createElement('button');
        bookRead.innerText = 'Read';
        bookRead.classList.add('reading');
        bookDiv.appendChild(bookRead);

    }else {
        const bookRead  = document.createElement('button');
        bookRead.innerText = 'Not read yet';
        bookRead.classList.add('readingYet');
        bookDiv.appendChild(bookRead);
    }

    const bookRemove = document.createElement('button');
    bookRemove.innerText = 'Remove';
    bookRemove.classList.add('remove');
    bookDiv.appendChild(bookRemove);
    // Then i push my new html attributs into the DOM:
    bookGrid.appendChild(bookDiv);

}

// Events
nav.addEventListener('mouseenter', changeColor);
nav.addEventListener('mouseleave', returnColor);
add.addEventListener('click', openModal);
button.addEventListener('click', closeModal);
bookGrid.addEventListener('click', removeBook);
bookGrid.addEventListener('click', buttonBook);
modal.addEventListener('click', closeModalDiv);

// This is for load the 1st containt in my library :) : 
window.addEventListener('DOMContentLoaded', ()=>{
    let lastBook = myLibrary.slice(-1);
    const bookDiv = document.createElement("div");
    bookDiv.classList.add('gridBook');
    const bookTitle = document.createElement('p');
    bookTitle.innerText = lastBook[0].title;
    bookDiv.appendChild(bookTitle);
    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = lastBook[0].author;
    bookDiv.appendChild(bookAuthor);
    const bookPages = document.createElement('p');
    bookPages.innerText = lastBook[0].pages +' '+'pages';
    bookDiv.appendChild(bookPages);
    if(lastBook[0].read == true){
        const bookRead  = document.createElement('button');
        bookRead.innerText = 'Read';
        bookRead.classList.add('reading');
        bookDiv.appendChild(bookRead);

    }else {
        const bookRead  = document.createElement('button');
        bookRead.innerText = 'Not read yet';
        bookRead.classList.add('readingYet');
        bookDiv.appendChild(bookRead);
    }
    const bookRemove = document.createElement('button');
    bookRemove.innerText = 'Remove';
    bookRemove.classList.add('remove');
    bookDiv.appendChild(bookRemove);
    bookGrid.appendChild(bookDiv);
})



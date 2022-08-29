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
const lightMode = document.querySelector('.shiftMode');

// Logics
function changeColor(){
    const shine = document.querySelector('.shiftMode p').innerHTML;
    if(shine == 'Dark'){
        a.style.color = 'black';
        img.style.filter = 'none';
    }else{
        a.style.color = 'white';
        img.style.filter = 'invert(99%) sepia(0%) saturate(7500%) hue-rotate(188deg) brightness(101%) contrast(101%)';
    }   
}

function returnColor(){
    const shine = document.querySelector('.shiftMode p').innerHTML;
    if(shine == 'Dark'){
        a.style.color = 'white';
        img.style.filter = 'invert(99%) sepia(0%) saturate(7500%) hue-rotate(188deg) brightness(101%) contrast(101%)';
    }else{
        a.style.color = 'black';
        img.style.filter = 'none';
    }   
}


function light(){

    let shine = this.firstElementChild.innerHTML;
    const glow = document.querySelector('.glow-on-hover');

    // We can make a ternary operator for one line
    // shine == 'Dark' ? this.firstElementChild.innerHTML = 'Light':this.firstElementChild.innerHTML = 'Dark';

    if(shine == 'Dark'){
        this.firstElementChild.innerHTML = 'Light';
        document.documentElement.style.setProperty('--white', '#140212');
        document.documentElement.style.setProperty('--grey', '#121212');
        document.documentElement.style.setProperty('--black', '#F0F0FA');
        document.documentElement.style.setProperty('--shadow', 'rgba(255,255,255,0.16) 0px 1px 4px');
        a.style.color = '#000000'; 
        glow.style.color = "#ffffff";
        img.style.filter = 'none';
    }else {
        this.firstElementChild.innerHTML = 'Dark';
        document.documentElement.style.setProperty('--white', '#ffffff');
        document.documentElement.style.setProperty('--grey', '#F0F0FA');
        document.documentElement.style.setProperty('--black', '#000000');
        document.documentElement.style.setProperty('--shadow', 'rgba(0, 0, 0, 0.16) 0px 1px 4px');
        a.style.color = '#ffffff'; 
        glow.style.color = "#000000";
        img.style.filter = 'invert(99%) sepia(0%) saturate(7500%) hue-rotate(188deg) brightness(101%) contrast(101%)';
    }


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

    // Add book in localStorage
    // addBook({title, author, pages, read});
    // let bookyu = new booky(title, author, pages, read);
    // bookyu.addBook(bookyu);
    let newBooky = new booky();
    console.log(newBooky)
    newBooky.add(newbook);
    newBooky.displayBookStorage;
    getBook();
}

function getBook(){

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
lightMode.addEventListener('click', light);


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



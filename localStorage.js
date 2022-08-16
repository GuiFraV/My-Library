function saveBook(book){
    localStorage.setItem('book', JSON.stringify(book));
}

function getBookStorage(){
    let book = localStorage.getItem('book');
    if(book == null){
        return [];
    }else{
        return JSON.parse(book);
    }
}

function addBook(tome){
    let book = getBookStorage();
    book.push(tome);
    saveBook(book);
}

function removeBookStorage(tome){
    let book = getBookStorage();
    book = book.filter(b => b.title != tome.title);
    saveBook(book);
}


function changeRead(tome){
    let book = getBookStorage();
    let findBook = book.find(b => b.title == tome.title);
    if(findBook != undefined){
        if(findBook.read == true){
            findBook.read = false;
            saveBook(book);
        }else{
            findBook.read = true;
            saveBook(book);
        }
    }
}

function events(event){
    let e = event.target;
    if(e.classList[0] == 'remove'){
        let title = e.parentNode.firstChild.innerText;
        let book = getBookStorage();
        let tome = book.find(b => b.title == title);
        removeBookStorage(tome);
    } 
    
    if(e.classList[0] == 'reading'){
        let title = e.parentNode.firstChild.innerText;
        let book = getBookStorage();
        let tome = book.find(b => b.title == title);
        changeRead(tome);
    } else if (e.classList[0] == 'readingYet') {
        let title = e.parentNode.firstChild.innerText;
        let book = getBookStorage();
        let tome = book.find(b => b.title == title);
        changeRead(tome);
    }  

}

function displayBookStorage(){
    
    let book = getBookStorage();

    for(books of book){
      // Creating new HTML attributs for display the new Book
      // With CSS class
      const bookDiv = document.createElement("div");
      bookDiv.classList.add('gridBook');
  
      const bookTitle = document.createElement('p');
      bookTitle.innerText = books.title;
      bookDiv.appendChild(bookTitle);
  
      const bookAuthor = document.createElement('p');
      bookAuthor.innerText = books.author;
      bookDiv.appendChild(bookAuthor);
  
      const bookPages = document.createElement('p');
      bookPages.innerText = books.pages +' '+'pages';
      bookDiv.appendChild(bookPages);
  
      if(books.read == true){
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
}

window.addEventListener('DOMContentLoaded', displayBookStorage);
window.addEventListener('click', events);


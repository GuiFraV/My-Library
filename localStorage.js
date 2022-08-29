class booky{
    constructor(){
        let book = localStorage.getItem('book');
        if(book == null){
            this.book = [];
        }else{
            this.book = JSON.parse(book);
        }
    }

    save(){
        localStorage.setItem('book', JSON.stringify(this.book));
    }

    add(tome){
        this.book.push(tome);
        this.save();
    }

    remove(tome){
        this.book = this.book.filter(b => b.title != tome);
        this.save();

    }

    changeRead(tome){
        let findBook = this.book.find(b => b.title == tome);

        if(findBook != undefined){

            if(findBook.read == true){
                findBook.read = false;
                this.save();
            }else{
                findBook.read = true;
                this.save();
            }
        }
    }

    events(event){
        let e = event.target;

        if(e.classList[0] == 'remove'){
            let title = e.parentNode.firstChild.innerText;
            let tome = this.book.find(b => b.title == title);
            this.remove(tome.title);
        } 
        
        if(e.classList[0] == 'reading'){
            let title = e.parentNode.firstChild.innerText;
            let tome = this.book.find(b => b.title == title);
            this.changeRead(tome.title);
        } else if (e.classList[0] == 'readingYet') {
            let title = e.parentNode.firstChild.innerText;
            let tome = this.book.find(b => b.title == title);
            this.changeRead(tome.title);
        }  
    
    }

    displayBookStorage(){

        for(let i = 0; i < this.book.length; i++){
          // Creating new HTML attributs for display the new Book
          // With CSS class
          const bookDiv = document.createElement("div");
          bookDiv.classList.add('gridBook');
      
          const bookTitle = document.createElement('p');
          bookTitle.innerText = this.book[i].title;
          bookDiv.appendChild(bookTitle);
      
          const bookAuthor = document.createElement('p');
          bookAuthor.innerText = this.book[i].author;
          bookDiv.appendChild(bookAuthor);
      
          const bookPages = document.createElement('p');
          bookPages.innerText = this.book[i].pages +' '+'pages';
          bookDiv.appendChild(bookPages);
      
          if(this.book[i].read == true){
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
}


window.addEventListener('DOMContentLoaded', ()=> {
    let book = new booky;
    book.displayBookStorage();
});

window.addEventListener('click', (event)=> {
    let book = new booky;
    book.events(event);
});


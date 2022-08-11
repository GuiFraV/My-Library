const cat = {

  makeSound: function(){

    console.log(this.sound);

  }

};

const mark = Object.create(cat);
mark.sound = 'Meow';
mark.makeSound();
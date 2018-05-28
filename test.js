
var Student = function(name){
  this.name = name;

  this.printName = function(){
    console.log(name);
  }
}

var mukul = new Student('Mukul');
mukul.printName();
console.log(mukul.constructor.name);

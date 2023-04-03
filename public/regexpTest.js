

const num = "flower.png";
const formattedNum = num.replace(/\..*/g, "");



const srcs = ["flower.png", "flower2.png", "flower3.png"];


let srcsFormatted = srcs.map((src) => { return src.replace(/\..*/g, "") });



const myObject = {
    value: 42,
    functionMethod: function () {
        console.log(this.value); // Logs 42, because 'this' refers to 'myObject'
    },
    arrowMethod: () => {
        console.log(this.value); // Logs 'undefined', because 'this' is inherited from the enclosing scope, not 'myObject'
    },
};

myObject.functionMethod(); // Logs 42
myObject.arrowMethod(); // Logs 'undefined'


function Person(name) {
    this.name = name;
    this.deleteThis = 5;
    this.functionMethod = function () {
        console.log(this.name); // Logs 'John', because 'this' refers to 'person1'
    }
    this.arrowMethod = () => {
        console.log(this.name); // Logs 'John', because 'this' refers to 'person1'
    }
    console.log(this.name); // Logs 'John', because 'this' refers to 'person1' (when called with 'new'
    console.log(this);
}

const person1 = new Person('John');
person1.functionMethod(); // Logs 'John'
person1.arrowMethod(); // Logs 'John'

Person('John'); // Logs 'John'

console.log(person1);
delete person1.deleteThis;
console.log(person1);


class Somebody {
    #hidden;
    constructor(name) {
        this.name = name;
        this.deleteThis = 5;
        this.#hidden = 5;
    }
    functionMethod() {
        console.log(this.name); // Logs 'John', because 'this' refers to 'person1'
    }
    arrowMethod = () => {
        console.log(this.name); // Logs 'John', because 'this' refers to 'person1'
        console.log(this.#hidden);
    }

    set hidden(value) {

        this.#hidden += value;
        this.#hidden++;
    }

    get hidden() {
        this.#hidden++;
        return this.#hidden;
    }
}

let somebody1 = new Somebody('John');
console.log(somebody1);
delete somebody1.deleteThis;
console.log(somebody1);

somebody1.hidden = 10;

somebody1.functionMethod(); // Logs 'John'
somebody1.arrowMethod(); // Logs 'John'



console.log(("ba" + + "a" + "a").toLowerCase()); 
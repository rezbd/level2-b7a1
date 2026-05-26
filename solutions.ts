// solution 1
function filterEvenNumbers(data: number[]): number[] {
    let newArray: number[] = [];
    if(Array.isArray(data) && data.length){
        newArray = data.filter(e => e%2===0);
    }
    return newArray;
}

// solution 2
function reverseString(data: string): string{
    let newString = "";
    for(let i=data.length-1; i>=0; i--){
        newString = newString+data[i];
    }
    return newString;
}

// solution 3
type StringOrNumber = string | number;

function checkType(data: StringOrNumber) {
    if(typeof data === "string"){
        return "String";
    }else{
        return "Number";
    }
}

// solution 4
function getProperty<T, K extends keyof T>(obj:T, key:K): T[K]{
    return obj[key];
}

// solution 5
interface Book {
    title: string,
    author: string,
    publishedYear: number
}

interface ReadBook extends Book {isRead: boolean}

function toggleReadStatus(data: Book): ReadBook{
    return {...data, isRead:true};
}

// solution 6
class Person{
    name: string;
    age: number;
    constructor(name:string, age:number){
        this.name = name;
        this.age = age;
    }
}

class Student extends Person {
    grade: string;
    constructor(name:string, age:number, grade:string){
        super(name, age);
        this.grade = grade;
    }

    getDetails() {
        return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
    }
}
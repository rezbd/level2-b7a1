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
// solution 1

function filterEvenNumbers(data: number[]): number[] {
    let newArray: number[] = [];
    if(Array.isArray(data) && data.length){
        newArray = data.filter(e => e%2===0);
    }
    return newArray;
}
export function pluarWord(quantity, words) {
    let arrayOfStrings = words.split(',');
    if(quantity === 0 || (quantity % 10) === 0  || (quantity >= 5 && quantity <= 20) || (quantity % 10 >= 5 && quantity % 10 <= 20)) return arrayOfStrings[1];
    else if(quantity === 1 || (quantity % 10) === 1) return arrayOfStrings[0];
    else if((quantity >= 2 && quantity <= 4) || (quantity % 10 >= 2 && quantity % 10 <= 4)) return arrayOfStrings[2];
}
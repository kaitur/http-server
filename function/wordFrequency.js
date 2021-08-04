export function SearchForDuplicates(text) {
    let arrayOfWords = creatingAnArrayOfWords(text)
    const wordMap = new Map();

    for (let i = 0; i < arrayOfWords.length; i++) {
        let currentWordCount = wordMap.get(arrayOfWords[i]);
        let count = currentWordCount ? currentWordCount : 0;
        wordMap.set(arrayOfWords[i], count + 1)
    }
    
    wordMap.forEach(key, value)
    return wordMap;
}

function stringReplacement(text) {
    let strReplacement = text.replace(/[^a-zа-яё0-9`-\s]/gi, '').toLowerCase();
    return strReplacement;
}

function creatingAnArrayOfWords(text) {
    let arrayOfWords = stringReplacement(text).split(" ");
    return arrayOfWords;
}
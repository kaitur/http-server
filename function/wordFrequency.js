export function SearchForDuplicates(text) {
    let arrayOfWords = creatingAnArrayOfWords(text)
    const wordMap = new Map();

    for (let i = 0; i < arrayOfWords.length; i++) {
        let currentWordCount = wordMap.get(arrayOfWords[i]);
        let count = currentWordCount ? currentWordCount : 0;
        wordMap.set(arrayOfWords[i], count + 1)
    }
    return wordMap;
}

export function numberOfUniqueWords(text) {
    let words = SearchForDuplicates(text);
    let amount = 0;
    words.forEach((value) => { if (value === 1) amount++ });
    return amount;
}

export function mostFrequentWord(text) {
    let words = SearchForDuplicates(text);
    let freqWord = "";
    let counter = 0
    words.forEach((value, key) => {
        if (value > counter) {
            freqWord = key;
            counter++;
        }
    });
    return freqWord;
}

function stringReplacement(text) {
    let strReplacement = text.replace(/[^a-zа-яё0-9`-\s]/gi, '').toLowerCase();
    return strReplacement;
}

function creatingAnArrayOfWords(text) {
    let arrayOfWords = stringReplacement(text).split(" ");
    return arrayOfWords;
}
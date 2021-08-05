import { numberOfUniqueWords, mostFrequentWord } from '../function/wordFrequency.js';


const text = 'Little red fox jumps over logs. Fox is red red';
describe('', () => {
    it('number of unique words', () => {
        expect(numberOfUniqueWords(text)).toBe(5);
    })

    it('most frequent word', () => {
        expect(mostFrequentWord(text)).toBe('red');
    })
})

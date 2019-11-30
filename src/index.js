const { getRandomWord } = require('word-maker');

console.log('It works!');

// YOUR CODE HERE
const startNumber = 1;
const endNumber = 100;

async function printRandomNumbers() {
  for (i = startNumber; i <= endNumber; i++) {
    const randomWord = await getRandomWord();
    const formattedString = `${i}: ${randomWord}`;
    console.log(formattedString);
  }
}

printRandomNumbers();

const { getRandomWord } = require('word-maker');

console.log('It works!');

// YOUR CODE HERE
const startNumber = 1;
const endNumber = 100;

async function printRandomNumbers() {
  for (i = startNumber; i <= endNumber; i++) {
    let randomWord;
    try {
      randomWord = await getRandomWord({ withErrors: true });
    } catch (error) {
      randomWord = `It shouldn't break anything!`;
    }
    const formattedString = `${i}: ${randomWord}`;
    console.log(formattedString);
  }
}

printRandomNumbers();

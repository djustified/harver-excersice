const { getRandomWord } = require('word-maker');

console.log('It works!');

// YOUR CODE HERE
const startNumber = 1;
const endNumber = 100;

getWordToPrint = (number, wordToPrint) => {
  const isMultipleOfThree = number % 3 === 0;
  const isMultipleOfFive = number % 5 === 0;

  if (isMultipleOfThree && isMultipleOfFive) {
    wordToPrint = 'FizzBuzz';
  } else if (isMultipleOfThree) {
    wordToPrint = 'Fizz';
  } else if (isMultipleOfFive) {
    wordToPrint = 'Buzz';
  }
  return wordToPrint;
};

async function printRandomNumbers() {
  for (i = startNumber; i <= endNumber; i++) {
    const randomWord = await getRandomWord();
    const wordToPrint = getWordToPrint(i, randomWord);
    const formattedString = `${i}: ${wordToPrint}`;
    console.log(formattedString);
  }
}

printRandomNumbers();

const { getRandomWordSync } = require('word-maker');

console.log('It works!');

// YOUR CODE HERE
const startNumber = 1;
const endNumber = 100;

getWordToPrint = number => {
  let wordToPrint;
  try {
    wordToPrint = getRandomWordSync({ withErrors: true });
  } catch (error) {
    wordToPrint = false;
  }

  const isMultipleOfThree = number % 3 === 0;
  const isMultipleOfFive = number % 5 === 0;

  if (isMultipleOfThree && isMultipleOfFive) {
    wordToPrint = 'FizzBuzz';
  } else if (isMultipleOfThree) {
    wordToPrint = 'Fizz';
  } else if (isMultipleOfFive) {
    wordToPrint = 'Buzz';
  } else if (!wordToPrint) {
    wordToPrint = `It shouldn't break anything!`;
  }
  return wordToPrint;
};

for (i = startNumber; i <= endNumber; i++) {
  const randomWord = getWordToPrint(i);
  const formattedString = `${i}: ${randomWord}`;
  console.log(formattedString);
}

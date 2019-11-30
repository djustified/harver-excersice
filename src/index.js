const { getRandomWord } = require('word-maker');
const fileSystem = require('fs');

console.log('It works!');

// YOUR CODE HERE

// Set Path to store the generated strings
const path = '../randomWords-task2-async.txt'

// Remove file if it already exists
fileSystem.unlink(path, (error) => {
  if (error) {
    return
  }
})

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
  } else if (!wordToPrint) {
    wordToPrint = `It shouldn't break anything!`;
  }
  return wordToPrint;
};

async function printRandomNumbers() {
  for (i = startNumber; i <= endNumber; i++) {
    let randomWord;
    try {
      randomWord = await getRandomWord({ withErrors: true });
    } catch (error) {
      randomWord = false;
    }
    const wordToPrint = getWordToPrint(i, randomWord);
    const formattedString = `${i}: ${wordToPrint}`;
    fileSystem.appendFile(
      path,
      `${formattedString}\n`,
      (error) => {
        if (error) throw error;
        if (i === 100) {
          console.log(`Saved as ${path}. You can find this file  in the project root folder`)
        }
      });
  }
}

printRandomNumbers();
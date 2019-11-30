const { getRandomWord } = require('word-maker');
const fileSystem = require('fs');

console.log('It works!');

// YOUR CODE HERE

// Set Path to store the generated strings
const path = '../randomWords-task1-async.txt'

//Remove file if it already exists
fileSystem.unlink(path, (error) => {
  if (error) {
    return
  }
})

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
const { getRandomWordSync } = require('word-maker');
const fileSystem = require('fs');

console.log('It works!');

// YOUR CODE HERE

// Set Path to store the generated strings
const path = '../randomWords-sync.txt'
const startNumber = 1;
const endNumber = 100;

// Remove file if it already exists
fileSystem.unlink(path, (error) => {
  if (error) {
    return
  }
})

writeStringsToFile = (i,formattedString) => {
  fileSystem.appendFile(
    path,
    `${formattedString}\n`,
    (error) => {
      if (error) throw error;
      if (i === endNumber) {
        console.log(`Saved as ${path}. You can find this file  in the project root folder`)
      }
    });
}

for (i = startNumber; i <= endNumber; i++) {
  let randomWord;
    try {
      randomWord =  getRandomWordSync({ withErrors: true });
    } catch (error) {
      randomWord = `It shouldn't break anything!`;
    }
  const formattedString = `${i}: ${randomWord}`;
  writeStringsToFile(i,formattedString)
}
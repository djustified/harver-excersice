const { getRandomWordSync } = require('word-maker');

console.log('It works!');

// YOUR CODE HERE
const startNumber = 1;
const endNumber = 100;

for (i = startNumber; i <= endNumber; i++) {
  const randomWord = getRandomWordSync();
  const formattedString = `${i}: ${randomWord}`;
  console.log(formattedString);
}

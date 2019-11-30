const { getRandomWord, randomInRange } = require('word-maker');
const fileSystem = require('fs');
const axios = require('axios').default;

console.log('It works!');

// YOUR CODE HERE

console.log(
  '<<<<<<- Running Task2:Bonus2 in Asynchronous Concurrent mode ->>>>>>'
);

// Set Path to store the generated strings
const path = '../Task2-async-concurrent.txt';
const startNumber = 1;
const endNumber = 100;
const apiURL = 'http://localhost/Api/posts';
let randomStringsList = [];
let writeStream = fileSystem.createWriteStream('../Task2-async-concurrent.txt');

// Remove file if it already exists
fileSystem.unlink(path, error => {
  if (error) {
    return;
  }
});

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

writeStringsToFile = (i, formattedString) => {
  // unsorted records
  writeStream.write(`${formattedString}\n`, 'UTF-8', error => {
    if (error) throw error;
  });
};

postStingsToApi = async data => {
  return axios({
    method: 'POST',
    url: `${apiURL}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    data: data
  });
};

async function printRandomNumbers() {
  for (i = startNumber; i <= endNumber; i++) {
    function sleep(fn, j) {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(fn(j)), 250);
      });
    }
    async function randomizeWords(k) {
      let randomWord;
      try {
        randomWord = await getRandomWord({ withErrors: true, slow: true });
        const wordToPrint = getWordToPrint(k, randomWord);
        const formattedString = `${k}: ${wordToPrint}`;
        randomStringsList.push(formattedString);
        writeStringsToFile(k, formattedString);
        if (i === endNumber) {
          try {
            await postStingsToApi(randomStringsList);
          } catch (error) {
            console.log('unable to post to API');
          }
        }
      } catch (error) {
        return;
      }
    }
    sleep(randomizeWords, i);
  }
}

printRandomNumbers();

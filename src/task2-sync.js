const { getRandomWordSync } = require('word-maker');
const fileSystem = require('fs');
const axios = require('axios').default;

console.log('It works!');

// YOUR CODE HERE

console.log('<<<<<<- Running Task2 in Synchronous mode ->>>>>>');

// Set Path to store the generated strings
const path = '../Task2-sync.txt'
const startNumber = 1;
const endNumber = 100;
const apiURL = 'http://localhost/Api/posts';
let randomStringsList=[]

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

postStingsToApi = async data => {
  return axios({
    method: 'POST',
    url: `${apiURL}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    data: data
  }).catch(function (error) {
    console.log('unable to post to API');
  });;

};

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
  randomStringsList.push(formattedString);
  writeStringsToFile(i, formattedString);
  if (i === endNumber) {
    postStingsToApi(randomStringsList);
  }
}

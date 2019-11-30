const { getRandomWord } = require('word-maker');
const fileSystem = require('fs');
const axios = require('axios').default;

console.log('It works!');

// YOUR CODE HERE

console.log('<<<<<<- Running Task2 in Asynchronous mode ->>>>>>');

// Set Path to store the generated strings
const path = '../Task2-async.txt'
const startNumber = 1;
const endNumber = 100;
const apiURL = 'http://localhost/Api/posts';
let randomStringsList=[]
let writeStream = fileSystem.createWriteStream('../Task2-async-sorted.txt');

// Remove file if it already exists
fileSystem.unlink(path, (error) => {
  if (error) {
    return
  }
})

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

writeStringsToFile = (i,formattedString) => {
  // unsorted records
  fileSystem.appendFile(path, `${formattedString}\n`, error => {
    if (error) throw error;
    if (i === endNumber) {
      console.log(
        `Saved as ${path}. You can find this file  in the project root folder`
      );
    }
  });

//sorted records
writeStream.write(`${formattedString}\n`, 'UTF-8', error => {
  if (error) throw error;
  if (i === endNumber) {
    console.log(
      `Saved as ../Task2-async-sorted.txt You can find this file  in the project root folder`
    );
    // close the stream
    writeStream.end();
  }
});
}

postStingsToApi = async data => {
  return axios({
    method: 'POST',
    url: `${apiURL}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    data: data
  });
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
    randomStringsList.push(formattedString)
    writeStringsToFile(i,formattedString)
    if (i === endNumber) {
      try {
        await postStingsToApi(randomStringsList)
      } catch (error){
        console.log('unable to post to API')
      }
    }
  }
}

printRandomNumbers();
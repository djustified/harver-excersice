const { getRandomWord } = require('word-maker');
const fileSystem = require('fs');
const axios = require('axios').default;

console.log('It works!');

// YOUR CODE HERE

console.log(
  '<<<<<<- Running Task1:Bonus2 in Synchronous Concurrent mode ->>>>>>'
);

// Set Path to store the generated strings
const path = 'Task1-async-concurrent.txt';
const startNumber = 1;
const endNumber = 100;
const apiURL = 'http://localhost/Api/posts';
let randomStringsList = [];
let writeStream = fileSystem.createWriteStream('Task1-async-concurrent.txt');

// Remove file if it already exists
fileSystem.unlink(path, error => {
  if (error) {
    return;
  }
});

writeStringsToFile = (i, formattedString) => {
  // unsorted records
  writeStream.write(`${formattedString}\n`, 'UTF-8', error => {
    if (error) {
      throw error;
    }
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
  }).catch(function(error) {
    console.log('unable to post to API');
  });
};

async function printRandomNumbers() {
  let promises = [];

  for (i = startNumber; i <= endNumber; i++) {
    function sleep(fn, j) {
      promises.push(
        new Promise((resolve, reject) => {
          setTimeout(() => resolve(fn(j)), 1);
        })
      );
    }

    async function randomizeWords(k) {
      let randomWord;
      try {
        randomWord = await getRandomWord({ withErrors: true, slow: true });
        const formattedString = `${k}: ${randomWord}`;
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

  Promise.all(promises)
    .then(() => {
      console.log(
        `Saved as Task1-async-concurrent.txt You can find this file  in the project root folder`
      );
    })
    .finally(() => {
      // close the stream
      writeStream.end();
    });
}

printRandomNumbers();

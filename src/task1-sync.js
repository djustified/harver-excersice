const { getRandomWordSync } = require('word-maker');
const fileSystem = require('fs');
const axios = require('axios').default;

console.log('It works!');

// YOUR CODE HERE

console.log('<<<<<<- Running Task1 in Synchronous mode ->>>>>>');

// Set Path to store the generated strings
const path = '../Task1-sync.txt';
const startNumber = 1;
const endNumber = 100;
const apiURL = 'http://localhost/Api/posts';
let randomStringsList = [];

// Remove file if it already exists
fileSystem.unlink(path, error => {
  if (error) {
    return;
  }
});

writeStringsToFile = (i, formattedString) => {
  fileSystem.appendFile(path, `${formattedString}\n`, error => {
    if (error) throw error;
    if (i === endNumber) {
      console.log(
        `Saved as ${path}. You can find this file  in the project root folder`
      );
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
    }).catch(function (error) {
      console.log('unable to post to API');
    });;
  
};

for (i = startNumber; i <= endNumber; i++) {
  let randomWord;
  try {
    randomWord = getRandomWordSync({ withErrors: true });
  } catch (error) {
    randomWord = `It shouldn't break anything!`;
  }
  const formattedString = `${i}: ${randomWord}`;
  randomStringsList.push(formattedString);
  writeStringsToFile(i, formattedString);
  if (i === endNumber) {
    postStingsToApi(randomStringsList);
  }
}

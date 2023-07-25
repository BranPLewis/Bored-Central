var tiles = document.querySelectorAll(".letter");

var possibleAnswers = [];
var usedWords = [];

var NUM_GUESSES = 6;
var WORD_LENGTH = 5;

var Winner = false;

var check_X = [1, 2, 3, 4];

var turn = document.querySelector(".turn");

var correctLetter = 2;
var inWord = 1;
var incorrectLetter = 0;

var gameOver = false;

var currentGuess = "";

var winNumber = 0;

//link to the list of words
//https://api.jsonbin.io/v3/b/629f9937402a5b38021f6b38

//Date and time generation
var dateTime = moment().format("YYYY,MM,DD;HH:mm");
var dateNumber = parseInt(dateTime, 10);
console.log(dateTime);

function pickRandomWord() {
  correctWord = possibleAnswers[dateNumber % possibleAnswers.length];
  console.log(correctWord);
}

function getWordList() {
  fetch(
    "https://raw.githubusercontent.com/chidiwilliams/wordle/main/src/data/words.json"
  ).then(function (response) {
    response.json().then(function (data) {
      possibleAnswers = data;
      validWords = data;
      console.log(validWords);
      pickRandomWord();
    });
  });
}

function updateGuesses() {
  var allGuesses = document.querySelector("#allGuesses");
  allGuesses.innerHTML = "";
  for (var i = 0; i < NUM_GUESSES; i++) {
    var newGuess = document.createElement("div");
    newGuess.classList.add("guess");
    var output;
    if (i < usedWords.length) {
      output = checkWord(usedWords[i], correctWord);
      console.log(output);
      newGuess.classList.add("guessed");
    }
    for (var j = 0; j < WORD_LENGTH; j++) {
      var newLetter = document.createElement("span");
      newLetter.classList.add("letter");
      if (i < usedWords.length) {
        newLetter.innerHTML = usedWords[i][j];

        if (output[j] == 2) {
          newLetter.classList.add("match");
          newLetter.classList.add("green");
        } else if (output[j] == 1) {
          newLetter.classList.add("contains");
          newLetter.classList.add("yellow");
        } else if (output[j] == 0) {
          newLetter.classList.add("wrong");
        }
      } else if (i == usedWords.length) {
        if (j < currentGuess.length) {
          newLetter.innerHTML = currentGuess[j];
        }
      }
      newGuess.appendChild(newLetter);
    }
    allGuesses.appendChild(newGuess);
  }
}

function checkWord(guessWord, rightWord) {
  var checkArray = [0, 0, 0, 0, 0];
  correctWord = rightWord;
  correctWordArray = rightWord.split("");
  guessword = guessWord;
  guessWordArray = guessWord.split("");
  for (i = 0; i < WORD_LENGTH; i++) {
    for (s = 0; s < WORD_LENGTH; s++) {
      if (guessWordArray[i] == correctWordArray[s]) {
        if (i == s) {
          checkArray[i] = 2;
          correctWordArray[s] = null;
          break;
        } else {
          checkArray[i] = 1;
          correctWordArray[s] = null;
          break;
        }
      } else {
        checkArray[i] = 0;
      }
    }
  }
  return checkArray;
}

function makeGuess() {
  var messageDiv = document.querySelector("#message");

  if (!gameOver) {
    if (currentGuess.length != 5) {
      messageDiv.innerHTML = "Five letters please.";
    } else if (!validWords.includes(currentGuess)) {
      messageDiv.innerHTML = "Not a real word.";
    } else {
      var lastGuess = currentGuess;
      usedWords.push(lastGuess);
      currentGuess = "";

      if (lastGuess == correctWord) {
        messageDiv.innerHTML = "You win!";
        gameOver = true;
      } else {
        messageDiv.innerHTML = "";
      }

      updateGuesses();
    }

    if (usedWords.length >= NUM_GUESSES && !gameOver) {
      gameOver = true;
      messageDiv.innerHTML = "You Lose!";
    }
  }
}

keyboardWord = "";

function setupKeys() {
  var currentWordDiv = document.querySelector("#current-word");
  document.onkeydown = function (event) {
    if (event.key == "Enter") {
      makeGuess();
    } else if (event.keyCode >= 65 && event.keyCode <= 90) {
      if (currentGuess.length < 5) {
        currentGuess += event.key;
        console.log("Current Guess: ", currentGuess);
      }
    } else if (event.key == "Backspace") {
      currentGuess = currentGuess.slice(0, -1);
      console.log("Current Guess: ", currentGuess);
    } else {
      console.log(event.key);
    }

    if (!gameOver) {
      updateGuesses();
    }
  };
}

getWordList();
updateGuesses();
setupKeys();

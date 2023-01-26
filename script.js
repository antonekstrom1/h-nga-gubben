let alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
let availableWords = [
  "BANANA",
  "DOG",
  "POKEMON",
  "CLOUDS",
  "COMPUTER",
  "SWEDEN",
  "BREAD",
  "CAR",
  "HEART",
  "GUITAR",
  "JAVASCRIPT",
];
let activeWordArray = [];
let outputArray = [];

let clickedLetter;
let activeWord;
let letterContainer;
let guessedLetterContainer;

let count = 0;
let points = 0;

let wordContainer = document.querySelector(".word");
let guessedContainer = document.querySelector(".nomatch");
let retryBtn = document.querySelector(".retry");
let playAgainBtn = document.querySelector(".play-again");
let resetGameBtn = document.querySelector(".reset-game");
let resetBtn = document.querySelector("#reset");

newGame(); //Initiates a new game

//Adds an eventlistener to the retry, play again and reset btns that initiates a new game.
retryBtn.addEventListener("click", () => {
  document.querySelector(".game-over").classList.remove("show");
  newGame(); //Calls newGame function to start a new game
});
playAgainBtn.addEventListener("click", () => {
  document.querySelector(".game-win").classList.remove("show");
  newGame(); //Calls newGame function to start a new game
});
resetGameBtn.addEventListener("click", () => {
  document.querySelector(".reset-game").classList.remove("show");
  location.reload(); //Reloads the page and a new game starts. Points are set to zero
});

//Page reloads and game starts over when button is clicked. The score is reset to zero
resetBtn.addEventListener("click", () => {
  location.reload();
});

//Function that starts a new game. Previous points are saved.
function newGame() {
  count = 0;
  resetHangman();
  document.querySelector(".keyboard").replaceChildren(); //Removes remaining keys in keyboard
  guessedContainer.replaceChildren(); //Removes all guessed letters from previous game
  document.querySelector(".score").innerHTML = "Your score: " + points; //Keeps the points
  outputArray = []; //outputArray i emptied
  activeWord = [];
  activeWordArray = [];

  createKeyboard(); //Renders a new complete keyboard
  generateWord(); //Generates a new word and associated word- and letter containers
}

//Function that creates a keyboard
function createKeyboard() {
  alphabet.forEach((letter) => {
    //Creates a div for each key
    let key = document.createElement("div");
    key.classList.add("key"); //Class of key is added for styling
    //Adds the letter to each key
    key.innerHTML = letter;
    //Adds the key to the keyboard
    document.querySelector(".keyboard").append(key);

    //Add eventlistener to each key
    key.addEventListener("click", () => {
      clickedLetter = key.innerHTML;
      key.setAttribute("class", "active"); //When clicked active is added as class

      checkLetter();
    });
  });
}

//Function that generates a random word from the availableWords list
function generateWord() {
  if (availableWords.length >= 1) {
    let randomIndex = Math.floor(Math.random() * availableWords.length);
    activeWord = availableWords[randomIndex]; //This is a string

    activeWordArray = activeWord.split(""); //This is an array

    //Creates an empty array that will be visible in the UI. Has the same length as activeWordArray.
    //Correct guessed letter will be added to this array.
    for (let i = 0; i < activeWordArray.length; i++) {
      outputArray.push(" ");
    }

    //Remove activeWord from availableWords
    availableWords.splice(randomIndex, 1);

    updateLetterContainer();
  } else {
    resetGame();
  }
}

//Function that creates boxes/containers for each letter/item in outputArray.
function updateLetterContainer() {
  wordContainer.replaceChildren(); //Removes all elements in order to render them again

  //Create a list element for each letter in activeWord/outputArray
  //Adds the list element to the wordContainer
  //Adds the letter "value" to the list element in the wordContainer
  for (let i = 0; i < outputArray.length; i++) {
    letterContainer = document.createElement("li");
    wordContainer.append(letterContainer);
    letterContainer.innerHTML = outputArray[i];
  }
}

//Function that updates/adds a guessed letters to the "nomatch" section
//Creates a list element for each guessed letter
function updateGuessedContainer() {
  guessedLetterContainer = document.createElement("li");
  guessedContainer.append(guessedLetterContainer);
  guessedLetterContainer.innerHTML = clickedLetter;
}

function checkLetter() {
  for (let i = 0; i < activeWordArray.length; i++) {
    //Loops through the activeWordArray and checks if the clickedLetter matches any of the items in the array
    //If matched the letter is added to the outputArray at the correct index, and is visible in the UI
    if (activeWordArray[i] === clickedLetter) {
      outputArray[i] = clickedLetter;
      updateLetterContainer();
    }
  }

  //If activeWordArray is equal to the outputArray the user has won and gets one point
  //The functions compareArrays takes two arrays as argument. It converts them to strings and returns true if equal.
  if (compareArrays(activeWordArray, outputArray)) {
    //One point is added when the user guess the correct word
    points = points + 1;
    document.querySelector(".score").innerHTML = "Your score: " + points;
    gameWin();
  }

  //If the clickedLetter is not matched to any items in the activeWordArray
  //The the clickedLetter is added to the updateGuessedContainer and visibile in the UI
  if (activeWordArray.includes(clickedLetter) == false) {
    updateGuessedContainer();

    //The count keeps track of the number of lives the user has. Each wrong guess adds one to the count.
    //When count reaches 5 the game is lost
    count = count + 1;

    //function that draw a hangman component when guessed letter is wrong
    hangman(count);
  }
}

//The functions compareArrays takes two arrays as argument. It converts them to strings and returns true if equal.
function compareArrays(arr1, arr2) {
  return arr1.toString() === arr2.toString();
}

//Function that adds a hangman part based on count/wrong guess
function hangman(count) {
  if (count === 1) {
    document.querySelector("figure").classList.add("scaffold");
  } else if (count === 2) {
    document.querySelector("figure").classList.add("head");
  } else if (count === 3) {
    document.querySelector("figure").classList.add("body");
  } else if (count === 4) {
    document.querySelector("figure").classList.add("arms");
  } else if (count === 5) {
    document.querySelector("figure").classList.add("legs");
    gameOver();
  }
}

function resetHangman() {
  document
    .querySelector("figure")
    .classList.remove("scaffold", "head", "body", "arms", "legs");
}

function gameOver() {
  document.querySelector(".game-over").classList.add("show"); //Adds the show-class to activate game-over styling
  document
    .querySelector(".game-over")
    .querySelector("p")
    .querySelector("b").innerText = activeWord;
}

function gameWin() {
  document.querySelector(".game-win").classList.add("show"); //Adds the show-class to activate game-win styling

  // Total points are shown in the end
  document
    .querySelector(".game-win")
    .querySelector("p")
    .querySelector("b").innerText = points;
}

function resetGame() {
  document.querySelector(".reset-game").classList.add("show"); //Adds the show-class to activate reset-game styling
}

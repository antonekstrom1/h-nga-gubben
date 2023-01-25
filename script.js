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
let availableWords = ["BANANA", "DOG", "POKEMON", "CLOUDS", "COMPUTER", "SWEDEN", "BREAD", "CAR", "HEART", "GUITAR", "JAVASCRIPT"];
let clickedLetter;
let activeWord;
let activeWordArray = [];
let outputArray = [];
let letterContainer;
let guessedLetterContainer;
let count = 0;
let points = 0;

//Adds points to the score section
document.querySelector(".score").innerHTML = ("Your score: ") + points;

createKeyboard();
generateWord();

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
          key.setAttribute("class", "active") //When clicked active is added as class

          checkLetter();
      });
  });
};

//Function that generates a random word from the availableWords list
function generateWord() {
  let randomIndex = (Math.floor(Math.random() * availableWords.length)); 
  activeWord = availableWords[randomIndex]; //This is a string
  activeWordArray = activeWord.split(""); //This is an array

  //Creates an empty array that will be visible in the UI. Has the same length as activeWordArray.
  //Correct guessed letter will be added to this array.
  for(let i = 0; i < activeWordArray.length; i++) {
      outputArray.push(" ");
  };

  updateLetterContainer();

  //Remove activeWord from availableWords
  availableWords.splice(randomIndex, 1);
};

//Function that creates boxes/containers for each letter/item in outputArray.
function updateLetterContainer() {
  let wordContainer = document.querySelector(".word");
  wordContainer.replaceChildren(); //Removes all elements in order to render them again

  //Create a list element for each letter in activeWord/outputArray
  //Adds the list element to the wordContainer
  //Adds the letter "value" to the list element in the wordContainer
  for(let i = 0; i < outputArray.length; i++) {
      letterContainer = document.createElement("li");
      wordContainer.append(letterContainer);
      letterContainer.innerHTML = outputArray[i];
  };
};

//Function that updates/adds a guessed letters to the "nomatch" section
//Creates a list element for each guessed letter
function updateGuessedContainer() { 
  let guessedContainer = document.querySelector(".nomatch");
  guessedLetterContainer = document.createElement("li");
  guessedContainer.append(guessedLetterContainer);
  guessedLetterContainer.innerHTML = clickedLetter;
};

function checkLetter() {
  for(let i = 0; i < activeWordArray.length; i++) {
      //Loops through the activeWordArray and checks if the clickedLetter matches any of the items in the array
     //If matched the letter is added to the outputArray at the correct index, and is visible in the UI
      if(activeWordArray[i] === clickedLetter) {
          outputArray[i] = clickedLetter;
          updateLetterContainer()

          //For every correct answer the user gets one point
          points = points + 1;
          document.querySelector(".score").innerHTML = ("Your score: ") + points;
      };
  };

  //If activeWordArray is equal to the outputArray the user has won and gets one point
  //The functions compareArrays takes two arrays as argument. It converts them to strings and returns true if equal.
  if(compareArrays(activeWordArray,outputArray)) {
      gameWin();
  };

  //If the clickedLetter is not matched to any items in the activeWordArray
  //The the clickedLetter is added to the updateGuessedContainer and visibile in the UI
  if(activeWordArray.includes(clickedLetter) == false) {
      updateGuessedContainer();

      //The count keeps track of the number of lives the user has. Each wrong guess adds one to the count.
      //When count reaches 5 the game is lost 
      count = count + 1;

      //function that draw a hangman component when guessed letter is wrong
      hangman(count);

      //For every wrong guess the user looses one point
      points = points - 1;
      document.querySelector(".score").innerHTML = ("Your score: ") + points;
  };
};

//The functions compareArrays takes two arrays as argument. It converts them to strings and returns true if equal.
function compareArrays(arr1,arr2) {
  return arr1.toString() === arr2.toString();
};

//Function that adds a hangman part based on count/wrong guess
function hangman(count) {
  if(count === 1){
    document.querySelector('figure').classList.add('scaffold')
  } else if (count === 2) {
    document.querySelector('figure').classList.add('head')
  } else if (count === 3) {
    document.querySelector('figure').classList.add('body')
  } else if (count === 4) {
    document.querySelector('figure').classList.add('arms')
  } else if (count === 5) {
    document.querySelector('figure').classList.add('legs')
    gameOver();
  }
};

function gameOver() {
  document.querySelector(".game-over").classList.add("show"); //Adds the show-class to activate game-over styling
  document.querySelector(".game-over").querySelector("p").querySelector("b").innerText = activeWord;
  let retryBtn = document.querySelector(".retry")
  retryBtn.addEventListener("click", () => { //Page reloads and game starts over when button is clicked
      location.reload();
      document.querySelector(".game-over").classList.remove("show");
      // newGame();
  });
};

function gameWin() {
  document.querySelector(".game-win").classList.add("show"); //Adds the show-class to activate game-win styling

  //Total points are shown in the end
  document.querySelector(".game-win").querySelector("p").querySelector("b").innerText = points;
  let retryBtn = document.querySelector(".play-again")
  retryBtn.addEventListener("click", () => { //Page reloads and game starts over when button is clicked
      location.reload();
      document.querySelector(".game-win").classList.remove("show");
      // newGame();
  });
};

let resetBtn = document.querySelector("#reset");
  resetBtn.addEventListener("click", () => {
      location.reload();
});



// function newGame() {
//   document.querySelector(".keyboard").replaceChildren();
//   wordContainer.replaceChildren();
//   createKeyboard();
//   generateWord();
//   guessedContainer.replaceChildren(); //Removes all guessed letter som previous game
//   document.querySelector(".score").innerHTML = ("Your score: ") + points; //Keeps the points
// };

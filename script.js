/**
 För att toggla SVG:en
 document.querySelector('figure').classList.add('scaffold')
 document.querySelector('figure').classList.add('head')
 document.querySelector('figure').classList.add('body')
 document.querySelector('figure').classList.add('arms')
 document.querySelector('figure').classList.add('legs')
 */
// Skapa en funktion som tar count som argument 

const alphabet = [ //Borde vara const istället?
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
  let availableWords = ["BANANA", "DOG", "POKEMON", "CLOUDS"]; //Ska den vara const?
  let availableLetters = [ //Borde vara const istället?
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
let guessedWords = [];
let guessedLetters = [];

let usedWords = [];
let activeWord
let wordArray = [];
let count = 0;
let points = 0;
let letterContainer;
let guessedLetterContainer;
let outputArray = []; // Array that is viewed in UI
let clickedLetter;

let pointContainer = document.createElement("h3");
document.querySelector("main").append(pointContainer);
pointContainer.innerHTML = points;

generateWord();


function generateWord() {
    let randomIndex = (Math.floor(Math.random() * availableWords.length)); //Gets random number between 0 and 4 (?) corresponding to an index.
    activeWord = availableWords[randomIndex];
    wordArray = activeWord.split(""); //Changes activeWord to array.
    console.log(wordArray);
    for (let i = 0; i<wordArray.length; i++) {
      outputArray.push(" ");
    };

    updateLetterContainer(); //Creates boxes for each letter

    usedWords.push(activeWord); //Adds activeWord to usedWords
    availableWords.splice(randomIndex, 1); //Removes activeWord from availableWords
};

function updateLetterContainer(){
  let wordContainer = document.querySelector(".word");
  wordContainer.replaceChildren(); //Removes all the boxes
  for(let i = 0; i < outputArray.length; i++) {
    letterContainer = document.createElement("li"); //Creates a listelement
    wordContainer.append(letterContainer); //Adds listelement to the wordContainer
    letterContainer.innerHTML = outputArray[i]; //Adds letter to listelement in wordContainer
  };
};

function updateGuessedContainer() {
  let guessedContainer = document.querySelector(".nomatch");
  guessedLetterContainer = document.createElement("li");
  guessedContainer.append(guessedLetterContainer);
  guessedLetterContainer.innerHTML = clickedLetter;
}

//Creates keyboard and adds an eventlistener to each key - kan vi bryta ut funktionerna?
alphabet.forEach((letter) => {
    let key = document.createElement("div");
    key.classList.add("key");
    key.innerHTML = letter;
    document.querySelector(".keyboard").append(key);

    key.addEventListener("click", ()=> {
      clickedLetter = key.innerHTML; // Kanske bryta ut funktionen till checkLetter??
      key.setAttribute("class","active"); //Adds class active to clicked letter
      
      for (let i = 0; i < wordArray.length; i++) {
        if(wordArray[i] === clickedLetter) {
          outputArray[i] = clickedLetter;
          updateLetterContainer();
        }  
      };
      if(wordArray.includes(clickedLetter) == false) {
        updateGuessedContainer();
        count = count + 1;
        hangman(count); //Draw hangman component
      } 
      
      if(compareArrays(wordArray, outputArray)) {
        points = points + 1;
        pointContainer.innerHTML = points;
        gameWin();
      }
    });
  });


function compareArrays(arr1,arr2) {
  return arr1.toString() === arr2.toString();
};

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
  document.querySelector('.game-over').classList.add('show');
  document.querySelector(".game-over").querySelector("p").querySelector("b").innerText = activeWord;
  let retryBtn = document.querySelector(".retry")
  retryBtn.addEventListener('click', () => {
    location.reload(); //Borde vara new game istället dvs bbehålla poäng.
  });
};

function gameWin() {
  document.querySelector('.game-win').classList.add('show');
  retryBtn = document.querySelector(".retry")
  retryBtn.addEventListener('click', () => {
    location.reload(); //Borde vara new game istället dvs bbehålla poäng. //VARFÖR FUNKAR DET INTE ATT RELODA?
  });
};


//New game funktion
//Använda ord ska inte genereras igen
/**
 För att toggla SVG:en
 document.querySelector('figure').classList.add('scaffold')
 document.querySelector('figure').classList.add('head')
 document.querySelector('figure').classList.add('body')
 document.querySelector('figure').classList.add('arms')
 document.querySelector('figure').classList.add('legs')
 */

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
  let availableLetters =[
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
let outputArray = []; // Array that is viewed in UI

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
    availableWords.splice(randomIndex, 1); //Removes activeWord from 
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

generateWord();

//Creates keyboard and adds an eventlistener to each key
alphabet.forEach((letter) => {
    let key = document.createElement("div");
    key.classList.add("key");
    key.innerHTML = letter;
    document.querySelector(".keyboard").append(key);

    key.addEventListener("click", ()=> {
      let clickedLetter = key.innerHTML; // Kanske bryta ut funktionen till checkLetter??
      for (let i = 0; i < wordArray.length; i++) {
        if(wordArray[i] === clickedLetter) {
          outputArray[i] = clickedLetter;
          updateLetterContainer();
        };
      };
    });
});

// function checkLetter() {
  
// }



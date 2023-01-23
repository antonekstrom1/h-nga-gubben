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
let activeWord;
let usedWords = [];

function generateWord() {
    let randomIndex = (Math.floor(Math.random() * availableWords.length));
    activeWord = availableWords[randomIndex];
   
    usedWords.push(activeWord);
    availableWords.splice(randomIndex, 1);
    
    // console.log(usedWords);
    // console.log(activeWord);
    // console.log(availableWords);

    //Skriv ut lika många boxar som det finns bokstäver i ordet
    
};

function checkLetter() {
    document.addEventListener("keydown", function(letter) {
        console.log("Key pressed: " + letter.key);
    });
}



generateWord();

//Man skulle kunna skriva ut order som genereras men att varje bokstav får opacity 0.
//När man gissar rätt--> opacity 1.
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

let count = 0;
let points = 0;

function generateWord() {
    let randomIndex = (Math.floor(Math.random() * availableWords.length)); //Gets random number between 0 and 4 (?) corresponding to an index.
    let wordContainer = document.querySelector(".word"); //Creates a container for the activeWord
    activeWord = availableWords[randomIndex]; //Set active word to random word from list availableWords through random index.
    wordContainer.innerHTML = activeWord; //Insert activeWord to wordContainer

   
    usedWords.push(activeWord); //Adds activeWord to usedWords
    availableWords.splice(randomIndex, 1); //Removes activeWord from 
};

function checkLetter() {
    document.addEventListener("keydown", function(letter) {
        console.log("Key pressed: " + letter.key);
    });
}

generateWord();

alphabet.forEach((letter) => {
    let key = document.createElement("div");
    key.classList.add("key");
    key.innerHTML = letter;
    document.querySelector(".keyboard").append(key);
});



// function createCard (list) {
//     for (let i = 0; i < pokemons.length; i++) {
//         pokemon = pokemons[i]

//        let color = getColor(pokemon.type);
//        console.log(color);

//         let pokemonCard = document.createElement("article");
//         pokemonCard.classList.add("card", pokemon.name);
    
//         pokemonCard.innerHTML = `
//         <div class="colorBox ${color}"></div>
//         <section class="pokemonSpec">
//             <h4>${pokemon.name}</h4>
//             <p>${pokemon.cp} CP</p>
//         </section>
//         `;
//         document.querySelector(".placeholder").appendChild(pokemonCard);
//     };
// };
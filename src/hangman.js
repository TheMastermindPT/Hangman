// Globals

const categories = {
  animals: [
    "Atum",
    "Coelho",
    "Cobra",
    "Coiote",
    "Coelho",
    "Raposa",
    "Avestruz",
    "Bacalhau",
    "Chita",
    "Leao",
    "Tigre"
  ]
};

const words = categories.animals;
const wordDisplay = document.querySelector("#container__input--game");
const livesContainer = document.querySelector(".container__lives");
const livesDisplay = document.getElementsByClassName("fas");
const guessesDisplay = document.querySelector(".container__guesslist");
const successSFX = new Audio("./sound/right.mp3");
const errorSFX = new Audio("./sound/errou.mp3");
let isCompleted = 0;

// Randomize number
const randomize = (min = 0, max = words.length - 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Declare Class and constructor function for Game
class Game {
  constructor(word, lives) {
    this.word = word.toLowerCase().split("");
    this.lives = lives;
    this.guesses = word.replace(/[A-Z]/gi, "-").split("");
    this.failed = [];
  }

  // Renders the word on the screen
  renderWord() {
    wordDisplay.value = this.guesses.join("").toUpperCase();

    // Print lives hearts to the screen
    livesContainer.innerHTML = "";
    for (let i = 0; i < this.lives; i++) {
      const liveSymbol = document.createElement("i");
      liveSymbol.classList.add("fas", "fa-heart");
      livesContainer.appendChild(liveSymbol);
    }

    // Displays missed guesses to the screen
    guessesDisplay.innerHTML = "";
    this.failed.forEach((element, index) => {
      const wrongLetter = document.createElement("li");
      wrongLetter.textContent = element.toUpperCase();
      wrongLetter.setAttribute("id", index);
      const lastInserted = document.getElementById(`${index - 1}`);
      guessesDisplay.insertBefore(wrongLetter, lastInserted);
    });
  }
  // Checks if character was already entered and attempts done
  checkCharacter(character) {
    if (this.lives && isCompleted !== this.word.length) {
      // Tries to find char in the Word/Guess arrays that belong to the object
      const foundCharOnWord = this.word.find(element => element === character);
      const foundCharOnGuess = this.guesses.find(
        element => element === character
      );
      const alreadyGuessed = this.failed.includes(character);

      // Loops trough Word array / Adds char to Guess Array
      this.word.forEach((element, index) => {
        if (character === element && !foundCharOnGuess) {
          this.guesses[index] = character;
          isCompleted++;
        }
      });

      if (!foundCharOnWord && !alreadyGuessed) {
        this.lives--;

        if (!alreadyGuessed) {
          this.failed.push(character);
        }
      }
      this.renderWord();
      return true;
    }
    return false;
  }
}

function resetGame() {
  if (isCompleted === game.word.length || game.lives === 0) {
    if (isCompleted === game.word.length) {
      successSFX.play();
    } else if (game.lives === 0) {
      errorSFX.play();
    }

    wordDisplay.value = game.word.join("").toUpperCase();

    setTimeout(() => {
      guessesDisplay.innerHTML = "";
      game = new Game(words[randomize()], 5);
      isCompleted = 0;
      game.renderWord();
    }, 1500);
  }
}

// Initialize Game with random words
const newGame = () => {
  return new Game(words[randomize()], 5);
}

let game = newGame();
game.renderWord();

export {Game as default, game, resetGame};

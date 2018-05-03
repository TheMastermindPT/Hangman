import gameClass, {game, resetGame} from "./hangman"

// Listens for user character inputs
document.addEventListener("keyup touchend", e => {
  e.keyCode >= 65 && e.keyCode <= 90 ? game.checkCharacter(e.key) : null;
  resetGame();
});

document.addEventListener("keyup", e => {
  e.keyCode >= 65 && e.keyCode <= 90 ? game.checkCharacter(e.key) : null;
  resetGame();
});

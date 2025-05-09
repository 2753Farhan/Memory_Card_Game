import { startGame } from './game.js';


const gamecontolButton = document.getElementById("start-button");
const restastButton = document.getElementById("restart-button");

restastButton.addEventListener("click", () => {
  startGame();
  document.getElementById("win-message").style.display = "none";
  restastButton.style.display = "none";
});


gamecontolButton.addEventListener("click", () => {
  startGame();
  gamecontolButton.textContent = "Restart Game";
   
});

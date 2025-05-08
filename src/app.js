import { startGame } from './game.js';


const gamecontolButton = document.getElementById("start-button");

gamecontolButton.addEventListener("click", () => {
  startGame();
  gamecontolButton.textContent = "Restart Game";
   
});

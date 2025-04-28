
let cardArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
const board = document.getElementById("game-board")



let moveCounter = 1;
document.getElementById("move-value").innerHTML = moveCounter;


cardArray.forEach((card) => {   
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.textContent = card;
    board.appendChild(cardElement);
    cardElement.addEventListener("click", () => {
        cardElement.classList.toggle("flipped");
        moveCounter++;
        document.getElementById("move-value").innerHTML = moveCounter;
    });

})



document.getElementById("time-value").innerHTML = "00:00";



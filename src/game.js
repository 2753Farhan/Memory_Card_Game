
export function startGame(){

    let cardArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    cardArray = shuffle(cardArray);
    const board = document.getElementById("game-board")



    let moveCounter = 0;
    document.getElementById("move-value").innerHTML = moveCounter;

    let clickedCards = 0;
    

    
    cardArray.forEach((card) => {   
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.textContent = card;
        board.appendChild(cardElement);
        cardElement.addEventListener("click", () => {
            cardElement.classList.toggle("flipped");
            clickedCards++;
            if (clickedCards === 2) {
                moveCounter++;
                const flippedCards = document.querySelectorAll(".flipped:not(.matched)");
                if (flippedCards.length === 2) {
                    matchCards(flippedCards[0], flippedCards[1]);
                    clickedCards = 0;
                }
            }
            
            document.getElementById("move-value").innerHTML = moveCounter;
        });
    
    })
    let seconds = 0;
    setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const displaySeconds = seconds % 60;
        document.getElementById("time-value").innerHTML = `${String(minutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
        
    }, 1000);


    
    
    
    document.getElementById("time-value").innerHTML = "00:00";
    
}
function matchCards(card1, card2) {
    if (card1.textContent === card2.textContent) {
        card1.classList.add("matched");
        card2.classList.add("matched");
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
        }, 1000);
    }
}
    

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
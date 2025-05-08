
export function startGame(){

    if (window.timerInterval) {
        clearInterval(window.timerInterval);
    }

    let cardArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    cardArray = shuffle(cardArray);
    const board = document.getElementById("game-board");

    const matchState = {
        matchedCards: 0,
        // flippedCards: 0,
        // moveCounter: 0,
        seconds: 0,
    };
    let locked = false;


    let moveCounter = 0;
    document.getElementById("move-value").innerHTML = moveCounter;

    let clickedCards = 0;

    
    cardArray.forEach((card) => {   
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.textContent = card;
        board.appendChild(cardElement);
        cardElement.addEventListener("click",async () => {
            if (locked || cardElement.classList.contains("flipped") || cardElement.classList.contains("matched")) {
                return;
            }
            cardElement.classList.toggle("flipped");
            clickedCards++;
            if (clickedCards === 2) {
                moveCounter++;
                const flippedCards = document.querySelectorAll(".flipped:not(.matched)");
                if (flippedCards.length === 2) {
                    locked = true;
                    await matchCards(flippedCards[0], flippedCards[1], matchState);
                    clickedCards = 0;
                    locked = false;
                }
            }
            
            document.getElementById("move-value").innerHTML = moveCounter;
        });
    
    })
    // let seconds = 0;
    // setInterval(() => {
    //     matchState.seconds++;
    //     const minutes = Math.floor(matchState.seconds / 60);
    //     const displaySeconds = matchState.seconds % 60;
    //     document.getElementById("time-value").innerHTML = `${String(minutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
        
    // }, 1000);

    window.timerInterval = setInterval(() => {
        matchState.seconds++;
        const minutes = Math.floor(matchState.seconds / 60);
        const displaySeconds = matchState.seconds % 60;
        document.getElementById("time-value").innerHTML = 
            `${String(minutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
    }, 1000);

    document.getElementById("time-value").innerHTML = "00:00";
    
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function matchCards(card1, card2, match) {
    if (card1.textContent === card2.textContent) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        match.matchedCards += 1; // Increment matched cards by 2
        console.log(match.matchedCards);
        if (match.matchedCards === 8) {
            console.log("jhfdgvdfhgd")
            alert("You win!");
            document.getElementById("game-board").innerHTML = ""; // Clear the board
            startGame(); // Restart the game
        }

    } else {
        await delay(1000); // Wait for 1 second before flipping back
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
    }
}
    

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
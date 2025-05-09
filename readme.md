# Memory Card Game

A classic memory card matching game built with HTML, CSS, and JavaScript where players test their memory by finding matching pairs of cards.


## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [How to Play](#how-to-play)
- [Project Structure](#project-structure)
- [Game Mechanics](#game-mechanics)
- [JavaScript Concepts](#javascript-concepts)
- [Customization](#customization)
- [Future Enhancements](#future-enhancements)

## Description

Memory Card Game is a web-based concentration game where cards are placed face down, and players must find matching pairs by flipping them two at a time. The game tracks the number of moves and time elapsed, challenging players to complete the matching with the least number of attempts and in the shortest time possible.

## Features

- Customizable game difficulty (number of card pairs)
- Move counter to track attempts
- Timer to measure game duration
- Game completion detection with win message
- Restart functionality

## Installation

No installation is required to play this game. You can access the live version at:

[Play Memory Card Game](https://2753farhan.github.io/Memory_Card_Game/)

Alternatively, you can clone the repository and run it locally:

```bash
git clone https://github.com/yourusername/memory-card-game.git
cd memory-card-game
```

Open `index.html` in your browser to start playing locally.

## How to Play

1. Set the number of unique cards you want to play with using the input field (between 2 and 26)
2. Click the "Start Game" button to begin
3. Click on any card to flip it and reveal its letter
4. Try to find another card with the same letter
5. If the two flipped cards match, they stay face up and turn green
6. If they don't match, they flip back face down after a brief delay
7. Continue until all pairs are matched
8. Try to complete the game in the fewest moves and shortest time possible
9. When all cards are matched, you win! Click "Play Again" to start a new game

## Project Structure

```
memory-card-game/
├── index.html            # Main HTML file
├── styles/
│   └── main.css          # CSS styling for the game
├── src/
│   ├── app.js            # Main application entry point
│   └── game.js           # Game logic implementation
└── README.md             # This documentation file
```

### File Descriptions

- **index.html**: Contains the structure of the game including the game board, controls, and scoreboards
- **styles/main.css**: Handles all styling for cards, game board, and UI elements
- **src/app.js**: Initializes the game and sets up event listeners
- **src/game.js**: Contains the core game logic including card matching, timer, and win condition detection

## Game Mechanics

### Game State

The game maintains a state object with the following properties:

- `timerInterval`: Reference to the timer interval
- `moveCounter`: Number of move attempts made
- `clickedCards`: Number of cards currently flipped (0, 1, or 2)
- `locked`: Boolean to prevent clicking more cards during animations
- `matchState`: Object containing match progress information
- `cardElements`: Array of card DOM elements

### Card Matching

When two cards are flipped:
1. The moves counter increments
2. If the cards match:
   - They turn green and remain face up
   - The match counter increments
   - If all pairs are matched, the game ends
2. If cards don't match:
   - They flip back face down after a 1-second delay

### Timer

The timer starts when the game begins and displays minutes:seconds format. It stops when all matches are found.

## JavaScript Concepts

This project demonstrates several important JavaScript concepts and techniques:

### ES6+ Features
- **ES Modules** (`import`/`export`): Separating game logic into modular files
  ```javascript
  // app.js
  import { startGame } from './game.js';
  
  // game.js
  export function startGame() {
      // Game initialization logic
  }
  ```

- **Arrow Functions**: Used for callbacks and Promises
  ```javascript
  // Event listener with arrow function
  cardElement.addEventListener("click", async () => {
      if (gameState.locked || 
          cardElement.classList.contains("flipped") || 
          cardElement.classList.contains("matched")) {
          return;
      }
      // Card flipping logic
  });
  
  // Promise with arrow function
  function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
  ```

- **Template Literals**: For string formatting (e.g., in the timer display)
  ```javascript
  document.getElementById("time-value").innerHTML = 
      `${String(minutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
  ```

- **Destructuring Assignment**: Used in the card shuffling algorithm
  ```javascript
  function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]; // Destructuring for swap
      }
      return array;
  }
  ```

### DOM Manipulation
- Dynamic element creation and modification
  ```javascript
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.textContent = card;
  board.appendChild(cardElement);
  ```

- Event listeners for user interactions
  ```javascript
  gamecontolButton.addEventListener("click", () => {
    startGame();
    gamecontolButton.textContent = "Restart Game";
  });
  ```

- Class toggling for visual state changes
  ```javascript
  card1.classList.add("matched");
  card2.classList.add("matched");
  card1.classList.remove("flipped");
  card2.classList.remove("flipped");
  ```

### Asynchronous Programming
- `async`/`await` syntax for handling asynchronous operations
  ```javascript
  cardElement.addEventListener("click", async () => {
      // Card flipping logic
      if (gameState.clickedCards === 2) {
          gameState.locked = true;
          await matchCards(flippedCards[0], flippedCards[1], gameState.matchState);
          gameState.clickedCards = 0;
          gameState.locked = false;
      }
  });
  ```

- `setTimeout` with Promises for controlled timing
  ```javascript
  function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function matchCards(card1, card2, matchState) {
      if (card1.textContent === card2.textContent) {
          // Matching logic
      } else {
          await delay(1000); // Wait 1 second before flipping back
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
      }
  }
  ```

- Interval timers for the game clock
  ```javascript
  gameState.timerInterval = setInterval(() => {
      gameState.matchState.seconds++;
      const minutes = Math.floor(gameState.matchState.seconds / 60);
      const displaySeconds = gameState.matchState.seconds % 60;
      document.getElementById("time-value").innerHTML = 
          `${String(minutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`;
  }, 1000);
  ```

### State Management
- Object-based game state tracking
  ```javascript
  let gameState = {
      timerInterval: null,
      moveCounter: 0,
      clickedCards: 0,
      locked: false,
      matchState: null,
      cardElements: []
  };
  ```

- Game state initialization and reset
  ```javascript
  gameState.matchState = {
      matchedCards: 0,
      totalUniqueCards: uniqueCardNumbers,
      seconds: 0,
  };
  gameState.moveCounter = 0;
  gameState.clickedCards = 0;
  gameState.locked = false;
  gameState.cardElements = [];
  ```

### Algorithm Implementation
- Fisher-Yates shuffle algorithm for randomizing cards
  ```javascript
  function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }
  ```

- Card matching logic
  ```javascript
  async function matchCards(card1, card2, matchState) {
      if (card1.textContent === card2.textContent) {
          card1.classList.add("matched");
          card2.classList.add("matched");
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          matchState.matchedCards += 1;

          if (matchState.matchedCards === matchState.totalUniqueCards) {
              // Win condition logic
          }
      } else {
          await delay(1000);
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
      }
  }
  ```

### Memory Management
- Proper cleanup to prevent memory leaks
  ```javascript
  function cleanupGame() {
      if (gameState.timerInterval) {
          clearInterval(gameState.timerInterval);
          gameState.timerInterval = null;
      }

      gameState.cardElements.forEach(card => {
          const newCard = card.cloneNode(true);
          card.parentNode.replaceChild(newCard, card);
      });

      gameState = {
          timerInterval: null,
          moveCounter: 0,
          clickedCards: 0,
          locked: false,
          matchState: null,
          cardElements: []
      };
  }
  ```


## Future Enhancements

Potential improvements for future versions:

- Add difficulty levels (easy, medium, hard)
- Implement a high score system
- Add sound effects
- Create different themes or card designs
- Add animations for card flips
- Implement a multiplayer mode
- Add touch support for mobile devices
- Create a progressive web app version

---


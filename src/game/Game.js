import Deck from './Deck.js';
import Board from '../ui/Board.js';
import Score from '../ui/Score.js';

export default class Game {
    constructor() {
        this.deck = new Deck();
        this.board = new Board();
        this.score = new Score();
        // this.resetGameState();
        this.setupEventListeners();
    }

    resetGameState() {
        this.deck = new Deck();
        this.board = new Board();
        this.score = new Score();
        this.selectedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.time = 0;
        this.isPlaying = false;
        clearInterval(this.timer);
    }

    start() {
        console.log(this);
        this.resetGameState();
        this.deck.shuffle();
        this.board.render(this.deck.cards);
        this.score.reset();
        this.isPlaying = true;
        this.startTimer();
        console.log(this);
    }

    startTimer() {
        clearInterval(this.timer);
        this.time = 0;
        this.score.updateTime(this.time);
        this.timer = setInterval(() => {
            if (this.isPlaying) {
                this.time++;
                this.score.updateTime(this.time);
            }
        }, 1000);
    }

    setupEventListeners() {
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.start();
        });
        
        this.board.element.addEventListener('click', (e) => {
            if (!this.isPlaying) return;
            
            const cardElement = e.target.closest('.card:not(.matched)');
            if (cardElement && this.selectedCards.length < 2) {
                this.handleCardClick(cardElement);
            }
        });
    }

    handleCardClick(cardElement) {
        const cardId = parseInt(cardElement.dataset.id);
        const card = this.deck.getCard(cardId);
        
        // Don't allow selecting already flipped cards
        if (card.isFlipped || card.isMatched) return;
        
        this.flipCard(card, cardElement);
        
        if (this.selectedCards.length === 2) {
            this.checkForMatch();
        }
    }

    flipCard(card, cardElement) {
        console.log(cardElement);
        card.flip();
        cardElement.classList.toggle('flipped');
        this.selectedCards.push(card);
    }

    checkForMatch() {
        this.moves++;
        this.score.updateMoves(this.moves);
        
        const [card1, card2] = this.selectedCards;
        
        if (card1.value === card2.value) {
            this.handleMatch();
        } else {
            this.handleMismatch();
        }
    }

    handleMatch() {
        this.selectedCards.forEach(card => card.match());
        this.matchedPairs++;
        
        // Update UI for matched cards
        this.selectedCards.forEach(card => {
            const cardElement = document.querySelector(`.card[data-id="${card.id}"]`);
            cardElement.classList.add('matched');
        });
        
        this.selectedCards = [];
        
        if (this.matchedPairs === this.deck.cards.length / 2) {
            this.endGame();
        }
    }

    handleMismatch() {
        setTimeout(() => {
            this.selectedCards.forEach(card => {
                card.flip();
                const cardElement = document.querySelector(`.card[data-id="${card.id}"]`);
                cardElement.classList.remove('flipped');
            });
            this.selectedCards = [];
        }, 1000);
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.time++;
            this.score.updateTime(this.time);
        }, 1000);
    }

    endGame() {
        clearInterval(this.timer);
        setTimeout(() => {
            alert(`Congratulations! You won in ${this.moves} moves and ${this.time} seconds!`);
        }, 500);
    }
}
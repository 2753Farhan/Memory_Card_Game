import Card from './Card.js';

export default class Deck {
    constructor() {
        this.cards = [];
        this.createDeck();
    }

    createDeck() {
        const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        const pairs = [...values, ...values]; // Create pairs
        console.log(pairs);
        
        this.cards = pairs.map((value, index) => new Card(index, value));
        console.log(this.cards);
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    getCard(id) {
        return this.cards.find(card => card.id === id);
    }
}
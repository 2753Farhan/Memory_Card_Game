export default class Card {
    constructor(id, value) {
        this.id = id;
        this.value = value;
        this.isFlipped = false;
        this.isMatched = false;
    }

    flip() {
        this.isFlipped = !this.isFlipped;
    }

    match() {
        this.isMatched = true;
    }
}
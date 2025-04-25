export default class Score {
    constructor() {
        this.movesElement = document.getElementById('moves');
        this.timerElement = document.getElementById('timer');
    }

    updateMoves(moves) {
        this.movesElement.textContent = moves;
    }

    updateTime(seconds) {
        this.timerElement.textContent = seconds;
    }

    reset() {
        this.updateMoves(0);
        this.updateTime(0);
    }
}
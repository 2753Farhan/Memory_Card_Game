export default class Board {
    constructor() {
        this.element = document.getElementById('game-board');
    }

    render(cards) {
        this.element.innerHTML = '';
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.dataset.id = card.id;
            
            const frontFace = document.createElement('div');
            frontFace.className = 'front-face';
            frontFace.textContent = card.value;
            
            const backFace = document.createElement('div');
            backFace.className = 'back-face';
            
            cardElement.appendChild(frontFace);
            cardElement.appendChild(backFace);
            this.element.appendChild(cardElement);
        });
    }
}
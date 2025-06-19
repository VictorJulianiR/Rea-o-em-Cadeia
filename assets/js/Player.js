
import { shuffle } from './utils/helpers.js';
import { CARD_DATABASE, DECK_SIZE, HAND_SIZE } from './config/gameConfig.js';

export class Player {
    constructor(id, name, uiManager) {
        this.id = id;
        this.name = name;
        this.uiManager = uiManager;
    }

    init(hp) {
        this.hp = hp;
        this.deck = [];
        this.hand = [];
        this.discard = [];
    }

    createDeck() {
        const cardPool = ['H', 'H', 'Li', 'Na', 'K', 'Mg', 'Ca', 'Fe2', 'F', 'F', 'Cl', 'Cl', 'O', 'O', 'S', 'C', 'Al', 'N', 'P', 'P', 'E', 'E', 'Nn', 'Nn'];
        const newDeck = [];
        for (let i = 0; i < DECK_SIZE; i++) {
            const cardKey = cardPool[i % cardPool.length];
            // Create a fresh copy of the card object
            newDeck.push({ ...CARD_DATABASE[cardKey], id: `${cardKey}_${this.id}_${i}` });
        }
        return shuffle(newDeck);
    }

    drawCard() {
        if (this.deck.length === 0) {
            if (this.discard.length === 0) {
                this.uiManager.logMessage(`${this.name} não tem mais cartas!`);
                return;
            }
            this.deck = shuffle(this.discard);
            this.discard = [];
            this.uiManager.logMessage(`${this.name} reciclou o descarte.`);
        }
        if (this.hand.length < HAND_SIZE) {
            const card = this.deck.pop();
            this.hand.push(card);
        }
    }

    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
        this.uiManager.createExplosion(this.id === 'player' ? 'player' : 'opponent');
        this.uiManager.logMessage(`${this.name} sofreu ${amount} de dano! Estabilidade: ${this.hp}`);
    }
}

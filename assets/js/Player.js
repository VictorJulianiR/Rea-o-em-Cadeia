import { shuffle } from './utils/helpers.js';
import { CARD_DATABASE, HAND_SIZE, DECK_LISTS } from './config/gameConfig.js';

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
        this.piles = []; // To hold the split deck during the swap phase
    }

    buildDeckFromList(deckListName) {
        const cardList = DECK_LISTS[deckListName];
        if (!cardList) {
            console.error(`Deck list "${deckListName}" not found in gameConfig.js`);
            return;
        }

        const newDeck = cardList.map((cardKey, index) => {
            if (!CARD_DATABASE[cardKey]) {
                console.error(`Card key "${cardKey}" in deck "${deckListName}" not found in CARD_DATABASE.`);
                return null;
            }
            return { ...CARD_DATABASE[cardKey], id: `${cardKey}_${this.id}_${index}` };
        }).filter(card => card !== null);

        this.deck = newDeck; // We shuffle AFTER the swap
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
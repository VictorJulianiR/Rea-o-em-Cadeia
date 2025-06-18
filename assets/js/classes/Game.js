
import { INITIAL_HP, HAND_SIZE, HYPER_INSTABILITY_THRESHOLD, SUPERHEAVY_THRESHOLD } from './config/gameConfig.js';
import { Player } from './Player.js';
import { UIManager } from './UIManager.js';
import { AIPlayer } from './ai/AIPlayer.js';
import { calculateCompoundStats } from './Card.js';
import { shuffle } from './utils/helpers.js';

export class Game {
    constructor() {
        this.uiManager = new UIManager();
        this.ai = new AIPlayer(this);
        this.players = [
            new Player('player', 'Jogador', this.uiManager),
            new Player('opponent', 'IA Quimista', this.uiManager)
        ];
        this.isGameOver = false;
        this.currentPlayerIndex = 0;
        this.reactionCompound = [];
        this.isFirstTurnOfReaction = true;
        this.nextInitiativePlayerIndex = null;
    }

    init() {
        this.isGameOver = false;
        this.uiManager.resetUI();
        
        this.players.forEach(p => p.init(INITIAL_HP));
        
        this.uiManager.showPileSelection(pileIndex => this.selectInitialPiles(pileIndex));
        this.uiManager.elements.gameContainer.style.display = 'none';
    }

    selectInitialPiles(playerChoiceIndex) {
        const chooser = this.players[0];
        const giver = this.players[1];

        const opponentBaseDeck = giver.createDeck();
        const opponentPiles = [opponentBaseDeck.slice(0, 10), opponentBaseDeck.slice(10, 20), opponentBaseDeck.slice(20, 30)];
        chooser.deck.push(...opponentPiles[playerChoiceIndex]);
        this.uiManager.logMessage(`${chooser.name} pegou uma pilha de cartas.`);
        const remainingOpponentPiles = opponentPiles.filter((_, index) => index !== playerChoiceIndex);
        giver.deck.push(...remainingOpponentPiles.flat());

        const playerBaseDeck = chooser.createDeck();
        const playerPiles = [playerBaseDeck.slice(0, 10), playerBaseDeck.slice(10, 20), playerBaseDeck.slice(20, 30)];
        const aiChosenIndex = Math.floor(Math.random() * 3);
        giver.deck.push(...playerPiles[aiChosenIndex]);
        this.uiManager.logMessage(`A IA pegou uma pilha de cartas.`);
        const remainingPlayerPiles = playerPiles.filter((_, index) => index !== aiChosenIndex);
        chooser.deck.push(...remainingPlayerPiles.flat());

        this.players.forEach(p => {
            p.deck = shuffle(p.deck)
        });
        
        this.uiManager.elements.pileSelectionScreen.style.display = 'none';
        this.uiManager.elements.gameContainer.style.display = 'grid';
        this.startGameLoop();
    }
    
    startGameLoop() {
        for (let i = 0; i < HAND_SIZE; i++) {
            this.players.forEach(p => p.drawCard());
        }
        this.updateFullUI();
        this.uiManager.logMessage("A batalha química começou!");
        this.startTurn();
    }
    
    startTurn() {
        if (this.isGameOver) return;
        
        const currentPlayer = this.players[this.currentPlayerIndex];
        currentPlayer.drawCard();
        this.updateFullUI();
        this.uiManager.setTurnIndicator(currentPlayer);
        
        if (this.reactionCompound.length > 0 && !this.isFirstTurnOfReaction && currentPlayer.hand.length === 0) {
            const { damage } = calculateCompoundStats(this.reactionCompound);
            this.uiManager.logMessage(`💥 ${currentPlayer.name} sem cartas para jogar e sofreu ${damage} de dano!`);
            this.dealDamage(this.currentPlayerIndex, damage);
            this.clearReaction();
            this.updateFullUI();
            setTimeout(() => this.endTurn(), 1500);
            return;
        }

        if (this.currentPlayerIndex === 1) { // AI's turn
            setTimeout(() => this.ai.makeMove(), 1500);
        }
    }
    
    endTurn() {
        if (this.isGameOver) return;
        if (this.nextInitiativePlayerIndex !== null) {
            this.currentPlayerIndex = this.nextInitiativePlayerIndex;
            this.nextInitiativePlayerIndex = null;
        } else {
            this.currentPlayerIndex = 1 - this.currentPlayerIndex;
        }
        this.startTurn();
    }

    playCard(playerIndex, cardHandIndex) {
        if (this.isGameOver || this.currentPlayerIndex !== playerIndex) return;

        const player = this.players[playerIndex];
        const card = player.hand[cardHandIndex];
        
        if (card.isFlexible && playerIndex === 0) {
             this.uiManager.showFlexibleCardModal(card, (chosenCharge) => {
                card.charge = chosenCharge;
                this.finishPlayingCard(playerIndex, card, cardHandIndex);
             });
        } else {
             this.finishPlayingCard(playerIndex, card, cardHandIndex);
        }
    }

    finishPlayingCard(playerIndex, card, cardHandIndex) {
        const player = this.players[playerIndex];
        player.hand.splice(cardHandIndex, 1);
        
        this.reactionCompound.push(card);
        this.uiManager.logMessage(`${player.name} jogou ${card.name} (${card.symbol}).`);
        this.uiManager.addCardToReaction(card);
        
        this.updateFullUI();

        const { charge, damage } = calculateCompoundStats(this.reactionCompound);
        const turnDelay = 1000;

        if (Math.abs(charge) > HYPER_INSTABILITY_THRESHOLD) {
            this.uiManager.elements.reactionArea.classList.add('hyper-unstable');
            setTimeout(() => {
                this.uiManager.logMessage(`☢️ HIPER-INSTABILIDADE! Carga (${charge}) excedeu o limite!`);
                this.dealDamage(playerIndex, damage);
                this.clearReaction();
                this.updateFullUI();
                setTimeout(() => this.endTurn(), turnDelay);
            }, 500);
            return;
        }
        if (damage > SUPERHEAVY_THRESHOLD) {
            this.uiManager.elements.reactionArea.classList.add('superheavy-unstable');
            setTimeout(() => {
                this.uiManager.logMessage(`⚛️ INSTABILIDADE SUPERPESADA! Massa (Z=${damage}) excedeu o limite!`);
                this.dealDamage(playerIndex, damage);
                this.clearReaction();
                this.updateFullUI();
                setTimeout(() => this.endTurn(), turnDelay);
            }, 500);
            return;
        }
        if (charge === 0) {
            const opponentIndex = 1 - playerIndex;
            this.uiManager.logMessage(`✅ MOLÉCULA ESTÁVEL! Dano de ${damage} em ${this.players[opponentIndex].name}.`);
            this.dealDamage(opponentIndex, damage);
            this.clearReaction();
            this.updateFullUI();
            setTimeout(() => this.endTurn(), turnDelay);
            return;
        }
        
        this.isFirstTurnOfReaction = false;
        setTimeout(() => this.endTurn(), turnDelay);
    }
    
    dealDamage(playerIndex, amount) {
        const player = this.players[playerIndex];
        player.takeDamage(amount);
        this.nextInitiativePlayerIndex = 1 - playerIndex;

        if (player.hp <= 0) {
            this.isGameOver = true;
            const winner = this.players[1 - playerIndex];
            this.uiManager.showGameOver(winner.name);
        }
    }

    clearReaction() {
        if (this.nextInitiativePlayerIndex === null) return;
        const playerWithInitiative = this.players[this.nextInitiativePlayerIndex];
        playerWithInitiative.discard.push(...this.reactionCompound);
        this.reactionCompound = [];
        this.isFirstTurnOfReaction = true;
        this.uiManager.clearReactionUI();
        this.uiManager.logMessage("Composto removido. Iniciativa para " + playerWithInitiative.name);
    }
    
    updateFullUI() {
        if (this.isGameOver) return;
        this.players.forEach(p => this.uiManager.updatePlayerUI(p));
        
        const { charge, damage } = calculateCompoundStats(this.reactionCompound);
        this.uiManager.updateReactionUI(this.reactionCompound, charge, damage);

        // Re-bind events for player hand after every update
        if (this.currentPlayerIndex === 0) {
            // Create a handler function with context
            const handler = (index) => this.playCard(0, index);
            // Attach a method to the handler to get card data
            handler.getCardData = (index) => this.players[0].hand[index];
            this.uiManager.bindPlayerCardEvents(handler);
        }
    }
}

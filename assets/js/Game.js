import { INITIAL_HP, HAND_SIZE, HYPER_INSTABILITY_THRESHOLD, SUPERHEAVY_THRESHOLD, SOUND_CONFIG, DECK_LISTS } from './config/gameConfig.js';
import { Player } from './Player.js';
import { UIManager } from './UIManager.js';
import { AIPlayer } from './ai/AIPlayer.js';
import { calculateCompoundStats } from './Card.js';
import { shuffle } from './utils/helpers.js';
import { SoundManager } from './utils/SoundManager.js';

export class Game {
    constructor() {
        this.soundManager = new SoundManager(SOUND_CONFIG);
        this.soundManager.loadSounds();
        this.uiManager = new UIManager(this.soundManager);
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
        this.soundManager.stopAll();
        this.soundManager.unlockAudioContext();
        this.uiManager.resetUI();
        
        this.players.forEach(p => p.init(INITIAL_HP));
        
        // Start the new game sequence
        this.uiManager.showDeckSelection(DECK_LISTS, (deckKey) => this.selectDecks(deckKey));
    }

    selectDecks(chosenDeckKey) {
        const player = this.players[0];
        const ai = this.players[1];

        // Assign chosen deck to player
        player.buildDeckFromList(chosenDeckKey);
        this.uiManager.logMessage(`Jogador escolheu o deck: ${chosenDeckKey}.`);

        // Assign a random, different deck to the AI
        const deckKeys = Object.keys(DECK_LISTS);
        let aiDeckKey = chosenDeckKey;
        if (deckKeys.length > 1) {
            const remainingDeckKeys = deckKeys.filter(key => key !== chosenDeckKey);
            aiDeckKey = remainingDeckKeys[Math.floor(Math.random() * remainingDeckKeys.length)];
        } else {
             aiDeckKey = deckKeys[0]; // Fallback if only one deck exists
        }
        
        ai.buildDeckFromList(aiDeckKey);
        this.uiManager.logMessage(`A IA está usando o deck: ${aiDeckKey}.`);

        // Split decks into piles for the swap phase
        player.piles = this.splitDeck(player.deck);
        ai.piles = this.splitDeck(ai.deck);

        // Calculate charge for AI piles to show to the player
        const aiPilesWithCharge = ai.piles.map(pile => ({
            pile,
            charge: this.calculatePileCharge(pile)
        }));

        // Show the swap screen
        this.uiManager.showSwapScreen(aiPilesWithCharge, (pileIndex) => this.performSwap(pileIndex));
    }

    performSwap(aiPileIndex) {
        const player = this.players[0];
        const ai = this.players[1];
        
        this.uiManager.logMessage(`Jogador trocou uma pilha com a pilha de carga ${this.calculatePileCharge(ai.piles[aiPileIndex])} da IA.`);

        // Swap the first player pile with the chosen AI pile
        const playerPileToSwap = player.piles[0];
        const aiPileToSwap = ai.piles[aiPileIndex];
        
        player.piles[0] = aiPileToSwap;
        ai.piles[aiPileIndex] = playerPileToSwap;

        // Reconstruct and shuffle the final decks
        player.deck = shuffle(player.piles.flat());
        ai.deck = shuffle(ai.piles.flat());
        
        // Clean up temporary piles
        player.piles = [];
        ai.piles = [];
        
        this.soundManager.play('start_game');
        this.uiManager.elements.gameContainer.style.display = 'grid';
        this.startGameLoop();
    }

    splitDeck(deck) {
        const shuffled = shuffle([...deck]); // Work with a shuffled copy
        const pileSize = Math.floor(shuffled.length / 3);
        const pile1 = shuffled.slice(0, pileSize);
        const pile2 = shuffled.slice(pileSize, pileSize * 2);
        const pile3 = shuffled.slice(pileSize * 2);
        return [pile1, pile2, pile3];
    }

    calculatePileCharge(pile) {
        // Ensure card.charge is a number, default to 0 if not (for flexible cards not yet assigned)
        return pile.reduce((acc, card) => acc + (Number(card.charge) || 0), 0);
    }
    
    startGameLoop() {
        for (let i = 0; i < HAND_SIZE; i++) {
            this.players.forEach(p => p.drawCard());
        }
        this.updateFullUI();
        this.uiManager.logMessage("A batalha química começou!");
        this.soundManager.play('bg_music');
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
        
        this.soundManager.play('turn_switch');

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
        
        this.soundManager.play('card_play');
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
            this.soundManager.play('success');
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
        this.soundManager.play('explosion');
        player.takeDamage(amount);
        this.nextInitiativePlayerIndex = 1 - playerIndex;

        if (player.hp <= 0) {
            this.isGameOver = true;
            this.soundManager.stop('bg_music');
            const winner = this.players[1 - playerIndex];
            if (winner.id === 'player') {
                this.soundManager.play('win');
            } else {
                this.soundManager.play('lose');
            }
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

        if (this.currentPlayerIndex === 0) {
            const handler = (index) => this.playCard(0, index);
            handler.getCardData = (index) => this.players[0].hand[index];
            this.uiManager.bindPlayerCardEvents(handler);
        }
    }
}
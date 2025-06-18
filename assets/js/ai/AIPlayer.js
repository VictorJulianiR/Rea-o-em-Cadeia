
import { HYPER_INSTABILITY_THRESHOLD, SUPERHEAVY_THRESHOLD } from '../config/gameConfig.js';
import { calculateCompoundStats } from '../Card.js';

export class AIPlayer {
    constructor(game) {
        this.game = game; // AI needs game state context
    }

    makeMove() {
        const ai = this.game.players[1];
        if (ai.hand.length === 0) {
            this.game.endTurn();
            return;
        }

        const compoundStats = calculateCompoundStats(this.game.reactionCompound);

        // 1. Find a winning move (stabilizes the compound)
        for (let i = 0; i < ai.hand.length; i++) {
            const card = ai.hand[i];
            if (card.isFlexible) {
                for (const option of card.options) {
                    if (compoundStats.charge + option === 0) {
                        this.game.uiManager.logMessage("IA: Jogada de estabilização encontrada!");
                        card.charge = option; // Set charge before playing
                        this.game.playCard(1, i);
                        return;
                    }
                }
            } else {
                if (compoundStats.charge + card.charge === 0) {
                    this.game.uiManager.logMessage("IA: Jogada de estabilização encontrada!");
                    this.game.playCard(1, i);
                    return;
                }
            }
        }
        
        // 2. Find a safe move
        const safeMoves = [];
        ai.hand.forEach((card, index) => {
            if (card.isFlexible) {
                 card.options.forEach(option => {
                    if (Math.abs(compoundStats.charge + option) <= HYPER_INSTABILITY_THRESHOLD && compoundStats.damage + card.z <= SUPERHEAVY_THRESHOLD) {
                        safeMoves.push({ index, card, charge: option });
                    }
                 });
            } else {
                if (Math.abs(compoundStats.charge + card.charge) <= HYPER_INSTABILITY_THRESHOLD && compoundStats.damage + card.z <= SUPERHEAVY_THRESHOLD) {
                    safeMoves.push({ index, card, charge: card.charge });
                }
            }
        });

        // 3. If starting a new reaction, play highest charge card
        if (this.game.reactionCompound.length === 0) {
            let cardToPlay = ai.hand.reduce((prev, current) => (Math.abs(prev.charge) > Math.abs(current.charge)) ? prev : current);
            this.game.uiManager.logMessage("IA: Iniciando reação de alta pressão!");
            this.game.playCard(1, ai.hand.indexOf(cardToPlay));
            return;
        }

        // 4. Play a safe move if available
        if (safeMoves.length > 0) {
            this.game.uiManager.logMessage("IA: Continuando com uma jogada segura.");
            const move = safeMoves[0];
            if(move.card.isFlexible) move.card.charge = move.charge;
            this.game.playCard(1, move.index);
            return;
        }

        // 5. No safe moves, play the card that adds the least mass (to minimize self-damage)
        this.game.uiManager.logMessage("IA: Sem jogadas seguras! Minimizando danos...");
        let leastDamageMove = ai.hand.map((card, index) => ({ card, index, mass: compoundStats.damage + card.z })).reduce((p, c) => (p.mass < c.mass) ? p : c);
        this.game.playCard(1, leastDamageMove.index);
    }
}

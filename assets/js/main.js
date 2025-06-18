
import { Game } from './Game.js';
import { UIElements } from './config/gameConfig.js';
import { createParticles } from './utils/helpers.js';

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();

    UIElements.startGameBtn.addEventListener('click', () => game.init());
    UIElements.restartGameBtn.addEventListener('click', () => game.init());
    
    createParticles();
});

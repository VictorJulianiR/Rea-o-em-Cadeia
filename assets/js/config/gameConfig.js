export const CARD_DATABASE = {
    'H': {name: 'Hidrogênio', symbol: 'H⁺', z: 1, charge: 1, color: '#ff6b6b'},
    'Na': {name: 'Sódio', symbol: 'Na⁺', z: 11, charge: 1, color: '#feca57'},
    'K': {name: 'Potássio', symbol: 'K⁺', z: 19, charge: 1, color: '#ff9ff3'},
    'Mg': {name: 'Magnésio', symbol: 'Mg²⁺', z: 12, charge: 2, color: '#54a0ff'},
    'Ca': {name: 'Cálcio', symbol: 'Ca²⁺', z: 20, charge: 2, color: '#5f27cd'},
    'Al': {name: 'Alumínio', symbol: 'Al³⁺', z: 13, charge: 3, color: '#00d2d3'},
    'Fe2': {name: 'Ferro II', symbol: 'Fe²⁺', z: 26, charge: 2, color: '#ff6348'},
    'F': {name: 'Flúor', symbol: 'F⁻', z: 9, charge: -1, color: '#2ed573'},
    'Cl': {name: 'Cloro', symbol: 'Cl⁻', z: 17, charge: -1, color: '#1dd1a1'},
    'O': {name: 'Oxigênio', symbol: 'O²⁻', z: 8, charge: -2, color: '#0abde3'},
    'S': {name: 'Enxofre', symbol: 'S²⁻', z: 16, charge: -2, color: '#feca57'},
    'N': {name: 'Nitrogênio', symbol: 'N³⁻', z: 7, charge: -3, color: '#2d98da'},
    'C': {name: 'Carbono', symbol: 'C', z: 6, charge: 4, isFlexible: true, options: [4, -4], color: '#a4b0be'},
    'P': {name: 'Próton', symbol: 'p⁺', z: 0, charge: 1, isCoringa: true, color: '#ff4757'},
    'E': {name: 'Elétron', symbol: 'e⁻', z: 0, charge: -1, isCoringa: true, color: '#3742fa'},
    'Nn': {name: 'Nêutron', symbol: 'n⁰', z: 1, charge: 0, isCoringa: true, color: '#747d8c'}
};

export const INITIAL_HP = 100;
export const DECK_SIZE = 30;
export const HAND_SIZE = 5;
export const HYPER_INSTABILITY_THRESHOLD = 6;
export const SUPERHEAVY_THRESHOLD = 82;

export const UIElements = {
    gameContainer: document.getElementById('game-container'),
    startScreen: document.getElementById('start-screen'),
    pileSelectionScreen: document.getElementById('pile-selection-screen'),
    pileSelectionContainer: document.getElementById('pile-selection'),
    gameOverScreen: document.getElementById('game-over-screen'),
    reactionArea: document.getElementById('reaction-area'),
    player: { area: document.getElementById('player-area'), hpText: document.getElementById('player-hp-text'), hpFill: document.getElementById('player-hp-fill'), hand: document.getElementById('player-hand'), deckCount: document.getElementById('player-deck-count') },
    opponent: { area: document.getElementById('opponent-area'), hpText: document.getElementById('opponent-hp-text'), hpFill: document.getElementById('opponent-hp-fill'), hand: document.getElementById('opponent-hand'), deckCount: document.getElementById('opponent-deck-count') },
    reaction: { compound: document.getElementById('reaction-compound'), charge: document.getElementById('reaction-charge'), mass: document.getElementById('reaction-mass') },
    info: { log: document.getElementById('game-log'), turnIndicator: document.getElementById('turn-indicator'), gameOverMessage: document.getElementById('game-over-message') },
    flexibleCardModal: document.getElementById('flexible-card-modal'),
    flexibleCardTitle: document.getElementById('flexible-card-title'),
    flexibleCardOptions: document.getElementById('flexible-card-options'),
    cardTooltip: document.getElementById('card-tooltip'),
    startGameBtn: document.getElementById('start-game-btn'),
    restartGameBtn: document.getElementById('restart-game-btn'),
};

export const SOUND_CONFIG = {
    bg_music:      { src: 'assets/sounds/bg_music.mp3', loop: true, volume: 0.3 },
    start_game:    { src: 'assets/sounds/start_game.mp3', volume: 0.7 },
    ui_click:      { src: 'assets/sounds/ui_click.wav', volume: 0.8 },
    card_hover:    { src: 'assets/sounds/card_hover.mp3', volume: 0.5 },
    card_play:     { src: 'assets/sounds/card_play.wav', volume: 0.7 },
    explosion:     { src: 'assets/sounds/explosion.mp3', volume: 1.0 },
    success:       { src: 'assets/sounds/success.wav', volume: 0.8 },
    turn_switch:   { src: 'assets/sounds/turn_switch.wav', volume: 0.6 },
    win:           { src: 'assets/sounds/win.mp3', volume: 0.9 },
    lose:          { src: 'assets/sounds/lose.wav', volume: 0.9 },
};
export const CARD_DATABASE = {
    // --- Cations (Positive Ions) ---
    // Group 1 (Alkali Metals)
    'Hydrogen': {name: 'Hidrogênio', symbol: 'H⁺', z: 1, charge: 1, color: '#ff6b6b'},
    'Lithium':  {name: 'Lítio', symbol: 'Li⁺', z: 3, charge: 1, color: '#e06666'},
    'Sodium':   {name: 'Sódio', symbol: 'Na⁺', z: 11, charge: 1, color: '#feca57'},
    'Potassium':{name: 'Potássio', symbol: 'K⁺', z: 19, charge: 1, color: '#ff9ff3'},
    
    // Group 2 (Alkaline Earth Metals)
    'Magnesium':{name: 'Magnésio', symbol: 'Mg²⁺', z: 12, charge: 2, color: '#54a0ff'},
    'Calcium':  {name: 'Cálcio', symbol: 'Ca²⁺', z: 20, charge: 2, color: '#5f27cd'},
    'Barium':   {name: 'Bário', symbol: 'Ba²⁺', z: 56, charge: 2, color: '#8e44ad'},

    // Transition Metals
    'IronII':   {name: 'Ferro II', symbol: 'Fe²⁺', z: 26, charge: 2, color: '#ff6348'},
    'IronIII':  {name: 'Ferro III', symbol: 'Fe³⁺', z: 26, charge: 3, color: '#c0392b'},
    'CopperII': {name: 'Cobre II', symbol: 'Cu²⁺', z: 29, charge: 2, color: '#e67e22'},
    'Silver':   {name: 'Prata', symbol: 'Ag⁺', z: 47, charge: 1, color: '#bdc3c7'},
    'Zinc':     {name: 'Zinco', symbol: 'Zn²⁺', z: 30, charge: 2, color: '#7f8c8d'},

    // Other Metals
    'Aluminum': {name: 'Alumínio', symbol: 'Al³⁺', z: 13, charge: 3, color: '#00d2d3'},

    // --- Anions (Negative Ions) ---
    // Group 17 (Halogens)
    'Fluorine': {name: 'Flúor', symbol: 'F⁻', z: 9, charge: -1, color: '#2ed573'},
    'Chlorine': {name: 'Cloro', symbol: 'Cl⁻', z: 17, charge: -1, color: '#1dd1a1'},
    'Bromine':  {name: 'Bromo', symbol: 'Br⁻', z: 35, charge: -1, color: '#16a085'},
    'Iodine':   {name: 'Iodo', symbol: 'I⁻', z: 53, charge: -1, color: '#27ae60'},

    // Group 16
    'Oxygen':   {name: 'Oxigênio', symbol: 'O²⁻', z: 8, charge: -2, color: '#0abde3'},
    'Sulfur':   {name: 'Enxofre', symbol: 'S²⁻', z: 16, charge: -2, color: '#f1c40f'},

    // Group 15
    'Nitrogen': {name: 'Nitrogênio', symbol: 'N³⁻', z: 7, charge: -3, color: '#2d98da'},
    'Phosphorus':{name: 'Fósforo', symbol: 'P³⁻', z: 15, charge: -3, color: '#9b59b6'},
    
    // --- Special & Joker Cards ---
    'Carbon':   {name: 'Carbono', symbol: 'C', z: 6, charge: 4, isFlexible: true, options: [4, -4], color: '#a4b0be'},
    'Proton':   {name: 'Próton', symbol: 'p⁺', z: 0, charge: 1, isCoringa: true, color: '#ff4757'},
    'Electron': {name: 'Elétron', symbol: 'e⁻', z: 0, charge: -1, isCoringa: true, color: '#3742fa'},
    'Neutron':  {name: 'Nêutron', symbol: 'n⁰', z: 1, charge: 0, isCoringa: true, color: '#747d8c'},
    'Neon':     {name: 'Neônio', symbol: 'Ne', z: 10, charge: 0, isCoringa: true, color: '#fd79a8'} // Noble Gas: Adds mass without changing charge
};

export const DECK_LISTS = {
    'playerDefault': [
        'Hydrogen', 'Hydrogen', 'Magnesium', 'Calcium', 'Aluminum', 'Proton', 'Proton', 'Sodium', 'Potassium', 'IronII',
        'Fluorine', 'Fluorine', 'Chlorine', 'Chlorine', 'Oxygen', 'Oxygen', 'Sulfur', 'Nitrogen', 'Phosphorus',
        'Electron', 'Electron', 'Neutron', 'Neutron', 'Carbon',
        'Hydrogen', 'Oxygen', 'Fluorine', 'Proton', 'Electron', 'Neutron' // Fill up to 30
    ],
    'aiDefault': [
        'Hydrogen', 'Hydrogen', 'Magnesium', 'Calcium', 'Aluminum', 'Proton', 'Proton', 'Sodium', 'Potassium', 'IronII',
        'Fluorine', 'Fluorine', 'Chlorine', 'Chlorine', 'Oxygen', 'Oxygen', 'Sulfur', 'Nitrogen', 'Phosphorus',
        'Electron', 'Electron', 'Neutron', 'Neutron', 'Carbon',
        'Hydrogen', 'Oxygen', 'Chlorine', 'Proton', 'Electron', 'Neutron' // Slightly different mix
    ],
    'agressiveAlchemy': [
        'IronIII', 'IronIII', 'Aluminum', 'Aluminum', 'Magnesium', 'Calcium', 'Barium', 'CopperII',
        'Nitrogen', 'Nitrogen', 'Phosphorus', 'Phosphorus', 'Oxygen', 'Oxygen', 'Sulfur', 'Sulfur',
        'Carbon', 'Proton', 'Proton', 'Electron', 'Electron',
        'IronII', 'IronII', 'Chlorine', 'Chlorine', 'Neutron', 'Neutron', 'Neon', 'Zinc', 'Sodium'
    ],
    'halogenPrecision': [
        'Fluorine', 'Fluorine', 'Chlorine', 'Chlorine', 'Bromine', 'Bromine', 'Iodine', 'Iodine',
        'Hydrogen', 'Hydrogen', 'Lithium', 'Lithium', 'Sodium', 'Sodium', 'Potassium', 'Potassium', 'Silver',
        'Proton', 'Proton', 'Proton', 'Electron', 'Electron', 'Electron', 'Neutron',
        'Magnesium', 'Oxygen', 'Carbon', 'Neon', 'Neutron'
    ],
    'transitionReactor': [
        'IronII', 'IronII', 'IronIII', 'CopperII', 'CopperII', 'Zinc', 'Zinc', 'Silver', 'Silver', 'Sodium', 'Potassium',
        'Oxygen', 'Oxygen', 'Sulfur', 'Chlorine', 'Chlorine', 'Fluorine', 'Fluorine',
        'Carbon', 'Carbon', 'Neon', 'Neon', 'Neutron', 'Neutron',
        'Proton', 'Proton', 'Electron', 'Electron', 'Calcium'
    ]
};

export const INITIAL_HP = 100;
export const DECK_SIZE = 30;
export const HAND_SIZE = 5;
export const HYPER_INSTABILITY_THRESHOLD = 6;
export const SUPERHEAVY_THRESHOLD = 82;

export const UIElements = {
    gameContainer: document.getElementById('game-container'),
    startScreen: document.getElementById('start-screen'),
    deckSelectionScreen: document.getElementById('deck-selection-screen'),
    deckSelectionOptions: document.getElementById('deck-selection-options'),
    swapScreen: document.getElementById('swap-screen'),
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
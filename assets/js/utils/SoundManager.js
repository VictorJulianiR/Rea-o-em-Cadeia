export class SoundManager {
    constructor(soundConfig) {
        this.soundConfig = soundConfig;
        this.sounds = {};
        this.isMuted = false;
        this.audioContextUnlocked = false;
    }

    // Must be called after a user interaction (e.g., a click)
    unlockAudioContext() {
        if (this.audioContextUnlocked) return;
        // A simple way to unlock the audio context in modern browsers
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        this.audioContextUnlocked = true;
        console.log("Audio Context Unlocked.");
    }

    // We change this to return the promise
    loadSounds() {
        console.log("Loading sounds...");
        const soundPromises = Object.entries(this.soundConfig).map(([name, config]) => {
            return new Promise((resolve, reject) => {
                const audio = new Audio(config.src);
                audio.volume = config.volume || 1.0;
                audio.loop = config.loop || false;
                this.sounds[name] = audio;

                audio.addEventListener('canplaythrough', () => resolve(), { once: true });
                audio.addEventListener('error', (e) => reject(`Error loading sound: ${name} at ${config.src}`), { once: true });
            });
        });

        // Return the main promise so other parts of the app can wait
        return Promise.all(soundPromises)
            .then(() => console.log("All sounds loaded successfully."))
            .catch(error => console.error(error));
    }

    play(name) {
        if (!this.sounds[name] || this.isMuted || !this.audioContextUnlocked) return;

        // For short sounds that can be played in quick succession (like hovers)
        // we reset the time to allow for overlapping plays.
        const sound = this.sounds[name];
        if (!sound.loop) {
            sound.currentTime = 0;
        }

        sound.play().catch(e => {
            if (e.name === 'NotAllowedError') {
                console.warn(`Audio play blocked for '${name}'. Waiting for user interaction.`);
            } else {
                console.error(`Could not play sound: ${name}`, e);
            }
        });
    }

    stop(name) {
        if (this.sounds[name]) {
            this.sounds[name].pause();
            this.sounds[name].currentTime = 0;
        }
    }

    stopAll() {
        for (const sound in this.sounds) {
            this.stop(sound);
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            for (const sound in this.sounds) {
                this.sounds[sound].pause();
            }
        } else {
            // Optionally restart background music when unmuting
            if (this.sounds.bg_music) {
                this.play('bg_music');
            }
        }
        console.log(`Sounds ${this.isMuted ? 'Muted' : 'Unmuted'}`);
    }
}
import { gameController } from "./gameController.js";
import { grabSound } from "./soundLoader.js";

export class SoundManager {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.sounds = {};
        this.currentBackground = { name: null, sound: null, gainNode: null };
        this.currentEffect = { name: null, sound: null, gainNode: null };
    }

    addSound(name, soundBuffer) {
        this.sounds[name] = soundBuffer;
    }

    createSourceNode(buffer) {
        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        return source;
    }

    createGainNode() {
        return this.audioContext.createGain();
    }

    playBackground() {
        if (this.currentBackground) {
            this.play(this.currentBackground.name);
        }
    }

    playBackgroundLoop() {
        this.setLoop(this.currentBackground.name, true);
    }

    stopBackground() {
        if (this.currentBackground) {
            this.stop(this.currentBackground.name);
        }
    }

    setBackgroundVolume(volume) {
        if (this.currentBackground) {
            this.setVolume(this.currentBackground.name, volume);
        }
    }

    setBackground(name) {
        const buffer = grabSound(name);
        if (buffer) {
            this.currentBackground.sound = buffer;
            this.currentBackground.name = name;
        }
    }

    playEffect() {
        if (this.currentEffect) {
            this.play(this.currentEffect.name);
        }
    }

    playEffectLoop() {
        this.setLoop(this.currentEffect.name, true);
    }

    stopEffect() {
        if (this.currentEffect) {
            this.stop(this.currentEffect.name);
        }
    }

    setEffectVolume(volume) {
        if (this.currentEffect) {
            this.setVolume(this.currentEffect.name, volume);
        }
    }

    setEffect(name) {
        const buffer = grabSound(name);
        if (buffer) {
            this.currentEffect.sound = buffer;
            this.currentEffect.name = name;
        }
    }

    play(name) {
        if (this.sounds[name]) {
            const source = this.createSourceNode(this.sounds[name]);
            const gainNode = this.createGainNode();
            source.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            source.start();

            if (this.currentBackground && this.currentBackground.name === name) {
                this.currentBackground.sound = source;
                this.currentBackground.gainNode = gainNode;
            } else if (this.currentEffect && this.currentEffect.name === name) {
                this.currentEffect.sound = source;
                this.currentEffect.gainNode = gainNode;
            }
            return this.sounds[name];
        }
        return null;
    }

    stop(name) {
        if (this.currentBackground && this.currentBackground.name === name && this.currentBackground.sound) {
            this.currentBackground.sound.stop();
        } else if (this.currentEffect && this.currentEffect.name === name && this.currentEffect.sound) {
            this.currentEffect.sound.stop();
        }
    }

    setVolume(name, volume) {
        if (this.currentBackground && this.currentBackground.name === name && this.currentBackground.gainNode) {
            this.currentBackground.gainNode.gain.value = volume;
        } else if (this.currentEffect && this.currentEffect.name === name && this.currentEffect.gainNode) {
            this.currentEffect.gainNode.gain.value = volume;
        }
    }
    setLoop(name, loop) {
        if (this.currentBackground && this.currentBackground.name === name && this.currentBackground.sound) {
            this.currentBackground.sound.loop = loop;
        } else if (this.currentEffect && this.currentEffect.name === name && this.currentEffect.sound) {
            this.currentEffect.sound.loop = loop;
        }
    }
}
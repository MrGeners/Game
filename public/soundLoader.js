import { assetController } from './imageLoader.js';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let loadSound = (src) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(src);
            const arrayBuffer = await response.arrayBuffer();
            audioContext.decodeAudioData(arrayBuffer, (buffer) => {
                console.log(buffer);
                resolve(buffer);
            }, (err) => reject(err));
        } catch (err) {
            reject(err);
        }
    });
}

let loadSounds = async () => {
    //load all sounds
    for (let i = 0; i < assetController.SNDsources.length; i++) {
        try {
            let soundBuffer = await loadSound(assetController.SNDsources[i]);
            assetController.sounds[i] = { buffer: soundBuffer, src: assetController.SNDsources[i] };
            assetController.percentageLoaded = Math.floor((i / assetController.SNDsources.length) * 100);
            document.getElementById("soundLoading").innerHTML = `<h1>LOADING SOUNDS: ${assetController.percentageLoaded}%</h1>`;
        } catch (err) {
            console.error('Error loading sound:', err);
        }
    }
    console.log('All sounds loaded');
    assetController.percentageLoaded = 100;
    document.getElementById("soundLoading").innerHTML = `<h1>LOADING SOUNDS: ${assetController.percentageLoaded}%</h1>`;

    // Dispatch the 'sounds-processed' event
    document.dispatchEvent(new Event('sounds-processed'));
}

export let grabSound = (src) => {
    const obj = assetController.sounds.find((data) => data.src.includes(src));

    return obj.buffer;
}

export const processSounds = () => {
    loadSounds();
}

window.addEventListener('DOMContentLoaded', async () => {
    const appPath = await window.api.getAppPath();
    window.api.receive('sounds-paths', (data) => {
        assetController.SNDsources = data.map((file) => `file://${appPath}/public/sounds/${file}`);
        processSounds();
    });
});
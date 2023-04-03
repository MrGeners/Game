



let fetchSoundSourcesAndLoadSounds = async () => {
    try {
        const response = await fetch('/api/sounds');
        const soundSources = await response.json();
        assetController.SNDsources = soundSources;



        console.log("assetController.SNDsources: ", assetController.SNDsources);
        return await loadSounds();

    } catch (err) {
        console.error('Error fetching sound sources or loading sounds:', err);
    }
}

let loadSound = (src) => {
    return new Promise((resolve, reject) => {
        console.log("loadSound src: ", src);
        const sound = new Audio(src);
        sound.addEventListener('canplaythrough', () => {
            console.log("sound: ", sound);
            resolve(sound);
        });
        sound.onerror = (err) => reject(err);

    });
}

let loadSounds = async () => {
    console.log("beginning loadSounds");
    //load all sounds
    for (let i = 0; i < assetController.SNDsources.length; i++) {
        console.log("loading sound: ", assetController.SNDsources[i]);
        try {
            let sound = await loadSound(assetController.SNDsources[i]);
            assetController.sounds[i] = sound;
            assetController.percentageLoaded = Math.floor((i / assetController.SNDsources.length) * 100);
            document.getElementById("soundLoading").innerHTML = `<h1>LOADING SOUNDS: ${assetController.percentageLoaded}%</h1>`;
        } catch (err) {
            console.error('Error loading sound:', err);
        }
    }
    console.log('All sounds loaded');
    assetController.percentageLoaded = 100;
    document.getElementById("soundLoading").innerHTML = `<h1>LOADING SOUNDS: ${assetController.percentageLoaded}%</h1>`;
}

let grabSound = (src) => {
    return assetController.sounds.find((sound) => {
        return sound.src.includes(src);
    });
}

let processSounds = () => {
    return fetchSoundSourcesAndLoadSounds();
}
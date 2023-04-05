export const assetController = {
    IMGsources: [],
    IMGnames: [],
    images: [],
    SNDsources: [],
    sounds: [],
    percentageLoaded: 0,
};

async function loadImages() {
    // Load all images
    for (let i = 0; i < assetController.IMGsources.length; i++) {
        assetController.images[i] = await loadImage(assetController.IMGsources[i]);
        assetController.IMGnames[i] = assetController.IMGsources[i].replace(
            /\/assets\//g,
            ''
        );
        console.log(assetController.IMGnames[i]);
        assetController.percentageLoaded = Math.floor(
            (i / assetController.IMGsources.length) * 100
        );
        document.getElementById(
            'imageLoading'
        ).innerHTML = `<h1>LOADING IMAGES: ${assetController.percentageLoaded}%</h1>`;
    }
    console.log('All images loaded');
    assetController.percentageLoaded = 100;
    document.getElementById(
        'imageLoading'
    ).innerHTML = `<h1>LOADING IMAGES: ${assetController.percentageLoaded}%</h1>`;
    document.dispatchEvent(new Event('images-processed'));
}


let loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            console.log(`Loaded image: ${src}`);
            resolve(img);
        };
        img.onerror = (err) => reject(err);
    });
};

export const grabImage = (src) => {
    return assetController.images.find((image) => {
        return image.src.includes(src);
    });
};

export const processImages = () => {
    return loadImages();
};

// Load image sources from IPC

window.addEventListener('DOMContentLoaded', async () => {
    const appPath = await window.api.getAppPath();
    window.api.receive('images-paths', (data) => {
        assetController.IMGsources = data.map((file) => `file://${appPath}/public/assets/${file}`);
        console.log(assetController.IMGsources);
        processImages();
    });
});


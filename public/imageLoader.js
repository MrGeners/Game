//declare all image sources within this array

const assetController = {

    IMGsources: [],
    IMGnames: [],
    images: [],
    SNDsources: [],
    sounds: [],
    percentageLoaded: 0,
}

async function fetchImageSourcesAndLoadImages() {
    try {
        const response = await fetch('/api/assets');
        const imageSources = await response.json();
        assetController.IMGsources = imageSources;

        return await loadImages();
    } catch (err) {
        console.error('Error fetching image sources or loading images:', err);
    }
}





let loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
    });
}



async function loadImages() {
    //load all images
    for (let i = 0; i < assetController.IMGsources.length; i++) {


        assetController.images[i] = await loadImage(assetController.IMGsources[i]);
        assetController.IMGnames[i] = assetController.IMGsources[i].replace(/\/assets\//g, "");
        assetController.percentageLoaded = Math.floor((i / assetController.IMGsources.length) * 100);
        document.getElementById("imageLoading").innerHTML = `<h1>LOADING IMAGES: ${assetController.percentageLoaded}%</h1>`;

    }
    console.log('All images loaded');
    assetController.percentageLoaded = 100;
    document.getElementById("imageLoading").innerHTML = `<h1>LOADING IMAGES: ${assetController.percentageLoaded}%</h1>`;
}


let grabImage = (src) => {
    return assetController.images.find((image) => {
        return image.src.includes(src);
    });
}


let processImages = () => {
    return fetchImageSourcesAndLoadImages();
}

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/sounds', express.static(path.join(__dirname, 'public', 'sounds'), {
    setHeaders: (res, path) => {
        const ext = path.split('.').pop();
        if (ext === 'mp3') {
            res.setHeader('Content-Type', 'audio/mpeg');
        } else if (ext === 'wav') {
            res.setHeader('Content-Type', 'audio/wav');
        } else if (ext === 'ogg') {
            res.setHeader('Content-Type', 'audio/ogg');
        }
    }
}));

app.get('/api/assets', (req, res) => {
    const assetsFolderPath = './public/assets';
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];

    try {
        const files = fs.readdirSync(assetsFolderPath);

        const imagePaths = files
            .filter(file => {
                const ext = path.extname(file).toLowerCase();
                return imageExtensions.includes(ext);
            })
            .map(file => `/assets/${file}`);

        res.json(imagePaths);
    } catch (err) {
        console.error('Error reading the assets folder:', err);
        res.status(500).json({ error: 'Error reading the assets folder' });
    }
});

app.get('/api/sounds', (req, res) => {
    const soundsFolderPath = './public/sounds';
    const soundExtensions = ['.mp3', '.wav', '.ogg'];

    try {
        const files = fs.readdirSync(soundsFolderPath);

        const soundPaths = files
            .filter(file => {
                const ext = path.extname(file).toLowerCase();
                return soundExtensions.includes(ext);
            })
            .map(file => `/sounds/${file}`);

        res.json(soundPaths);
    } catch (err) {
        console.error('Error reading the sounds folder:', err);
        res.status(500).json({ error: 'Error reading the sounds folder' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


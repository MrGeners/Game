const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');



ipcMain.handle('get-app-path', () => {
    return app.getAppPath();
});


let mainWindow;


function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 1200,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });


    mainWindow.loadFile(path.join(__dirname, 'public', 'index.html'));
    mainWindow.webContents.openDevTools();
    mainWindow.webContents.on('did-finish-load', () => {
        const assetsFolderPath = path.join(__dirname, 'public', 'assets');
        const soundsFolderPath = path.join(__dirname, 'public', 'sounds');
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
        const soundExtensions = ['.mp3', '.wav', '.ogg'];

        const files = fs.readdirSync(assetsFolderPath);
        const imagePaths = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext);
        });

        const soundFiles = fs.readdirSync(soundsFolderPath);
        const soundPaths = soundFiles.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return soundExtensions.includes(ext);
        });

        mainWindow.webContents.send('images-paths', imagePaths);
        mainWindow.webContents.send('sounds-paths', soundPaths);
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

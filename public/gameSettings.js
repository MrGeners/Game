//I have made this a class instead of an object literal for one reason
//It may make it easier to add setting presets in the future
//As a todo: make an array of preset settings and a function to switch between them

export class GameSettings {
    #gameWidth;
    #gameHeight;
    #gameTitle;
    #gameBackgroundColor;
    #gameFPS;
    #backgroundCanvas;
    #foregroundCanvas;
    #middleGroundCanvas;
    #backgroundEffects;
    #middleGroundEffects;
    #foregroundEffects;
    #screens;

    constructor() {
        this.#gameWidth = 800;
        this.#gameHeight = 600;
        this.#gameTitle = "Game";
        this.#gameBackgroundColor = "black";
        this.#gameFPS = 60;
        this.#backgroundCanvas = document.getElementById("background");
        this.#foregroundCanvas = document.getElementById("foreground");
        this.#middleGroundCanvas = document.getElementById("middle");
        this.#backgroundEffects = document.getElementById("effects1");
        this.#middleGroundEffects = document.getElementById("effects2");
        this.#foregroundEffects = document.getElementById("effects3");
        this.#screens = document.querySelectorAll("canvas");
        this.setCanvasResolution("1:1");
        this.updateCanvasContainerSize();
    }

    updateCanvasContainerSize() {
        const canvas = document.getElementById("background");
        const canvasContainer = document.getElementById("canvas-container");
        canvasContainer.style.width = `${canvas.width}px`;
        canvasContainer.style.height = `${canvas.height}px`;
    }

    setCursorImg(img) {
        if (img === null)
            return;
        document.body.style.cursor = `url(${img}), auto`;
    }


    setCanvasResolution(mode) {
        const container = document.body; // Assuming the canvases are direct children of the body tag
        let width, height;

        // Calculate the new dimensions based on the selected mode
        switch (mode) {
            case "1:1":
                width = container.clientHeight;
                height = container.clientHeight;
                break;
            case "2:1":
                width = container.clientWidth;
                height = container.clientWidth / 2;
                break;
            case "3:1":
                width = container.clientWidth;
                height = container.clientWidth / 3;
                break;
            case "fullscreen":
                width = container.clientWidth;
                height = container.clientHeight;
                break;
            default:
                throw new Error("Invalid mode");
        }

        // Set the new dimensions for each canvas
        this.#screens.forEach((canvas) => {
            canvas.width = width;
            canvas.height = height;
        });

        // Update the canvas container size
        this.updateCanvasContainerSize();
    }
}
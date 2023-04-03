class gameSettings {

    constructor() {
        this.#gameWidth = 800;
        this.#gameHeight = 600;
        this.#gameTitle = "Game";
        this.#gameBackgroundColor = "black";
        this.#gameFPS = 60;
        this.#backgroundCanvas = document.getElementById("background");
        this.#foregroundCanvas = document.getElementById("foreground");
        this.#middleGroundCanvas = document.getElementById("middle");
        this.#bacgroundEffects = document.getElementById("effects1");
        this.#middleGroundEffects = document.getElementById("effects2");
        this.#foregroundEffects = document.getElementById("effects3");
        this.#screens = document.querySelectorAll("canvas");
    }

    setCanvasResolution(mode) {
        const container = document.body; // Assuming the canvases are direct children of the body tag
        let width, height;

        // Calculate the new dimensions based on the selected mode
        switch (mode) {
            case "1:1":
                width = container.clientWidth;
                height = container.clientWidth;
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
        screens.forEach((canvas) => {
            canvas.width = width;
            canvas.height = height;
        });
    }




}
import { processImages, assetController } from './imageLoader.js';
import { processSounds } from './soundLoader.js';
import { Actor, Transform, Sprite, Collider } from './actor.js';
import { GameSettings } from './gameSettings.js';
import { SceneManager, Scene } from './sceneManager.js';


const input = {
    keys: {},
    prevKeys: {},
    mouseX: 0,
    mouseY: 0,
    mouseLeft: false,
    mouseRight: false,
    mouseMoving: false,

    keyDownHandler: function (event) {
        this.keys[event.code] = true;

    },

    keyUpHandler: function (event) {
        this.keys[event.code] = false;

    },

    update: function () {
        this.prevKeys = { ...this.keys };
        this.mouseMoving = false;

    },

    isKeyPressed: function (key) {
        console.log(key + " pressed: " + this.keys[key] + " " + this.prevKeys[key]);
        return this.keys[key] && !this.prevKeys[key];

    },

    isKeyReleased: function (key) {
        return !this.keys[key] && this.prevKeys[key];
    },

    mousePosition: function (event) {
        const canvas = document.getElementById('foreground');
        const rect = canvas.getBoundingClientRect();
        this.mouseX = event.clientX - rect.left;
        this.mouseY = event.clientY - rect.top;
        this.mouseMoving = true;
    },

    mouseClicked: function (event) {
        if (event.button === 0) {
            this.mouseLeft = true;
        } else if (event.button === 2) {
            this.mouseRight = true;
        }
    },

    mouseUp: function (event) {
        if (event.button === 0) {
            this.mouseLeft = false;
        } else if (event.button === 2) {
            this.mouseRight = false;
        }
    },


    isMouseLeftPressed: function () {
        return this.mouseLeft;
    },

    isMouseRightPressed: function () {
        return this.mouseRight;
    },

    isMouseMoving: function () {
        return this.mouseMoving;
    },

    getMousePosition: function () {
        return { x: this.mouseX, y: this.mouseY };
    },




    initListeners: function () {
        document.addEventListener('keydown', (event) => this.keyDownHandler(event));
        document.addEventListener('keyup', (event) => this.keyUpHandler(event));
        document.addEventListener('mousemove', (event) => this.mousePosition(event));
        document.addEventListener('click', (event) => this.mouseClicked(event));
        document.addEventListener('mouseup', (event) => this.mouseUp(event));
    }
};

const settings = new GameSettings();

const gameController = {
    actors: [],
    addActor: function (actor) {
        this.actors.push(actor);
    },
    removeActor: function (actor) {
        this.actors = this.actors.filter((a) => a !== actor);
    },
    update: function () {

        for (let actor of this.actors) {
            if (actor.update) {
                actor.update();
            }
        }

        //testing
        if (input.mouseMoving) {
            const mousePos = input.getMousePosition();
            console.log("mouse pos: " + mousePos.x + " " + mousePos.y);
        }

        input.update();
    },
    render: function (ctx) {
        for (let actor of this.actors) {
            if (actor.render) {
                actor.render(ctx);
            }
        }
    },
    gameLoop: function () {
        const ctx = document.getElementById('foreground').getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.update();
        this.render(ctx);

        requestAnimationFrame(() => this.gameLoop());
    },
    main: async function () {
        console.log("main");
        input.initListeners();
        this.gameLoop();
    }
};


Promise.all([processImages(), processSounds()]).then(() => {
    gameController.main();
});
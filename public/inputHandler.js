import { gameController } from './gameController.js';

export const input = {
    keys: {},
    prevKeys: {},
    mouseX: 0,
    mouseY: 0,
    mouseLeft: false,
    mouseRight: false,
    mouseMoving: false,
    boundOnMouseMovePan: null,

    startPosition: { x: 0, y: 0 },

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

    onMouseMove: function (event) {
        const canvas = document.getElementById('foreground');
        const rect = canvas.getBoundingClientRect();
        this.mouseX = event.clientX - rect.left;
        this.mouseY = event.clientY - rect.top;
        this.mouseMoving = true;

    },

    onMouseMovePan: function (event) {
        console.log("panning");
        const dx = event.clientX - this.startPosition.x;
        const dy = event.clientY - this.startPosition.y;
        gameController.pan(dx, dy);

        this.startPosition.x = event.clientX;
        this.startPosition.y = event.clientY;
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
        document.addEventListener('mousemove', (event) => this.onMouseMove(event));
        document.addEventListener('click', (event) => this.mouseClicked(event));
        document.addEventListener('mouseup', (event) => this.mouseUp(event));


        this.boundOnMouseMovePan = this.onMouseMovePan.bind(this);



        const canvas = document.getElementById('effects3');


        canvas.addEventListener('mousedown', (event) => {
            console.log("mouse down");
            if (event.button === 0) { // left mouse button
                this.startPosition.x = event.clientX;
                this.startPosition.y = event.clientY;
                console.log("MADE IT!");
                canvas.addEventListener('mousemove', this.boundOnMouseMovePan);
            }
        });
        canvas.addEventListener('mouseup', (event) => {
            // ...
            canvas.removeEventListener('mousemove', this.boundOnMouseMovePan);
        });


        canvas.addEventListener("wheel", (event) => {
            event.preventDefault();
            console.log("wheel");

            const zoomFactor = event.deltaY < 0 ? 1.1 : 1 / 1.1;
            gameController.zoom(zoomFactor);
        });


    }
};
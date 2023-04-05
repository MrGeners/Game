console.log("MADE IT HERE! main beginning");

import { processImages, assetController, grabImage } from './imageLoader.js';
import { processSounds, grabSound } from './soundLoader.js';
import { Actor, Transform, Sprite, Collider } from './actor.js';
import { GameSettings } from './gameSettings.js';
import { SceneManager, Scene } from './sceneManager.js';
import { input } from './inputHandler.js';
import { layers } from './layers.js';
import { create, beginUpdate, endUpdate, beginDraw, endDraw } from './develop.js';
import { Camera } from './camera.js';
import { SoundManager } from './soundManager.js';
import * as scenes from './scenes/scenes.js';
import { test } from './test.js';

console.log(test);

export const gameController = {


    actors: [],
    settings: new GameSettings(),
    sceneManager: new SceneManager(),
    camera: new Camera(document.getElementById("foreground").width / 2, document.getElementById("foreground").height / 2, 1, 0.1, 0.1),
    soundManager: new SoundManager(),

    addActor: function (actor) {
        this.actors.push(actor);
    },


    removeActor: function (actor) {
        this.actors = this.actors.filter((a) => a !== actor);
    },

    clearScreens: function () {
        for (let screen of layers.screens) {
            screen.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
        }
    },

    pan: function (dx, dy) {
        this.camera.setPan(dx, dy);
    },

    zoom: function (zoomFactor) {
        this.camera.setZoom(zoomFactor);
    },

    initial: function () {
        this.sceneManager.push(new scenes.TestScene());
        create();

    },



    update: function () {
        beginUpdate();

        if (this.sceneManager.currentScene) {
            this.sceneManager.currentScene.update();
        }

        for (let actor of this.actors) {
            if (actor.update) {
                actor.update();
            }
        }

        if (input.isKeyPressed("KeyR")) {
            this.camera.reset();
        }


        this.camera.update();


        endUpdate();
        input.update();
    },



    render: function () {
        this.clearScreens();
        beginDraw();
        if (this.sceneManager.currentScene) {
            this.sceneManager.currentScene.render();
        }

        for (let ctx of layers.screens) {
            ctx.save(); // Save the current context state
        }

        this.camera.apply();

        for (let actor of this.actors) {
            if (actor.draw) {
                actor.draw();
            }
        }

        for (let ctx of layers.screens) {
            ctx.restore(); // Restore the context state to the previously saved state
        }

        endDraw();

    },



    gameLoop: function () {
        const ctx = document.getElementById('foreground').getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.update();
        this.render();

        requestAnimationFrame(() => this.gameLoop());
    },


    //MAIN FUNCTION!!!!!!!!!
    main: async function () {
        console.log("main");
        this.soundManager.addSound("KOK", grabSound("KOK.mp3"));
        input.initListeners();
        this.initial();
        this.gameLoop();
    }


};

let imagesProcessed = false;
let soundsProcessed = false;

document.addEventListener('images-processed', () => {
    imagesProcessed = true;
    if (soundsProcessed) {
        gameController.main();
    }
});

document.addEventListener('sounds-processed', () => {
    soundsProcessed = true;
    if (imagesProcessed) {
        gameController.main();
    }
});


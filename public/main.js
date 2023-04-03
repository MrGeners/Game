import { processImages, assetController } from './imageLoader.js';
import { processSounds } from './soundLoader.js';
import { Actor, Transform, Sprite, Collider } from './actor.js';
import { GameSettings } from './gameSettings.js';
import { SceneManager, Scene } from './sceneManager.js';
import { input } from './inputHandler.js';


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


    //MAIN FUNCTION!!!!!!!!!
    main: async function () {
        console.log("main");
        input.initListeners();
        this.gameLoop();
    }


};


Promise.all([processImages(), processSounds()]).then(() => {
    gameController.main();
});
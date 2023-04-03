const inputHandler = {
    keys: {},
    keyUp: {},
    init: function () {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            this.keyUp[e.code] = false;
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
            this.keyUp[e.code] = true;
        });
    },
    isKeyPressed: function (keyCode) {
        return this.keys[keyCode] || false;
    },
    isKeyReleased: function (keyCode) {
        const result = this.keyUp[keyCode] || false;
        this.keyUp[keyCode] = false; // Reset the keyUp state after checking
        return result;
    }
};

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
        inputHandler.init();
        this.gameLoop();
    }
};


Promise.all([processImages(), processSounds()]).then(() => {
    gameController.main();
});
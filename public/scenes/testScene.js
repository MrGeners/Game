import * as common from '../commonImports.js';

export class TestScene extends common.Scene {
    constructor() {
        super('TestScene');
        this.layer = common.layers.middle;
        let screenWidth = common.gameController.settings.gameWidth;
        let screenHeight = common.gameController.settings.gameHeight;
        const sprite = new common.Sprite(common.grabImage('destiny.png'));
        this.actor = new common.Actor(this.layer, screenWidth / 2, screenHeight / 2, sprite);
        common.gameController.addActor(this.actor);
        common.gameController.soundManager.setBackground('KOK');
        common.gameController.soundManager.playBackground();

    }
}
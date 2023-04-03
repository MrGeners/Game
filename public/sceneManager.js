export class SceneManager {
    constructor() {
        this.scenes = [];
        this.currentScene = null;
    }

    push(scene) {
        if (this.currentScene) {
            this.currentScene.pause();
        }
        this.scenes.push(scene);
        this.currentScene = scene;
        this.currentScene.start();
    }

    // Remove the current scene and return to the previous one
    pop() {
        if (this.scenes.length === 0) {
            console.error("No scene to pop.");
            return;
        }
        this.currentScene.stop();
        this.scenes.pop();
        this.currentScene = this.scenes.length > 0 ? this.scenes[this.scenes.length - 1] : null;

        if (this.currentScene) {
            this.currentScene.resume();
        }
    }

    // Replace the current scene with a new one
    replace(scene) {
        if (this.scenes.length === 0) {
            console.error("No scene to replace.");
            return;
        }
        this.currentScene.stop();
        this.scenes.pop();
        this.scenes.push(scene);
        this.currentScene = scene;
        this.currentScene.start();
    }

    // Clear all scenes and add a new one
    clearAndPush(scene) {
        while (this.scenes.length > 0) {
            this.scenes.pop().stop();
        }
        this.scenes.push(scene);
        this.currentScene = scene;
        this.currentScene.start();
    }
}

export class Scene {
    constructor(name) {
        this.name = name;
    }

    start() {
        console.log(`Starting scene: ${this.name}`);
    }

    stop() {
        console.log(`Stopping scene: ${this.name}`);
    }

    pause() {
        console.log(`Pausing scene: ${this.name}`);
    }

    resume() {
        console.log(`Resuming scene: ${this.name}`);
    }

    update() {
        // To be overridden by derived classes
    }

    render() {
        // To be overridden by derived classes
    }
}
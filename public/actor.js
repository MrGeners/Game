
class Transform {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
    }
}


class Actor {

    #name;
    #sprite;
    #collider;
    #transform;

    constructor(sprite = null, collider = null) {
        this.name = "actor"
        this.#transform = new Transform();
        this.#collider = collider;
        this.#sprite = sprite;

    }

    set sprite(sprite) {
        this.#sprite = sprite;
    }

    update() {
    }

    draw() {
    }


}
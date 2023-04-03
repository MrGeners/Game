
class Transform {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
    }
}

class Collider {
    constructor(type = "circle", radius = 0, points = []) {
        this.type = type;
        this.radius = radius;
        this.points = points;
    }
}


class Sprite {
    constructor(image = new Image(), offsetX = 0, offsetY = 0, frameWidth = 0, frameHeight = 0, frameCount = 1, frameRate = 0, originX = null, originY = null) {
        this.image = image;
        this.width = image.width;
        this.height = image.height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameCount = frameCount;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.timeSinceLastFrame = 0;
        this.originX = originX != null ? originX : image.width / 2;
        this.originY = originY != null ? originY : image.height / 2;
    }

    update(deltaTime) {
        if (this.frameRate > 0) {
            this.timeSinceLastFrame += deltaTime;
            if (this.timeSinceLastFrame >= 1000 / this.frameRate) {
                this.currentFrame = (this.currentFrame + 1) % this.frameCount;
                this.timeSinceLastFrame = 0;
            }
        }
    }

    draw(ctx, x, y, rotation = 0, scaleX = 1, scaleY = 1) {
        if (this.image) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.scale(scaleX, scaleY);
            ctx.drawImage(
                this.image,
                this.offsetX + this.currentFrame * this.frameWidth,
                this.offsetY,
                this.frameWidth,
                this.frameHeight,
                -this.originX,
                -this.originY,
                this.frameWidth,
                this.frameHeight
            );
            ctx.restore();
        }
    }
}


class Actor {

    #name;
    #sprite;
    #collider;
    #transform;

    constructor(x = 0, y = 0, sprite = null, collider = null) {
        this.name = "actor"
        this.#transform = new Transform();
        this.#collider = collider;
        this.#sprite = sprite;
        this.#transform.x = x;
        this.#transform.y = y;
        this.substantiateCollider(collider);

    }

    set sprite(sprite) {
        this.#sprite = sprite;
    }

    update() {
    }

    draw() {
    }

    substantiateCollider(collider) {
        if (collider && collider.type === 'polygon') {
            this.#collider = new Polygon(new Vector(this.#transform.x, this.#transform.y), collider.points);
        } else if (collider && collider.type === 'circle') {
            this.#collider = new Circle(new Vector(this.#transform.x, this.#transform.y), collider.radius);
        } else {
            // Default AABB collider with width and height based on the sprite
            const width = this.#sprite ? this.#sprite.width : 0;
            const height = this.#sprite ? this.#sprite.height : 0;
            this.#collider = new Polygon(new Vector(this.#transform.x, this.#transform.y), [
                new Vector(0, 0),
                new Vector(width, 0),
                new Vector(width, height),
                new Vector(0, height),
            ]);
        }
    }


}
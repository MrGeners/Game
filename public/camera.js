export class Camera {
    constructor(x, y, zoom, panSpeed, zoomSpeed) {
        this.x = x;
        this.y = y;
        this.zoom = zoom;
        this.panSpeed = panSpeed;
        this.zoomSpeed = zoomSpeed;

        this.targetX = x;
        this.targetY = y;
        this.targetZoom = zoom;
    }

    setPanTarget(x, y) {
        this.targetX = x;
        this.targetY = y;
    }

    setZoomTarget(zoom) {
        this.targetZoom = zoom;
    }

    update() {
        this.x += (this.targetX - this.x) * this.panSpeed;
        this.y += (this.targetY - this.y) * this.panSpeed;
        this.zoom += (this.targetZoom - this.zoom) * this.zoomSpeed;
    }

    apply(ctx) {
        ctx.translate(-this.x * this.zoom + ctx.canvas.width / 2, -this.y * this.zoom + ctx.canvas.height / 2);
        ctx.scale(this.zoom, this.zoom);
    }
}
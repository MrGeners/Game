import { layers } from "./layers.js";


export class Camera {
    constructor(x, y, zoom, panSpeed, zoomSpeed) {


        const canvas = document.getElementById("effects3");
        this.x = x;
        this.y = y;
        this.zoom = zoom;
        this.panSpeed = panSpeed;
        this.zoomSpeed = zoomSpeed;

        this.initialX = x;
        this.initialY = y;
        this.initialZoom = zoom;

        this.targetX = this.x;
        this.targetY = this.y;
        this.targetZoom = zoom;
    }

    setPanTarget(x, y) {
        this.targetX = x;
        this.targetY = y;
    }

    setZoomTarget(zoom) {
        this.targetZoom = zoom;
    }

    reset() {
        this.setPanTarget(this.initialX, this.initialY);
        this.setZoomTarget(this.initialZoom);
    }

    setPan(dx, dy) {
        this.setPanTarget(
            this.targetX - dx / this.zoom,
            this.targetY - dy / this.zoom
        );
    }

    setZoom(zoomFactor) {
        const newZoom = this.targetZoom * zoomFactor;
        this.setZoomTarget(newZoom);

        const offsetX = (this.targetX - this.x) * (1 - zoomFactor);
        const offsetY = (this.targetY - this.y) * (1 - zoomFactor);
        this.setPanTarget(
            this.targetX + offsetX,
            this.targetY + offsetY
        );
    }

    update() {
        this.x += (this.targetX - this.x) * this.panSpeed;
        this.y += (this.targetY - this.y) * this.panSpeed;
        this.zoom += (this.targetZoom - this.zoom) * this.zoomSpeed;
    }

    apply() {

        for (let ctx of layers.screens) {
            ctx.translate(-this.x * this.zoom + ctx.canvas.width / 2, -this.y * this.zoom + ctx.canvas.height / 2);
            ctx.scale(this.zoom, this.zoom);
        }
    }
}
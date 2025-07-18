import map from "./mapManager.js";
import input from './inputManager.js';

class Camera {
    WIDTH = 1000;
    HEIGHT = 500;

    // default camera
    constructor() {
        this.viewport = document.getElementById("viewport");
        this.viewport.style.backgroundColor = "green";
        this.viewport.width = this.WIDTH;
        this.viewport.height = this.HEIGHT;
        this.vpCtx = this.viewport.getContext("2d");
        this.position = {
            x: 0,
            y: 125
        };

        this.velocity = {
            dx: 0,
            dy: 0
        };

        // camera manages how much of screen to show; optimally 1920 * 1080;
        this.width = this.WIDTH;
        this.height = this.HEIGHT;
    }

    draw() {
        this.vpCtx.reset();
        const { x, y } = this.position;
        const { width, height } = this;

        this.vpCtx.drawImage(map.canvas, x, y, width, height, 0, 0, this.WIDTH, this.HEIGHT);
    }

    update() {
        const { x, y } = this.position;
        const { dx, dy } = this.velocity;

        let newX = x + dx;
        let newY = y + dy;

        // double velo
        if (input.isSprinting()) {
            newX += dx;
            newY += dy;
        }

        // semi lazy boundary detection -- camera straight stops fr fr
        newX = Math.min(newX + this.width, map.canvas.width) - this.width;
        newX = Math.max(newX, 0);
        newY = Math.min(newY + this.height, map.canvas.height) - this.height;
        newY = Math.max(newY, 0);

        this.position.x = newX;
        this.position.y = newY;

        this.draw();
    }
}

export default new Camera();
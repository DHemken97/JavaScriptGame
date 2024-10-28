import { Entity } from "./entity.js";
export class Platform extends Entity {
    constructor(x, y, width, height) {
        super(null,x,y,width,height,null,null,1)
            this.width = width;
        this.height = height;
        this.isSolid = true; // Example property for collision
    }

    drawFrame(ctx) {
        ctx.fillStyle = "red"; // Color or image for platform
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(game) {
        // Any platform-specific update logic, such as movement

    }
}

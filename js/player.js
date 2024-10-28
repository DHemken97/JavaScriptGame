import Resources from "./Resources.js";
import { Entity } from "./entity.js";

export class Player extends Entity {
    constructor() {
        super(Resources.PlayerSheet, 0, 0, 50, 50, 575, 525, 7); // Initialize inherited properties
        this.ignoreInput = false;
        this.isDead = false;
        this.attackMode = false;
        this.hasGravity = true;
    }

    drawFrame(canvasCtx) {
        let position = Math.floor(this.frame),
            s_height = this.sprite_height,
            s_width = this.sprite_width,
            x_offset = this.sprite_width * position,
            y_offset = this.sprite_height * this.animationSet,
            sx = 0 + x_offset,
            sy = 0 + y_offset;

        canvasCtx.save();

        if (this.inverse) {
            canvasCtx.scale(-1, 1);
            canvasCtx.drawImage(
                this.spriteSheet, 
                sx, sy, s_width, s_height, 
                -this.x - this.width, this.y, 
                this.width, this.height
            );
        } else {
            canvasCtx.drawImage(
                this.spriteSheet, 
                sx, sy, s_width, s_height, 
                this.x, this.y, 
                this.width, this.height
            );
        }

        canvasCtx.restore();
    }

    update(game) {

        if (this.isDead) return;
        
        let keys = game.controller.pressedKeys;
        if (!this.ignoreInput) {
            if (keys.includes("ArrowRight")) {
                this.velocity_x = 5;
                this.setAnimation(3);
                this.inverse = false;
            } else if (keys.includes("ArrowLeft")) {
                this.velocity_x = -5;
                this.setAnimation(3);
                this.inverse = true;
            } else {
                this.velocity_x = 0;
                this.setAnimation(0);
            }

            if (keys.includes("ArrowUp") && this.isOnGround()) {
                this.velocity_y = -20;
            }

            if (this.velocity_y < 0) {
                this.velocity_y += 0.1;
                this.setAnimation(1);
            } else if (this.velocity_y > 0 && !this.isOnGround()) {
                this.setAnimation(2);
            }

            if (keys.includes("ArrowDown") && this.isOnGround()) {  
                this.setAnimation(this.velocity_x === 0 ? 5 : 6);
            }


        }


        super.update(); // Call base class Update to handle movement and bounds
    }
    
    onFrameOverload(){
        if (this.animationSet === 9) {
            this.ignoreInput = false;
            this.setAnimation(0);
            this.frame = 0;
        } else if (this.animationSet === 8) {
            this.animationSpeed = 0;
            this.ignoreInput = false;
            this.isDead = true;
            console.log("Dead");
        } else {
            this.frame = 0;
        }
    }

    handleBoundaryCollision(){
        this.velocity_x = this.x>this.min_X ? -2 : 2;
        this.setAnimation(9);
    }
    handleObjectCollision(){
        this.velocity_y = 0;
    }
    setAnimation(val) {
        if (this.animationSet === val || this.animationSet === 8 || this.isDead) return;
        this.animationSet = val;
        this.animationSpeed = this.animationSet === 5 ? 0.08 : 0.1;
        this.attackMode = this.animationSet === 6;
        switch (this.animationSet) {
            case 0: this.maxFrames = 7; break;
            case 1: this.maxFrames = 7; break;
            case 2: this.maxFrames = 7; break;
            case 3: this.maxFrames = 9; break;
            case 4: this.maxFrames = 11; break;
            case 5: this.maxFrames = 5; break;
            case 6: this.maxFrames = 7; break;
            case 7: this.maxFrames = 7; break;
            case 8: this.maxFrames = 11; break;
            case 9:
                this.maxFrames = 4;
                this.ignoreInput = true;
                this.animationSpeed = 0.25;
                break;
        }
    }
}

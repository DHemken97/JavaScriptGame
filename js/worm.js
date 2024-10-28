import { Entity } from "./entity.js";
import Resources from "./Resources.js";

export class worm extends Entity{

    constructor(x,y){
        let width = 32,
            height = 25,
            sprite_width =229,
            sprite_height =171,
            numberOfFrames=6;

        super(Resources.WormSheet,x,y,width,height,sprite_width,sprite_height,numberOfFrames)
        this.min_X = x;
        this.max_X =Math.min(600-width, x+150);
        this.velocity_x =  this.getRandomFloat(0.5, 2.5);
        this.inverse = true;
        this.hasGravity = true;

       }

       update(){
        super.update()
       




            if (this.isDead && this.frame >4)
            {
               this.animationSpeed =0;
               this.remove = true;
            }


       }
        getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
    handleBoundaryCollision(){
        this.velocity_x = -this.velocity_x;
        this.inverse = !this.inverse;
       }
    
    die(){
        if (this.isDead) return;
        this.isDead = true;
        this.spriteSheet = Resources.BoomSheet;
        this.frame = 0; 
        this.maxFrames = 5;
        this.sprite_width = 200;

    }


}


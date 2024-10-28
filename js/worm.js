import { entity } from "./entity.js";
import Resources from "./Resources.js";

export class worm extends entity{

    constructor(x,y){
        let width = 32,
            height = 25,
            sprite_width =229,
            sprite_height =171,
            numberOfFrames=6;

        super(Resources.WormSheet,x,y,width,height,sprite_width,sprite_height,numberOfFrames)
        this.min_X = x;
        this.max_X = x+150;
        this.velocity_x =  this.getRandomFloat(0.5, 2.5);
        this.inverse = true;

       }

       Update(){
        super.Update()
       
        if (this.x>this.max_X || this.x<this.min_X)
            {
                this.velocity_x = -this.velocity_x;
                this.inverse = !this.inverse;
            }



            if (this.isDead && this.frame >4)
            {
               this.animationSpeed =0;
               this.remove = true;
            }


       }
        getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    
    die(){
        if (this.isDead) return;
        this.isDead = true;
        this.spriteSheet = Resources.BoomSheet;
        this.frame = 0; 
        this.maxFrames = 5;

    }


}


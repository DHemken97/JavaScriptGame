import { Entity } from "./entity.js";
import Resources from "./Resources.js";

export class Raven extends Entity{

    constructor(x,y){
        let width = 64,
            height = 50,
            sprite_width =271,
            sprite_height =194,
            numberOfFrames=6;

        super(Resources.RavenSheet,x,y,width,height,sprite_width,sprite_height,numberOfFrames)
       

        this.min_X = x;
        this.max_X =Math.min(600-width, x+250);
        this.velocity_x = 2;
        this.inverse = true;
        this.hasGravity = false;

       }


       update(){
        super.update()
                   
            if (this.isDead && this.frame >4)
                {
                   this.animationSpeed =0;
                   this.remove = true;
                }
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


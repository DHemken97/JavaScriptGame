import { entity } from "./entity.js";
import Resources from "./Resources.js";

export class Raven extends entity{

    constructor(x,y){
        let width = 64,
            height = 50,
            sprite_width =271,
            sprite_height =194,
            numberOfFrames=6;

        super(Resources.RavenSheet,x,y,width,height,sprite_width,sprite_height,numberOfFrames)
       

        this.min_X = x;
        this.max_X = x+250;
        this.velocity_x = 2;
        this.inverse = true;

       }


       Update(){
        super.Update()
       
        if (this.x>this.max_X || this.x<this.min_X)
            {
                this.velocity_x = -this.velocity_x;
                this.inverse = !this.inverse;
            }
       }

     

}


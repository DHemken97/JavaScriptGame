import { Player } from "./player.js";
import { ControlHandler } from "./controlHandler.js";
export class Game{
    constructor(mainContext){
            this.ctx = mainContext;
            this.player = new Player(mainContext);
            this.ControlHandler = new ControlHandler(mainContext);
            this.score = 0;
        }

    DrawFrame(canvasCtx){
       this.player.DrawFrame(canvasCtx);
       canvasCtx.font = "16px serif";
       canvasCtx.fillStyle = "red";
       canvasCtx.textAlign  = "right";
       canvasCtx.fillText(this.score, 575, 20)
    }
    Update(){
        this.player.Update(this);
    }
}
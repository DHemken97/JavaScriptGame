import { Player } from "./player.js";
import { ControlHandler } from "./controlHandler.js";

const canvas = document.getElementById("gameCanvas");
const canvasCtx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
export class Game{
    
    constructor(){
            this.player = new Player();
            this.controller = new ControlHandler();
            this.score = 0;


        }

    DrawFrame(){
        canvasCtx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT*2);
        this.drawGrid(canvasCtx,CANVAS_WIDTH,CANVAS_HEIGHT,25,"grey")

       this.player.DrawFrame(canvasCtx);
       canvasCtx.font = "16px serif";
       canvasCtx.fillStyle = "red";
       canvasCtx.textAlign  = "right";
       canvasCtx.fillText(this.score, 575, 20)
    }
    Update(){


        this.player.Update(this);
        
    }



     drawGrid(canvasCtx, canvasWidth, canvasHeight, cellSize = 50, color = "#cccccc") {
        canvasCtx.strokeStyle = color;
        canvasCtx.lineWidth = 0.5;
    
        // Draw vertical lines
        for (let x = 0; x <= canvasWidth; x += cellSize) {
            canvasCtx.beginPath();
            canvasCtx.moveTo(x, 0);
            canvasCtx.lineTo(x, canvasHeight);
            canvasCtx.stroke();
        }
    
        // Draw horizontal lines
        for (let y = 0; y <= canvasHeight; y += cellSize) {
            canvasCtx.beginPath();
            canvasCtx.moveTo(0, y);
            canvasCtx.lineTo(canvasWidth, y);
            canvasCtx.stroke();
        }
    }
    
}
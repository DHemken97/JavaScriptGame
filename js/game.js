import { Player } from "./player.js";
import { ControlHandler } from "./controlHandler.js";
import Resources from "./Resources.js";
import { Raven } from "./raven.js";
import { worm } from "./worm.js";
import { CollisionEngine } from "./collisionEngine.js";

const canvas = document.getElementById("gameCanvas");
const canvasCtx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
export class Game{
    
    constructor(){
            
        this.initializeGame();

        }
        initializeGame() {
            this.player = new Player(100, 100);
            this.controller = new ControlHandler();
            this.score = 0;
            this.entities = [];
    
            // Add initial entities to the game
           // this.entities.push(new Raven(100, 250));
            //this.entities.push(new Raven(150, 350));
            //this.entities.push(new Raven(175, 275));
            this.entities.push(new worm(175, 575));
            
            this.collisionEngine = new CollisionEngine(this.entities, this.player);
        }

    DrawFrame(){
        canvasCtx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT*2);
        this.drawGrid(canvasCtx,CANVAS_WIDTH,CANVAS_HEIGHT,25,"grey")
        this.drawBackground(canvasCtx);
       this.player.DrawFrame(canvasCtx);
       this.entities.forEach(e => e.DrawFrame(canvasCtx));
       canvasCtx.font = "16px serif";
       canvasCtx.fillStyle = "red";
       canvasCtx.textAlign  = "right";
       canvasCtx.fillText(this.score, 575, 20)
    }
    Update(){
        if (this.controller.pressedKeys.includes("r")) {
            this.initializeGame();
        }

        this.player.Update(this);
        this.entities.forEach(e => {
            if (e.remove)
                this.entities.splice(this.entities.indexOf(e),1)
            else
            e.Update(this)
        });

        this.collisionEngine.update();
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
    drawBackground(canvasCtx){
        canvasCtx.drawImage(Resources.Background,0,0)
    }
    
}
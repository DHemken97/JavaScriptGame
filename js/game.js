import { Player } from "./player.js";
import { ControlHandler } from "./controlHandler.js";
import Resources from "./Resources.js";
import { Raven } from "./raven.js";
import { worm } from "./worm.js";
import { CollisionEngine } from "./collisionEngine.js";
import { Platform } from "./platform.js";


const canvas = document.getElementById("gameCanvas");
const canvasCtx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

export class Game {
    constructor() {
        this.initializeGame();
    }

    initializeGame() {
        this.player = new Player(100, 100);
        this.controller = new ControlHandler(canvas, (x, y) => this.spawnOnClick(x, y));
        this.score = 0;
        this.entities = [];

        // Add initial entities to the game
        this.entities.push(new worm(175, 575));

        this.collisionEngine = new CollisionEngine(this.entities, this.player);
    }

    spawnOnClick(x, y) {
        // Spawn raven, adjust for height and width
        if (this.controller.pressedKeys.includes("1")) {
            this.entities.push(new worm(x - 32, y - 25));
        } else if (this.controller.pressedKeys.includes("2")) {
            this.entities.push(new Raven(x - 32, y - 25));
        } else if (this.controller.pressedKeys.includes("3")) {
            this.entities.push(new Platform(x, y,100,32));
        } else {
            let dead = new Raven(x - 32, y - 25);
            dead.die();
            this.entities.push(dead);
        }

        console.log(this.entities);
    }

    update() {
        if (this.controller.pressedKeys.includes("r")) {
            this.initializeGame();
        }

        this.player.update(this);
        this.entities.forEach(e => {
            if (e.remove) {
                this.entities.splice(this.entities.indexOf(e), 1);
            } else {
                e.update(this);
            }
        });

        this.collisionEngine.update(this);
    }

    drawFrame() {
        canvasCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT * 2);
        this.drawGrid(canvasCtx, CANVAS_WIDTH, CANVAS_HEIGHT, 25, "grey");
        this.drawBackground(canvasCtx);
        this.player.drawFrame(canvasCtx);
        this.entities.forEach(e => e.drawFrame(canvasCtx));
        this.drawScore();

        if (this.player.isDead) {
            this.drawGameOver();
        }
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

    drawBackground(canvasCtx) {
        canvasCtx.drawImage(Resources.Background, 0, 0);
    }

    drawScore() {
        canvasCtx.font = "16px serif";
        canvasCtx.fillStyle = "red";
        canvasCtx.textAlign = "right";
        canvasCtx.fillText(this.score, 575, 20);
    }

    drawGameOver() {
        canvasCtx.font = "75px serif";
        canvasCtx.fillStyle = "red";
        canvasCtx.textAlign = "center";
        canvasCtx.fillText("Game Over", 300, 300);
    }
}

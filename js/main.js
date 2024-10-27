import { Game } from "./game.js"


const canvas = document.getElementById("gameCanvas");
const canvasCtx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
const mainCtx = this;
const GAME = new Game(mainCtx);


const playerSpriteSheet = new Image();
playerSpriteSheet.src = "./img/shadow_dog.png";


window.addEventListener("load",e => {
    
    animate();
    console.log(this);
})

function animate(){
    canvasCtx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    GAME.Update();
    GAME.DrawFrame(canvasCtx)
    requestAnimationFrame(animate);
}
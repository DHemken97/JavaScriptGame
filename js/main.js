import { Game } from "./game.js"

const GAME = new Game();

window.addEventListener("load",e => {
    step();
})

function step(){
    GAME.Update();
    GAME.DrawFrame()
    requestAnimationFrame(step);
}
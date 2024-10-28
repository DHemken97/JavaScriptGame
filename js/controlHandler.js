export class ControlHandler {
    constructor(canvas,onClickMethod) {
        this.pressedKeys = [];
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        window.addEventListener("keyup", this.onKeyUp);
        window.addEventListener("keydown", this.onKeyDown);
        canvas.addEventListener('click', event => this.onClick(event,canvas,onClickMethod));

    }

    onClick(event, canvas,onClickMethod){
                // Get the canvas's position and dimensions
                const rect = canvas.getBoundingClientRect();

                // Calculate the (x, y) position within the canvas
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                onClickMethod(x,y);
    }
    onKeyUp(e) {
        const keyIndex = this.pressedKeys.indexOf(e.key);
        if (keyIndex !== -1) this.pressedKeys.splice(keyIndex, 1);
    }

    onKeyDown(e) {
        if (!this.pressedKeys.includes(e.key)) this.pressedKeys.push(e.key);
    }

    destroy() {
        window.removeEventListener("keyup", this.onKeyUp);
        window.removeEventListener("keydown", this.onKeyDown);
    }
}

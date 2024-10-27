export class ControlHandler {
    constructor() {
        this.pressedKeys = [];
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        window.addEventListener("keyup", this.onKeyUp);
        window.addEventListener("keydown", this.onKeyDown);
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

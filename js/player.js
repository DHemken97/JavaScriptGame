export class Player{
    constructor(mainContext){
            this.ctx = mainContext;
            this.x = 0;
            this.y=0;
            this.velocity_x = 3.5;
            this.velocity_y = 1.6;
            this.width = 100;
            this.height =100;
            this.max_X = 600-this.width;
            this.max_Y = 600-this.height;
            this.min_X = 0;
            this.min_Y = 0;
            this.frame = 1;
            this.color = "red";
    }

    DrawFrame(canvasCtx){
        canvasCtx.fillStyle = this.color;
        canvasCtx.fillRect(this.x,this.y,this.width,this.height);
        
    }
    Update(game){

        this.x += this.velocity_x;
        this.y += this.velocity_y;

        if (this.x>this.max_X){
            this.x = this.max_X;
            this.velocity_x = -this.velocity_x;
            this.ChangeColor(game);
        }
        if (this.x<this.min_X){
            this.x = this.min_X;
            this.velocity_x = -this.velocity_x;
            this.ChangeColor(game);
        }
        if (this.y>this.max_Y){
            this.y = this.max_Y;
            this.velocity_y = -this.velocity_y;
            this.ChangeColor(game);
        }
        if (this.y<this.min_Y){
            this.y = this.min_Y;
            this.velocity_y = -this.velocity_y;
            this.ChangeColor(game);
        }
    }
    ChangeColor(game){
        if (this.color === "red")
            this.color = "green"
        else if (this.color === "green")
            this.color = "blue"
        else if (this.color === "blue")
            this.color = "yellow"
        else if (this.color === "yellow")
            this.color = "purple"
        else if (this.color === "purple")
            this.color = "black"
        else if (this.color === "black")
            this.color = "orange"
        else if (this.color === "orange")
            this.color = "pink"
        else this.color = "red"


        game.score++;
    }
}
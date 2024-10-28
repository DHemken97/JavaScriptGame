import Resources from "./Resources.js";

export class Player {

    constructor() {
        this.x = 0;
        this.y = 0;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.width = 50;
        this.height = 50;
        this.max_X = 600 - this.width;
        this.max_Y = 600 - this.height;
        this.min_X = 0;
        this.min_Y = 0;
        this.frame = 1;
        this.playerSpriteSheet = Resources.PlayerSheet;
        this.maxFrames = 7;
        this.animationSet = 0;
        this.inverse = false;
        this.animationSpeed = 0.1;
        this.ignoreInput = false;
        this.isDead = false;
    }

    DrawFrame(canvasCtx) {
        let position = Math.floor(this.frame),
            s_height = 525,
            s_width = 575,
            x_offset = 575 * position,
            y_offset = 525 * this.animationSet,
            sx = 0 + x_offset,
            sy = 0 + y_offset;
    
        canvasCtx.save(); // Save the current context state
    
        if (this.inverse) {
            canvasCtx.scale(-1, 1); // Flip horizontally
            // Adjust the x position to account for the flipped drawing
            canvasCtx.drawImage(
                this.playerSpriteSheet, 
                sx, sy, s_width, s_height, 
                -this.x - this.width, this.y, 
                this.width, this.height
            );
        } else {
            canvasCtx.drawImage(
                this.playerSpriteSheet, 
                sx, sy, s_width, s_height, 
                this.x, this.y, 
                this.width, this.height
            );
        }
    
        canvasCtx.restore(); // Restore the context state to avoid affecting other drawings
    }
    


    Update(game) {
        if (this.isDead) return;
        let keys = game.controller.pressedKeys;
        if (!this.ignoreInput)
        {
            if (keys.includes("ArrowRight")) {
                this.velocity_x = 10;
                this.SetAnimation(3)
                this.inverse = false;
            }
            else if (keys.includes("ArrowLeft")) {
                this.velocity_x = -10;
                this.SetAnimation(3)
                this.inverse = true;
            }
            else {
                this.velocity_x = 0;
                this.SetAnimation(0)
            }
            if (keys.includes("ArrowUp") && this.IsOnGround())
                this.velocity_y = -20;
    
            if (this.velocity_y < 0) {
                this.velocity_y += 0.1;
                    this.SetAnimation(1);
            }
            else if (this.velocity_y > 0 && !this.IsOnGround()) {
                this.SetAnimation(2);
            }
    
            if (keys.includes("ArrowDown") && this.IsOnGround())            
                {
                    if (this.velocity_x===0)
                    this.SetAnimation(5);
                    else
                    this.SetAnimation(6);
                }    


        }
        

    
        this.frame += this.animationSpeed;
        if (this.frame >= this.maxFrames)
           {
            if (this.animationSet === 9)
            {
                this.ignoreInput = false;
                this.SetAnimation(0)
                this.frame = 0;
            }
            else if (this.animationSet === 8)
                {
                    this.animationSpeed=0
                    this.ignoreInput = false;
                    this.isDead = true;
                    console.log("Dead")
                }
            else
           {
            this.frame = 0;
           } 

           } 

        this.x += this.velocity_x;
        this.y += this.velocity_y;

        if (this.x > this.max_X) {
            this.x = this.max_X;
                                    //hurt and push back
            this.velocity_x = -1;
            this.SetAnimation(9);
            game.score++;
        }
        if (this.x < this.min_X) {
            this.x = this.min_X;
                        //hurt and push back
            this.velocity_x = 1;
            this.SetAnimation(9);
            game.score++;
        }
        if (this.y > this.max_Y) {
            this.y = this.max_Y;
            this.velocity_y = 0;        
        }
        else {
            //gravity
            this.velocity_y += 0.5;
        }
        if (this.y < this.min_Y) {
            this.y = this.min_Y;
            this.velocity_y = 0;
        }


    }

    IsOnGround() {
        return this.y >= this.max_Y;
    }


    SetAnimation(val) {
        
        if (this.animationSet === val) return;
        if (this.animationSet === 8) return;
        if (this.isDead) return;
        
        this.animationSet = val;
        if (this.animationSet > 9)
            this.animationSet = 0;

        if (this.animationSpeed>0)
        this.animationSpeed = .1;

        switch (this.animationSet) {
            case 0: //REST
                this.maxFrames = 7
                break;
            case 1://JUMP UP
                this.maxFrames = 7
                break;
            case 2://FALL DOWN
                this.maxFrames = 7
                break;
            case 3://RUN
                this.maxFrames = 9
                break;
            case 4://LEAP ACROSS
                this.maxFrames = 11
                break;
            case 5://lay
                this.maxFrames = 5
                this.animationSpeed = 0.08;
                break;
            case 6://ball
                this.maxFrames = 7
                break;
            case 7://dash
                this.maxFrames = 7
                break;
            case 8://die?
                this.maxFrames = 11
                break;
            case 9:
                this.maxFrames = 4
                this.ignoreInput = true;
                this.animationSpeed = 0.25
                break;

        }


    }
}
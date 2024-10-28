export class Entity {

    constructor(spriteSheet,x,y,width,height,sprite_width,sprite_height,numberOfFrames){
        this.x = x;
        this.y = y;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.width = width;
        this.height = height;
        this.sprite_width = sprite_width;
        this.sprite_height = sprite_height;
        this.max_X = 600 - this.width;
        this.max_Y = 600 - this.height;
        this.min_X = 0;
        this.min_Y = 0;
        this.frame = 1;
        this.spriteSheet = spriteSheet;
        this.maxFrames = numberOfFrames;
        this.animationSet = 0;
        this.inverse = false;
        this.animationSpeed = 0.1;
        this.isDead = false;
        this.remove = false;
        this.hasGravity = false;
        this.isOnPlatform = false;

       }

        update(){

            this.calculateFrameUpdates();
            this.calculateVelocityUpdates();
            this.calculatePositionUpdates();


        }


        calculateFrameUpdates(){
            this.frame += this.animationSpeed;
            if (this.frame >= this.maxFrames)
            {
                this.onFrameOverload();
            }
        }
        calculateVelocityUpdates(){
            if (this.x > this.max_X) {
                this.x = this.max_X;
                this.handleBoundaryCollision();
            }
            if (this.x < this.min_X) {
                this.x = this.min_X;                
                this.handleBoundaryCollision();
            }
            if (this.y > this.max_Y) {
                this.y = this.max_Y;
                this.velocity_y = 0;        
            }
            else if (this.hasGravity) {
                //gravity
                this.velocity_y += 0.5;
            }
            if (this.y < this.min_Y) {
                this.y = this.min_Y;
                this.velocity_y = 0;
            }
        }
        calculatePositionUpdates(){

            this.x += this.velocity_x;
            this.y += this.velocity_y;
        }

        drawFrame(canvasCtx){
            let position = Math.floor(this.frame),
            s_height = this.sprite_height,
            s_width = this.sprite_width,
            x_offset = this.sprite_width * position,
            y_offset = this.sprite_height * this.animationSet,
            sx = 0 + x_offset,
            sy = 0 + y_offset;
    
        canvasCtx.save(); // Save the current context state
    
        if (this.inverse) {
            canvasCtx.scale(-1, 1); // Flip horizontally
            // Adjust the x position to account for the flipped drawing
            canvasCtx.drawImage(
                this.spriteSheet, 
                sx, sy, s_width, s_height, 
                -this.x - this.width, this.y, 
                this.width, this.height
            );
        } else {
            canvasCtx.drawImage(
                this.spriteSheet, 
                sx, sy, s_width, s_height, 
                this.x, this.y, 
                this.width, this.height
            );
        }
    
        canvasCtx.restore(); // Restore the context state to avoid affecting other drawings
    
        }
        isOnGround() {
            return this.y >= this.max_Y || this.isOnPlatform;
        }
        onFrameOverload(){
            this.frame = 0;
        }
    
        handleBoundaryCollision(){
            console.log("overwrite this method",this)
           }
    

}


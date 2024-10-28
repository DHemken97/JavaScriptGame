import { Player } from "./player.js";

export class CollisionEngine {
    constructor(entities, player) {
        this.entities = entities; // Array to store all entities that need collision detection
        this.player = player;
        this.addEntity(player);
    }


    addEntity(entity) {
        this.entities.push(entity);
    }

    removeEntity(entity) {
        this.entities = this.entities.filter(e => e !== entity);
    }

    // Check if two entities are colliding
    isColliding(entityA, entityB) {
        return (
            entityA.x < entityB.x + entityB.width &&
            entityA.x + entityA.width > entityB.x &&
            entityA.y < entityB.y + entityB.height &&
            entityA.y + entityA.height > entityB.y
        );
    }

    // Update method to check for collisions
    update(game) {
        // Loop through all pairs of entities
        for (let i = 0; i < this.entities.length; i++) {
            for (let j = i + 1; j < this.entities.length; j++) {
                const entityA = this.entities[i];
                const entityB = this.entities[j];

                // Check if entityA and entityB are colliding
                if (this.isColliding(entityA, entityB)) {
                    // Call custom collision handling if a collision is detected
                    this.handleCollision(entityA, entityB, game);
                }
            }
        }
    }

    // Basic collision handling (you could customize this)
    handleCollision(entityA, entityB, game) {


        if (entityA instanceof Player) {
            this.p = entityA
            this.e = entityB
        }
        else if (entityB instanceof Player) {
            this.p = entityB
            this.e = entityA
        }
        else {
            //enemy on enemy 
            return;
        }

        if (this.e.isDead) return;


        if (this.e.isSolid)
            {
                this.p.handleObjectCollision()
                return;
            }
        this.e.velocity_x = 0;
        this.e.velocity_y = 0;
        this.p.velocity_x = 0;
        this.p.velocity_y = 0;

        if (this.p.isOnGround() && !this.p.attackMode && !this.e.isDead)
            this.p.setAnimation(8);
        else {
            this.e.die();
            game.score++;
        }

        //If player is above enemy I want to add an extra little jump

        if (this.p.y < this.e.y && !this.p.isOnGround())
            this.p.velocity_y = -10;
        //        console.log(`${this.e.constructor.name} collided with ${ this.p.constructor.name}`);
    }
}

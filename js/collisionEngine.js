export class CollisionEngine {
    constructor(entities,player) {
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
    update() {
        // Loop through all pairs of entities
        for (let i = 0; i < this.entities.length; i++) {
            for (let j = i + 1; j < this.entities.length; j++) {
                const entityA = this.entities[i];
                const entityB = this.entities[j];

                // Check if entityA and entityB are colliding
                if (this.isColliding(entityA, entityB)) {
                    // Call custom collision handling if a collision is detected
                    this.handleCollision(entityA, entityB);
                }
            }
        }
    }

    // Basic collision handling (you could customize this)
    handleCollision(entityA, entityB) {
        // Example collision response: Stop movement on collision
        entityA.velocity_x = 0;
        entityA.velocity_y = 0;
        entityB.velocity_x = 0;
        entityB.velocity_y = 0;
        
        if (entityB.IsOnGround() && !entityA.isDead)
        entityB.SetAnimation(8);
    else
    entityA.die();

        console.log(`${entityA.constructor.name} collided with ${entityB.constructor.name}`);
    }
}

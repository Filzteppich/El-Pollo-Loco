/**
 * @description Handles collision detection and response.
 * @class Collision
 */
class Collision{

    constructor(world){
        this.world = world;
    }


/**
 * @description Checks for collisions between the character and enemies.
 * @memberof World
 */
checkCollisions(){
    this.world.level.enemies.forEach((enemy) => {
            if(enemy instanceof Chicken && this.world.character.isColliding(enemy) && !this.world.character.isDead() && !this.world.character.isCollidingFromTop(enemy) && !enemy.isDead() && !isPaused && isGameRunning){
                this.world.character.hit(5);
                this.world.audio.characterHurtSound.play();
                this.world.healthbar.setPercentage(this.world.character.characterHealth, this.world.healthbar.HEALTHBAR_IMAGES);
            }else if(enemy instanceof Endboss && this.world.character.isColliding(enemy) && !this.world.character.isDead() && !enemy.isDead() && isGameRunning){
                this.world.character.hit(50);
                this.world.audio.characterHurtSound.play();
                this.world.healthbar.setPercentage(this.world.character.characterHealth, this.world.healthbar.HEALTHBAR_IMAGES);
            }
    })
}


/**
 * @description Handles the character jumping on an enemy.
 * @memberof World
 */
jumpOnEnemy(){
    this.world.level.enemies.forEach((enemy) => {
        if (this.world.character.isCollidingFromTop(enemy) && !enemy.isDead() && enemy instanceof Chicken) {
        this.world.character.jump();
        enemy.hit(100)
        enemy.checkIfDead();
        this.world.audio.bounceSound.currentTime = 0
        this.world.audio.bounceSound.play();
        }
    });
}


/**
 * @description Checks if bottles are colliding with enemies and handles the attack logic.
 * @memberof World
 */
checkEnemyAttack(){
    this.world.level.enemies.forEach((enemy) => {
        this.world.thrownObjects.forEach((bottle) => {
            if (bottle.isColliding(enemy) && enemy instanceof Chicken && !enemy.isDead()) {
                this.world.chickenHit(bottle, enemy)
            }else if (bottle.isColliding(enemy) && enemy instanceof Endboss && !enemy.isDead() && !enemy.isHurt()){
                this.world.endbossHit(bottle, enemy)
            }
        })
    })
}


/**
 * @description Checks for collisions between the character and bottles, updating the collected bottles and status bar accordingly.
 * @memberof World
 */
checkBottleCollision(){
        this.world.level.bottles.forEach((bottle) => {
            if (this.world.character.isColliding(bottle)) {
                let removedBottle = this.world.level.bottles.splice(this.world.level.bottles.indexOf(bottle), 1)[0];
                this.world.collectedBottles.push(removedBottle);
                this.world.bottlesbar.setPercentage(this.world.collectedBottles.length * 10, this.world.bottlesbar.BOTTLE_IMAGES)
                this.world.audio.bottleSound.currentTime = 0;
                this.world.audio.bottleSound.play();
            }
        })
}


/**
 * @description Checks for collisions between the character and coins, updating the collected coins and status bar accordingly.
 * @memberof World
 */
checkCoinCollision(){
    this.world.level.coins.forEach((coin) => {
        if (this.world.character.isColliding(coin)){
            let removedCoin = this.world.level.coins.splice(this.world.level.coins.indexOf(coin), 1)[0];
            this.world.collectedCoins.push(removedCoin);
            this.world.coinbar.setPercentage(this.world.collectedCoins.length * 10, this.world.coinbar.COIN_IMAGES);
            this.world.audio.coinSound.currentTime = 0;
            this.world.audio.coinSound.play();
        }
    })
}
}
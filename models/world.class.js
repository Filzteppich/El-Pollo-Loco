/**
 * @class World
 * 
 */
class World {
canvas;
ctx;
keyboard;
camera_x;
moveLeftAnimation;
level;
endgameInterval;
character = new Character();
drawableObject = new DrawableObject();
healthbar = new StatusBar('health', 10, 10);
coinbar = new StatusBar('coin', 220, 10);
bottlesbar = new StatusBar('bottle', 430, 10)
enemyStatusbar = new StatusBar('endboss', 430, 50)
audio = new Sound();
enemyStatusbarVisible = false;
throwCooldown =  false;
endscreen = null;
collision = new Collision(this);


collectedBottles = [];
collectedCoins = [];
thrownObjects=[];


/**
 * Creates an instance of World.
 * @param {*} canvas the canvas element
 * @param {*} keyboard the keyboard object
 * @memberof World
 */
constructor(canvas, keyboard){
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    initLevel()
    this.level = level1;
    this.draw();
    this.setWorld();
    this.run();
    this.bottlesbar.setPercentage(this.collectedBottles.length * 10, this.bottlesbar.BOTTLE_IMAGES)
    this.coinbar.setPercentage(this.collectedCoins.length * 10, this.coinbar.COIN_IMAGES)

}


/**
 * @description Sets the world for the character to enable interaction between them.
 * @memberof World
 */
setWorld(){
    this.character.world = this;
}


/**
 * @description Starts the main game loop, checking for various game events and updating the game state.
 * @memberof World
 */
run(){
    setStoppableInterval(() => this.collision.jumpOnEnemy(), 10);
    setStoppableInterval(() => this.collision.checkCollisions(), 200);
    setStoppableInterval(() => this.collision.checkEnemyAttack(), 100);
    setStoppableInterval(() => this.collision.checkBottleCollision(), 100);
    setStoppableInterval(() => this.collision.checkCoinCollision(), 100);
    setStoppableInterval(() => this.checkThrowObjects(), 100);
    setStoppableInterval(() => this.EndbossAttack(), 10);
    this.endgameInterval = setStoppableInterval(() => this.checkEndgame(), 500);
}


/**
 * @description Handles the endboss attack logic, triggering the endboss entry when the character reaches a certain position.
 * @memberof World
 */
EndbossAttack(){
    if (this.character.x > 3200) {
            this.level.enemies.forEach(enemy => {
                if (enemy instanceof Endboss && !enemy.isDead()) {
                    this.endbossEntry(enemy);
                }else if(enemy instanceof Endboss && enemy.isDead()){
                    if (enemy.moveInterval) {
                        clearInterval(enemy.moveInterval);
                        enemy.moveInterval = null;
                    }
                }
            });
            this.enemyStatusbarVisible = true;
        }
    }


/**
 * @description Handles the entry of the endboss, starting its movement and associated sounds.
 * @param {*} enemy the endboss enemy instance
 * @memberof World
 */
endbossEntry(enemy){
    if (!enemy.moveInterval) {
        enemy.movingLeft(4.5);
        this.audio.themeSong.pause();
        this.audio.finalBossTheme.play();
        this.audio.endbossSound.play();
        this.audio.endbossSound.loop = true;
    }
        enemy.checkIfDead();
    }


/**
 * @description Checks the endgame conditions and displays the appropriate end screen.
 * @memberof World
 */
checkEndgame(){
    if (gameFinished === true && isGameRunning === true){
        this.showWinScreen();
    }else if(gameLose === true){
        this.showLoseScreen();
    }
}


/**
 * @description Displays the win screen and stops game intervals.
 * @memberof World
 */
showWinScreen(){
    setTimeout(() => {
    this.endscreen = new Endscreen('win');   
    setTimeout(() => stopGameIntervals(), 1500);
    setTimeout(() => endgame('win'), 2000);
    this.audio.winSound.play();
    }, 500);
    clearInterval(this.endgameInterval);
    this.endgameInterval = null;
}


/**
 * @description Displays the lose screen and stops game intervals.
 * @memberof World
 */
showLoseScreen(){
    setTimeout(() => {
    this.endscreen = new Endscreen('lose');
    stopGame();
    this.audio.loseSound.play();
    endgame('lose');
    }, 1500);
    clearInterval(this.endgameInterval);
    this.endgameInterval = null;
}


/**
 * @description Checks if the player is attempting to throw an object and handles the throwing logic.
 * @memberof World
 */
checkThrowObjects(){
    if ((this.keyboard.D) && this.collectedBottles.length > 0 && !this.throwCooldown &&!this.character.isDead() && isGameRunning) {
        this.throwBottle();
        this.bottlesbar.setPercentage(this.collectedBottles.length * 10, this.bottlesbar.BOTTLE_IMAGES)
        this.character.lastMoveTime = Date.now();
        setTimeout(() => {
            this.throwCooldown = false;
        }, 1000)
    }
}


/**
 * @description Handles the throwing of a bottle object.
 * @memberof World
 */
throwBottle(){
    let bottle = this.collectedBottles.splice(0, 1)[0];
    bottle.otherDirection = this.character.otherDirection;
    if (bottle.otherDirection) {
        bottle.throw(this.character.x - 100 + this.character.width / 2, this.character.y + this.character.height / 2)
        this.throwCooldown = true;
        this.audio.throwSound.play()
    }else{
        bottle.throw(this.character.x + this.character.width / 2, this.character.y + this.character.height / 2)
        this.throwCooldown = true;
        this.audio.throwSound.play()
    }
    this.thrownObjects.push(bottle);
}


/**
 * @description Handles the attack logic when a bottle hits a chicken enemy.
 * @param {*} bottle the bottle object
 * @param {*} enemy the chicken enemy object
 * @memberof World
 */
chickenHit(bottle, enemy){
    enemy.hit(100);
    this.bottleSplash(bottle);
    enemy.checkIfDead()
    this.audio.splashSound.currentTime = 0;
    this.audio.splashSound.play();
    this.audio.chickenHurtSound.currentTime = 0;
    this.audio.chickenHurtSound.play();
}


/**
 * @description Handles the attack logic when a bottle hits an endboss enemy.
 * @param {*} bottle the bottle object
 * @param {*} enemy the endboss enemy object
 * @memberof World
 */
endbossHit(bottle, enemy){
    enemy.hit(20);
    this.bottleSplash(bottle);
    this.enemyStatusbar.setPercentage(enemy.characterHealth, this.enemyStatusbar.ENDBOSS_STATUSBAR_IMAGES)
    enemy.checkIfDead(this.audio.finalBossTheme, this.audio.themeSong, this.audio.endbossSound)
    this.audio.splashSound.currentTime = 0;
    this.audio.splashSound.play();
    this.audio.endbossHurtSound.currentTime = 0;
    this.audio.endbossHurtSound.play();
}


/**
 * @description Handles the bottle splash effect.
 * @param {*} bottle the bottle object
 * @memberof World
 */
bottleSplash(bottle){
    this.clearBottleIntervals(bottle);
    bottle.playAnimationOnce(bottle.SPLASHING_BOTTLE_IMAGES);

    setTimeout(() => {
        this.thrownObjects.splice(this.thrownObjects.indexOf(bottle), 1);
    }, 500);
}


/**
 * @description Clears the bottle's intervals.
 * @param {*} bottle the bottle object
 * @memberof World
 */
clearBottleIntervals(bottle){
    if (bottle.gravityInterval){
        clearInterval(bottle.gravityInterval);
        bottle.gravityInterval = null;
    }
    if (bottle.directionInterval && bottle.rotationInterval) {
        clearInterval(bottle.directionInterval);
        clearInterval(bottle.rotationInterval);
        bottle.directionInterval = null;
    }
}


/**
 * @description Draws the entire game world, including background, characters, enemies, and UI elements.
 * @memberof World
 */
draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObject)
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.thrownObjects);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.healthbar);
    this.addToMap(this.coinbar);
    this.addToMap(this.bottlesbar);

    if (this.endscreen) {
        this.addToMap(this.endscreen);
    }

    if (this.enemyStatusbarVisible) {
        this.addToMap(this.enemyStatusbar)
    }

    let self = this;
    requestAnimationFrame(() => {self.draw()})
}


/**
 * @description Adds an array of objects to the map by drawing each one.
 * @param {*} object
 * @memberof World
 */
addObjectsToMap(object){
    object.forEach(obj => {this.addToMap(obj)});
}


/**
 * @description Adds a single object to the map, handling direction and flipping if necessary.
 * @param {*} object
 * @memberof World
 */
addToMap(object){
    if (object.otherDirection) {
        this.flipImage(object)
    }
    this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
    if (object.otherDirection) {
        this.flipImageBack(object)
    }
}


/**
 * @description Flips the image of an object horizontally.
 * @param {*} object the object to flip
 * @memberof World
 */
flipImage(object){
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = -object.x;
}


/**
 * @description Flips the image of an object back to its original orientation.
 * @param {*} object the object to flip back
 * @memberof World
 */
flipImageBack(object){
    object.x = -object.x;
    this.ctx.restore();
}


/**
 * @description Draws a frame border around the object for debugging purposes.
 * @param {*} object the object to draw the border around
 * @memberof World
 */
drawFrameBorder(object){
    if (object instanceof Character || object instanceof Chicken || object instanceof Endboss || object instanceof ThrowableObject || object instanceof CollectibleObject) {
        this.ctx.beginPath();
        this.ctx.lineWidth = "5";
        this.ctx.strokeStyle = "navy";
        this.ctx.rect(object.x, object.y, object.width, object.height);
        this.ctx.stroke(); 
    }
}


/**
 * @description Draws a red border around the offset area of the object for debugging purposes.
 * @param {*} object the object to draw the border around
 * @memberof World
 */
drawOffsetFrameBorder(object){
    if (object instanceof Character || object instanceof Chicken || object instanceof Endboss || object instanceof ThrowableObject || object instanceof CollectibleObject) {
        this.ctx.beginPath();
        this.ctx.lineWidth = "5";
        this.ctx.strokeStyle = "red";
        this.ctx.rect(
            object.x + object.offset.left,
            object.y + object.offset.top,
            object.width - object.offset.right - object.offset.left,
            object.height - object.offset.bottom - object.offset.top
        );
        this.ctx.stroke(); 
    }
}
}
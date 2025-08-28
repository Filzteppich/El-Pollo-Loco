/**
 * @class MovableObject
 * @extends {DrawableObject}
 */
class MovableObject extends DrawableObject {
    
    speedY = 0;
    acceleration = 2;
    characterHealth = 100;
    chickenHealth = 5;
    lastHit = 0;
    gravityInterval;
    gameFinished = false;
    
    clearIntervalAfterDeath = [];
    
    
/**
 * @description Checks if this object is colliding with another object.
 * @param {*} object the object to check for collision
 * @returns {*} true if the objects are colliding, false otherwise
 * @memberof MovableObject
 */
isColliding(object) {
    return (
        this.x + this.width - this.offset.right > object.x + object.offset.left &&
        this.x + this.offset.left < object.x + object.width - object.offset.right &&
        this.y + this.height - this.offset.bottom > object.y + object.offset.top &&
        this.y + this.offset.top < object.y + object.height - object.offset.bottom
    );
}


/**
 * @description Checks if this object is colliding with another object from the top, hurts enemy if true.
 * @param {*} object the object to check for collision
 * @returns {*} true if the objects are colliding from the top, false otherwise
 * @memberof MovableObject
 */
isCollidingFromTop(object){
    return (
        this.y + this.height - this.offset.bottom <= object.y + object.offset.top + 90 && 
        this.y + this.height - this.offset.bottom >= object.y + object.offset.top &&
        this.x + this.width - this.offset.right > object.x + object.offset.left &&
        this.x + this.offset.left < object.x + object.width - object.offset.right &&
        this.speedY < 0 
    );
}
    
    
/**
 * @description Applies gravity to the object, making it fall down if it is above the ground.
 * @memberof MovableObject
 */
applyGravity(){
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }else{
                this.speedY = 0;
                this.y = 135; 
            }
        }, 1000 / 60)
        allIntervals.push(this.gravityInterval);
    }
    

/**
 * @description Checks if the object is above the ground.
 * @returns {*} true if the object is above the ground, false otherwise
 * @memberof MovableObject
 */
isAboveGround(){
if (this instanceof ThrowableObject || this instanceof Endboss) {
    return true;
}else{
    return this.y < 135;
}}
        

/**
 * @description Plays the animation for the object.
 * @param {*} images the array of images to use for the animation
 * @memberof MovableObject
 */
playAnimation(images){
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img  = this.imageCache[path];
    this.currentImage++;
}


/**
 * @description Plays the animation for the object once.
 * @param {*} array the array of images to use for the animation
 * @memberof MovableObject
 */
playAnimationOnce(array){
    let i = 0;
    let onceInterval = setInterval(() => {
        this.img = this.imageCache[array[i]];
        i++;
        if (i >= array.length) {
            clearInterval(onceInterval);
            this.img = this.imageCache[array[array.length - 1]]
        }
    }, 200);
    allIntervals.push(onceInterval)
}


/**
 * @description Makes the object jump.
 * @memberof MovableObject
 */
jump(){
    this.speedY = 25;
}


/**
 * @description Moves the Character to the left.
 * @memberof MovableObject
 */
moveLeft(){
    this.x -= this.speed ;
    this.otherDirection = true;
}


/**
 * @description Moves the Character to the right.
 * @memberof MovableObject
 */
moveRight(){
    this.x += this.speed ;
    this.otherDirection = false;
}
        

/**
 * @description Reduces the objects health by the specified amount.
 * @param {*} amount the amount to reduce the health by
 * @memberof MovableObject
 */
hit(amount){
    if (this.characterHealth <= 0) {
        this.characterHealth = 0;
    }else{
        this.characterHealth -= amount;
        this.lastHit = new Date().getTime();
    }
}
        
        
        
/**
 * @description Checks if the object is currently hurt.
 * @returns {*} true if the object is hurt, false otherwise
 * @memberof MovableObject
 */
isHurt(){
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
}


/**
 * @description Checks the health if the object is dead.
 * @returns {*} true if the object is dead, false otherwise
 * @memberof MovableObject
 */
isDead(){
    return this.characterHealth == 0;
}


/**
 * @description Moves the Character to the left.
 * @param {*} speed
 * @memberof MovableObject
 */
movingLeft(speed){
    this.moveInterval = setInterval(() => {
        this.x -= speed;
    }, 1000 / 60)
    let i = 0;
    this.clearIntervalAfterDeath.push(this.moveInterval);
    allIntervals.push(this.moveInterval);
}


/**
 * @description Stops all intervals after the object is dead.
 * @memberof MovableObject
 */
stopGameIntervals(){
    this.clearIntervalAfterDeath.forEach((interval) => {
        clearInterval(interval);
    })
}
        
        
        
}
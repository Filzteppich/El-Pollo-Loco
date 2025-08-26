/**
 * @class ThrowableObject
 * @extends {MovableObject}
 */
class ThrowableObject extends MovableObject {


ROTATING_BOTTLE_IMAGES = [
    'imgs/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'imgs/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'imgs/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'imgs/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
]

SPLASHING_BOTTLE_IMAGES = [
    'imgs/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'imgs/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'imgs/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'imgs/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'imgs/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'imgs/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
]

speedX;
speedY;
directionInterval;
rotationInterval;

offset = {
    top: 10,
    bottom: 10,
    left: 30,
    right: 30,
}

    constructor(x, y, img){
        super();
        this.loadImages(this.SPLASHING_BOTTLE_IMAGES);
        this.loadImages(this.ROTATING_BOTTLE_IMAGES);
        this.loadImage(img);
        this.x = x;
        this.y = y;
        this.width =  100;
        this.height = 100;
    }


/**
 * @description Throws the object in the specified direction.
 * @param {*} x the starting x position of the object
 * @param {*} y the starting y position of the object
 * @memberof ThrowableObject
 */
throw(x, y){
            this.x = x;
            this.y = y;
            this.speedY = 20
            this.applyGravity();
            this.rotationInterval = setInterval(() => {
                this.playAnimation(this.ROTATING_BOTTLE_IMAGES)
            }, 50);
            this.checkThrowDirection();
            allIntervals.push(this.rotationInterval);
            allIntervals.push(this.directionInterval);
    }


/**
 * @description Checks the throw direction and updates the position accordingly.
 * @memberof ThrowableObject
 */
checkThrowDirection(){
                    this.directionInterval = setInterval(() => {
                if (!this.otherDirection) {
                    this.x += 20;
                }else if (this.otherDirection){
                    this.x -= 20;
                }
            }, 25);

    }
    
}
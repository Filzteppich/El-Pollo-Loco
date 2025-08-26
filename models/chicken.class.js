/**
 * @class Chicken
 * @extends {MovableObject}
 */
class Chicken  extends MovableObject {

    x = 600 + Math.random() * 3200;
    y = 330;
    height = 100;
    width = 100;
    animationInterval;
    moveInterval;
    soundInterval;
    

    chickensound = new Audio('audio/chicken_normal_sound.wav')

        offset = {
        top : 10,
        bottom : 10,
        left : 5,
        right : 15,
    }

    IMAGES_WALK =[
        'imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'imgs/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'imgs/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    constructor() {
        super()
        this.loadImage('imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImage('imgs/3_enemies_chicken/chicken_normal/2_dead/dead.png')
        this.loadImages(this.IMAGES_WALK)
        this.animate(0.5 + Math.random() * 1.0);
        this.applyGravity();

        this.soundInterval = setInterval(() => {
            this.playChickenSound();
        }, 3000 + Math.random() * 3000);
        registerSounds(this.chickenSound)
        allIntervals.push(this.soundInterval);        
    }
/**
 * @description Animates the chicken by moving it left and playing the walking animation.
 * @param {*} speed speed of the chicken depending on the enemy type
 * @memberof Chicken
 */
animate(speed){
        if (!this.isDead()) {
            this.movingLeft(speed);
            this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALK)
            }, 300)
            this.clearIntervalAfterDeath.push(this.animationInterval)
            allIntervals.push(this.animationInterval)
        }
    }

/**
 * @description Checks if the chicken is dead and handles the death animation and sound.
 * @memberof Chicken
 */
checkIfDead(){
            if (this.isDead()) {
                if (this instanceof SmallChicken) {
                    this.img.src = 'imgs/3_enemies_chicken/chicken_small/2_dead/dead.png'
                }
                else{
                    this.img.src = 'imgs/3_enemies_chicken/chicken_normal/2_dead/dead.png'
                }
                this.stopGameIntervals();
                clearInterval(this.soundInterval)
            }
    }
/**
 * @description Plays the chicken sound at a set volume, considering the mute setting.
 * @memberof Chicken
 */
playChickenSound(){
        this.chickensound.volume = 0.4;
        this.chickensound.play();
        if (mute) {
            this.chickensound.volume = 0;
        }
    }

}
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

    constructor(x){
        super();
        this.loadImages(this.SPLASHING_BOTTLE_IMAGES);
        this.loadImages(this.ROTATING_BOTTLE_IMAGES);
        this.loadImage('imgs/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = 325;
        this.width =  100;
        this.height = 100;
         
    }

    throw(x, y){
     
            this.x = x;
            this.y = y;
            this.speedY = 20
            this.applyGravity();

            this.rotationInterval = setInterval(() => {
                this.playAnimation(this.ROTATING_BOTTLE_IMAGES)
            }, 50);

            this.directionInterval = setInterval(() => {
                if (!this.otherDirection) {
                    this.x += 20;
                }else if (this.otherDirection){
                    this.x -= 20;
                }
                    
            }, 25);
            console.log('thrown');
            
      
    }
    
}
class Chicken  extends MovableObject {

    x = 200 + Math.random() * 2220;
    y = 330;
    height = 100;
    width = 100;
    animationInterval;
    moveInterval;

        offset = {
        top : 10,
        bottom : 10,
        left : 5,
        right : 15,
    }

    IMAGES_WALK =[
        '../imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../imgs/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../imgs/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    constructor() {
        super().loadImage('../imgs/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImage('imgs/3_enemies_chicken/chicken_normal/2_dead/dead.png')
        this.loadImages(this.IMAGES_WALK)
        this.animate();
        
        
        
        this.speed = 0.15 + Math.random() * 0.25;
        
    }

    animate(){
        if (!this.isDead()) {
            this.movingLeft(0.25);
            this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALK)
        }, 300)
        }

    }

    checkIfDead(){
            if (this.isDead()) {
                this.img.src = 'imgs/3_enemies_chicken/chicken_normal/2_dead/dead.png'
                if (this.animationInterval) {
                    clearInterval(this.animationInterval);
                    this.animationInterval = null;
                }
                if (this.moveInterval) {
                    clearInterval(this.moveInterval);
                    this.moveInterval = null;
                }
            }
    }


}
class Character extends MovableObject {

    x = 80
    y =  130;    
    height = 300;
    width = 120;
    img;
    world;
    speed = 30;
    otherDirection = false;
    characterStatus;

    offset = {
        top : 130,
        bottom : 15,
        right : 15,
        left : 15,
    }

    IMAGES_IDLE = [
        'imgs/2_character_pepe/1_idle/idle/I-1.png',
        'imgs/2_character_pepe/1_idle/idle/I-2.png',
        'imgs/2_character_pepe/1_idle/idle/I-3.png',
        'imgs/2_character_pepe/1_idle/idle/I-4.png',
        'imgs/2_character_pepe/1_idle/idle/I-5.png',
        'imgs/2_character_pepe/1_idle/idle/I-6.png',
        'imgs/2_character_pepe/1_idle/idle/I-7.png',
        'imgs/2_character_pepe/1_idle/idle/I-8.png',
        'imgs/2_character_pepe/1_idle/idle/I-9.png',
        'imgs/2_character_pepe/1_idle/idle/I-10.png',
        ];

    IMAGES_WALK = [
        'imgs/2_character_pepe/2_walk/W-21.png',
        'imgs/2_character_pepe/2_walk/W-22.png',
        'imgs/2_character_pepe/2_walk/W-23.png',
        'imgs/2_character_pepe/2_walk/W-24.png',
        'imgs/2_character_pepe/2_walk/W-25.png',
        'imgs/2_character_pepe/2_walk/W-26.png'
    ]

    IMAGES_JUMPING = [
        'imgs/2_character_pepe/3_jump/J-31.png',
        'imgs/2_character_pepe/3_jump/J-32.png',
        'imgs/2_character_pepe/3_jump/J-33.png',
        'imgs/2_character_pepe/3_jump/J-34.png',
        'imgs/2_character_pepe/3_jump/J-35.png',
        'imgs/2_character_pepe/3_jump/J-36.png',
        'imgs/2_character_pepe/3_jump/J-37.png',
        'imgs/2_character_pepe/3_jump/J-38.png',
        'imgs/2_character_pepe/3_jump/J-39.png',
    ]

    IMAGES_DEAD = [
        'imgs/2_character_pepe/5_dead/D-51.png',
        'imgs/2_character_pepe/5_dead/D-52.png',
        'imgs/2_character_pepe/5_dead/D-53.png',
        'imgs/2_character_pepe/5_dead/D-54.png',
        'imgs/2_character_pepe/5_dead/D-55.png',
        'imgs/2_character_pepe/5_dead/D-56.png',
        'imgs/2_character_pepe/5_dead/D-57.png',
    ]

    IMAGES_HURT = [
        'imgs/2_character_pepe/4_hurt/H-41.png',
        'imgs/2_character_pepe/4_hurt/H-42.png',
        'imgs/2_character_pepe/4_hurt/H-43.png'
    ]




    constructor(name){
        super().loadImage('../imgs/2_character_pepe/1_idle/idle/I-1.png')
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.name = name;
        this.animate();
        this.applyGravity();
        this.characterMovement();

    }



    animate(){
        this.deathAnimationPlayed = false;
        this.characterStatus = setInterval(() => {
            if (this.isDead() && !this.deathAnimationPlayed) {
                this.playAnimationOnce(this.IMAGES_DEAD);
                this.deathAnimationPlayed = true;
                this.stopGameIntervals();
                return;
            }

            if (!this.isDead()) {
                if (this.isHurt() ) {
                    this.playAnimation(this.IMAGES_HURT);
                }
                else{
                    this.playAnimation(this.IMAGES_IDLE);
                }
                


            }
        }, 200);

        

        setInterval(() => {
            if (!this.isDead() && this.isAboveGround()){
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, 1000 / 10);

    

        //WALK RIGHT
        setInterval(() => {
            if (!this.isDead() && !this.isAboveGround() && this.world.keyboard.RIGHT || !this.isDead() && !this.isAboveGround() && this.world.keyboard.LEFT ) {
                this.playAnimation(this.IMAGES_WALK);
            }
        }, 50)
    }

    characterMovement(){
        setInterval(() => {
        //WALK LEFT
            if (!this.isDead() && this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft()
            }
                    
        //WALK RIGHT
            if (!this.isDead() && this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight()
            }

            this.world.camera_x  = -this.x + 80;

            if (!this.isDead() && !this.isAboveGround() && (this.world.keyboard.SPACE || this.world.keyboard.UP)) {
                this.jump();
            }
        }, 50)
    }
}




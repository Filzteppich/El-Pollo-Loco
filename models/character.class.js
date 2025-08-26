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
    lastMoveTime = Date.now();

    jumpSound = new Audio('audio/jump_sound.mp3');
    longIdleSound = new Audio('audio/snoring_sound.wav');

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

    IMAGES_LONG_IDLE = [
        'imgs/2_character_pepe/1_idle/long_idle/I-11.png',
        'imgs/2_character_pepe/1_idle/long_idle/I-12.png',
        'imgs/2_character_pepe/1_idle/long_idle/I-13.png',
        'imgs/2_character_pepe/1_idle/long_idle/I-14.png',
        'imgs/2_character_pepe/1_idle/long_idle/I-15.png',
        'imgs/2_character_pepe/1_idle/long_idle/I-16.png',
        'imgs/2_character_pepe/1_idle/long_idle/I-17.png',
        'imgs/2_character_pepe/1_idle/long_idle/I-18.png',
        'imgs/2_character_pepe/1_idle/long_idle/I-19.png',
        'imgs/2_character_pepe/1_idle/long_idle/I-20.png',
    ]

    constructor(name){
        super()
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_IDLE);
        this.name = name;
        this.setAudioVolume();
        this.animate();
        this.applyGravity();
        this.characterMovement();
    }

/**
 * @description Sets the audio volume for jump and long idle sounds.
 * @memberof Character
 */
setAudioVolume(){
        this.jumpSound.volume = 0.3;
        this.longIdleSound.volume = 0.5;
    }

/**
 * @description Handles the animation of the character including death, jump, walk, and idle animations.
 * @memberof Character
 */
animate(){
        this.deathAnimationPlayed = false;
        setStoppableInterval(() => {
            this.deathAnimation();
            this.checkCharacterStatus();
        }, 200);
        setStoppableInterval(() => this.jumpAnimation(), 1000 / 10);
        setStoppableInterval(() => this.walkAnimation(), 50)
    }

/**
 * @description Handles the jump animation of the character.
 * @memberof Character
 */
jumpAnimation(){
        if (!this.isDead() && this.isAboveGround()){
        this.playAnimation(this.IMAGES_JUMPING);
        }
    }

/**
 * @description Handles the walk animation of the character.
 * @memberof Character
 */
walkAnimation(){
        if (!this.isDead() && !this.isAboveGround() && this.world.keyboard.RIGHT && !isPaused || !this.isDead() && !this.isAboveGround() && this.world.keyboard.LEFT && !isPaused) {
        this.playAnimation(this.IMAGES_WALK);
        }
    }

/**
 * @description Checks the status of the character and updates animations accordingly.
 * @memberof Character
 */
checkCharacterStatus(){
        const idleTime = Date.now() - this.lastMoveTime;
        if (!this.isDead() ) {
                if (this.isHurt() ) {
                    this.playAnimation(this.IMAGES_HURT);
                    this.longIdleSound.pause()
                }else if(idleTime > 5000 && !gameFinished){
                    this.playAnimation(this.IMAGES_LONG_IDLE)
                    this.longIdleSound.play();
                }else{
                    this.playAnimation(this.IMAGES_IDLE);
                    this.longIdleSound.pause()
                }
            }
    }

/**
 * @description Handles the death animation of the character.
 * @memberof Character
 */
deathAnimation(){
            if (this.isDead() && !this.deathAnimationPlayed) {
            this.playAnimationOnce(this.IMAGES_DEAD);
            this.deathAnimationPlayed = true;
            gameLose = true;
        }
    }

/**
 * @description Handles the character movement based on keyboard input.
 * @memberof Character
 */
characterMovement(){
        setStoppableInterval(() => {
            this.characterMoveLeft();
            this.characterMoveRight();
            this.characterJump();
            this.world.camera_x  = -this.x + 150;
        }, 50);
    }

/**
 * @description Moves the character to the left if the left key is pressed.
 * @memberof Character
 */
characterMoveLeft(){
        if (!this.isDead() && this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft()
        this.lastMoveTime = Date.now();
        }
    }

/**
 * @description Moves the character to the right if the right key is pressed.
 * @memberof Character
 */
characterMoveRight(){
        if (!this.isDead() && this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight()
        this.lastMoveTime = Date.now();
        }
    }

/**
 * @description Handles the jump action of the character.
 * @memberof Character
 */
characterJump(){
        if (!this.isDead() && !this.isAboveGround() && (this.world.keyboard.SPACE || this.world.keyboard.UP)) {
        this.jumpSound.currentTime = 0;
        this.jumpSound.play();
        this.jump();
        this.lastMoveTime = Date.now();
        }
    }
}




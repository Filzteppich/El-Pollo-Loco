class Endboss extends MovableObject {
    x = 3700;
    y = 50;
    height = 400;
    width = 400;
    speed = 0.25;
   
    

        offset = {
        top : 70,
        bottom : 20,
        left : 20,
        right : 50,
    }


    IMAGES_ATTACK = [
        'imgs/4_enemie_boss_chicken/3_attack/G13.png',
        'imgs/4_enemie_boss_chicken/3_attack/G14.png',
        'imgs/4_enemie_boss_chicken/3_attack/G15.png',
        'imgs/4_enemie_boss_chicken/3_attack/G16.png',
        'imgs/4_enemie_boss_chicken/3_attack/G17.png',
        'imgs/4_enemie_boss_chicken/3_attack/G18.png',
        'imgs/4_enemie_boss_chicken/3_attack/G19.png',
        'imgs/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    IMAGES_ALERT = [
        'imgs/4_enemie_boss_chicken/2_alert/G5.png',
        'imgs/4_enemie_boss_chicken/2_alert/G6.png',
        'imgs/4_enemie_boss_chicken/2_alert/G7.png',
        'imgs/4_enemie_boss_chicken/2_alert/G8.png',
        'imgs/4_enemie_boss_chicken/2_alert/G9.png',
        'imgs/4_enemie_boss_chicken/2_alert/G10.png',
        'imgs/4_enemie_boss_chicken/2_alert/G11.png',
        'imgs/4_enemie_boss_chicken/2_alert/G12.png',
    ]

    IMAGES_HURT = [
        'imgs/4_enemie_boss_chicken/4_hurt/G21.png',
        'imgs/4_enemie_boss_chicken/4_hurt/G22.png',
        'imgs/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    IMAGES_DEAD = [
        'imgs/4_enemie_boss_chicken/5_dead/G24.png',
        'imgs/4_enemie_boss_chicken/5_dead/G25.png',
        'imgs/4_enemie_boss_chicken/5_dead/G26.png',
    ]


    constructor() {
        super()
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ALERT);
        this.animate();
        this.speed = 0.15 + Math.random() * 0.25;
        this.checkEndgame();
    }

    animate(){
        this.animateInterval = setInterval(() => {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT)
        }else{
        this.playAnimation(this.IMAGES_ATTACK)
        }}, 200)
        allIntervals.push(this.animateInterval)
    }


    checkEndgame(){
        setStoppableInterval(() => {
            console.log(gameFinished + ' game is over');
            
        }, 500);
    }

    checkIfDead(enemyTheme, gameTheme, endbossSound){
        if (this.isDead()) {
            if (this.animateInterval) {
                clearInterval(this.animateInterval)
                this.animateInterval = null;
            }

            let i = 0;
            let interval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_DEAD[i]];
            i++;
            if (i >= this.IMAGES_DEAD.length) {
                this.stopGameIntervals();
                this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]]
                this.playDeathAnimation(enemyTheme, gameTheme, endbossSound);
            }
            }, 200);
            this.clearIntervalAfterDeath.push(interval);
            allIntervals.push(interval);
            gameFinished = true;
            gameWin = true;
            console.log('game is over ' + gameFinished);
        }
    }

playDeathAnimation(enemyTheme, gameTheme, endbossSound){
                    setTimeout(() => {setTimeout(() => {
                    enemyTheme.pause();
                    gameTheme.currentTime = 0;
                    gameTheme.play();
                    endbossSound.pause();

                }, 500);
                    this.applyGravity();
                    this.jump()
             
                    
                }, 700);
}



}
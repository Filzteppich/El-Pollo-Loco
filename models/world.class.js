class World {

canvas;
ctx;
keyboard;
camera_x;
moveLeftAnimation;
level;
endgameInterval;
character = new Character("Pepe", this.jumpSound);
drawableObject = new DrawableObject();
healthbar = new StatusBar('health', 10, 10);
coinbar = new StatusBar('coin', 220, 10);
bottlesbar = new StatusBar('bottle', 430, 10)
enemyStatusbar = new StatusBar('endboss', 430, 50)
enemyStatusbarVisible = false;
throwCooldown =  false;


endscreen = null;

 
 bounceSound = new Audio('audio/swoop_bound.wav');
 throwSound = new Audio('audio/throw.wav');
 splashSound = new Audio('audio/splash_sound.mp3');
 chickenHurtSound = new Audio('audio/chicken_hurt_sound_.wav');
 characterHurtSound = new Audio('audio/character_hurt.wav');
 finalBossTheme = new Audio('audio/final_boss.wav');
 coinSound = new Audio('audio/coin_sound.mp3');
 bottleSound = new Audio('audio/bottle_collect.wav');
 themeSong = new Audio('audio/theme_song.wav');
 endbossSound = new Audio('audio/endboss_sound.wav');
 endbossHurtSound = new Audio('audio/endboss_hurt.wav');
 loseSound = new Audio('audio/lose_sound.mp3');





collectedBottles = [];
collectedCoins = [];
thrownObjects=[];




    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setAudioVolume();
        initLevel()
        this.level = level1;
        this.draw();
        this.setWorld();
        this.run();
        this.bottlesbar.setPercentage(this.collectedBottles.length * 10, this.bottlesbar.BOTTLE_IMAGES)
        this.coinbar.setPercentage(this.collectedCoins.length * 10, this.coinbar.COIN_IMAGES)
        this.playIntroSound();
        this.collectSounds();
        this.checkAudioBeforeStart();

    }

    
    
    collectSounds(){
    registerSounds(this.bounceSound);
    registerSounds(this.throwSound);
    registerSounds(this.splashSound);
    registerSounds(this.chickenHurtSound);
    registerSounds(this.characterHurtSound);
    registerSounds(this.finalBossTheme);
    registerSounds(this.coinSound);
    registerSounds(this.bottleSound);
    registerSounds(this.themeSong);
    registerSounds(this.endbossSound);
    registerSounds(this.endbossHurtSound);
    registerSounds(this.character.jumpSound);
    registerSounds(this.character.longIdleSound);
    registerSounds(this.loseSound);
    registerSounds(this.level.enemies.forEach((chicken) =>{
    registerSounds(chicken.chickensound);
    }))
}

checkAudioBeforeStart(){
    if (mute){
        allSounds.forEach((sound) => {
            sound.volume = 0;
        })
    }
}

setAudioVolume(){
    this.bounceSound.volume = 1.0;
    this.finalBossTheme.volume = 0.3;
    this.themeSong.volume = 0.2;
    this.endbossSound.volume = 0.2;
    this.endbossHurtSound.volume = 0.2;
    this.loseSound.volume = 0.6;
}


playIntroSound(){
    this.themeSong.play();
    this.themeSong.loop = true;
}


setWorld(){
    this.character.world = this;
}

run(){
    setStoppableInterval(() => this.jumpOnEnemy(), 10);
    setStoppableInterval(() => this.EndbossAttack(), 10);
    this.endgameInterval = setStoppableInterval(() => this.checkEndgame(), 500);

    setStoppableInterval(() => this.checkCollisions(), 200);
    
    setStoppableInterval(() => this.checkEnemyAttack(), 100);
    setStoppableInterval(() => this.checkBottleCollision(), 100);
    setStoppableInterval(() => this.checkCoinCollision(), 100);
    setStoppableInterval(() => this.checkThrowObjects(), 100);
}

    EndbossAttack(){
    if (this.character.x > 3200) {
            this.level.enemies.forEach(enemy => {
                if (enemy instanceof Endboss && !enemy.isDead()) {
                    if (!enemy.moveInterval) {
                        enemy.movingLeft(1.5);
                        this.themeSong.pause();
                        this.finalBossTheme.play();
                        this.endbossSound.play();
                        this.endbossSound.loop = true;
                    }
                        enemy.checkIfDead();
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

checkEndgame(){
    if (gameFinished === true && isGameRunning === true){
        setTimeout(() => {
            this.endscreen = new Endscreen('win');   
            setTimeout(() => stopGameIntervals(), 1500);
            setTimeout(() => endgame('win'), 2000);
        }, 500);
        clearInterval(this.endgameInterval);
        this.endgameInterval = null;
    }else if(gameLose === true){
        setTimeout(() => {
            this.endscreen = new Endscreen('lose');
            stopGame();
            this.loseSound.play();
            endgame('lose');
        }, 1500);
        clearInterval(this.endgameInterval);
        this.endgameInterval = null;
    }
}

checkThrowObjects(){
    if ((this.keyboard.D || this.keyboard.Numpad0) && this.collectedBottles.length > 0 && !this.throwCooldown &&!this.character.isDead() && isGameRunning) {
        let bottle = this.collectedBottles.splice(0, 1)[0];
        bottle.otherDirection = this.character.otherDirection;
        if (bottle.otherDirection) {
            bottle.throw(this.character.x - 100 + this.character.width / 2, this.character.y + this.character.height / 2)
            this.throwCooldown = true;
            this.throwSound.play()
            
        }else{
            bottle.throw(this.character.x + this.character.width / 2, this.character.y + this.character.height / 2)
            this.throwCooldown = true;
            this.throwSound.play()
        }
        this.thrownObjects.push(bottle);
        this.bottlesbar.setPercentage(this.collectedBottles.length * 10, this.bottlesbar.BOTTLE_IMAGES)
        this.character.lastMoveTime = Date.now();
        setTimeout(() => {
            this.throwCooldown = false;
        }, 1000)
    }
}


checkCollisions(){
    this.level.enemies.forEach((enemy) => {
    if(this.character.isColliding(enemy) && !this.character.isDead() && !this.character.isCollidingFromTop(enemy) && !enemy.isDead() && !isPaused && isGameRunning){
        this.character.hit(5);
        this.characterHurtSound.play();
        this.healthbar.setPercentage(this.character.characterHealth, this.healthbar.HEALTHBAR_IMAGES);
        }
    })
}

jumpOnEnemy(){
    this.level.enemies.forEach((enemy) => {
        if (this.character.isCollidingFromTop(enemy) && !enemy.isDead() && enemy instanceof Chicken) {
        this.character.jump();
        enemy.hit(100)
        enemy.checkIfDead();
        this.bounceSound.currentTime = 0
        this.bounceSound.play();
        }
    });
}

checkEnemyAttack(){
    this.level.enemies.forEach((enemy) => {
        this.thrownObjects.forEach((bottle) => {
            if (bottle.isColliding(enemy) && enemy instanceof Chicken && !enemy.isDead()) {
                enemy.hit(100);
                this.bottleSplash(bottle);
                enemy.checkIfDead()
                this.splashSound.currentTime = 0;
                this.playAudio(this.splashSound)
                this.playAudio(this.chickenHurtSound)
            }else if (bottle.isColliding(enemy) && enemy instanceof Endboss && !enemy.isDead() && !enemy.isHurt()){
                enemy.hit(25);
                this.bottleSplash(bottle);
                this.enemyStatusbar.setPercentage(enemy.characterHealth, this.enemyStatusbar.ENDBOSS_STATUSBAR_IMAGES)
                enemy.checkIfDead(this.finalBossTheme, this.themeSong, this.endbossSound)
                this.splashSound.currentTime = 0;
                this.splashSound.play();
                this.endbossHurtSound.currentTime = 0;
                this.endbossHurtSound.play();
            }
        })
    })
}

playAudio(audio){
    audio.currentTime = 0;
    audio.play();
}

bottleSplash(bottle){
    if (bottle.gravityInterval){
        clearInterval(bottle.gravityInterval);
        bottle.gravityInterval = null;
    }
    if (bottle.directionInterval && bottle.rotationInterval) {
        clearInterval(bottle.directionInterval);
        clearInterval(bottle.rotationInterval);
        bottle.directionInterval = null;
    }
    bottle.playAnimationOnce(bottle.SPLASHING_BOTTLE_IMAGES);

    setTimeout(() => {
        this.thrownObjects.splice(this.thrownObjects.indexOf(bottle), 1);
    }, 500);
        


    bottle.speedY = 0;
    bottle.speedX = 0;

}

checkBottleCollision(){
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                let removedBottle = this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1)[0];
                this.collectedBottles.push(removedBottle);
                this.bottlesbar.setPercentage(this.collectedBottles.length * 10, this.bottlesbar.BOTTLE_IMAGES)
                this.bottleSound.currentTime = 0;
                this.bottleSound.play();
            }
        })
}

checkCoinCollision(){
    this.level.coins.forEach((coin) => {
        if (this.character.isColliding(coin)){
            let removedCoin = this.level.coins.splice(this.level.coins.indexOf(coin), 1)[0];
            this.collectedCoins.push(removedCoin);
            this.coinbar.setPercentage(this.collectedCoins.length * 10, this.coinbar.COIN_IMAGES);
            this.coinSound.currentTime = 0;
            this.coinSound.play();
        }
    })
}




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


addObjectsToMap(object){
    object.forEach(obj => {this.addToMap(obj)});
}


addToMap(object){


    if (object.otherDirection) {
        this.flipImage(object)
    }

    //this.drawFrameBorder(object);
    //this.drawOffsetFrameBorder(object);

    this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        

    if (object.otherDirection) {
        this.flipImageBack(object)
    }
}


flipImage(object){
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = -object.x;
}


flipImageBack(object){
    object.x = -object.x;
    this.ctx.restore();
}


drawFrameBorder(object){
    if (object instanceof Character || object instanceof Chicken || object instanceof Endboss || object instanceof ThrowableObject || object instanceof CollectibleObject) {
        this.ctx.beginPath();
        this.ctx.lineWidth = "5";
        this.ctx.strokeStyle = "navy";
        this.ctx.rect(object.x, object.y, object.width, object.height);
        this.ctx.stroke(); 
    }
}


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
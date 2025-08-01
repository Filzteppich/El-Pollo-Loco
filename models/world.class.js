class World {

canvas;
ctx;
keyboard;
camera_x;
moveLeftAnimation;
character = new Character("Pepe");
level = level1;
drawableObject = new DrawableObject();
healthbar = new StatusBar('health', 10, 10);
coinbar = new StatusBar('coin', 250, 10);
bottlesbar = new StatusBar('bottle', 490, 10)
enemyStatusbar = new StatusBar('endboss', 490, 50)
enemyStatusbarVisible = false;
throwCooldown =  false;

collectedBottles = [];
collectedCoins = [];
thrownObjects=[];


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.bottlesbar.setPercentage(this.collectedBottles.length * 10, this.bottlesbar.BOTTLE_IMAGES)
        this.coinbar.setPercentage(this.collectedCoins.length * 10, this.coinbar.COIN_IMAGES)
    }



setWorld(){
    this.character.world = this;
}

run(){
    
    setInterval(() => {
        this.jumpOnEnemy();
    }, 10);
    
    setInterval(() => {
        this.checkCollisions();
        this.EndbossAttack();
    }, 200);
    
    setInterval(() => {
        this.checkEnemyAttack()
        this.checkBottleCollision()
        this.checkCoinCollision();
        this.checkThrowObjects();
    }, 100);
}

    EndbossAttack(){
    if (this.character.x > 3200) {
            this.level.enemies.forEach(enemy => {
                if (enemy instanceof Endboss && !enemy.isDead()) {
                    if (!enemy.moveInterval) {
                        enemy.movingLeft(1.5);
                        
                    }
                        enemy.checkIfDead();
                }else if(enemy instanceof Endboss && enemy.isDead()){
                    if (enemy.moveInterval) {
                        clearInterval(enemy.moveInterval);
                        this.moveInterval = null;
                    }
                        
                }
            }

            );
            this.enemyStatusbarVisible = true;
        }
    }



checkThrowObjects(){
    if ((this.keyboard.D || this.keyboard.Numpad0) && this.collectedBottles.length > 0 && !this.throwCooldown) {
        let bottle = this.collectedBottles.splice(0, 1)[0];
        bottle.otherDirection = this.character.otherDirection;
        if (bottle.otherDirection) {
            bottle.throw(this.character.x - 100 + this.character.width / 2, this.character.y + this.character.height / 2)
            this.throwCooldown = true;
        }else{
            bottle.throw(this.character.x + this.character.width / 2, this.character.y + this.character.height / 2)
            this.throwCooldown = true;
        }
        this.thrownObjects.push(bottle);
        this.bottlesbar.setPercentage(this.collectedBottles.length * 10, this.bottlesbar.BOTTLE_IMAGES)
        setTimeout(() => {
            this.throwCooldown = false;
        }, 1000)
    }
}


checkCollisions(){
    this.level.enemies.forEach((enemy) => {
    if(this.character.isColliding(enemy) && !this.character.isDead() && !enemy.isDead()){
        this.character.hit(5);
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
        }
    });
}

checkEnemyAttack(){
    this.level.enemies.forEach((enemy) => {
        this.thrownObjects.forEach((bottle) => {
            if (bottle.isColliding(enemy) && enemy instanceof Chicken && !enemy.isDead()) {
                enemy.hit(100);
                this.bottleSpash(bottle);
                enemy.checkIfDead()

            }else if (bottle.isColliding(enemy) && enemy instanceof Endboss && !enemy.isDead() && !enemy.isHurt()){
                enemy.hit(25);
                this.bottleSpash(bottle);
                this.enemyStatusbar.setPercentage(enemy.characterHealth, this.enemyStatusbar.ENDBOSS_STATUSBAR_IMAGES)
                enemy.checkIfDead()
            }
        })
    })
}

bottleSpash(bottle){
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
            }
        })
}

checkCoinCollision(){
    this.level.coins.forEach((coin) => {
        if (this.character.isColliding(coin)){
            let removedCoin = this.level.coins.splice(this.level.coins.indexOf(coin), 1)[0];
            this.collectedCoins.push(removedCoin);
            this.coinbar.setPercentage(this.collectedCoins.length * 10, this.coinbar.COIN_IMAGES);
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

    // this.drawFrameBorder(object);
    // this.drawOffsetFrameBorder(object);

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
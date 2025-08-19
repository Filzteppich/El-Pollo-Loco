class MovableObject extends DrawableObject {
    
    speedY = 0;
    acceleration = 2;
    characterHealth = 100;
    chickenHealth = 5;
    lastHit = 0;
    gravityInterval;
    gameFinished = false;


   
    
    clearIntervalAfterDeath = [];
    
    
    
    isColliding(object) {
        return (
            this.x + this.width - this.offset.right > object.x + object.offset.left &&
            this.x + this.offset.left < object.x + object.width - object.offset.right &&
            this.y + this.height - this.offset.bottom > object.y + object.offset.top &&
            this.y + this.offset.top < object.y + object.height - object.offset.bottom
        );
    }
    
    isCollidingFromTop(object){
        return (
            this.y + this.height - this.offset.bottom <= object.y + object.offset.top + 90 && // +10 als Toleranz
            this.y + this.height - this.offset.bottom >= object.y + object.offset.top &&
            this.x + this.width - this.offset.right > object.x + object.offset.left &&
            this.x + this.offset.left < object.x + object.width - object.offset.right &&
            this.speedY < 0 // Charakter bewegt sich nach unten
        );
    }
    
    

    applyGravity(){
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }else{
                this.speedY = 0;
            }
        }, 1000 / 60)
    }
    
    
    isAboveGround(){
        if (this instanceof ThrowableObject || this instanceof Endboss) {
            return true;
        }else{
            return this.y < 130;
        }}
        
        
        playAnimation(images){
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img  = this.imageCache[path];
            this.currentImage++;
        }
        
        playAnimationOnce(array){
            let i = 0;
            console.log('it worked');
            
            let onceInterval = setInterval(() => {
                this.img = this.imageCache[array[i]];
                i++;
                if (i >= array.length) {
                    clearInterval(onceInterval);
                    this.img = this.imageCache[array[array.length - 1]]
                }
            }, 200);
        }
        
        jump(){
            this.speedY = 25;
            
        }
        
        
        moveLeft(){
            this.x -= this.speed ;
            this.otherDirection = true;
        }
        
        
        moveRight(){
            this.x += this.speed ;
            this.otherDirection = false;
        }
        
        
        hit(amount){
            
            if (this.characterHealth <= 0) {
                this.characterHealth = 0;
            }else{
                this.characterHealth -= amount;
                console.log(this.characterHealth);
                this.lastHit = new Date().getTime();
            }
        }
        
        
        
        
        isHurt(){
            let timePassed = new Date().getTime() - this.lastHit;
            timePassed = timePassed / 1000;
            return timePassed < 1;
        }
        
        
        isDead(){
            return this.characterHealth == 0;
        }
        
        movingLeft(speed){
            this.moveInterval = setInterval(() => {
                this.x -= speed;
            }, 1000 / 60)
            let i = 0;
            this.clearIntervalAfterDeath.push(this.moveInterval);
            console.log(this.clearIntervalAfterDeath);
        }
        
        stopGameIntervals(){
            this.clearIntervalAfterDeath.forEach((interval) => {
                clearInterval(interval);
                console.log('cleared');
                
            })
        }
        
        
        
    }
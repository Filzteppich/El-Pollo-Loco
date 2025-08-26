class StatusBar extends DrawableObject{
    

    HEALTHBAR_IMAGES = [
        'imgs/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'imgs/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'imgs/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'imgs/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'imgs/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'imgs/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ]

    COIN_IMAGES = [
        'imgs/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'imgs/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'imgs/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'imgs/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'imgs/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'imgs/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ]

    BOTTLE_IMAGES = [
        'imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'imgs/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ]

    ENDBOSS_STATUSBAR_IMAGES = [
        'imgs/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'imgs/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'imgs/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'imgs/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'imgs/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'imgs/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ]

    
    collectedCoins = 0;

    percentage = 100;
    bottleCount = 0;
    y;
    constructor(type, x, y){
        super();
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 50;
        this.checkType(type)
        this.loadImages(this.images);
    }


/**
 * @description Checks the type of status bar and returns the corresponding image array.
 * @param {*} type
 * @returns {*} 
 * @memberof StatusBar
 */
checkType(type){
        if (type === 'health'){
            return this.images = this.HEALTHBAR_IMAGES;
        }else if (type === 'coin'){
            return this.images = this.COIN_IMAGES;
        }else if (type === 'bottle'){
            return this.images = this.BOTTLE_IMAGES;
        }else if (type === 'endboss'){
            return this.images = this.ENDBOSS_STATUSBAR_IMAGES
        }
    }


/**
 * @description Sets the percentage and status bar type for the status bar.
 * @param {*} percentage updates status bar according to the current health or collected objects.
 * @param {*} statusBarType the type of status bar (health, coin, bottle, endboss)
 * @memberof StatusBar
 */
setPercentage(percentage, statusBarType){
        this.percentage = percentage;
        this.statusBarType = statusBarType;

        let path = this.statusBarType[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


/**
 * @description Resolves the image index based on the current percentage.
 * @returns {*} The image index for the current percentage.
 * @memberof StatusBar
 */
resolveImageIndex(){
        if (this.percentage == 100) {
            return 5
        }else if(this.percentage >= 80){
            return 4;
        }else if(this.percentage >= 60){
            return 3
        }else if(this.percentage >= 40){
            return 2;
        }else if(this.percentage > 0){
            return 1;
        }else if(this.percentage == 0){
            return 0;
        }else{
            return 0;
        }
    }

    
}
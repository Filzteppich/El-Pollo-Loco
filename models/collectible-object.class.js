class CollectibleObject extends MovableObject {
    offset = {
        top: 35,
        bottom: 35,
        left: 35,
        right: 35,
    }

   


    constructor(x, y) {
        super();
        this.loadImage('imgs/8_coin/coin_2.png');
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 150;
    }

}
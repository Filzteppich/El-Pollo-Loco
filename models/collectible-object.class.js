/**
 * @class CollectibleObject
 * @extends {MovableObject}
 */
class CollectibleObject extends MovableObject {
    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
    }

   

/**
 * Creates an instance of CollectibleObject.
 * @param {*} x the x position of the collectible object
 * @param {*} y the y position of the collectible object
 * @memberof CollectibleObject
 */
constructor(x, y) {
        super();
        this.loadImage('imgs/8_coin/coin_2.png');
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 150;
    }

}
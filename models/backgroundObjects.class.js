/**
 * @class BackgroundObject
 * @extends {MovableObject}
 */
class BackgroundObject extends MovableObject{

    x = 0;
    y = 0;
    width = 740;
    height = 480;

    
/**
 * Creates an instance of BackgroundObject.
 * @param {*} imgPath the image path
 * @param {*} x the x position of the image
 * @memberof BackgroundObject
 */
constructor(imgPath, x){
        super()
        this.loadImage(imgPath)
        this.x = x;
    }
}
/**
 * @class Floor
 * @extends {MovableObject}
 */
class Floor extends MovableObject {
    
    x = 100;
    y = 400;
    width = 740;
    height = 200;
/**
 * Creates an instance of Floor.
 * @param {*} imgPath the image path
 * @memberof Floor
 */
constructor(imgPath){
        super().loadImage(imgPath)
    }
}
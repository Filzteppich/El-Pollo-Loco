/**
 * @class BackgroundObject
 * @extends {MovableObject}
 */
class BackgroundObject extends MovableObject{

    x = 0;
    y = 0;
    width = 740;
    height = 480;

    constructor(imgPath, x){
        super().loadImage(imgPath)
        this.x = x;
    }
}
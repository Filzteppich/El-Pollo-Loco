/**
 * @class Clouds
 * @extends {MovableObject}
 */
class Clouds extends MovableObject{

x = 0;
y = 0;
width = 740;
height = 460;




    constructor(path, x){
        super().loadImage(path)
        this.x = x;
        this.animate();
    }
/**
 * @description Animates the clouds by moving them to the left.
 * @memberof Clouds
 */
animate(){
        this.movingLeft(0.25);
    }


}
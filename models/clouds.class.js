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

    animate(){
        this.movingLeft();
    }


}
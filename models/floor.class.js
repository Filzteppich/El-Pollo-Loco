class Floor extends MovableObject {
    
    x = 100;
    y = 400;
    width = 740;
    height = 200;

    constructor(imgPath){
        super().loadImage(imgPath)
    }
}